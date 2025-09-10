const generateEmailTemplate = (employeeData, trainingDetails) => {
  // Extract the pre-calculated times from the employee data
  const { utc, local } = employeeData.times;
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #7A1CAC;">Training Nomination</h2>
      <p>Dear ${employeeData.employee_name},</p>
      
      <p>You have been nominated for the following training:</p>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Training Name:</strong> ${trainingDetails.training_name}</p>
        
        <p><strong>Global Time (UTC):</strong><br>
        ${new Date(utc.start).toUTCString()} - ${new Date(utc.end).toUTCString()}</p>
        
        <p><strong>Your Local Time (${employeeData.region}):</strong><br>
        ${local.start} - ${local.end}</p>
        
        <p><strong>Venue:</strong> ${trainingDetails.venue_name || 'To be announced'}</p>
        <p><strong>Mode:</strong> ${trainingDetails.training_mode}</p>
      </div>

      <p>Please confirm your attendance by clicking the link below:</p>
      <a href="${process.env.FRONTEND_URL}/confirm-training/${trainingDetails._id}/${employeeData.employee_id}" 
         style="background: #7A1CAC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-bottom: 20px;">
        Confirm Attendance
      </a>

      ${trainingDetails.notification_link ? `
      <p>Additional information: <a href="${trainingDetails.notification_link}">Click here</a></p>
      ` : ''}
      
      <p style="margin-top: 20px;">Best regards,<br>Training Team</p>
    </div>
  `;
};

module.exports = { generateEmailTemplate };