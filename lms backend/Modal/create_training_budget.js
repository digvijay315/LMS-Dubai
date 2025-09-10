const mongoose = require('mongoose');

const trainingBudget = new mongoose.Schema({
    project_title:{type:String},
    training_title:{type:String},
    budget_code:{type:String},
    budget_value:{type:Number},
    currency:{type:String},
    contengency_code:{type:String},
    contengency_value:{type:Number},
    status:{type:String},
    release_date:{type:String},
    valid_date:{type:String},
    utilised_date:{type:String}
})

const create_training_modal = mongoose.model('create_training_budget', trainingBudget);

module.exports = create_training_modal;