const mongoose = require('mongoose');

// Schema for individual OJA activity ratings
const ojaConductActivitySchema = new mongoose.Schema({
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

// Main schema for OJA conduct sessions
const ojaConductSchema = new mongoose.Schema({
  // OJA reference
  oja_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'create_Oja',
    required: true
  },
  oja_title: {
    type: String,
    required: true
  },
  oja_code: {
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
  activities: [ojaConductActivitySchema],
  
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
ojaConductSchema.index({ employee_id: 1, oja_id: 1 });
ojaConductSchema.index({ oja_id: 1 });
ojaConductSchema.index({ conducted_date: -1 });

const OJAConduct = mongoose.model('OJAConduct', ojaConductSchema);
module.exports = OJAConduct;