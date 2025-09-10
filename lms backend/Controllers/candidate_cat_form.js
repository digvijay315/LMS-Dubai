const CandidateCAT = require('../Modal/candidate_CAT');
const Candidate = require('../Modal/candidate_register');
const CAT = require('../Modal/create_cat');

// Assign CATs to candidates (bulk operation)
const assignCATsToCandidates = async (req, res) => {
  try {
    const { assignments } = req.body;
    
    if (!assignments || !Array.isArray(assignments) || assignments.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No valid assignments provided' 
      });
    }

    // Validate that all candidates and CATs exist
    const candidateIds = [...new Set(assignments.map(a => a.candidateId))];
    const catIds = [...new Set(assignments.map(a => a.catId))];
    
    const candidatesExist = await Candidate.countDocuments({
      _id: { $in: candidateIds }
    });
    
    const catsExist = await CAT.countDocuments({
      _id: { $in: catIds }
    });
    
    if (candidatesExist !== candidateIds.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more candidates do not exist'
      });
    }
    
    if (catsExist !== catIds.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more CATs do not exist'
      });
    }

    // Add creator information if available
    const assignmentsWithCreator = assignments.map(assignment => ({
      ...assignment,
      createdBy: req.user ? req.user._id : undefined
    }));

    // Use bulkWrite for efficient database operation
    const operations = assignmentsWithCreator.map(assignment => ({
      updateOne: {
        filter: { 
          candidateId: assignment.candidateId,
          catId: assignment.catId
        },
        update: { $set: assignment },
        upsert: true
      }
    }));

    const result = await CandidateCAT.bulkWrite(operations);

    res.status(200).json({
      success: true,
      message: 'CATs assigned successfully',
      data: {
        matched: result.matchedCount,
        modified: result.modifiedCount,
        inserted: result.upsertedCount
      }
    });
  } catch (error) {
    console.error('Error assigning CATs:', error);
    
    // Handle duplicate key errors specifically
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Some candidates already have the specified CAT assigned',
        duplicates: error.writeErrors?.map(err => err.err.op) || []
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Get CAT assignments for a specific candidate
// const getCandidateCATs = async (req, res) => {
//   try {
//     const { candidateId } = req.params;
    
//     const assignments = await CandidateCAT.find({ candidateId })
//       .populate('catId', 'code title description')
//       .sort({ assignedDate: -1 });
    
//     res.status(200).json({
//         success: true,
//         count: assignments.length,
//         data: assignments
//       });
//     } catch (error) {
//       console.error('Error fetching candidate CATs:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Server error. Please try again later.',
//         error: error.message
//       });
//     }
// };
// Get CAT assignments for a specific candidate
// const getCandidateCATs = async (req, res) => {
//   try {
//     const { candidateId } = req.params;
    
//     // Find assigned CATs from CandidateCAT collection
//     const assignments = await CandidateCAT.find({ candidateId })
//       .populate('catId', 'code title description')
//       .sort({ assignedDate: -1 });
    
//     // Get the candidate to include the auto-assigned CAT test
//     const candidate = await Candidate.findById(candidateId);
    
//     let allCATs = [...assignments];
    
//     // If candidate has an auto-assigned CAT test, add it to the list
//     if (candidate && candidate.catTest && candidate.catTest.id) {
//       allCATs.unshift({
//         candidateId: candidateId,
//         catId: {
//           _id: candidate.catTest.id,
//           code: candidate.catTest.code,
//           title: candidate.catTest.title,
//           description: "Auto-assigned on registration"
//         },
//         assignedDate: candidate.catTest.assignedAt,
//         expiryDate: null,
//         status: "assigned",
//         isAutoAssigned: true
//       });
//     }
    
//     res.status(200).json({
//       success: true,
//       count: allCATs.length,
//       data: allCATs
//     });
//   } catch (error) {
//     console.error('Error fetching candidate CATs:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error. Please try again later.',
//       error: error.message
//     });
//   }
// };

// Get CAT assignments for a specific candidate
const getCandidateCATs = async (req, res) => {
  try {
    const { candidateId } = req.params;
    
    // Find assigned CATs from CandidateCAT collection
    const assignments = await CandidateCAT.find({ candidateId })
      .populate('catId', 'code title description')
      .sort({ assignedDate: -1 });
    
    // Get the candidate to include the auto-assigned CAT test
    const candidate = await Candidate.findById(candidateId);
    
    let allCATs = [...assignments];
    
    // If candidate has an auto-assigned CAT test, add it to the list
    // BUT only if it doesn't already exist in the assignments
    if (candidate && candidate.catTest && candidate.catTest.id) {
      // Check if this CAT is already in the assignments
      const catAlreadyExists = assignments.some(
        assignment => assignment.catId._id.toString() === candidate.catTest.id.toString()
      );
      
      if (!catAlreadyExists) {
        allCATs.unshift({
          candidateId: candidateId,
          catId: {
            _id: candidate.catTest.id,
            code: candidate.catTest.code,
            title: candidate.catTest.title,
            description: "Auto-assigned on registration"
          },
          assignedDate: candidate.catTest.assignedAt,
          expiryDate: null,
          status: "assigned", // Changed from "assigned" to match your frontend
          isAutoAssigned: true
        });
      }
    }
    
    res.status(200).json({
      success: true,
      count: allCATs.length,
      data: allCATs
    });
  } catch (error) {
    console.error('Error fetching candidate CATs:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};
  
  // Get all CAT assignments (with filtering options)
  const getAllCATAssignments = async (req, res) => {
    try {
      const { status, catId, fromDate, toDate } = req.query;
      
      // Build filter object based on query parameters
      const filter = {};
      
      if (status) {
        filter.status = status;
      }
      
      if (catId) {
        filter.catId = catId;
      }
      
      // Date range filtering
      if (fromDate || toDate) {
        filter.assignedDate = {};
        if (fromDate) {
          filter.assignedDate.$gte = new Date(fromDate);
        }
        if (toDate) {
          filter.assignedDate.$lte = new Date(toDate);
        }
      }
      
      const assignments = await CandidateCAT.find(filter)
        .populate('candidateId', 'candidateName tempLoginCode jobTitle jobFunction')
        .populate('catId', 'code title')
        .sort({ assignedDate: -1 });
      
      res.status(200).json({
        success: true,
        count: assignments.length,
        data: assignments
      });
    } catch (error) {
      console.error('Error fetching CAT assignments:', error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again later.',
        error: error.message
      });
    }
  };
  
  // Update a CAT assignment (e.g., mark as completed, update score)
  const updateCATAssignment = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, score, remarks } = req.body;
      
      const assignment = await CandidateCAT.findById(id);
      
      if (!assignment) {
        return res.status(404).json({
          success: false,
          message: 'CAT assignment not found'
        });
      }
      
      // Update fields if provided
      if (status) {
        assignment.status = status;
        
        // If marking as completed, record the completion date
        if (status === 'completed' && assignment.status !== 'completed') {
          assignment.completedDate = new Date();
        }
      }
      
      if (score !== undefined) {
        assignment.score = score;
      }
      
      if (remarks) {
        assignment.remarks = remarks;
      }
      
      await assignment.save();
      
      res.status(200).json({
        success: true,
        message: 'CAT assignment updated successfully',
        data: assignment
      });
    } catch (error) {
      console.error('Error updating CAT assignment:', error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again later.',
        error: error.message
      });
    }
  };
  
  // Delete a CAT assignment
  const deleteCATAssignment = async (req, res) => {
    try {
      const { id } = req.params;
      
      const assignment = await CandidateCAT.findById(id);
      
      if (!assignment) {
        return res.status(404).json({
          success: false,
          message: 'CAT assignment not found'
        });
      }
      
      await assignment.remove();
      
      res.status(200).json({
        success: true,
        message: 'CAT assignment deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting CAT assignment:', error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again later.',
        error: error.message
      });
    }
  };
  
  module.exports = {
    assignCATsToCandidates,
    getCandidateCATs,
    getAllCATAssignments,
    updateCATAssignment,
    deleteCATAssignment
  };