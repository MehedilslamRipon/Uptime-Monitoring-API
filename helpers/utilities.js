// dependencies
const crypto = require("crypto");
const environments = require("./environments");

let utilities = {};

// parse jason string to object
utilities.parseJSON = (jsonString) => {
   let output;

   try {
      output = JSON.parse(jsonString);
   } catch {
      output = {};
   }
   return output;
};

// hash string
utilities.hash = (str) => {
   if (typeof str === "string" && str.length > 0) {
      let hash = crypto
         .createHmac("sha256", environments.secretKey)
         .update(str)
         .digest("hex");
      return hash;
   } else {
      return false;
   }
};

module.exports = utilities;
