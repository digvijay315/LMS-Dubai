const mongoose = require('mongoose');

const OJASchema = new mongoose.Schema({
    oja_title: { type: String, },
    oja_code: { type: String, },
    employees: [
      {
        employeeId: { type: String },
        employeeName: { type: String },
      },
    ],
    activities: [
      {
        title: String,
        content: [
          {
            description: String,
            rating: Number,
          },
        ],
      },
    ],
    schedule: {
      dateFrom: { type: Date, required: true },
      dateTo: { type: Date, required: true },
      timeFrom: { type: String, required: true },
      timeTo: { type: String, required: true },
    },
  });
  
  const OJAAssignment = mongoose.model('OJAAssignment', OJASchema);
  module.exports = OJAAssignment;