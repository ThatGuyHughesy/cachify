require('dotenv').config();

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const cookieKey = process.env.COOKIE_KEY;
const serverIp = process.env.IP || 'localhost';
const serverPort = process.env.PORT || 5000;
const routes = require('./routes');

const app = express();

morgan('tiny');

require('./models');

app.use(sslRedirect());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });
}

app.listen(serverPort, serverIp, () => {
  console.log(`Server listening on ${serverIp}:${serverPort}.`);
});
