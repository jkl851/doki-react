const { createProxyMiddleware } = require('http-proxy-middleware');

// var cookie;

// // proxy 로 request 시 이벤트
// function relayRequestHeaders(proxyReq, req) {
//     console.debug('💥💥💥 request 💥💥💥');
//     Object.keys(req.headers).forEach(function (key) {
//       console.debug(`${key} : ${req.headers[key]}`);
//     });
//     if (cookie) {
//       proxyReq.setHeader('cookie', cookie);
//     }
// };

// // proxy 로 Response 시 이벤트
// function relayResponseHeaders(proxyRes, req, res) {
//     console.debug('💥💥💥 response 💥💥💥');
//     Object.keys(proxyRes.headers).forEach(function (key) {
//       console.debug(`${key} : ${proxyRes.headers[key]}`);
//     });
//     var proxyCookie = proxyRes.headers["set-cookie"];
//     if (proxyCookie) {
//       cookie = proxyCookie;
//     }
// };

module.exports = function(app){
  app.use(
    '/doki',
      createProxyMiddleware({
          target: 'http://localhost:8080',
          secure: false,
          ws: true,
          changeOrigin: true
      })
  )
};