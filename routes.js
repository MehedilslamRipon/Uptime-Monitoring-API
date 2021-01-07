// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");
const { tokenHandler } = require("./handlers/routeHandlers/tokenHandler");

// const { notFoundHandler } = require("./handlers/routeHandlers/notFoundHandler");

const routes = {
   sample: sampleHandler,
   user: userHandler,
   token: tokenHandler,
};

module.exports = routes;
