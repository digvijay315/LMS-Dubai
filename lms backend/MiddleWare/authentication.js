const jwt = require('jsonwebtoken');
const Employee = require('../Modal/employee_register'); // Adjust path if needed

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find employee by id
    const employee = await Employee.findById(decoded.id);
    
    if (!employee) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Add employee info to the request object
    req.employee = employee;
    req.user = employee; // For compatibility with both naming conventions
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authMiddleware;