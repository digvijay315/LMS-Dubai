import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast } from 'react-toastify';
import Select from "react-select";

function TrainingRequestForm() {

    const [trainingRequest, setTrainingRequest] = useState({
        request_raised_by: "", project: "", training_category: "", 
        training_title: "", budget_code: "", target_date: "", employees_ids: [], totalEmployee: "",
    });

    const saveTrainingRequestdata = async () => {
        try {
            // Include employee IDs in the trainingRequest state
            const resp = await axios.post(`${base_url}/training_request_form`, trainingRequest);
            if (resp.status === 200) {
                toast.success('Training request data are saved', { autoClose: 2000 });
                clearForm();
                setSelectedEmployees([]);
                // setTrainingRequest({
                //     request_raised_by: "", project: "", training_category: "", 
                //     training_title: "", budget_code: "", target_date: "", employees_ids: []
                // });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const [inputValue, setInputValue] = useState("");
    // const [employeeIds, setEmployeeIds] = useState([]);
     const [showApprovalMessage, setShowApprovalMessage] = useState(false);

    // const handleKeyDown = (e) => {
    //     if (e.key === "Enter" || e.key === ",") {
    //         e.preventDefault();
    //         if (inputValue.trim()) {
    //             const updatedIds = [...employeeIds, inputValue.trim()];
    //             setEmployeeIds(updatedIds);
    //             // setTrainingRequest({ ...trainingRequest, employees_ids: updatedIds }); // Update the state with employee IDs
    //             setInputValue(""); // Clear the input field
    //         }
    //     }
    // };

    // const handleDeleteEmployee = (indexToDelete) => {
    //     const updatedIds = employeeIds.filter((_, index) => index !== indexToDelete);
    //     setEmployeeIds(updatedIds);
    //     setTrainingRequest({ ...trainingRequest, employees_ids: updatedIds }); // Update the state after deletion
    // };

     // Function to clear the form fields
     const clearForm = () => {
        setTrainingRequest({
            request_raised_by: "",
            employees_ids: [],
            project: "",
            training_category: "",
            training_title: "",
            budget_code: "",
            target_date: "",
        });
        // setEmployeeIds([]); // Clear employee IDs
        // setInputValue("");  // Clear the input field for employee ID
        setShowApprovalMessage(false);
    };

    const handleBudgetCodeChange = (e) => {
        const selectedBudgetCode = e.target.value;
        setTrainingRequest({ ...trainingRequest, budget_code: selectedBudgetCode });

        // Show the approval message if "Not Budgeted" is selected
        if (selectedBudgetCode === "Not budgeted") {
            setShowApprovalMessage(true);
        } else {
            setShowApprovalMessage(false);
        }
    };


    // const [options, setOptions] = useState([]);
    // const fetchOptions = async () => {
    //   try {
    //     const response = await axios.get(`${base_url}/employee_details_get`);
    //     setOptions(response.data.employee);
    //     console.log(options);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };

    useEffect(() => {
        fetchOptions();
    }, []);

    // Get Employee Id's
    const [employee, setemployee] = useState([]);
    function EmployeeList(event) {
        const selectedEmployee = JSON.parse(event.target.value);
        setemployee([...employee,selectedEmployee]);
        console.log(selectedEmployee); // Logs the full object
        const employee_lenght = employee.length+1;
        setTrainingRequest({...trainingRequest, employees_ids:[...employee, selectedEmployee], totalEmployee: employee_lenght}); 
        // setTrainingRequest({...trainingRequest, totalEmployee: employee_lenght});
        // console.log(employee_lenght);
    }

    function DeleteEmployee(item) {
        const updatedEmployees = employee.filter((item1) => item1._id !== item._id);
        setemployee(updatedEmployees); // Update the state with the new array
    }

    console.log(trainingRequest.totalEmployee);

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

            // Add selected employee to the list
            const handleAddEmployee = (event) => {
                if (selectedOption) {
                  const employeeExists = selectedEmployees.some(
                    (emp) => emp.value === selectedOption.value
                  );
                  if (!employeeExists) {
                    setSelectedEmployees([...selectedEmployees, selectedOption]);
                    setTrainingRequest({
                          ...trainingRequest,
                          employees_ids:[...selectedEmployees,selectedOption] ,
                        });
                  }
                }
              };
        
              // Remove employee from the list
              const handleRemoveEmployee = (id) => {
                setSelectedEmployees(selectedEmployees.filter((emp) => emp.value !== id));
              };


    return (
        <div>
            <style>
                {`
                body {
                    background-color: rgba(46, 7, 63, 0.1);
                    padding: 20px;
                }
                .create-training-budget {
                    background-color: #ffffff;
                    padding: 1.5rem;
                    border-radius: 10px;
                }
                .title-text {
                    background-color: #2E073F;
                    color: #ffffff;
                    height: 8rem;
                    padding: 2rem;
                    border-top-right-radius: 1rem;
                    border-top-left-radius: 1rem;
                }
                .budget-code-div {
                    border: 1px solid rgba(0,0,0,0.5);
                    padding: 1rem;
                    border-radius: 8px;
                }
                .create-btn {
                    background-color: #7A1CAC;
                    width: 6rem;
                    height: 3rem;
                }
                .create-btn:hover {
                    background-color: #2E073F;
                }
                    .raised-by-div{
                    border: 2px solid rgba(0,0,0,0.2);
                    width: 90%;
                    margin: 2rem auto;
                    border-radius: 10px;
                    padding: 2rem;
                    }
                .employee-info-raised-by {
                    display: flex;
                    justify-content: space-between;
                    // width: 90%;
                    // margin: 2rem auto;
                    // border: 2px solid rgba(0,0,0,0.2);
                }
                .employee-info-raised-by .info-div-item {
                    width: 48%;
                }
                    .added-employee-div{
                    margin-top: 2rem;
                    }
                .add-btn-div {
                    padding-top: 1.5rem;
                }
                .add-btn-div button {
                    height: 2.5rem;
                }
                .training-details {
                    border: 2px solid rgba(0,0,0,0.2);
                    padding: 2rem;
                    width: 90%;
                    margin: 2rem auto;
                    border-radius: 10px;
                }
                .training-details-data {
                    display: grid;
                    grid-template-columns: auto auto;
                    row-gap: 1.5rem;
                    column-gap: 1.5rem;
                }
                .add-btn-div button {
                    background-color: #7A1CAC;
                }
                .add-btn-div button:hover {
                    background-color: #2E073F;
                }
                .submit-btn-div button {
                    background-color: #7A1CAC;
                    margin-top: 2rem;
                    height: 2.5rem;
                    width: 6rem;
                }
                .submit-btn-div button:hover {
                    background-color: #2E073F;
                }
                .employee-id-list {
                    list-style-type: none;
                    padding: 0;
                    margin-top: 1rem;
                }
                .employee-id-list li {
                    padding: 0.5rem;
                    border-bottom: 1px solid #ddd;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .employee-id-list button {
                    background-color: red;
                    color: white;
                    border: none;
                    padding: 0.3rem 0.5rem;
                    cursor: pointer;
                    border-radius: 4px;
                }
                .employee-id-list button:hover {
                    background-color: darkred;
                }
                `}
            </style>


            <div>
                <Sidebar />

                <section className="main-content-section">
                    <Header />

                    <div className='create-training-budget'>
                        <div className="title-text">
                            <h2>Training Request <span style={{ fontWeight: "300" }}>Form</span></h2>
                        </div>

                        <div className='create-cat-form'>
                            <div className='cat-data'>
                                <div className='raised-by-div'>
                                <div className='employee-info-raised-by'>
                                    <div className="info-div-item">
                                        <label>Request raised by</label>
                                        <input
                                            type='text'
                                            id='request_raised_by'
                                            placeholder='Enter Employee ID'
                                            value={trainingRequest.request_raised_by}
                                            onChange={(e) => setTrainingRequest({ ...trainingRequest, request_raised_by: e.target.value })}
                                        />
                                    </div>

                                    <div className="info-div-item">
                                        <label>Add Employees</label>
                                         <div className="info-div-item" style={{display:"flex", alignItems: "center", gap: "10px"}}>
                                                <Select
                                                options={options}
                                                value={selectedOption}
                                                id='employees_ids'
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
                                                <button onClick={handleAddEmployee} style={{ padding: "8px 12px" }}>
                                                Add
                                                </button>
                                            </div>
                                        {/* <input
                                            type='text'
                                            id='employees_ids'
                                            placeholder='Enter Employees ID'
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            // onKeyDown={handleKeyDown}
                                        /> */}
                                        {/* <ul className="employee-id-list">
                                            {employeeIds.map((id, index) => (
                                                <li key={index}>
                                                    {id}
                                                    <button onClick={() => handleDeleteEmployee(index)}
                                                        style={{ borderRadius: "50%", padding: "5px 10px" }}>
                                                        <i className="fa-regular fa-trash-can"></i>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul> */}
                                    </div>
                                </div>

                                    <div className='added-employee-div'>
                                        <h6>Added employee's</h6>

                                        <div className='employee-list'>
                                            <table id="employeeTable" className="table table-striped table-bordered" style={{ fontSize: '14px' }}>
                                                <thead>
                                                    <tr>
                                                    <th>Sr. No.</th>
                                                    <th>Employee Name</th>
                                                    <th>Employee ID</th>
                                                    <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedEmployees.map((emp, index) => (
                                                    <tr key={emp.value}>
                                                        <td>{index + 1}</td>
                                                        <td>{emp.details.employee_name}</td>
                                                        <td>{emp.details.employee_id}</td>
                                                        <td>
                                                        <button onClick={() => handleRemoveEmployee(emp.value)}>
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

                                {/* Training Details */}
                                <div className='training-details'>
                                    <h5>Training Details</h5>

                                    <div className='training-details-data'>
                                        <div className="info-div-item">
                                            <label>Project</label>
                                            <select
                                                id='project'
                                                value={trainingRequest.project}
                                                onChange={(e) => setTrainingRequest({ ...trainingRequest, project: e.target.value })}>
                                                <option>--Select project--</option>
                                                <option>Project - 1</option>
                                                <option>Project - 2</option>
                                                <option>Project - 3</option>
                                            </select>
                                        </div>

                                        <div className="info-div-item">
                                            <label>Training Category</label>
                                            <select
                                                id='training_category'
                                                value={trainingRequest.training_category}
                                                onChange={(e) => setTrainingRequest({ ...trainingRequest, training_category: e.target.value })}>
                                                <option>--Select Category--</option>
                                                <option>HSE - Mandatory</option>
                                                <option>Contract Requirement</option>
                                                <option>Client Requirement</option>
                                                <option>Self Development</option>
                                                <option>Certification</option>
                                            </select>
                                        </div>

                                        <div className="info-div-item">
                                            <label>Training Title</label>
                                            <select
                                                id='training_title'
                                                value={trainingRequest.training_title}
                                                onChange={(e) => setTrainingRequest({ ...trainingRequest, training_title: e.target.value })}>
                                                <option>--Select title--</option>
                                                <option>Title - 1</option>
                                                <option>Title - 2</option>
                                                <option>Title - 3</option>
                                            </select>
                                        </div>

                                        <div className="info-div-item">
                                            <label>Budget Code</label>
                                            <select
                                                id='budget_code'
                                                value={trainingRequest.budget_code}
                                                onChange={handleBudgetCodeChange}>
                                                <option>--Select Budget Code--</option>
                                                <option>Not budgeted</option>
                                                <option>Budget Code - 1</option>
                                                <option>Budget Code - 2</option>
                                                <option>Budget Code - 3</option>
                                            </select>

                                            {/* Conditionally render the message based on budget code selection */}
                                            {showApprovalMessage && (
                                                <p style={{ color: 'red', marginTop: '10px' }}>
                                                    You need approval from L$D and Project Manager
                                                </p>
                                            )}
                                        </div>

                                        <div className="info-div-item">
                                            <label>Target Date</label>
                                            <input
                                                type='date'
                                                id='target_date'
                                                value={trainingRequest.target_date}
                                                onChange={(e) => setTrainingRequest({ ...trainingRequest, target_date: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className='submit-btn-div'>
                                        <button onClick={saveTrainingRequestdata}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default TrainingRequestForm;
