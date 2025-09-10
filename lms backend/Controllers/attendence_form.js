const attendence_modal = require('../Modal/attendence');

const post_attendence_details = async (req, res) => {
    try {
        const {training_name_attendence, training_type_attendence, training_category_attendence, date_from_atten, date_to_atten,
                time_from_atten, time_to_atten, training_venue_atten, trainer, trainer_emp_id, employee_id_atten, service_provider} = req.body;

        const add_attendence_data = new attendence_modal({training_name_attendence, training_type_attendence, training_category_attendence, date_from_atten, date_to_atten,
            time_from_atten, time_to_atten, training_venue_atten, trainer, trainer_emp_id, employee_id_atten, service_provider});

        const resp = await add_attendence_data.save();

        res.status(200).send({message: 'attendence saved', attendence_data: resp});
    } catch (error) {
        console.log(error);
    }
}

module.exports = post_attendence_details;