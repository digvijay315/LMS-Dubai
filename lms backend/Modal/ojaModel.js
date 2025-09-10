// models/ojaModel.js
const mongoose = require('mongoose');

// Schema for OJA Activities
const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: [
    {
      srno: { type: Number, required: true },
      description: { type: String, required: true },
      rating: { type: String, required: true }, // Store rating as string or number
    },
  ],
});

// OJA Schema
const ojaSchema = new mongoose.Schema({
  oja_title: { type: String, required: true },
  oja_code: { type: String, required: true },
  activities: [activitySchema], // Embedding activities schema
}, { timestamps: true });

// Create OJA model from schema
const OJA = mongoose.model('OJA', ojaSchema);

module.exports = OJA;