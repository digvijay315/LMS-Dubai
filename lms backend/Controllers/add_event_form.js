const add_event_modal = require("../Modal/add_event_calendar");

const post_event_details = async (req, res) => {
    try {
        const {training_category, training_code, training_name, trainer_name, training_type, training_mode, description, region,  project_title, job_title, from_date, to_date, from_time,
            to_time, participents, venue_name, status } = req.body;

        const add_event_data = new add_event_modal({training_category, training_code, training_name, training_type, training_mode, trainer_name, description, region, project_title, job_title, from_date, to_date, from_time,
            to_time, participents, venue_name, status});

        const resp = await add_event_data.save();

        res.status(200).send({message: "Hello event save succesfuly", event: resp});
    } catch (error) {
        console.log(error);
    }
}

const get_events_by_month = async (req, res) => {
    try {
        const { monthStart, monthEnd } = req.body;

        // Query to find events within the date range of the month
        const events = await add_event_modal.find({
            from_date: { $lte: monthEnd },
            to_date: { $gte: monthStart }
        });

        res.status(200).json({ events });
    } catch (error) {
        console.error("Error fetching events", error);
        res.status(500).send({ message: "Error fetching events", error });
    }
};

const update_data_event = async (req, res) => {
    try {
       const _id = req.params._id;
       const resp = await add_event_modal.findByIdAndUpdate(_id, req.body);
       res.status(200).send({message: "details updated successfuly", event: resp}); 
    } catch (error) {
       console.log(error); 
    }
}

// const get_data_event = async (req, res) => {
//     try {
//        const resp = await add_event_modal.find();
//        res.status(200).send({message: "data get successfuly", event: resp}); 
//     } catch (error) {
//         console.log(error);
//     }
// }

const get_data_event = async (req, res) => {
    try {
        const events = await add_event_modal.find({}); // Fetch all events from DB
        res.status(200).send(events); // Send back events
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching events" });
    }
};


const get_data_eventbyid = async (req, res) => {
    try {
        const id=req.params._id
       const resp = await add_event_modal.find({_id:id});
       res.status(200).send({message: "data get successfuly", event: resp}); 
    } catch (error) {
        console.log(error);
    }
}

const delete_event_data = async (req, res) => {
    try {
        const _id = req.params._id;
        const resp = await add_event_modal.findByIdAndDelete(_id, req.body);
        res.status(200).send({message: "data deleted successfuly", event: resp});
    } catch (error) {
        console.log(error);
    }
}

const getEventsByDate = async (req, res) => {
    const { date } = req.query;
    try {
      const events = await EventModel.find({
        from_date: { $lte: new Date(date) },
        to_date: { $gte: new Date(date) }
      });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events' });
    }
  };

module.exports = {post_event_details, get_events_by_month, update_data_event, get_data_event, delete_event_data, get_data_eventbyid, getEventsByDate};
