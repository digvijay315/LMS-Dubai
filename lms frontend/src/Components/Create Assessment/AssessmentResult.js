import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { useNavigate } from 'react-router-dom';

function AssessmentResult() {

    const navigate = useNavigate();
    const [assessment, setAssessmentData] = useState([]);
    const fetchCATData = async () => {
        try {
          const response = await axios.get(`${base_url}/assessment_data_fetch`);
          console.log(response);
          setAssessmentData(response.data.assessments);
        } catch (error) {
          console.log('Error fetching Assessment data:', error);
        }
      };

      useEffect(() => {
        fetchCATData();
      }, [])


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
            height: 6rem;
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

                <div className='header-div header-two'>
                    <div className='title-name'>
                        <h5>Assessment Result</h5>
                        <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i class="fa-solid fa-caret-right"></i>Assessment Result</p>
                    </div>
                </div>

                <div className='take-assessment-container'>
                    <div className="title-text">
                        <h2>Assessment <span style={{ fontWeight: "300" }}>Result Lists</span></h2>
                    </div> 

                    <div className='take-asessment-form'>
                        <div className='assessment-data'>
                            <h5>All available Assessment</h5>

                            {Array.isArray(assessment) && assessment.length > 0 ? (
                                assessment.map((item, index) => (
                                    <div className='assessment-items' key={item._id}>
                                        <div className='assessment-titles'>
                                            <h6 style={{marginBottom:"0px"}}>{index + 1}. {item.assessment_title}</h6>
                                        </div>
                                        <div className='assessment-actions' style={{display:"flex", justifyContent:"space-between"}}>
                                            <p style={{marginBottom:"0px"}}> <i class="fa-regular fa-clock"></i> {item.assessment_timer}</p>
                                            {/* <p style={{marginBottom:"0px", cursor:"pointer", color:"#036bfc"}} > <i class="fa-regular fa-pen-to-square"></i> See result</p> */}
                                            <p onClick={() => navigate(`/assessment_result/${item._id}`)} style={{marginBottom:"0px", cursor:"pointer", color:"#036bfc"}}>
                                                <i className="fa-regular fa-pen-to-square"></i> See result
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{margin:"1rem 2rem"}}>
                                    <h5>No Assessment Available.</h5>
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

export default AssessmentResult
