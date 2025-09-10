import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { useNavigate } from 'react-router-dom';

function TakeAssessment() {

    const navigate = useNavigate();

    const [assessment, setAssessment] = useState([]);
    const fetchAssessmentData = async () => {
        try {
            const response = await axios.get(`${base_url}/assessment_data_fetch`);
            console.log(response);
            setAssessment(response.data.assessments);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() =>{
        fetchAssessmentData();
    }, []);

  return (
    <div>
        <style>
            {`
            body{
            background-color: rgba(46, 7, 63, 0.1);
            padding: 20px;
            }
            .take-assessment-container{
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
            h5 {
                margin-bottom: 0px;
                }
            `}
        </style>
        
        <div>
            <Sidebar/>
            <section className="main-content-section">
                <Header/>
                
                <div className='take-assessment-container'>
                    <div className="title-text">
                        <h2>Take <span style={{ fontWeight: "300" }}>Assessment</span></h2>
                    </div>

                    <div className='take-asessment-form'>
                        <div className='assessment-data'>
                        <div className='assessment-header'>
                            <h5>Assessment name</h5>
                            <h5>Actions</h5>
                        </div>

                        {Array.isArray(assessment) && assessment.length > 0 ? (
                            assessment.map((item, index) => (
                                <div className='assessment-items' key={item._id}>
                                    <div className='assessment-titles'>
                                        <h6 style={{marginBottom:"0px"}}>{index + 1}. {item.assessment_title}</h6>
                                    </div>
                                    <div className='assessment-actions' style={{display:"flex", justifyContent:"space-between", width:"240px"}}>
                                        <p style={{marginBottom:"0px"}}> <i class="fa-regular fa-clock"></i> {item.assessment_timer}</p>
                                        <p style={{marginBottom:"0px", cursor:"pointer", color:"#036bfc"}} onClick={() => navigate(`/takeAssessmentView/${item._id}`)}> <i class="fa-regular fa-pen-to-square"></i> Take assessment</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{margin:"1rem 2rem"}}>
                                <h5>No assessment available.</h5>
                            </div>
                        )}           
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
      
    </div>
  )
}

export default TakeAssessment
