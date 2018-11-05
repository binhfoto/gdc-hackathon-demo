const proxy = require('http-proxy-middleware');

const hostname = 'staging3.intgdc.com';

module.exports = function (app) {
     app.use(proxy("/gdc", {
         "changeOrigin": true,
         "cookieDomainRewrite": "localhost",
         "secure": false,
         "target": `https://${hostname}/`,
         "headers": {
             "host": `${hostname}`,
             "origin": null
         }
     }));
     app.use(proxy("/*.html", {
         "changeOrigin": true,
         "secure": false,
         "target": `https://${hostname}/`
     }));
     app.use(proxy("/packages/*.css", {
         "changeOrigin": true,
         "secure": false,
         "target": `https://${hostname}/`
     }));
     app.use(proxy("/packages/*.js", {
         "changeOrigin": true,
         "secure": false,
         "target": `https://${hostname}/`
     }));
 };