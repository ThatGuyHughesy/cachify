const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./config/keys');

const app = express();

const PORT = process.env.PORT || 5000;

const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

require('./services/passport');

app.use(routes);

app.listen(PORT);
