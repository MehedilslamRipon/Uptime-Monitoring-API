let environments = {};

environments.staging = {
   port: 3000,
   envName: "staging",
};

environments.production = {
   port: 5000,
   envName: "production",
};

// determine which environment was passed
const currentEnvironment =
   typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

const environmentToExport =
   typeof environments[currentEnvironment] === "object"
      ? environments[currentEnvironment]
      : environments.staging;

module.exports = environmentToExport;
