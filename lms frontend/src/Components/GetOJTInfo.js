// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import { toast } from 'react-toastify';
// import { ToastContainer } from 'react-toastify';
// import { base_url } from './Utils/base_url';

// const ConductOJT = () => {
//   const [ojtTitles, setOjtTitles] = useState([]);
//   const [selectedOjt, setSelectedOjt] = useState(null);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [checkStates, setCheckStates] = useState({});
//   const [message, setMessage] = useState('');
//   const [options, setOptions] = useState([]);
//   const [selectedOption, setSelectedOption] = useState(null);

//   // Fetch OJT titles
//   useEffect(() => {
//     const fetchOjtTitles = async () => {
//       try {
//         const response = await axios.get(`${base_url}/get_Ojt_info`);
//         setOjtTitles(response.data.create_ojt);
//       } catch (error) {
//         console.error('Error fetching OJT titles:', error);
//       }
//     };
//     fetchOjtTitles();
//   }, []);

//   // Handle OJT selection
//   const handleOjtSelect = async (e) => {
//     const ojtCode = e.target.value; // Updated to use ojtCode
//     if (!ojtCode) return;
  
//     try {
//       // Updated the API endpoint to use ojt_code instead of ojtId
//       const response = await axios.get(`${base_url}/get_ojts_byid/${ojtCode}`);
      
//       if (response.data?.create_ojt) {
//         setSelectedOjt(response.data.create_ojt); // Update state with fetched OJT details
        
//         // Initialize checkbox states based on fetched OJT data
//         initializeCheckStates(response.data.create_ojt);
        
//         // Fetch previously assigned employees using the updated parameter
//         await fetchAssignedEmployees(ojtCode); 
//       } else {
//         toast.error('Invalid OJT selection or data not found.');
//       }
//     } catch (error) {
//       console.error('Error fetching OJT details:', error);
//     }
//   };
  
  

//   // Initialize checkbox states
//   const initializeCheckStates = (ojt) => {
//     const newCheckStates = {};
//     ojt.activities.forEach((activity, activityIndex) => {
//       activity.content.forEach((content, contentIndex) => {
//         newCheckStates[`${activityIndex}-${contentIndex}`] = {
//           trainerChecked: false,
//           employeeChecked: false,
//         };
//       });
//     });
//     setCheckStates(newCheckStates);
//   };

//   // Fetch assigned employees for the selected OJT
//   const fetchAssignedEmployees = async (ojtCode) => {
//     try {
//       // Updated the URL to use ojt_code instead of ojtId
//       const response = await axios.get(`${base_url}/get_assigned_employees/${ojtCode}`);
      
//       if (response.data && response.data.employees) {
//         const formattedEmployees = response.data.employees.map((emp) => ({
//           value: emp.employee_id, // Updated to use employeeId for the value
//           label: `${emp.employee_id} - ${emp.employee_name}`, // Ensure formatting uses correct fields
//           details: emp, // Include all employee details
//         }));
        
//         // Set the formatted employees to the state
//         setSelectedEmployees(formattedEmployees);
//       } else {
//         console.warn('No employees found for the given OJT code.');
//         setSelectedEmployees([]); // Clear the state if no employees are found
//       }
//     } catch (error) {
//       console.error('Error fetching assigned employees:', error);
//       setSelectedEmployees([]); // Clear the state in case of an error
//     }
//   };
  
  

//   // Fetch employee options
//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const response = await axios.get(`${base_url}/employee_details_get`);
//         const formattedOptions = response.data.employee.map((emp) => ({
//           value: emp.employee_id,
//            label: `${emp.employeeId} - ${emp.employeeName}`,
//           details: emp,
//         }));
//         setOptions(formattedOptions);
//       } catch (error) {
//         console.error('Error fetching employee data:', error);
//       }
//     };
//     fetchOptions();
//   }, []);

//   // Add an employee
//   const handleAddEmployee = () => {
//     if (selectedOption) {
//       const alreadyExists = selectedEmployees.some((emp) => emp.value === selectedOption.value);
//       if (alreadyExists) {
//         toast.error('This employee is already assigned to this OJT!');
//         return;
//       }
//       setSelectedEmployees([...selectedEmployees, selectedOption]);
//       setMessage('');
//     }
//   };

//   // Handle checkbox change
//   const handleCheckboxChange = (activityIndex, contentIndex, type) => {
//     const key = `${activityIndex}-${contentIndex}`;
//     setCheckStates((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         [type]: !prev[key][type],
//       },
//     }));
//   };

//   // Submit data to the backend
//   const handleSubmit = async () => {
//     const formattedActivities = selectedOjt.activities.map((activity, activityIndex) => ({
//       ...activity,
//       content: activity.content.map((content, contentIndex) => ({
//         ...content,
//         trainerChecked: checkStates[`${activityIndex}-${contentIndex}`]?.trainerChecked || false,
//         employeeChecked: checkStates[`${activityIndex}-${contentIndex}`]?.employeeChecked || false,
//       })),
//     }));
  
//     // Collect schedule data
//     const schedule = {
//       dateFrom: document.getElementById('date_from_atten').value,
//       dateTo: document.getElementById('date_to_atten').value,
//       timeFrom: document.getElementById('time_from_atten').value,
//       timeTo: document.getElementById('time_to_atten').value,
//     };
  
//     // Validate schedule (optional: ensure no past dates or invalid time ranges)
//     const currentDateTime = new Date();
//     const scheduleDateFrom = new Date(`${schedule.dateFrom}T${schedule.timeFrom}`);
//     const scheduleDateTo = new Date(`${schedule.dateTo}T${schedule.timeTo}`);
  
//     if (
//       scheduleDateFrom < currentDateTime ||
//       scheduleDateTo < currentDateTime ||
//       scheduleDateFrom > scheduleDateTo
//     ) {
//       toast.error('Invalid schedule: Ensure the date/time range is valid and not in the past.');
//       return;
//     }
  
//     try {
//       await axios.post(`${base_url}/add_employee_forOJT`, {
//         ojt_title: selectedOjt.ojt_title,
//         ojt_code: selectedOjt.ojt_code,
//         employees: selectedEmployees.map((emp) => ({
//           employeeId: emp.details.employee_id,
//           employeeName: emp.details.employee_name,
//         })), // Include full employee details
//         activities: formattedActivities,
//         schedule, // Add schedule to the request body
//       });
//       toast.success('Data submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       toast.error('An error occurred while submitting data. Please try again.');
//     }
//   };
  
  

//   return (
//     <div>
//       <div className="ojt-select">
//         <label>Select OJT</label>
//         <select onChange={handleOjtSelect}>
//           <option value="">--Select OJT--</option>
//           {ojtTitles.map((ojt) => (
//             <option key={ojt._id} value={ojt._id}>
//               {ojt.ojt_title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedOjt && (
//         <div>
//           <h3>OJT Details</h3>
//           <p>OJT Code: {selectedOjt.ojt_code}</p>
//           <div>
//             <h5>Add Employees</h5>
//             <Select
//               options={options}
//               value={selectedOption}
//               onChange={(selected) => setSelectedOption(selected)}
//               placeholder="Search Employee"
//             />
//             <button onClick={handleAddEmployee}>Add</button>
//           </div>
//           <div className="date-div">
//                   <div className="info-div-item">
//                     <label>Date from</label>
//                     <input type="date" id="date_from_atten" />
//                   </div>
//                   <div className="info-div-item">
//                     <label>Date to</label>
//                     <input type="date" id="date_to_atten" />
//                   </div>
//                 </div>
                
//                 <div className="time-div">
//                   <div className="info-div-item">
//                     <label>Time from</label>
//                     <input type="time" id="time_from_atten" />
//                   </div>
//                   <div className="info-div-item">
//                     <label>Time to</label>
//                     <input type="time" id="time_to_atten" />
//                   </div>
//                 </div>  
//           <table>
//             <thead>
//               <tr>
//                 <th>Employee Name</th>
//                 <th>Employee ID</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {selectedEmployees.map((emp, index) => {
//                 const employeeName = emp.details?.employee_name || 'Unknown';
//                 const employeeId = emp.details?.employee_id || 'Unknown';
//                 return (
//                   <tr key={index}>
//                     <td>{employeeName}</td>
//                     <td>{employeeId}</td>
//                     <td>
//                       <button
//                         onClick={() =>
//                           setSelectedEmployees(selectedEmployees.filter((e) => e.value !== emp.value))
//                         }
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           <div>
//             {selectedOjt.activities.map((activity, activityIndex) => (
//               <div key={activityIndex}>
//                 <h4>{activity.activity_ojt_title}</h4>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Content</th>
//                       <th>Trainer Check</th>
//                       <th>Employee Check</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {activity.content.map((content, contentIndex) => (
//                       <tr key={contentIndex}>
//                         <td>{content.description}</td>
//                         <td>
//                           <input
//                             type="checkbox"
//                             checked={checkStates[`${activityIndex}-${contentIndex}`]?.trainerChecked || false}
//                             onChange={() => handleCheckboxChange(activityIndex, contentIndex, 'trainerChecked')}
//                           />
//                         </td>
//                         <td>
//                           <input
//                             type="checkbox"
//                             checked={checkStates[`${activityIndex}-${contentIndex}`]?.employeeChecked || false}
//                             onChange={() => handleCheckboxChange(activityIndex, contentIndex, 'employeeChecked')}
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ))}
//           </div>

//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//       )}
//       <ToastContainer/>
//     </div>
//   );
// };

// export default ConductOJT;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { base_url } from './Utils/base_url';

const ConductOJT = () => {
  const [ojtTitles, setOjtTitles] = useState([]);
  const [selectedOjt, setSelectedOjt] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [checkStates, setCheckStates] = useState({});
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch OJT titles
  useEffect(() => {
    const fetchOjtTitles = async () => {
      try {
        const response = await axios.get(`${base_url}/get_Ojt_info`);
        setOjtTitles(response.data.create_ojt);
      } catch (error) {
        console.error('Error fetching OJT titles:', error);
      }
    };
    fetchOjtTitles();
  }, []);

  // Handle OJT selection
  const handleOjtSelect = async (e) => {
    const ojtCode = e.target.value;
    if (!ojtCode) return;

    try {
      const response = await axios.get(`${base_url}/get_ojts_byid/${ojtCode}`);
      if (response.data?.create_ojt) {
        setSelectedOjt(response.data.create_ojt); // Update state with fetched OJT details
        initializeCheckStates(response.data.create_ojt); // Initialize checkbox states
        await fetchAssignedEmployees(ojtCode); // Fetch assigned employees
      } else {
        toast.error('Invalid OJT selection or data not found.');
      }
    } catch (error) {
      console.error('Error fetching OJT details:', error);
    }
  };

  // Initialize checkbox states
  const initializeCheckStates = (ojt) => {
    const newCheckStates = {};
    ojt.activities.forEach((activity, activityIndex) => {
      activity.content.forEach((content, contentIndex) => {
        newCheckStates[`${activityIndex}-${contentIndex}`] = {
          trainerChecked: false,
          employeeChecked: false,
        };
      });
    });
    setCheckStates(newCheckStates);
  };

  // Fetch assigned employees for the selected OJT
  const fetchAssignedEmployees = async (ojtCode) => {
    try {
      const response = await axios.get(`${base_url}/get_assigned_employees/${ojtCode}`);
      if (response.data && response.data.employees) {
        const formattedEmployees = response.data.employees.map((emp) => ({
          value: emp.employeeId,
          label: `${emp.employeeId} - ${emp.employeeName}`,
          details: emp,
        }));
        setSelectedEmployees(formattedEmployees);
      } else {
        setSelectedEmployees([]); // Clear the state if no employees are found
      }
    } catch (error) {
      console.error('Error fetching assigned employees:', error);
      setSelectedEmployees([]); // Clear the state in case of an error
    }
  };

  // Fetch employee options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${base_url}/employee_details_get`);
        const formattedOptions = response.data.employee.map((emp) => ({
          value: emp.employee_id,
          label: `${emp.employee_id} - ${emp.employee_name}`,
          details: emp,
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
    fetchOptions();
  }, []);

  // Add an employee to the selected OJT
  const handleAddEmployee = () => {
    if (selectedOption) {
      // Check if the employee is already assigned to the OJT
      const alreadyExists = selectedEmployees.some((emp) => emp.value === selectedOption.value);
      if (alreadyExists) {
        toast.error('This employee is already add in the table!');
        setMessage('This employee is already assigned to this OJT!');
        return;
      }

      // Add the employee to the selected employees list
      setSelectedEmployees([...selectedEmployees, selectedOption]);
      setMessage('');
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (activityIndex, contentIndex, type) => {
    const key = `${activityIndex}-${contentIndex}`;
    setCheckStates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: !prev[key][type],
      },
    }));
  };

  // Submit data to the backend
  const handleSubmit = async () => {
    const formattedActivities = selectedOjt.activities.map((activity, activityIndex) => ({
      ...activity,
      content: activity.content.map((content, contentIndex) => ({
        ...content,
        trainerChecked: checkStates[`${activityIndex}-${contentIndex}`]?.trainerChecked || false,
        employeeChecked: checkStates[`${activityIndex}-${contentIndex}`]?.employeeChecked || false,
      })),
    }));
  
    const schedule = {
      dateFrom: document.getElementById('date_from_atten').value,
      dateTo: document.getElementById('date_to_atten').value,
      timeFrom: document.getElementById('time_from_atten').value,
      timeTo: document.getElementById('time_to_atten').value,
    };
  
    const currentDate = new Date(); // Get the current date
    currentDate.setHours(0, 0, 0, 0); // Set to start of the day for comparison

    const scheduleDateFrom = new Date(schedule.dateFrom);
    const scheduleDateTo = new Date(schedule.dateTo);

    // Normalize the time of schedule dates to avoid time comparison issues
    scheduleDateFrom.setHours(0, 0, 0, 0);
    scheduleDateTo.setHours(0, 0, 0, 0);

    // Validate that schedule dates are only for today
    if (
      scheduleDateFrom.getTime() !== currentDate.getTime() || 
      scheduleDateTo.getTime() !== currentDate.getTime()
    ) {
      toast.error("Schedule dates must be set to today's date.");
      return;
    }

    // Validate that "From" date is earlier than or equal to the "To" date
    if (scheduleDateFrom > scheduleDateTo) {
      toast.error('Invalid schedule: Ensure the "From" date is earlier than or equal to the "To" date.');
      return;
    }
  
    try {
      // Check if employees are already assigned
      const response = await axios.post(`${base_url}/check_employee_assignment`, {
        ojt_code: selectedOjt.ojt_code,
        employees: selectedEmployees.map((emp) => emp.details.employee_id),
      });
  
      if (response.data.alreadyAssigned) {
        toast.error('Some employee already assigned to this OJT.');
        return;
      }
  
      // Proceed to save the OJT assignment
      await axios.post(`${base_url}/add_employee_forOJT`, {
        ojt_title: selectedOjt.ojt_title,
        ojt_code: selectedOjt.ojt_code,
        employees: selectedEmployees.map((emp) => ({
          employeeId: emp.details.employee_id,
          employeeName: emp.details.employee_name,
        })), // Ensure employeeId and employeeName are passed correctly
        activities: formattedActivities,
        schedule,
      });
      toast.success('OJT assigned successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('An error occurred while submitting data. Please try again.');
    }
  };

  return (
    <div>
      <style>
{`
.oja-info-div{
width: 100%;
margin: 0 auto;
}
.activity-div{
border: 1px solid rgba(0,0,0,0.2);
padding: 10px 2rem;
margin-bottom: 2rem;
border-radius: 10px;
box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
}
.table{
border: 1px solid #000;
}
.sbmt-btn button{
height: 2.5rem;
width: 7rem;
background-color: #7A1CAC;
}
.sbmt-btn button:hover{
background-color: #7a1cacc6;
}
.add-attendies, .all-added-employee-list{
border: 1px solid rgba(0,0,0,0.2);
padding: 1rem;
border-radius: 10px;
box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
margin-bottom: 2rem;
}
.ojt-code-div{
width: fit-content;
border: 1px solid rgba(0,0,0,0.2);
box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
padding: 1rem 2rem;
border-radius: 10px;
}
.add-employee{
display: grid;
grid-template-columns: auto auto;
column-gap: 1rem;
row-gap: 1rem;
}
.submit-button{
 padding: 8px 1.2rem;
  border-radius: 5px;
  background-color: #7A1CAC;
}
  .submit-button:hover{
  background-color: #2E073F;
  }
`}
</style>

<div className="oja-info-div">
      <div className="info-div-item">
        <label>Select OJT Title</label>
        <select onChange={handleOjtSelect}>
          <option value="">--Select OJT--</option>
          {ojtTitles.map((ojt) => (
            <option key={ojt._id} value={ojt._id}>
              {ojt.ojt_title}
            </option>
          ))}
        </select>
      </div>

      {selectedOjt && (
        <div>
          <h3>OJT Details</h3>
          <div className="info-div-item ojt-code-div">
          <label>OJT Code</label>
          <p>{selectedOjt.ojt_code}</p>
          </div>
          
          <div className='add-attendies'>
            <h5>Add Employees</h5>
            <div className="add-employee" style={{ fontSize: "14px" }}>
            <div className="info-div-item" style={{display:"flex", alignItems: "center", gap: "10px"}}>
            <Select
              options={options}
              value={selectedOption}
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
            <button onClick={handleAddEmployee}>Add</button>
            </div>
            {/* {message && <div style={{ color: "red", marginTop: "10px" }}>{message}</div>} */}
          
          <div className="date-div">
            <div className="info-div-item">
              <label>Date from</label>
              <input type="date" id="date_from_atten" />
            </div>
            <div className="info-div-item">
              <label>Date to</label>
              <input type="date" id="date_to_atten" />
            </div>
          </div>

          <div className="time-div">
            <div className="info-div-item">
              <label>Time from</label>
              <input type="time" id="time_from_atten" />
            </div>
            <div className="info-div-item">
              <label>Time to</label>
              <input type="time" id="time_to_atten" />
            </div>
          </div>
          </div>
          </div>

          {/* <table>
            <thead>
              <tr>
                <th>Sr. no.</th>
                <th>Employee Name</th>
                <th>Employee code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployees.map((employee, index) => (
                <tr key={employee.value}>
                  <td>{index+1}</td>
                  <td>{employee.label}</td>
                  <td>{employee}</td>
                </tr>
              ))}
            </tbody>
          </table> */}

          <div className="all-added-employee-list">
          <h5>Selected Employees</h5>
           <table id="employeeTable" className="table table-striped table-bordered" style={{ fontSize: '14px' }}>
            <thead>
              <tr>
                <th>Sr. no.</th>
               <th>Employee Name</th>
                <th>Employee ID</th>
               <th>Action</th>
             </tr>
            </thead>
            <tbody>
               {selectedEmployees.map((emp, index) => {
                const employeeName = emp.details?.employee_name || 'Unknown';
                const employeeId = emp.details?.employee_id || 'Unknown';
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{employeeName}</td>
                    <td>{employeeId}</td>
                    <td>
                      <button
                        onClick={() =>
                          setSelectedEmployees(selectedEmployees.filter((e) => e.value !== emp.value))
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> 

          </div>


          <div>
            {selectedOjt.activities.map((activity, activityIndex) => (
              <div key={activityIndex} className="activity-div">
                <div className="info-div-item">
                  <h4>Activity {activityIndex + 1}</h4>
                </div>

                {/* <h4>{activity.activity_ojt_title}</h4> */}
                <div className="info-div-item">
                  <label>Title</label>
                  <p>{activity.activity_ojt_title}</p>
                </div>

                <div className="info-div-item">
                <label>Content</label>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Sr. no.</th>
                      <th>Content</th>
                      <th>Trainer Check</th>
                      <th>Employee Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.content.map((content, contentIndex) => (
                      <tr key={contentIndex}>
                        <td>{contentIndex+1}</td>
                        <td>{content.description}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={checkStates[`${activityIndex}-${contentIndex}`]?.trainerChecked || false}
                            onChange={() => handleCheckboxChange(activityIndex, contentIndex, 'trainerChecked')}
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={checkStates[`${activityIndex}-${contentIndex}`]?.employeeChecked || false}
                            onChange={() => handleCheckboxChange(activityIndex, contentIndex, 'employeeChecked')}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            ))}
          </div>

          <button className='submit-button' onClick={handleSubmit}>Submit</button>
        </div>
      )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConductOJT;

