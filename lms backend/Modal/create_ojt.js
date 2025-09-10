const mongoose = require('mongoose');
const contentSchema = new mongoose.Schema({
    srno: {type: Number},
    description: {type: String},
    trainerChecked: { type: Boolean, default: false },
    employeeChecked: { type: Boolean, default: false }
  });
  
  const activitySchema = new mongoose.Schema({
    activity_ojt_title: {type: String},
    content: [contentSchema]
  });
  
  const create_ojt = new mongoose.Schema({
    ojt_title: {type: String},
    ojt_code: {type: String},
    activities: [activitySchema]
  });

const create_ojt_modal = mongoose.model('create_ojt', create_ojt);
module.exports = create_ojt_modal;