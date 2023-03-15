const express = require("express");
const service = require("./service.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/AddService", service);
}

module.exports = routerApi;
