// middleware/auth.js
// const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');

// exports.protect = async (req, res, next) => {
//   try {
//     let token;

//     // Check for token in Authorization header
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     // Check if token exists
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         error: 'Not authorized to access this route'
//       });
//     }

//     try {
//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
//       // Add user ID to request
//       req.user = { _id: decoded.id };
      
//       next();
//     } catch (err) {
//       return res.status(401).json({
//         success: false,
//         error: 'Not authorized to access this route'
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: 'Server Error'
//     });
//   }
// };


// middleware/auth.js
// middleware/auth.js
// const jwt = require('jsonwebtoken');

// // TEMPORARY SOLUTION - replace with proper environment variable
// const JWT_SECRET = process.env.JWT_SECRET || 'your_temporary_secret_key';

// exports.protect = async (req, res, next) => {
//   try {
//     let token;

//     // Check for token in Authorization header
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }

//     // Check if token exists
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         error: 'Not authorized to access this route'
//       });
//     }

//     try {
//       // Verify token with the secret
//       const decoded = jwt.verify(token, JWT_SECRET);
      
//       // Add user ID to request
//       req.user = { _id: decoded.id || decoded._id };
      
//       next();
//     } catch (err) {
//       console.error('Token verification failed:', err.message);
//       return res.status(401).json({
//         success: false,
//         error: 'Invalid token or not authorized'
//       });
//     }
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     return res.status(500).json({
//       success: false,
//       error: 'Server Error'
//     });
//   }
// };




// middleware/auth.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Modal/loginSignin');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  // Get token from authorization header or cookies
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // Set token from cookie
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'vivektoken');

    // Set user in request
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};