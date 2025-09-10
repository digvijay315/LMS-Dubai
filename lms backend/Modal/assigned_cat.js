const mongoose = require('mongoose');

const assignedCATSchema = new mongoose.Schema({
  catId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CAT',
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
 assignedDate: {
  type: Date,
  required: true  // make it required since frontend will always send it
},

 
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

const AssignedCAT = mongoose.model('AssignedCAT', assignedCATSchema);
module.exports = AssignedCAT;
