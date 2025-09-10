// const multer = require('multer');
// // const upload = multer({ dest: 'uploads/' }); 

// // const storage=multer.diskStorage({
// //     filename:(req,file,cb)=>{
// //         cb(null,file.originalname);
// //     }
// // })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 }, // 10MB limit (optional)
//     fileFilter: (req, file, cb) => {
//       // Accept only PDF, image, and video files
//       const fileTypes = /pdf|jpg|jpeg|png|mp4|mkv|avi/;
//       const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//       const mimetype = fileTypes.test(file.mimetype);
  
//       if (extname && mimetype) {
//         return cb(null, true);
//       } else {
//         cb(new Error('Only PDF, images, and videos are allowed.'));
//       }
//     }
//   });

// // const upload= multer({storage:storage});

// // Define fields for multer to handle
// const uploadFields = upload.fields([
//     { name: 'image_file', maxCount: 5 }, // Accept up to 5 image files
//     { name: 'pdf_file', maxCount: 5 },   // Accept up to 5 PDF files
//     { name: 'word_file', maxCount: 5 }   // Accept up to 5 Word files
// ]);

// module.exports= uploadFields;




// const multer = require('multer');
// const path = require('path');

// // Define storage configuration
// const storage = multer.diskStorage({
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// // File filter to validate file types
// const fileFilter = (req, file, cb) => {
//     const fileTypes = /pdf|jpg|jpeg|png|mp4|mkv|avi|doc|docx/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = fileTypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Only PDF, images, videos, and Word files are allowed.'));
//     }
// };

// // Initialize multer
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit for each file
//     fileFilter: fileFilter,
// });

// // Define fields for multer to handle
// const uploadFields = upload.fields([
//     { name: 'image_file', maxCount: 5 }, // Up to 5 image files
//     { name: 'pdf_file', maxCount: 5 },   // Up to 5 PDF files
//     { name: 'word_file', maxCount: 5 },  // Up to 5 Word files
//     // { name: 'video_file', maxCount: 1 }, // Up to 5 video files
//     { name: 'add_Content[0][video_file][0]', maxCount: 1 },
// ]);

// module.exports = uploadFields;





// const multer = require('multer');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;

// // Storage setup for Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Folder to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Set unique filename using timestamp and file extension
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // File filter for accepting specific file types
// const fileFilter = (req, file, cb) => {
    
//     const fileTypes = {
//       image: ['image/jpeg', 'image/png'],
//       pdf: ['application/pdf'],
//       word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//       video: ['video/mp4', 'video/x-matroska', 'video/avi', 'video/mov', 'video/quicktime']  // Ensure correct video MIME types
//     };
  
//     // Check for image files
//     if (file.fieldname === 'image_file' && fileTypes.image.includes(file.mimetype)) {
//       return cb(null, true); // Accept image files
//     } 
//     // Check for PDF files
//     else if (file.fieldname === 'pdf_file' && fileTypes.pdf.includes(file.mimetype)) {
//       return cb(null, true); // Accept PDF files
//     } 
//     // Check for Word files
//     else if (file.fieldname === 'word_file' && fileTypes.word.includes(file.mimetype)) {
//       return cb(null, true); // Accept Word files
//     } 
//     // Check for video files (allow dynamic field names like add_Content[0].video_file)
//     else if (file.fieldname.includes('video_file') && fileTypes.video.includes(file.mimetype)) {
//       return cb(null, true); // Accept video files
//     } 
//         // Check for image files
//         if (file.fieldname === 'thumbnail_upload' && fileTypes.image.includes(file.mimetype)) {
//           return cb(null, true); // Accept image files
//         } 
//         // Check for PDF files
//         else if (file.fieldname === 'file_upload' && fileTypes.pdf.includes(file.mimetype)) {
//           return cb(null, true); // Accept PDF files
//         } 
//         // Check for Word files
//         else if (file.fieldname === 'video_upload' && fileTypes.video.includes(file.mimetype)) {
//           return cb(null, true); // Accept Word files
//         } 
//     // Reject file if it doesn't match the allowed types
//     else {
//       console.log('Rejected File:', file);  // Log rejected file for debugging
//       return cb(new Error('Invalid file type'), false); 
//     }
//   };
  
// // Multer upload setup
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // Max file size 50MB
//   fileFilter: fileFilter
// });

// // Use upload.any() to allow all fields, since we are using dynamic fields
// const uploadFields = upload.any(); // Allow all fields (works with dynamic field names)

// module.exports = uploadFields;




const multer = require('multer');
const path = require('path');

// Storage setup for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter for accepting specific file types
const fileFilter = (req, file, cb) => {
  const fileTypes = {
    image: ['image/jpeg', 'image/png', 'image/jpg'],
    pdf: ['application/pdf'],
    word: [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    video: [
      'video/mp4',
      'video/x-matroska',
      'video/avi',
      'video/mov',
      'video/quicktime',
      'video/x-msvideo'
    ],
    powerpoint: [
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'application/powerpoint',
      'application/mspowerpoint',
      'application/x-mspowerpoint'
    ]
  };

  // Helper function to check if fieldname matches pattern
  const isFieldNameMatch = (fieldname, pattern) => {
    return (
      fieldname === pattern || 
      fieldname.includes(`${pattern}]`) || 
      fieldname.includes(`${pattern}[`)
    );
  };

  // Check if the fieldname includes 'video_file' or 'video_upload' anywhere in the string
  const isVideoField = (fieldname) => {
    return fieldname.includes('video_file') || fieldname.includes('video_upload');
  };

  // Check if the fieldname includes 'ppt_file' anywhere in the string
  const isPptField = (fieldname) => {
    return fieldname.includes('ppt_file');
  };

  // Log incoming file details for debugging
  console.log('Processing file:', {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype
  });

  // Check file types based on fieldname patterns
  if ((isFieldNameMatch(file.fieldname, 'image_file') || 
       isFieldNameMatch(file.fieldname, 'thumbnail_upload')) && 
      fileTypes.image.includes(file.mimetype)) {
    return cb(null, true);
  } 
  else if ((isFieldNameMatch(file.fieldname, 'pdf_file') || 
            isFieldNameMatch(file.fieldname, 'file_upload')) && 
           fileTypes.pdf.includes(file.mimetype)) {
    return cb(null, true);
  } 
  else if (isFieldNameMatch(file.fieldname, 'word_file') && 
           fileTypes.word.includes(file.mimetype)) {
    return cb(null, true);
  } 
  else if (isVideoField(file.fieldname) && 
           fileTypes.video.includes(file.mimetype)) {
    return cb(null, true);
  }
  else if (isPptField(file.fieldname) && 
           fileTypes.powerpoint.includes(file.mimetype)) {
    return cb(null, true);
  }
  else {
    console.log('Rejected File:', {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype
    });
    return cb(new Error(`Invalid file type for ${file.fieldname}`), false);
  }
};

// Multer upload setup
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 100 * 1024 * 1024  // Increased to 100MB to handle larger video files
  },
  fileFilter: fileFilter
});

// Use upload.any() to allow all fields
const uploadFields = upload.any();

module.exports = uploadFields;  







