// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
   notFoundHandler,
} = require("../handlers/routeHandlers/notFoundHandler");

// module scaffolding
const handler = {};

// handle request response
handler.handleReqRes = (req, res) => {
   // request handling
   const parsedURL = url.parse(req.url, true);
   const path = parsedURL.pathname;
   const trimmedPath = path.replace(/^\/+|\/+$/g, "");
   const method = req.method.toLowerCase();
   const queryStringObj = parsedURL.query;
   const headersObject = req.headers;

   const requestProperties = {
      parsedURL,
      path,
      trimmedPath,
      method,
      queryStringObj,
      headersObject,
   };

   const decoder = new StringDecoder("utf-8");
   let realData = "";

   const chosenHandler = routes[trimmedPath]
      ? routes[trimmedPath]
      : notFoundHandler;

   req.on("data", (buffer) => {
      realData += decoder.write(buffer);
   });

   req.on("end", () => {
      realData += decoder.end();

      chosenHandler(requestProperties, (statusCode, payload) => {
         statusCode = typeof statusCode === "number" ? statusCode : 500;
         payload = typeof payload === "object" ? payload : {};

         const payloadString = JSON.stringify(payload);

         // return the final response
         res.writeHead(statusCode);
         res.end(payloadString);
      });

      // response handle
      res.end("hello programmer!");
   });

   // response handle
};

module.exports = handler;
