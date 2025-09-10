const HRInterview = require('../Modal/hr_Interview');
const Candidate = require('../Modal/candidate_register');
const Project = require('../Modal/hr_create_project');
const mongoose = require('mongoose');

    // Submit HR interview results
const submitHRInterview = async (req, res) => {
    try {
      const { projectId, candidateId, interviewScores, recommendation } = req.body;
  
      // Validate input
      if (!projectId || !candidateId || !interviewScores || !recommendation) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }
  
      // Verify that project exists
      const projectExists = await Project.findById(projectId);
      if (!projectExists) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }
  
      // Verify that candidate exists
      const candidateExists = await Candidate.findById(candidateId);
      if (!candidateExists) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
  
      // Check if interview already exists for this candidate and project
      const existingInterview = await HRInterview.findOne({
        project: projectId,
        candidate: candidateId
      });
  
      if (existingInterview) {
        // Update existing interview
        existingInterview.interviewScores = interviewScores;
        existingInterview.recommendation = recommendation;
        
        await existingInterview.save();
  
        return res.status(200).json({
          success: true,
          message: 'HR interview updated successfully',
          data: existingInterview
        });
      }
  
      // Create new interview record
      const hrInterview = new HRInterview({
        project: projectId,
        projectTitle: projectExists.name,
        candidateName: candidateExists.candidateName,
        candidateCode: candidateExists.tempLoginCode,
        candidate: candidateId,
        interviewScores,
        recommendation
      });
  
      await hrInterview.save();
  
      // Update candidate status based on recommendation (optional)
      if (recommendation === 'Selected' || recommendation === 'Highly recommended') {
        await Candidate.findByIdAndUpdate(candidateId, {
          status: 'HR Approved',
          hrInterviewStatus: recommendation
        });
      } else if (recommendation === 'Rejected') {
        await Candidate.findByIdAndUpdate(candidateId, {
          status: 'HR Rejected',
          hrInterviewStatus: recommendation
        });
      } else {
        await Candidate.findByIdAndUpdate(candidateId, {
          hrInterviewStatus: recommendation
        });
      }
  
      return res.status(201).json({
        success: true,
        message: 'HR interview submitted successfully',
        data: hrInterview
      });
    } catch (error) {
      console.error('Error submitting HR interview:', error);
      return res.status(500).json({
        success: false,
        message: 'Error submitting HR interview',
        error: error.message
      });
    }
  };
  
  // Get HR Interview by candidate and project
  const getHRInterview = async (req, res) => {
    try {
      const { candidateId, projectId } = req.params;
      
      console.log('Fetching HR interview with:', { candidateId, projectId });
      
      // Verify that IDs are valid ObjectIds
      if (!mongoose.Types.ObjectId.isValid(candidateId) || !mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid candidate or project ID format',
          debug: { candidateId, projectId }
        });
      }
      
      const interview = await HRInterview.findOne({
        candidate: candidateId,
        project: projectId
      }).populate('candidate', 'candidateName email').populate('project', 'name code');
      
      if (!interview) {
        return res.status(404).json({
          success: false,
          message: 'Interview not found'
        });
      }
      
      return res.status(200).json({
        success: true,
        data: interview
      });
    } catch (error) {
      console.error('Error fetching HR interview:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching HR interview',
        error: error.message
      });
    }
  };
  
  // Get all HR Interviews
  const getAllHRInterviews = async (req, res) => {
    try {
      const interviews = await HRInterview.find()
        .populate('candidate', 'candidateName email')
        .populate('project', 'name code')
        .sort({ createdAt: -1 });
      
      return res.status(200).json({
        success: true,
        count: interviews.length,
        data: interviews
      });
    } catch (error) {
      console.error('Error fetching HR interviews:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching HR interviews',
        error: error.message
      });
    }
  };
  
  // Get HR Interviews by project
  const getHRInterviewsByProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      
      const interviews = await HRInterview.find({ project: projectId })
        .populate('candidate', 'candidateName email')
        .populate('project', 'name code')
        .sort({ createdAt: -1 });
      
      return res.status(200).json({
        success: true,
        count: interviews.length,
        data: interviews
      });
    } catch (error) {
      console.error('Error fetching project HR interviews:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching project HR interviews',
        error: error.message
      });
    }
  };
  
  // Delete HR Interview
  const deleteHRInterview = async (req, res) => {
    try {
      const { id } = req.params;
      
      const interview = await HRInterview.findById(id);
      if (!interview) {
        return res.status(404).json({
          success: false,
          message: 'Interview not found'
        });
      }
      
      await interview.remove();
      
      return res.status(200).json({
        success: true,
        message: 'HR interview deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting HR interview:', error);
      return res.status(500).json({
        success: false,
        message: 'Error deleting HR interview',
        error: error.message
      });
    }
  };

module.exports = {
    submitHRInterview,
    getHRInterview,
    getAllHRInterviews,
    getHRInterviewsByProject,
    deleteHRInterview
}