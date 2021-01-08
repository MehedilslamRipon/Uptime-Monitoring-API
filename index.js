// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

// scaffolding
const app = {};

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
