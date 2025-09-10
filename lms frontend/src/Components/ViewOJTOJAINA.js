import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import { base_url } from './Utils/base_url';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewOJTOJAINA() {

    useEffect(() => {
        // fetchOjtData();
        // fetchOjaData();
        // fetchInaData();
    }, []);

    // ---------------------------------------- OJT Integration Code ------------------------------------- //
    const [ojtData, setOjtData] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedOJT, setSelectedOJT] = useState(null);

    useEffect(() => {
        fetchOjtData();
    }, []);

    const fetchOjtData = async () => {
        try {
            const resp = await axios.get(`${base_url}/get_Ojt_info`);
            setOjtData(resp.data.create_ojt);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteOjtData = async (_id) => {
        try {
           const id = _id;
           const resp = await axios.delete(`${base_url}/ojt_data_delete/${id}`);
           setOjtData(resp.data.create_ojt);
           toast.success("OJT delete successfully", {autoClose:"2000"});
           setTimeout(() => {
            window.location.reload();
           }, 500);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditOJT = async (_id) => {
        try {
            const resp = await axios.get(`${base_url}/get_ojts_byid/${_id}`);
            setSelectedOJT(resp.data.create_ojt);
            setShow(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        setSelectedOJT(null);
        setShow(false);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${base_url}/ojt_details_updated/${selectedOJT._id}`, selectedOJT);
            toast.success("OJT updated successfully", { autoClose: 2000 });
            fetchOjtData();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const addContent = (activityIndex) => {
        const updatedOJT = { ...selectedOJT };
        updatedOJT.activities[activityIndex].content.push({
            srno: updatedOJT.activities[activityIndex].content.length + 1,
            description: "",
        });
        setSelectedOJT(updatedOJT);
    };

    const deleteContent = (activityIndex, contentIndex) => {
        const updatedOJT = { ...selectedOJT };
        updatedOJT.activities[activityIndex].content.splice(contentIndex, 1);
        setSelectedOJT(updatedOJT);
    };

    const addActivity = () => {
        const updatedOJT = { ...selectedOJT };
        updatedOJT.activities.push({
            activity_ojt_title: `Enter New Activity ${updatedOJT.activities.length + 1}`,
            content: [],
        });
        setSelectedOJT(updatedOJT);
    };
      
      


    // ----------------------------------------------- OJA Integration Code ---------------------------------------
    const [ojaData, setOjaData] = useState([]);
    const [show2, setShow2] = useState(false);
    const [selectedOJA, setSelectedOJA] = useState(null);

    useEffect(() => {
        fetchOjaData();
    }, []);

    const fetchOjaData = async () => {
        try {
            const resp = await axios.get(`${base_url}/get_oja_info`);
            setOjaData(resp.data.create_oja);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteOjaData = async (_id) => {
        try {
            const resp = await axios.delete(`${base_url}/oja_data_delete/${_id}`);
            setOjaData(resp.data.create_oja);
            toast.success("OJA deleted successfully", { autoClose: 2000 });
            setTimeout(() => {
                window.location.reload();
               }, 500);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditOJA = async (_id) => {
        try {
            const resp = await axios.get(`${base_url}/get_oja_info_byids/${_id}`);
            setSelectedOJA(resp.data.create_oja);
            setShow2(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose2 = () => {
        setSelectedOJA(null);
        setShow2(false);
    };

    const handleUpdateOJA = async () => {
        try {
            await axios.put(`${base_url}/oja_details_updated/${selectedOJA._id}`, selectedOJA);
            toast.success("OJA updated successfully", { autoClose: 2000 });
            fetchOjaData();
            handleClose2();
        } catch (error) {
            console.error(error);
        }
    };

    const addContentOJA = (activityIndex) => {
        const updatedOJA = { ...selectedOJA };
        updatedOJA.activities[activityIndex].content.push({
            srno: updatedOJA.activities[activityIndex].content.length + 1,
            description: "",
        });
        setSelectedOJA(updatedOJA);
    };

    const deleteContentOJA = (activityIndex, contentIndex) => {
        const updatedOJA = { ...selectedOJA };
        updatedOJA.activities[activityIndex].content.splice(contentIndex, 1);
        setSelectedOJA(updatedOJA);
    };

    const addActivityOJA = () => {
        const updatedOJA = { ...selectedOJA };
        updatedOJA.activities.push({
            activity_oja_title: `Enter New Activity ${updatedOJA.activities.length + 1}`,
            content: [],
        });
        setSelectedOJA(updatedOJA);
    };


    // --------------------------------------------- INA Integration Code ------------------------------------------
    const [inaData, setInaData] = useState([]);
    const [show3, setShow3] = useState(false);
    const [selectedINA, setSelectedINA] = useState(null);

    useEffect(() => {
        fetchInaData();
    }, []);

    const fetchInaData = async () => {
        try {
            const resp = await axios.get(`${base_url}/get_ina_dataInfo`);
            setInaData(resp.data.create_ina);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteInaData = async (_id) => {
        try {
            const resp = await axios.delete(`${base_url}/ina_data_delete/${_id}`);
            setInaData(resp.data.create_ina);
            toast.success("INA deleted successfully", { autoClose: 2000 });
            setTimeout(() => {
                window.location.reload();
               }, 500);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditINA = async (_id) => {
        try {
            const resp = await axios.get(`${base_url}/get_ina_dataById/${_id}`);
            setSelectedINA(resp.data.create_ina);
            setShow3(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose3 = () => {
        setSelectedINA(null);
        setShow3(false);
    };

    const handleUpdateINA = async () => {
        try {
            await axios.put(`${base_url}/ina_details_updated/${selectedINA._id}`, selectedINA);
            toast.success("INA updated successfully", { autoClose: 2000 });
            fetchInaData();
            handleClose3();
        } catch (error) {
            console.error(error);
        }
    };

    const addContentINA = (activityIndex) => {
        const updatedINA = { ...selectedINA };
        updatedINA.activities[activityIndex].content.push({
            srno: updatedINA.activities[activityIndex].content.length + 1,
            description: "",
        });
        setSelectedINA(updatedINA);
    };

    const deleteContentINA = (activityIndex, contentIndex) => {
        const updatedINA = { ...selectedINA };
        updatedINA.activities[activityIndex].content.splice(contentIndex, 1);
        setSelectedINA(updatedINA);
    };

    const addActivityINA = () => {
        const updatedINA = { ...selectedINA };
        updatedINA.activities.push({
            activity_ina_title: `Enter New Activity ${updatedINA.activities.length + 1}`,
            content: [],
        });
        setSelectedINA(updatedINA);
    };



    function ViewOJT() {
        document.getElementById('ojt-lists').style.display = 'block';
        document.getElementById('oja-lists').style.display = 'none';
        document.getElementById('ina-lists').style.display = 'none';
    }

    function ViewOJA() {
        document.getElementById('ojt-lists').style.display = 'none';
        document.getElementById('oja-lists').style.display = 'block';
        document.getElementById('ina-lists').style.display = 'none';
    }

    function ViewINA() {
        document.getElementById('ojt-lists').style.display = 'none';
        document.getElementById('oja-lists').style.display = 'none';
        document.getElementById('ina-lists').style.display = 'block';
    }
    
    // console.log(ojtData.activities);
 

  return (
    <div>

        <style>
            {`
                body {
                    background-color: rgba(46, 7, 63, 0.1);
                    padding: 20px;
                }
                .category-btn button{
                width: 200px;
                }
                .view-Ojt-lists, .view-Oja-lists, .view-Ina-lists{
                // border: 2px solid #000;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                margin-bottom: 20px;
                }
                .actions-btn{
                width: 6rem;
                }
                #ojt-lists, #oja-lists, #ina-lists{
                display: none;
                }
                .ojt_details{
                // border: 1px solid rgba(0,0,0,0.2);
                padding: 1rem 1.5rem;
                border-radius: 5px;
                }
                .ojt_details .info-div-item{
                margin-bottom: 1rem;
                }
                .oja_details .info-div-item{
                margin-bottom: 1rem;
                }

                .activities-div{
                border: 1px solid rgba(0,0,0,0.2);
                padding: 1rem;
                border-radius: 5px;
                }
                .activity-block{
                border: 1px solid rgba(0,0,0,0.2);
                border-radius: 8px;
                padding: 14px;
                margin-bottom: 1rem;
                position: relative;
                }
                .btn-primary{
                background-color: #7A1CAC;
                width: fit-content;
                border: none;
                padding: 4px 12px !important;
                }
                .btn-success{
                background-color: #fff;
                border: 1px solid #7A1CAC;
                color: #7A1CAC;
                width: fit-content;
                padding: 4px 12px !important;
                font-weight: 400;
                }
                .btn-success:hover{
                border: 1px solid #2E073F;
                }
                .btn:hover{
                background-color: #2E073F;
                }
                .modal-header{
                background-color: #2E073F;
                color: #fff;
                }
                .modal-header button .btn-close{
                color: #fff;
                }
            `}
        </style>

        <Sidebar/>

        <section className="main-content-section">
            <Header/>

            <div className='header-div header-two'>
                <div className='title-name'>
                    <h5>View OJT, OJA and INA Lists</h5>
                    <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i class="fa-solid fa-caret-right"></i> View OJT, OJA and INA Lists </p>
                </div>
                <div className="category-btn">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={ViewOJT}>View OJT</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={ViewOJA}>View OJA</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" onClick={ViewINA}>View INA</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

             <div className="view-Ojt-lists" id="ojt-lists">
            <h5 style={{ marginBottom: "1.5rem" }}>Here's all OJT List</h5>

            <div className="all-ojt-list">
                <table className="table table-striped table-bordered" style={{ fontSize: "14px" }}>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>OJT Title</th>
                            <th>OJT Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        Array.isArray(ojtData) ? ojtData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.ojt_title}</td>
                                <td>{item.ojt_code}</td>
                                <td>
                                    {/* <button className="btn btn-primary" onClick={() => handleEditOJT(item._id)}>
                                        Edit
                                    </button> */}
                                    <Dropdown className='actions-btn'>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Action
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEditOJT(item._id)}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {deleteOjtData(item._id)}}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        )):[]
                    }
                    </tbody>
                </table>
            </div>

            {selectedOJT && (
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header className='modal-header' closeButton >
                        <Modal.Title>Edit OJT Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='ojt_details'>
                            <div className="info-div-item">
                            <label>OJT Title</label> 
                            <input
                                type="text"
                                value={selectedOJT.ojt_title}
                                onChange={(e) => setSelectedOJT({ ...selectedOJT, ojt_title: e.target.value })}
                                placeholder="Enter OJT Title"
                                className="form-control"
                            />
                            </div>
                            <div className="info-div-item">
                            <label>OJT Code</label>
                            <input
                                type="text"
                                value={selectedOJT.ojt_code}
                                onChange={(e) => setSelectedOJT({ ...selectedOJT, ojt_code: e.target.value })}
                                placeholder="Enter OJT Code"
                                className="form-control"
                            />
                            </div>

                            {selectedOJT.activities.map((activity, activityIndex) => (
                                <div key={activityIndex} className="activity-block">
                                    <button
                                        style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '10px',
                                        backgroundColor: '#ffffff',
                                        color: 'red',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        width: '24px',
                                        height: '24px',
                                        }}
                                        // onClick={() => handleRemoveActivity(activityIndex)}
                                        onClick={() => {
                                            const updatedActivities = [...selectedOJT.activities];
                                            updatedActivities.splice(activityIndex, 1); // Remove the activity at activityIndex
                                            setSelectedOJT({ ...selectedOJT, activities: updatedActivities });
                                        }}
                                    >
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>

                                    <h5>Activity {activityIndex + 1}</h5>
                                    <div className="info-div-item">
                                    <label>Activity title</label>
                                    <input
                                        type="text"
                                        value={activity.activity_ojt_title}
                                        onChange={(e) => {
                                            const updatedActivities = [...selectedOJT.activities];
                                            updatedActivities[activityIndex].activity_ojt_title = e.target.value;
                                            setSelectedOJT({ ...selectedOJT, activities: updatedActivities });
                                        }}
                                        placeholder="Activity Title"
                                        className="form-control"
                                    />
                                    </div>

                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activity.content.map((content, contentIndex) => (
                                                <tr key={contentIndex}>
                                                    <td>{contentIndex + 1}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={content.description}
                                                            onChange={(e) => {
                                                                const updatedContent = [...activity.content];
                                                                updatedContent[contentIndex].description = e.target.value;
                                                                const updatedActivities = [...selectedOJT.activities];
                                                                updatedActivities[activityIndex].content = updatedContent;
                                                                setSelectedOJT({ ...selectedOJT, activities: updatedActivities });
                                                            }}
                                                            placeholder="Enter Description"
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => deleteContent(activityIndex, contentIndex)}
                                                        >
                                                            delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button className="btn btn-primary" onClick={() => addContent(activityIndex)}>
                                        Add Content
                                    </button>
                                </div>
                            ))}

                            <button className="btn btn-success mt-3" onClick={addActivity}>
                                Add Activity
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>  
                    </Modal.Footer>
                </Modal>
            )}
                </div>


                <div className="view-Oja-lists" id="oja-lists">
            <h5 style={{ marginBottom: "1.5rem" }}>Here's all OJA List</h5>

            <div className="all-oja-list">
                <table className="table table-striped table-bordered" style={{ fontSize: "14px" }}>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>OJA Title</th>
                            <th>OJA Code</th>
                            <th>Rating range</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(ojaData) ? ojaData.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.oja_title}</td>
                                    <td>{item.oja_code}</td>
                                    <td>{item.rating_range_oja}</td>
                                    <td>
                                        <Dropdown className="actions-btn">
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Action
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleEditOJA(item._id)}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => deleteOjaData(item._id)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            )):[]}
                    </tbody>
                </table>
            </div>

            {selectedOJA && (
                <Modal show={show2} onHide={handleClose2} size="lg">
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title>Edit OJA Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="oja_details">
                            <div className="info-div-item">
                                <label>OJA Title</label>
                                <input
                                    type="text"
                                    value={selectedOJA.oja_title}
                                    onChange={(e) => setSelectedOJA({ ...selectedOJA, oja_title: e.target.value })}
                                    placeholder="Enter OJA Title"
                                    className="form-control"
                                />
                            </div>
                            <div className="info-div-item">
                                <label>OJA Code</label>
                                <input
                                    type="text"
                                    value={selectedOJA.oja_code}
                                    onChange={(e) => setSelectedOJA({ ...selectedOJA, oja_code: e.target.value })}
                                    placeholder="Enter OJA Code"
                                    className="form-control"
                                />
                            </div>
                            <div className="info-div-item">
                                <label>Select Rating Range</label>
                                <select
                                    value={selectedOJA.rating_range_oja}
                                    onChange={(e) => setSelectedOJA({ ...selectedOJA, rating_range_oja: e.target.value })}
                                    className="form-control"
                                >
                                    <option>1 -- 5</option>
                                    <option>1 -- 10</option>
                                </select>
                            </div>

                            {selectedOJA.activities.map((activity, activityIndex) => (
                                <div key={activityIndex} className="activity-block">
                                    <h5>Activity {activityIndex + 1}</h5>
                                    <button
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "10px",
                                            backgroundColor: "#ffffff",
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                            width: "24px",
                                            height: "24px",
                                        }}
                                        onClick={() => {
                                            const updatedActivities = [...selectedOJA.activities];
                                            updatedActivities.splice(activityIndex, 1);
                                            setSelectedOJA({ ...selectedOJA, activities: updatedActivities });
                                        }}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                    <div className="info-div-item">
                                        <label>Activity title</label>
                                        <input
                                            type="text"
                                            value={activity.activity_oja_title}
                                            onChange={(e) => {
                                                const updatedActivities = [...selectedOJA.activities];
                                                updatedActivities[activityIndex].activity_oja_title = e.target.value;
                                                setSelectedOJA({ ...selectedOJA, activities: updatedActivities });
                                            }}
                                            placeholder="Activity Title"
                                            className="form-control"
                                        />
                                    </div>

                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activity.content.map((content, contentIndex) => (
                                                <tr key={contentIndex}>
                                                    <td>{contentIndex + 1}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={content.description}
                                                            onChange={(e) => {
                                                                const updatedContent = [...activity.content];
                                                                updatedContent[contentIndex].description = e.target.value;
                                                                const updatedActivities = [...selectedOJA.activities];
                                                                updatedActivities[activityIndex].content = updatedContent;
                                                                setSelectedOJA({ ...selectedOJA, activities: updatedActivities });
                                                            }}
                                                            placeholder="Enter Description"
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => deleteContentOJA(activityIndex, contentIndex)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button className="btn btn-primary" onClick={() => addContentOJA(activityIndex)}>
                                        Add Content
                                    </button>
                                </div>
                            ))}

                            <button className="btn btn-success mt-3" onClick={addActivityOJA}>
                                Add Activity
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdateOJA}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={handleClose2}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
                </div>

            <div className='view-Ina-lists' id='ina-lists'>
                <h5 style={{marginBottom:"1.5rem"}}>Here's all INA List</h5>

                <div className='all-Ina-list'>
                    <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} >
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>INA Title</th>
                                <th>INA Code</th>
                                <th>Rating range</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                Array.isArray(inaData) ? inaData.map((item, index) => (
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{item.ina_title}</td>
                                        <td>{item.ina_code}</td>
                                        <td>{item.rating_range_ina}</td>
                                        <td>
                                        <Dropdown className='actions-btn'>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Action
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEditINA(item._id)}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => deleteInaData(item._id)}>Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </td>
                                    </tr>
                                )):[]
                            }
                        </tbody>
                    </table>
                </div>

                {selectedINA && (
                <Modal show={show3} onHide={handleClose3} size="lg">
                    <Modal.Header className="modal-header" closeButton>
                        <Modal.Title>Edit INA Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="oja_details">
                            <div className="info-div-item">
                                <label>INA Title</label>
                                <input
                                    type="text"
                                    value={selectedINA.ina_title}
                                    onChange={(e) => setSelectedINA({ ...selectedINA, ina_title: e.target.value })}
                                    placeholder="Enter INA Title"
                                    className="form-control"
                                />
                            </div>
                            <div className="info-div-item">
                                <label>INA Code</label>
                                <input
                                    type="text"
                                    value={selectedINA.ina_code}
                                    onChange={(e) => setSelectedINA({ ...selectedINA, ina_code: e.target.value })}
                                    placeholder="Enter INA Code"
                                    className="form-control"
                                />
                            </div>
                            <div className="info-div-item">
                                <label>Select Rating Range</label>
                                <select
                                    value={selectedINA.rating_range_ina}
                                    onChange={(e) => setSelectedINA({ ...selectedINA, rating_range_ina: e.target.value })}
                                    className="form-control"
                                >
                                    <option>1 -- 5</option>
                                    <option>1 -- 10</option>
                                </select>
                            </div>

                            {selectedINA.activities.map((activity, activityIndex) => (
                                <div key={activityIndex} className="activity-block">
                                    <h5>Activity {activityIndex + 1}</h5>
                                    <button
                                        style={{
                                            position: "absolute",
                                            top: "5px",
                                            right: "10px",
                                            backgroundColor: "#ffffff",
                                            color: "red",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                            width: "24px",
                                            height: "24px",
                                        }}
                                        onClick={() => {
                                            const updatedActivities = [...selectedINA.activities];
                                            updatedActivities.splice(activityIndex, 1);
                                            setSelectedINA({ ...selectedINA, activities: updatedActivities });
                                        }}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                    <div className="info-div-item">
                                        <label>Activity title</label>
                                        <input
                                            type="text"
                                            value={activity.activity_ina_title}
                                            onChange={(e) => {
                                                const updatedActivities = [...selectedINA.activities];
                                                updatedActivities[activityIndex].activity_ina_title = e.target.value;
                                                setSelectedINA({ ...selectedINA, activities: updatedActivities });
                                            }}
                                            placeholder="Activity Title"
                                            className="form-control"
                                        />
                                    </div>

                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activity.content.map((content, contentIndex) => (
                                                <tr key={contentIndex}>
                                                    <td>{contentIndex + 1}</td>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={content.description}
                                                            onChange={(e) => {
                                                                const updatedContent = [...activity.content];
                                                                updatedContent[contentIndex].description = e.target.value;
                                                                const updatedActivities = [...selectedINA.activities];
                                                                updatedActivities[activityIndex].content = updatedContent;
                                                                setSelectedINA({ ...selectedINA, activities: updatedActivities });
                                                            }}
                                                            placeholder="Enter Description"
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger"
                                                            onClick={() => deleteContentINA(activityIndex, contentIndex)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <button className="btn btn-primary" onClick={() => addContentINA(activityIndex)}>
                                        Add Content
                                    </button>
                                </div>
                            ))}

                            <button className="btn btn-success mt-3" onClick={addActivityINA}>
                                Add Activity
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdateINA}>
                            Update
                        </Button>
                        <Button variant="secondary" onClick={handleClose3}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            </div>
        </section>
      
    </div>
  )
}

export default ViewOJTOJAINA
