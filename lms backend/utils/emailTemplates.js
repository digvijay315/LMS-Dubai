// // Email template generator for candidate status updates
// const generateStatusEmail = ({ candidateName, selectionStatus, offerStatus, expectedDateOfJoining }) => {
//     // Format date for display
//     const formatDate = (dateString) => {
//       if (!dateString) return 'To be determined';
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-US', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//       });
//     };
  
//     // Determine message based on selection status
//     let statusMessage = '';
//     let nextStepsMessage = '';
    
//     if (selectionStatus === 'Selected') {
//       statusMessage = 'We are pleased to inform you that you have been <strong>selected</strong> for the position.';
      
//       if (offerStatus === 'Issued and Accepted') {
//         nextStepsMessage = `
//           <p>Your offer has been issued and accepted. We are excited to have you join our team!</p>
//           <p>Your expected joining date is: <strong>${formatDate(expectedDateOfJoining)}</strong></p>
//           <p>Our HR team will be in touch with you shortly regarding visa documentation and travel arrangements.</p>
//         `;
//       } else if (offerStatus === 'Issued but Rejected') {
//         nextStepsMessage = `
//           <p>While an offer was issued, we understand you have chosen not to proceed with it.</p>
//           <p>We appreciate your interest in our organization and wish you the best in your future endeavors.</p>
//         `;
//       } else {
//         nextStepsMessage = `
//           <p>Our HR team will be in touch with you shortly with further details regarding your offer.</p>
//         `;
//       }
//     } else if (selectionStatus === 'Rejected') {
//       statusMessage = 'We appreciate your interest in our organization. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.';
//       nextStepsMessage = `
//         <p>We encourage you to apply for future opportunities that match your skills and experience.</p>
//         <p>Thank you for your time and interest in our organization.</p>
//       `;
//     }
  
//     // Build email HTML
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Application Status Update</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             color: #333;
//             max-width: 600px;
//             margin: 0 auto;
//             padding: 20px;
//           }
//           .header {
//             background-color: #003366;
//             color: white;
//             padding: 15px;
//             text-align: center;
//             border-radius: 5px 5px 0 0;
//           }
//           .content {
//             border: 1px solid #ddd;
//             border-top: none;
//             padding: 20px;
//             border-radius: 0 0 5px 5px;
//           }
//           .footer {
//             margin-top: 20px;
//             text-align: center;
//             font-size: 12px;
//             color: #666;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="header">
//           <h2>Application Status Update</h2>
//         </div>
//         <div class="content">
//           <p>Dear ${candidateName},</p>
          
//           <p>${statusMessage}</p>
          
//           ${nextStepsMessage}
          
//           <p>If you have any questions, please don't hesitate to contact our HR department.</p>
          
//           <p>Best regards,<br>
//           HR Team</p>
//         </div>
//         <div class="footer">
//           <p>This is an automated message. Please do not reply directly to this email.</p>
//         </div>
//       </body>
//       </html>
//     `;
// };

// module.exports = { generateStatusEmail };

// utils/emailGenerator.js

const mongoose = require('mongoose');

// Email template generator for candidate status updates
// const generateStatusEmail = ({ candidateName, selectionStatus, offerStatus, expectedDateOfJoining }) => {
//   // Format date for display
//   const formatDate = (dateString) => {
//     if (!dateString) return 'To be determined';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   // Determine message based on selection status
//   let statusMessage = '';
//   let nextStepsMessage = '';
  
//   if (selectionStatus === 'Selected') {
//     statusMessage = 'We are pleased to inform you that you have been <strong>selected</strong> for the position.';
    
//     if (offerStatus === 'Issued and Accepted') {
//       nextStepsMessage = `
//         <p>Your offer has been issued and accepted. We are excited to have you join our team!</p>
//         <p>Your expected joining date is: <strong>${formatDate(expectedDateOfJoining)}</strong></p>
//         <p>Our HR team will be in touch with you shortly regarding visa documentation and travel arrangements.</p>
//       `;
//     } else if (offerStatus === 'Issued but Rejected') {
//       nextStepsMessage = `
//         <p>While an offer was issued, we understand you have chosen not to proceed with it.</p>
//         <p>We appreciate your interest in our organization and wish you the best in your future endeavors.</p>
//       `;
//     } else {
//       nextStepsMessage = `
//         <p>Our HR team will be in touch with you shortly with further details regarding your offer.</p>
//       `;
//     }
//   } else if (selectionStatus === 'Rejected') {
//     statusMessage = 'We appreciate your interest in our organization. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.';
//     nextStepsMessage = `
//       <p>We encourage you to apply for future opportunities that match your skills and experience.</p>
//       <p>Thank you for your time and interest in our organization.</p>
//     `;
//   }

//   // Build email HTML
//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Application Status Update</title>
//       <style>
//         body {
//           font-family: Arial, sans-serif;
//           line-height: 1.6;
//           color: #333;
//           max-width: 600px;
//           margin: 0 auto;
//           padding: 20px;
//         }
//         .header {
//           background-color: #003366;
//           color: white;
//           padding: 15px;
//           text-align: center;
//           border-radius: 5px 5px 0 0;
//         }
//         .content {
//           border: 1px solid #ddd;
//           border-top: none;
//           padding: 20px;
//           border-radius: 0 0 5px 5px;
//         }
//         .footer {
//           margin-top: 20px;
//           text-align: center;
//           font-size: 12px;
//           color: #666;
//         }
//       </style>
//     </head>
//     <body>
//       <div class="header">
//         <h2>Application Status Update</h2>
//       </div>
//       <div class="content">
//         <p>Dear ${candidateName},</p>
        
//         <p>${statusMessage}</p>
        
//         ${nextStepsMessage}
        
//         <p>If you have any questions, please don't hesitate to contact our HR department.</p>
        
//         <p>Best regards,<br>
//         HR Team</p>
//       </div>
//       <div class="footer">
//         <p>This is an automated message. Please do not reply directly to this email.</p>
//       </div>
//     </body>
//     </html>
//   `;
// };

const generateStatusEmail = ({ 
  candidateName, 
  selectionStatus, 
  offerStatus, 
  expectedDateOfJoining,
  visaStatus,
  flightBookedDate,
  notificationType
}) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'To be determined';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Determine content based on notification type
  let headerTitle = 'Application Status Update';
  let emailContent = '';
  
  switch (notificationType) {
    case 'selection_status':
      // Initial selection notification
      headerTitle = 'Selection Status Update';
      if (selectionStatus === 'Selected') {
        emailContent = `
          <p>Dear ${candidateName},</p>
          
          <p>We are pleased to inform you that you have been <strong>selected</strong> for the position.</p>
          
          ${offerStatus === 'Issued and Accepted' ? 
            `<p>Your offer has been issued and accepted. We are excited to have you join our team!</p>
             <p>Your expected joining date is: <strong>${formatDate(expectedDateOfJoining)}</strong></p>
             <p>Our HR team will be in touch with you shortly regarding visa documentation and travel arrangements.</p>` 
            : 
            offerStatus === 'Issued but Rejected' ? 
            `<p>While an offer was issued, we understand you have chosen not to proceed with it.</p>
             <p>We appreciate your interest in our organization and wish you the best in your future endeavors.</p>` 
            : 
            `<p>Our HR team will be in touch with you shortly with further details regarding your offer.</p>`
          }
          
          <p>If you have any questions, please don't hesitate to contact our HR department.</p>
          
          <p>Best regards,<br>
          HR Team</p>
        `;
      } else if (selectionStatus === 'Rejected') {
        emailContent = `
          <p>Dear ${candidateName},</p>
          
          <p>We appreciate your interest in our organization. After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
          
          <p>We encourage you to apply for future opportunities that match your skills and experience.</p>
          <p>Thank you for your time and interest in our organization.</p>
          
          <p>Best regards,<br>
          HR Team</p>
        `;
      }
      break;
      
    case 'visa_status':
      // Visa status notification
      headerTitle = 'Visa Status Update';
      if (visaStatus === 'Issued') {
        emailContent = `
          <p>Dear ${candidateName},</p>
          
          <p>We are pleased to inform you that your <strong>visa has been successfully issued</strong>!</p>
          
          <p>This is an important milestone in your journey to joining our team. Our HR department will now proceed with arranging your travel and accommodation details.</p>
          
          <p>Your expected joining date remains: <strong>${formatDate(expectedDateOfJoining)}</strong></p>
          
          <p>Please ensure all your personal affairs are in order as we prepare for your arrival. We will be in touch shortly with flight details.</p>
          
          <p>If you have any questions or concerns, please don't hesitate to contact our HR department.</p>
          
          <p>Best regards,<br>
          HR Team</p>
        `;
      } else if (visaStatus === 'Rejected') {
        emailContent = `
          <p>Dear ${candidateName},</p>
          
          <p>We regret to inform you that your visa application has been <strong>rejected</strong> by the immigration authorities.</p>
          
          <p>We understand this is disappointing news. Our HR team would like to discuss this situation with you and explore possible next steps.</p>
          
          <p>Please contact our HR department at your earliest convenience to discuss this matter further.</p>
          
          <p>Best regards,<br>
          HR Team</p>
        `;
      }
      break;
      
    case 'flight_booking':
      // Flight booking notification
      headerTitle = 'Travel Arrangements Update';
      emailContent = `
        <p>Dear ${candidateName},</p>
        
        <p>We are pleased to inform you that your <strong>travel arrangements have been confirmed</strong>!</p>
        
        <p>Your flight has been booked for: <strong>${formatDate(flightBookedDate)}</strong></p>
        
        <p>Complete details of your itinerary will be shared with you in a separate email shortly. Please ensure you have all necessary travel documents ready, including your passport and visa.</p>
        
        <p>Your expected joining date is: <strong>${formatDate(expectedDateOfJoining)}</strong></p>
        
        <p>If you have any questions regarding your travel arrangements, please contact our HR department immediately.</p>
        
        <p>We are looking forward to welcoming you!</p>
        
        <p>Best regards,<br>
        HR Team</p>
      `;
      break;
      
    default:
      // General update
      emailContent = `
        <p>Dear ${candidateName},</p>
        
        <p>This is an update regarding your application status.</p>
        
        <p>Please log in to our candidate portal to view the latest information about your application.</p>
        
        <p>If you have any questions, please don't hesitate to contact our HR department.</p>
        
        <p>Best regards,<br>
        HR Team</p>
      `;
  }

  // Build email HTML
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${headerTitle}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #003366;
          color: white;
          padding: 15px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          border: 1px solid #ddd;
          border-top: none;
          padding: 20px;
          border-radius: 0 0 5px 5px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>${headerTitle}</h2>
      </div>
      <div class="content">
        ${emailContent}
      </div>
      <div class="footer">
        <p>This is an automated message. Please do not reply directly to this email.</p>
      </div>
    </body>
    </html>
  `;
};

// Export as both a named export and default export to ensure compatibility
module.exports = generateStatusEmail;
module.exports.generateStatusEmail = generateStatusEmail;