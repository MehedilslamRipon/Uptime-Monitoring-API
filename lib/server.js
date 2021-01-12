// dependencies
const http = require('http');
const { handleReqRes } = require('../helpers/handleReqRes');
// const { sendTwilioSms } = require('../helpers/notifications');

// scaffolding
const server = {};
// configuration
server.config = {
    port: 3000,
};

// create server
server.createServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(server.config.port, () => {
        console.log(`Server is running on PORT: ${server.config.port}`);
    });
};

// handle Request Response
server.handleReqRes = handleReqRes;

// start the server
server.init = () => {
    server.createServer();
};

// export
module.exports = server;
