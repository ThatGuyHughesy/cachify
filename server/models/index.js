const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
  console.info('Established MongoDB Connection.');
});

mongoose.connection.on('error', err => {
  console.error(`MongoDB Connection Error : ${err}.`);
});
