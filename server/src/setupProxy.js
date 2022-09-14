const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://ec2-3-36-74-103.ap-northeast-2.compute.amazonaws.com/',
            changeOrigin: true
        })
    )
};