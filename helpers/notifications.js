// dependencies
const https = require("https");
// const { user } = require("../routes");
const queryString = require("querystring");
const { twilio } = require("./environments");

// scaffolding
const notifications = {};

// send sms to user using twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
   // input validation
   const userPhone =
      typeof phone === "string" && phone.trim().length === 11
         ? phone.trim()
         : false;

   const userMsg =
      typeof msg === "string" &&
      msg.trim().length > 0 &&
      msg.trim().length <= 1600
         ? msg.trim()
         : false;

   if (userPhone && userMsg) {
      // configure the payload
      const payload = {
         From: twilio.fromPhone,
         To: `+88${userPhone}`,
         Body: userMsg,
      };

      // stringify the payload
      const stringifyPayload = queryString.stringify(payload);

      // configure the req details
      const requestDetails = {
         hostname: "api.twilio.com",
         method: "POST",
         path: `/2010-04-01/Accounts/{twilio.AccountSid}/Messages.json`,
         auth: `${twilio.AccountSid}:${twilio.authToken}`,
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
      };

      // instantiate req
      const req = https.request(requestDetails, (res) => {
         const status = res.statusCode;

         if (status === 200 || status === 201) {
            callback(false);
         } else {
            callback(`Status code returned was ${status}`);
         }
      });

      req.on("error", (e) => {
         callback(e);
      });

      req.write(stringifyPayload);
      req.end();
   } else {
      callback("Given parameters were missing or invalid!");
   }
};

// export the module
module.exports = notifications;
