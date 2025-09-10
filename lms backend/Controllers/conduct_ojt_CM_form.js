const OJTConduct = require('../Modal/conduct_ojt_CM');
const CreateOJT = require('../Modal/create_ojt');
const Employee = require('../Modal/employee_register');
const CompetencyMapping = require('../Modal/competency_mapping');

// Get list of all OJTs
const getOJTList = async (req, res) => {
  try {
    const ojts = await CreateOJT.find({}, 'ojt_title ojt_code');
    return res.status(200).json(ojts);
  } catch (error) {
    console.error('Error fetching OJT list:', error);
    return res.status(500).json({ error: 'Failed to fetch OJT list' });
  }
};

// Get details of a specific OJT
const getOJTDetails = async (req, res) => {
  try {
    const ojt = await CreateOJT.findById(req.params.id);
    if (!ojt) {
      return res.status(404).json({ error: 'OJT not found' });
    }
    return res.status(200).json(ojt);
  } catch (error) {
    console.error('Error fetching OJT details:', error);
    return res.status(500).json({ error: 'Failed to fetch OJT details' });
  }
};

// Get employees assigned to a specific OJT
const getAssignedEmployees = async (req, res) => {
  try {
    const ojtId = req.params.ojtId;
    
    // Find competency mappings that have this OJT assigned
    const mappings = await CompetencyMapping.find({
      'competencyItems.ojtId': ojtId
    }, 'employeeId employee_id employeeName functionType jobTitle');

    // Get the employee details
    const employees = [];
    for (const mapping of mappings) {
      const employee = await Employee.findById(mapping.employeeId, 
        'employee_id employee_name function_title job_title');
      
      if (employee) {
        employees.push({
          _id: employee._id,
          employee_id: employee.employee_id,
          employeeName: employee.employee_name,
          functionType: employee.function_title,
          jobTitle: employee.job_title
        });
      }
    }

    return res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching assigned employees:', error);
    return res.status(500).json({ error: 'Failed to fetch assigned employees' });
  }
};

// Create or update OJT conduct session
const conductOJT = async (req, res) => {
  try {
    const { ojtId, employees, activities, trainerId } = req.body;

    // Validate inputs
    if (!ojtId || !employees || !employees.length || !activities || !trainerId) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide ojtId, employees, activities, and trainerId' 
      });
    }

    // Get OJT details
    const ojt = await CreateOJT.findById(ojtId);
    if (!ojt) {
      return res.status(404).json({ error: 'OJT not found' });
    }

    // Get trainer details
    const trainer = await Employee.findById(trainerId);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }

    // Process each employee
    const results = [];
    for (const employeeId of employees) {
      const employee = await Employee.findById(employeeId);
      if (!employee) {
        results.push({
          employeeId,
          status: 'error',
          message: 'Employee not found'
        });
        continue;
      }

      // Create or update the OJT conduct record for this employee
      const conductRecord = await OJTConduct.findOneAndUpdate(
        { 
          ojt_id: ojtId,
          employee_id: employeeId
        },
        {
          ojt_title: ojt.ojt_title,
          ojt_code: ojt.ojt_code,
          employee_name: employee.employee_name,
          employee_id_code: employee.employee_id,
          function_title: employee.function_title,
          job_title: employee.job_title,
          conductedBy: trainerId,
          conductedBy_name: trainer.employee_name,
          activities: activities
        },
        { upsert: true, new: true }
      );

      results.push({
        employeeId,
        status: 'success',
        conductId: conductRecord._id
      });
    }

    return res.status(200).json({ results });
  } catch (error) {
    console.error('Error conducting OJT:', error);
    return res.status(500).json({ error: 'Failed to conduct OJT' });
  }
};

// Get OJT conduct history for a trainer
const getTrainerConductHistory = async (req, res) => {
  try {
    const { trainerId } = req.params;
    
    if (!trainerId) {
      return res.status(400).json({ error: 'Trainer ID is required' });
    }
    
    const conducts = await OJTConduct.find({ conductedBy: trainerId })
      .sort('-conductDate')
      .populate('ojt_id', 'ojt_title ojt_code')
      .populate('employee_id', 'employee_name employee_id');
    
    return res.status(200).json(conducts);
  } catch (error) {
    console.error('Error fetching OJT conduct history:', error);
    return res.status(500).json({ error: 'Failed to fetch OJT conduct history' });
  }
};

// Get OJT conducts for a specific employee
const getEmployeeOJTConducts = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    if (!employeeId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }
    
    const conducts = await OJTConduct.find({ employee_id: employeeId })
      .sort('-conductDate');
    
    return res.status(200).json(conducts);
  } catch (error) {
    console.error('Error fetching employee OJT conducts:', error);
    return res.status(500).json({ error: 'Failed to fetch OJT conduct data' });
  }
};

// Update employee checks in OJT conduct
const updateEmployeeOJTChecks = async (req, res) => {
  try {
    const { conductId, employeeId } = req.params;
    const { activities } = req.body;
    
    if (!conductId || !employeeId || !activities) {
      return res.status(400).json({ 
        success: false, 
        message: 'Conduct ID, Employee ID, and activities are required' 
      });
    }
    
    // Find the OJT conduct document
    const ojtConduct = await OJTConduct.findById(conductId);
    
    if (!ojtConduct) {
      return res.status(404).json({ 
        success: false, 
        message: 'OJT conduct not found' 
      });
    }
    
    // Verify this conduct belongs to the employee
    if (ojtConduct.employee_id.toString() !== employeeId) {
      return res.status(403).json({ 
        success: false, 
        message: 'You are not authorized to update this OJT conduct' 
      });
    }
    
    // Update employee checks for each activity content
    activities.forEach(activityUpdate => {
      const activityIndex = ojtConduct.activities.findIndex(
        a => a.activity_id.toString() === activityUpdate.activity_id.toString()
      );
      
      if (activityIndex !== -1) {
        activityUpdate.content.forEach(contentUpdate => {
          const contentIndex = ojtConduct.activities[activityIndex].content.findIndex(
            c => c.content_id.toString() === contentUpdate.content_id.toString()
          );
          
          if (contentIndex !== -1) {
            ojtConduct.activities[activityIndex].content[contentIndex].employeeChecked = 
              contentUpdate.employeeChecked;
          }
        });
      }
    });
    
    // Check if all activities are completed
    const allCompleted = ojtConduct.activities.every(activity => 
      activity.content.every(content => 
        content.trainerChecked && content.employeeChecked
      )
    );
    
    // Update status if all activities are completed
    if (allCompleted) {
      ojtConduct.status = 'completed';
    }
    
    // Save the updated document
    await ojtConduct.save();
    
    return res.status(200).json({ 
      success: true, 
      message: 'Employee OJT responses updated successfully',
      status: ojtConduct.status
    });
    
  } catch (error) {
    console.error('Error updating employee OJT checks:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to update employee OJT responses' 
    });
  }
};

module.exports = {
  getOJTList,
  getOJTDetails,
  getAssignedEmployees,
  conductOJT,
  getTrainerConductHistory,
  getEmployeeOJTConducts,
  updateEmployeeOJTChecks
};