const AddTrainer = require('../Modal/add_trainer');

const saveTrainer = async (req, res) => {
    try {
       const { trainer_id, first_name, last_name, specialization, experience, email_id, phone_no } = req.body;
       const addTrainerData = new AddTrainer({ trainer_id, first_name, last_name, specialization, experience, email_id, phone_no});
       const response = await addTrainerData.save();
       res.status(200).send({message: 'Trainer add successfully', trainer: response})
    } catch (error) {
        console.log(error);  
    }
}

const getTrainer = async (req, res) => {
    try {
       const response = await AddTrainer.find();
       res.status(200).send({message: 'trainer data get successfully', trainer:response})
    } catch (error) {
        console.log(error);  
    }
}

const updateTrainer = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if trainer exists
      const trainer = await AddTrainer.findById(id);
      if (!trainer) {
        return res.status(404).json({
          success: false,
          message: 'Trainer not found'
        });
      }
  
      // Get updated data from request body
      const {
        trainer_id,
        first_name,
        last_name,
        specialization,
        experience,
        email_id,
        phone_no
      } = req.body;
  
      // Create update object with only fields that are provided
      const updateData = {};
      if (trainer_id) updateData.trainer_id = trainer_id;
      if (first_name) updateData.first_name = first_name;
      if (last_name) updateData.last_name = last_name;
      if (specialization) updateData.specialization = specialization;
      if (experience) updateData.experience = experience;
      if (email_id) updateData.email_id = email_id;
      if (phone_no) updateData.phone_no = phone_no;
  
      // Update the trainer
      const updatedTrainer = await AddTrainer.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
  
      return res.status(200).json({
        success: true,
        message: 'Trainer updated successfully',
        data: updatedTrainer
      });
    } catch (error) {
      console.error('Error updating trainer:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };

module.exports = {saveTrainer, getTrainer, updateTrainer};