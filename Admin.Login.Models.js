const mongoose = require('mongoose');

const appAdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('AppAdmin', appAdminSchema);