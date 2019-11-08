require('dotenv').config();

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const morgan = require('morgan');

const cookieKey = process.env.COOKIE_KEY;
const routes = require('./routes');

const app = express();

morgan('tiny');

const PORT = process.env.PORT || 5000;

require('./models');

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

app.listen(PORT, 'localhost', () => {
  console.log(`Server listening on port ${PORT}.`);
});
