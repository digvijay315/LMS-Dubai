// models/registerCompany.model.js
const mongoose = require('mongoose');

const registerCompanySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  companyAddress: {
    type: String,
    required: true,
    trim: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('RegisteredCompany', registerCompanySchema);
