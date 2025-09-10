const create_oja_modal = require('../Modal/create_oja');

const post_oja_data = async (req, res) => {
    try {
        const{oja_title, oja_code, rating_range_oja, activities} = req.body;

        const add_create_oja = new create_oja_modal({oja_title,
            oja_code, rating_range_oja,
            activities});
        
        const resp = await add_create_oja.save();
        res.status(200).send({message: "Oja data saved", create_oja: resp});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create OJA', error });
    }
}

const get_oja_details = async (req, res) => {
    try {
        const resp = await create_oja_modal.find();
        res.status(200).send({message: "Oja data get", create_oja: resp});
    } catch (error) {
        console.error('Error retrieving OJAs:', error);
        res.status(500).json({ message: 'Failed to retrieve OJAs', error });
    }
}

const delete_oja_data = async (req, res) => {
  try {
    const _id = req.params._id;
    const resp = await create_oja_modal.findByIdAndDelete({_id:_id});
    res.status(200).send({message: "OJA data deleted successfully", create_oja: resp});
  } catch (error) {
    console.log(error);
  }
}

const get_oja_details_byIds = async (req, res) => {
    try {
        const id = req.params._id;
        const resp = await create_oja_modal.findById({_id:id});

        if(!resp){
            return res.status(404).json({ message: 'OJA not found' });
        }

        res.status(200).send({message: "Oja retrieve sucessfully", create_oja: resp})
    } catch (error) {
        console.error('Error retrieving OJA:', error);
        res.status(500).json({ message: 'Failed to retrieve OJA', error }); 
    }
}

const update_oja_details = async (req, res) => {
  try {
    const id = req.params._id;
    const resp = await create_oja_modal.findByIdAndUpdate(id, req.body);
    res.status(200).send({message: "OJA data successfully updated", create_oja: resp});
  } catch (error) {
    console.log(error);
  }
}

const updateOjaInfo = async (req, res) => {
    try {
      const ojaId = req.params.id;
      const { activities, finalScore } = req.body;
  
      // Find the OJA by ID and update its activities and final score
      const updatedOja = await create_oja_modal.findByIdAndUpdate(
        ojaId,
        {
          activities: activities, // Update activities
          finalScore: finalScore // Update final score
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedOja) {
        return res.status(404).json({ message: 'OJA not found' });
      }
  
      res.status(200).json({ message: 'OJA updated successfully', updatedOja });
    } catch (error) {
      console.error('Error updating OJA:', error);
      res.status(500).json({ message: 'Failed to update OJA', error });
    }
  };

module.exports = {post_oja_data, get_oja_details, delete_oja_data, get_oja_details_byIds, update_oja_details, updateOjaInfo};
