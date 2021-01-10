// scaffolding
const environments = {};

// staging environment
environments.staging = {
   port: 3000,
   envName: "staging",
   secretKey: "key420",
   maxChecks: 5,
   twilio: {
      fromPhone: "+14435683965",
      AccountSid: "AC928722d7bb482ad76b2b909f11241f02",
      authToken: "fa64fcb77ef04c45f34a58dbe67ffd15",
   },
};

// production environment
environments.production = {
   port: 5000,
   envName: "production",
   secretKey: "key420",
   maxChecks: 5,
   twilio: {
      fromPhone: "+14435683965",
      AccountSid: "AC928722d7bb482ad76b2b909f11241f02",
      authToken: "fa64fcb77ef04c45f34a58dbe67ffd15",
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
