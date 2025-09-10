import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import { base_url } from '../Utils/base_url';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function ConductCAT() {

    const navigate = useNavigate();
    const handleTakeCAT = (catId) => {
        navigate(`/take-cat/${catId}`);
    };

    const [catData, setCatData] = useState([]);
    const fetchCATtData = async () => {
        try {
            const response = await axios.get(`${base_url}/get_all_cat`);
            console.log(response);
            setCatData(response.data.data);
        } catch (error) {
            console.log(error);
            toast.error("Error fetching CAT data");
        }
    }

    useEffect(() => {
        fetchCATtData();
    }, []);

  return (
    <div>
        <style>
            {`
            body{
            background-color: rgba(46, 7, 63, 0.1);
            padding: 20px;
            }
            .conduct-cat-container{
            background-color: #ffffff;
            padding: 1rem;
            border-radius: 10px;
            }
             .title-text{
            background-color: #2E073F;
            color: #ffffff;
            height: 8rem;
            padding: 2rem;
            border-top-right-radius: 1rem;
            border-top-left-radius: 1rem;
            }
            .assessment-data{
            padding: 2rem;
            }
            .assessment-header{
                display: flex;
                justify-content: space-between;
                padding: 8px 2rem;
                border-radius: 1.5rem;
                border: 1px solid #2E073F;
                margin-bottom: 2rem;
            }
            .assessment-items{
                border-bottom: 1px solid rgba(0,0,0,0.4);
                display: flex;
                justify-content: space-between;
                margin: 1rem;
                padding: 5px 1rem;
            }
            h5{
                margin-bottom: 0px;
            }
            `}
        </style>

    <div>
        <Sidebar/>

        <section className="main-content-section">
            <Header/>

            <div className='conduct-cat-container'>
                <div className="title-text">
                    <h2>Conduct <span style={{ fontWeight: "300" }}>CAT</span></h2>
                </div>

                <div className='take-asessment-form'>
                    <div className='assessment-data'>
                        <div className='assessment-header'>
                            <h5>CAT name</h5>
                            <h5>Actions</h5>
                        </div>

                        {Array.isArray(catData) && catData.length > 0 ? (
                            catData.map((item, index) => (
                                <div className='assessment-items' key={item._id}>
                                    <div className='assessment-titles'>
                                        <h6 style={{marginBottom:"0px"}}>{index + 1}. {item.title}</h6>
                                    </div>
                                    <div className='assessment-actions' style={{display:"flex", justifyContent:"space-between", width:"240px"}}>
                                        <p style={{marginBottom:"0px"}}> <i class="fa-regular fa-clock"></i> {item.timeLimit}</p>
                                        <p style={{marginBottom:"0px", cursor:"pointer", color:"#036bfc"}} onClick={() => handleTakeCAT(item._id)} > <i class="fa-regular fa-pen-to-square"></i> Take CAT</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{margin:"1rem 2rem"}}>
                                <h5>No CAT available.</h5>
                            </div>
                        )}                              
                    </div>
                </div>
            </div>
        </section>
    </div>
     <ToastContainer/> 
    </div>
  )
}

export default ConductCAT
