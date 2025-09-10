const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Set up CloudinaryStorage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'candidate-documents',
    resource_type: 'auto',
    // Add a timestamp to ensure unique filenames
    public_id: (req, file) => {
      const candidateId = req.body.candidateId;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `${candidateId}-${file.fieldname}-${uniqueSuffix}`;
    },
    // Optional: Add tags for better organization
    tags: (req) => [`candidate-${req.body.candidateId}`]
  }
});

// Configure multer to use CloudinaryStorage
const uploadToCloudinary = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
  fileFilter: function (req, file, cb) {
    // Accept images, PDFs, and documents
    const filetypes = /jpeg|jpg|png|pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .jpeg, .jpg, .png, .pdf, .doc, .docx format allowed!'));
  }
}).array('files');

module.exports = {
  cloudinary,
  uploadToCloudinary
};