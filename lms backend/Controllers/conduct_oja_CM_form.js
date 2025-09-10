const OJAConduct = require('../Modal/conduct_oja_CM');
const CreateOJA = require('../Modal/create_oja'); // Import your OJA model
const Employee = require('../Modal/employee_register'); // Import your Employee model
const CompetencyMapping = require('../Modal/competency_mapping'); // Import your CompetencyMapping model

// Get all OJAs
const getAllOJAs = async (req, res) => {
  try {
    const ojas = await CreateOJA.find({}).select('oja_title oja_code rating_range_oja');
    res.status(200).json(ojas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching OJAs', error: error.message });
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

// Get specific OJA with activities
const getOJAById = async (req, res) => {
  try {
    const oja = await CreateOJA.findById(req.params.id);
    
    if (!oja) {
      return res.status(404).json({ message: 'OJA not found' });
    }
    
    res.status(200).json(oja);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching OJA', error: error.message });
  }
};

// Get eligible employees for a specific OJA
const getEligibleEmployeesForOJA = async (req, res) => {
  try {
    const ojaId = req.params.ojaId;
    
    // Find employees who have this OJA assigned in their competency mapping
    const eligibleEmployees = await CompetencyMapping.find({
      'competencyItems.ojaId': ojaId
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

// Submit OJA ratings
const submitOJARatings = async (req, res) => {
  try {
    const { ojaId, employeeId, trainerId, trainerName, ratings } = req.body;
    
    // Get OJA details
    const oja = await CreateOJA.findById(ojaId);
    if (!oja) {
      return res.status(404).json({ message: 'OJA not found' });
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
    const activitiesWithRatings = oja.activities.map(activity => {
      const activityRating = {
        activity_id: activity._id,
        activity_title: activity.activity_oja_title,
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
    
    // Create new OJA conduct record
    const newOJAConduct = new OJAConduct({
      oja_id: ojaId,
      oja_title: oja.oja_title,
      oja_code: oja.oja_code,
      
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
    
    await newOJAConduct.save();
    
    // Update competency mapping status if needed
    await CompetencyMapping.updateOne(
      { 
        employeeId: employeeId,
        'competencyItems.ojaId': ojaId
      },
      {
        $set: { 
          'competencyItems.$.status': 'completed',
          lastUpdated: new Date()
        }
      }
    );
    
    res.status(201).json({ 
      message: 'OJA ratings submitted successfully',
      conductId: newOJAConduct._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting OJA ratings', error: error.message });
  }
};

// Get conducted OJA history for an employee
const getEmployeeOJAHistory = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    
    const history = await OJAConduct.find({ employee_id: employeeId })
      .sort({ conducted_date: -1 });
    
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching OJA history', error: error.message });
  }
};

// Get conducted OJA details
const getOJAConductDetails = async (req, res) => {
  try {
    const conductId = req.params.conductId;
    
    const conductDetails = await OJAConduct.findById(conductId);
    
    if (!conductDetails) {
      return res.status(404).json({ message: 'OJA conduct record not found' });
    }
    
    res.status(200).json(conductDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching OJA conduct details', error: error.message });
  }
};

module.exports = {
  getAllOJAs,
  getAllEmployees,
  getOJAById,
  getEligibleEmployeesForOJA,
  submitOJARatings,
  getEmployeeOJAHistory,
  getOJAConductDetails
};