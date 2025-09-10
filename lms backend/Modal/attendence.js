const mongoose = require('mongoose');

const attendence = new mongoose.Schema({
    training_name_attendence:{type:String},
    training_type_attendence:{type:String},
    training_category_attendence:{type:String},
    date_from_atten:{type:String},
    date_to_atten:{type:String},
    time_from_atten:{type:String},
    time_to_atten:{type:String},
    training_venue_atten:{type:String},
    trainer:{type:String},
    trainer_emp_id:{type:String},
    employee_id_atten:{type:Array},
    service_provider:{type:String},
    // employee_idtwo_atten:{type:String}
});

const attendence_modal = mongoose.model('attendence_info', attendence);

module.exports = attendence_modal;
