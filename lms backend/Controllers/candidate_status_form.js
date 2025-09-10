// const CandidateStatus = require('../Modal/candidate_status');
// const CandidateResponse = require('../Modal/candidate_response');
// const Candidate = require('../Modal/candidate_register');
// const nodemailer = require('nodemailer');
// const config = require('../config/config');
// const { validationResult } = require('express-validator');

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   host: config.emailHost,
//   port: config.emailPort,
//   secure: config.emailSecure,
//   auth: {
//     user: config.emailUser,
//     pass: config.emailPass
//   }
// });

// // Helper function to send email notifications
// const sendStatusEmail = async (candidate, statusType, details) => {
//   try {
//     let subject = '';
//     let content = '';

//     switch (statusType) {
//       case 'selection':
//         subject = `Application Status Update - ${details === 'Selected' ? 'Congratulations!' : 'Application Status'}`;
//         content = details === 'Selected' 
//           ? `Dear ${candidate.candidateName},\n\nCongratulations! We are pleased to inform you that you have been selected for the position. We will be in touch with further details about the offer soon.\n\nBest regards,\nHR Team`
//           : `Dear ${candidate.candidateName},\n\nThank you for your interest in our company. After careful consideration, we regret to inform you that we have decided not to move forward with your application at this time.\n\nWe appreciate your time and wish you the best in your future endeavors.\n\nBest regards,\nHR Team`;
//         break;
//       case 'offer':
//         subject = `Offer Letter Status - ${details === 'Issued and Accepted' ? 'Confirmation' : 'Update'}`;
//         content = details === 'Issued and Accepted'
//           ? `Dear ${candidate.candidateName},\n\nThank you for accepting our offer. We are excited to have you join our team!\n\nPlease prepare the necessary documents for your visa application. Our HR team will guide you through the process.\n\nBest regards,\nHR Team`
//           : `Dear ${candidate.candidateName},\n\nWe acknowledge your decision regarding our offer. We appreciate your consideration and wish you success in your future endeavors.\n\nBest regards,\nHR Team`;
//         break;
//       case 'visa':
//         subject = `Visa Application Status - ${details === 'Issued' ? 'Approved' : 'Update'}`;
//         content = details === 'Issued'
//           ? `Dear ${candidate.candidateName},\n\nGreat news! Your visa has been approved. We will now proceed with flight bookings and accommodation arrangements.\n\nBest regards,\nHR Team`
//           : `Dear ${candidate.candidateName},\n\nWe regret to inform you that there has been an issue with your visa application. Our HR team will contact you shortly to discuss the next steps.\n\nBest regards,\nHR Team`;
//         break;
//       case 'joining':
//         subject = 'Joining Details - Welcome Aboard!';
//         content = `Dear ${candidate.candidateName},\n\nWe are pleased to confirm your joining date is set for ${new Date(candidate.expectedJoiningDate).toDateString()}.\n\nHere are your accommodation details: ${candidate.accommodationStatus}\n\nPlease find attached your joining instructions and first-day agenda.\n\nWe look forward to welcoming you!\n\nBest regards,\nHR Team`;
//         break;
//       default:
//         subject = 'Application Status Update';
//         content = `Dear ${candidate.candidateName},\n\nThere has been an update to your application status. Please log in to your candidate portal for more details.\n\nBest regards,\nHR Team`;
//     }

//     const mailOptions = {
//       from: config.emailFrom,
//       to: candidate.email,
//       subject: subject,
//       text: content
//     };

//     await transporter.sendMail(mailOptions);
//     return true;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return false;
//   }
// };

//   // Initialize candidate status from candidate data
//   const initializeStatus = async (req, res) => {
//     try {
//       const candidates = await Candidate.find();
      
//       // Create status entries for candidates who don't have one
//       for (const candidate of candidates) {
//         const existingStatus = await CandidateStatus.findOne({ candidateId: candidate._id });
        
//         if (!existingStatus) {
//           await CandidateStatus.create({
//             candidateId: candidate._id,
//             tempLoginCode: candidate.tempLoginCode,
//             candidateName: candidate.candidateName || candidate.username,
//             email: candidate.email,
//             totalPercentage: candidate.totalPercentage || 0
//           });
//         }
//       }
      
//       res.status(200).json({ success: true, message: 'Candidate statuses initialized successfully' });
//     } catch (error) {
//       console.error('Error initializing candidate statuses:', error);
//       res.status(500).json({ success: false, message: 'Error initializing candidate statuses', error: error.message });
//     }
//   }

//   // Get all candidate statuses
//   const getAllStatuses = async (req, res) => {
//     try {
//       const statuses = await CandidateStatus.find().sort({ createdAt: -1 });
//       res.status(200).json({ success: true, data: statuses });
//     } catch (error) {
//       console.error('Error fetching candidate statuses:', error);
//       res.status(500).json({ success: false, message: 'Error fetching candidate statuses', error: error.message });
//     }
//   }

//   // Update candidate status
//   const updateStatus = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updateData = req.body;
      
//       // Find the candidate status
//       const candidateStatus = await CandidateStatus.findById(id);
      
//       if (!candidateStatus) {
//         return res.status(404).json({ success: false, message: 'Candidate status not found' });
//       }
      
//       // Track what's being updated to send appropriate emails
//       const statusChanges = {};
      
//       // Check for status changes that require email notifications
//       if (updateData.selectionStatus && updateData.selectionStatus !== candidateStatus.selectionStatus) {
//         statusChanges.selection = updateData.selectionStatus;
//       }
      
//       if (updateData.offerStatus && updateData.offerStatus !== candidateStatus.offerStatus) {
//         statusChanges.offer = updateData.offerStatus;
//       }
      
//       if (updateData.visaStatus && updateData.visaStatus !== candidateStatus.visaStatus) {
//         statusChanges.visa = updateData.visaStatus;
//       }
      
//       if ((updateData.expectedJoiningDate && !candidateStatus.expectedJoiningDate) || 
//           (updateData.accommodationStatus && updateData.accommodationStatus !== candidateStatus.accommodationStatus)) {
//         statusChanges.joining = true;
//       }
      
//       // Set the update timestamp
//       updateData.statusUpdatedAt = Date.now();
      
//       // Add the user who made the update if available
//       if (req.user && req.user._id) {
//         updateData.statusUpdatedBy = req.user._id;
//       }
      
//       // Update the status
//       const updatedStatus = await CandidateStatus.findByIdAndUpdate(
//         id,
//         { $set: updateData },
//         { new: true }
//       );
      
//       // Send email notifications for status changes
//       for (const [statusType, details] of Object.entries(statusChanges)) {
//         const emailSent = await sendStatusEmail(updatedStatus, statusType, details);
        
//         if (emailSent) {
//           // Record the email notification
//           await CandidateStatus.findByIdAndUpdate(
//             id,
//             { 
//               $push: { 
//                 emailNotificationsSent: {
//                   type: statusType,
//                   details: typeof details === 'boolean' ? 'notification sent' : details
//                 }
//               }
//             }
//           );
//         }
//       }
      
//       res.status(200).json({ success: true, data: updatedStatus });
//     } catch (error) {
//       console.error('Error updating candidate status:', error);
//       res.status(500).json({ success: false, message: 'Error updating candidate status', error: error.message });
//     }
//   }

//   // Update multiple candidate statuses in bulk
//   const bulkUpdateStatus = async (req, res) => {
//     try {
//       const { updates } = req.body;
      
//       if (!Array.isArray(updates) || updates.length === 0) {
//         return res.status(400).json({ success: false, message: 'Invalid updates data' });
//       }
      
//       console.log('Received update data:', JSON.stringify(updates, null, 2));
//       const results = [];
      
//       for (const update of updates) {
//         const { id, ...updateData } = update;
        
//         if (!id) {
//           results.push({ id: null, success: false, message: 'Missing candidate ID' });
//           continue;
//         }
        
//         try {
//           // Find the candidate status
//           const candidateStatus = await CandidateStatus.findById(id);
//           console.log('Found candidate status:', candidateStatus ? 'Yes' : 'No', id);
          
//           if (!candidateStatus) {
//             results.push({ id, success: false, message: 'Candidate status not found' });
//             continue;
//           }
          
//           // Set the update timestamp
//           updateData.statusUpdatedAt = Date.now();
          
//           // Add the user who made the update if available
//           if (req.user && req.user._id) {
//             updateData.statusUpdatedBy = req.user._id;
//           }
          
//           console.log('Updating candidate with data:', JSON.stringify(updateData, null, 2));
          
//           // Update the status
//           const updatedStatus = await CandidateStatus.findByIdAndUpdate(
//             id,
//             { $set: updateData },
//             { new: true }
//           );
          
//           console.log('Update result:', updatedStatus ? 'Success' : 'Failed');
          
//           // Track what's being updated to send appropriate emails
//           const statusChanges = {};
          
//           // Check for status changes that require email notifications
//           if (updateData.selectionStatus && updateData.selectionStatus !== candidateStatus.selectionStatus) {
//             statusChanges.selection = updateData.selectionStatus;
//           }
          
//           if (updateData.offerStatus && updateData.offerStatus !== candidateStatus.offerStatus) {
//             statusChanges.offer = updateData.offerStatus;
//           }
          
//           if (updateData.visaStatus && updateData.visaStatus !== candidateStatus.visaStatus) {
//             statusChanges.visa = updateData.visaStatus;
//           }
          
//           if ((updateData.expectedJoiningDate && !candidateStatus.expectedJoiningDate) || 
//               (updateData.accommodationStatus && updateData.accommodationStatus !== candidateStatus.accommodationStatus)) {
//             statusChanges.joining = true;
//           }
          
//           // Send email notifications for status changes
//           for (const [statusType, details] of Object.entries(statusChanges)) {
//             const emailSent = await sendStatusEmail(updatedStatus, statusType, details);
            
//             if (emailSent) {
//               // Record the email notification
//               await CandidateStatus.findByIdAndUpdate(
//                 id,
//                 { 
//                   $push: { 
//                     emailNotificationsSent: {
//                       type: statusType,
//                       details: typeof details === 'boolean' ? 'notification sent' : details
//                     }
//                   }
//                 }
//               );
//             }
//           }
          
//           results.push({ id, success: true, data: updatedStatus });
//         } catch (error) {
//           console.error(`Error updating candidate status ${id}:`, error);
//           results.push({ id, success: false, message: error.message });
//         }
//       }
      
//       console.log('Final results:', JSON.stringify(results, null, 2));
//       res.status(200).json({ success: true, results });
//     } catch (error) {
//       console.error('Error performing bulk update:', error);
//       res.status(500).json({ success: false, message: 'Error performing bulk update', error: error.message });
//     }
//   };

//   // Get status history for a candidate
//   const getStatusHistory = async (req, res) => {
//     try {
//       const { id } = req.params;
      
//       const candidateStatus = await CandidateStatus.findById(id)
//         .populate('statusUpdatedBy', 'username email')
//         .lean();
      
//       if (!candidateStatus) {
//         return res.status(404).json({ success: false, message: 'Candidate status not found' });
//       }
      
//       res.status(200).json({ success: true, data: candidateStatus });
//     } catch (error) {
//       console.error('Error fetching candidate status history:', error);
//       res.status(500).json({ success: false, message: 'Error fetching candidate status history', error: error.message });
//     }
//   }

//   // Get status by candidate ID
//   const getStatusByCandidateId = async (req, res) => {
//     try {
//       const { candidateId } = req.params;
      
//       const candidateStatus = await CandidateStatus.findOne({ candidateId });
      
//       if (!candidateStatus) {
//         return res.status(404).json({ success: false, message: 'Candidate status not found' });
//       }
      
//       res.status(200).json({ success: true, data: candidateStatus });
//     } catch (error) {
//       console.error('Error fetching candidate status:', error);
//       res.status(500).json({ success: false, message: 'Error fetching candidate status', error: error.message });
//     }
//   }

//   // In your controller file (e.g., candidateStatusController.js)
// const checkCandidateData = async (req, res) => {
//     try {
//       const candidateCount = await Candidate.countDocuments();
//       const statusCount = await CandidateStatus.countDocuments();
      
//       res.status(200).json({
//         success: true,
//         candidateCount,
//         statusCount,
//         message: `Found ${candidateCount} candidates and ${statusCount} status records`
//       });
//     } catch (error) {
//       console.error('Error checking candidate data:', error);
//       res.status(500).json({ success: false, message: 'Error checking candidate data', error: error.message });
//     }
//   };


// module.exports = { initializeStatus, getAllStatuses, updateStatus, bulkUpdateStatus, getStatusHistory, getStatusByCandidateId, checkCandidateData};




// const getAllCandidateStatuses = async (req, res) => {
//     try {
//       const candidateStatuses = await CandidateStatus.find()
//         .sort({ createdAt: -1 });
      
//       return res.status(200).json({
//         success: true,
//         data: candidateStatuses
//       });
//     } catch (error) {
//       console.error('Error fetching candidate statuses:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error fetching candidate statuses',
//         error: error.message
//       });
//     }
//   };
  
//   const getCandidateStatusById = async (req, res) => {
//     try {
//       const candidateStatus = await CandidateStatus.findById(req.params.id);
      
//       if (!candidateStatus) {
//         return res.status(404).json({
//           success: false,
//           message: 'Candidate status not found'
//         });
//       }
      
//       return res.status(200).json({
//         success: true,
//         data: candidateStatus
//       });
//     } catch (error) {
//       console.error('Error fetching candidate status:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error fetching candidate status',
//         error: error.message
//       });
//     }
//   };
  
//   const initializeCandidateStatuses = async (req, res) => {
//     try {
//       // Get all candidate responses that have been submitted
//       const candidateResponses = await CandidateResponse.find({ status: 'submitted' });
      
//       let created = 0;
//       let existing = 0;
      
//       for (const response of candidateResponses) {
//         // Check if a status record already exists
//         const existingStatus = await CandidateStatus.findOne({ candidateResponseId: response._id });
        
//         if (!existingStatus) {
//           // Get candidate details
//           const candidate = await Candidate.findById(response.candidateId);
          
//           if (candidate) {
//             // Create new status record
//             await CandidateStatus.create({
//               candidateId: response.candidateId,
//               candidateResponseId: response._id,
//               candidateName: response.candidateName,
//               tempLoginCode: response.tempLoginCode,
//               email: candidate.email,
//               totalPercentage: response.totalPercentage,
//               selectionStatus: 'Pending'
//             });
            
//             created++;
//           }
//         } else {
//           existing++;
//         }
//       }
      
//       return res.status(200).json({
//         success: true,
//         message: `Initialized ${created} new candidate statuses. ${existing} statuses already existed.`
//       });
//     } catch (error) {
//       console.error('Error initializing candidate statuses:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error initializing candidate statuses',
//         error: error.message
//       });
//     }
//   };
  
//   const updateCandidateStatus = async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({
//           success: false,
//           errors: errors.array()
//         });
//       }
      
//       const { id } = req.params;
//       const updates = req.body;
//       const userId = req.user ? req.user._id : null;
      
//       // Find the status record
//       const candidateStatus = await CandidateStatus.findById(id);
      
//       if (!candidateStatus) {
//         return res.status(404).json({
//           success: false,
//           message: 'Candidate status not found'
//         });
//       }
      
//       // Update the record
//       Object.keys(updates).forEach(key => {
//         // Only update fields that are provided
//         if (updates[key] !== undefined && updates[key] !== null) {
//           candidateStatus[key] = updates[key];
//         }
//       });
      
//       // Add last updated by
//       candidateStatus.lastUpdatedBy = userId;
      
//       // Save the updated record
//       await candidateStatus.save();
      
//       return res.status(200).json({
//         success: true,
//         message: 'Candidate status updated successfully',
//         data: candidateStatus
//       });
//     } catch (error) {
//       console.error('Error updating candidate status:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error updating candidate status',
//         error: error.message
//       });
//     }
//   };
  
//   const sendStatusEmail = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const { customMessage } = req.body;
      
//       const candidateStatus = await CandidateStatus.findById(id);
      
//       if (!candidateStatus) {
//         return res.status(404).json({
//           success: false,
//           message: 'Candidate status not found'
//         });
//       }
      
//       // Determine email type and content based on selection status
//       let subject, htmlContent, messageType;
      
//       if (candidateStatus.selectionStatus === 'Selected') {
//         subject = 'Congratulations! You have been selected';
//         messageType = 'Selection';
//         htmlContent = `
//           <h1>Congratulations ${candidateStatus.candidateName}!</h1>
//           <p>We are pleased to inform you that you have been selected based on your CAT test performance.</p>
//           <p>Your test score: ${candidateStatus.totalPercentage}%</p>
//           ${customMessage ? `<p>${customMessage}</p>` : ''}
//           <p>Please find additional details below:</p>
//           <ul>
//             ${candidateStatus.offerStatus !== 'Pending' ? `<li>Offer Status: ${candidateStatus.offerStatus}</li>` : ''}
//             ${candidateStatus.expectedJoiningDate ? `<li>Expected Joining Date: ${new Date(candidateStatus.expectedJoiningDate).toDateString()}</li>` : ''}
//             ${candidateStatus.accommodationStatus !== 'Pending' ? `<li>Accommodation Status: ${candidateStatus.accommodationStatus}</li>` : ''}
//           </ul>
//           <p>We will be in touch with further details shortly.</p>
//           <p>Thank you for your interest in our organization.</p>
//         `;
//       } else if (candidateStatus.selectionStatus === 'Rejected') {
//         subject = 'Application Status Update';
//         messageType = 'Rejection';
//         htmlContent = `
//           <h1>Dear ${candidateStatus.candidateName},</h1>
//           <p>Thank you for your interest in our organization and for taking the time to complete our CAT test.</p>
//           <p>After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
//           ${customMessage ? `<p>${customMessage}</p>` : ''}
//           <p>We appreciate your interest and wish you the best in your future endeavors.</p>
//         `;
//       } else {
//         // Generic status update
//         subject = 'Application Status Update';
//         messageType = 'Status Update';
//         htmlContent = `
//           <h1>Dear ${candidateStatus.candidateName},</h1>
//           <p>We are writing to provide an update on your application status.</p>
//           <p>Your current status is: ${candidateStatus.selectionStatus}</p>
//           ${customMessage ? `<p>${customMessage}</p>` : ''}
//           <p>We will be in touch with further updates soon.</p>
//           <p>Thank you for your patience.</p>
//         `;
//       }
      
//       // Send email
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: candidateStatus.email,
//         subject: subject,
//         html: htmlContent
//       };
      
//       await transporter.sendMail(mailOptions);
      
//       // Update the status record with email history
//       candidateStatus.lastEmailSentDate = new Date();
//       candidateStatus.emailHistory.push({
//         subject,
//         sentDate: new Date(),
//         status: 'Sent',
//         messageType
//       });
      
//       await candidateStatus.save();
      
//       return res.status(200).json({
//         success: true,
//         message: 'Status email sent successfully',
//         data: candidateStatus
//       });
//     } catch (error) {
//       console.error('Error sending status email:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error sending status email',
//         error: error.message
//       });
//     }
//   };
  
//   const bulkUpdateCandidateStatus = async (req, res) => {
//     try {
//       const { candidateIds, updates } = req.body;
//       const userId = req.user ? req.user._id : null;
      
//       if (!candidateIds || !Array.isArray(candidateIds) || candidateIds.length === 0) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid candidate IDs provided'
//         });
//       }
      
//       // Update multiple records
//       const result = await CandidateStatus.updateMany(
//         { _id: { $in: candidateIds } },
//         { 
//           $set: { 
//             ...updates,
//             lastUpdatedBy: userId
//           } 
//         }
//       );
      
//       return res.status(200).json({
//         success: true,
//         message: `Updated ${result.modifiedCount} candidate status records`,
//         data: result
//       });
//     } catch (error) {
//       console.error('Error bulk updating candidate statuses:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error bulk updating candidate statuses',
//         error: error.message
//       });
//     }
//   };
  
//   const deleteCandidateStatus = async (req, res) => {
//     try {
//       const { id } = req.params;
      
//       const result = await CandidateStatus.findByIdAndDelete(id);
      
//       if (!result) {
//         return res.status(404).json({
//           success: false,
//           message: 'Candidate status not found'
//         });
//       }
      
//       return res.status(200).json({
//         success: true,
//         message: 'Candidate status deleted successfully'
//       });
//     } catch (error) {
//       console.error('Error deleting candidate status:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Error deleting candidate status',
//         error: error.message
//       });
//     }
//   };

//   module.exports = { getAllCandidateStatuses, getCandidateStatusById, initializeCandidateStatuses, updateCandidateStatus, sendStatusEmail, bulkUpdateCandidateStatus, deleteCandidateStatus }





const CandidateStatus = require('../Modal/candidate_status');
const Candidate = require('../Modal/candidate_register');
const CandidateResponse = require('../Modal/candidate_response');
const nodemailer = require('nodemailer');
// const generateStatusEmail = require('../utils/emailTemplates');
const generateStatusEmail = require('../utils/emailTemplates');

// Configure your email transporter
const transporter = nodemailer.createTransport({
  // Replace with your email provider configuration
  service: 'gmail',
  auth: {
    user: 'mrvivek258@gmail.com',
    pass: 'bguk appp yrle wuzo'
  }
});

// Get all candidates who have taken the CAT test
const getCandidatesWithCATTest = async (req, res) => {
  try {
    // Get all candidate responses (those who have taken the test)
    const candidateResponses = await CandidateResponse.find({
      status: { $in: ['submitted', 'reviewed'] } // Only completed tests
    }).sort({ createdAt: -1 });

    // Map the responses to include candidate status if available
    const candidatesWithStatus = await Promise.all(
      candidateResponses.map(async (response) => {
        // Try to find existing status record
        const statusRecord = await CandidateStatus.findOne({
          responseId: response._id
        });

        // If status exists, merge with response data
        if (statusRecord) {
          return {
            _id: response._id,
            candidateId: response.candidateId,
            candidateName: response.candidateName,
            tempLoginCode: response.candidateUsername,
            totalPercentage: response.totalPercentage,
            selectionStatus: statusRecord.selectionStatus,
            offerStatus: statusRecord.offerStatus,
            acceptedRejectedDate: statusRecord.acceptedRejectedDate,
            visaDocumentReceivedDate: statusRecord.visaDocumentReceivedDate,
            visaAppliedDate: statusRecord.visaAppliedDate,
            visaStatus: statusRecord.visaStatus,
            flightBookedDate: statusRecord.flightBookedDate,
            accommodationStatus: statusRecord.accommodationStatus,
            expectedDateOfJoining: statusRecord.expectedDateOfJoining,
            actualDateOfJoining: statusRecord.actualDateOfJoining,
            emailSent: statusRecord.emailSent,
            hasStatus: true
          };
        }

        // Return response data with empty status fields
        return {
          _id: response._id,
          candidateId: response.candidateId,
          candidateName: response.candidateName,
          tempLoginCode: response.candidateUsername,
          totalPercentage: response.totalPercentage,
          selectionStatus: '',
          offerStatus: '',
          acceptedRejectedDate: null,
          visaDocumentReceivedDate: null,
          visaAppliedDate: null,
          visaStatus: '',
          flightBookedDate: null,
          accommodationStatus: '',
          expectedDateOfJoining: null,
          actualDateOfJoining: null,
          emailSent: false,
          hasStatus: false
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: candidatesWithStatus
    });
  } catch (error) {
    console.error('Error fetching candidates with CAT test:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Update or create candidate status
// const updateCandidateStatus = async (req, res) => {
//   try {
//     const { responseId } = req.params;
    
//     // Find the candidate response
//     const candidateResponse = await CandidateResponse.findById(responseId);
//     if (!candidateResponse) {
//       return res.status(404).json({
//         success: false,
//         message: 'Candidate response not found'
//       });
//     }

//     // Extract data from request body
//     const {
//       selectionStatus,
//       offerStatus,
//       acceptedRejectedDate,
//       visaDocumentReceivedDate,
//       visaAppliedDate,
//       visaStatus,
//       flightBookedDate,
//       accommodationStatus,
//       expectedDateOfJoining,
//       actualDateOfJoining,
//       sendEmail
//     } = req.body;

//     // Find existing status or create new one
//     let candidateStatus = await CandidateStatus.findOne({ responseId });
    
//     if (!candidateStatus) {
//       candidateStatus = new CandidateStatus({
//         candidateId: candidateResponse.candidateId,
//         responseId: candidateResponse._id,
//         candidateName: candidateResponse.candidateName,
//         email: candidateResponse.email,
//         nationality: candidateResponse.nationality,
//         qualification: candidateResponse.qualification,
//         tempLoginCode: candidateResponse.candidateUsername,
//         totalPercentage: candidateResponse.totalPercentage
//       });
//     }

//     // Update status fields
//     candidateStatus.selectionStatus = selectionStatus;
//     candidateStatus.offerStatus = offerStatus;
//     candidateStatus.acceptedRejectedDate = acceptedRejectedDate || null;
//     candidateStatus.visaDocumentReceivedDate = visaDocumentReceivedDate || null;
//     candidateStatus.visaAppliedDate = visaAppliedDate || null;
//     candidateStatus.visaStatus = visaStatus;
//     candidateStatus.flightBookedDate = flightBookedDate || null;
//     candidateStatus.accommodationStatus = accommodationStatus;
//     candidateStatus.expectedDateOfJoining = expectedDateOfJoining || null;
//     candidateStatus.actualDateOfJoining = actualDateOfJoining || null;
//     candidateStatus.updatedAt = Date.now();

//     // Save status
//     await candidateStatus.save();

//     // Send email notification if requested
//     if (sendEmail) {
//       try {
//         // Get candidate email
//         const candidate = await Candidate.findById(candidateResponse.candidateId);
//         if (!candidate) {
//           return res.status(404).json({
//             success: false,
//             message: 'Candidate not found'
//           });
//         }

//         // Generate email content - use the function directly
//         const emailContent = generateStatusEmailFunction({
//           candidateName: candidateResponse.candidateName,
//           selectionStatus,
//           offerStatus,
//           expectedDateOfJoining
//         });

//         // Send email
//         const mailOptions = {
//           from: 'mrvivek258@gmail.com',
//           to: candidate.email,
//           subject: `Your Application Status Update`,
//           html: emailContent
//         };

//         await transporter.sendMail(mailOptions);

//         // Update email sent status
//         candidateStatus.emailSent = true;
//         candidateStatus.emailSentAt = Date.now();
//         candidateStatus.emailContent = emailContent;
//         await candidateStatus.save();
//       } catch (emailError) {
//         console.error('Error sending email:', emailError);
//         // Don't fail the whole request if just the email fails
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Candidate status updated successfully',
//       data: candidateStatus
//     });
//   } catch (error) {
//     console.error('Error updating candidate status:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// const updateCandidateStatus = async (req, res) => {
//   try {
//     const { responseId } = req.params;
    
//     // Find the candidate response
//     const candidateResponse = await CandidateResponse.findById(responseId);
//     if (!candidateResponse) {
//       return res.status(404).json({
//         success: false,
//         message: 'Candidate response not found'
//       });
//     }

//     // Find the candidate to get their email, nationality, and qualification
//     const candidate = await Candidate.findById(candidateResponse.candidateId);
//     if (!candidate) {
//       return res.status(404).json({
//         success: false,
//         message: 'Candidate not found'
//       });
//     }

//     // Extract data from request body
//     const {
//       selectionStatus,
//       offerStatus,
//       acceptedRejectedDate,
//       visaDocumentReceivedDate,
//       visaAppliedDate,
//       visaStatus,
//       flightBookedDate,
//       accommodationStatus,
//       expectedDateOfJoining,
//       actualDateOfJoining,
//       sendEmail
//     } = req.body;

//     // Find existing status or create new one
//     let candidateStatus = await CandidateStatus.findOne({ responseId });
    
//     if (!candidateStatus) {
//       candidateStatus = new CandidateStatus({
//         candidateId: candidateResponse.candidateId,
//         responseId: candidateResponse._id,
//         candidateName: candidateResponse.candidateName,
//         tempLoginCode: candidateResponse.candidateUsername,
//         totalPercentage: candidateResponse.totalPercentage
//       });
//     }

//     // Update fields from the Candidate model
//     candidateStatus.email = candidate.email;
//     candidateStatus.nationality = candidate.nationality;
//     candidateStatus.qualification = candidate.qualification;

//     // Update status fields
//     candidateStatus.selectionStatus = selectionStatus;
//     candidateStatus.offerStatus = offerStatus;
//     candidateStatus.acceptedRejectedDate = acceptedRejectedDate || null;
//     candidateStatus.visaDocumentReceivedDate = visaDocumentReceivedDate || null;
//     candidateStatus.visaAppliedDate = visaAppliedDate || null;
//     candidateStatus.visaStatus = visaStatus;
//     candidateStatus.flightBookedDate = flightBookedDate || null;
//     candidateStatus.accommodationStatus = accommodationStatus;
//     candidateStatus.expectedDateOfJoining = expectedDateOfJoining || null;
//     candidateStatus.actualDateOfJoining = actualDateOfJoining || null;
//     candidateStatus.updatedAt = Date.now();

//     // Save status
//     await candidateStatus.save();

//     // Send email notification if requested
//     if (sendEmail) {
//       try {
//         // Generate email content - use the function directly
//         const emailContent = generateStatusEmailFunction({
//           candidateName: candidateResponse.candidateName,
//           selectionStatus,
//           offerStatus,
//           expectedDateOfJoining
//         });

//         // Send email
//         const mailOptions = {
//           from: 'mrvivek258@gmail.com',
//           to: candidate.email,
//           subject: `Your Application Status Update`,
//           html: emailContent
//         };

//         await transporter.sendMail(mailOptions);

//         // Update email sent status
//         candidateStatus.emailSent = true;
//         candidateStatus.emailSentAt = Date.now();
//         candidateStatus.emailContent = emailContent;
//         await candidateStatus.save();
//       } catch (emailError) {
//         console.error('Error sending email:', emailError);
//         // Don't fail the whole request if just the email fails
//       }
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Candidate status updated successfully',
//       data: candidateStatus
//     });
//   } catch (error) {
//     console.error('Error updating candidate status:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

const updateCandidateStatus = async (req, res) => {
  try {
    const { responseId } = req.params;
    
    // Find the candidate response
    const candidateResponse = await CandidateResponse.findById(responseId);
    if (!candidateResponse) {
      return res.status(404).json({
        success: false,
        message: 'Candidate response not found'
      });
    }

    // Find the candidate to get their email, nationality, and qualification
    const candidate = await Candidate.findById(candidateResponse.candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    // Extract data from request body
    const {
      selectionStatus,
      offerStatus,
      acceptedRejectedDate,
      visaDocumentReceivedDate,
      visaAppliedDate,
      visaStatus,
      flightBookedDate,
      accommodationStatus,
      expectedDateOfJoining,
      actualDateOfJoining,
      sendEmail,
      notificationType // New field to determine type of notification
    } = req.body;

    // Find existing status or create new one
    let candidateStatus = await CandidateStatus.findOne({ responseId });
    
    if (!candidateStatus) {
      candidateStatus = new CandidateStatus({
        candidateId: candidateResponse.candidateId,
        responseId: candidateResponse._id,
        candidateName: candidateResponse.candidateName,
        tempLoginCode: candidateResponse.candidateUsername,
        totalPercentage: candidateResponse.totalPercentage
      });
    }

    // Track previous values for change detection
    const previousStatus = {
      selectionStatus: candidateStatus.selectionStatus,
      visaStatus: candidateStatus.visaStatus,
      flightBookedDate: candidateStatus.flightBookedDate
    };

    // Update fields from the Candidate model
    candidateStatus.email = candidate.email;
    candidateStatus.nationality = candidate.nationality;
    candidateStatus.qualification = candidate.qualification;

    // Update status fields
    candidateStatus.selectionStatus = selectionStatus;
    candidateStatus.offerStatus = offerStatus;
    candidateStatus.acceptedRejectedDate = acceptedRejectedDate || null;
    candidateStatus.visaDocumentReceivedDate = visaDocumentReceivedDate || null;
    candidateStatus.visaAppliedDate = visaAppliedDate || null;
    candidateStatus.visaStatus = visaStatus;
    candidateStatus.flightBookedDate = flightBookedDate || null;
    candidateStatus.accommodationStatus = accommodationStatus;
    candidateStatus.expectedDateOfJoining = expectedDateOfJoining || null;
    candidateStatus.actualDateOfJoining = actualDateOfJoining || null;
    candidateStatus.updatedAt = Date.now();

    // Save status
    await candidateStatus.save();

    // Determine notification type if not specified
    let emailNotificationType = notificationType;
    
    if (!emailNotificationType) {
      // Auto-detect changes to determine notification type
      if (selectionStatus !== previousStatus.selectionStatus) {
        emailNotificationType = 'selection_status';
      } else if (visaStatus !== previousStatus.visaStatus && visaStatus) {
        emailNotificationType = 'visa_status';
      } else if (flightBookedDate !== previousStatus.flightBookedDate && flightBookedDate) {
        emailNotificationType = 'flight_booking';
      } else {
        emailNotificationType = 'general_update';
      }
    }

    // Send email notification if requested
    if (sendEmail) {
      try {
        // Generate email content based on notification type
        const emailContent = generateStatusEmail({
          candidateName: candidateResponse.candidateName,
          selectionStatus,
          offerStatus,
          expectedDateOfJoining,
          visaStatus,
          flightBookedDate,
          notificationType: emailNotificationType
        });

        // Set subject based on notification type
        let emailSubject = 'Your Application Status Update';
        
        switch (emailNotificationType) {
          case 'selection_status':
            emailSubject = 'Your Selection Status Update';
            break;
          case 'visa_status':
            emailSubject = 'Your Visa Status Update';
            break;
          case 'flight_booking':
            emailSubject = 'Your Travel Arrangements Update';
            break;
        }

        // Send email
        const mailOptions = {
          from: 'mrvivek258@gmail.com',
          to: candidate.email,
          subject: emailSubject,
          html: emailContent
        };

        await transporter.sendMail(mailOptions);

        // Update email history
        const emailHistory = candidateStatus.emailHistory || [];
        emailHistory.push({
          type: emailNotificationType,
          sentAt: Date.now(),
          content: emailContent
        });
        
        candidateStatus.emailHistory = emailHistory;
        candidateStatus.emailSent = true;
        candidateStatus.emailSentAt = Date.now();
        candidateStatus.emailContent = emailContent;
        await candidateStatus.save();
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the whole request if just the email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Candidate status updated successfully',
      data: candidateStatus
    });
  } catch (error) {
    console.error('Error updating candidate status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get status for a specific candidate
const getCandidateStatus = async (req, res) => {
  try {
    const { responseId } = req.params;
    
    const candidateStatus = await CandidateStatus.findOne({ responseId });
    
    if (!candidateStatus) {
      return res.status(404).json({
        success: false,
        message: 'Candidate status not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: candidateStatus
    });
  } catch (error) {
    console.error('Error fetching candidate status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Controller function to get all selected candidates
const getSelectedCandidates = async (req, res) => {
  try {
    // Query the database for candidates with selectionStatus = 'Selected'
    const selectedCandidates = await CandidateStatus.find({ selectionStatus: 'Selected' })
      .populate('candidateId') // Optional: Populate the referenced Candidate document
      .populate('responseId') // Optional: Populate the referenced CandidateResponse document
      .sort({ updatedAt: -1 }); // Optional: Sort by most recently updated

    // Return the selected candidates
    return res.status(200).json({
      success: true,
      count: selectedCandidates.length,
      data: selectedCandidates
    });
  } catch (error) {
    console.error('Error fetching selected candidates:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

  // Get all candidate statuses
  const getAllStatuses = async (req, res) => {
    try {
      const statuses = await CandidateStatus.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: statuses });
    } catch (error) {
      console.error('Error fetching candidate statuses:', error);
      res.status(500).json({ success: false, message: 'Error fetching candidate statuses', error: error.message });
    }
  }

module.exports = { getCandidatesWithCATTest, updateCandidateStatus, getCandidateStatus, getSelectedCandidates, getAllStatuses };