const mongoose = require('mongoose');

const trainingRequestForm = new mongoose.Schema({
    request_raised_by:{type:String},
    employees_ids:{type:Array},
    project:{type:String},
    training_category:{type:String},
    training_title:{type:String},
    budget_code:{type:String},
    target_date:{type:String}
});

const training_budget_form = mongoose.model('training_request_form', trainingRequestForm);

module.exports = training_budget_form;