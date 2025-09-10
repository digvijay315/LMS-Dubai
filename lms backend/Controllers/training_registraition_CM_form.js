const mongoose = require('mongoose');
const TrainingRegistration = require('../Modal/training_registration_CM');
const EventModel = require('../Modal/add_event_calendar'); // Your existing training event model

// Get training events by training ID or name
const getTrainingEventsByTraining = async (req, res) => {
  try {
    const { trainingId } = req.params;
    
    // Find events with matching training ID
    const events = await EventModel.find({
      $or: [
        { _id: trainingId },
        { training_code: trainingId }
      ]
    });
    
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching training events:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching training events', 
      error: error.message 
    });
  }
};

// Register for a training event
const registerForTraining = async (req, res) => {
  try {
    const { employeeId, eventId, trainingId, competencyItemId } = req.body;
    
    // Check if all required fields are present
    if (!employeeId || !eventId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Employee ID and Event ID are required' 
      });
    }
    
    // Check if employee is already registered for this event
    const existingRegistration = await TrainingRegistration.findOne({
      employeeId,
      eventId
    });
    
    if (existingRegistration) {
      return res.status(400).json({ 
        success: false, 
        message: 'You are already registered for this training event' 
      });
    }
    
    // Check if the event exists and has available space
    const event = await EventModel.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Training event not found' 
      });
    }
    
    // Create new registration
    const newRegistration = new TrainingRegistration({
      employeeId,
      eventId,
      trainingId,
      competencyItemId,
      registrationDate: new Date(),
      status: 'registered'
    });
    
    await newRegistration.save();
    
    return res.status(201).json({ 
      success: true, 
      message: 'Successfully registered for training',
      registration: newRegistration
    });
  } catch (error) {
    console.error('Error registering for training:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error registering for training', 
      error: error.message 
    });
  }
};

// Get employee's training registrations
const getEmployeeTrainingRegistrations = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    const registrations = await TrainingRegistration.find({ employeeId })
      .populate('eventId', 'training_name training_code from_date to_date venue_name')
      .sort({ registrationDate: -1 });
    
    return res.status(200).json(registrations);
  } catch (error) {
    console.error('Error fetching training registrations:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching training registrations', 
      error: error.message 
    });
  }
};

// Cancel a training registration
const cancelTrainingRegistration = async (req, res) => {
  try {
    const { registrationId } = req.params;
    
    const registration = await TrainingRegistration.findById(registrationId);
    
    if (!registration) {
      return res.status(404).json({ 
        success: false, 
        message: 'Training registration not found' 
      });
    }
    
    registration.status = 'cancelled';
    await registration.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Training registration cancelled successfully' 
    });
  } catch (error) {
    console.error('Error cancelling training registration:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error cancelling training registration', 
      error: error.message 
    });
  }
};

// Delete a training registration completely
const deleteTrainingRegistration = async (req, res) => {
    try {
      const { registrationId } = req.params;
      
      // Find the registration first to check if it exists
      const registration = await TrainingRegistration.findById(registrationId);
      
      if (!registration) {
        return res.status(404).json({ 
          success: false, 
          message: 'Training registration not found' 
        });
      }
      
      // Use findByIdAndDelete to completely remove the registration
      await TrainingRegistration.findByIdAndDelete(registrationId);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Training registration cancelled and deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting training registration:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error deleting training registration', 
        error: error.message 
      });
    }
  };



module.exports = {
  getTrainingEventsByTraining,
  registerForTraining,
  getEmployeeTrainingRegistrations,
  cancelTrainingRegistration,
  deleteTrainingRegistration,
};