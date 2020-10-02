const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/db.config');

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to eandb');
  })
  .catch((err) => {
    console.log(err, 'connect to db error');
  });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = { db };
