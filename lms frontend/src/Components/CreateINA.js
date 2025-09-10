import { useState } from "react";
import React from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { base_url } from "./Utils/base_url";

function CreateINA() {
  const [activities, setActivities] = useState([
    { title: "", addContent: { Srno: [], description: [] } },
  ]);

  const [inaTitle, setInaTitle] = useState("");
  const [inaCode, setInaCode] = useState("");
  const [inaRatingRange, setInaRatingRange] = useState("");

  const handleSelectChange = (e) => {
    setInaRatingRange(e.target.value);
  };


  // Function to handle adding a new activity div
  const handleAddActivity = () => {
    setActivities([
      ...activities,
      { title: "", addContent: { Srno: [], description: [] } },
    ]);
  };

  // Function to handle removing an activity div
  const handleRemoveActivity = (activityIndex) => {
    setActivities(activities.filter((_, index) => index !== activityIndex));
  };

  // Function to handle adding a new row for content inside an activity
  const add_Content = (activityIndex) => {
    const newActivities = [...activities];
    const currentActivity = newActivities[activityIndex];
    currentActivity.addContent.Srno.push(
      currentActivity.addContent.Srno.length + 1
    );
    currentActivity.addContent.description.push("");
    setActivities(newActivities);
  };

  // Function to handle title change for activities
  const handleTitleChange = (e, activityIndex) => {
    const newActivities = [...activities];
    newActivities[activityIndex].title = e.target.value;
    setActivities(newActivities);
  };

  // Function to handle description change for activities
  const handleDescriptionChange = (e, activityIndex, contentIndex) => {
    const newActivities = [...activities];
    newActivities[activityIndex].addContent.description[contentIndex] =
      e.target.value;
    setActivities(newActivities);
  };

  // Function to handle rating change for activities

  const handleRemoveDescription = (activityIndex, contentIndex) => {
    const newActivities = [...activities];
    const currentActivity = newActivities[activityIndex];

    // Remove the specific index for Srno, description, and rating
    currentActivity.addContent.Srno.splice(contentIndex, 1);
    currentActivity.addContent.description.splice(contentIndex, 1);

    // Re-assign Srno based on the new length
    currentActivity.addContent.Srno = currentActivity.addContent.Srno.map(
      (_, index) => index + 1
    );

    setActivities(newActivities);
  };

  // Function to handle form submission and save data to the database
  const handleSubmit = async () => {
    // if (inaRatingRange === '--Select Range--') {
    //   alert('Please select a valid rating range');
    //   return;
    // }
    const data = {
        ina_title: inaTitle,
        ina_code: inaCode,
        rating_range_ina: inaRatingRange,
        activities: activities.map((activity) => ({
          activity_ina_title: activity.title, // Changed 'title' to 'activity_oja_title'
          content: activity.addContent.Srno.map((srno, index) => ({
            srno,
            description: activity.addContent.description[index],
          })),
        })),
      };
      

    console.log("Data being sent:", data);

    try {
      // Get JWT token from localStorage or any other method
      const token = localStorage.getItem("token");

      // Send POST request to the API
      const response = await axios.post(
        `${base_url}/save_ina_data`, // Replace with your actual API endpoint
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the header
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("INA successfully created!", {autoClose: 2000});

        setInaTitle("");
        setInaCode("");
        setInaRatingRange("");
        setActivities([{ title: "", addContent: { Srno: [], description: [] } }]);
      } else {
        toast.error("Failed to create INA.", {autoClose: 2000});
      }
    } catch (error) {
        console.error("Error creating INA:", error.response?.data || error.message || error);
        toast.error("Failed to create INA. Please check console for details.", {autoClose: 2000});
    }
  };

  return (
    <div>
        <style>{`
        .create-oja-div{
        width: 90%;
        margin: 1rem auto;
        }
        .info-div-item{
        margin: 1rem 0;
        }
        `
        }</style>
      <div className="create-oja-form">
        <div className="title-div-two">
          <h2>
            Create <span style={{ fontWeight: "300" }}>INA</span>
          </h2>
        </div>
        <div className="create-oja-div">
          <div className="info-div-item">
            <label>INA Title</label>
            <input
              type="text"
              placeholder="Enter the INA title"
              id="ina_title"
              value={inaTitle}
              onChange={(e) => setInaTitle(e.target.value)}
            />
          </div>

          <div className="info-div-item">
            <label>INA Code</label>
            <input
              type="text"
              placeholder="INA code"
              id="ina_code"
              value={inaCode}
              onChange={(e) => setInaCode(e.target.value)}
            />
          </div>

          <div className="info-div-item">
            <label>Select Rating range</label>
            <select id="rating_range_ina" value={inaRatingRange} onChange={handleSelectChange}>
              <option>--Select Range--</option>
              <option>1 -- 5</option>
              <option>1 -- 10</option>
            </select>
          </div>  

          {activities.map((activity, activityIndex) => (
            <div
              key={activityIndex}
              className="add-activity-div"
              style={{ position: "relative" }}
            >
              <button
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "#ffffff",
                  color: "#000",
                  borderRadius: "50%",
                  border: "2px solid #000",
                  cursor: "pointer",
                  fontSize: "16px",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={() => handleRemoveActivity(activityIndex)}
              >
                <i class="fa-solid fa-xmark"></i>
              </button>

              <div className="info-div-item">
                <h4>Activity {activityIndex + 1}</h4>
              </div>

              <div className="info-div-item">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter activity title"
                  id="activity_ina_title"
                  value={activity.title}
                  onChange={(e) => handleTitleChange(e, activityIndex)}
                />
              </div>

              <div
                className="info-div-item"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="add-content-div" style={{ width: "86%" }}>
                  <label>Add Content</label>
                  <table
                    className="table table-striped table-bordered"
                    cellspacing="0"
                  >
                    <thead>
                      <tr>
                        <th>Sr no.</th>
                        <th>Questions</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.addContent.Srno.map((index, contentIndex) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>
                            <input
                              className="desc-input"
                              placeholder="Enter description"
                              id="description_oja"
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                              }}
                              value={
                                activity.addContent.description[contentIndex]
                              }
                              onChange={(e) =>
                                handleDescriptionChange(
                                  e,
                                  activityIndex,
                                  contentIndex
                                )
                              }
                            />
                          </td>
            
                          <td style={{ textAlign: "center" }}>
                          <button
                            className="desc-del-btn"
                            onClick={() => handleRemoveDescription(activityIndex, contentIndex)}
                            >
                            <i className="fa-regular fa-trash-can"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    id="add-desc"
                    onClick={() => add_Content(activityIndex)}
                  >
                    <i className="fa-solid fa-plus"></i> Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="info-div-item btn-div">
            <button id="add-activity-btn" onClick={handleAddActivity}>
              <i className="fa-solid fa-plus"></i> Add Activity
            </button>
            <button id="create-btn" onClick={handleSubmit}>
              Create INA
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateINA;
