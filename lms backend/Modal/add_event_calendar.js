const mongoose = require('mongoose');

const add_event_calendar = new mongoose.Schema({
    training_category:{type:String},
    training_code:{type:String},
    training_name:{type:String},
    training_type:{type:String},
    training_mode:{type:String},
    trainer_name:{type:String},
    description:{type:String},
    region:{type:[String]},
    project_title:{type:String},
    job_title:{type:[String]},
    from_date:{type:String},
    to_date:{type:String},
    from_time:{type:String},
    to_time:{type:String},
    participents:{type:String},
    venue_name:{type:String},
    status:{type:String}
});

const add_event_modal = mongoose.model('add-event-info', add_event_calendar);
module.exports = add_event_modal;