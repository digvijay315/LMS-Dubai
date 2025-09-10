// const Candidate = require('../Modal/candidate_register');
// const multer = require('multer');
// const path = require('path');

// // Set up multer for file upload
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/cv');
//   },
//   filename: function(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   fileFilter: function(req, file, cb) {
//     const filetypes = /pdf|doc|docx/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Error: CV files must be PDF, DOC, or DOCX'));
//   }
// }).single('cv');

// // Controller methods
// const registerCandidate = async (req, res) => {
//   try {
//     upload(req, res, async function(err) {
//       if (err) {
//         return res.status(400).json({ success: false, message: err.message });
//       }
      
//       if (!req.file) {
//         return res.status(400).json({ success: false, message: 'Please upload your CV' });
//       }
      
//       const candidateData = {
//         ...req.body,
//         cv: req.file.path
//       };
      
//       // Parse JSON strings if they come as strings
//       if (typeof candidateData.experiences === 'string') {
//         candidateData.experiences = JSON.parse(candidateData.experiences);
//       }
      
//       if (typeof candidateData.certificates === 'string') {
//         candidateData.certificates = JSON.parse(candidateData.certificates);
//       }
      
//       const candidate = new Candidate(candidateData);
//       await candidate.save();
      
//       res.status(201).json({
//         success: true,
//         data: candidate
//       });
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
const CandidateCAT = require('../Modal/candidate_CAT');
const Candidate = require('../Modal/candidate_register');
//const Candidate = require('../Modal/candidate_register');
const RecruitmentPlan = require('../Modal/recruitment_plan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = 'uploads/cv';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `${uniquePrefix}-${safeFilename}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: CV files must be PDF, DOC, or DOCX'));
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
}).single('cv');






// Controller methods
// const registerCandidate = async (req, res) => {
//   try {
//     upload(req, res, async function(err) {
//       if (err) {
//         console.error('Upload error:', err);
//         return res.status(400).json({ success: false, message: err.message });
//       }
      
//       if (!req.file) {
//         return res.status(400).json({ success: false, message: 'Please upload your CV' });
//       }
      
//       try {
//         console.log('Processing candidate data...');

//         // Generate username from candidate name and random number
//         const nameParts = req.body.candidateName.split(' ');
//         const firstInitial = nameParts[0][0].toLowerCase();
//         const lastName = nameParts[nameParts.length - 1].toLowerCase();
//         const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
//         const username = `${firstInitial}${lastName}${randomNum}`;
        
//         // Generate a temporary login code (6 characters alphanumeric)
//         const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Omitting similar looking chars
//         let tempLoginCode = '';
//         for (let i = 0; i < 6; i++) {
//           tempLoginCode += chars.charAt(Math.floor(Math.random() * chars.length));
//         }
        
//         // Set expiry to 7 days from now
//         const tempCodeExpiry = new Date();
//         tempCodeExpiry.setDate(tempCodeExpiry.getDate() + 7);
        
//         // Upload file to Cloudinary
//         console.log('Uploading CV to Cloudinary...');
//         const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
//           folder: 'candidate_cvs',
//           resource_type: 'auto',
//           format: 'pdf',
//           flags: 'attachment'
//         });
        
//         // Delete the file from local storage after uploading to Cloudinary
//         fs.unlinkSync(req.file.path);

//         // Format and validate the data
//         let candidateData = {
//           candidateName: req.body.candidateName,
//           username: username,
//           tempLoginCode: tempLoginCode,
//           tempCodeExpiry: tempCodeExpiry,
//           qualification: req.body.qualification,
//           nationality: req.body.nationality,
//           currentJobTitle: req.body.currentJobTitle || '',
//           email: req.body.email,
//           cv: cloudinaryResult.secure_url, // Store the Cloudinary URL
//           cvViewUrl: cloudinaryResult.secure_url.replace('/upload/', '/upload/fl_attachment/'), // URL with attachment flag
//           cvPublicId: cloudinaryResult.public_id, // Store the public ID for future management
//           jobTitle: req.body.jobTitle,
//           jobFunction: req.body.jobFunction,
//           totalYearsOfExperience: parseFloat(req.body.totalYearsOfExperience) || 0
//         };
        
//         // Parse experiences if present
//         if (req.body.experiences) {
//           try {
//             candidateData.experiences = JSON.parse(req.body.experiences);
            
//             // Validate date formats in experiences
//             candidateData.experiences = candidateData.experiences.map(exp => ({
//               ...exp,
//               fromDate: new Date(exp.fromDate),
//               toDate: exp.toDate ? new Date(exp.toDate) : undefined,
//               jobResponsibilities: exp.jobResponsibilities || 'Not provided'
//             }));
//           } catch (parseError) {
//             console.error('Error parsing experiences:', parseError);
//             candidateData.experiences = [];
//           }
//         } else {
//           candidateData.experiences = [];
//         }
        
//         // Parse certificates if present
//         if (req.body.certificates) {
//           try {
//             candidateData.certificates = JSON.parse(req.body.certificates);
            
//             // Validate date formats in certificates
//             candidateData.certificates = candidateData.certificates.map(cert => ({
//               ...cert,
//               issueDate: new Date(cert.issueDate),
//               validTill: cert.validTill ? new Date(cert.validTill) : undefined
//             }));
//           } catch (parseError) {
//             console.error('Error parsing certificates:', parseError);
//             candidateData.certificates = [];
//           }
//         } else {
//           candidateData.certificates = [];
//         }
        
//         console.log('Creating new candidate with auto-generated credentials...');
//         const candidate = new Candidate(candidateData);
        
//         // Check for duplicate email before saving
//         const existingCandidate = await Candidate.findOne({ 
//           $or: [
//             { email: candidateData.email },
//             { username: candidateData.username }
//           ]
//         });

//         if (existingCandidate) {
//           // Delete the uploaded file from Cloudinary if there's a duplicate
//           await cloudinary.uploader.destroy(cloudinaryResult.public_id);
          
//           const message = existingCandidate.email === candidateData.email 
//             ? 'A candidate with this email already exists'
//             : 'Username already exists. Please try again.';
//           return res.status(400).json({ success: false, message });
//         }
        
//         // Save the candidate
//         await candidate.save();
        
//         console.log('Candidate saved successfully with credentials');
//         res.status(201).json({
//           success: true,
//           data: {
//             _id: candidate._id,
//             candidateName: candidate.candidateName,
//             email: candidate.email,
//             username: candidate.username,
//             tempLoginCode: candidate.tempLoginCode,
//             codeExpiry: candidate.tempCodeExpiry
//           },
//           message: 'Registration successful. Please note your username and temporary login code.'
//         });
//       } catch (innerError) {
//         console.error('Data processing or save error:', innerError);
        
//         // Remove uploaded file if there was an error
//         if (req.file && req.file.path) {
//           try {
//             fs.unlinkSync(req.file.path);
//           } catch (unlinkError) {
//             console.error('Error removing file:', unlinkError);
//           }
//         }
        
//         res.status(400).json({
//           success: false,
//           message: innerError.message
//         });
//       }
//     });
//   } catch (error) {
//     console.error('Outer controller error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during registration'
//     });
//   }
// };
const registerCandidate = async (req, res) => {
  try {
    upload(req, res, async function(err) {
      if (err) {
        console.error('Upload error:', err);
        return res.status(400).json({ success: false, message: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Please upload your CV' });
      }
      
      try {
        console.log('Processing candidate data...');

        // Existing code for username and login code generation
        const nameParts = req.body.candidateName.split(' ');
        const firstInitial = nameParts[0][0].toLowerCase();
        const lastName = nameParts[nameParts.length - 1].toLowerCase();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const username = `${firstInitial}${lastName}${randomNum}`;
        
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let tempLoginCode = '';
        for (let i = 0; i < 6; i++) {
          tempLoginCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        const tempCodeExpiry = new Date();
        tempCodeExpiry.setDate(tempCodeExpiry.getDate() + 7);
        
        // Upload file to Cloudinary
        console.log('Uploading CV to Cloudinary...');

        
      const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
  folder: 'candidate_cvs',
  resource_type: 'auto', // or 'auto' depending on your config
  use_filename: true,
  unique_filename: false,
  format: 'pdf' // Optional
});

        fs.unlinkSync(req.file.path);

        // Format candidate data
        let candidateData = {
          projectName: req.body.projectName,    
          candidateName: req.body.candidateName,
          username: username,
          tempLoginCode: tempLoginCode,
          tempCodeExpiry: tempCodeExpiry,
          qualification: req.body.qualification,
          nationality: req.body.nationality,
          currentJobTitle: req.body.currentJobTitle || '',
          email: req.body.email,
         cv: cloudinaryResult.secure_url,
cvViewUrl: cloudinaryResult.secure_url,  // preview in browser
cvDownloadUrl: cloudinaryResult.secure_url.replace('/upload/', '/upload/fl_attachment/'),  // force download
          // cvViewUrl: cloudinaryResult.secure_url
          // ,
          cvPublicId: cloudinaryResult.public_id,
          jobTitle: req.body.jobTitle,
          jobFunction: req.body.jobFunction,
          totalYearsOfExperience: parseFloat(req.body.totalYearsOfExperience) || 0
        };
        // Parse experiences and certificates as before
        if (req.body.experiences) {
          try {
            candidateData.experiences = JSON.parse(req.body.experiences);
            candidateData.experiences = candidateData.experiences.map(exp => ({
              ...exp,
              fromDate: new Date(exp.fromDate),
              toDate: exp.toDate ? new Date(exp.toDate) : undefined,
              jobResponsibilities: exp.jobResponsibilities || 'Not provided'
            }));
          } catch (parseError) {
            console.error('Error parsing experiences:', parseError);
            candidateData.experiences = [];
          }
        } else {
          candidateData.experiences = [];
        }
        
        if (req.body.certificates) {
          try {
            candidateData.certificates = JSON.parse(req.body.certificates);
            candidateData.certificates = candidateData.certificates.map(cert => ({
              ...cert,
              issueDate: new Date(cert.issueDate),
              validTill: cert.validTill ? new Date(cert.validTill) : undefined
            }));
          } catch (parseError) {
            console.error('Error parsing certificates:', parseError);
            candidateData.certificates = [];
          }
        } else {
          candidateData.certificates = [];
        }
        
        // NEW CODE: Assign CAT test based on recruitment plan matrix
        try {
          // Get the latest recruitment plan
          const latestPlan = await RecruitmentPlan.findOne().sort({ createdAt: -1 });
          
          if (latestPlan) {
            console.log('Checking recruitment plan matrix for CAT assignment...');
            
            // Find the function row in the matrix
            const functionRow = latestPlan.matrix.find(
              row => row.function === candidateData.jobFunction
            );
            
            if (functionRow) {
              // Find the level that matches the job title (position)
              const matchingLevel = functionRow.levels.find(
                level => level.position === candidateData.jobTitle
              );
              
              if (matchingLevel && matchingLevel.cat && matchingLevel.cat.id) {
                console.log(`Found matching CAT: ${matchingLevel.cat.code} - ${matchingLevel.cat.title}`);
                
                // Assign the CAT test to the candidate
                candidateData.catTest = {
                  id: matchingLevel.cat.id,
                  code: matchingLevel.cat.code,
                  title: matchingLevel.cat.title,
                  assignedAt: new Date()
                };
              } else {
                console.log('No matching CAT found for this job title in the recruitment plan');
              }
            } else {
              console.log('No matching function found in the recruitment plan');
            }
          } else {
            console.log('No recruitment plan found');
          }
        } catch (catError) {
          console.error('Error assigning CAT test:', catError);
          // Continue with registration even if CAT assignment fails
        }
        
        console.log('Creating new candidate with auto-generated credentials...');
        const candidate = new Candidate(candidateData);
        
        // Check for duplicate email before saving
        const existingCandidate = await Candidate.findOne({ 
          $or: [
            { email: candidateData.email },
            { username: candidateData.username }
          ]
        });

        if (existingCandidate) {
          await cloudinary.uploader.destroy(cloudinaryResult.public_id);
          
          const message = existingCandidate.email === candidateData.email 
            ? 'A candidate with this email already exists'
            : 'Username already exists. Please try again.';
          return res.status(400).json({ success: false, message });
        }
        
        // Save the candidate
        await candidate.save();
        
        console.log('Candidate saved successfully with credentials');
        
        // Construct response object
        const responseData = {
          _id: candidate._id,
          candidateName: candidate.candidateName,
          email: candidate.email,
          username: candidate.username,
          tempLoginCode: candidate.tempLoginCode,
          codeExpiry: candidate.tempCodeExpiry
        };
        
        // Add CAT test info to response if assigned
        if (candidate.catTest && candidate.catTest.id) {
          responseData.catTest = {
            code: candidate.catTest.code,
            title: candidate.catTest.title
          };
        }
        
        res.status(201).json({
          success: true,
          data: responseData,
          message: 'Registration successful. Please note your username and temporary login code.'
        });
      } catch (innerError) {
        console.error('Data processing or save error:', innerError);
        
        // Remove uploaded file if there was an error
        if (req.file && req.file.path) {
          try {
            fs.unlinkSync(req.file.path);
          } catch (unlinkError) {
            console.error('Error removing file:', unlinkError);
          }
        }
        
        res.status(400).json({
          success: false,
          message: innerError.message
        });
      }
    });
  } catch (error) {
    console.error('Outer controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getCandidateByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    const candidate = await Candidate.findOne({ username });
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    let candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    // Handle file upload if included
    if (req.files && req.files.cv) {
      upload(req, res, async function(err) {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }
        
        req.body.cv = req.file.path;
        
        candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        
        res.status(200).json({
          success: true,
          data: candidate
        });
      });
    } else {
      // No new CV upload
      candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      
      res.status(200).json({
        success: true,
        data: candidate
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};



const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the candidate to get the CV public ID
    const candidate = await Candidate.findById(id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    // Delete the CV from Cloudinary if it exists
    if (candidate.cvPublicId) {
      try {
        await cloudinary.uploader.destroy(candidate.cvPublicId);
        console.log(`Deleted CV from Cloudinary: ${candidate.cvPublicId}`);
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
        // Continue with deletion even if Cloudinary delete fails
      }
    }
    
    // Delete the candidate from the database
    await Candidate.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    console.error('Delete candidate error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during candidate deletion'
    });
  }
};


// Login candidate with username and temporary login code
const loginCandidate = async (req, res) => {
  try {
    const { username, tempLoginCode } = req.body;
    
    // Find candidate by username
    const candidate = await Candidate.findOne({ username });
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    // Verify temporary login code
    if (candidate.tempLoginCode !== tempLoginCode) {
      return res.status(401).json({
        success: false,
        message: 'Invalid login code'
      });
    }
    
    // Check if temporary code is expired
    // if (candidate.tempCodeExpiry < new Date()) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Login code has expired. Please request a new one.'
    //   });
    // }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: candidate._id, username: candidate.username },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      candidateId: candidate._id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};


// Get candidate by tempLoginCode (candidate code)
// controllers/candidate_register_form.js or similar


const getCandidateByCode = async (req, res) => {
  try {
    const code = req.params.code;
    const candidate = await Candidate.findOne({ tempLoginCode: code });
    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    // Fetch assignments from CandidateCAT (not AssignedCAT!)
    const assignedCATs = await CandidateCAT.find({ candidateId: candidate._id })
      .populate('catId') // adjust fields if you want
      .sort({ assignedDate: -1 });

    // (Optional: Add auto-assigned catTest logic if needed...)

    return res.status(200).json({
      success: true,
      data: {
        candidate,
        assignedCATs
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCandidatesByProjectName = async (req, res) => {
  try {
    const { projectName } = req.params;

    if (!projectName) {
      return res.status(400).json({ success: false, message: "Project name is required" });
    }

    // Use case-insensitive search or exact match depending on data
    const candidates = await Candidate.find({ 
      projectName: new RegExp(`^${projectName}$`, 'i') // exact match, case-insensitive
    });

    res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    console.error("Error fetching candidates by project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = {registerCandidate,
   getAllCandidates, getCandidateByUsername,
    getCandidateById, updateCandidate,
     deleteCandidate,
     getCandidateByCode, 
      getCandidatesByProjectName, // <-- add here    
      loginCandidate};