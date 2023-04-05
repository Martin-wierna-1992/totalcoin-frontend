const { createProxyMiddleware: proxy } = require("http-proxy-middleware");

//const target = "http://test.sistema.cpaquinielamovil.com";
const target = "http://localhost:5000";

module.exports = function (app) {
  app.use(
    "/api",
    proxy({
      target,
      changeOrigin: true,
    })
  );
};
