// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");

// module scaffolding
const app = {};

// testing file system
// data.read("test", "newFiles", (err, data) => {
//    console.log(err, data);
// });

// create server
app.createServer = () => {
   const server = http.createServer(app.handleReqRes);
   server.listen(environment.port, () => {
      console.log(`server is running on port: ${environment.port}`);
   });
};

// handle request response
app.handleReqRes = handleReqRes;

// start server
app.createServer();
