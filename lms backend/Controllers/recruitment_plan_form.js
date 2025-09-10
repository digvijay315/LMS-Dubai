const RecruitmentPlan = require('../Modal/recruitment_plan');
const Project  = require('../Modal/hr_create_project');

  // const saveRecruitmentPlan = async (req, res) => {
  //   try {
  //     const { project, interviewers, companies, matrix } = req.body;
      
  //     // Basic validation
  //     if ( !project || !interviewers || !companies || !matrix || 
  //         !interviewers.length || !companies.length || !matrix.length) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Missing required fields'
  //       });
  //     }
  
  //     // Create new recruitment plan
  //     const recruitmentPlan = new RecruitmentPlan({
  //       project,
  //       interviewers,
  //       companies,
  //       matrix,
  //       createdBy: req.user ? req.user.employee_id : 'system'
  //     });
  
  //     const savedPlan = await recruitmentPlan.save();
  
  //     res.status(201).json({
  //       success: true,
  //       message: 'Recruitment plan saved successfully',
  //       data: savedPlan
  //     });
  //   } catch (error) {
  //     console.error('Error saving recruitment plan:', error);
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error saving recruitment plan',
  //       error: error.message
  //     });
  //   }
  // };

    /**
   * Save a new recruitment plan
   * @route POST /api/save_recruitment_plan
   * @param {Object} req.body - Recruitment plan data
   * @returns {Object} Created recruitment plan
   */
  
  const saveRecruitmentPlan = async (req, res) => {
    try {
      const { project, interviewers, companies, matrix } = req.body;
      
      // Check if a plan already exists for this project
      const existingPlan = await RecruitmentPlan.findOne({ project });
      if (existingPlan) {
        return res.status(400).json({
          success: false,
          message: 'A recruitment plan already exists for this project'
        });
      }
      
      // Create new recruitment plan
      const newPlan = new RecruitmentPlan({
        project,
        interviewers,
        companies,
        matrix,
        createdBy: req.body.createdBy || req.userId || 'system'  // Adjust based on your auth setup
      });
      
      const savedPlan = await newPlan.save();
      
      return res.status(201).json({
        success: true,
        plan: savedPlan,
        message: 'Recruitment plan created successfully'
      });
      
    } catch (error) {
      console.error('Error creating recruitment plan:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create recruitment plan',
        error: error.message
      });
    }
  };

  const getAllRecruitmentPlans = async (req, res) => {
    try {
      const recruitmentPlans = await RecruitmentPlan.find()
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        count: recruitmentPlans.length,
        data: recruitmentPlans
      });
    } catch (error) {
      console.error('Error fetching recruitment plans:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching recruitment plans',
        error: error.message
      });
    }
  };

  const getRecruitmentPlanById = async (req, res) => {
    try {
      const recruitmentPlan = await RecruitmentPlan.findById(req.params.id);
      
      if (!recruitmentPlan) {
        return res.status(404).json({
          success: false,
          message: 'Recruitment plan not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: recruitmentPlan
      });
    } catch (error) {
      console.error('Error fetching recruitment plan:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching recruitment plan',
        error: error.message
      });
    }
  };
  
  // const updateRecruitmentPlan = async (req, res) => {
  //   try {
  //     const { project, interviewers, companies, matrix } = req.body;
      
  //     // Basic validation
  //     if ( !project || !interviewers || !companies || !matrix || 
  //         !interviewers.length || !companies.length || !matrix.length) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'Missing required fields'
  //       });
  //     }
  
  //     const updatedPlan = await RecruitmentPlan.findByIdAndUpdate(
  //       req.params.id,
  //       {
  //         project,
  //         interviewers,
  //         companies,
  //         matrix,
  //         updatedAt: Date.now()
  //       },
  //       { new: true, runValidators: true }
  //     );
      
  //     if (!updatedPlan) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'Recruitment plan not found'
  //       });
  //     }
  
  //     res.status(200).json({
  //       success: true,
  //       message: 'Recruitment plan updated successfully',
  //       data: updatedPlan
  //     });
  //   } catch (error) {
  //     console.error('Error updating recruitment plan:', error);
  //     res.status(500).json({
  //       success: false,
  //       message: 'Error updating recruitment plan',
  //       error: error.message
  //     });
  //   }
  // };

  const updateRecruitmentPlan = async (req, res) => {
    try {
      const planId = req.body.planId;
      
      if (!planId) {
        return res.status(400).json({
          success: false,
          message: 'Plan ID is required for update'
        });
      }
      
      // Prepare update data
      const updateData = {
        project: req.body.project,
        interviewers: req.body.interviewers,
        companies: req.body.companies,
        matrix: req.body.matrix,
        updatedAt: Date.now()
      };
      
      // Find and update the recruitment plan
      const updatedPlan = await RecruitmentPlan.findByIdAndUpdate(
        planId,
        { $set: updateData },
        { new: true }
      );
      
      if (!updatedPlan) {
        return res.status(404).json({
          success: false,
          message: 'Recruitment plan not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        plan: updatedPlan,
        message: 'Recruitment plan updated successfully'
      });
      
    } catch (error) {
      console.error('Error updating recruitment plan:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update recruitment plan',
        error: error.message
      });
    }
  };

  const deleteRecruitmentPlan = async (req, res) => {
    try {
      const recruitmentPlan = await RecruitmentPlan.findByIdAndDelete(req.params.id);
      
      if (!recruitmentPlan) {
        return res.status(404).json({
          success: false,
          message: 'Recruitment plan not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Recruitment plan deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting recruitment plan:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting recruitment plan',
        error: error.message
      });
    }
  };

 const getRecruitmentPlanByProject = async (req, res) => {
    try {
      const projectId = req.params.projectId;
      
      // First, validate that the project exists
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
      
      // Prepare search pattern
      const projectPattern = `${project.code} - ${project.name}`;
      
      // Find the recruitment plan for the project
      const plan = await RecruitmentPlan.findOne({
        project: projectPattern
      });
      
      if (!plan) {
        return res.status(200).json({
          success: true,
          plan: null,
          message: 'No recruitment plan found for this project'
        });
      }
      
      return res.status(200).json({
        success: true,
        plan,
        message: 'Recruitment plan retrieved successfully'
      });
      
    } catch (error) {
      console.error('Error fetching recruitment plan:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch recruitment plan',
        error: error.message
      });
    }
  };

  module.exports = { saveRecruitmentPlan, getAllRecruitmentPlans, getRecruitmentPlanById, updateRecruitmentPlan, deleteRecruitmentPlan, getRecruitmentPlanByProject };