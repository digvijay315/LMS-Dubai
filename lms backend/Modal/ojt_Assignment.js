const mongoose = require('mongoose');

const OJTSchema = new mongoose.Schema({
  ojt_title: { type: String, },
  ojt_code: { type: String, },
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
          trainerChecked: Boolean,
          employeeChecked: Boolean,
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

const OJTAssignment = mongoose.model('OJTAssignment', OJTSchema);
module.exports = OJTAssignment;
