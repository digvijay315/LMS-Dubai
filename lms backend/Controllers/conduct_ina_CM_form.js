const INAConduct = require('../Modal/conduct_ina_CM');
const CreateINA = require('../Modal/create_ina'); // Import your INA model
const Employee = require('../Modal/employee_register'); // Import your Employee model
const CompetencyMapping = require('../Modal/competency_mapping'); // Import your CompetencyMapping model

// Get all INAs
const getAllINAs = async (req, res) => {
  try {
    const inas = await CreateINA.find({}).select('ina_title ina_code rating_range_ina');
    res.status(200).json(inas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching INAs', error: error.message });
  }
};

// Add this to your controller file (ojaConductController.js)
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({})
      .select('_id employee_id employee_name');
    
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error: error.message });
  }
};

// Get specific INA with activities
const getINAById = async (req, res) => {
  try {
    const ina = await CreateINA.findById(req.params.id);
    
    if (!ina) {
      return res.status(404).json({ message: 'INA not found' });
    }
    
    res.status(200).json(ina);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching INA', error: error.message });
  }
};

// Get eligible employees for a specific INA
const getEligibleEmployeesForINA = async (req, res) => {
  try {
    const inaId = req.params.inaId;
    
    // Find employees who have this INA assigned in their competency mapping
    const eligibleEmployees = await CompetencyMapping.find({
      'competencyItems.inaId': inaId
    }).select('employeeId employee_id employeeName functionType jobTitle');
    
    // Populate employee details if needed
    const result = await Promise.all(eligibleEmployees.map(async (mapping) => {
      // You can add additional employee details if needed
      return {
        _id: mapping.employeeId,
        employee_id: mapping.employee_id,
        employeeName: mapping.employeeName,
        functionType: mapping.functionType,
        jobTitle: mapping.jobTitle
      };
    }));
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching eligible employees', error: error.message });
  }
};

// Submit INA ratings
const submitINARatings = async (req, res) => {
  try {
    const { inaId, employeeId, trainerId, trainerName, ratings } = req.body;
    
    // Get INA details
    const ina = await CreateINA.findById(inaId);
    if (!ina) {
      return res.status(404).json({ message: 'INA not found' });
    }
    
    // Get employee details
    const employeeMapping = await CompetencyMapping.findOne({ employeeId });
    if (!employeeMapping) {
      return res.status(404).json({ message: 'Employee mapping not found' });
    }
    
    // Get trainer details (assuming trainer is the logged-in user)
    // You would typically get this from the authenticated user
    // const trainerId = req.user ? req.user._id : null; // Replace with your auth logic
    // const trainerName = req.user ? req.user.name : 'System'; // Replace with your auth logic
    
    // Prepare activities array with ratings
    const activitiesWithRatings = ina.activities.map(activity => {
      const activityRating = {
        activity_id: activity._id,
        activity_title: activity.activity_ina_title,
        content_ratings: []
      };
      
      // Add ratings for each content item
      activity.content.forEach(content => {
        const rating = ratings[content._id];
        if (rating) {
          activityRating.content_ratings.push({
            content_id: content._id,
            srno: content.srno,
            description: content.description,
            assigned_rating: parseInt(rating)
          });
        }
      });
      
      return activityRating;
    });
    
    // Calculate total and average scores
    let totalScore = 0;
    let ratingCount = 0;
    
    activitiesWithRatings.forEach(activity => {
      activity.content_ratings.forEach(rating => {
        totalScore += rating.assigned_rating;
        ratingCount++;
      });
    });
    
    const averageScore = ratingCount > 0 ? (totalScore / ratingCount).toFixed(2) : 0;
    
    // Create new INA conduct record
    const newINAConduct = new INAConduct({
      ina_id: inaId,
      ina_title: ina.ina_title,
      ina_code: ina.ina_code,
      
      employee_id: employeeId,
      employee_code: employeeMapping.employee_id,
      employee_name: employeeMapping.employeeName,
      function_title: employeeMapping.functionType,
      job_title: employeeMapping.jobTitle,
      
      trainer_id: trainerId,
      trainer_name: trainerName,
      
      activities: activitiesWithRatings,
      
      total_score: totalScore,
      average_score: averageScore,
      
      status: 'completed'
    });
    
    await newINAConduct.save();
    
    // Update competency mapping status if needed
    await CompetencyMapping.updateOne(
      { 
        employeeId: employeeId,
        'competencyItems.inaId': inaId
      },
      {
        $set: { 
          'competencyItems.$.status': 'completed',
          lastUpdated: new Date()
        }
      }
    );
    
    res.status(201).json({ 
      message: 'INA ratings submitted successfully',
      conductId: newINAConduct._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting INA ratings', error: error.message });
  }
};

// Get conducted INA history for an employee
const getEmployeeINAHistory = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    
    const history = await INAConduct.find({ employee_id: employeeId })
      .sort({ conducted_date: -1 });
    
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching INA history', error: error.message });
  }
};

// Get conducted INA details
const getINAConductDetails = async (req, res) => {
  try {
    const conductId = req.params.conductId;
    
    const conductDetails = await INAConduct.findById(conductId);
    
    if (!conductDetails) {
      return res.status(404).json({ message: 'INA conduct record not found' });
    }
    
    res.status(200).json(conductDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching INA conduct details', error: error.message });
  }
};

module.exports = {
  getAllINAs,
  getAllEmployees,
  getINAById,
  getEligibleEmployeesForINA,
  submitINARatings,
  getEmployeeINAHistory,
  getINAConductDetails
};