// models/CertificateData.js
const mongoose = require('mongoose');

const CertificateDataSchema = new mongoose.Schema({
  description: String,
  signerName1: String,
  signerTitle1: String,
  signerName2: String,
  signerTitle2: String,
  companyName: String,
  textColor: String,
  accentColor: String,
  bgColor: String,
  logoPreview: String,
  bgPreview: String,
  badgePreview: String,
}, { timestamps: true });

const CertificateData = mongoose.model('CertificateData', CertificateDataSchema);
module.exports = CertificateData;