// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const { uploadAttendance } = require('../Controllers/uploadAttendance');

router.post('/upload-attendance', uploadAttendance);

module.exports = router;
