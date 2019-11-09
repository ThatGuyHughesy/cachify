const proxy = require('http-proxy-middleware');

const serverPort = process.env.PORT || 5000;

module.exports = app => {
  app.use(proxy('/auth', { target: `http://localhost:${serverPort}` }));
  app.use(proxy('/api', { target: `http://localhost:${serverPort}` }));
};
