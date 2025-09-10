const mongoose = require('mongoose');

const addTrainer = new mongoose.Schema({
    trainer_id: {type: String},
    first_name: {type: String},
    last_name: {type: String},
    specialization: {type: String},
    experience: {type: String},
    email_id: {type: String},
    phone_no: {type: String},
});

const AddTrainer = mongoose.model('add_trainer', addTrainer);
module.exports = AddTrainer;