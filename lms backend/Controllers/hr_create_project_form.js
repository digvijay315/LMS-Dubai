// const Project = require('../Modal/hr_create_project');
// const EmployeeInfo = require('../Modal/employee_register'); 
// const ProjectApproval = require('../Modal/project_approvals');

// const saveProject = async (req, res) => {
//     try {
//         // Find the tender department employee
//         const tenderEmployee = await EmployeeInfo.findOne({ 
//             employee_id: req.body.tenderDept 
//         });
        
//         // Find the contract manager employee
//         const contractEmployee = await EmployeeInfo.findOne({ 
//             employee_id: req.body.contractManager 
//         });

//         if (!tenderEmployee || !contractEmployee) {
//             return res.status(400).json({ 
//                 error: "One or both employees not found" 
//             });
//         }

//         // Create new project with employee references
//         const project = new Project({
//             name: req.body.name,
//             code: req.body.code,
//             region: req.body.region,
//             category: req.body.category,
//             tenderDept: {
//                 employeeId: tenderEmployee.employee_id,
//                 _id: tenderEmployee._id
//             },
//             contractManager: {
//                 employeeId: contractEmployee.employee_id,
//                 _id: contractEmployee._id
//             },
//             matrix: req.body.matrix
//         });

//         // Save the project first
//         const savedProject = await project.save();

//         // Create the initial approval record
//         await createProjectApproval(
//             savedProject._id,  // The MongoDB _id of the newly created project
//             tenderEmployee.employee_id  // The tender department employee's ID
//         );

//         // Send back the saved project data
//         res.status(201).json(savedProject);
//     } catch (error) {
//         console.error('Error saving project:', error);
//         res.status(400).json({ error: error.message });
//     }
// };

// const createProjectApproval = async (projectId, tenderDeptId) => {
//     const approval = new ProjectApproval({
//       projectId,
//       currentStatus: 'PENDING_TENDER',
//       tenderDeptResponse: {
//         employeeId: tenderDeptId,
//         status: 'PENDING'
//       },
//       contractManagerResponse: {
//         status: 'PENDING'
//       }
//     });
//     return await approval.save();
// };

// const getProject = async (req, res) => {
//     try {
//         const projects = await Project.find()
//             .populate('tenderDept._id contractManager._id');
//         res.status(200).json(projects);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const getEmployeeProjects = async (req, res) => {
//     try {
//         const employeeId = req.params.employeeId;
        
//         // Find the employee to get their MongoDB _id
//         const employee = await EmployeeInfo.findOne({ 
//             employee_id: employeeId 
//         });

//         if (!employee) {
//             return res.status(404).json({ 
//                 error: "Employee not found" 
//             });
//         }

//         // Find projects where the employee is either tender dept or contract manager
//         const projects = await Project.find({
//             $or: [
//                 { 'tenderDept._id': employee._id },
//                 { 'contractManager._id': employee._id }
//             ]
//         }).populate('tenderDept._id contractManager._id');
        
//         res.status(200).json({
//             message: "Projects fetched successfully",
//             projects: projects
//         });
//     } catch (error) {
//         console.error('Error fetching employee projects:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// const updateProjectMatrix = async (req, res) => {
//     try {
//         const { projectId, matrixValues } = req.body;
        
//         const project = await Project.findById(projectId);
//         if (!project) {
//             return res.status(404).json({ error: 'Project not found' });
//         }

//         // Update the matrix values in the project's rows
//         project.matrix.rows = project.matrix.rows.map((row, rowIndex) => {
//             return {
//                 ...row,
//                 values: row.values.map((_, colIndex) => {
//                     const key = `${rowIndex}-${colIndex}`;
//                     return matrixValues[key] || '';
//                 })
//             };
//         });

//         await project.save();
//         res.status(200).json(project);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


// module.exports = { saveProject, createProjectApproval, getProject, updateProjectMatrix, getEmployeeProjects };



const EmployeeInfo = require('../Modal/employee_register');
const Project = require('../Modal/hr_create_project');

const saveProject = async (req, res) => {
    try {
        // Find the tender department employee based on employee_id
        const tenderEmployee = await EmployeeInfo.findOne({ 
            employee_id: req.body.tenderDept 
        });
        
        // Find the contract manager employee based on employee_id
        const contractEmployee = await EmployeeInfo.findOne({ 
            employee_id: req.body.contractManager 
        });

        // Validate that the tender employee belongs to tender department
        if (!tenderEmployee || tenderEmployee.department !== 'Tender Department') {
            return res.status(400).json({ 
                error: "Tender department employee not found or invalid" 
            });
        }

        // Validate that the contract employee has contract manager job title
        if (!contractEmployee || !contractEmployee.job_title.includes('Contract Manager')) {
            return res.status(400).json({ 
                error: "Contract manager employee not found or invalid" 
            });
        }

        // Create new project with employee references and status/visibility fields
        const project = new Project({
            name: req.body.name,
            code: req.body.code,
            region: req.body.region,
            category: req.body.category,
            tenderDept: {
                employeeId: tenderEmployee.employee_id,
                _id: tenderEmployee._id
            },
            contractManager: {
                employeeId: contractEmployee.employee_id,
                _id: contractEmployee._id
            },
            matrix: req.body.matrix,
            // Add status tracking for each role
            status: {
                tenderDept: { status: 'pending' },
                contractManager: { status: 'pending' },
                admin: { status: 'pending' }
            },
            // Configure initial visibility
            visibility: {
                tenderDept: true,       // Initially visible only to Tender Department
                contractManager: false,  // Not visible to Contract Manager until approved by Tender Dept
                admin: false            // Not visible to Admin until there's a rejection or final approval
            }
        });

        // Save the project
        const savedProject = await project.save();

        // Send back the saved project data
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(400).json({ error: error.message });
    }
};

const getProject = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('tenderDept._id contractManager._id');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const getEmployeeProjects = async (req, res) => {
//     try {
//         const employeeId = req.params.employeeId;
        
//         // Find the employee to get their details
//         const employee = await EmployeeInfo.findOne({ 
//             employee_id: employeeId 
//         });

//         if (!employee) {
//             return res.status(404).json({ 
//                 error: "Employee not found" 
//             });
//         }

//         console.log("Found employee:", {
//             id: employee._id,
//             employeeId: employee.employee_id,
//             department: employee.department,
//             jobTitle: employee.job_title,
//             role: employee.role
//         });

//         // Determine role based on department or job title - FIX CASE SENSITIVITY
//         let role = null;
        
//         const departmentNormalized = employee.department ? employee.department.toUpperCase() : '';
//         const jobTitleNormalized = employee.job_title ? employee.job_title.toUpperCase() : '';
        
//         if (departmentNormalized === 'TENDER DEPARTMENT' || departmentNormalized === 'TENDER') {
//             role = 'tenderDept';
//         } else if (jobTitleNormalized.includes('CONTRACT MANAGER')) {
//             role = 'contractManager';
//         } else if (employee.role === 'admin') {
//             role = 'admin';
//         }

//         let query = {};
        
//         // Set up different queries based on role
//         if (role === 'tenderDept') {
//             query = {
//                 'tenderDept.employeeId': employee.employee_id,
//                 'visibility.tenderDept': true  // Only return projects visible to tender dept
//             };
//         } else if (role === 'contractManager') {
//             query = {
//                 'contractManager.employeeId': employee.employee_id,
//                 'visibility.contractManager': true  // Only return projects visible to contract manager
//             };
//         } else if (role === 'admin') {
//             query = {
//                 'visibility.admin': true  // Only return projects visible to admin
//             };
//         } else {
//             // If role can't be determined, return an error
//             return res.status(400).json({
//                 error: "Employee role not supported for project assignment"
//             });
//         }

//         console.log("Using query:", query);

//         // Find projects matching the query criteria
//         const projects = await Project.find(query)
//             .populate('tenderDept._id contractManager._id');
        
//         console.log(`Found ${projects.length} projects for ${role}`);
        
//         res.status(200).json({
//             message: "Projects fetched successfully",
//             role: role,
//             projects: projects
//         });
//     } catch (error) {
//         console.error('Error fetching employee projects:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

const getEmployeeProjects = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        
        if (!employeeId) {
            return res.status(400).json({ error: "Employee ID is required" });
        }

        // Find the employee to get their details - check multiple ID fields
        const employee = await EmployeeInfo.findOne({
            employee_id: employeeId
        });

        if (!employee) {
            return res.status(404).json({ 
                error: "Employee not found" 
            });
        }

        console.log("Found employee:", {
            id: employee._id,
            employeeId: employee.employee_id,
            department: employee.department,
            jobTitle: employee.job_title,
            role: employee.role
        });

        // Determine role based on department or job title - FIX CASE SENSITIVITY
        let role = null;
        
        const departmentNormalized = employee.department ? employee.department.toUpperCase() : '';
        const jobTitleNormalized = employee.job_title ? employee.job_title.toUpperCase() : '';
        
        if (departmentNormalized === 'TENDER DEPARTMENT' || departmentNormalized === 'TENDER') {
            role = 'tenderDept';
        } else if (jobTitleNormalized.includes('CONTRACT MANAGER') || departmentNormalized === 'CONTRACT') {
            role = 'contractManager';
        } else if (employee.role === 'admin') {
            role = 'admin';
        }

        if (!role) {
            console.log("Could not determine role for employee:", employee);
            return res.status(400).json({
                error: "Employee role not supported for project assignment"
            });
        }

        let query = {};
        
        // Set up different queries based on role
        if (role === 'tenderDept') {
            query = {
                $or: [
                    // Check both employeeId and _id reference
                    { 'tenderDept.employeeId': employee.employee_id },
                    { 'tenderDept._id': employee._id }
                ],
                'visibility.tenderDept': true  // Only return projects visible to tender dept
            };
        } else if (role === 'contractManager') {
            query = {
                $or: [
                    // Check both employeeId and _id reference
                    { 'contractManager.employeeId': employee.employee_id },
                    { 'contractManager._id': employee._id }
                ],
                'visibility.contractManager': true  // Only return projects visible to contract manager
            };
            
            // For contract managers, we need to ensure they only see projects approved by tender dept
            query['status.tenderDept.status'] = { $in: ['approved', 'APPROVED', 'Approved'] };
        } else if (role === 'admin') {
            // Admin can see all projects or projects flagged for admin visibility
            query = {
                $or: [
                    { 'visibility.admin': true },
                    // Include projects rejected by tender or contract manager
                    { 'status.tenderDept.status': { $in: ['rejected', 'REJECTED', 'Rejected'] } },
                    { 'status.contractManager.status': { $in: ['rejected', 'REJECTED', 'Rejected'] } }
                ]
            };
        }

        console.log("Using query:", JSON.stringify(query));

        // Find projects matching the query criteria
        const projects = await Project.find(query)
            .populate('tenderDept._id contractManager._id');
        
        console.log(`Found ${projects.length} projects for ${role} (${employee.employee_id})`);

        if (projects.length === 0) {
            console.log("No projects found with query:", JSON.stringify(query));
        }
        
        res.status(200).json({
            message: "Projects fetched successfully",
            role: role,
            projects: projects
        });
    } catch (error) {
        console.error('Error fetching employee projects:', error);
        res.status(500).json({ error: error.message });
    }
};


const updateProjectMatrix = async (req, res) => {
    try {
        const { projectId, matrixValues } = req.body;
        
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update the matrix values in the project's rows
        project.matrix.rows = project.matrix.rows.map((row, rowIndex) => {
            return {
                ...row,
                values: row.values.map((_, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    return matrixValues[key] || '';
                })
            };
        });

        await project.save();
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// New function to handle project approvals
const updateProjectApproval = async (req, res) => {
    try {
        const { projectId, role, decision, comments } = req.body;
        
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update project status based on role and decision
        if (role === 'tenderDept') {
            project.status.tenderDept = { 
                status: decision, 
                comments: comments,
                updatedAt: new Date()
            };
            
            if (decision === 'approved') {
                // If tender dept approves, make visible to contract manager
                project.visibility.contractManager = true;
            } else if (decision === 'rejected') {
                // If tender dept rejects, make visible to admin directly
                project.visibility.admin = true;
            }
        } else if (role === 'contractManager') {
            project.status.contractManager = { 
                status: decision, 
                comments: comments,
                updatedAt: new Date()
            };
            
            // When contract manager makes a decision, always make visible to admin
            project.visibility.admin = true;
        } else if (role === 'admin') {
            project.status.admin = { 
                status: decision, 
                comments: comments,
                updatedAt: new Date()
            };
        }

        await project.save();
        res.status(200).json({
            message: `Project ${decision} by ${role}`,
            project: project
        });
    } catch (error) {
        console.error('Error updating project approval:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get projects for admin review
const getProjectsForAdmin = async (req, res) => {
    try {
        // Get projects that should be visible to admin
        const projects = await Project.find({
            'visibility.admin': true
        }).populate('tenderDept._id contractManager._id');
        
        res.status(200).json({
            message: "Admin projects fetched successfully",
            projects: projects
        });
    } catch (error) {
        console.error('Error fetching admin projects:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get project details by ID with full population
const getProjectById = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        
        const project = await Project.findById(projectId)
            .populate('tenderDept._id contractManager._id');
        
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        res.status(200).json({
            message: "Project fetched successfully",
            project: project
        });
    } catch (error) {
        console.error('Error fetching project details:', error);
        res.status(500).json({ error: error.message });
    }
};

// Add or update this endpoint in your controllers
// const submitTenderResponse = async (req, res) => {
//     try {
//         const { projectId, status, comments, matrixValues, employeeId } = req.body;
        
//         // Get employee ID either from the request body or from the authenticated user
//         const submitterId = employeeId || (req.employee ? req.employee._id : null);
        
//         if (!submitterId) {
//             return res.status(401).json({ 
//                 error: "Employee ID not found. Please include employeeId in the request body or login properly."
//             });
//         }
        
//         console.log(`Processing tender response for project ${projectId} from employee ${submitterId}`);
        
//         // Find the project
//         const project = await Project.findById(projectId);
        
//         if (!project) {
//             return res.status(404).json({ error: "Project not found" });
//         }
        
//         // Ensure the project has a status object
//         project.status = project.status || {};
        
//         // Update TENDER DEPARTMENT status (was incorrectly updating contractManager)
//         project.status.tenderDept = {
//             status: status.toLowerCase(), // Ensure consistent case
//             comments: comments,
//             reviewedAt: new Date()
//         };
        
//         // If approved, update visibility for contract manager
//         if (status.toUpperCase() === 'APPROVED') {
//             project.visibility.contractManager = true;
            
//             // If matrixValues provided, update the matrix values
//             if (matrixValues) {
//                 // Convert flat matrixValues object back to the structure expected by the model
//                 for (const [key, value] of Object.entries(matrixValues)) {
//                     const [rowIndex, colIndex] = key.split('-').map(Number);
//                     project.matrix.rows[rowIndex].values[colIndex] = value;
//                 }
//             }
//         }
        
//         // If rejected, update visibility for admin (not contract manager)
//         if (status.toUpperCase() === 'REJECTED') {
//             project.visibility.admin = true;
//         }
        
//         console.log("Saving updated project with tender department status:", status.toLowerCase());
        
//         // Save the updated project
//         const updatedProject = await project.save();
        
//         res.status(200).json(updatedProject);
//     } catch (error) {
//         console.error('Error submitting tender response:', error);
//         res.status(500).json({ 
//             error: error.message,
//             stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//         });
//     }
// };

// controllers/projectController.js

const submitTenderResponse = async (req, res) => {
    try {
        console.log('TENDER RESPONSE ENDPOINT CALLED');
        console.log('Request body:', JSON.stringify(req.body));
        
        const { projectId, status, comments, matrixValues, employeeId } = req.body;
        
        if (!projectId) {
            return res.status(400).json({ error: "Project ID is required" });
        }
        
        // Get employee ID from multiple possible sources
        const submitterId = employeeId || 
                           (req.employee ? req.employee.employee_id : null) || 
                           (req.employee ? req.employee._id : null);
        
        if (!submitterId) {
            return res.status(401).json({ 
                error: "Employee ID not found. Please include employeeId in the request or login properly."
            });
        }
        
        console.log(`TENDER: Processing response for project ${projectId} from employee ${submitterId}`);
        
        // Find the project
        const project = await Project.findById(projectId);
        
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        
        console.log('TENDER: Current project status before update:', JSON.stringify(project.status));
        
        // Initialize status object if it doesn't exist
        if (!project.status) {
            project.status = {};
        }
        
        // EXPLICITLY update tender department status only
        project.status.tenderDept = {
            status: status.toLowerCase(), // Convert to lowercase for consistency
            comments: comments,
            reviewedAt: new Date(),
            submittedBy: submitterId
        };
        
        console.log('TENDER: Updated status:', JSON.stringify(project.status.tenderDept));
        
        // Update visibility based on the tender response
        if (!project.visibility) {
            project.visibility = {};
        }
        
        // If approved, make visible to contract manager
        if (status.toUpperCase() === 'APPROVED') {
            project.visibility.contractManager = true;
            project.visibility.tenderDept = true;
            console.log('TENDER: Making project visible to contract manager');
            
            // Update matrix values if provided
            if (matrixValues) {
                for (const [key, value] of Object.entries(matrixValues)) {
                    const [rowIndex, colIndex] = key.split('-').map(Number);
                    if (project.matrix && project.matrix.rows && 
                        project.matrix.rows[rowIndex] && 
                        project.matrix.rows[rowIndex].values) {
                        project.matrix.rows[rowIndex].values[colIndex] = value;
                    }
                }
            }
        } 
        // If rejected, make visible to admin
        else if (status.toUpperCase() === 'REJECTED') {
            project.visibility.admin = true;
            project.visibility.tenderDept = false; // Hide from tender dept
            console.log('TENDER: Making project visible to admin due to rejection');
        }
        
        console.log('TENDER: Saving project with updated status...');
        
        // Save the updated project
        const updatedProject = await project.save();
        
        console.log('TENDER: Project saved successfully');
        
        // Send back the updated project
        res.status(200).json(updatedProject);
        
    } catch (error) {
        console.error('Error in submitTenderResponse:', error);
        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

// Add or update this endpoint in your controllers
const submitContractResponse = async (req, res) => {
    try {
        const { projectId, status, comments, employeeId } = req.body;
        
        console.log("Received contract response request body:", req.body);
        console.log("Auth user:", req.user);
        
        if (!projectId) {
            return res.status(400).json({ error: "Project ID is required" });
        }
        
        // IMPORTANT FIX: Use the employee ID from the request body directly
        // Don't try to access req.user.employee_id at all
        const submitterId = employeeId || (req.user ? req.user._id : null);
        
        if (!submitterId) {
            return res.status(401).json({ 
                error: "Employee ID not found. Please include employeeId in the request body."
            });
        }
        
        console.log(`Processing contract response for project ${projectId} from employee ${submitterId}`);
        
        // Find the project
        const project = await Project.findById(projectId);
        
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        
        console.log("Found project:", project.name || project._id);
        
        // Update project status and add comments
        // Make sure we're not accessing any properties on undefined objects
        project.status = project.status || {};
        project.status.contractManager = {
            status: status,
            comments: comments,
            submittedBy: submitterId, // Use our safe variable here
            reviewedAt: new Date()
        };
        
        // Set visibility for admin
        project.visibility = project.visibility || {};
        project.visibility.admin = true;
        
        console.log("Saving updated project...");
        
        // Save the updated project
        const updatedProject = await project.save();
        
        console.log("Project updated successfully");
        
        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error submitting contract response:', error);
        res.status(500).json({ 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

const getApprovalProjects = async (req, res) => {
    try {
        const projects = await Project.find({
          'visibility.admin': true
        });
        res.status(200).json({ success: true, projects });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      } 
}

module.exports = {
    saveProject,
    getProject,
    getEmployeeProjects,
    updateProjectMatrix,
    updateProjectApproval,
    getProjectsForAdmin,
    getProjectById,
    submitTenderResponse,
    submitContractResponse,
    getApprovalProjects
};