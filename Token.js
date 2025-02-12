const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true }
});

module.exports = mongoose.model('Token', tokenSchema);
