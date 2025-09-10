const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
  training_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'add-event-info',
    required: true
  },
  training_name: {
    type: String,
    required: true
  },
  from_date: {
    type: Date,
    required: true
  },
  to_date: {
    type: Date,
    required: true
  },
  from_time: {
    type: String,
    required: true
  },
  to_time: {
    type: String,
    required: true
  },
  notification_link: {
    type: String
  },
  employees: [
    {
      employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee-info'
      },
      employee_code: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      designation: {
        type: String
      },
      emailStatus: {
        type: String,
        enum: ['Sent', 'Failed', 'Not Sent'],
        default: 'Not Sent'
      }
    }
  ],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Nomination = mongoose.model('Nomination', nominationSchema);

module.exports = Nomination;