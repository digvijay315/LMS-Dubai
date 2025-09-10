import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { base_url } from "./Utils/base_url";
import Select from "react-select";

function ConductINA() {
  const [inaTitles, setInaTitles] = useState([]); // Stores all OJA titles
  const [selectedIna, setselectedIna] = useState([]); // Stores selected OJA details
  // const [finalScore, setFinalScore] = useState(null); // Stores the final overall score
  const [ratingRange, setratingRange] = useState([]);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch all OJA titles when the component mounts
  useEffect(() => {
    const fetchInaTitles = async () => {
      try {
        const response = await axios.get(`${base_url}/get_ina_dataInfo`); 
        setInaTitles(response.data.create_ina); // Ensure correct response structure
      } catch (error) {
        console.error("Error fetching OJA titles:", error);
      }
    };

    fetchInaTitles();
  }, []);

  // Handle OJA selection and fetch its details
  const handleInaSelect = async (e) => {
    const inaId = e.target.value; // Get selected OJA ID
    if (!inaId) return;

    try {
      const response = await axios.get(`${base_url}/get_ina_dataById/${inaId}`); 
      console.log(response);
      
      setselectedIna(response.data.create_ina); // Save selected OJA details in state
      console.log(selectedIna);
      await fetchAssignedEmployees(inaId); 

      if (response.data.create_ina.rating_range_ina === "1 -- 5") {
        setratingRange([1, 2, 3, 4, 5]);
      } else if (response.data.create_ina.rating_range_ina === "1 -- 10") {
        setratingRange([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      } else {
        setratingRange([]); // Clear the range if it's not valid
      }
      
    } catch (error) {
      console.error("Error fetching OJA details:", error);
    }
  };


  // Fetch assigned employees for the selected OJA
  const fetchAssignedEmployees = async (inaId) => {
    try {
      const response = await axios.get(`${base_url}/get_assigned_employeeINA/${inaId}`);
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



  // Handle rating change for each activity description
  const handleRatingChange = (activityIndex, contentIndex, newRating) => {
    const updatedIna = { ...selectedIna };
    updatedIna.activities[activityIndex].content[contentIndex].rating = newRating;
    setselectedIna(updatedIna); // Update the selected OJA with the new rating
  };

  // Function to calculate the average rating of each activity
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return "N/A";
    const sum = ratings.reduce((total, rating) => total + Number(rating), 0);
    const avg = sum / ratings.length;
    const percentage = (avg / ratingRange.length) * 100; // Assuming rating is out of 5
    return `${percentage.toFixed(2)}%`;
  };

  // Function to calculate the final overall score
  const calculateFinalScore = () => {
    // Check if selectedOja or its activities are undefined/null
    if (!selectedIna || !selectedIna.activities || selectedIna.activities.length === 0) {
      return "N/A";
    }
  
    // Safely access nested properties using flatMap and filter
    const allRatings = selectedIna.activities.flatMap((activity) =>
      activity.content?.map((content) => content.rating) || [] // Ensure content exists or return an empty array
    ).filter((rating) => rating !== undefined); // Remove undefined ratings
  
    // Check if there are no valid ratings
    if (allRatings.length === 0) {
      return "N/A";
    }
  
    // Safely calculate sum and average
    const sum = allRatings.reduce((total, rating) => total + Number(rating), 0);
    const avg = sum / allRatings.length;
  
    // Check if ratingRange exists and has a length, otherwise default to 1 to avoid division by zero
    const rangeLength = ratingRange?.length || 1;
    const percentage = (avg / rangeLength) * 100;
  
    return `${percentage.toFixed(2)}%`;
  };

  // Handle form submission and save data to the database
  // const handleSubmit = async () => {
  //   try {
  //     const updatedIna = { ...selectedIna, finalScore: calculateFinalScore() };
  //     const response = await axios.put(`${base_url}/update_ina_data/${selectedIna._id}`, updatedIna);
  //     toast.success('INA updated successfully');
  //   } catch (error) {
  //     console.error("Error updating INA:", error);
  //     toast.error('Failed to update INA');
  //   }
  // };


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

  // Add selected employee to the table
  const handleAddEmployee = () => {
    if (selectedEmployees.length >= 1) {
      setErrorMessage("You can add only one employee.");
      return;
    }

    if (selectedOption) {
      setSelectedEmployees([selectedOption]); // Replace previous employee
      setErrorMessage(""); // Clear any previous error messages
    }
  };

     // Remove employee from the table
  const handleRemoveEmployee = () => {
    setSelectedEmployees([]);
    setErrorMessage(""); // Clear any error messages
  };

  const handleSubmit = async () => {
    // Format activities to include the overall score
    const formattedActivities = selectedIna.activities.map((activity) => {
      // Calculate the overall score for this activity
      const totalScore = activity.content.reduce((sum, content) => sum + content.rating, 0);
      const activityScore = activity.content.length > 0 ? totalScore / activity.content.length : 0; // Average score
  
      return {
        ...activity,
        overallScore: activityScore, // Add the calculated overall score
      };
    });
  
    // Calculate the final overall score for all activities
    const finalOverallScore =
      formattedActivities.length > 0
        ? formattedActivities.reduce((sum, activity) => sum + activity.overallScore, 0) / formattedActivities.length
        : 0;
  
    // Schedule details
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
      const response = await axios.post(`${base_url}/check_employee_forINA`, {
        ina_code: selectedIna.ina_code,
        employees: selectedEmployees.map((emp) => emp.details.employee_id),
      });
  
      if (response.data.alreadyAssigned) {
        toast.error('This employees are already assigned to this INA.');
        return;
      }
  
      // Proceed to save the OJA assignment
      await axios.post(`${base_url}/add_employee_forINA`, {
        ina_title: selectedIna.ina_title,
        ina_code: selectedIna.ina_code,
        employees: selectedEmployees.map((emp) => ({
          employeeId: emp.details.employee_id,
          employeeName: emp.details.employee_name,
        })),
        activities: formattedActivities,
        schedule,
        finalOverallScore, // Include the final overall score
      });
  
      toast.success('INA assigned successfully!');
  
      // Auto-clear all fields after successful submission
      setselectedIna(null); // Clear selected OJA
      setSelectedEmployees([]); // Clear selected employees
      document.getElementById('date_from_atten').value = '';
      document.getElementById('date_to_atten').value = '';
      document.getElementById('time_from_atten').value = '';
      document.getElementById('time_to_atten').value = '';
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
        width: 90%;
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
        .rating-label{
        font-weight: 600;
        opacity: 1;
        }
        .finalscore-div{
        border: 1px solid rgba(0,0,0,0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        border-radius: 10px;
        box-shadow: 4px 4px 8px rgba(0,0,0,0.2);
        }
        .finalscore-div button{
         padding: 8px 1.2rem;
          border-radius: 5px;
        background-color: #7A1CAC;
        }
        .finalscore-div button:hover{
        background-color: #2E073F;
        }
        .add-attendies, .selected-employee{
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
        `}
      </style>
      <div className="conducting-oja">
        <div className="title-div-two">
          <h2>
            Conduct <span style={{ fontWeight: "300" }}>INA</span>
          </h2>
        </div>

        <div className="oja-info-div">
          <div className="info-div-item">
            <label>Select INA Title</label>
            <select onChange={handleInaSelect}>
              <option value="">--Select INA--</option>
              {inaTitles.map((ina) => (
                <option key={ina._id} value={ina._id}>
                  {ina.ina_title}
                </option>
              ))}
            </select>
          </div>

          {selectedIna && (
            <>
              <div className="info-div-item ojt-code-div">
                <label>INA Code</label>
                <p>{selectedIna.ina_code}</p>
              </div>

              <div className='add-attendies'>
              <h5>Add Employee</h5>
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
                <button onClick={handleAddEmployee} style={{ padding: "8px 12px" }}>
                  Add
                </button>
              </div>
      
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

             {/* Display error message */}
            {errorMessage && (
              <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
            )}

            <div className="selected-employee">
              <h4>Selected Employees</h4>
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

              {selectedIna && selectedIna.activities ?
              selectedIna.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="activity-div">
                  <div className="info-div-item">
                    <h4>Activity {activityIndex + 1}</h4>
                  </div>

                  <div className="info-div-item">
                    <label>Title</label>
                    <p>{activity.activity_ina_title}</p>
                  </div>

                  <div className="info-div-item">
                    <label>Content</label>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Sr No.</th>
                          <th>Questions</th>
                          <th>Rating</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activity.content.map((content, contentIndex) => (
                          <tr key={contentIndex}>
                            <td>{contentIndex+1}</td>
                            <td>{content.description}</td>
                            <td>
                              <select
                                value={content.rating || ""}
                                onChange={(e) =>
                                  handleRatingChange(activityIndex, contentIndex, e.target.value)
                                }
                              >
                                <option value="">--Select Rating--</option>
                                {ratingRange.map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating}
                                  </option>
                                ))}
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="info-div-item">
                    <label className="rating-label">Overall Score for this Activity</label>
                    <p>
                      {calculateAverageRating(
                        activity.content.map((c) => c.rating)
                      )}
                    </p>
                  </div>
                </div>
              )):(
                <p>Select an INA to view activities.</p>
              )}

                <div className="finalscore-div">
              <div className="info-div-item">
                <label className="rating-label">Final Overall Score</label>
                <p>{calculateFinalScore()}</p>
              </div>

              <button onClick={handleSubmit}>Submit</button>
              </div>
            </>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default ConductINA;
