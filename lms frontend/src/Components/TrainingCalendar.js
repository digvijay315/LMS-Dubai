// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import '../StyleCode/calaender.css'
// import { base_url } from "./Utils/base_url";
// import { Dropdown } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { toast, ToastContainer } from 'react-toastify';
// import $ from 'jquery'; // Import jQuery
// import 'datatables.net'; // Import DataTables
// import { Link } from 'react-router-dom';

// const TrainingCalendar = () => {
//     const [trainingData, setTrainingData] = useState({
//         training_category: '',
//         training_code: '',
//         training_name: '',
//         training_mode: '',
//         description: '',
//         region: '',
//         project_title: '',
//         job_title: '',
//         from_date: new Date(),
//         to_date: new Date(),
//         from_time: '',
//         to_time: '',
//         participants: '',
//         venue_name: '',
//         status: ''
//     });
//     const [trainings, setTrainings] = useState([]);
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [selectedTraining, setSelectedTraining] = useState([]);

//     const toggleCalendar = () => {
//         setShowCalendar(!showCalendar);
//     };

//     const handleDateClick = (date) => {
//         setSelectedDate(date);
//         const trainingsOnDate = trainings.filter((training) => {
//             const trainingDate = new Date(training.from_date);
//             return trainingDate.toDateString() === date.toDateString();
//         });
//         setSelectedTraining(trainingsOnDate);
//     };

//     useEffect(() => {
//         const fetchTrainings = async () => {
//             try {
//                 const response = await axios.get(`${base_url}/event_details_get`);
//                 setTrainings(response.data);
//             } catch (error) {
//                 console.error('Error fetching trainings:', error);
//             }
//         };

//         fetchTrainings();
//     }, []);





//     useEffect(()=>{
//         get_details();
//     }, [])

//     const[details, setdetails] = useState([]);

//     const get_details = async () => {
//         try {
//             const resp = await axios.get(`${base_url}/event_details_get`);
//             console.log(resp);
            
//             setdetails(resp.data)
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const delete_events = async (_id) => {

//         try {
//             const id = _id;
//             const resp = await axios.delete(`${base_url}/trainingevent_delete/${id}`);
//             setdetails(resp.data.event);
//             toast.success("Event deleted successfuly",{autoClose:"2000"});
//             setTimeout(() => {
//                 window.location.reload();
//             }, 500);
//         } catch (error) {
//            console.log(error); 
//         }
//     }

//     const[event, setevent] = useState({training_category:"", training_code:"", training_name:"", training_mode:"", description:"",region:"",  project_title:"", 
//         job_title:"", from_date:new Date(), to_date:new Date(), from_time:"", to_time:"", participents:"", venue_name:"", status:""})
//     const[training,settraining]=useState([])
//     const [show,setshow]=useState(false)
//     const handleclose=()=>
//     {
//         setshow(false)
//     }
//     const handleshow=(item)=>
//     {
//         setshow(true)
//         setevent(item)
//         settraining(item)
//     }

   
    
//         const editevent = async () => {
//             try {
//                 const id=training._id
//               const resp = await axios.put(`${base_url}/event_details_updated/${id}`, event);
//               if(resp.status === 200){
//                 toast.success("Event details edit successfuly");
//                 setTimeout(() => {
//                     window.location.reload()
//                 }, 1000);
                
//               }
//             } catch (error) {
//               console.log(error);
//             }
//           }


//           useEffect(() => {
//             if (details.length > 0) {
//               // Initialize DataTable
//               const table = $('#trainingTable').DataTable({
//                 dom: '<"dt-buttons"Bf><"clear">lirtp',
//                 paging: true,
//                 autoWidth: true,
//                 buttons: [
//                   'colvis',
//                   'copyHtml5',
//                   'csvHtml5',
//                   'excelHtml5',
//                   'pdfHtml5',
//                   'print',
//                 ],
//                 initComplete: function () {
//                   const footer = $('#trainingTable tfoot tr');
//                   $('#trainingTable thead').append(footer);
//                 },
//               });
        
//               // Apply search functionality
//               $('#trainingTable thead').on('keyup', 'input', function () {
//                 table.column($(this).parent().index()).search(this.value).draw();
//               });
        
//               // Cleanup on component unmount
//               return () => {
//                 table.destroy(true);
//               };
//             }
//           }, [details]);

//     return (
//         <div>
          
//             <button  onClick={toggleCalendar} className='hide-view-btn' >
//                 {showCalendar ? 'Hide Calendar' : 'View Calendar'}
//             </button>
//             {showCalendar && (
//             <div style={{ width: "100%", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
//                 <Calendar 
//                     onClickDay={handleDateClick}
//                     tileContent={({ date }) => {
//                         const trainingOnDate = trainings.filter(training =>
//                             new Date(training.from_date).toDateString() === date.toDateString()
//                         );

//                         const isPastDate = date < new Date(); // Check if the date is in the past

//                         if (trainingOnDate.length > 0) {
//                             return (
//                                 <span className={isPastDate ? "blink-red" : "blink"}>
//                                     🟢
//                                 </span>
//                             ); // Use red blinking for past dates
//                         }

//                         return null;
//                     }}
//                     tileClassName={({ date }) => {
//                         const fromDate = new Date(trainingData.from_date);
//                         const toDate = new Date(trainingData.to_date);

//                         // Check if the date is within the training date range
//                         if (date >= fromDate && date <= toDate) {
//                             return 'highlight'; // Apply highlight class
//                         }
//                         return null;
//                     }}
//                 />
//                 <div style={{ marginTop: '20px' }}>
//                     <h3>Training Details for {selectedDate.toDateString()}</h3>
//                     {selectedTraining.length > 0 ? (
//                         <table className="table table-striped table-bordered" style={{ width: '100%', borderCollapse: 'collapse',marginBottom:"100px" }}>
//                             <thead>
//                                 <tr>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Training Name</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Category</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Project Code</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Project Title</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Mode</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>From Date</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>To Date</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>From Time</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>To Time</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Participants</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Venue Name</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Status</th>
//                                     <th style={{ border: '1px solid #ccc', padding: '10px' }}>Add Nomination</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {selectedTraining.map((training, index) => (
//                                     <tr key={index} style={{ border: '1px solid #ccc' }}>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.training_name}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.training_category}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.training_code}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.project_title}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.training_mode}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{new Date(training.from_date).toDateString()}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{new Date(training.to_date).toDateString()}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.from_time}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.to_time}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.participants}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.venue_name}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.status}</td>
//                                         <td style={{ border: '1px solid #ccc', padding: '10px' }}> 
//                                           <Link 
//                                             to={`/add-nomination/${training._id}`} 
//                                             className="nomination-link"
//                                             state={{ training: training }} // Pass training data via state
//                                           >
//                                             Add Nomination
//                                           </Link> 
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No training scheduled for this date.</p>
//                     )}
//                 </div>

//             </div>
//         )}


//         <div className='training-details-list'>
//         <h5 style={{marginBottom:"1.5rem"}}>All Training Details list here.</h5>

//         <div className='details-list'>
//         <table id="trainingTable" class="table table-striped table-bordered" style={{fontSize:"14px"}} >
//         <thead>
//             <tr>
//             <th>Seq No.</th>
//             <th>Training Category</th>
//             <th>Training Code</th>
//             <th>Training Name</th>
//             <th>Mode</th>
//             <th>Trainer Name</th>
//             <th>Region</th>
//             <th>Project</th>
//                     <th>Date (from - to)</th>
//                     <th>Time (from - to)</th>
//                     <th>Total Participents</th>
//                     <th>Venue</th>
//                     <th>Status</th>
//                     <th>Action</th>
//             </tr>
//         </thead>
//         <tbody>  
//             {
//                     Array.isArray(details) ? details.map((item,index)=>
//                     (
//                         <tr>
//                         <td >{index+1}</td>
//                         <td >{item.training_category}</td>
//                         <td >{item.training_code}</td>
//                         <td >{item.training_name}</td>
//                         <td >{item.training_mode}</td>
//                         <td >{item.trainer_name}</td>
//                         <td >{item.region}</td>
//                         <td >{item.project_title}</td>
//                         <td >{item.from_date} - {item.to_date}</td>
//                         <td >{item.from_time} - {item.to_time}</td>
//                         <td >{item.participents}</td>
//                         <td >{item.venue_name}</td>
//                         <td >{item.status}</td>
//                         <td>
                        
//             <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-basic">
//                 Action
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//             <Dropdown.Item onClick={()=>handleshow(item)}>Edit</Dropdown.Item>
//                 <Dropdown.Item  onClick={() => {delete_events(item._id)}}>Delete</Dropdown.Item>
//             </Dropdown.Menu>
//             </Dropdown>
//                         </td>
//                         </tr>
//                     )):[]
//                 }

//         </tbody>

//         </table>


//         <Modal show={show} onHide={handleclose} size='lg'>
//         <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//         Edit Training Event
//         </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>

//         <div className="training-container">
//         <div className="">
//         <div className="form-item">
//         <label>Training Category</label>
//         <select name="training-category" id="training_category" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_category:e.target.value}))}}>
//         <option >{training.training_category}</option>
//         <option >Value1</option>
//         <option >Value2</option>
//         <option>Value3</option>
//         <option >Value4</option>
//         <option >Value5</option>
//         <option >Value6</option>
//         </select>
//         </div>
//         <div className="form-item">
//         <label>Training Code</label>
//         <select name="training-code" id="training-code" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_code:e.target.value}))}}>
//         <option >{training.training_code}</option>
//         <option >GJB457</option>
//         <option >TRK415</option>
//         <option>Pkl471</option>
//         <option >TGFDC52</option>
//         <option >MLKF895</option>
//         <option >WRSS412</option>
//         </select>
//         </div>
//         <div className="form-item">
//         <label>Training Name</label>
//         <select name="training-name" id="training_name" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_name:e.target.value}))}}>
//         <option >{training.training_name}</option>
//         <option >Value1</option>
//         <option >Value2</option>
//         <option >Value3</option>
//         <option >Value4</option>
//         <option >Value5</option>
//         <option >Value6</option>
//         </select>
//         </div>
//         <div className="form-item">
//         <label>Training Mode</label>
//         <select name="training-mode" id="training_mode" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_mode:e.target.value}))}}>
//         <option >{training.training_mode}</option>
//         <option >Online</option>
//         <option >Face to Face</option>
//         </select>
//         </div>
//         <div className="form-item">
//         <label for='desription'>Description</label>
//         <textarea name="description" id="description" defaultValue={training.description}  onChange={(e) => {setevent((prevprofile)=>({...prevprofile, description:e.target.value}))}}></textarea>
//         </div>
//         <div className="form-item">
//         <label for='region'>Region</label>
//         <select name="region" id="region"  onChange={(e) => {setevent((prevprofile)=>({...prevprofile, region:e.target.value}))}}>
//         <option >{training.region}</option> 
//         <option >UAE</option>
//         <option >Oman</option>
//         <option >KSA</option>
//         <option >Qatar</option>
//         <option >Bahrain</option>
//         <option >All</option>
//         </select>
//         </div>
//         <div className="form-item">
//         <label for='project'>Project</label>
//         <select name="project" id="project_title"   onChange={(e) => {setevent((prevprofile)=>({...prevprofile, project_title:e.target.value}))}}>
//         <option >Value1</option>
//         <option >Value2</option>
//         <option >Value3</option>
//         <option >Value4</option>
//         <option>Value5</option>
//         <option >Value6</option>
//         </select>
//         </div>
//         <div className="form-item">
//         <label for='project'>Job title</label>
//         <select name="job-title" id="job_title"   onChange={(e) => {setevent((prevprofile)=>({...prevprofile, job_title:e.target.value}))}}>
//         <option >Value1</option>
//         <option >Value2</option>
//         <option >Value3</option>
//         <option >Value4</option>
//         <option >Value5</option>
//         <option >Value6</option>
//         </select>
//         </div>
//         <div className="date-setion">
//         <div className="form-item">
//         <label for='from-date'>From</label>
//         <input type="date" name="from-date" id="from_date" defaultValue={training.from_date} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, from_date:e.target.value}))}}/> 
//         </div>
//         <div className="form-item">
//         <label for='to-date'>To</label>
//         <input type="date" name="to-date" id="to_date" defaultValue={training.to_date} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, to_date:e.target.value}))}}/>
//         </div>
//         </div>

//         <div className="date-setion">
//         <div className="form-item">
//         <label for='from-time'>From</label>
//         <input type="time" name="from-time" id="from_time" defaultValue={training.from_time} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, from_time:e.target.value}))}}/> 
//         </div>
//         <div className="form-item">
//         <label for='to-time'>To</label>
//         <input type="time" name="to-time" id="to_time" defaultValue={training.to_time} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, to_time:e.target.value}))}}/>
//         </div>
//         </div>

//         <div className="form-item">
//         <label for='participents'>No of participents</label>
//         <select
//         name="participents"
//         id="participents"
//         onChange={(e) => {
//         const value = e.target.value;
//         setevent({
//         ...event,
//         participentsType: value,
        
//         participents: value === "Define" ? "" : value, // Set to empty if "Define" is selected
//         });
//         }}

//         >
//         <option>---Select---</option>
//         <option>Open</option>
//         <option>Define</option>
//         </select>

//         {event.participentsType === "Define" && (
//             <input
//             type="num"
//             name="participents-input"
//             id="participents-input"
//             defaultValue={training.participents}
//             placeholder="Enter number of participants"
//             style={{ width: "100%", height: "3rem", padding: "0 1rem", marginTop: "0.5rem" }}
//             onChange={(e) => {setevent((prevprofile)=>({...prevprofile, participents:e.target.value}))}}
//             />
//         )}
//         </div>
//         <div className="form-item">
//         <label for='venue'>Venue</label>
//         <select
//         name="venue"
//         id="venue_name"
//         onChange={(e) => {
//         const value = e.target.value;
//         setevent({
//         ...event,
//         venuetype: value,
//         venue_name: value === "Define" ? "" : value, // Set to empty if "Define" is selected
//         });
//         }}
//         >
//         <option>---Select---</option>
//         <option>Open</option>
//         <option>Define</option>
//         </select>

//         {event.venuetype === "Define" && (
//             <input
//             type="text"
//             name="venue-input"
//             id="venue-input"
//             defaultValue={training.venue_name}
//             placeholder="Enter Venue"
//             style={{ width: "100%", height: "3rem", padding: "0 1rem", marginTop: "0.5rem" }}
//             onChange={(e) => {setevent((prevprofile)=>({...prevprofile, venue_name:e.target.value}))}}
//             />
//         )}
//         </div>

//         <div className="form-item">
//         <label for='status'>Status</label>
//         <select id='status_info'  onChange={(e) => {setevent((prevprofile)=>({...prevprofile, status:e.target.value}))}}>
//         <option >{training.status_info}</option>
//         <option >Upcoming</option>
//         <option >Complete</option>
//         <option >Uncomplete</option>
//         </select>
//         </div>

//         <div className="save-btn-div">
//         <button className="save-btn" onClick={editevent}> Save </button>
//         </div>
//         </div>
//         </div>

//         </Modal.Body>
//         <Modal.Footer>
//         <Button variant='secondary' onClick={handleclose}>Close</Button>
//         </Modal.Footer>
//         </Modal>
//         </div>
//         </div>

//         <ToastContainer/>

//         </div>
//     );
// };

// export default TrainingCalendar;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../StyleCode/calaender.css'
import { base_url } from "./Utils/base_url";
import { Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import { Link } from 'react-router-dom';

const TrainingCalendar = () => {
    const [trainingData, setTrainingData] = useState({
        training_category: '',
        training_code: '',
        training_name: '',
        training_mode: '',
        description: '',
        region: '',
        project_title: '',
        job_title: '',
        from_date: new Date(),
        to_date: new Date(),
        from_time: '',
        to_time: '',
        participants: '',
        venue_name: '',
        status: ''
    });
    const [trainings, setTrainings] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTraining, setSelectedTraining] = useState([]);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const trainingsOnDate = trainings.filter((training) => {
            const trainingDate = new Date(training.from_date);
            return trainingDate.toDateString() === date.toDateString();
        });
        setSelectedTraining(trainingsOnDate);
    };

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await axios.get(`${base_url}/event_details_get`);
                setTrainings(response.data);
            } catch (error) {
                console.error('Error fetching trainings:', error);
            }
        };

        fetchTrainings();
    }, []);

    useEffect(()=>{
        get_details();
    }, [])

    const[details, setdetails] = useState([]);

    const get_details = async () => {
        try {
            const resp = await axios.get(`${base_url}/event_details_get`);
            console.log(resp);
            
            setdetails(resp.data)
        } catch (error) {
            console.log(error);
        }
    }

    const delete_events = async (_id) => {

        try {
            const id = _id;
            const resp = await axios.delete(`${base_url}/trainingevent_delete/${id}`);
            setdetails(resp.data.event);
            toast.success("Event deleted successfuly",{autoClose:"2000"});
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
           console.log(error); 
        }
    }

    const[event, setevent] = useState({training_category:"", training_code:"", training_name:"", training_mode:"", description:"",region:"",  project_title:"", 
        job_title:"", from_date:new Date(), to_date:new Date(), from_time:"", to_time:"", participents:"", venue_name:"", status:""})
    const[training,settraining]=useState([])
    const [show,setshow]=useState(false)
    const handleclose=()=>
    {
        setshow(false)
    }
    const handleshow=(item)=>
    {
        setshow(true)
        setevent(item)
        settraining(item)
    }

    const editevent = async () => {
        try {
            const id=training._id
            const resp = await axios.put(`${base_url}/event_details_updated/${id}`, event);
            if(resp.status === 200){
            toast.success("Event details edit successfuly");
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (details.length > 0) {
            // Initialize DataTable
            const table = $('#trainingTable').DataTable({
            dom: '<"dt-buttons"Bf><"clear">lirtp',
            paging: true,
            autoWidth: true,
            buttons: [
                'colvis',
                'copyHtml5',
                'csvHtml5',
                'excelHtml5',
                'pdfHtml5',
                'print',
            ],
            initComplete: function () {
                const footer = $('#trainingTable tfoot tr');
                $('#trainingTable thead').append(footer);
            },
            });
    
            // Apply search functionality
            $('#trainingTable thead').on('keyup', 'input', function () {
            table.column($(this).parent().index()).search(this.value).draw();
            });
    
            // Cleanup on component unmount
            return () => {
            table.destroy(true);
            };
        }
    }, [details]);

    return (
        <div className="training-calendar-container">
            <button onClick={toggleCalendar} className='view-calendar-btn'>
                {showCalendar ? 'Hide Calendar' : 'View Calendar'}
            </button>
            
            {showCalendar && (
                <div className="calendar-wrapper">
                    <Calendar 
                        onClickDay={handleDateClick}
                        tileContent={({ date }) => {
                            const trainingOnDate = trainings.filter(training =>
                                new Date(training.from_date).toDateString() === date.toDateString()
                            );

                            const isPastDate = date < new Date(); // Check if the date is in the past

                            if (trainingOnDate.length > 0) {
                                return (
                                    <span className={isPastDate ? "blink-red" : "blink"}>
                                        🟢
                                    </span>
                                ); // Use red blinking for past dates
                            }

                            return null;
                        }}
                        tileClassName={({ date }) => {
                            const fromDate = new Date(trainingData.from_date);
                            const toDate = new Date(trainingData.to_date);

                            // Check if the date is within the training date range
                            if (date >= fromDate && date <= toDate) {
                                return 'highlight'; // Apply highlight class
                            }
                            return null;
                        }}
                    />
                    <div className="training-details-section">
                        <h3>Training Details for {selectedDate.toDateString()}</h3>
                        {selectedTraining.length > 0 ? (
                            <div className="calendar-table-wrapper">
                                <table className="calendar-training-table">
                                    <thead>
                                        <tr>
                                            <th>Training Name</th>
                                            <th>Category</th>
                                            <th>Project Code</th>
                                            <th>Project Title</th>
                                            <th>Mode</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>From Time</th>
                                            <th>To Time</th>
                                            <th>Participants</th>
                                            <th>Venue Name</th>
                                            <th>Status</th>
                                            <th>Add Nomination</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTraining.map((training, index) => (
                                            <tr key={index}>
                                                <td>{training.training_name}</td>
                                                <td>{training.training_category}</td>
                                                <td>{training.training_code}</td>
                                                <td>{training.project_title}</td>
                                                <td>{training.training_mode}</td>
                                                <td>{new Date(training.from_date).toDateString()}</td>
                                                <td>{new Date(training.to_date).toDateString()}</td>
                                                <td>{training.from_time}</td>
                                                <td>{training.to_time}</td>
                                                <td>{training.participants}</td>
                                                <td>{training.venue_name}</td>
                                                <td>{training.status}</td>
                                                <td> 
                                                    <Link 
                                                        to={`/add-nomination/${training._id}`} 
                                                        className="nomination-link"
                                                        state={{ training: training }} // Pass training data via state
                                                    >
                                                        Add Nomination
                                                    </Link> 
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No training scheduled for this date.</p>
                        )}
                    </div>
                </div>
            )}

            <div className='training-details-list'>
                <h5>All Training Details list here.</h5>

                <div className='details-list'>
                    <table id="trainingTable" className="table table-striped table-bordered training-table">
                        <thead>
                            <tr>
                                <th>Seq No.</th>
                                <th>Training Category</th>
                                <th>Training Code</th>
                                <th>Training Name</th>
                                <th>Mode</th>
                                <th>Trainer Name</th>
                                <th>Region</th>
                                <th>Project</th>
                                <th>Date (from - to)</th>
                                <th>Time (from - to)</th>
                                <th>Total Participents</th>
                                <th>Venue</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>  
                            {
                                Array.isArray(details) ? details.map((item,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.training_category}</td>
                                        <td>{item.training_code}</td>
                                        <td>{item.training_name}</td>
                                        <td>{item.training_mode}</td>
                                        <td>{item.trainer_name}</td>
                                        <td>{item.region}</td>
                                        <td>{item.project_title}</td>
                                        <td>{item.from_date} - {item.to_date}</td>
                                        <td>{item.from_time} - {item.to_time}</td>
                                        <td>{item.participents}</td>
                                        <td>{item.venue_name}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="action-dropdown">
                                                    Action
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleshow(item)}>Edit</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => delete_events(item._id)}>Delete</Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Link 
                                                            to={`/add-nomination/${item._id}`} 
                                                            className="dropdown-nomination-link"
                                                            state={{ training: item }}
                                                        >
                                                            Add Nomination
                                                        </Link>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )) : []
                            }
                        </tbody>
                    </table>

                    <Modal show={show} onHide={handleclose} size='lg'>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Edit Training Event
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="training-container">
                                <div className="">
                                    <div className="form-item">
                                        <label>Training Category</label>
                                        <select name="training-category" id="training_category" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_category:e.target.value}))}}>
                                            <option>{training.training_category}</option>
                                            <option>Value1</option>
                                            <option>Value2</option>
                                            <option>Value3</option>
                                            <option>Value4</option>
                                            <option>Value5</option>
                                            <option>Value6</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label>Training Code</label>
                                        <select name="training-code" id="training-code" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_code:e.target.value}))}}>
                                            <option>{training.training_code}</option>
                                            <option>GJB457</option>
                                            <option>TRK415</option>
                                            <option>Pkl471</option>
                                            <option>TGFDC52</option>
                                            <option>MLKF895</option>
                                            <option>WRSS412</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label>Training Name</label>
                                        <select name="training-name" id="training_name" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_name:e.target.value}))}}>
                                            <option>{training.training_name}</option>
                                            <option>Value1</option>
                                            <option>Value2</option>
                                            <option>Value3</option>
                                            <option>Value4</option>
                                            <option>Value5</option>
                                            <option>Value6</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label>Training Mode</label>
                                        <select name="training-mode" id="training_mode" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, training_mode:e.target.value}))}}>
                                            <option>{training.training_mode}</option>
                                            <option>Online</option>
                                            <option>Face to Face</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor='desription'>Description</label>
                                        <textarea name="description" id="description" defaultValue={training.description} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, description:e.target.value}))}}></textarea>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor='region'>Region</label>
                                        <select name="region" id="region" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, region:e.target.value}))}}>
                                            <option>{training.region}</option> 
                                            <option>UAE</option>
                                            <option>Oman</option>
                                            <option>KSA</option>
                                            <option>Qatar</option>
                                            <option>Bahrain</option>
                                            <option>All</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor='project'>Project</label>
                                        <select name="project" id="project_title" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, project_title:e.target.value}))}}>
                                            <option>Value1</option>
                                            <option>Value2</option>
                                            <option>Value3</option>
                                            <option>Value4</option>
                                            <option>Value5</option>
                                            <option>Value6</option>
                                        </select>
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor='project'>Job title</label>
                                        <select name="job-title" id="job_title" onChange={(e) => {setevent((prevprofile)=>({...prevprofile, job_title:e.target.value}))}}>
                                            <option>Value1</option>
                                            <option>Value2</option>
                                            <option>Value3</option>
                                            <option>Value4</option>
                                            <option>Value5</option>
                                            <option>Value6</option>
                                        </select>
                                    </div>
                                    <div className="date-setion">
                                        <div className="form-item">
                                            <label htmlFor='from-date'>From</label>
                                            <input type="date" name="from-date" id="from_date" defaultValue={training.from_date} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, from_date:e.target.value}))}}/>
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor='to-date'>To</label>
                                            <input type="date" name="to-date" id="to_date" defaultValue={training.to_date} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, to_date:e.target.value}))}}/>
                                        </div>
                                    </div>

                                    <div className="date-setion">
                                        <div className="form-item">
                                            <label htmlFor='from-time'>From</label>
                                            <input type="time" name="from-time" id="from_time" defaultValue={training.from_time} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, from_time:e.target.value}))}}/> 
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor='to-time'>To</label>
                                            <input type="time" name="to-time" id="to_time" defaultValue={training.to_time} onChange={(e) => {setevent((prevprofile)=>({...prevprofile, to_time:e.target.value}))}}/>
                                        </div>
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor='participents'>No of participents</label>
                                        <select
                                            name="participents"
                                            id="participents"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setevent({
                                                    ...event,
                                                    participentsType: value,
                                                    participents: value === "Define" ? "" : value, // Set to empty if "Define" is selected
                                                });
                                            }}
                                        >
                                            <option>---Select---</option>
                                            <option>Open</option>
                                            <option>Define</option>
                                        </select>

                                        {event.participentsType === "Define" && (
                                            <input
                                                type="num"
                                                name="participents-input"
                                                id="participents-input"
                                                defaultValue={training.participents}
                                                placeholder="Enter number of participants"
                                                className="defined-input"
                                                onChange={(e) => {setevent((prevprofile)=>({...prevprofile, participents:e.target.value}))}}
                                            />
                                        )}
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor='venue'>Venue</label>
                                        <select
                                            name="venue"
                                            id="venue_name"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setevent({
                                                    ...event,
                                                    venuetype: value,
                                                    venue_name: value === "Define" ? "" : value, // Set to empty if "Define" is selected
                                                });
                                            }}
                                        >
                                            <option>---Select---</option>
                                            <option>Open</option>
                                            <option>Define</option>
                                        </select>

                                        {event.venuetype === "Define" && (
                                            <input
                                                type="text"
                                                name="venue-input"
                                                id="venue-input"
                                                defaultValue={training.venue_name}
                                                placeholder="Enter Venue"
                                                className="defined-input"
                                                onChange={(e) => {setevent((prevprofile)=>({...prevprofile, venue_name:e.target.value}))}}
                                            />
                                        )}
                                    </div>

                                    <div className="form-item">
                                        <label htmlFor='status'>Status</label>
                                        <select id='status_info' onChange={(e) => {setevent((prevprofile)=>({...prevprofile, status:e.target.value}))}}>
                                            <option>{training.status_info}</option>
                                            <option>Upcoming</option>
                                            <option>Complete</option>
                                            <option>Uncomplete</option>
                                        </select>
                                    </div>

                                    <div className="save-btn-div">
                                        <button className="save-btn" onClick={editevent}> Save </button>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleclose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>

            <ToastContainer/>


            <style jsx>
            {`
            .hide-view-btn{
            background-color: #7A1CAC;
            }
            .hide-view-btn:hover{
            background-color: #7a1cacc6;
            }
            .training-details-list{
            border: 1px solid rgba(0,0,0,0.2);
            margin-top: 2rem;
            padding: 1rem;
            border-radius: 5px;
            }
            .dt-paging-button{
            padding: 8px 1rem;
            border: none;
            margin: 0 5px;
            background-color: #ffffff;
            // border: #7A1CAC solid 1px;
            font-weight: 500;
            border-radius: 5px;
            transition: all 0.3s ease;
            box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
            }
            .dt-paging-button:hover{
            background-color: #7A1CAC;
            color: #ffffff;
            }
            #dt-length-0{
            width: 7%;
            }

            .dt-paging-button{
            background-color: #ffffff;
            box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
            color: #000;
            margin: 0 5px;
            width: 2.5rem;
            transition: 0.3s all ease;
            }
            .dt-paging-button:hover{
            background-color: #7A1CAC;
            color: #ffffff;
            }
            .dt-search{
            float: right;
            margin-bottom: 14px;
            }
            .dt-search #dt-search-0{
            height: 2.5rem;
            border-radius: 5px;
            border: none;
            border: 2px solid #7A1CAC;
            padding-left: 10px;
            }
            .dt-search #dt-search-0:focus{
            outline: none;
            `}
            </style>
        </div>
    );
};

export default TrainingCalendar;




