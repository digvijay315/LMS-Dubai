const create_ina_modal = require('../Modal/create_ina');

const post_ina_data = async (req, res) => {
    try {
        const {ina_title, ina_code, rating_range_ina, activities} = req.body;
        const add_create_ina = new create_ina_modal({ina_title, ina_code, rating_range_ina, activities});
        const resp = await add_create_ina.save();
        res.status(200).send({message: "Ina data saved", create_ina: resp});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create INA', error });
    }
}

const get_ina_data = async (req, res) => {
    try {
        const resp = await create_ina_modal.find();
        res.status(200).send({message: "Ina data get successfully", create_ina: resp});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get INA', error });
    }
}

const delete_Ina_data = async (req, res) => {
  try {
    const _id = req.params._id;
    const resp = await create_ina_modal.findByIdAndDelete({_id:_id});
    res.status(200).send({message: "INA data deleted successfully", create_ina: resp});
  } catch (error) {
    console.log(error);
  }
}

const get_ina_data_byIds = async (req, res) => {
    try {
        const id = req.params._id;
        const resp = await create_ina_modal.findById({_id:id});
        if(!resp){
            return res.status(404).json({ message: 'INA not found' });
        }
        res.status(200).send({message: "Ina data get by Id", create_ina: resp});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get INA', error });
    }
}

const update_ina_details = async (req, res) => {
  try {
    const id = req.params._id;
    const resp = await create_ina_modal.findByIdAndUpdate(id, req.body);
    res.status(200).send({message: "INA data successfully updated", create_ina: resp});
  } catch (error) {
    console.log(error);
  }
}

const updateInaInfo = async (req, res) => {
    try {
      const inaId = req.params.id;
      const { activities, finalScore } = req.body;
  
      // Find the OJA by ID and update its activities and final score
      const updatedIna = await create_ina_modal.findByIdAndUpdate(
        inaId,
        {
          activities: activities, // Update activities
          finalScore: finalScore // Update final score
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedIna) {
        return res.status(404).json({ message: 'INA not found' });
      }
  
      res.status(200).json({ message: 'INA updated successfully', updatedIna });
    } catch (error) {
      console.error('Error updating INA:', error);
      res.status(500).json({ message: 'Failed to update INA', error });
    }
  };

module.exports = {post_ina_data, get_ina_data, delete_Ina_data, get_ina_data_byIds, update_ina_details, updateInaInfo};