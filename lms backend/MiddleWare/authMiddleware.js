const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../Modal/loginSignin');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check if token exists in cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = await User.findById(decoded.id);
    
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized to access this route');
  }
});

module.exports = {
  protect
};