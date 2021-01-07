// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");
// const { notFoundHandler } = require("./handlers/routeHandlers/notFoundHandler");

const routes = {
   sample: sampleHandler,
   user: userHandler,
};

module.exports = routes;
