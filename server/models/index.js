const mongoose = require('mongoose');
const keys = require('../config');

mongoose.connect(keys.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.info('Established MongoDB Connection.');
});

mongoose.connection.on('error', err => {
  console.error(`MongoDB Connection Error : ${err}.`);
});
