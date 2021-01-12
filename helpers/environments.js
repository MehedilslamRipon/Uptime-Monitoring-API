/* eslint-disable operator-linebreak */
// scaffolding
const environments = {};

// staging environment
environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'key420',
    maxChecks: 5,
    twilio: {
        fromPhone: '',
        AccountSid: '',
        authToken: '',
    },
};

// production environment
environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'key420',
    maxChecks: 5,
    twilio: {
        fromPhone: '',
        AccountSid: '',
        authToken: '',
    },
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
module.exports = environmentToExport;
