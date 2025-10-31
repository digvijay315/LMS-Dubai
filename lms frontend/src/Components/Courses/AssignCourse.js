import { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';





export default function AssignCourse() {
  const navigate = useNavigate();

  // States for different data types
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [ojtData, setOjtData] = useState([]);
  const [ojaData, setOjaData] = useState([]);
  const [inaData, setInaData] = useState([]);
  const [assessments, setAssessments] = useState([]);
  
  // State for current competency entries that will be created
  const [competencyMappings, setCompetencyMappings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // States for bulk assignment
  const [showBulkAssign, setShowBulkAssign] = useState(false);
  const [bulkAssignment, setBulkAssignment] = useState({
    functionType: '',
    jobTitle: '',
   
    skillLevel: '',
    courseCode: '',
    courseName: '',
    trainingCode: '',
    trainingName: '',
    
    assessmentTitle: '',
    
    validity: '',
    deadLine: ''
  });

  

  // Static data
  const mainCategories = [
    "Technical Skills", 
    "Soft Skills", 
    "Safety Skills", 
    "Operational Skills"
  ];
  
 
  
  const skillLevels = ["Level 1 - Basic", "Level 2 - Intermediate", "Level 3 - Advanced", "Level 4 - Expert"];
  
  const validityOptions = [
    { value: "3 months", label: "3 months" },
    { value: "6 months", label: "6 months" },
    { value: "9 months", label: "9 months" },
    { value: "12 months", label: "12 months" },
    { value: "18 months", label: "18 months" },
    { value: "24 months", label: "24 months" },
     { value: "lifetime", label: "Life Time" }
  ];





useEffect(() => {
  const setHeaderHeight = () => {
    const firstRow = document.querySelector('.mapping-table thead tr:first-child');
    if (firstRow) {
      document.documentElement.style.setProperty(
        '--row1-height',
        `${firstRow.offsetHeight}px`
      );
    }
  };

  // First run immediately
  setHeaderHeight();

  // Run again on next paint
  requestAnimationFrame(setHeaderHeight);

  // And once more after 200ms for safety (fonts/layout load)
  const t = setTimeout(setHeaderHeight, 200);

  return () => clearTimeout(t);
}, [currentPage]);




  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch employees
      const employeesResponse = await axios.get(`${base_url}/employees`);
      console.log(employeesResponse);
      setEmployees(employeesResponse.data);
      
      // Initialize competency mappings with employee data
      const initialMappings = employeesResponse.data.map(emp => ({
        employeeId: emp.employee_id,
        employeeName: emp.employee_name,
        functionType: emp.function_title || '',
        jobTitle: emp.job_title || '',
       
        skillLevel: '',
        courseCode: '',
        courseName: '',
        trainingCode: '',
        trainingName: '',
        
        assessmentTitle: '',
        
        validity: '',
        deadLine: ''
      }));
      setCompetencyMappings(initialMappings);
      
      // Fetch other data
      const coursesResponse = await axios.get(`${base_url}/courses`);
      console.log(coursesResponse);
      
      setCourses(coursesResponse.data);

      const trainingsResponse = await axios.get(`${base_url}/trainings`);
      setTrainings(trainingsResponse.data);
      
      const ojtResponse = await axios.get(`${base_url}/ojt`);
      setOjtData(ojtResponse.data);
      
      const ojaResponse = await axios.get(`${base_url}/oja`);
      setOjaData(ojaResponse.data);
      
      const inaResponse = await axios.get(`${base_url}/ina`);
      setInaData(inaResponse.data);
      
      const assessmentsResponse = await axios.get(`${base_url}/assessments`);
      setAssessments(assessmentsResponse.data);
      
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error with user notification here
    }
  };



  // Update the handleMappingChange function to also set the corresponding title when a code is selected
  const handleMappingChange = (index, field, value) => {
    const updatedMappings = [...competencyMappings];
    updatedMappings[index][field] = value;

    if (field === 'courseCode' && value && value !== 'NA') {
      const selectedCourse = courses.find(c => c.course_code === value);
      if (selectedCourse) {
        updatedMappings[index]['courseName'] = selectedCourse.course_title_main;
      }
    }
    
    // When a code is selected, also set its corresponding title
    if (field === 'trainingCode' && value && value !== 'NA') {
      const selectedTraining = trainings.find(t => t.training_code === value);
      if (selectedTraining) {
        updatedMappings[index]['trainingName'] = selectedTraining.training_name;
      }
    }
    
    if (field === 'ojtCode' && value && value !== 'NA') {
      const selectedOjt = ojtData.find(o => o.ojt_code === value);
      if (selectedOjt) {
        updatedMappings[index]['ojtTitle'] = selectedOjt.ojt_title;
      }
    }
    
    if (field === 'lmsAssessmentCode' && value && value !== 'NA') {
      const selectedAssessment = assessments.find(a => a.code === value);
      if (selectedAssessment) {
        updatedMappings[index]['assessmentTitle'] = selectedAssessment.assessment_title;
      }
    }
    
    if (field === 'ojaCode' && value && value !== 'NA') {
      const selectedOja = ojaData.find(o => o.oja_code === value);
      if (selectedOja) {
        updatedMappings[index]['ojaTitle'] = selectedOja.oja_title;
      }
    }
    
    if (field === 'inaCode' && value && value !== 'NA') {
      const selectedIna = inaData.find(i => i.ina_code === value);
      if (selectedIna) {
        updatedMappings[index]['inaTitle'] = selectedIna.ina_title;
      }
    }
    
    setCompetencyMappings(updatedMappings);
  };

  // Handle bulk assignment changes
  const handleBulkAssignmentChange = (field, value) => {
    const updatedBulkAssignment = { ...bulkAssignment };
    updatedBulkAssignment[field] = value;

    if (field === 'courseCode' && value && value !== 'NA') {
      const selectedCourse = courses.find(c => c.course_code === value);
      if (selectedCourse) {
        updatedBulkAssignment['courseName'] = selectedCourse.course_title_main;
      }
    }
    
    // When a code is selected in bulk assignment, also set its corresponding title
    if (field === 'trainingCode' && value && value !== 'NA') {
      const selectedTraining = trainings.find(t => t.training_code === value);
      if (selectedTraining) {
        updatedBulkAssignment['trainingName'] = selectedTraining.training_name;
      }
    }
    
   
    
   
    
   
    
   
    
   
    setBulkAssignment(updatedBulkAssignment);
  };

  // Apply bulk assignment
  const applyBulkAssignment = () => {
    const { functionType, jobTitle } = bulkAssignment;
    
    // Validate that function and job title are selected
    if (!functionType || !jobTitle) {
      toast.info("Please select both Function Type and Job Title for bulk assignment");
      return;
    }
    
    // Update mappings for matching employees
    const updatedMappings = competencyMappings.map(mapping => {
      if (mapping.functionType === functionType && mapping.jobTitle === jobTitle) {
        return {
          ...mapping,
          
          skillLevel: bulkAssignment.skillLevel,
          projectName: bulkAssignment.projectName,
          region: bulkAssignment.region,


          courseCode: bulkAssignment.courseCode,
          courseName: bulkAssignment.courseName, // Include the title
          trainingCode: bulkAssignment.trainingCode,
          trainingName: bulkAssignment.trainingName, // Include the title
         
          assessmentTitle: bulkAssignment.assessmentTitle, // Include the title
          
          validity: bulkAssignment.validity,
          deadLine: bulkAssignment.deadLine || bulkAssignment.validity
        };
      }
      return mapping; 
    });
    
    setCompetencyMappings(updatedMappings);
    setShowBulkAssign(false);
    toast.success(`Course assigned to all employees with Function: ${functionType} and Job Title: ${jobTitle}`);
  };

  // Save all competency mappings
 const saveCompetencyMappings = async () => {
  try {
    // Filter out mappings that have no competency data set based on actual UI fields
    const mappingsToSave = competencyMappings.filter(mapping =>
      mapping.skillLevel || mapping.courseCode || mapping.trainingCode || mapping.lmsAssessmentCode
    );
console.log(mappingsToSave)
    if (mappingsToSave.length === 0) {
      toast.info('No Assign Course data to save. Please Assign Course first.');
      return;
    }

    await axios.post(`${base_url}/assigncourse/mappings`, { mappings: mappingsToSave });
    toast.success('Assign course successfully!');

    // Reset the form for new entries
    fetchAllData();
  } catch (error) {
    console.error("Error saving competency mappings:", error);
    toast.error('Failed to save competency mappings. Please try again.');
  }
};


  // Filter competency mappings based on search term
  const filteredMappings = competencyMappings.filter(mapping => {
    if (searchTerm === '') return true;
    
    return (
      mapping.employeeId?.toLowerCase().includes(searchTerm) ||
      mapping.employeeName?.toLowerCase().includes(searchTerm) ||
      mapping.functionType?.toLowerCase().includes(searchTerm) ||
      mapping.jobTitle?.toLowerCase().includes(searchTerm) ||
      mapping.mainCategory?.toLowerCase().includes(searchTerm) ||
      mapping.subCategory?.toLowerCase().includes(searchTerm)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredMappings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMappings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get unique function types and job titles for bulk assignment
  const uniqueFunctionTypes = [...new Set(competencyMappings.map(item => item.functionType).filter(Boolean))];
  const uniqueJobTitles = [...new Set(competencyMappings.map(item => item.jobTitle).filter(Boolean))];

  // Render "NA" option in select boxes
  const renderSelectWithNA = (options, value, onChange, placeholder) => (
    <select 
      className="form-select"
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      <option value="NA">Not Applicable (NA)</option>
      {options}
    </select>
  );

  return (
    <div className="competency-container">
      <h1 className="mapping-title">Assign Course</h1>
      
      <div className="controls-container">
        {/* Search box */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <span className="search-icon">🔍</span>
        </div>
        
        {/* Action buttons */}
        <div className="action-buttons">
          <button 
            onClick={() => setShowBulkAssign(!showBulkAssign)}
            className="btn btn-primary"
          >
            {showBulkAssign ? 'Individual Assign' : 'Bulk Assign'}
          </button>
          
          <button 
            onClick={saveCompetencyMappings}
            className="btn btn-success"
          >
            Assign Course
          </button>
        </div>
      </div>
      
      {/* Bulk Assignment Panel */}
    {showBulkAssign ? (
        <div className="bulk-assign-panel">
          <h2 className="panel-title">Bulk Assignment</h2>
          <div className="grid-container grid-5-cols">
            <div className="form-group">
              <label className="form-label">Function Type</label>
              <select 
                className="form-select"
                value={bulkAssignment.functionType}
                onChange={(e) => handleBulkAssignmentChange('functionType', e.target.value)}
              >
                <option value="">-- Select Function --</option>
                {uniqueFunctionTypes.map((func, idx) => (
                  <option key={idx} value={func}>{func}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <select 
                className="form-select"
                value={bulkAssignment.jobTitle}
                onChange={(e) => handleBulkAssignmentChange('jobTitle', e.target.value)}
              >
                <option value="">-- Select Job Title --</option>
                {uniqueJobTitles.map((job, idx) => (
                  <option key={idx} value={job}>{job}</option>
                ))}
              </select>
            </div>
           
           
            
            <div className="form-group">
              <label className="form-label">Skill Level</label>
              <select 
                className="form-select"
                value={bulkAssignment.skillLevel}
                onChange={(e) => handleBulkAssignmentChange('skillLevel', e.target.value)}
              >
                <option value="">-- Select Skill Level --</option>
                {skillLevels.map((level, idx) => (
                  <option key={idx} value={level}>{level}</option>
                ))}
              </select>
            </div>


           <div className="form-group">
  <label className="form-label">Project Name</label>
  <input
    type="text"
    className="form-control"
    value={bulkAssignment.projectName || ""}
    onChange={(e) => handleBulkAssignmentChange('projectName', e.target.value)}
    placeholder="Enter project name"
  />
</div>

<div className="form-group">
  <label className="form-label">Region</label>
  <input
    type="text"
    className="form-control"
    value={bulkAssignment.region || ""}
    onChange={(e) => handleBulkAssignmentChange('region', e.target.value)}
    placeholder="Enter region"
  />
</div>

          </div>
          
          <div className="grid-container grid-5-cols">
            <div className="form-group">
              <label className="form-label">Course</label>
              {renderSelectWithNA(
                courses.map((course, idx) => (
                  <option key={idx} value={course.course_code}>
                    {`${course.course_code} - ${course.course_title_main}`}
                  </option>
                )),
                bulkAssignment.courseCode,
                (e) => handleBulkAssignmentChange('courseCode', e.target.value),
                "-- Select Course --"
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Training</label>
              {renderSelectWithNA(
                trainings.map((training, idx) => (
                  <option key={idx} value={training.training_code}>
                    {`${training.training_code} - ${training.training_name}`}
                  </option>
                )),
                bulkAssignment.trainingCode,
                (e) => handleBulkAssignmentChange('trainingCode', e.target.value),
                "-- Select Training --"
              )}
            </div>
            
           
          

          
<div className="form-group">
  <label className="form-label">Dead line</label>
  <input
    type="date"
    className="form-control"
    value={bulkAssignment.deadLine || ""}
    onChange={(e) => handleBulkAssignmentChange('deadLine', e.target.value)}
  />
</div>
            
          </div>
          
          <div className="grid-container grid-2-cols">
            <div className="form-group">
              <label className="form-label">Validity</label>
              <select 
                className="form-select"
                value={bulkAssignment.validity}
                onChange={(e) => handleBulkAssignmentChange('validity', e.target.value)}
              >
                <option value="">-- Select Validity --</option>
                {validityOptions.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button 
  onClick={() => {
    applyBulkAssignment();
    saveCompetencyMappings();
  }}
  className="btn btn-primary"
>
  Apply to Selected Function/Job
</button>

            </div>
          </div>
        </div>
   ) : (
    
       <>
      <h3>Individual Assign</h3>
      <div className="table-container">
        <table className="mapping-table">
          <thead>
           
            <tr>
             <th className="id-column">Employee Id</th>
<th className="name-column">Employee Name</th>
              {/* <th className="select-column">Main Category</th>
              <th className="select-column">Sub Category</th> */}
              <th className="select-column">Skill Level</th>
              <th>Function Type</th>
              <th>Job Title</th>
              <th className="select-column">Course</th>
              <th className="select-column">Training Code</th>
             
              <th className="select-column">Deadline</th>
              <th className="select-column">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                 <td className="id-column">{item.employeeId}</td>
      <td className="name-column">{item.employeeName}</td>
            
             
                <td>
                  <select 
                    className="form-select"
                    value={item.skillLevel}
                    onChange={(e) => handleMappingChange(index + indexOfFirstItem, 'skillLevel', e.target.value)}
                  >
                    <option value="">-- Select Skill Level --</option>
                    {skillLevels.map((level, idx) => (
                      <option key={idx} value={level}>{level}</option>
                    ))}
                  </select>
                </td>
                <td>{item.functionType}</td>
                <td>{item.jobTitle}</td>
                <td>
                  {renderSelectWithNA(
                    courses.map((course, idx) => (
                      <option key={idx} value={course.course_code}>
                        {`${course.course_code} - ${course.course_title_main}`}
                      </option>
                    )),
                    item.courseCode,
                    (e) => handleMappingChange(index + indexOfFirstItem, 'courseCode', e.target.value),
                    "-- Select Course --"
                  )}
                </td>
                <td>
                  {renderSelectWithNA(
                    trainings.map((training, idx) => (
                      <option key={idx} value={training.training_code}>
                        {`${training.training_code} - ${training.training_name}`}
                      </option>
                    )),
                    item.trainingCode,
                    (e) => handleMappingChange(index + indexOfFirstItem, 'trainingCode', e.target.value),
                    "-- Select Training --"
                  )}
                </td>
          
             
        
                <td className="date-column">
                  <input 
                    type='date' 
                    value={item.deadLine}
                    onChange={(e) => handleMappingChange(index + indexOfFirstItem, 'deadLine', e.target.value)} 
                  />
                </td>
                {/* <td>
                  <select 
                    className="form-select"
                    value={item.validity}
                    onChange={(e) => handleMappingChange(index + indexOfFirstItem, 'validity', e.target.value)}
                  >
                    <option value="">-- Select Validity --</option>
                    {validityOptions.map((option, idx) => (
                      <option key={idx} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </td> */}

                <td>
  <button
    className="btn btn-info"
   onClick={() => navigate(`/assigncourse/mappings/${item.employeeId}`)}

  >
    View
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>  

        </>
)}
      
      {/* Pagination */}
      <div className="pagination-container">
      <button 
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        
        <div className="page-numbers">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      <ToastContainer/>
<style jsx>{`
/* Main Container Styles */
.competency-container {
  max-width: 100%;
  padding: 2rem;
  background-color: #f8f9fa;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.mapping-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 3px solid #3498db;
  padding-bottom: 0.5rem;
  display: inline-block;
}

/* Header Controls */
.controls-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* Search Box */
.search-container {
  position: relative;
  width: 33%;
}

.search-input {
  border-radius: 30px;
  padding: 12px 45px 12px 16px;
  width: 100%;
  height: 50px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  outline: none;
  transition: all 0.3s ease;
  background-color: white;
}

.search-input:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  pointer-events: none;
}

/* Buttons */
.action-buttons { display: flex; gap: 10px; }
.btn {
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 40px;
}
.btn-primary { background-color: #3498db; color: white; }
.btn-primary:hover { background-color: #2980b9; }
.btn-success { background-color: #2ecc71; color: white; }
.btn-success:hover { background-color: #27ae60; }

/* Bulk Assignment Panel */
.bulk-assign-panel {
  background-color: #ffffff;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  border-left: 4px solid #3498db;
}
.panel-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.grid-container { display: grid; gap: 1rem; }
.grid-5-cols { grid-template-columns: repeat(5, 1fr); }
.grid-2-cols { grid-template-columns: repeat(2, 1fr); }

/* Form Elements */
.form-group { margin-bottom: 1rem; }
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #495057;
}
.form-select,
.form-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  background-color: white;
}
.form-select:focus,
.form-input:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}
.form-select:disabled {
  background-color: #f1f3f5;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Table Container */
.table-container {
  max-height: 500px;
  overflow-y: auto;
  overflow-x: auto;
  border-radius: 6px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.mapping-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
}
.mapping-table th,
.mapping-table td {
  padding: 10px 12px;
  text-align: left;
  border: 1px solid #dee2e6;
  font-size: 0.9rem;
  background-clip: padding-box;
}

/* Sticky Headers */
.mapping-table thead th {
  position: sticky;
  background-color: #f2f6fc;
  border-bottom: 2px solid #3498db;
  line-height: 44px;
  height: 44px;
  vertical-align: middle;
  z-index: 12;
}

/* Row 1 headers */
.mapping-table thead tr:nth-child(1) th {
  top: 0;
  z-index: 15;
  border-bottom: none; /* 🚀 remove double border line */
}
.mapping-table thead tr:nth-child(1) th.employee-details-group {
  position: sticky;
  left: 0;
  top: 0;
  background-color: #f2f6fc;
  z-index: 120;
}
/* Row 2 headers */
/* Row 2 headers */
.mapping-table thead tr:nth-child(2) th {
  top: var(--row1-height, 44px);
  z-index: 14;
}

/* Row 2: Employee ID sticky col */
.mapping-table thead tr:nth-child(2) th.id-column {
  top: var(--row1-height, 44px);
}

/* Row 2: Employee Name sticky col */
.mapping-table thead tr:nth-child(2) th.name-column {
  top: var(--row1-height, 44px);
}


/* --- Employee Id column --- */
/* Header row 1 */
.mapping-table thead tr:nth-child(1) th.id-column {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 110;
}
/* Header row 2 */
.mapping-table thead tr:nth-child(2) th.id-column {
  position: sticky;
  left: 0;
   /* match row 1 height */
  z-index: 109;
}
/* Body cells */
.mapping-table tbody td.id-column {
  position: sticky;
  left: 0;

  background: white;
  z-index: 80;
}

/* --- Employee Name column --- */
/* Header row 1 */
.mapping-table thead tr:nth-child(1) th.name-column {
  position: sticky;
  left: 100px;
  top: 0px;
  z-index: 108;
}
/* Header row 2 */
.mapping-table thead tr:nth-child(2) th.name-column {
  position: sticky;
  left: 100px;
 
  z-index: 107;
}
/* Body cells */
.mapping-table tbody td.name-column {
  position: sticky;
  left: 100px;

  background: white;
  z-index: 79;
}

/* Column widths */
.mapping-table .id-column { min-width: 100px; width: 100px; }
.mapping-table .name-column { min-width: 150px; width: 150px; }
.mapping-table .select-column { min-width: 180px; }
.mapping-table .date-column { width: 120px; }

/* Hover highlight */
.mapping-table tbody tr:hover { background-color: #e9f7fe; }

/* Select box */
.mapping-table select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: white;
  font-size: 0.85rem;
}
.mapping-table select:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}
.mapping-table select:disabled { background: #f1f3f5; }

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.pagination-button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  margin: 0 5px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.pagination-button:hover:not(:disabled) {
  background-color: #3498db;
  color: white;
}
.pagination-button:disabled { opacity: 0.5; cursor: not-allowed; }
.page-numbers { display: flex; }
.page-number {
  padding: 8px 15px;
  margin: 0 3px;
  border-radius: 4px;
  border: 1px solid #3498db;
  background-color: #fff;
  color: #3498db;
  cursor: pointer;
}
.page-number.active { background-color: #3498db; color: white; }
.page-number:hover:not(.active) { background-color: #3498db; color: #fff; }

/* Toasts */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

/* Responsive */
@media (max-width: 1200px) {
  .grid-5-cols { grid-template-columns: repeat(3, 1fr); }
  .search-container { width: 40%; }
}
@media (max-width: 992px) {
  .grid-5-cols { grid-template-columns: repeat(2, 1fr); }
  .grid-2-cols { grid-template-columns: 1fr; }
  .controls-container { flex-direction: column; align-items: flex-start; }
  .search-container { width: 100%; margin-bottom: 1rem; }
  .action-buttons { width: 100%; }
}
@media (max-width: 768px) {
  .grid-5-cols { grid-template-columns: 1fr; }
  .competency-container { padding: 1rem; }
  .page-numbers { display: none; }
  .pagination-container { justify-content: space-between; }
}
`}</style>




    </div>
  );
}












