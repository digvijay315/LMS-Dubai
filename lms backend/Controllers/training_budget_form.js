const create_training_modal = require('../Modal/create_training_budget');

const post_training_budget = async (req, res) => {
    try {
       const{project_title, training_title, budget_code, budget_value, currency, contengency_code, contengency_value,
        status, release_date, valid_date, utilised_date,} = req.body;

        const add_training_budget = new create_training_modal({project_title, training_title, budget_code, budget_value, 
            contengency_code, currency, contengency_value, status, release_date, valid_date, utilised_date,});

        const resp = await add_training_budget.save();
        res.status(200).send({message: 'Training budget data save', training_budget: resp });
       } catch (error) {
        console.log(error);
    }
}

const get_training_budget = async (req, res) => {
    try {
       const resp = await create_training_modal.find();
       res.status(200).send({message: "training budget data get successfully", training_budget: resp }); 
    } catch (error) {
        console.log(error);
    }
}

module.exports = {post_training_budget, get_training_budget};