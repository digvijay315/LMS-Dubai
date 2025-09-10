import React, { useState } from "react";

function EmployeeIdsInput({ setattendence }) {
  const [inputValue, setInputValue] = useState("");
  const [employeeIds, setEmployeeIds] = useState([]);

  const handleChange = (e) => {
    setInputValue(e.target.value); // Keep track of the current input value
    // Also update your attendance state with the current value
    setattendence((prevAttendance) => ({
      ...prevAttendance,
      employee_id_atten: e.target.value,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        const updatedIds = [...employeeIds, inputValue.trim()];
        setEmployeeIds(updatedIds);
        setInputValue(""); // Clear the input field

        // Update attendance state with the list of employee IDs
        setattendence((prevAttendance) => ({
          ...prevAttendance,
          employee_id_atten: updatedIds.join(","), // Save IDs as a comma-separated string or however you need for the database
        }));
      }
    }
  };

  const removeId = (indexToRemove) => {
    const updatedIds = employeeIds.filter((_, index) => index !== indexToRemove);
    setEmployeeIds(updatedIds);
    setattendence((prevAttendance) => ({
      ...prevAttendance,
      employee_id_atten: updatedIds.join(","), // Update the state after removing
    }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter employee ID and press Enter"
        value={inputValue}
        onChange={handleChange} // Handle change for both input value and attendance state
        onKeyDown={handleKeyDown} // Handle the Enter or comma key
      />

      <div style={{ marginTop: "10px" }}>
        {employeeIds.map((id, index) => (
          <div key={index} style={{ display: "inline-block", margin: "5px" }}>
            <span style={{ padding: "5px", backgroundColor: "#e0e0e0", borderRadius: "5px" }}>
              {id}
              <button
                onClick={() => removeId(index)}
                style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
              >
                x
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeIdsInput;
