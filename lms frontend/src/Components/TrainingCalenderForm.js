// import React, { useEffect, useState } from "react";
// import '../StyleCode/TrainingCalendar.css';
// import Header from "./Header";
// import Sidebar from "./Sidebar";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { base_url } from "./Utils/base_url";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useNavigate } from "react-router-dom";

// function TrainingCalenderForm() {

//  const navigate = useNavigate();

//   const[event, setevent] = useState({training_category:"", training_code:"", training_name:"", training_mode:"", trainer_name:"", description:"",region:[""],  project_title:"", 
//     job_title:[""], from_date:new Date(), to_date:new Date(), from_time:"", to_time:"", participents:"", venue_name:"", status:"Upcoming"})

//   const event_details_infoget = async () => {
//     try {
//       const resp = await axios.post(`${base_url}/add_events_data`, event);
//       if(resp.status === 200){
//         toast.success("Event details saved successfuly", { autoClose: 2000});
//         setevent([]);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const [show,setshow]=useState(false)
//   const handleclose=()=>
//   {
//       setshow(false)
//   }
//   const handleshow=()=>
//   {
//       setshow(true)

//   }

//   const fieldStyle = {
//     width: '100%',
//     padding: '0.5rem',
//     border: '1px solid #ced4da', // Light gray border
//     borderRadius: '4px',         // Rounded corners
//     fontSize: '1rem',            // Font size for consistency
//   };

//   const[trainer,settrainer]=useState({first_name:"",last_name:"",specialization:"",experience:"",email_id:"",phone_no:""})
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     settrainer({ ...trainer, [name]: value });
//   };

//   const addtrainer = async () => {
//     try {
//       const resp = await axios.post(`${base_url}/addtrainer`, trainer);
//       if(resp.status === 200){
//         toast.success("Trainer details saved successfuly",{autoClose:2000});
//         setTimeout(() => {
//           navigate('/createtraining')
//         }, 2000);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//    const[trainers,settrainers]=useState([])
//   const trainersdetails=async()=>
//   {
//     try {
//       const resp = await axios.get(`${base_url}/getTrainer`);
//       settrainers(resp.data.trainer)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   //  console.log(trainers);
//   React.useEffect(() => {
//     // Your code to run when the component mounts
//     trainersdetails(); // Assuming this is a function
//   }, []);
//   console.log(trainers);

//   // Function to format the date as "dd-mm-yyyy"
//   const formatDate = (dateString) => {
//     if (!dateString) return ""; // Handle empty input
//     const [year, month, day] = dateString.split("-");
//     return `${day}-${month}-${year}`;
//   };  
  
//   return (
//     <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px" }}>
//       <Sidebar />

//       <section className="main-content-section">
//         <Header />

//         <div className="header-div header-two">
//           <div className="title-name">
//             <h5>Create Training</h5>
//             <p>
//               <a href="#">Home</a> <i class="fa-solid fa-caret-right"></i>{" "}
//               Create Training 
//             </p>
//           </div>
//           <button className="save-btn" style={{width:"200px"}} onClick={handleshow}> Add New Trainer </button>
//         </div>

//         <div className="training-container">
//           <div className="form-section">
//               <div className="form-item">
//                 <label>Training Category</label>
//                 <select name="training-category" id="training_category" onChange={(e) => {setevent({...event, training_category:e.target.value})}} >
//                   <option>-- Select Training Category --</option>
//                   <option >Value1</option>
//                   <option >Value2</option>
//                   <option>Value3</option>
//                   <option >Value4</option>
//                   <option >Value5</option>
//                   <option >Value6</option>
//                 </select>
//               </div>
//               <div className="form-item">
//                 <label>Training Code</label>
//                 <select name="training-code" id="training_code" onChange={(e) => {setevent({...event, training_code:e.target.value})}} >
//                   <option>-- Select Training Code --</option>
//                   <option >GJB457</option>
//                   <option >TRK415</option>
//                   <option>Pkl471</option>
//                   <option >TGFDC52</option>
//                   <option >MLKF895</option>
//                   <option >WRSS412</option>
//                 </select>
//               </div>
//               <div className="form-item">
//                   <label>Training Name</label>
//                   <select name="training-name" id="training_name" onChange={(e) => {setevent({...event, training_name:e.target.value})}} >
//                     <option>-- Select Training Name --</option>
//                     <option >Value1</option>
//                     <option >Value2</option>
//                     <option >Value3</option>
//                     <option >Value4</option>
//                     <option >Value5</option>
//                     <option >Value6</option>
//                   </select>
//               </div>
//               <div className="form-item">
//                   <label>Training Mode</label>
//                   <select name="training-mode" id="training_mode" onChange={(e) => {setevent({...event, training_mode:e.target.value})}} >
//                     <option>-- Select Training Mode --</option>
//                     <option >Online</option>
//                     <option >Face to Face</option>
//                   </select>
//               </div>
//               <div className="form-item">
//                 <label>Add Trainer</label>
//                 {/* <input type='text' placeholder="Enter Trainer name" id="trainer_name" style={{width:"100%", height:"3rem", padding:"0 1rem"}} onChange={(e) => {setevent({...event, trainer_name:e.target.value})}}  /> */}
//                 <select name="training-name"  id="trainer_name" onChange={(e) => {setevent({...event, trainer_name:e.target.value})}}>
//                     <option >---Select---</option>
//                     {
//                       trainers.map((trainer)=>
//                       (
//                         <option>{trainer.first_name} {trainer.last_name}</option>
//                       ))
//                     }
                
//                   </select>
//               </div>
//               <div className="form-item">
//                 <label for='desription'>Description</label>
//                 <textarea name="description" id="description"  onChange={(e) => {setevent({...event, description:e.target.value})}}></textarea>
//               </div>
//               <div className="form-item">
//                 <label htmlFor="region">Region</label>
//                 <select
//                   name="region"
//                   id="region"
//                   onChange={(e) => {
//                     const selectedValue = e.target.value;
//                     if (selectedValue === "selectRegion") {
//                       toast.error("Please select a correct region", { autoClose: 2000 });
//                       return; // Prevent updating the state
//                     } else if (selectedValue === "All") {
//                       setevent({
//                         ...event,
//                         region: ["UAE", "Oman", "KSA", "Qatar", "Bahrain"], // Store all countries
//                       });
//                     } else {
//                       setevent({
//                         ...event,
//                         region: [selectedValue], // Store individual country
//                       });
//                     }
//                   }}
//                 >
//                   <option value="selectRegion">-- Select Region --</option>
//                   <option value="UAE">UAE</option>
//                   <option value="Oman">Oman</option>
//                   <option value="KSA">KSA</option>
//                   <option value="Qatar">Qatar</option>
//                   <option value="Bahrain">Bahrain</option>
//                   <option value="All">All</option>
//                 </select>
//               </div>

//               <div className="form-item">
//                 <label for='project'>Project</label>
//                 <select name="project" id="project_title"  onChange={(e) => {setevent({...event, project_title:e.target.value})}}>
//                     <option>-- Select Project --</option>
//                     <option >Value1</option>
//                     <option >Value2</option>
//                     <option >Value3</option>
//                     <option >Value4</option>
//                     <option>Value5</option>
//                     <option >Value6</option>
//                   </select>
//               </div>
//               <div className="form-item">
//                 <label for='project'>Job title</label>
//                 <select 
//                   name="job-title" 
//                   id="job_title"  
//                   // onChange={(e) => {setevent({...event, job_title:e.target.value})}}
//                   onChange={(e) => {
//                     const selectedValue = e.target.value;
//                     if (selectedValue === "selectJobTitle") {
//                       toast.error("Please select a correct Job title", { autoClose: 2000 });
//                       return; // Prevent updating the state
//                     } else if (selectedValue === "All") {
//                       setevent({
//                         ...event,
//                         job_title: ["Job Title-1", "Job Title-2", "Job Title-3", "Job Title-4", "Job Title-5"], // Store all countries
//                       });
//                     } else {
//                       setevent({
//                         ...event,
//                         job_title: [selectedValue], // Store individual country
//                       });
//                     }
//                   }}
//                 >

//                     <option value="selectJobTitle">-- Select Job title --</option>
//                     <option value="Job Title-1">Job title - 1</option>
//                     <option value="Job Title-2">Job title - 2</option>
//                     <option value="Job Title-3">Job title - 3</option>
//                     <option value="Job Title-4">Job title - 4</option>
//                     <option value="Job Title-5">Job title - 5</option>
//                     <option value="All">All</option>
//                   </select>
//               </div>
//               <div className="date-setion">
//               <div className="form-item">
//               <label for='from-date'>From</label>
//               <input type="date" name="from-date" id="from_date"  onChange={(e) => {setevent({...event, from_date:e.target.value})}} />
//               </div>
//               <div className="form-item">
//               <label for='to-date'>To</label>
//               <input type="date" name="to-date" id="to_date"  onChange={(e) => {setevent({...event, to_date:e.target.value})}} />
//               </div>
//               </div>

//               <div className="date-setion">
//               <div className="form-item">
//               <label for='from-time'>From</label>
//               <input type="time" name="from-time" id="from_time"  onChange={(e) => {setevent({...event, from_time:e.target.value})}} />
//               </div>
//               <div className="form-item">
//               <label for='to-time'>To</label>
//               <input type="time" name="to-time" id="to_time"  onChange={(e) => {setevent({...event, to_time:e.target.value})}} />
//               </div>
//               </div>
              
//               <div className="form-item">
//                 <label htmlFor="participents">No of participants</label>

//                 {/* Dropdown for selection */}
//                 <select
//                   name="participents"
//                   id="participents"
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setevent({
//                       ...event,
//                       participentsType: value,
                      
//                       participents: value === "Define" ? "" : value, // Set to empty if "Define" is selected
//                     });
//                   }}
//                 >
//                   <option>---Select---</option>
//                   <option>Open</option>
//                   <option>Define</option>
//                 </select>

//                 {/* Conditionally render the input field when "Define" is selected */}
//                       {event.participentsType === "Define" && (
//                         <input
//                           type="num"
//                           name="participents-input"
//                           id="participents-input"
//                           placeholder="Enter number of participants"
//                           style={{ width: "100%", height: "3rem", padding: "0 1rem", marginTop: "0.5rem" }}
//                           onChange={(e) => {
//                             setevent({
//                               ...event,
//                               participents: e.target.value, // Update the participants in the state
//                             });
//                           }}
//                         />
//                       )}
//                 </div>

//                 <div className="form-item">
//                 <label htmlFor="venue">Venue</label>

//                 {/* Dropdown for selection */}
//                 <select
//                   name="venue"
//                   id="venue_name"
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     setevent({
//                       ...event,
//                       venuetype: value,
//                       venue_name: value === "Define" ? "" : value, // Set to empty if "Define" is selected
//                     });
//                   }}
//                 >
//                   <option>---Select---</option>
//                   <option>Open</option>
//                   <option>Define</option>
//                 </select>

//                 {/* Conditionally render the input field when "Define" is selected */}
//                       {event.venuetype === "Define" && (
//                         <input
//                           type="text"
//                           name="venue-input"
//                           id="venue-input"
//                           placeholder="Enter Venue"
//                           style={{ width: "100%", height: "3rem", padding: "0 1rem", marginTop: "0.5rem" }}
//                           onChange={(e) => {
//                             setevent({
//                               ...event,
//                               venue_name: e.target.value, // Update the participants in the state
//                             });
//                           }}
//                         />
//                       )}
//                 </div>

//               <div className="form-item">
//               <label for='status'>Status</label>
//               <select id='status_info' value={"Upcoming"}>
//                 <option value="upcoming">Upcoming</option>
//               </select>
//               </div>

//               <div className="save-btn-div">
//                 <button className="save-btn" onClick={event_details_infoget} > Save </button>
//               </div>
//           </div>
//         </div>
//       </section>

//        <Modal show={show} onHide={handleclose} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//          <u>Add Trainer</u> 
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <label>First Name</label>
//             <input
//               type="text"
//               name="first_name"
//               placeholder="Enter First Name"
//               style={fieldStyle}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <label>Last Name</label>
//             <input
//               type="text"
//               name="last_name"
//               placeholder="Enter Last Name"
//               style={fieldStyle}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <label>Specialization</label>
//             <select
//               name="specialization"
//               style={fieldStyle}
//               onChange={handleInputChange}
//             >
//               <option>---Select---</option>
//               <option>Job Training</option>
//               <option>Motivation</option>
//               <option>HVAC</option>
//             </select>
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <label>Years of Experience</label>
//             <input
//               type="number"
//               name="experience"
//               placeholder="Enter Years of Experience"
//               style={fieldStyle}
//               onChange={handleInputChange}
//             />
//           </div>

        

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <label>Email Address</label>
//             <input
//               type="email"
//               name="email_id"
//               placeholder="Enter Email"
//               style={fieldStyle}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
//             <label>Phone Number</label>
//             <input
//               type="tel"
//               name="phone_no"
//               placeholder="Enter Phone Number"
//               style={fieldStyle}
//               onChange={handleInputChange}
//             />
//           </div>

//         </div>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button className="save-btn" style={{backgroundColor:"red"}} onClick={handleclose}>
//           Close
//         </Button>
//         <Button className="save-btn" onClick={addtrainer}>
//           Save
//         </Button>
//       </Modal.Footer>
//     </Modal>


//       <ToastContainer/>
//     </div>
//   );
// }

// export default TrainingCalenderForm;


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
    region: [""],
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
          padding: 20px;
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
    
    <div className="training-page-wrapper">
      <Sidebar />

      <section className="main-content-section">
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
                >
                  <option value="">-- Select Training Category --</option>
                  <option value="Value1">Value1</option>
                  <option value="Value2">Value2</option>
                  <option value="Value3">Value3</option>
                  <option value="Value4">Value4</option>
                  <option value="Value5">Value5</option>
                  <option value="Value6">Value6</option>
                </select>
              </div>
              <div className="form-item">
                <label>Training Code</label>
                <select 
                  name="training-code" 
                  id="training_code" 
                  value={event.training_code}
                  onChange={(e) => {setevent({...event, training_code:e.target.value})}} 
                >
                  <option value="">-- Select Training Code --</option>
                  <option value="GJB457">GJB457</option>
                  <option value="TRK415">TRK415</option>
                  <option value="Pkl471">Pkl471</option>
                  <option value="TGFDC52">TGFDC52</option>
                  <option value="MLKF895">MLKF895</option>
                  <option value="WRSS412">WRSS412</option>
                </select>
              </div>
              <div className="form-item">
                  <label>Training Name</label>
                  <select 
                    name="training-name" 
                    id="training_name" 
                    value={event.training_name}
                    onChange={(e) => {setevent({...event, training_name:e.target.value})}} 
                  >
                    <option value="">-- Select Training Name --</option>
                    <option value="Value1">Value1</option>
                    <option value="Value2">Value2</option>
                    <option value="Value3">Value3</option>
                    <option value="Value4">Value4</option>
                    <option value="Value5">Value5</option>
                    <option value="Value6">Value6</option>
                  </select>
              </div>
              <div className="form-item">
                  <label>Training Type</label>
                  <select 
                    name="training-type" 
                    id="training_type" 
                    value={event.training_type}
                    onChange={(e) => {setevent({...event, training_type:e.target.value})}} 
                  >
                    <option value="">-- Select Training Type --</option>
                    <option value="Type1">Type 1</option>
                    <option value="Type2">Type 2</option>
                    <option value="Type3">Type 3</option>
                    <option value="Type4">Type 4</option>
                    <option value="Type5">Type 5</option>
                    <option value="Type6">Type 6</option>
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
                <label htmlFor="region">Region</label>
                <select
                  name="region"
                  id="region"
                  value={event.region.length === 1 ? event.region[0] : "All"}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    if (selectedValue === "selectRegion") {
                      toast.error("Please select a correct region", { autoClose: 2000 });
                      return;
                    } else if (selectedValue === "All") {
                      setevent({
                        ...event,
                        region: ["UAE", "Oman", "KSA", "Qatar", "Bahrain"],
                      });
                    } else {
                      setevent({
                        ...event,
                        region: [selectedValue],
                      });
                    }
                  }}
                >
                  <option value="selectRegion">-- Select Region --</option>
                  <option value="UAE">UAE</option>
                  <option value="Oman">Oman</option>
                  <option value="KSA">KSA</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="All">All</option>
                </select>
              </div>

              <div className="form-item">
                <label htmlFor="project">Project</label>
                <select 
                  name="project" 
                  id="project_title"
                  value={event.project_title}
                  onChange={(e) => {setevent({...event, project_title:e.target.value})}}
                >
                    <option value="">-- Select Project --</option>
                    <option value="Value1">Value1</option>
                    <option value="Value2">Value2</option>
                    <option value="Value3">Value3</option>
                    <option value="Value4">Value4</option>
                    <option value="Value5">Value5</option>
                    <option value="Value6">Value6</option>
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

              <div className="save-btn-div">
                <button className="save-btn" onClick={event_details_infoget}>
                  <i className="fa-solid fa-save"></i> Save
                </button>
              </div>
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
