


import React, { useEffect, useState } from "react";
import '../StyleCode/TrainingCalendar.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import this for toast styling
import { base_url } from "./Utils/base_url";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { Try } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import Sidebar1 from "./sidebar1";


function TrainingCalenderForm() {
  const navigate = useNavigate();
  
  // Default empty state for the event form
  const defaultEventState = {
    training_category: "",
    training_code: "",
    training_name: "",
    training_type: "",
    training_mode: "",
    trainer_name: "",
    description: "",
    region: [],
    project_title: "",
    job_title: [""],
    from_date: "",
    to_date: "",
    from_time: "",
    to_time: "",
    participents: "",
    participentsType: "",
    venue_name: "",
    venuetype: "",
    status: "Upcoming"
  };

  const[select_loading,setselect_loading]=useState("")
  //get training type

  const [trainingTypes, setTrainingTypes] = useState([]);

  const get_training_type=async()=>
  {
    try {
      setselect_loading("training-type")
      const params = new URLSearchParams();
      
            // Always include lookup_type
            params.append("lookup_type", "training_type");
      
            const resp = await axios.get(
              `${base_url}/api/lookup/LookupList?${params.toString()}`
            ); 
        
            
                  
      setTrainingTypes(resp.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setselect_loading("")
    }
  }
  
    //get training category

  const [trainingCategory, setTrainingCategory] = useState([]);

  const get_training_category=async()=>
  {
    try {
      setselect_loading("training-category")
      const params = new URLSearchParams();
      
            // Always include lookup_type
            params.append("lookup_type", "training_category");
      
            const resp = await axios.get(
              `${base_url}/api/lookup/LookupList?${params.toString()}`
            ); 
        
            
                  
      setTrainingCategory(resp.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setselect_loading("")
    }
  }

     //get training category

  const [trainingName, settrainingName] = useState([]);

  const get_training_name=async()=>
  {
    try {
      setselect_loading("training_name")
      const params = new URLSearchParams();
      
            // Always include lookup_type
            params.append("lookup_type", "training_name");
            params.append("parent_lookup_value", event.training_category);
      
            const resp = await axios.get(
              `${base_url}/api/lookup/LookupList?${params.toString()}`
            ); 
        
            
                  
      settrainingName(resp.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setselect_loading("")
    }
  }

    //get training category

  const [trainingCode, settrainingCode] = useState([]);

  const get_training_code=async()=>
  {
    try {
      setselect_loading("training_code")
      const params = new URLSearchParams();
      
            // Always include lookup_type
            params.append("lookup_type", "training_code");
            params.append("parent_lookup_value", event.training_name);
      
            const resp = await axios.get(
              `${base_url}/api/lookup/LookupList?${params.toString()}`
            ); 
        
            
                  
      settrainingCode(resp.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setselect_loading("")
    }
  }


     //get region

  const [region, setregion] = useState([]);

  const get_region=async()=>
  {
    try {
      setselect_loading("region")
      const params = new URLSearchParams();
      
            // Always include lookup_type
            params.append("lookup_type", "region");
      
            const resp = await axios.get(
              `${base_url}/api/lookup/LookupList?${params.toString()}`
            ); 
        
            
                  
      setregion(resp.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
    finally{
      setselect_loading("")
    }
  }

      //get project

  const [project, setproject] = useState([]);

 const get_project = async () => {
  try {
    setselect_loading("project");

    if (!Array.isArray(event.region) || event.region.length === 0) {
      setproject([]);
      return;
    }

    const requests = event.region.map((region) => {
      const params = new URLSearchParams();
      params.append("lookup_type", "project");
      params.append("parent_lookup_value", region);

      return axios.get(
        `${base_url}/api/lookup/LookupList?${params.toString()}`
      );
    });

    const responses = await Promise.all(requests);

    // merge all project data
    const allProjects = responses.flatMap(
      (resp) => resp.data.data || []
    );

    setproject(allProjects);

  } catch (error) {
    console.log(error);
  } finally {
    setselect_loading("");
  }
};

  

  // Set initial state
  const [event, setevent] = useState(defaultEventState);

  const event_details_infoget = async () => {
    try {
      const resp = await axios.post(`${base_url}/add_events_data`, event);
      if(resp.status === 200){
        toast.success("Event details saved successfully", { autoClose: 2000});
        // Reset form after successful submission
        setevent(defaultEventState);
        
        // Reset any form elements to their default
        document.getElementById("training_category").selectedIndex = 0;
        document.getElementById("training_code").selectedIndex = 0;
        document.getElementById("training_name").selectedIndex = 0;
        document.getElementById("training_type").selectedIndex = 0;
        document.getElementById("training_mode").selectedIndex = 0;
        document.getElementById("trainer_name").selectedIndex = 0;
        document.getElementById("region").selectedIndex = 0;
        document.getElementById("project_title").selectedIndex = 0;
        document.getElementById("job_title").selectedIndex = 0;
        
        // Reset text areas
        document.getElementById("description").value = "";
        
        // Reset date and time inputs
        document.getElementById("from_date").value = "";
        document.getElementById("to_date").value = "";
        document.getElementById("from_time").value = "";
        document.getElementById("to_time").value = "";
        
        // Reset additional selects
        if (document.getElementById("participents")) {
          document.getElementById("participents").selectedIndex = 0;
        }
        if (document.getElementById("venue_name")) {
          document.getElementById("venue_name").selectedIndex = 0;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to save event details", { autoClose: 2000 });
    }
  }

  const [show, setshow] = useState(false);
  
  const handleclose = () => {
    setshow(false);
  }
  
  const handleshow = () => {
    setshow(true);
  }

  const fieldStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  // Default trainer state
  const defaultTrainerState = {
    first_name: "",
    last_name: "",
    specialization: "",
    experience: "",
    email_id: "",
    phone_no: ""
  };

  const [trainer, settrainer] = useState(defaultTrainerState);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    settrainer({ ...trainer, [name]: value });
  };

  const addtrainer = async () => {
    try {
      const resp = await axios.post(`${base_url}/addtrainer`, trainer);
      if(resp.status === 200){
        toast.success("Trainer details saved successfully", { autoClose: 2000 });
        // Reset trainer form
        settrainer(defaultTrainerState);
        // Close modal
        setshow(false);
        // Refresh trainers list
        trainersdetails();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add trainer", { autoClose: 2000 });
    }
  }

  const [trainers, settrainers] = useState([])
  
  const trainersdetails = async () => {
    try {
      const resp = await axios.get(`${base_url}/getTrainer`);
      settrainers(resp.data.trainer)
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    trainersdetails();
  }, []);


  
  
  return (
    <div>
      <style>
        {`
        /* Custom CSS for Training Calendar Form */

        body {
          background-color: rgba(46, 7, 63, 0.1);
          font-family: Arial, sans-serif;
          margin: 0;
          // padding: 20px;
          }

/* Main layout */
.training-page-wrapper {
  // background-color: rgba(46, 7, 63, 0.05);
  min-height: 100vh;
  display: flex;
}

/* Header Styles */
.header-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.title-name h5 {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #2e073f;
  font-weight: 600;
}

.title-name p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.title-name a {
  color: #2e073f;
  text-decoration: none;
}

.title-name a:hover {
  text-decoration: underline;
}

/* Button Styles */
.add-trainer-btn {
  background-color: #2e073f;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 200px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-trainer-btn:hover {
  background-color: #3d0a54;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 7, 63, 0.2);
}

.save-btn {
  background-color: #2e073f;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.save-btn:hover {
  background-color: #3d0a54;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(46, 7, 63, 0.2);
  color: #fff;
}

.save-btn-div {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 80px;
  height: 50px;
}

.cancel-btn:hover {
  background-color: #c82333;
  transform: translateY(-2px);
}

.trainer-save-btn {
  background-color: #2e073f;
  padding: 10px 20px;
  font-size: 0.9rem;
}

/* Form Container */
.training-container {
  background-color: #fff;
  border-radius: 8px;
  // box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.form-section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

/* Form Input Styles */
.form-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-item label {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: #333;
}

.form-item select,
.form-item input,
.form-item textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.95rem;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.form-item select:focus,
.form-item input:focus,
.form-item textarea:focus {
  border-color: #2e073f;
  box-shadow: 0 0 0 3px rgba(46, 7, 63, 0.1);
  outline: none;
}

.form-item textarea {
  min-height: 100px;
  resize: vertical;
}

.secondary-input {
  margin-top: 10px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.95rem;
  width: 100%;
}

/* Date and Time Section */
.date-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

/* Trainer Modal */
.trainer-modal .modal-header {
  background-color: rgba(46, 7, 63, 0.05);
  border-bottom: 2px solid #2e073f;
}

.trainer-modal .modal-title {
  color: #2e073f;
  font-weight: 600;
}

.trainer-modal .modal-title u {
  text-decoration-color: rgba(46, 7, 63, 0.3);
  text-decoration-thickness: 2px;
}

.trainer-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.trainer-form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.trainer-form-item label {
  font-weight: 500;
  color: #333;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .form-section {
    grid-template-columns: 1fr;
  }
  
  .date-section {
    grid-template-columns: 1fr;
  }
  
  .main-content-section {
    margin-left: 0;
  }
}

// /* Toast notification overrides */
// .Toastify__toast {
//   border-radius: 8px !important;
//   font-size: 0.9rem !important;
// }

// .Toastify__toast--success {
//   background-color: #4caf50 !important;
// }

// .Toastify__toast--error {
//   background-color: #f44336 !important;
// }

/* Status field styling */
#status_info {
  background-color: #f8f9fa;
  cursor: not-allowed;
}
        `}
      </style>
    
   <div className="flex ">
      <Sidebar1 />

      <section className="flex-1 transition-all duration-300 ml-2 ">
        <Header />

        <div className="header-div header-two">
          <div className="title-name">
            <h5>Create Training</h5>
            <p>
              <a href="#">Home</a> <i className="fa-solid fa-caret-right"></i>{" "}
              Create Training 
            </p>
          </div>
          <button className="add-trainer-btn" onClick={handleshow}>
            <i className="fa-solid fa-plus"></i> Add New Trainer
          </button>
        </div>

        <div className="training-container">
          <div className="form-section">
              <div className="form-item">
                <label>Training Category</label>
                <select 
                  name="training-category" 
                  id="training_category" 
                  value={event.training_category}
                  onChange={(e) => {setevent({...event, training_category:e.target.value})}}
                  onClick={()=>get_training_category()} 
                >
                  <option value="">-- Select Training Category --</option>
                   {
                    select_loading === "training-category" ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        {trainingCategory.map((item, index) => (
                          <option>
                            {item.lookup_value}
                          </option>
                        ))}
                      </>
                    )
                  }
                </select>
              </div>

                 <div className="form-item">
                  <label>Training Name</label>
                  <select 
                    name="training-name" 
                    id="training_name" 
                    value={event.training_name}
                    onChange={(e) => {setevent({...event, training_name:e.target.value})}} 
                    onClick={()=>get_training_name()}
                  >
                    <option value="">-- Select Training Name --</option>
                    {
                    select_loading === "training-name" ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        {trainingName.map((item, index) => (
                          <option>
                            {item.lookup_value}
                          </option>
                        ))}
                      </>
                    )
                  }
                  </select>
              </div>

              <div className="form-item">
                <label>Training Code</label>
                <select 
                  name="training-code" 
                  id="training_code" 
                  value={event.training_code}
                  onChange={(e) => {setevent({...event, training_code:e.target.value})}} 
                  onClick={()=>get_training_code()}
                >
                  <option value="">-- Select Training Code --</option>
                  {
                    select_loading === "training-code" ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        {trainingCode.map((item, index) => (
                          <option>
                            {item.lookup_value}
                          </option>
                        ))}
                      </>
                    )
                  }
                </select>
              </div>
           
              <div className="form-item">
                  <label>Training Type</label>
                  <select 
                    name="training-type" 
                    id="training_type" 
                    value={event.training_type}
                    onChange={(e) => {setevent({...event, training_type:e.target.value})}} 
                    onClick={()=>get_training_type()}
                  >
                    <option value="">-- Select Training Type --</option>
                  {
                    select_loading === "training-type" ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        {trainingTypes.map((item, index) => (
                          <option>
                            {item.lookup_value}
                          </option>
                        ))}
                      </>
                    )
                  }

                  </select>
              </div>
              <div className="form-item">
                  <label>Training Mode</label>
                  <select 
                    name="training-mode" 
                    id="training_mode" 
                    value={event.training_mode}
                    onChange={(e) => {setevent({...event, training_mode:e.target.value})}} 
                  >
                    <option value="">-- Select Training Mode --</option>
                    <option value="Online">Online</option>
                    <option value="Face to Face">Face to Face</option>
                  </select>
              </div>
              <div className="form-item">
                <label>Add Trainer</label>
                <select 
                  name="training-name"  
                  id="trainer_name" 
                  value={event.trainer_name}
                  onChange={(e) => {setevent({...event, trainer_name:e.target.value})}}
                >
                    <option value="">---Select---</option>
                    {
                      trainers.map((trainer, index) => (
                        <option key={index} value={`${trainer.first_name} ${trainer.last_name}`}>
                          {trainer.first_name} {trainer.last_name}
                        </option>
                      ))
                    }
                </select>
              </div>
              <div className="form-item">
                <label htmlFor="description">Description</label>
                <textarea 
                  name="description" 
                  id="description" 
                  value={event.description}
                  onChange={(e) => {setevent({...event, description:e.target.value})}}
                ></textarea>
              </div>

<div className="form-item">
               <label htmlFor="Region">Region</label>
<FormControl fullWidth size="small">
  <Select
    labelId="region-label"
    multiple
    value={event.region}
    onOpen={get_region}
    onChange={(e) => {
      setevent({
        ...event,
        region: e.target.value,
      });
    }}
    renderValue={(selected) => selected.join(", ")}
  >
    {select_loading === "training-category" ? (
      <MenuItem disabled>Loading...</MenuItem>
    ) : (
      region.map((item, index) => (
        <MenuItem key={index} value={item.lookup_value}>
          <Checkbox
            checked={event.region.includes(item.lookup_value)}
          />
          <ListItemText primary={item.lookup_value} />
        </MenuItem>
      ))
    )}
  </Select>
</FormControl>
</div>



              <div className="form-item">
                <label htmlFor="project">Project</label>
                <select 
                  name="project" 
                  id="project_title"
                  value={event.project_title}
                  onChange={(e) => {setevent({...event, project_title:e.target.value})}}
                  onClick={()=>get_project()}
                >
                    <option value="">-- Select Project --</option>
                    {
                    select_loading === "project" ? (
                      <span>Loading...</span>
                    ) : (
                      <>
                        {project.map((item, index) => (
                          <option>
                            {item.lookup_value}
                          </option>
                        ))}
                      </>
                    )
                  }
                  </select>
              </div>
              <div className="form-item">
                <label htmlFor="project">Job title</label>
                <select 
                  name="job-title" 
                  id="job_title"
                  value={event.job_title.length === 1 ? event.job_title[0] : "All"}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue === "selectJobTitle") {
                      toast.error("Please select a correct Job title", { autoClose: 2000 });
                      return;
                    } else if (selectedValue === "All") {
                      setevent({
                        ...event,
                        job_title: ["Job Title-1", "Job Title-2", "Job Title-3", "Job Title-4", "Job Title-5"],
                      });
                    } else {
                      setevent({
                        ...event,
                        job_title: [selectedValue],
                      });
                    }
                  }}
                >
                    <option value="selectJobTitle">-- Select Job title --</option>
                    <option value="Job Title-1">Job title - 1</option>
                    <option value="Job Title-2">Job title - 2</option>
                    <option value="Job Title-3">Job title - 3</option>
                    <option value="Job Title-4">Job title - 4</option>
                    <option value="Job Title-5">Job title - 5</option>
                    <option value="All">All</option>
                  </select>
              </div>
              <div className="date-section">
                <div className="form-item">
                  <label htmlFor="from-date">From</label>
                  <input 
                    type="date" 
                    name="from-date" 
                    id="from_date"
                    value={event.from_date}
                    onChange={(e) => {setevent({...event, from_date:e.target.value})}} 
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="to-date">To</label>
                  <input 
                    type="date" 
                    name="to-date" 
                    id="to_date"
                    value={event.to_date}
                    onChange={(e) => {setevent({...event, to_date:e.target.value})}} 
                  />
                </div>
              </div>

              <div className="date-section">
                <div className="form-item">
                  <label htmlFor="from-time">From</label>
                  <input 
                    type="time" 
                    name="from-time" 
                    id="from_time"
                    value={event.from_time}
                    onChange={(e) => {setevent({...event, from_time:e.target.value})}} 
                  />
                </div>
                <div className="form-item">
                  <label htmlFor="to-time">To</label>
                  <input 
                    type="time" 
                    name="to-time" 
                    id="to_time"
                    value={event.to_time}
                    onChange={(e) => {setevent({...event, to_time:e.target.value})}} 
                  />
                </div>
              </div>
              
              <div className="form-item">
                <label htmlFor="participents">No of participants</label>
                <select
                  name="participents"
                  id="participents"
                  value={event.participentsType}
                  onChange={(e) => {
                    const value = e.target.value;
                    setevent({
                      ...event,
                      participentsType: value,
                      participents: value === "Define" ? "" : value,
                    });
                  }}
                >
                  <option value="">---Select---</option>
                  <option value="Open">Open</option>
                  <option value="Define">Define</option>
                </select>

                {event.participentsType === "Define" && (
                  <input
                    type="number"
                    name="participents-input"
                    id="participents-input"
                    placeholder="Enter number of participants"
                    className="secondary-input"
                    value={event.participents}
                    onChange={(e) => {
                      setevent({
                        ...event,
                        participents: e.target.value,
                      });
                    }}
                  />
                )}
              </div>

              <div className="form-item">
                <label htmlFor="venue">Venue</label>
                <select
                  name="venue"
                  id="venue_name"
                  value={event.venuetype}
                  onChange={(e) => {
                    const value = e.target.value;
                    setevent({
                      ...event,
                      venuetype: value,
                      venue_name: value === "Define" ? "" : value,
                    });
                  }}
                >
                  <option value="">---Select---</option>
                  <option value="Open">Open</option>
                  <option value="Define">Define</option>
                </select>

                {event.venuetype === "Define" && (
                  <input
                    type="text"
                    name="venue-input"
                    id="venue-input"
                    placeholder="Enter Venue"
                    className="secondary-input"
                    value={event.venue_name}
                    onChange={(e) => {
                      setevent({
                        ...event,
                        venue_name: e.target.value,
                      });
                    }}
                  />
                )}
              </div>

              <div className="form-item">
                <label htmlFor="status">Status</label>
                <select id="status_info" value="Upcoming" disabled>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
          </div>
            <div className="flex justify-center">
                <button  onClick={event_details_infoget}>
                  <i className="fa-solid fa-save"></i> Save
                </button>
              </div>
        </div>
      </section>

      <Modal show={show} onHide={handleclose} size="lg" className="trainer-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <u>Add Trainer</u> 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="trainer-form">
            <div className="trainer-form-item">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                placeholder="Enter First Name"
                style={fieldStyle}
                value={trainer.first_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="trainer-form-item">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter Last Name"
                style={fieldStyle}
                value={trainer.last_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="trainer-form-item">
              <label>Specialization</label>
              <select
                name="specialization"
                style={fieldStyle}
                value={trainer.specialization}
                onChange={handleInputChange}
              >
                <option value="">---Select---</option>
                <option value="Job Training">Job Training</option>
                <option value="Motivation">Motivation</option>
                <option value="HVAC">HVAC</option>
              </select>
            </div>

            <div className="trainer-form-item">
              <label>Years of Experience</label>
              <input
                type="number"
                name="experience"
                placeholder="Enter Years of Experience"
                style={fieldStyle}
                value={trainer.experience}
                onChange={handleInputChange}
              />
            </div>

            <div className="trainer-form-item">
              <label>Email Address</label>
              <input
                type="email"
                name="email_id"
                placeholder="Enter Email"
                style={fieldStyle}
                value={trainer.email_id}
                onChange={handleInputChange}
              />
            </div>

            <div className="trainer-form-item">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone_no"
                placeholder="Enter Phone Number"
                style={fieldStyle}
                value={trainer.phone_no}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel-btn" onClick={handleclose}>
            <i className="fa-solid fa-times"></i> Close
          </Button>
          <Button className="save-btn trainer-save-btn" onClick={addtrainer}>
            <i className="fa-solid fa-save"></i> Save
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer/>
    </div>
    </div>
  );
}

export default TrainingCalenderForm;
