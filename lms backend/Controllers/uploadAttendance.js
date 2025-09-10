const AttendanceRecord = require('../Modal/AttendanceRecord');

const uploadAttendance = async (req, res) => {
  try {
    const inputData = req.body.records;

    // ✅ Validate before using
    if (!Array.isArray(inputData)) {
      return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
    }

    // Group attendance by employee
    const grouped = {};

    inputData.forEach(({ employeeId, date, present }) => {
      if (!grouped[employeeId]) {
        grouped[employeeId] = {
          employee_id: employeeId,
          name: 'Unknown',
          designation: '',
          email: '',
          email_status: 'Not Sent',
          nomination_date: new Date().toISOString().split('T')[0],
          attendance: []
        };
      }

      grouped[employeeId].attendance.push({
        date,
        status: present ? 'present' : 'absent'
      });
    });

    const attendanceDocs = Object.values(grouped);

    // Save all
    await AttendanceRecord.insertMany(attendanceDocs);

    res.status(201).json({ message: 'Attendance uploaded successfully' });
  } catch (error) {
    console.error('Error saving attendance:', error);
    res.status(500).json({ message: 'Failed to upload attendance', error });
  }
};

module.exports = {
  uploadAttendance
};
