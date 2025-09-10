import {React, useState, useEffect} from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import GetOJTInfo from './GetOJTInfo';
import CreateOJA from './CreateOJA';
import ConductingOJA from './ConductingOJA';
import CreateOJT from './CreateOJT';
import CreateINA from './CreateINA';
import ConductINA from './ConductINA';
import ModalExample from './ModalExample';

function OjtOjaIna() {

    const [show,setshow]=useState(false);
    const [show2,setshow2]=useState(false);
    const [show3,setshow3]=useState(false);
    const [selectedOJT, setSelectedOJT] = useState("");
    const [selectedOJA, setSelectedOJA] = useState("");

    const handleclose = () => setshow(false);
    const handleshow = () =>  setshow(true);
     
    const handleclose2=()=>setshow2(false);
    const handleshow2=()=>setshow2(true);
  
    const handleclose3=()=>setshow3(false);
    const handleshow3=()=> setshow3(true);

    const handleOJTChange = (e) => {
        setSelectedOJT(e.target.value);
    };

    const handleOJAChange = (e) => {
        setSelectedOJA(e.target.value);
    }


    function CreateOJTFunc() {
      const createOJT = document.getElementById('create-ojt-form');
      const ojtForm = document.getElementById('ojt-form');

      createOJT.style.display = 'block';
      ojtForm.style.display = 'none';
    }
    
    function conductingOJT() {
      document.getElementById('create-ojt-form').style.display = "none";
      document.getElementById('ojt-form').style.display = "none";
      document.getElementById('conducting-ojt-form').style.display = "block";
    }

    function createOJA() {
      document.getElementById('create-oja-form').style.display = "block";
      document.getElementById('oja-form').style.display = "none";
    }

    function conductingOJA() {
      document.getElementById('conducting-oja-div').style.display = "block";
      document.getElementById('oja-form').style.display = "none";
    }

    function createINA() {
      document.getElementById('ina-form').style.display = "none";
      document.getElementById('create_ina').style.display = "block";
    }

    function conductINA() {
      document.getElementById('conduct_ina').style.display = "block";
      document.getElementById('ina-form').style.display = "none";
    }

    // const[addContent, setaddContent] = useState({Srno:[], description:[]});

    // function add_ContentTwo() {
    //   setaddContent((prevState) => ({
    //     Srno: [...prevState.Srno, prevState.Srno.length + 1],
    //     description: [...prevState.description, ''], // Can set default value if needed
    //   }));
    // }

  //   /// Getting Ojts details form backend
  //   const [activities2, setActivities2] = useState([]); // To store selected OJT's activities
  // // const [ojtTitle, setOjtTitle] = useState(''); // Selected OJT title
  // // const [ojtCode, setOjtCode] = useState(''); // Selected OJT code
  // const [ojts, setOjts] = useState([]); // To store all OJTs

  // // Fetch all OJTs when the component mounts
  // useEffect(() => {
  //   const fetchOjts = async () => {
  //     try {
  //       const token = localStorage.getItem('token'); // Assuming you need JWT
  //       const response = await axios.get('http://localhost:5000/get_Ojt_info', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       setOjts(response.data); // Assuming response contains a list of OJTs
  //     } catch (error) {
  //       console.error('Error fetching OJTs:', error);
  //     }
  //   };

  //   fetchOjts();
  // }, []);

  // // Function to handle OJT selection and populate activities and OJT code
  // const handleOjtSelect = (selectedOjtTitle) => {
  //   setOjtTitle(selectedOjtTitle);

  //   // Find the selected OJT from the list of OJTs
  //   const selectedOjt = ojts.find((ojt) => ojt.ojt_Title === selectedOjtTitle);

  //   if (selectedOjt) {
  //     setOjtCode(selectedOjt.ojt_Code);
  //     setActivities2(selectedOjt.activities2); // Assuming 'activities' is part of the OJT object
  //   }
  // };

  return (
    <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh"}}>

        <style>
            {`
            .ojt-oja-ina{
            // height: 6rem;
            width: 100%;
            padding: 2rem;
            border-radius: 10px;
            background-color: #ffffff;
            display: flex;  
            }
            .ojt-oja-ina div{
            height: 4rem;
            width: 10rem;
            background-color: #7A1CAC;
            color: #ffffff;
            margin-right: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
            box-shadow: 3px 3px 8px rgba(0, 0, 0, 1);
            }
            .ojt-oja-ina div:hover{
            border-radius: 2rem;
            }
            .upload-attendene{
            display: grid;
            }
            .activity-data-id-two{
            display: none;
            width: 100%;
            }
            .create-ojy-div{
            display: flex;
            justify-content: bottom;
            align-items: center;
            }
            .create-ojt-div button{
            height: 2.5rem;
            border: none;
            background-color: #7A1CAC;
            color: #ffffff;
            border-radius: 5px;
            font-weight: 500;
            }
            .create-ojt-div button:hover{
            background-color: #7a1cacc6;
            }
            .conduct-ojt-oja-ina{
            width: 10rem;
            margin-left: 10px;
            }
            .upload-btn{
            width: 100%;
            display: flex;
            justify-content: space-between;
            }
            .create-ojt-form{
            display: none;
            }
            #conducting-ojt-form{
            display: none;
            }
            #create-oja-form{
            display: none;
            }
            #conducting-oja-div{
            display: none;
            }
            #create_ina{
            display: none;
            }
            #conduct_ina{
            display: none;
            }
            .info-div-item #add-activity-btn{
            background-color: #ffffff;
            color: #7A1CAC;
            border: 2px solid #7A1CAC;
            height: 3rem; 
            font-weight: 500;
            }
            #add-desc{
            border: 2px solid #7A1CAC;
            background-color: #ffffff;
            color: #7A1CAC;
            }
            .create-ojt{
            width: 90%;
            margin: 1rem auto;
            }
            .create-ojt .info-div-item{
            margin: 1rem 0;
            }
            .add-activity-div{
            border: 1px dashed #000;
            padding: 0 1rem;
            border-radius: 5px;
            margin-top: 1.5rem;
            }
            .desc-input:focus{
            outline: none;
            }
            .desc-del-btn{
            background-color: transparent;
            color: red;
            box-shadow: none;
            width: fit-content;
            }
            .btn-div{
            display: flex;
            justify-content: space-between;
            }
            #create-btn{
            width: 8rem;
            height: 3rem;
            background-color: #7A1CAC; 
            transition: all 0.3s ease;
            }
            #create-btn:hover{
            background-color: #ffffff;
            color: #7A1CAC;
            border: 1px solid #7A1CAC;
            }
            `}
        </style>
        <Sidebar/>

        <section className="main-content-section">
            <Header/>

            <div className="header-div header-two">
          <div className="title-name">
            <h5>OJT / OJA / INA</h5>
            <p>
              <a
                onClick={() => window.location.reload()}
                style={{ cursor: "pointer", color: "#099ded" }}
              >
                Home
              </a>{" "}
              <i class="fa-solid fa-caret-right"></i>OJT / OJA / INA
            </p>
          </div>
        </div>

        <div className='ojt-oja-ina'>
            <div className='ojt-section' onClick={handleshow}>
                <h4>OJT</h4>
            </div>
            <div className='oja-section' onClick={handleshow2}>
                <h4>OJA</h4>
            </div>
            <div className='ina-section' onClick={handleshow3}>
                <h4>INA</h4>
            </div>
        </div>

        <div className='ojt-container-info'>
        <Modal show={show} onHide={handleclose} size='xl'>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">OJT Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="attendene-list" id='ojt-form'>
              <div className="title-div-two">
                <h2>On Job <span style={{ fontWeight: "300" }}>Training</span></h2>
              </div>

              {/* <div className="upload-attendene" style={{ fontSize: "14px" }}>
                <div className="info-div-item">
                  <label>Employee ID</label>
                  <select className="employee-id" name="employee-id" id="employee-id-ojt">
                    <option>Employee 1</option>
                    <option>Employee 2</option>
                    <option>Employee 3</option>
                    <option>Employee 4</option>
                  </select>
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

                <div className="info-div-item">
                  <label>Select OJT</label>
                  <select
                    className="select-ojt"
                    name="select-ojt"
                    id="select-ojt-id"
                    onChange={handleOJTChange}
                  >
                    <option value="">-- Select --</option>
                    <option value="100P1OJT">100P1OJT</option>
                    <option value="200P2OJT">200P2OJT</option>
                  </select>
                </div>
              </div> */}

              <div className="upload-btn">
                <button
                  className="form-control form-control-sm"
                  style={{ backgroundColor: "#7A1CAC", color: "#ffffff", height: "3rem", width:"5rem", fontWeight:"500", border:"none" }}
                >
                  Upload
                </button>
                <div className='create-ojt-div'>
                  <button onClick={CreateOJTFunc}> Create OJT </button>
                  <button id='conduct-ojt' className='conduct-ojt-oja-ina' onClick={conductingOJT}> Conducting OJT </button>
                </div>
              </div>
              
            </div>

            <div className='create-ojt-form' id='create-ojt-form'>
                <CreateOJT/>
                {/* <ModalExample/> */}
            </div>

            <div className='conducting-ojt' id='conducting-ojt-form'>
              <div className="title-div-two">
                <h2>Conducting <span style={{ fontWeight: "300" }}>OJT</span></h2>
              </div> 
              <div className='conduct-ojt-div create-ojt'>
                <GetOJTInfo/>
              </div>
              
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleclose}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>

      <div className='oja-container-info'>
  <Modal show={show2} onHide={handleclose2} size='xl'>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">OJA Form</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="attendene-list" id='oja-form'>
        <div className="title-div-two">
          <h2>
            On Job <span style={{ fontWeight: "300" }}>Assessment</span>
          </h2>
        </div>

        {/* <div className="upload-attendene" style={{ fontSize: "14px" }}>
          <div className="info-div-item">
            <label>Employee ID</label>
            <select className="employee-id" name="employee-id" id="employee-id-ojt">
              <option>Employee 1</option>
              <option>Employee 2</option>
              <option>Employee 3</option>
              <option>Employee 4</option>
            </select>
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

          <div className="info-div-item">
            <label>Select OJA</label>
            <select
              className="select-ojt"
              name="select-ojt"
              id="select-ojt-id-two"
              onChange={handleOJAChange}
            >
              <option value="">-- Select --</option>
              <option value="400P1OJT">400P1OJT</option>
              <option value="600P2OJT">600P2OJT</option>
            </select>
          </div>

          {selectedOJA === "400P1OJT" && (
            <div className="activity-data" id="activity-data-id-two">
              <div className="activity-1">
                <h4>Activity 1.1</h4>
                <table className="table table-striped table-bordered" cellspacing="0" style={{ fontSize: "14px" }}>
                  <thead>
                    <tr>
                      <td>CheckList</td>
                      <td>Sr No.</td>
                      <td>Description</td>
                      <td>Trainer Rating</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type='checkbox' /></td>
                      <td>1</td>
                      <td>This is the activity 1</td>
                      <td>
                        <select>
                          <option>Select</option>
                          <option> 1 </option>
                          <option> 2 </option>
                          <option> 3 </option>
                          <option> 4 </option>
                          <option> 5 </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Score</td>
                      <td colSpan={3}>Avg Score 65%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {selectedOJA === "600P2OJT" && (
            <div className="activity-data" id="activityTwo-data-id-two">
              <div className="activity-1">
                <h4>Activity 2.1</h4>
                <table className="table table-striped table-bordered" cellspacing="0" style={{ fontSize: "14px" }}>
                  <thead>
                    <tr>
                      <td>CheckList</td>
                      <td>Sr No.</td>
                      <td>Description</td>
                      <td>Trainer Rating</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><input type='checkbox' /></td>
                      <td>1</td>
                      <td>This is the activity 2</td>
                      <td>
                        <select>
                          <option>Select</option>
                          <option> 1 </option>
                          <option> 2 </option>
                          <option> 3 </option>
                          <option> 4 </option>
                          <option> 5 </option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Score</td>
                      <td colSpan={3}>Avg Score 65%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div> */}
        
        <div className="upload-btn">
          <button className="form-control form-control-sm" style={{ backgroundColor: "#7A1CAC", color: "#ffffff", height: "3rem", width:"5rem" }}>Upload</button>
          <div className='create-ojt-div'>
            <button onClick={createOJA}>Create OJA</button>
            <button className='conduct-ojt-oja-ina' onClick={conductingOJA}>Conducting OJA</button>
          </div>
        </div>
      </div>

      <div className='create-oja' id='create-oja-form'>
          <CreateOJA/>
      </div>
      <div className='conducting-oja' id='conducting-oja-div'>
          <ConductingOJA/>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='secondary' onClick={handleclose2}>Close</Button>
    </Modal.Footer>
  </Modal>
      </div>


        <div className='ina-container-info'>
        <Modal show={show3} onHide={handleclose3} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                INA Form
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='ina-form-div' id='ina-form'>
              
            <div className="title-div-two">
            <h2>
              On Job Interview <span style={{ fontWeight: "300" }}>Based Assessment</span>
            </h2>
          </div>

            {/* <div className="upload-attendene" style={{ fontSize: "14px" }}>
                <div className="info-div-item">
                <label>Employee ID</label>
                <select
                    className="employee-id"
                    name="employee-id"
                    id="employee-id-ina"
                    
                >
                    <option>Employee 1</option>
                    <option>Employee 2</option>
                    <option>Employee 3</option>
                    <option>Employee 4</option>
                </select>
                </div>
                <div className="info-div-item">
              <label>Select INA</label>
              <select
                className="select-ina"
                name="select-ina"
                id="select-ina-item"
              >
                <option>100INA</option>
                <option>200INA</option>
                <option>300INA</option>
                <option>400INA</option>
              </select>
            </div>
            <div className="info-div-item">
            <label>Assessment Name</label>
            <input type='text' id='assessment-name' />
            </div>
            <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} >
                <thead>
                    <tr>
                        <td>Sr no.</td>
                        <td>Questions</td>
                        <td>Rating</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>What is Quantum Mechanics</td>
                        <td>
                          <select>
                            <option>Select</option>
                            <option> 1 </option>
                            <option> 2 </option>
                            <option> 3 </option>
                            <option> 4 </option>
                            <option> 5 </option>
                          </select>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>What is Motion of Inertia</td>
                        <td>
                          <select>
                            <option>Select</option>
                            <option> 1 </option>
                            <option> 2 </option>
                            <option> 3 </option>
                            <option> 4 </option>
                            <option> 5 </option>
                          </select>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <h6>Score Avg</h6>
                    <p>66%</p>
                </tfoot>
            </table>
            </div> */}

              <div className="upload-btn">
            <button className="form-control form-control-sm" style={{ backgroundColor: "#7A1CAC", color: "#ffffff", height: "3rem", width:"5rem" }}>Upload</button>
            <div className='create-ojt-div'>
              <button onClick={createINA}>Create INA</button>
              <button className='conduct-ojt-oja-ina' onClick={conductINA}>Conducting INA</button>
            </div>
          </div>
          </div>

          <div className='create-ina-form' id='create_ina'>
            <CreateINA/>
          </div>

          <div className='conduct-ina-form' id='conduct_ina'>
            <ConductINA/>
          </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleclose3}>Close</Button>
            </Modal.Footer>
            </Modal>
        </div>
        </section>
      <ToastContainer/>
    </div>
  )
}

export default OjtOjaIna
