// scaffolding
const environments = {};

// staging environment
environments.staging = {
   port: 3000,
   envName: "staging",
   secretKey: "key420",
   maxChecks: 5,
   twilio: {
      fromPhone: "+15594219643",
      AccountSid: "AC807e0794d197f9b0c8c5c4d9de2fec8e",
      authToken: "624cb9c9a7698e99f3b7505f1016f81c",
   },
};

// production environment
environments.production = {
   port: 5000,
   envName: "production",
   secretKey: "key420",
   maxChecks: 5,
   twilio: {
      fromPhone: "+15594219643",
      AccountSid: "AC807e0794d197f9b0c8c5c4d9de2fec8e",
      authToken: "624cb9c9a7698e99f3b7505f1016f81c",
   },
};

// determine which environment was passed
const currentEnvironment =
   typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding environment object
const environmentToExport =
   typeof environments[currentEnvironment] === "object"
      ? environments[currentEnvironment]
      : environments.staging;

// export module
module.exports = environmentToExport;
