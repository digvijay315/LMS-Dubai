const training_budget_form = require('../Modal/training_request_form');

const post_trainingRequestForm = async (req, res) => {
   try {
        const {request_raised_by, employees_ids,  project, training_category, training_title,
            budget_code, target_date,
        } = req.body;

        const add_trainingRequestForm = new training_budget_form({request_raised_by, employees_ids,  project, 
            training_category, training_title, budget_code, target_date,});

        const resp = await add_trainingRequestForm.save();
        res.status(200).send({message: "Training requested data saved", trainingRequest_form: resp});
   } catch (error) {
        console.log(error);
   }
};

const get_trainingRequestData = async (req, res) => {
    try {
        const resp = await training_budget_form.find({});
        res.status(200).send({message: "Training Request data get successfully", trainingRequest_form: resp});
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching events" });
    }
}

const get_trainingRequestByIds = async (req, res) => {
    try {
       const id = req.params._id;
       const resp = await training_budget_form.find({_id:id});
       res.status(200).send({message: "data get successfuly", trainingRequest_form: resp}); 
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching events" });
    }
}

module.exports = { post_trainingRequestForm, get_trainingRequestData, get_trainingRequestByIds };