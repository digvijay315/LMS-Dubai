const Nomination = require('../Modal/add_nomination');
const TrainingEvent = require('../Modal/add_event_calendar');
const nodemailer = require('nodemailer');

// Setup nodemailer transporter (configure with your SMTP details)
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST || 'smtp.gmail.com',
//   port: process.env.EMAIL_PORT || 587,
//   secure: process.env.EMAIL_SECURE === 'true',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mrvivek258@gmail.com',
        pass: 'bguk appp yrle wuzo'
      }
  });

// Create a new nomination
const createNomination = async (req, res) => {
  try {
    const {
      training_id,
      training_name,
      from_date,
      to_date,
      from_time,
      to_time,
      notification_link,
      employees
    } = req.body;

    // Check if training exists
    const training = await TrainingEvent.findById(training_id);
    if (!training) {
      return res.status(404).json({ message: 'Training event not found' });
    }

    // Create new nomination
    const nomination = new Nomination({
      training_id,
      training_name,
      from_date,
      to_date,
      from_time,
      to_time,
      notification_link,
      employees,
      created_by: req.user ? req.user._id : null
    });

    // Save nomination to database
    await nomination.save();

    // Send email notifications to nominated employees
    const emailPromises = employees.map(async (employee) => {
      try {
        // Email content
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: employee.email,
          subject: `Nomination for Training: ${training_name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <h2 style="color: #7A1CAC;">Training Nomination</h2>
              <p>Dear ${employee.name},</p>
              <p>You have been nominated for the following training:</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Training Name:</strong> ${training_name}</p>
                <p><strong>From Date:</strong> ${new Date(from_date).toLocaleDateString()}</p>
                <p><strong>To Date:</strong> ${new Date(to_date).toLocaleDateString()}</p>
                <p><strong>Timing:</strong> ${from_time} to ${to_time}</p>
                ${notification_link ? `<p><strong>Resource Link:</strong> <a href="${notification_link}" target="_blank">${notification_link}</a></p>` : ''}
              </div>
              <p>Please ensure your attendance for this training session.</p>
              <p>Best regards,<br>Training Department</p>
            </div>
          `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        // Update email status in database
        await Nomination.updateOne(
          { 'employees.employee_id': employee.employee_id },
          { $set: { 'employees.$.emailStatus': 'Sent' } }
        );

        return { email: employee.email, status: 'Sent', messageId: info.messageId };
      } catch (error) {
        console.error(`Error sending email to ${employee.email}:`, error);
        
        // Update email status in database
        await Nomination.updateOne(
          { 'employees.employee_id': employee.employee_id },
          { $set: { 'employees.$.emailStatus': 'Failed' } }
        );
        
        return { email: employee.email, status: 'Failed', error: error.message };
      }
    });

    // Wait for all emails to be sent
    const emailResults = await Promise.all(emailPromises);

    res.status(201).json({
      message: 'Nomination created successfully',
      nomination,
      emailResults
    });
  } catch (error) {
    console.error('Error creating nomination:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all nominations
const getAllNominations = async (req, res) => {
  try {
    const nominations = await Nomination.find()
      .populate('training_id', 'training_name training_category')
      .sort({ createdAt: -1 });
    
    res.status(200).json(nominations);
  } catch (error) {
    console.error('Error fetching nominations:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getNominationsById = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    // Find all nominations where this employee is included
    const nominations = await Nomination.find({
      'employees.employee_id': employeeId
    }).select('training_name from_date to_date from_time to_time notification_link');
    
    if (!nominations || nominations.length === 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'No nominations found for this employee', 
        nominations: [] 
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Nominations fetched successfully',
      nominations
    });
    
  } catch (error) {
    console.error('Error fetching employee nominations:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching nominations',
      error: error.message
    });
  }
};

// Get nominations by training ID
const getNominationsByTraining = async (req, res) => {
  try {
    const { trainingId } = req.params;
    
    const nominations = await Nomination.find({ training_id: trainingId });
    
    if (!nominations) {
      return res.status(404).json({ message: 'No nominations found for this training' });
    }
    
    // Extract all employees from all nominations
    const employees = nominations.flatMap(nomination => nomination.employees);
    
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching nominations by training:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTrainingDetails = async (req, res) => {
  try {
    const { trainingId } = req.params;
    
    // First check nomination to get training_id
    const nomination = await Nomination.findById(trainingId);
    
    if (nomination) {
      // If the ID is for a nomination, get the training using the training_id field
      const trainingDetails = await TrainingEvent.findById(nomination.training_id);
      
      if (!trainingDetails) {
        return res.status(404).json({
          success: false,
          message: 'Training details not found'
        });
      }
      
      // Combine data from nomination and training
      const combinedData = {
        ...trainingDetails.toObject(),
        notification_link: nomination.notification_link || null
      };
      
      return res.status(200).json({
        success: true,
        message: 'Training details fetched successfully',
        training: combinedData
      });
    } else {
      // If not a nomination ID, try directly as a training ID
      const training = await TrainingEvent.findById(trainingId);
      
      if (!training) {
        return res.status(404).json({
          success: false,
          message: 'Training not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Training details fetched successfully',
        training
      });
    }
    
  } catch (error) {
    console.error('Error fetching training details:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching training details',
      error: error.message
    });
  }
};

// Update nomination (for attendance marking)
const updateAttendance = async (req, res) => {
  try {
    const { nominationId } = req.params;
    const { employeeAttendance } = req.body;
    
    const nomination = await Nomination.findById(nominationId);
    
    if (!nomination) {
      return res.status(404).json({ message: 'Nomination not found' });
    }
    
    // Update attendance records
    for (const [employeeId, attendance] of Object.entries(employeeAttendance)) {
      const employeeIndex = nomination.employees.findIndex(
        emp => emp._id.toString() === employeeId
      );
      
      if (employeeIndex !== -1) {
        nomination.employees[employeeIndex].attendance.marked = attendance;
      }
    }
    
    await nomination.save();
    
    res.status(200).json({
      message: 'Attendance updated successfully',
      nomination
    });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete nomination
const deleteNomination = async (req, res) => {
  try {
    const { nominationId } = req.params;
    
    const nomination = await Nomination.findByIdAndDelete(nominationId);
    
    if (!nomination) {
      return res.status(404).json({ message: 'Nomination not found' });
    }
    
    res.status(200).json({
      message: 'Nomination deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting nomination:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Resend email notification
const resendEmailNotification = async (req, res) => {
  try {
    const { nominationId, employeeIds } = req.body;
    
    const nomination = await Nomination.findById(nominationId);
    
    if (!nomination) {
      return res.status(404).json({ message: 'Nomination not found' });
    }
    
    const emailPromises = employeeIds.map(async (employeeId) => {
      const employee = nomination.employees.find(
        emp => emp._id.toString() === employeeId
      );
      
      if (!employee) {
        return { employeeId, status: 'Failed', error: 'Employee not found in nomination' };
      }
      
      try {
        // Email content
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: employee.email,
          subject: `Reminder: Nomination for Training: ${nomination.training_name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <h2 style="color: #7A1CAC;">Training Nomination Reminder</h2>
              <p>Dear ${employee.name},</p>
              <p>This is a reminder that you have been nominated for the following training:</p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <p><strong>Training Name:</strong> ${nomination.training_name}</p>
                <p><strong>From Date:</strong> ${new Date(nomination.from_date).toLocaleDateString()}</p>
                <p><strong>To Date:</strong> ${new Date(nomination.to_date).toLocaleDateString()}</p>
                <p><strong>Timing:</strong> ${nomination.from_time} to ${nomination.to_time}</p>
                ${nomination.notification_link ? `<p><strong>Resource Link:</strong> <a href="${nomination.notification_link}" target="_blank">${nomination.notification_link}</a></p>` : ''}
              </div>
              <p>Please ensure your attendance for this training session.</p>
              <p>Best regards,<br>Training Department</p>
            </div>
          `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        
        // Update email status
        const employeeIndex = nomination.employees.findIndex(
          emp => emp._id.toString() === employeeId
        );
        
        nomination.employees[employeeIndex].emailStatus = 'Sent';
        
        return { employeeId, status: 'Sent', messageId: info.messageId };
      } catch (error) {
        console.error(`Error sending email to ${employee.email}:`, error);
        return { employeeId, status: 'Failed', error: error.message };
      }
    });
    
    const emailResults = await Promise.all(emailPromises);
    
    // Save nomination with updated email statuses
    await nomination.save();
    
    res.status(200).json({
      message: 'Email notifications resent',
      emailResults
    });
  } catch (error) {
    console.error('Error resending email notifications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Export the functions
module.exports = {
  createNomination,
  getAllNominations,
  getNominationsById,
  getNominationsByTraining,
  getTrainingDetails,
  updateAttendance,
  deleteNomination,
  resendEmailNotification
};