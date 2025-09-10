const mongoose = require('mongoose');

// Schema for individual ina activity ratings
const inaConductActivitySchema = new mongoose.Schema({
  activity_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  activity_title: {
    type: String
  },
  content_ratings: [
    {
      content_id: {
        type: mongoose.Schema.Types.ObjectId
      },
      srno: {
        type: Number
      },
      description: {
        type: String
      },
      assigned_rating: {
        type: Number,
        required: true
      }
    }
  ]
});

// Main schema for ina conduct sessions
const inaConductSchema = new mongoose.Schema({
  // ina reference
  ina_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'create_ina',
    required: true
  },
  ina_title: {
    type: String,
    required: true
  },
  ina_code: {
    type: String,
    required: true
  },
  
  // Employee reference
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  employee_code: {
    type: String,
    required: true
  },
  employee_name: {
    type: String,
    required: true
  },
  function_title: {
    type: String
  },
  job_title: {
    type: String
  },
  
  // Trainer reference
  trainer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  trainer_name: {
    type: String
  },
  
  // Activity ratings
  activities: [inaConductActivitySchema],
  
  // Overall score
  total_score: {
    type: Number
  },
  average_score: {
    type: Number
  },
  
  // Status
  status: {
    type: String,
    enum: ['completed', 'in-progress'],
    default: 'completed'
  },
  
  // Timestamps
  conducted_date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create index for faster queries
inaConductSchema.index({ employee_id: 1, ina_id: 1 });
inaConductSchema.index({ ina_id: 1 });
inaConductSchema.index({ conducted_date: -1 });

const INAConduct = mongoose.model('inaConduct', inaConductSchema);
module.exports = INAConduct;