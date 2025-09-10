const mongoose = require('mongoose');

const INASchema = new mongoose.Schema({
    ina_title: { type: String, },
    ina_code: { type: String, },
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
  
  const INAAssignment = mongoose.model('INAAssignment', INASchema);
  module.exports = INAAssignment;