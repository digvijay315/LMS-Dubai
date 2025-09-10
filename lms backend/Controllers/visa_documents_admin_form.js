const Candidate = require('../Modal/candidate_register');
const VisaDocument = require('../Modal/visa_documnets_admin')
const CandidateDocumentStatus = require('../Modal/candidate_document_status');
const Project = require('../Modal/hr_create_project');
const nodemailer = require('nodemailer');

  // Create email transporter
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mrvivek258@gmail.com',
        pass: 'bguk appp yrle wuzo'
      }
  });


  // Controller to create visa document requirements and notify candidates
  const createVisaDocuments = async (req, res) => {
      try {
        const { projectId, candidates, documents } = req.body;
    
        // Validate inputs
        if (!projectId || !candidates || !candidates.length || !documents || !documents.length) {
          return res.status(400).json({
            success: false,
            message: 'Project, candidates, and documents are required'
          });
        }
    
        // Check if project exists
        const project = await Project.findById(projectId);
        if (!project) {
          return res.status(404).json({
            success: false,
            message: 'Project not found'
          });
        }
    
        // Check if all candidates exist
        const candidateRecords = await Candidate.find({ _id: { $in: candidates } });
        if (candidateRecords.length !== candidates.length) {
          return res.status(404).json({
            success: false,
            message: 'One or more candidates not found'
          });
        }
    
        // Create the visa document requirements
        const formattedDocuments = documents.map(doc => ({
          name: doc,
          required: true
        }));
    
        const visaDocument = new VisaDocument({
          project: projectId,
          candidates: candidates,
          documents: formattedDocuments,
          status: 'pending'
        });
    
        await visaDocument.save();
    
        // Create document status records for each candidate
        const statusPromises = candidates.map(candidateId => {
          const documentStatuses = documents.map(doc => ({
            document: doc,
            status: 'pending'
          }));
    
          return new CandidateDocumentStatus({
            visaDocument: visaDocument._id,
            candidate: candidateId,
            documentStatuses: documentStatuses,
            overallStatus: 'pending'
          }).save();
        });
    
        await Promise.all(statusPromises);
    
        // Send emails to candidates
        for (const candidate of candidateRecords) {
          if (candidate.email) {
            try {
              // Fix: Pass individual parameters to generateEmailContent
              const emailContent = generateEmailContent(candidate, documents, project);
              
              await transporter.sendMail({
                from: 'mrvivek258@gmail.com',
                to: candidate.email,
                subject: `Required Documents for ${project.name} Project`,
                html: emailContent
              });
      
            } catch (emailError) {
              console.error(`Failed to send email to ${candidate.email}:`, emailError);
              // Continue with the next candidate if email fails
            }
          }
        }
    
        // Update visa document status to sent
        visaDocument.status = 'sent';
        await visaDocument.save();
    
        return res.status(201).json({
          success: true,
          message: 'Visa documents created and emails sent to candidates',
          data: visaDocument
        });
      } catch (error) {
        console.error('Error creating visa documents:', error);
        return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message
        });
      }
  };

  // Helper function to generate email content
  function generateEmailContent(candidate, documents, project) {
    let loginUrl = 'https://pp-projects.vercel.app/HRdashboard'
      let content = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Required Documents for Project: ${project.name}</h2>
          <p>Dear ${candidate.candidateName},</p>
          <p>As part of the visa process for the ${project.name} project, please provide the following documents:</p>
          <ul>
      `;
    
      documents.forEach(doc => {
        content += `<li>${doc}</li>`;
      });
    
      content += `
          </ul>
          <p>Please <a href="${loginUrl}" style="color: #007bff; text-decoration: underline;">click here</a> to log in to the portal and submit these documents as soon as possible.</p>
          <p>Your login credentials:</p>
          <ul>
            <li>Username: ${candidate.username || candidate.email}</li>
            <li>Temporary Login Code: (Sent separately for security reasons)</li>
          </ul>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Thank you,</p>
          <p>HR Department</p>
        </div>
      `;
    
      return content;
  }

// Get all visa documents
  const getAllVisaDocuments = async (req, res) => {
    try {
      const visaDocuments = await VisaDocument.find()
        .populate('project', 'code name')
        .populate('candidates', 'candidateName email')
        .sort({ createdAt: -1 });
  
      return res.status(200).json({
        success: true,
        data: visaDocuments
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };
  
  // Get visa documents by project
  const getVisaDocumentsByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      
      const visaDocuments = await VisaDocument.find({ project: projectId })
        .populate('project', 'code name')
        .populate('candidates', 'candidateName email')
        .sort({ createdAt: -1 });
  
      return res.status(200).json({
        success: true,
        data: visaDocuments
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };

  // Get candidate document status
  const getCandidateDocumentStatus = async (req, res) => {
      try {
        const { candidateId } = req.params;
        
        const documentStatuses = await CandidateDocumentStatus.find({ candidate: candidateId })
         .populate({
  path: 'visaDocument',
  populate: { path: 'project', select: 'name code' }
})

          .populate('candidate', 'candidateName email')
          .sort({ createdAt: -1 });
    
        return res.status(200).json({
          success: true,
          data: documentStatuses
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: error.message
        });
      }
  };
  
  // Update candidate document status
  // const updateDocumentStatus = async (req, res) => {
  //   try {
  //     const { statusId, documentName, status, comments, file } = req.body;
      
  //     const documentStatus = await CandidateDocumentStatus.findById(statusId);
  //     if (!documentStatus) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Document status not found'
  //       });
  //     }
  
  //     const docIndex = documentStatus.documentStatuses.findIndex(doc => doc.document === documentName);
  //     if (docIndex === -1) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Document not found in status'
  //       });
  //     }
  
  //     // Update the specific document status
  //     documentStatus.documentStatuses[docIndex].status = status;
  //     if (comments) documentStatus.documentStatuses[docIndex].comments = comments;
  //     if (file) documentStatus.documentStatuses[docIndex].submittedFile = file;
  //     if (status === 'submitted') documentStatus.documentStatuses[docIndex].submittedAt = new Date();
  
  //     // Update overall status based on all documents
  //     const allSubmitted = documentStatus.documentStatuses.every(doc => doc.status !== 'pending');
  //     const allCompleted = documentStatus.documentStatuses.every(doc => 
  //       doc.status === 'approved' || doc.status === 'rejected'
  //     );
  
  //     if (allCompleted) {
  //       documentStatus.overallStatus = 'completed';
  //     } else if (allSubmitted || documentStatus.documentStatuses.some(doc => doc.status !== 'pending')) {
  //       documentStatus.overallStatus = 'in_progress';
  //     }
  
  //     documentStatus.updatedAt = new Date();
  //     await documentStatus.save();
  
  //     return res.status(200).json({
  //       success: true,
  //       message: 'Document status updated successfully',
  //       data: documentStatus
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Internal server error',
  //       error: error.message
  //     });
  //   }
  // };

  const updateDocumentStatus = async (req, res) => {
    try {
      const { statusId, documentName, status, comments, file } = req.body;
      
      const documentStatus = await CandidateDocumentStatus.findById(statusId);
      if (!documentStatus) {
        return res.status(404).json({
          success: false,
          message: 'Document status not found'
        });
      }
  
      // Populate the candidate and visa document information (necessary for email)
      await documentStatus.populate([
        { path: 'candidate' },
        { path: 'visaDocument', populate: { path: 'project' } }
      ]);
  
      const docIndex = documentStatus.documentStatuses.findIndex(doc => doc.document === documentName);
      if (docIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Document not found in status'
        });
      }
  
      // Update the specific document status
      documentStatus.documentStatuses[docIndex].status = status;
      if (comments) documentStatus.documentStatuses[docIndex].comments = comments;
      if (file) documentStatus.documentStatuses[docIndex].submittedFile = file;
      if (status === 'submitted') documentStatus.documentStatuses[docIndex].submittedAt = new Date();
  
      // Update overall status based on all documents
      const allSubmitted = documentStatus.documentStatuses.every(doc => doc.status !== 'pending');
      const allCompleted = documentStatus.documentStatuses.every(doc => 
        doc.status === 'approved' || doc.status === 'rejected'
      );
  
      if (allCompleted) {
        documentStatus.overallStatus = 'completed';
      } else if (allSubmitted || documentStatus.documentStatuses.some(doc => doc.status !== 'pending')) {
        documentStatus.overallStatus = 'in_progress';
      }
  
      documentStatus.updatedAt = new Date();
      await documentStatus.save();
  
      // Send email notification if document is rejected
      if (status === 'rejected' && documentStatus.candidate && documentStatus.candidate.email) {
        try {
          // Generate a document upload link with the specific document as a query parameter
          // const uploadLink = `${process.env.FRONTEND_URL || 'http://yourdomain.com'}/candidate-dashboard?rejectDocId=${statusId}&documentName=${encodeURIComponent(documentName)}`;

          const uploadLink = 'http://localhost:3000/loginCandidates';
          
          // Fetch full candidate data to include login credentials
          const candidateData = await Candidate.findById(documentStatus.candidate._id);
          
          const emailContent = generateRejectionEmailContent(
            candidateData || documentStatus.candidate,
            documentName,
            comments || 'No comments provided',
            documentStatus.visaDocument.project.name,
            uploadLink
          );
          
          await transporter.sendMail({
            from: 'mrvivek258@gmail.com',
            to: documentStatus.candidate.email,
            subject: `Document Rejected: ${documentName} - Action Required`,
            html: emailContent
          });
          
          console.log(`Rejection email sent to ${documentStatus.candidate.email}`);
        } catch (emailError) {
          console.error(`Failed to send rejection email to ${documentStatus.candidate.email}:`, emailError);
          // Continue with the response even if email fails
        }
      }
  
      return res.status(200).json({
        success: true,
        message: 'Document status updated successfully',
        data: documentStatus
      });
    } catch (error) {
      console.error('Error updating document status:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  };

// Function to generate email content for document rejection
const generateRejectionEmailContent = (candidate, documentName, comments, projectName, uploadLink) => {
  // Extract username and temporary login code for email
  const username = candidate.username || '';
  const tempLoginCode = candidate.tempLoginCode || 'Please contact HR for your code';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Document Action Required</h2>
      <p>Hello ${candidate.candidateName || 'Candidate'},</p>
      <p>We regret to inform you that your document <strong>${documentName}</strong> for the <strong>${projectName}</strong> project has been rejected.</p>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #e74c3c; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #e74c3c;">Reason for Rejection:</h3>
        <p style="margin-bottom: 0;">${comments}</p>
      </div>
      
      <p>Please review the comments above and re-upload the document with the necessary corrections as soon as possible.</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="${uploadLink}" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">Upload Corrected Document</a>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 15px 0;">
        <h3 style="margin-top: 0; color: #3498db;">Login Information:</h3>
        <p><strong>Username:</strong> ${username}</p>
        <p style="margin-bottom: 0;"><strong>Temporary Login Code:</strong> ${tempLoginCode}</p>
      </div>
      
      <p>If you have any questions or need assistance, please contact our HR department.</p>
      
      <p>Thank you for your cooperation.</p>
      <p style="margin-bottom: 0;">Best regards,</p>
      <p style="margin-top: 5px;"><strong>HR Department</strong></p>
    </div>
  `;
};

  module.exports = { createVisaDocuments, getAllVisaDocuments, getVisaDocumentsByProject, getCandidateDocumentStatus, updateDocumentStatus };