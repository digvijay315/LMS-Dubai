// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const config = require('../config');

// // Configure cloudinary
// cloudinary.config({
//   cloud_name: config.cloudinaryName,
//   api_key: config.cloudinaryApiKey,
//   api_secret: config.cloudinaryApiSecret
// });

// // Configure storage
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'visa_documents',
//     allowed_formats: ['pdf', 'png', 'jpg', 'jpeg', 'docx', 'doc'],
//     transformation: [{ quality: 'auto' }]
//   }
// });

// // Configure multer upload
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
//     const extname = allowedTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPG, JPEG, and PNG files are allowed.'));
//     }
//   }
// }).single('file');

// // Upload document
// const uploadDocument = (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({
//         success: false,
//         message: err.message
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded'
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'File uploaded successfully',
//       fileUrl: req.file.path,
//       publicId: req.file.filename
//     });
//   });
// };

// // Delete document from cloudinary
// const deleteDocument = async (req, res) => {
//   try {
//     const { publicId } = req.body;
    
//     if (!publicId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Public ID is required'
//       });
//     }

//     const result = await cloudinary.uploader.destroy(publicId);
    
//     return res.status(200).json({
//       success: true,
//       message: 'File deleted successfully',
//       result
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: 'Error deleting file',
//       error: error.message
//     });
//   }
// };

// module.exports = { uploadDocument, deleteDocument };






const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CandidateDocumentStatus = require('../Modal/candidate_document_status');
const VisaDocument = require('../Modal/visa_documnets_admin');
const Candidate = require('../Modal/candidate_register');
const { uploadToCloudinary } = require('../config/cloudinary');

// Set up multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = 'uploads/candidate-documents';
    
//     // Create directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
    
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// Create multer upload instance
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB file size limit
//   },
//   fileFilter: function (req, file, cb) {
//     // Accept images, PDFs, and documents
//     const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Only .jpeg, .jpg, .png, .pdf, .doc, .docx format allowed!'));
//   }
// }).array('files');

// Get document requirements for a candidate
const getDocumentRequirementsForCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;
    
    // Find document status for the candidate, sorted by most recent
    const documentStatuses = await CandidateDocumentStatus.find({ candidate: candidateId })
      .populate({
        path: 'visaDocument',
        populate: {
          path: 'project',
          select: 'name code'
        }
      })
      .sort({ createdAt: -1 });
    
    if (documentStatuses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No document requirements found for this candidate'
      });
    }
    
    res.status(200).json({
      success: true,
      data: documentStatuses
    });
  } catch (error) {
    console.error('Error getting document requirements:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Upload candidate documents
const uploadCandidateDocuments = async (req, res) => {
    try {
      // Use multer with Cloudinary storage to handle file uploads
      uploadToCloudinary(req, res, async function (err) {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }
        
        const { candidateId } = req.body;
        const files = req.files;
        
        // Fix: Handle documentNames as an array instead of a string
        let documentNames = [];
        if (Array.isArray(req.body.documentNames)) {
          documentNames = req.body.documentNames;
        } else if (typeof req.body.documentNames === 'string') {
          documentNames = req.body.documentNames.split(',');
        } else {
          return res.status(400).json({
            success: false,
            message: 'Invalid document names format'
          });
        }
        
        if (!files || files.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'No files uploaded'
          });
        }
        
        if (files.length !== documentNames.length) {
          return res.status(400).json({
            success: false,
            message: 'Mismatch between files and document names'
          });
        }
        
        // Find the latest document status for the candidate
        const documentStatus = await CandidateDocumentStatus.findOne({ 
          candidate: candidateId 
        }).sort({ createdAt: -1 });
        
        if (!documentStatus) {
          return res.status(404).json({
            success: false,
            message: 'No document requirements found for this candidate'
          });
        }
        
        // Update document statuses with Cloudinary information
        const updatedDocumentStatuses = documentStatus.documentStatuses.map(doc => {
          const index = documentNames.indexOf(doc.document);
          
          if (index !== -1 && files[index]) {
            return {
              ...doc.toObject(),
              status: 'submitted',
              submittedFile: files[index].path, // Cloudinary URL
              submittedFilePublicId: files[index].filename, // Cloudinary public ID
              submittedAt: new Date()
            };
          }
          
          return doc;
        });
        
        // Update overall status
        let overallStatus = 'in_progress';
        if (updatedDocumentStatuses.every(doc => doc.status === 'approved')) {
          overallStatus = 'completed';
        } else if (updatedDocumentStatuses.every(doc => doc.status === 'submitted' || doc.status === 'approved')) {
          overallStatus = 'in_progress';
        }
        
        // Update document status in database
        documentStatus.documentStatuses = updatedDocumentStatuses;
        documentStatus.overallStatus = overallStatus;
        documentStatus.updatedAt = new Date();
        
        await documentStatus.save();
        
        // Get the visa document and update its status if needed
        const visaDocument = await VisaDocument.findById(documentStatus.visaDocument);
        
        if (visaDocument) {
          // Check if all candidates have completed their documents
          const allCandidateStatuses = await CandidateDocumentStatus.find({ 
            visaDocument: visaDocument._id 
          });
          
          if (allCandidateStatuses.every(status => status.overallStatus === 'completed')) {
            visaDocument.status = 'completed';
            await visaDocument.save();
          }
        }
        
        res.status(200).json({
          success: true,
          message: 'Documents uploaded successfully',
          data: documentStatus
        });
      });
    } catch (error) {
      console.error('Error uploading documents:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
};

// Middleware to verify candidate JWT token
const verifyCandidateToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  
  if (!bearerHeader) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }
  
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};


module.exports = {getDocumentRequirementsForCandidate, uploadCandidateDocuments, verifyCandidateToken}
