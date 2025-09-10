// const mongoose = require('mongoose');
// const AssessmentResponseAtten = require('../Modal/assessment_response_Atten');
// const Assessment = require('../Modal/create_assessment');
// const Attendance = require('../Modal/attendance_training');
// const register_modal = require('../Modal/employee_register'); // Assuming this is your employee model
// const { createCanvas, loadImage } = require('canvas');
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');
// const Certificate = require('../Modal/certficate_generation');

// // Format date as "Month Day, Year"
// const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// };

// // Check if employee has passed the assessment and create certificate if eligible
// const checkEligibilityAndGenerateCertificate = async (response) => {
//   try {
//     // Find the attendance record to get training details and attempt limitations
//     const attendance = await Attendance.findOne({
//       training_id: response.trainingId,
//       'employees.employee_id': response.employee_id
//     });

//     if (!attendance || !attendance.assessment) {
//       console.log('Attendance record or assessment not found');
//       return null;
//     }

//     // Check if passing criteria are met
//     const passingMarks = attendance.assessment.passing_marks || 70; // Default to 70% if not specified
//     const attemptLimit = attendance.assessment.attempt_limitation || 1; // Default to 1 if not specified
    
//     // Count previous attempts by this employee for this assessment
//     const previousAttempts = await AssessmentResponseAtten.countDocuments({
//       assessmentId: response.assessmentId,
//       employee_id: response.employee_id,
//       status: 'completed'
//     });

//     // Check if eligible for certificate
//     const isEligible = response.scorePercentage >= passingMarks && previousAttempts <= attemptLimit;
    
//     if (!isEligible) {
//       console.log(`Not eligible for certificate: Score ${response.scorePercentage}% (needed ${passingMarks}%) or exceeded attempts (${previousAttempts}/${attemptLimit})`);
//       return null;
//     }

//     // Check if certificate already exists for this employee and training
//     const existingCertificate = await Certificate.findOne({
//       employee_id: response.employee_id,
//       trainingId: attendance.training_id
//     });

//     if (existingCertificate) {
//       console.log('Certificate already exists for this employee and training');
//       return existingCertificate;
//     }

//     // Generate certificate
//     const certificateFilePath = await generateCertificatePDF(
//       response.employee_name,
//       attendance.training_name,
//       formatDate(attendance.date_from),
//       response.scorePercentage
//     );

//     // Create certificate record
//     const certificate = new Certificate({
//       employee_id: response.employee_id,
//       employee_name: response.employee_name,
//       assessmentId: response.assessmentId,
//       trainingId: attendance.training_id,
//       trainingName: attendance.training_name,
//       scorePercentage: response.scorePercentage,
//       certificateUrl: certificateFilePath
//     });

//     await certificate.save();
//     return certificate;
//   } catch (error) {
//     console.error('Error generating certificate:', error);
//     return null;
//   }
// };

// // Generate certificate PDF
// const generateCertificatePDF = async (recipientName, trainingName, trainingDate, scorePercentage) => {
//   try {
//     // Create a unique filename
//     const timestamp = Date.now();
//     const filename = `certificate_${recipientName.replace(/\s+/g, '_')}_${timestamp}.pdf`;
//     const uploadsDir = path.join(__dirname, '../uploads/certificates');
    
//     // Ensure directory exists
//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }
    
//     const outputPath = path.join(uploadsDir, filename);
    
//     // Create PDF document
//     const doc = new PDFDocument({
//       layout: 'landscape',
//       size: 'A4',
//       margin: 0
//     });
    
//     // Pipe PDF to file
//     const stream = fs.createWriteStream(outputPath);
//     doc.pipe(stream);
    
//     // Set background color
//     doc.rect(0, 0, doc.page.width, doc.page.height).fill('#ffffff');
    
//     // Add border
//     const margin = 20;
//     doc.rect(margin, margin, doc.page.width - (margin * 2), doc.page.height - (margin * 2))
//       .lineWidth(3)
//       .stroke('#003876');
    
//     // Add company logo (assuming a placeholder path, replace with actual logo path)
//     // Try to load the company logo
//     try {
//       const logoPath = path.join(__dirname, '../assets/company-logo.png');
//       if (fs.existsSync(logoPath)) {
//         doc.image(logoPath, doc.page.width / 2 - 50, 60, { width: 100 });
//       } else {
//         // If logo doesn't exist, just write the company name
//         doc.fontSize(24)
//           .font('Helvetica-Bold')
//           .text('ARROWWAI', doc.page.width / 2 - 60, 60, { align: 'center' });
//       }
//     } catch (err) {
//       console.error('Error loading logo:', err);
//       // Fallback to text
//       doc.fontSize(24)
//         .font('Helvetica-Bold')
//         .text('ARROWWAI', doc.page.width / 2 - 60, 60, { align: 'center' });
//     }
    
//     // Add certificate title
//     doc.fontSize(40)
//       .font('Helvetica-Bold')
//       .text('CERTIFICATE', 0, 150, { align: 'center' })
//       .fontSize(20)
//       .text('OF COMPLETION', 0, 195, { align: 'center' });
    
//     // Add certificate content
//     doc.fontSize(14)
//       .font('Helvetica')
//       .text('This is to certify that', 0, 240, { align: 'center' });
    
//     // Add recipient name
//     doc.fontSize(28)
//       .font('Helvetica-Bold')
//       .text(recipientName, 0, 270, { align: 'center' });
    
//     // Add description
//     doc.fontSize(14)
//       .font('Helvetica')
//       .text(
//         `has successfully completed the training program "${trainingName}" on ${trainingDate} with a score of ${Math.round(scorePercentage)}%.`,
//         100, 320, { align: 'center', width: doc.page.width - 200 }
//       );
    
//     // Add current date
//     const currentDate = formatDate(new Date());
//     doc.fontSize(12)
//       .text(`Issued on: ${currentDate}`, 0, 380, { align: 'center' });
    
//     // Add signatures
//     const signatureY = 450;
    
//     // First signature
//     doc.lineWidth(1)
//       .moveTo(doc.page.width / 4, signatureY)
//       .lineTo(doc.page.width / 4 + 150, signatureY)
//       .stroke();
    
//     doc.fontSize(14)
//       .text('Training Manager', doc.page.width / 4 - 25, signatureY + 10, { width: 200 });
    
//     // Second signature
//     doc.lineWidth(1)
//       .moveTo(doc.page.width * 3/4 - 150, signatureY)
//       .lineTo(doc.page.width * 3/4, signatureY)
//       .stroke();
    
//     doc.fontSize(14)
//       .text('Department Head', doc.page.width * 3/4 - 175, signatureY + 10, { width: 200 });
    
//     // Finalize PDF
//     doc.end();
    
//     // Return the path where certificate is saved (relative path for storing in DB)
//     return `/uploads/certificates/${filename}`;
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw error;
//   }
// };

// // Modified saveAssessmentResponseAtten function to generate certificate
// const saveAssessmentResponseAttenCertificate = async (req, res) => {
//     try {
//         const { assessmentId, employeeId, userId, employee_id, employee_name, sections, timeSpent, isTimeout } = req.body;

//         // Validate required fields
//         if (!assessmentId || !userId || !employee_id || !sections || timeSpent == null) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Missing required fields' 
//             });
//         }

//         // Fetch the original assessment
//         const assessment = await Assessment.findById(assessmentId);
//         if (!assessment) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Assessment not found'
//             });
//         }

//         // Fetch employee data
//         const employee = await register_modal.findOne({ employee_id });
//         if (!employee) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Employee not found'
//             });
//         }

//         let overallMaxPossibleScore = 0;
//         let overallEarnedScore = 0;
        
//         // Tracks scores by question type and section
//         const scoreBreakdown = {
//             MCQ: { earnedScore: 0, maxScore: 0 },
//             Text: { earnedScore: 0, maxScore: 0 },
//             MTF: { earnedScore: 0, maxScore: 0 }
//         };

//         // Process each section and calculate scores
//         const processedSections = sections.map((section, sectionIndex) => {
//             let sectionScore = 0;
//             let sectionMaxScore = 0;

//             const processedAnswers = section.answers.map(answer => {
//                 let earnedPoints = 0;
//                 let maxPoints = 0;
                
//                 // Make sure the section exists
//                 const originalSection = assessment.sections[sectionIndex];
//                 if (!originalSection) return answer;

//                 if (answer.questionType === 'MCQ') {
//                     const question = originalSection.questions
//                         .flatMap(q => q.questionMCQ)
//                         .find(q => q._id.toString() === answer.questionId.toString());

//                     if (question) {
//                         maxPoints = question.points;
//                         sectionMaxScore += maxPoints;
//                         overallMaxPossibleScore += maxPoints;
//                         scoreBreakdown.MCQ.maxScore += maxPoints;

//                         if (question.multipleAnswers) {
//                             const correctOptions = question.options.filter(opt => opt.correct).map(opt => opt.text);
//                             const userAnswers = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
//                             const correctCount = userAnswers.filter(ans => correctOptions.includes(ans)).length;
//                             const incorrectCount = userAnswers.filter(ans => !correctOptions.includes(ans)).length;
                            
//                             if (correctCount > 0 && incorrectCount === 0) {
//                                 earnedPoints = (correctCount / correctOptions.length) * maxPoints;
//                             }
//                         } else {
//                             const correctAnswer = question.options.find(opt => opt.correct)?.text;
//                             if (answer.answer === correctAnswer) {
//                                 earnedPoints = maxPoints;
//                             }
//                         }
                        
//                         scoreBreakdown.MCQ.earnedScore += earnedPoints;
//                     }
//                 } else if (answer.questionType === 'MTF') {
//                     const question = originalSection.questions
//                         .flatMap(q => q.questionMTF)
//                         .find(q => q._id.toString() === answer.questionId.toString());

//                     if (question) {
//                         maxPoints = question.points;
//                         sectionMaxScore += maxPoints;
//                         overallMaxPossibleScore += maxPoints;
//                         scoreBreakdown.MTF.maxScore += maxPoints;

//                         if (answer.answer === question.correctAnswer) {
//                             earnedPoints = maxPoints;
//                         }
                        
//                         scoreBreakdown.MTF.earnedScore += earnedPoints;
//                     }
//                 } else if (answer.questionType === 'Text') {
//                     const question = originalSection.questions
//                         .flatMap(q => q.questionText)
//                         .find(q => q._id.toString() === answer.questionId.toString());

//                     if (question) {
//                         maxPoints = question.points;
//                         sectionMaxScore += maxPoints;
//                         overallMaxPossibleScore += maxPoints;
//                         scoreBreakdown.Text.maxScore += maxPoints;
//                         earnedPoints = 0; // Text questions need manual grading
//                     }
//                 }

//                 sectionScore += earnedPoints;
//                 overallEarnedScore += earnedPoints;

//                 return {
//                     ...answer,
//                     earnedPoints,
//                     maxPoints,
//                     isCorrect: earnedPoints > 0
//                 };
//             });

//             return {
//                 ...section,
//                 answers: processedAnswers,
//                 sectionScore,
//                 sectionMaxScore
//             };
//         });

//         // Calculate score percentages
//         const overallScorePercentage = overallMaxPossibleScore > 0 
//             ? (overallEarnedScore / overallMaxPossibleScore) * 100 
//             : 0;

//         // Calculate question type percentages
//         const typeScores = {
//             MCQ: scoreBreakdown.MCQ.maxScore > 0 
//                 ? (scoreBreakdown.MCQ.earnedScore / scoreBreakdown.MCQ.maxScore) * 100 
//                 : 0,
//             Text: scoreBreakdown.Text.maxScore > 0 
//                 ? (scoreBreakdown.Text.earnedScore / scoreBreakdown.Text.maxScore) * 100 
//                 : 0,
//             MTF: scoreBreakdown.MTF.maxScore > 0 
//                 ? (scoreBreakdown.MTF.earnedScore / scoreBreakdown.MTF.maxScore) * 100 
//                 : 0
//         };

//         // Create and save the response
//         const newResponse = new AssessmentResponseAtten({
//             assessmentId,
//             employeeId: employee._id,
//             userId: userId.toString(),
//             employee_id,
//             employee_name: employee.employee_name,
//             job_title: employee.job_title,
//             status: 'completed',
//             sections: processedSections,
//             timeSpent,
//             submittedAt: new Date(),
//             isTimeout,
//             totalScore: overallEarnedScore,
//             maxPossibleScore: overallMaxPossibleScore,
//             scorePercentage: Math.round(overallScorePercentage * 100) / 100,
//             typeScores,
//             scoreBreakdown
//         });

//         await newResponse.save();

//         // Check eligibility and generate certificate if eligible
//         let certificate = null;
//         if (newResponse.status === 'completed') {
//             certificate = await checkEligibilityAndGenerateCertificate({
//                 assessmentId,
//                 employee_id,
//                 employee_name: employee.employee_name,
//                 scorePercentage: Math.round(overallScorePercentage * 100) / 100,
//                 trainingId: assessment.trainingId // Assuming assessment has trainingId field
//             });
//         }

//         res.status(201).json({ 
//             success: true, 
//             message: 'Assessment response saved successfully.',
//             score: {
//                 earned: overallEarnedScore,
//                 maximum: overallMaxPossibleScore,
//                 percentage: Math.round(overallScorePercentage * 100) / 100,
//                 typeScores,
//                 processedSections
//             },
//             certificate: certificate ? {
//                 url: certificate.certificateUrl,
//                 message: 'Congratulations! You have received a certificate for this training.'
//             } : null
//         });
//     } catch (error) {
//         console.error('Error saving assessment response:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: error.message || 'Internal Server Error' 
//         });
//     }
// };

// // Get certificate for an employee
// const getEmployeeCertificates = async (req, res) => {
//     try {
//         const { employee_id } = req.params;
        
//         if (!employee_id) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Employee ID is required'
//             });
//         }
        
//         const certificates = await Certificate.find({ employee_id })
//             .sort({ issuedDate: -1 });
        
//         res.status(200).json({
//             success: true,
//             message: 'Certificates retrieved successfully',
//             data: certificates
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error retrieving certificates',
//             error: error.message
//         });
//     }
// };

// // Download certificate
// const downloadCertificate = async (req, res) => {
//     try {
//         const { certificateId } = req.params;
        
//         const certificate = await Certificate.findById(certificateId);
//         if (!certificate) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Certificate not found'
//             });
//         }
        
//         // Get absolute path to certificate file
//         const certificatePath = path.join(__dirname, '..', certificate.certificateUrl);
        
//         // Check if file exists
//         if (!fs.existsSync(certificatePath)) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Certificate file not found'
//             });
//         }
        
//         // Set appropriate headers
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename=${path.basename(certificatePath)}`);
        
//         // Stream the file
//         const fileStream = fs.createReadStream(certificatePath);
//         fileStream.pipe(res);
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error downloading certificate',
//             error: error.message
//         });
//     }
// };

// module.exports = {
//     saveAssessmentResponseAttenCertificate,
//     getEmployeeCertificates,
//     downloadCertificate
// };








// certificateController.js
const Certificate = require('../Modal/certficate_generation');
const Attendance = require('../Modal/attendance_training');
const AssessmentResponseAtten = require('../Modal/assessment_response_Atten');
const fs = require('fs');
const path = require('path');
const { generateCertificatePDF } = require('../utils/generateCertificatePDF');

// Generate certificate for an employee who passed the assessment
const generateCertificate = async (req, res) => {
  try {
    const { assessment_response_id } = req.body;
    
    // Find the assessment response
    const assessmentResponse = await AssessmentResponseAtten.findById(assessment_response_id);
    if (!assessmentResponse) {
      return res.status(404).json({
        success: false,
        message: 'Assessment response not found'
      });
    }
    
    // Check if certificate already exists
    const existingCertificate = await Certificate.findOne({ 
      assessment_response_id,
      employee_id: assessmentResponse.employee_id
    });
    
    if (existingCertificate) {
      return res.status(200).json({
        success: true,
        message: 'Certificate already exists',
        data: existingCertificate
      });
    }
    
    // Find attendance record associated with this assessment
    const attendance = await Attendance.findOne({ 
      'assessment.assessment_id': assessmentResponse.assessmentId,
      'employees.employee_id': assessmentResponse.employee_id
    });
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }
    
    // Create certificate data
    const certificateData = {
      employeeId: assessmentResponse.employeeId,
      employee_id: assessmentResponse.employee_id,
      employee_name: assessmentResponse.employee_name,
      training_id: attendance.training_id,
      training_name: attendance.training_name,
      from_date: attendance.date_from,
      to_date: attendance.date_to,
      assessment_id: assessmentResponse.assessmentId,
      assessment_response_id: assessmentResponse._id,
      score_percentage: assessmentResponse.scorePercentage,
      // Default values for other fields will be used from the schema
    };
    
    // Create certificate record
    const certificate = await Certificate.create(certificateData);
    
    // Generate PDF (implement this function)
    const pdfPath = await generateCertificatePDF(certificate);
    
    // Update certificate with URL
    certificate.certificate_url = `/certificates/download/${certificate._id}.pdf`;
    await certificate.save();
    
    res.status(201).json({
      success: true,
      message: 'Certificate generated successfully',
      data: certificate
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error generating certificate',
      error: error.message
    });
  }
};

// Controller to auto-check and generate certificates
const autoCheckAndGenerateCertificates = async (assessmentResponseId) => {
  try {
    const assessmentResponse = await AssessmentResponseAtten.findById(assessmentResponseId);
    if (!assessmentResponse) {
      console.error('Assessment response not found');
      return { success: false };
    }
    
    // Find attendance record to get passing marks
    const attendance = await Attendance.findOne({ 
      'assessment.assessment_id': assessmentResponse.assessmentId
    });
    
    if (!attendance || !attendance.assessment) {
      console.error('Attendance record or assessment not found');
      return { success: false };
    }
    
    const passingMarks = attendance.assessment.passing_marks || 75;
    
    // Check if employee passed
    if (assessmentResponse.scorePercentage >= passingMarks) {
      // Generate certificate
      const certificateData = {
        employeeId: assessmentResponse.employeeId,
        employee_id: assessmentResponse.employee_id,
        employee_name: assessmentResponse.employee_name,
        training_id: attendance.training_id,
        training_name: attendance.training_name,
        from_date: attendance.date_from,
        to_date: attendance.date_to,
        assessment_id: assessmentResponse.assessmentId,
        assessment_response_id: assessmentResponse._id,
        score_percentage: assessmentResponse.scorePercentage
      };
      
      // Check if certificate already exists
      const existingCertificate = await Certificate.findOne({ 
        assessment_response_id: assessmentResponse._id,
        employee_id: assessmentResponse.employee_id
      });
      
      if (existingCertificate) {
        return { success: true, certificate: existingCertificate, new: false };
      }
      
      // Create certificate
      const certificate = await Certificate.create(certificateData);
      
      // Generate PDF
      const pdfPath = await generateCertificatePDF(certificate);
      
      // Update certificate with URL
      certificate.certificate_url = `/certificates/${certificate._id}.pdf`;
      await certificate.save();
      
      return { success: true, certificate, new: true };
    }
    
    return { success: false, reason: 'Score below passing marks' };
    
  } catch (error) {
    console.error('Error in auto checking and generating certificate:', error);
    return { success: false, error: error.message };
  }
};

const getEmployeeCertificates = async (req, res) => {
     try {
    const employeeId = req.params.employeeId;
    const certificates = await Certificate.find({ employee_id: employeeId })
      .sort({ generated_at: -1 });
      
    res.status(200).json({
      success: true, 
      data: certificates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

const getCertificateByID = async (req, res) => {
    try {
    const certificateId = req.params.id;
    const certificate = await Certificate.findById(certificateId);
    
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: certificate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error'
    });
  }
};

const downloadCertificate = async (req, res) => {
  try {
    const certificateId = req.params.id;
    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }
    const certificatePath = path.join(__dirname, '..', certificate.certificate_url);
    if (!fs.existsSync(certificatePath)) {
      return res.status(404).json({
        success: false,
        message: 'Certificate file not found'
      });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(certificatePath)}`);
    const fileStream = fs.createReadStream(certificatePath);
    fileStream.pipe(res);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error downloading certificate',
        });
    }
};

module.exports = {
  generateCertificate,
  autoCheckAndGenerateCertificates,
  getEmployeeCertificates,
  getCertificateByID,
  downloadCertificate
};
