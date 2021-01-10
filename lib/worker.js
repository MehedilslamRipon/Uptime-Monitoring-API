// dependencies
const url = require("url");
const http = require("http");
const https = require("https");
const { sendTwilioSms } = require("../helpers/notifications");
const data = require("./data");
const { parseJSON } = require("../helpers/utilities");

// scaffolding
const worker = {};

// lookup all the checks
worker.getherAllChecks = () => {
   // get all the checks
   data.list("checks", (err1, checks) => {
      if (!err1 && checks && checks.length > 0) {
         checks.forEach((check) => {
            data.read("checks", check, (err2, originalCheckData) => {
               if (!err2 && originalCheckData) {
                  worker.validateCheckData(parseJSON(originalCheckData));
               } else {
                  console.log(`Error: reading one of the checks data!`);
               }
            });
         });
      } else {
         console.log(`Error could not find any checks to process!`);
      }
   });
};

// validate individual check data
worker.validateCheckData = (originalCheckData) => {
   let originalData = originalCheckData;
   if (originalCheckData && originalCheckData.id) {
      originalData.state =
         typeof originalCheckData.state === "string" &&
         ["up", "down"].indexOf(originalCheckData.state) > -1
            ? originalCheckData.state
            : "down";

      originalData.lastChecked =
         typeof originalCheckData.lastChecked === "number" &&
         originalCheckData.lastChecked > 0
            ? originalCheckData.lastChecked
            : false;

      // pass to the next process
      worker.performCheck(originalData);
   } else {
      console.log(`Error: check was invalid or not properly formatted`);
   }
};

// perform check
worker.performCheck = (originalCheckData) => {
   // prepare the initial check outcome
   let checkOutCome = {
      error: false,
      responseCode: false,
   };

   // mark the outcome as not been sent yet
   let outComeSent = false;

   // parse the hostname & full url from original data
   let parsedUrl = url.parse(
      originalCheckData.protocol + "://" + originalCheckData.url,
      true
   );
   const hostname = parsedUrl.hostname;
   const path = parsedUrl.path;

   // construct the request
   const requestDetails = {
      protocol: originalCheckData.protocol + ":",
      hostname: hostname,
      method: originalCheckData.method.toUpperCase(),
      path: path,
      timeout: originalCheckData.timeoutSeconds * 1000,
   };

   const protocolToUse = originalCheckData.protocol === "http" ? http : https;

   let req = protocolToUse.request(requestDetails, (res) => {
      // grab the status of the response
      const status = res.statusCode;

      // update the check outcome and pass to the next process
      checkOutCome.responseCode = status;

      if (!outComeSent) {
         worker.processCheckOutCome(originalCheckData, checkOutCome);
         outComeSent = true;
      }
   });

   req.on("error", (e) => {
      checkOutCome = {
         error: true,
         value: e,
      };
      // update the check outcome and pass to the next process
      if (outComeSent) {
         worker.processCheckOutCome(originalCheckData, checkOutCome);
         outComeSent = true;
      }
   });

   req.on("timeout", (e) => {
      checkOutCome = {
         error: true,
         value: timeout,
      };
      // update the check outcome and pass to the next process
      if (outComeSent) {
         worker.processCheckOutCome(originalCheckData, checkOutCome);
         outComeSent = true;
      }
   });

   // req send
   req.end();
};

worker.processCheckOutCome = (originalCheckData, checkOutCome) => {
   // check if check outCome is up or down
   let state =
      !checkOutCome.error &&
      checkOutCome.responseCode &&
      originalCheckData.successCodes.indexOf(checkOutCome.responseCode) > -1
         ? "up"
         : "down";

   // decide whether we should alert the user or not
   let alertWanted =
      originalCheckData.lastChecked && originalCheckData.state !== state
         ? true
         : false;

   // update the check data
   let newCheckData = originalCheckData;

   newCheckData.state = state;
   newCheckData.lastChecked = Date.now();

   // update the check to disk
   data.update("checks", newCheckData.id, newCheckData, (err) => {
      if (!err) {
         if (alertWanted) {
            // send the checkData to next process
            worker.alertUserToStatusChange(newCheckData);
         }
      } else {
         console.log(`Alert is not needed as there is no state change !`);
      }
   });
};

// send notification to user if state change
worker.alertUserToStatusChange = (newCheckData) => {
   let msg = `Alert: Your check for ${newCheckData.method.toUpperCase()} ${
      newCheckData.protocol
   }://${newCheckData.url} is currently ${newCheckData.state}`;

   sendTwilioSms(newCheckData.userPhone, msg, (err) => {
      if (!err) {
         console.log(`User was alerted to a status change via SMS: ${msg}`);
      } else {
         console.log(`There was a problem sending SMS to one of the user!`);
      }
   });
};

// timer to execute the worker process
worker.loop = () => {
   setInterval(() => {
      worker.getherAllChecks();
   }, 5000);
};

// start the worker
worker.init = () => {
   // execute all the checks
   worker.getherAllChecks();

   // call the loop so that checks continue
   worker.loop();
};

// export
module.exports = worker;
