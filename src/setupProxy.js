const { createProxyMiddleware: proxy } = require("http-proxy-middleware");

//const target = "http://localhost:8000";
const target = "http://localhost:8080";

module.exports = function (app) {
  app.use(
    "/api",
    proxy({
      target,
      changeOrigin: true,
    })
  );
};
