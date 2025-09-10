const mongoose=require('mongoose')

const employee_register = new mongoose.Schema({
    employee_id:{type:String},
    employee_name:{type:String},
    employee_email:{type:String},
    employee_password:{type:String},
    function_title:{type:String},
    job_title:{type:String},
    date_of_join:{type:String},
    project_code:{type:String},
    project_name:{type:String},
    department:{type:String},
    region:{type:String},
    project_manger:{type:String},
    employee_id_two:{type:String},
    name:{type:String},
    designation:{type:String},
    role:{type:String},

    date_of_assign: {
  type: Date
},

    
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },

    experiences: [{
        job_experience_title: {type: String},
        employment_type: {type: String},
        company_name: {type: String},
        start_date: {type: String},
        end_date: {type: String},
        total_experience: {type: Number}
    }],
    certificates: [{
        certificate_title: {type: String},
        date_of_certification: {type: String},
        validate_till: {type: String}
    }]
});

const register_modal = mongoose.model('employee-info', employee_register);
module.exports = register_modal;