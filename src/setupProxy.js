const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://od.moi.gov.tw",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api/v1/rest/datastore/301000000A-000082-049",
      },
    })
  );
};
