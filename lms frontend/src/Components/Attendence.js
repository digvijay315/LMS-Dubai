import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import axios from "axios";
import '../StyleCode/Attendence.css'
import "./DemoComponent/Loader";
import { toast, ToastContainer } from "react-toastify";
import FileUpload from "./DemoComponent/FileUpload";
import { base_url } from "./Utils/base_url";
import "select2";
import "select2/dist/css/select2.css"; // Optional: Include Select2 CSS
import Select from "react-select";


function Attendence() {

  const initialAttendenceState = {
    training_name_attendence: "",
    training_type_attendence: "",
    training_category_attendence: "",
    date_from_atten: "",
    date_to_atten: "",
    time_from_atten: "",
    time_to_atten: "",
    training_venue_atten: "",
    trainer: "",
    trainer_emp_id: "",
    employee_id_atten: [],
    service_provider: "",
  };

  const [attendence, setattendence] = useState(initialAttendenceState);

  const attendence_details_infoget = async () => {
    try {
      const resp = await axios.post(
        `${base_url}/add_attendence_details`,
        attendence
      );
      if (resp.status === 200) {
        toast.success("Attendence is marked.", { autoClose: 2000 });
        // setattendence(initialAttendenceState); // Reset the form fields
        // setSelectedEmployees([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const getTrainer = (e) => {
    const selectedValue = e.target.value;
    const employeeDiv = document.getElementById('employee-div');
    const serviceProviderDiv = document.getElementById('service-provider');
    
    // First, hide both divs
    employeeDiv.style.display = 'none';
    employeeDiv.classList.remove('visible');
    serviceProviderDiv.style.display = 'none';
    serviceProviderDiv.classList.remove('visible');
    
    // Then show the appropriate div based on selection
    if (selectedValue === 'If Internal') {
      employeeDiv.style.display = 'block';
      // Use setTimeout to ensure the display block takes effect before adding the visible class
      setTimeout(() => {
        employeeDiv.classList.add('visible');
      }, 10);
    } else if (selectedValue === 'If External') {
      serviceProviderDiv.style.display = 'block';
      setTimeout(() => {
        serviceProviderDiv.classList.add('visible');
      }, 10);
    }
  };
 
  const[details, setdetails] = useState([]);
  const get_details = async () => {
      try {
          const resp = await axios.get(`${base_url}/event_details_get`);      
          setdetails(resp.data)
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    get_details();
  }, []);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Fetch options from the backend
  const fetchOptions = async () => {
    try {
      const response = await axios.get(`${base_url}/employee_details_get`);
      const formattedOptions = response.data.employee.map((emp) => ({
        value: emp.employee_id,
        label: `${emp.employee_id} - ${emp.employee_name}`,
        details: emp, // Add full details to use later
      }));
      setOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleAddEmployee = () => {
    if (!selectedOption) {
      alert('Please select an employee first');
      return;
    }
    
    const isAlreadyAdded = selectedEmployees.some(emp => emp.value === selectedOption.value);
    
    if (isAlreadyAdded) {
      alert('This employee is already added to the list');
      return;
    }
    
    setSelectedEmployees([...selectedEmployees, selectedOption]);
    setSelectedOption(null);
  };

  const handleRemoveEmployee = (employeeId) => {
    setSelectedEmployees(selectedEmployees.filter(emp => emp.value !== employeeId));
  };


  function CustomSelect({ 
      label, 
      options, 
      value, 
      onSelect, 
      searchQuery, 
      onSearchChange, 
      placeholder, 
      renderOption 
    }) {
      const [isOpen, setIsOpen] = useState(false);
      const dropdownRef = useRef(null);
      const searchInputRef = useRef(null);
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
    
      const handleSearchClick = (e) => {
        e.stopPropagation();
        // Don't close the dropdown when clicking the search input
        if (!isOpen) {
          setIsOpen(true);
        }
      };
    
      const handleContainerClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen && searchInputRef.current) {
          // Focus the search input when opening the dropdown
          setTimeout(() => {
            searchInputRef.current.focus();
          }, 0);
        }
      };
    
      return (
        <div className="custom-select-container" ref={dropdownRef}>
          <label className="label">{label}</label>
          <div 
            className="select-input-container" 
            onClick={handleContainerClick}
          >
            <div className="selected-value">
              {value ? renderOption(value) : placeholder}
            </div>
            <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </div>
          
          {isOpen && (
            <div className="dropdown-container" onClick={e => e.stopPropagation()}>
              <div className="search-container">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={onSearchChange}
                  onClick={handleSearchClick}
                  placeholder="Search..."
                  className="dropdown-search"
                />
              </div>
              <div className="options-container">
                {options.length > 0 ? (
                  options.map((option) => (
                    <div
                      key={option._id}
                      className="option"
                      onClick={() => {
                        onSelect(option);
                        setIsOpen(false);
                      }}
                    >
                      {renderOption(option)}
                    </div>
                  ))
                ) : (
                  <div className="no-options">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>
      );
  }

  const [assessment, setAssessment] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [searchAssessmentQuery, setSearchAssessmentQuery] = useState('');

  const fetchAssessmentData = async () => {
    try {
        const response = await axios.get(`${base_url}/assessment_data_fetch`);
        console.log(response);
        setAssessment(response.data.assessments);
    } catch (error) {
        console.log(error);
    }
  }

    useEffect(() =>{
        fetchAssessmentData();
    }, []);

  const filteredAssessments = assessment?.filter(assessment => 
    assessment.assessment_title.toLowerCase().includes(searchAssessmentQuery.toLowerCase()) ||
    assessment.code.toLowerCase().includes(searchAssessmentQuery.toLowerCase())
  ) || [];

  const handleAssessmentSearch = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setSearchAssessmentQuery(e.target.value);
  };


  const assignAssessmentToEmployees = async () => {
    if (!selectedAssessment || selectedEmployees.length === 0) {
      toast.error("Please select an assessment and employees");
      return;
    }
  
    const assignmentData = {
      assessment_id: selectedAssessment._id,
      training_id: attendence.training_name_attendence, // Using training name as ID
      employee_ids: selectedEmployees.map(emp => emp.details.employee_id),
      completion_deadline: document.querySelector('.assessment-settings input[type="date"]').value,
      attempt_limit: parseInt(document.querySelector('.assessment-settings input[type="number"]').value),
      passing_score: parseInt(document.querySelector('.assessment-settings input[placeholder="Enter passing score"]').value)
    };
  
    try {
      const response = await axios.post(`${base_url}/assign_assessment_attendies`, assignmentData);
      if (response.status === 200) {
        toast.success("Assessment assigned successfully");
        setSelectedAssessment(null);
        // Reset assessment form fields
        setattendence(initialAttendenceState); // Reset the form fields
        setSelectedEmployees([]);
        document.querySelectorAll('.assessment-settings input').forEach(input => input.value = '');
      }
    } catch (error) {
      console.error(error);
      toast.error("Error assigning assessment");
    }
  };

  return (
    <div>
      <div>
        <Sidebar />

        <section className="main-content-section">
          <Header />

          <div className="header-div header-two">
            <div className="title-name">
              <h5>Upload Attendence</h5>
              <p>
                <a
                  onClick={() => window.location.reload()}
                  style={{ cursor: "pointer", color: "#099ded" }}
                >
                  Home
                </a>{" "}
                <i class="fa-solid fa-caret-right"></i>Upload Attendence
              </p>
            </div>
          </div>

          <div className="attendene-list">
            <div className="title-div-two">
              <h2>
                Upload <span style={{ fontWeight: "300" }}>Attendence</span>
              </h2>
            </div>

            <div className="upload-attendene" style={{ fontSize: "14px" }}>
              <div className="info-div-item">
                <label>Training Name</label>
                <select
                  className="training-name"
                  name="training-name"
                  id="training_name_attendence"
                  onChange={(e) => {
                    setattendence({
                      ...attendence,
                      training_name_attendence: e.target.value,
                    });
                  }}
                >
                <option>-- Select Name --</option>
                  {details.map((item) => (
                          <option key={item.training_name}>
                            {item.training_name}
                          </option>
                        ))}
                </select>
              </div>
              <div className="info-div-item">
                <label>Training Type</label>
                <select id="training_type_attendence" 
                  onChange={(e) => {
                    setattendence({
                      ...attendence,
                      training_type_attendence: e.target.value,
                    });
                  }}>
                  <option>-- Select Type --</option>
                  <option>Type - 1</option>
                  <option>Type - 1</option>
                  <option>Type - 1</option>
                  <option>Type - 1</option>
                </select>
              </div>
              <div className="info-div-item">
                <label>Training Category</label>
                <select id="training_category_attendence"
                  onChange={(e) => {
                    setattendence({
                      ...attendence,
                      training_category_attendence: e.target.value,
                    });
                  }}>
                  <option>-- Select Category --</option>
                  {details.map((item) => (
                          <option key={item.training_category}>
                            {item.training_category}
                          </option>
                        ))}
                </select>
              </div>
              <div className="date-div">
                <div className="info-div-item">
                  <label>Date from</label>
                  <input
                    type="date"
                    id="date_from_atten"
                    onChange={(e) => {
                      setattendence({
                        ...attendence,
                        date_from_atten: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="info-div-item">
                  <label>Date to</label>
                  <input
                    type="date"
                    id="date_to_atten"
                    onChange={(e) => {
                      setattendence({
                        ...attendence,
                        date_to_atten: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="time-div">
                <div className="info-div-item">
                  <label>Time from</label>
                  <input
                    type="time"
                    id="time_from_atten"
                    onChange={(e) => {
                      setattendence({
                        ...attendence,
                        time_from_atten: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="info-div-item">
                  <label>Time to</label>
                  <input
                    type="time"
                    id="time_to_atten"
                    onChange={(e) => {
                      setattendence({
                        ...attendence,
                        time_to_atten: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="info-div-item">
                <label>Training Venue</label>
                <select
                  className="training-venue"
                  name="training-venue"
                  id="training_venue_atten"
                  onChange={(e) => {
                    setattendence({
                      ...attendence,
                      training_venue_atten: e.target.value,
                    });
                  }}
                >
                  <option>-- Select Venue --</option>
                  {details.map((item) => (
                          <option key={item.venue_name}>
                            {item.venue_name}
                          </option>
                        ))}
                </select>
              </div>

    <div className="attendance-container">
      <div className="info-div-item">
        <label>Trainer</label>
        <select
          className="trainer"
          name="trainer"
          id="trainer"
          onChange={getTrainer}
        >
          <option>-- Select Trainer --</option>
          <option>If Internal</option>
          <option>If External</option>
        </select>
      </div>
      
      <div
        className="info-div-item trainer-div"
        id="employee-div"
      >
      <div style={{display:"flex"}}>
        <div className="input-group">
          <label>Trainer Employee Id</label>
          <input 
            type="text" 
            id="trainer_emp_id" 
            placeholder="Trainer employee Id" 
            onChange={(e) => {
              setattendence({
                ...attendence,
                trainer_emp_id: e.target.value,
              });
            }} 
          />
        </div>
        
        <div className="input-group">
          <label style={{display:"block"}}>Employee's Id</label>
          <div className="employee-selection">
            <Select
              options={options}
              value={selectedOption}
              id="employee_id_atten"
              onChange={(selected) => setSelectedOption(selected)}
              placeholder="Search Employee"
              isSearchable
              styles={{
                container: (base) => ({
                  ...base,
                  flex: 1,
                }),
              }}
            />
            <button className="add-btn" onClick={handleAddEmployee}>
              Add
            </button>
          </div>
        </div>
      </div>

        <div className="file-upload-section">
          <label>Upload bulk employee</label>
          <FileUpload />
        </div>

        <div className="all-added-employee-list">
          <h5>All added employee's list</h5>

          <div className="employee-lists">
            <table id="employeeTable" className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Date of join</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedEmployees.map((emp, index) => (
                  <tr key={emp.value}>
                    <td>{index + 1}</td>
                    <td>{emp.details.employee_name}</td>
                    <td>{emp.details.employee_id}</td>
                    <td>{emp.details.date_of_join}</td>
                    <td>
                      <button className="remove-btn" onClick={() => handleRemoveEmployee(emp.value)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div
        className="info-div-item trainer-div"
        id="service-provider"
      >
        <label>Service Provider Name</label>
        <select
          className="service-provider"
          name="service-provider"
          id="service_provider"
          onChange={(e) => {
            setattendence({
              ...attendence,
              service_provider: e.target.value,
            });
          }}
        >
          <option>-- Select Service Provider --</option>
          <option>Provider 1</option>
          <option>Provider 2</option>
          <option>Provider 3</option>
          <option>Provider 4</option>
        </select>
      </div>
    </div>
            </div>

            <div className="upload-btn" style={{ width: "5rem" }}>
              <button
                className="form-control form-control-sm"
                style={{
                  backgroundColor: "#7A1CAC",
                  color: "#ffffff",
                  height: "3rem",
                }}
                onClick={attendence_details_infoget}
              >
                Upload
              </button>
            </div>

            <div className="assign-assessment">
              <div className="assessment-title">
                <div className="select-wrapper"> 
                                  <CustomSelect
                                      label="Select Assessment"
                                      options={filteredAssessments}
                                      value={selectedAssessment}
                                      onSelect={setSelectedAssessment}
                                      searchQuery={searchAssessmentQuery}
                                      onSearchChange={handleAssessmentSearch}
                                      placeholder="Select a Assessment"
                                      renderOption={(assessment) => `${assessment.assessment_title} (${assessment.code})`}
                                  />

                                  {selectedAssessment && (
                                      <div className="details-card">
                                      <h5 className="details-title">Selected Assessment Details</h5>
                                      <p className="details-text">Title: {selectedAssessment.assessment_title}</p>
                                      <p className="details-text">Code: {selectedAssessment.code}</p>
                                      {/* <p className="details-text">Valid Till: {new Date(selectedAssessment.validTill).toLocaleDateString()}</p> */}
                                      </div>
                                  )}
                </div> 

                <div class="assessment-settings">
                    <div>
                        <label>Complete the course by</label>
                        <input type="date"/>
                    </div> 
                    <div>
                        <label>Attempt limitation</label>
                        <input type="number" placeholder="Enter limitation" />
                    </div>
                    <div>
                        <label>Set passing score</label>
                        <input type="number" placeholder="Enter passing score"/>
                    </div>     
                </div> 
                <button className="assign-assessment-btn" onClick={assignAssessmentToEmployees}>Assign Assessment</button>     
              </div>
            </div>
          </div>


        </section>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Attendence;



{/* <style>
{`
.custom-select-container {
    position: relative;
    width: 100%;
    margin-bottom: 1rem;
}

.select-input-container {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background-color: white;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 42px;
}

.select-input-container:hover {
    border-color: #cbd5e0;
}

.selected-value {
    color: #1a202c;
    font-size: 0.875rem;
}

.arrow {
    font-size: 0.75rem;
    transition: transform 0.2s;
    color: #718096;
}

.arrow.open {
    transform: rotate(180deg);
}

.dropdown-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: 0.25rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
    max-height: 300px;
}

.search-container {
    padding: 0.5rem;
    border-bottom: 1px solid #e2e8f0;
}

.dropdown-search {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    font-size: 0.875rem;
}

.dropdown-search:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.options-container {
    max-height: 250px;
    overflow-y: auto;
}

.options-container::-webkit-scrollbar {
    width: 6px;
}

.options-container::-webkit-scrollbar-track {
    background: #f7fafc;
}

.options-container::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 3px;
}

.option {
    padding: 0.75rem;
    cursor: pointer;
    font-size: 0.875rem;
    color: #1a202c;
}

.option:hover {
    background-color: #f7fafc;
}

.no-options {
    padding: 0.75rem;
    color: #718096;
    text-align: center;
    font-size: 0.875rem;
}

.details-card {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
}
`}
</style> */}


<style>
{`
  body {
    background-color: rgba(46, 7, 63, 0.1);
    padding: 20px;
  }

  /* Attendance Component Styles */

/* Container styling */
.attendance-container {
width: 100%;
margin: 0 auto;
padding: 20px;
background-color: #f9fafb;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Info div item styling */
.info-div-item {
// margin-bottom: 1.5rem;
}

.info-div-item label {
display: block;
margin-bottom: 8px;
font-weight: 600;
color: #374151;
font-size: 0.9rem;
}

/* Select dropdown styling */
select.trainer, select.service-provider {
width: 100%;
padding: 12px;
border: 1px solid #d1d5db;
border-radius: 6px;
background-color: white;
font-size: 0.95rem;
transition: border-color 0.2s, box-shadow 0.2s;
appearance: none;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
background-repeat: no-repeat;
background-position: right 12px center;
background-size: 16px;
}

select.trainer:focus, select.service-provider:focus {
outline: none;
border-color: #3b82f6;
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Trainer div styling (default hidden) */
.trainer-div {
background-color: white;
padding: 20px;
border-radius: 6px;
border: 1px solid #e5e7eb;
margin-top: 10px;
transition: all 0.3s ease;
opacity: 0;
max-height: 0;
overflow: hidden;
}

/* Visible trainer div */
.trainer-div.visible {
opacity: 1;
max-height: 2000px; /* Arbitrary large value */
margin-bottom: 20px;
}

/* Input styling */
.trainer-div input[type="text"] {
width: 100%;
padding: 10px 12px;
border: 1px solid #d1d5db;
border-radius: 6px;
font-size: 0.95rem;
transition: border-color 0.2s, box-shadow 0.2s;
}

.trainer-div input[type="text"]:focus {
outline: none;
border-color: #3b82f6;
box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* Employee selection area */
.employee-selection {
display: flex;
align-items: center;
gap: 10px;
margin-bottom: 15px;
}

/* Add button styling */
button.add-btn {
padding: 10px 16px;
background-color: #3b82f6;
color: white;
border: none;
border-radius: 6px;
font-weight: 500;
cursor: pointer;
transition: background-color 0.2s;
}

button.add-btn:hover {
background-color: #2563eb;
}

/* Employee list styling */
.all-added-employee-list {
margin-top: 25px;
}

.all-added-employee-list h5 {
font-size: 1rem;
color: #111827;
margin-bottom: 1rem;
font-weight: 600;
}

.employee-lists {
border-radius: 6px;
overflow: hidden;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

table#employeeTable {
width: 100%;
border-collapse: collapse;
background-color: white;
}

table#employeeTable th {
background-color: #f3f4f6;
padding: 12px 16px;
text-align: left;
font-weight: 600;
color: #374151;
border-bottom: 2px solid #e5e7eb;
}

table#employeeTable td {
padding: 12px 16px;
border-bottom: 1px solid #e5e7eb;
color: #4b5563;
}

table#employeeTable tr:last-child td {
border-bottom: none;
}

table#employeeTable tr:hover {
background-color: #f9fafb;
}

/* Remove button styling */
button.remove-btn {
padding: 6px 12px;
background-color: #ef4444;
color: white;
border: none;
border-radius: 4px;
font-size: 0.85rem;
cursor: pointer;
transition: background-color 0.2s;
}

button.remove-btn:hover {
background-color: #dc2626;
}

/* File upload area */
.file-upload {
margin-bottom: 20px;
border: 2px dashed #d1d5db;
padding: 20px;
border-radius: 6px;
text-align: center;
cursor: pointer;
transition: border-color 0.2s;
}

.file-upload:hover {
border-color: #3b82f6;
}

.file-upload p {
color: #6b7280;
margin: 10px 0 0;
}

/* Transition animations */
@keyframes fadeIn {
from { opacity: 0; transform: translateY(-10px); }
to { opacity: 1; transform: translateY(0); }
}

.trainer-div.visible {
animation: fadeIn 0.3s ease forwards;
}
`}
</style>
