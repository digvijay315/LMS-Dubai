const create_ojt_modal = require('../Modal/create_ojt');

const post_create_ojt = async (req, res) => {
    try {
        const {ojt_title,
        ojt_code,
        activities} = req.body;

        const add_create_ojt = new create_ojt_modal({ojt_title,
            ojt_code,
            activities});

        const resp = await add_create_ojt.save();
        res.status(200).send({message: "create ojt saved", create_ojt: resp});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create OJT', error });
    }
}

const get_ojt_data = async (req, res) => {
    try {
       const resp = await create_ojt_modal.find({});
       res.status(200).send({message: "ojt get successfully", create_ojt: resp});
    } catch (error) {
        console.error('Error retrieving OJTs:', error);
        res.status(500).json({ message: 'Failed to retrieve OJTs', error });
    }
}

const delete_ojt_data = async (req, res) => {
  try {
    const _id = req.params._id;
    const resp =await create_ojt_modal.findByIdAndDelete({_id:_id});
    res.status(200).send({message: "Ojt data deleted successfully", create_ojt: resp});
  } catch (error) {
    console.log(error);
  }
}

const get_ojts_data_byIds = async (req, res) => {
    try {
        const id = req.params._id;
        const resp = await create_ojt_modal.findById({_id:id});

        if(!resp){
            return res.status(404).json({ message: 'OJT not found' });
        }
        res.status(200).send({message: "get ojt by id", create_ojt: resp});
    } catch (error) {
        console.error('Error retrieving OJT:', error);
        res.status(500).json({ message: 'Failed to retrieve OJT', error }); 
    }
}

// const update_ojt_info = async (req, res) => {
//     try {
//         const id = req.params._id;
//         const resp = await create_ojt_modal.findByIdAndUpdate({_id:id});
//         if(!resp){
//             return res.status(404).json({ message: 'OJT not found' });
//         }
//         res.status(200).send({message: "ojt updated successfully", create_ojt: resp});
//     } catch (error) {
//         console.error('Error retrieving OJA:', error);
//         res.status(500).json({ message: 'Failed to retrieve OJT', error });
//     }
// }

const updateOJTInfo = async (req, res) => {
    const { ojtId, updatedActivities } = req.body; // Destructure the incoming request data
  
    try {
      // Find the OJT by its ID
      const ojt = await create_ojt_modal.findById(ojtId);
  
      // Check if OJT exists
      if (!ojt) {
        return res.status(404).json({ message: 'OJT not found' });
      }
  
      // Iterate through the activities and update `trainerChecked` and `employeeChecked`
      ojt.activities.forEach((activity, activityIndex) => {
        const updatedActivity = updatedActivities[activityIndex];
  
        // Check if there is corresponding activity in updatedActivities
        if (updatedActivity) {
          activity.content.forEach((content, contentIndex) => {
            const updatedContent = updatedActivity.content[contentIndex];
  
            // Update trainerChecked and employeeChecked if they exist in the updated content
            if (updatedContent) {
              content.trainerChecked = updatedContent.trainerChecked !== undefined ? updatedContent.trainerChecked : content.trainerChecked;
              content.employeeChecked = updatedContent.employeeChecked !== undefined ? updatedContent.employeeChecked : content.employeeChecked;
            }
          });
        }
      });
  
      // Save the updated OJT document back to the database
      await ojt.save();
  
      // Send success response
      return res.status(200).json({ message: 'OJT updated successfully!' });
    } catch (error) {
      console.error('Error updating OJT info:', error);
  
      // Send error response
      return res.status(500).json({ message: 'Error updating OJT info', error });
    }
  };

  const update_ojt_details = async (req, res) => {
    try {
      const id = req.params._id;
      const resp = await create_ojt_modal.findByIdAndUpdate(id, req.body);
      res.status(200).send({message: "OJT data successfully updated", create_ojt: resp});
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {post_create_ojt, get_ojt_data, delete_ojt_data, get_ojts_data_byIds, updateOJTInfo, update_ojt_details};