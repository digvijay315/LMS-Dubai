const User = require('../Modal/loginSignin');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


// Configure email transporter
// Note: You'll need to set these environment variables in your .env file
// const createTransporter = () => {
//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST || 'gmail',
//       port: process.env.EMAIL_PORT || 587,
//       secure: process.env.EMAIL_SECURE === 'true',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });
//   };

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mrvivek258@gmail.com',
        pass: 'bguk appp yrle wuzo'
      }
  });


  // Send welcome email to newly registered user
const sendWelcomeEmail = async (user) => {
    try {
    //   const transporter = createTransporter();
      
      // HTML email template
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #333;">Welcome to Talents Builder!</h1>
          </div>
          
          <div style="margin-bottom: 20px; line-height: 1.5;">
            <p>Hello ${user.name},</p>
            <p>Thank you for registering with Talents Builder. We're excited to have you join our community!</p>
            <p>Your account has been successfully created and you can now access all of our features.</p>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #f7f7f7; padding: 15px; border-radius: 5px;">
            <p style="margin: 0;"><strong>Account Details:</strong></p>
            <p style="margin: 5px 0;">Name: ${user.name}</p>
            <p style="margin: 5px 0;">Email: ${user.email}</p>
          </div>
          
          <div style="margin-bottom: 20px; line-height: 1.5;">
            <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            <p>We look forward to helping you grow and develop your talents!</p>
          </div>
          
          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 14px;">© ${new Date().getFullYear()} Talents Builder. All rights reserved.</p>
          </div>
        </div>
      `;
  
      const mailOptions = {
        from: 'mrvivek258@gmail.com',
        to: user.email,
        subject: 'Welcome to Talents Builder!',
        html: htmlContent
      };
  
      await transporter.sendMail(mailOptions);
      console.log(`Welcome email sent to ${user.email}`);
      return true;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
};


// Register user
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    try {
      // Create user
      const user = await User.create({
        name,
        email,
        password
      });
  
      if (user) {
        // Send welcome email (don't wait for email to complete)
        sendWelcomeEmail(user)
          .then(sent => {
            if (sent) {
              console.log(`Welcome email sent to ${email}`);
            } else {
              console.log(`Failed to send welcome email to ${email}`);
            }
          })
          .catch(err => {
            console.error('Welcome email error:', err);
          });
  
        // Send response with token
        sendTokenResponse(user, 201, res);
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message || 'Invalid user data');
    }
  });

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
// const register = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   // Check if user exists
//   const userExists = await User.findOne({ email });
//   if (userExists) {
//     res.status(400);
//     throw new Error('User already exists');
//   }

//   // Create user
//   const user = await User.create({
//     name,
//     email,
//     password
//   });

//   if (user) {
//     sendTokenResponse(user, 201, res);
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  // Set secure flag in production
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
};

module.exports = {
  register,
  login,
  getMe,
  logout
};