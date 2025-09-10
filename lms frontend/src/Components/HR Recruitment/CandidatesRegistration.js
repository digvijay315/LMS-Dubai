// import React from 'react'

// function CandidatesRegistration() {
//   return (
//     <div>

//       <div className='registration-container'>
//         <div className='candidate-registration-form'>
//           <div className='registration-form'>
//             <div className='register-title'>
//               <h5>Candidate Registration</h5>
//             </div>

//             <div className='register-items'>
//               <div className="info-div-item">
//                 <label>Candidate Name:</label>
//                 <input type='text' placeholder='Enter candidate name' />
//               </div>
//               <div className="info-div-item">
//                 <label>Qualification:</label>
//                 <input type='text' placeholder='Enter qualification' />
//               </div>
//               <div className="info-div-item">
//                 <label>Nationality:</label>
//                 <input type='text' placeholder='Enter nationality' />
//               </div>
//               <div className="info-div-item">
//                 <label>Current job title:</label>
//                 <input type='text' placeholder='Current job title' />
//               </div>
//               <div className="info-div-item">
//                 <label>Email address:</label>
//                 <input type='text' placeholder='Enter email address' />
//               </div>
//               <div className="info-div-item">
//                 <label>Upload CV:</label>
//                 <input type='file' />
//               </div>
//               <div className="info-div-item">
//                 <label>Job applied for:</label>
//                 <input type='text' placeholder='Job applied for' />
//               </div>
//               <div className="info-div-item">
//                 <label>Total years of experience:</label>
//                 <input type='number' placeholder='Enter total experience' />
//               </div>
//               <div className="info-div-item">
//                 <button>Add experience</button>
//                 <button>Add Certificate</button>
//               </div>

//               <div className='add-experience-div'>
//                 <h6>Add Experience</h6>
//                 <div className='input-group-div'>
//                   <div className="info-div-item">
//                     <label>Job title</label>
//                     <input type='text' placeholder='Enter job title' />
//                   </div>
//                   <div className="info-div-item">
//                     <label>Company Name</label>
//                     <input type='text' placeholder='Enter comapny name' />
//                     <input type='checkbox' />
//                   </div>
//                   <div className="info-div-item">
//                     <label>From</label>
//                     <input type='date' />

//                     <label>To</label>
//                     <input type='date' />
//                   </div>
//                   <div className="info-div-item">
//                     <label>Job Responsibilities</label>
//                     <textarea placeholder='Enter job responsibilities'></textarea>
//                   </div>
//                 </div>
//               </div>

//               <div className='add-certificate-div'>
//                 <h6>Add Certificate</h6>
//                 <div className='input-group-div'>
//                   <div className="info-div-item">
//                     <label>Certificate Name</label>
//                     <input type='text' placeholder='Enter certificate name' />
//                   </div>
//                   <div className="info-div-item">
//                     <label>Issue date</label>
//                     <input type='date' />
//                   </div>
//                   <div className="info-div-item">
//                     <label>Valid till</label>
//                     <input type='date' />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button>Register</button>
//         </div>
        
//       </div>

//     </div>
//   )
// }

// export default CandidatesRegistration


import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import HRHeader from './HRHeader';
import { Margin } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Label } from 'recharts';

function ProjectNameSearch({ formData, setFormData, formErrors, projects }) {
  const [searchTerm, setSearchTerm] = useState(formData.projectName || '');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredProjects = projects.filter(p =>
    (p.name || p).toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
    setFormData(prev => ({ ...prev, projectName: e.target.value }));
  };

  const handleSelect = (project) => {
    const value = project.name || project;
    setSearchTerm(value);
    setFormData(prev => ({ ...prev, projectName: value }));
    setIsOpen(false);
  };

  return (
    <div
      className="info-div-item"
      style={{ width: '50%', alignItems: 'center', position: 'relative', marginBottom: '20px' }}
      ref={wrapperRef}
    >
      <label><h3>Project Name: </h3></label>
      <input
        type="text"
        name="projectName"
        value={searchTerm}
        onChange={handleInputChange}
        onClick={() => setIsOpen(true)}
        placeholder="Enter project name"
        required
        className={formErrors.projectName ? 'error-input' : ''}
        style={{ marginLeft: '100px', padding: '8px', fontSize: '16px' }}
        autoComplete="off"
      />
      {formErrors.projectName && <div className="error-text" style={{ marginLeft: '100px', color: 'red' }}>{formErrors.projectName}</div>}

      {isOpen && filteredProjects.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: '100px',
            width: 'calc(100% - 100px)',
            maxHeight: '150px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            zIndex: 1000,
            borderRadius: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          {filteredProjects.map((p, idx) => (
            <div
              key={p._id || idx}
              style={{ padding: '8px 10px', cursor: 'pointer' }}
              onClick={() => handleSelect(p)}
              onMouseDown={e => e.preventDefault()}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#eee'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'white'}
            >
              {p.name || p}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function CandidatesRegistration() {
  // State for form data
  const [formData, setFormData] = useState({
    projectName: '',             // Add this line
    candidateName: '',
    qualification: '',
    nationality: '',
    currentJobTitle: '',
    email: '',
    jobTitle: '', // New field for job title selection
    jobFunction: '', // New field for function selection
    totalYearsOfExperience: '',
    experiences: [],
    certificates: []
  });

const [projects, setProjects] = useState([]);
useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${base_url}/get_projects`);
        setProjects(response.data); // Update if your response shape differs
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);


  const navigate = useNavigate();


  // State for file
  const [cvFile, setCvFile] = useState(null);

  const [registrationResult, setRegistrationResult] = useState(null);
  
  // UI control states
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  
  // Current experience and certificate being added
  const [currentExperience, setCurrentExperience] = useState({
    jobTitle: '',
    companyName: '',
    isCurrentlyWorking: false,
    fromDate: '',
    toDate: '',
    jobResponsibilities: ''
  });
  
  const [currentCertificate, setCurrentCertificate] = useState({
    certificateName: '',
    issueDate: '',
    validTill: ''
  });

  // Form validation state
  const [formErrors, setFormErrors] = useState({});

  // Handle input change for main form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);

    // Clear CV file error if it exists
    if (formErrors.cvFile) {
      setFormErrors({
        ...formErrors,
        cvFile: null
      });
    }
  };

  // Handle experience form inputs
  const handleExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentExperience({
      ...currentExperience,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle certificate form inputs
  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setCurrentCertificate({
      ...currentCertificate,
      [name]: value
    });
  };

  // Add experience to experiences array
  const addExperience = () => {
    // Validate required fields
    if (!currentExperience.jobTitle || !currentExperience.companyName || !currentExperience.fromDate) {
      toast.warning('Please fill in all required experience fields');
      return;
    }

    // Make sure jobResponsibilities is not empty
    const experienceToAdd = {
      ...currentExperience,
      jobResponsibilities: currentExperience.jobResponsibilities || 'Not provided'
    };
    
    setFormData({
      ...formData,
      experiences: [...formData.experiences, currentExperience]
    });
    
    // Reset current experience form
    setCurrentExperience({
      jobTitle: '',
      companyName: '',
      isCurrentlyWorking: false,
      fromDate: '',
      toDate: '',
      jobResponsibilities: ''
    });
    
    setShowExperienceForm(false);
  };

  // Add certificate to certificates array
  const addCertificate = () => {
    // Validate required fields
    if (!currentCertificate.certificateName || !currentCertificate.issueDate) {
      toast.warning('Please fill in all required certificate fields');
      return;
    }
    
    setFormData({
      ...formData,
      certificates: [...formData.certificates, currentCertificate]
    });
    
    // Reset current certificate form
    setCurrentCertificate({
      certificateName: '',
      issueDate: '',
      validTill: ''
    });
    
    setShowCertificateForm(false);
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.candidateName) errors.candidateName = 'Candidate name is required';
    if (!formData.qualification) errors.qualification = 'Qualification is required';
    if (!formData.nationality) errors.nationality = 'Nationality is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    // if (!formData.jobAppliedFor) errors.jobAppliedFor = 'Job applied for is required';
    if (!formData.totalYearsOfExperience) errors.totalYearsOfExperience = 'Years of experience is required';
    if (!cvFile) errors.cvFile = 'CV file is required';
    if (!formData.jobTitle) errors.jobTitle = 'Job title is required';
    if (!formData.jobFunction) errors.jobFunction = 'Function is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

// Submit form data
const handleSubmit = async () => {
  try {
    // Validate form
    if (!validateForm()) {
      toast.warning('Please fill in all required fields');
      return;
    }
    
    // Create form data for file upload
    const submitData = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (key === 'experiences' || key === 'certificates') {
        // Make sure arrays are properly serialized
        const arrayData = formData[key] || [];
        submitData.append(key, JSON.stringify(arrayData));
      } else if (key === 'totalYearsOfExperience') {
        // Ensure number is sent as string
        submitData.append(key, formData[key].toString());
      } else {
        submitData.append(key, formData[key]);
      }
    });
    
    // Append file
    submitData.append('cv', cvFile);
    
    // Log what's being sent (for debugging)
    console.log('Sending registration data...');
    
    // Send data to backend
    const response = await axios.post(`${base_url}/candidate_register`, submitData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    console.log('Registration response:', response.data);
    
    if (response.data.success) {
      toast.success('Registration successful!');

      // Store registration result to display credentials
      setRegistrationResult(response.data.data);

      // Reset form
      setFormData({
        candidateName: '',
        qualification: '',
        nationality: '',
        currentJobTitle: '',
        email: '',
        jobTitle: '', // New field for job title selection
        jobFunction: '', // New field for function selection
        totalYearsOfExperience: '',
        experiences: [],
        certificates: []
      });
      setCvFile(null);
    } else {
      toast.error(`Registration failed: ${response.data.message || 'Please try again'}`);
    }
  } catch (error) {
    console.error('Registration error details:', error);
    const errorMessage = error.response?.data?.message || 'An error occurred during registration';
    toast.error(errorMessage);
  }
};



  return (
    <div>

      <HRHeader/>
     <div style={{ position: 'relative' }}>
  <button
  onClick={() => navigate('/createProjectHR')}
  style={{ marginLeft: '35px', marginTop: '-50px' }}
>
  HR Dashboard
</button>

</div>

    <style>
    {`
      .registration-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      
      .candidate-registration-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      
      .registration-form {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .register-title {
        margin-bottom: 20px;
        background: linear-gradient(135deg,rgb(149, 34, 198), #2e073f);
        padding: 1rem;
        border-radius: 5px;
      }
      
      .register-title h5 {
        font-size: 24px;
        color: white;
        margin: 0;
      }
      
      .register-items {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      
      .info-div-item {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      
      .info-div-item label {
        font-weight: 600;
        color: #34495e;
      }
      
      .info-div-item input[type="text"],
      .info-div-item input[type="number"],
      .info-div-item input[type="date"],
      .info-div-item textarea {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
      }
      
      .info-div-item textarea {
        min-height: 100px;
        resize: vertical;
      }
      
      .input-group-div {
        display: flex;
        flex-direction: column;
        gap: 15px;
        background-color: #f5f7fa;
        padding: 15px;
        border-radius: 6px;
        margin-top: 10px;
      }
      
      button {
        background-color: #2e073f;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      button:hover {
        background-color:rgb(70, 10, 95);
      }
      
      .add-experience-div, .add-certificate-div {
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        padding: 15px;
        margin-top: 15px;
        background-color: #f8f9fa;
        display: ${showExperienceForm ? 'block' : 'none'};
      }
      
      .add-certificate-div {
        display: ${showCertificateForm ? 'block' : 'none'};
      }
      
      .add-experience-div h6, .add-certificate-div h6 {
        margin: 0 0 15px 0;
        font-size: 18px;
        color: #2c3e50;
      }
      
      .action-buttons {
        display: flex;
        gap: 10px;
        margin-top: 10px;
      }
      
      .cancel-btn {
        background-color: #e74c3c;
      }
      
      .save-btn {
        background-color: #2ecc71;
      }
      
      .experience-item, .certificate-item {
        background-color: #ecf0f1;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
      }
      
      .submit-button {
        background-color: #2e073f;
        color: white;
        padding: 12px 24px;
        font-size: 18px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
        margin-top: 20px;
        align-self: flex-end;
      }
      
      .submit-button:hover {
        background-color: rgb(70, 10, 95);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .checkbox-container {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .checkbox-container input[type="checkbox"] {
        width: 18px;
        height: 18px;
      }
      
      .date-input-group {
        display: flex;
        gap: 15px;
        align-items: center;
      }
      
      .added-items-list {
        margin-top: 15px;
      }
      
      .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 15px;
      }

      .registration-success-message {
      margin-top: 20px;
      padding: 20px;
      background-color: #e7f3e8;
      border: 1px solid #43a047;
      border-radius: 4px;
      text-align: center;
    }

    .credentials-box {
      margin: 15px 0;
      padding: 15px;
      background-color: #f5f5f5;
      border: 1px dashed #ccc;
      border-radius: 4px;
      text-align: left;
      font-family: monospace;
    }

    .dismiss-button {
      padding: 8px 16px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .dismiss-button:hover {
      background-color: #388e3c;
    }
    `}
    </style> 


    {/* Replace old Project Name input with this: */}
<ProjectNameSearch
  formData={formData}
  setFormData={setFormData}
  formErrors={formErrors}
  projects={projects}
/>


      <div className='registration-container'>
        <div className='candidate-registration-form'>
          <div className='registration-form'>
            <div className='register-title'>
              <h5>Candidate Registration</h5>
            </div>






            <div className='register-items'>
              <div className="info-div-item">
                <label>Candidate Name: *</label>
                <input 
                  type='text' 
                  name="candidateName"
                  value={formData.candidateName}
                  onChange={handleInputChange}
                  placeholder='Enter candidate name' 
                  required
                  className={formErrors.candidateName ? 'error-input' : ''}
                />
                {formErrors.candidateName && <div className="error-text">{formErrors.candidateName}</div>}
              </div>
              <div className="info-div-item">
                <label>Qualification: *</label>
                <input 
                  type='text' 
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  placeholder='Enter qualification' 
                  required
                  className={formErrors.qualification ? 'error-input' : ''}
                />
                {formErrors.qualification && <div className="error-text">{formErrors.qualification}</div>}
              </div>
              <div className="info-div-item">
                <label>Nationality: *</label>
                <input 
                  type='text' 
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder='Enter nationality' 
                  required
                  className={formErrors.nationality ? 'error-input' : ''}
                />
                {formErrors.nationality && <div className="error-text">{formErrors.nationality}</div>}
              </div>
              <div className="info-div-item">
                <label>Current job title:</label>
                <input 
                  type='text' 
                  name="currentJobTitle"
                  value={formData.currentJobTitle}
                  onChange={handleInputChange}
                  placeholder='Current job title' 
                />
              </div>
              <div className="info-div-item">
                <label>Email address: *</label>
                <input 
                  type='email' 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='Enter email address' 
                  required
                  className={formErrors.email ? 'error-input' : ''}
                />
                {formErrors.email && <div className="error-text">{formErrors.email}</div>}
              </div>
              <div className="info-div-item">
                <label>Upload CV: *</label>
                <input 
                  type='file' 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  required
                  className={formErrors.cvFile ? 'error-input' : ''}
                />
                {formErrors.cvFile && <div className="error-text">{formErrors.cvFile}</div>}
              </div>
              <div className="info-div-item">
                <h6>Job applied for</h6>

                <div className="job-applied">
                  <label>Job title *</label>
                  <select
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className={formErrors.jobTitle ? 'error-input' : ''}
                    required
                  >
                    <option value="">-- Select job title --</option>
                    <option value="Service man">Service man</option>
                    <option value="Technician II">Technician II</option>
                    <option value="Technician III">Technician III</option>
                    <option value="Sr Technician">Sr Technician</option>
                    <option value="Chief tech">Chief tech</option>
                    <option value="Team leader">Team leader</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Asst engineer">Asst engineer</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Sr engineer">Sr engineer</option>
                  </select>
                  {formErrors.jobTitle && <div className="error-text">{formErrors.jobTitle}</div>}
                </div>

                <div className='functions-applied'>
                  <label>Functions *</label>
                  <select
                    name="jobFunction"
                    value={formData.jobFunction}
                    onChange={handleInputChange}
                    className={formErrors.jobFunction ? 'error-input' : ''}
                    required
                  >
                    <option value="">-- Select functions --</option>
                    <option value="HVAC">HVAC</option>
                    <option value="ELEC">ELEC</option>
                    <option value="MECH">MECH</option>
                    <option value="PLUMB">PLUMB</option>
                    <option value="ELV">ELV</option>
                  </select>
                  {formErrors.jobFunction && <div className="error-text">{formErrors.jobFunction}</div>}
                </div>
              </div>
              <div className="info-div-item">
                <label>Total years of experience: *</label>
                <input 
                  type='number' 
                  name="totalYearsOfExperience"
                  value={formData.totalYearsOfExperience}
                  onChange={handleInputChange}
                  placeholder='Enter total experience' 
                  min="0"
                  step="0.5"
                  required
                  className={formErrors.totalYearsOfExperience ? 'error-input' : ''}
                />
                {formErrors.totalYearsOfExperience && <div className="error-text">{formErrors.totalYearsOfExperience}</div>}
              </div>
              <div className="form-actions">
                <button type="button" onClick={() => setShowExperienceForm(true)}>Add Experience</button>
                <button type="button" onClick={() => setShowCertificateForm(true)}>Add Certificate</button>
              </div>
              
              {/* Display added experiences */}
              {formData.experiences.length > 0 && (
                <div className="added-items-list">
                  <h6>Added Experiences:</h6>
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="experience-item">
                      <p><strong>{exp.jobTitle}</strong> at {exp.companyName}</p>
                      <p>Period: {new Date(exp.fromDate).toLocaleDateString()} - 
                        {exp.isCurrentlyWorking ? ' Present' : 
                          exp.toDate ? ` ${new Date(exp.toDate).toLocaleDateString()}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Display added certificates */}
              {formData.certificates.length > 0 && (
                <div className="added-items-list">
                  <h6>Added Certificates:</h6>
                  {formData.certificates.map((cert, index) => (
                    <div key={index} className="certificate-item">
                      <p><strong>{cert.certificateName}</strong></p>
                      <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}
                        {cert.validTill ? ` - Valid till: ${new Date(cert.validTill).toLocaleDateString()}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {showExperienceForm && (
                <div className='add-experience-div'>
                  <h6>Add Experience</h6>
                  <div className='input-group-div'>
                    <div className="info-div-item">
                      <label>Job title *</label>
                      <input 
                        type='text' 
                        name="jobTitle"
                        value={currentExperience.jobTitle}
                        onChange={handleExperienceChange}
                        placeholder='Enter job title' 
                      />
                    </div>
                    <div className="info-div-item">
                      <label>Company Name *</label>
                      <input 
                        type='text' 
                        name="companyName"
                        value={currentExperience.companyName}
                        onChange={handleExperienceChange}
                        placeholder='Enter company name' 
                      />
                      <div className="checkbox-container">
                        <input 
                          type='checkbox' 
                          name="isCurrentlyWorking"
                          checked={currentExperience.isCurrentlyWorking}
                          onChange={handleExperienceChange}
                        />
                        <label>I currently work here</label>
                      </div>
                    </div>
                    <div className="info-div-item">
                      <div className="date-input-group">
                        <div>
                          <label>From *</label>
                          <input 
                            type='date' 
                            name="fromDate"
                            value={currentExperience.fromDate}
                            onChange={handleExperienceChange}
                          />
                        </div>
                        <div>
                          <label>To {!currentExperience.isCurrentlyWorking && '*'}</label>
                          <input 
                            type='date' 
                            name="toDate"
                            value={currentExperience.toDate}
                            onChange={handleExperienceChange}
                            disabled={currentExperience.isCurrentlyWorking}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="info-div-item">
                      <label>Job Responsibilities</label>
                      <textarea 
                        name="jobResponsibilities"
                        value={currentExperience.jobResponsibilities}
                        onChange={handleExperienceChange}
                        placeholder='Enter job responsibilities'
                      ></textarea>
                    </div>
                    <div className="action-buttons">
                      <button type="button" className="cancel-btn" onClick={() => setShowExperienceForm(false)}>Cancel</button>
                      <button type="button" className="save-btn" onClick={addExperience}>Save</button>
                    </div>
                  </div>
                </div>
              )}

              {showCertificateForm && (
                <div className='add-certificate-div'>
                  <h6>Add Certificate</h6>
                  <div className='input-group-div'>
                    <div className="info-div-item">
                      <label>Certificate Name *</label>
                      <input 
                        type='text' 
                        name="certificateName"
                        value={currentCertificate.certificateName}
                        onChange={handleCertificateChange}
                        placeholder='Enter certificate name' 
                      />
                    </div>
                    <div className="info-div-item">
                      <label>Issue date *</label>
                      <input 
                        type='date' 
                        name="issueDate"
                        value={currentCertificate.issueDate}
                        onChange={handleCertificateChange}
                      />
                    </div>
                    <div className="info-div-item">
                      <label>Valid till</label>
                      <input 
                        type='date' 
                        name="validTill"
                        value={currentCertificate.validTill}
                        onChange={handleCertificateChange}
                      />
                    </div>
                    <div className="action-buttons">
                      <button type="button" className="cancel-btn" onClick={() => setShowCertificateForm(false)}>Cancel</button>
                      <button type="button" className="save-btn" onClick={addCertificate}>Save</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button type="button" className="submit-button" onClick={handleSubmit}>Register Candidate</button>
        </div>
      </div>

      {registrationResult && (
        <div className="registration-success-message">
          <h4>Registration Successful!</h4>
          <p>Please save these credentials for login:</p>
          <div className="credentials-box">
            <p><strong>Username:</strong> {registrationResult.username}</p>
            <p><strong>Temporary Login Code:</strong> {registrationResult.tempLoginCode}</p>
            <p><strong>Note:</strong> This code will expire on {new Date(registrationResult.codeExpiry).toLocaleDateString()}</p>
          </div>
          <button 
            onClick={() => setRegistrationResult(null)} 
            className="dismiss-button"
          >
            Dismiss
          </button>
        </div>
      )}

      <ToastContainer/>
    </div>
  );
}

export default CandidatesRegistration;



