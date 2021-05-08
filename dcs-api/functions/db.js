const Mongoose = require('mongoose');
const constants = require('./constants.js');

const users_db = Mongoose.createConnection(constants.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  console.log('Connection in progress...');
  if (err) throw err;
  else console.log('MongoDB connection: SUCCESS');
});

module.exports = {users_db};