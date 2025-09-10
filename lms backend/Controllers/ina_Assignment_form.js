const INAAssignment = require('../Modal/ina_Assignment');

const postINAAssignment = async (req, res) => {
    try {
      const { ina_title, ina_code, employees, activities, schedule } = req.body;
  
      // Validate required fields
      if (!ina_title || !ina_code || !Array.isArray(employees) || !schedule) {
        return res.status(400).json({ error: 'All fields are required, including schedule details.' });
      }
  
      const { dateFrom, dateTo, timeFrom, timeTo } = schedule;

      // Validate schedule dates (ignore time)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to the start of today for comparison

      const scheduleStart = new Date(dateFrom);
      const scheduleEnd = new Date(dateTo);

      // Normalize schedule dates to ignore time
      scheduleStart.setHours(0, 0, 0, 0);
      scheduleEnd.setHours(0, 0, 0, 0);

      // Ensure schedule dates are only for today
      if (scheduleStart.getTime() !== today.getTime() || scheduleEnd.getTime() !== today.getTime()) {
        return res.status(400).json({ error: 'Dates must be set to the current date only.' });
      }

      // Ensure the start date is not after the end date
      if (scheduleStart > scheduleEnd) {
        return res.status(400).json({ error: 'End date must be later than or equal to the start date.' });
      }
  
      // Check for existing assignment
      const existingAssignment = await INAAssignment.findOne({
        ina_code,
        'employees.employeeId': { $in: employees.map((e) => e.employeeId) },
      });
  
      if (existingAssignment) {
        return res.status(400).json({ message: 'Some employees are already assigned to this INA!' });
      }
  
      // Save the new assignment
      const assignment = new INAAssignment({
        ina_title,
        ina_code,
        employees,
        activities,
        schedule: {
          dateFrom,
          dateTo,
          timeFrom,
          timeTo,
        },
      });
  
      await assignment.save();
      res.status(201).json({ message: 'INA Assignment created successfully!', assignment });
    } catch (error) {
      console.error('Error assigning INA:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getINAAssignedEmployee = async (req, res) => {
    try {
      const { ina_code } = req.params;
  
      // Fetch the OJT assignment by OJT code
      const assignment = await INAAssignment.findOne({ ina_code });
  
      // Check if the assignment exists
      if (!assignment) {
        return res.status(404).json({ message: 'No assignments found for this INA!' });
      }
  
      // Prepare the response
      const response = {
        ina_title: assignment.ina_title,
        ina_code: assignment.ina_code,
        employees: assignment.employees,
        schedule: assignment.schedule,
        activities: assignment.activities,
      };
  
      res.status(200).json(response); // Return the assignment details
    } catch (error) {
      console.error('Error fetching assigned employees:', error);
      res.status(500).json({ error: 'Internal Server Error' }); // Handle server errors
    }
  };


  const checkEmployeeAssignmentINA = async (req, res) => {
    try {
      const { ina_code, employees } = req.body;
  
      if (!ina_code || !Array.isArray(employees)) {
        return res.status(400).json({ error: 'INA code and employee list are required.' });
      }
  
      const existingAssignment = await INAAssignment.findOne({
        ina_code,
        'employees.employeeId': { $in: employees },
      });
  
      if (existingAssignment) {
        return res.status(200).json({ alreadyAssigned: true });
      }
  
      res.status(200).json({ alreadyAssigned: false });
    } catch (error) {
      console.error('Error checking employee assignment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = { postINAAssignment, getINAAssignedEmployee, checkEmployeeAssignmentINA };