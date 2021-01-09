// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const { sendTwilioSms } = require("./helpers/notifications");

// scaffolding
const app = {};

// todo
sendTwilioSms("01797989254", "Hello world", (err) => {
   console.log(`this is the error`, err);
});

// configuration
app.config = {
   port: 3000,
};

// create server
app.createServer = () => {
   const server = http.createServer(app.handleReqRes);
   server.listen(app.config.port, () => {
      console.log(`Server is running on PORT: ${app.config.port}`);
   });
};

// handle Request Response
app.handleReqRes = handleReqRes;

// start the server
app.createServer();
