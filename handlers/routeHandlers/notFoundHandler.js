// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
   callback(404, {
      message: "your requested URL was not found",
   });
};

module.exports = handler;
