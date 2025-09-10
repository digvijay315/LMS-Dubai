const ProjectApproval = require('../Modal/project_approvals');
const EmployeeInfo = require('../Modal/employee_register');
const Project = require('../Modal/hr_create_project');

const submitTenderResponse = async (req, res) => {
  try {
      const { projectId, status, comments, matrixValues } = req.body;
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
          return res.status(401).json({ error: 'Authentication required' });
      }

      // Get employee data from token
      const employeeData = await EmployeeInfo.findOne({ 
          employee_id: req.employee.employee_id 
      });

      if (!employeeData) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      // Verify employee is from tender department
      if (employeeData.department !== 'TENDER') {
          return res.status(403).json({ 
              error: 'Only tender department employees can submit this response' 
          });
      }

      // Find the approval record
      const approval = await ProjectApproval.findOne({ 
          projectId,
          'tenderDeptResponse.status': 'PENDING'
      });

      if (!approval) {
          return res.status(404).json({ error: 'Approval request not found or already processed' });
      }

      // Update the approval record
      approval.tenderDeptResponse = {
          employeeId: employeeData.employee_id,
          status,
          comments,
          respondedAt: new Date()
      };

      // If approved, update matrix and set status to pending contract
      if (status === 'APPROVED') {
          approval.currentStatus = 'PENDING_CONTRACT';
          approval.matrixValues = matrixValues;

          // Update the project's matrix values
          await Project.findByIdAndUpdate(projectId, {
              'matrix.values': matrixValues
          });
      } else {
          // If rejected, mark as completed
          approval.currentStatus = 'COMPLETED';
      }

      await approval.save();
      res.status(200).json(approval);
  } catch (error) {
      console.error('Error in tender response:', error);
      res.status(500).json({ error: error.message });
  }
};

const submitContractResponse = async (req, res) => {
  try {
      const { projectId, status, comments } = req.body;
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
          return res.status(401).json({ error: 'Authentication required' });
      }

      // Get employee data from token
      const employeeData = await EmployeeInfo.findOne({ 
          employee_id: req.employee.employee_id 
      });

      if (!employeeData) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      // Verify employee is contract manager
      if (employeeData.department !== 'CONTRACT') {
          return res.status(403).json({ 
              error: 'Only contract managers can submit this response' 
          });
      }

      // Find the approval record
      const approval = await ProjectApproval.findOne({ 
          projectId,
          currentStatus: 'PENDING_CONTRACT'
      });

      if (!approval) {
          return res.status(404).json({ 
              error: 'Approval request not found or not ready for contract manager response' 
          });
      }

      // Verify tender department has approved
      if (approval.tenderDeptResponse.status !== 'APPROVED') {
          return res.status(400).json({ 
              error: 'Tender department approval is required first' 
          });
      }

      // Update the approval record
      approval.contractManagerResponse = {
          employeeId: employeeData.employee_id,
          status,
          comments,
          respondedAt: new Date()
      };

      // Mark as completed
      approval.currentStatus = 'COMPLETED';

      await approval.save();
      res.status(200).json(approval);
  } catch (error) {
      console.error('Error in contract response:', error);
      res.status(500).json({ error: error.message });
  }
};

const getApprovalsByProject = async (req, res) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
          return res.status(401).json({ error: 'Authentication required' });
      }

      // Get employee data
      const employeeData = await EmployeeInfo.findOne({ 
          employee_id: req.employee.employee_id 
      });

      if (!employeeData) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      // Only HR should be able to view all approvals
      if (employeeData.department !== 'HR') {
          return res.status(403).json({ 
              error: 'Only HR can view all project approvals' 
          });
      }

      // Get all approvals
      const approvals = await ProjectApproval.find()
          .populate('projectId')
          .sort({ createdAt: -1 });

      res.status(200).json(approvals);
  } catch (error) {
      console.error('Error fetching approvals:', error);
      res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitTenderResponse,
  submitContractResponse,
  getApprovalsByProject
};