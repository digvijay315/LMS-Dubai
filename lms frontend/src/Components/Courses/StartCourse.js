import React from 'react'
import SidebarTwo from './SidebarTwo'
import TopBar from './TopBar'
import { useLocation, useNavigate } from 'react-router-dom';


function StartCourse() {

    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { course } = location.state || {};  // Fallback to empty object if no state is passed
    const chapter=course.add_Content;

    const handleStartClick = () => {
        navigate('/curriculum', { state: { course: { ...course, id: course._id } } });
    };

 console.log(chapter);
 
    
  return (
    
    <div style={{backgroundColor:"rgba(46, 7, 63, 0.1)"}}>

        <style>{`
        .sidebartwo-div{
            width: 22%;
            height: 100%;
            position: fixed;
            left: 0px;
            top: 0px;
            }
            .top-main-content{
            width: 78%;
            padding: 1rem;
            padding-left: 0px;
            height: 100vh;
            position: fixed;
            right: 0px;
            overflow: scroll;
            }
            .main-courses-div{
            display: flex;
            height: 100vh;
            }
             .main-content-div{
            background-color: #ffffff;
            border-radius: 10px;
            margin-top: 1rem;
            padding: 1rem;
            }
            .main-course-content{
            // border: 2px solid #000;
            width: 90%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            }
            .course-info-div{
            border: 1px solid rgba(0,0,0,0.2);
            width: 60%;
            padding: 1.3rem;
            border-radius: 10px;
            }
            .enroll-div{
            border: 1px solid rgba(0,0,0,0.2);
            width: 36%;
            border-radius: 10px;
            padding: 1.5rem;
            height: 600px;
            }
            .overview-div{
            border-bottom: 1px solid rgba(0,0,0,0.1);
            margin-bottom: 1rem;
            }
            .overview-div span{
            border-bottom: 2px solid #000;
            }
            .upper-content img{
            width: 100%;
            height: 300px;
            border-radius: 14px;
            margin-bottom: 1rem;
            }
            .aboutCourse-div button{
            width: 100%;
            background-color: #7A1CAC;
            margin-bottom: 1rem;
            }
            .aboutCourse-div button:hover{
            background-color: #481066;
            }
            .extra-info{
            border: 1px solid rgba(0,0,0,0.1);
            font-size: 14px;
            padding: 1.5rem;
            border-radius: 10px;
            margin-top: 2rem;
            }
            .enroll-btn{
            margin-top: 2rem;
            }
            .enroll-btn button{
            width: 100%;
            background-color: #2E073F;
            border-radius: 5px;
            text-transform: uppercase;
            height: 2.5rem;
            }
            .main-div{
            border: 1px solid rgba(0,0,0,0.2);
            padding: 1rem;
            display: flex;
            border-radius: 8px;
            transition: all 0.3s ease;
            margin: 1rem 0;
            }
            .main-div:hover{
            border-color: #ffffff;
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
            }
            .courseImg-div video{
            width: 130px;
            heigt: 50px;
            margin-right: 1rem;
            border-radius: 6px;
            }
            .content-div p{
            font-size: 12px;
            opacity: 0.7;
            margin: 0px;
            }
        `}</style>

        <div className='main-courses-div'>
            <div className='sidebartwo-div'>
                <SidebarTwo />
            </div>

            <section className='top-main-content'>
                <div>
                    <TopBar/>
                </div>
                <div className='main-content-div'>
                   <div className='overview-div'>
                        <span>Overview</span>
                   </div>
                   <div className='main-course-content'>
                      <div className='course-info-div'>
                        <div className='upper-content'>
                            <img src ={`${course.thumbnail_upload[0]}`} />
                            <div className='aboutCourse-div'>
                                <h3>{course.course_duration} Hrs</h3>
                                <button onClick={handleStartClick} >START</button>
                                <h5>{course.course_title_main}</h5>
                                <p>{course.description}</p>
                            </div>
                        </div>
                        <div style={{marginTop:"20px"}}>
                            <h6>Steps:</h6>
                        </div>
                    <div>
                                {Array.isArray(course.sections) && course.sections.length > 0 ? (
                                        course.sections.map((section, sectionIndex) => (
                                            <div key={sectionIndex} className='section-div'>
                                                <h5>{section.section_title}</h5>
                                                {Array.isArray(section.add_Content) && section.add_Content.length > 0 ? (
                                                    section.add_Content.map((item, index) => (
                                                        <div className='main-div' key={index}>
                                                            <div className='courseImg-div'>
                                                                {item.video_file.length > 0 && (
                                                                    <video controls src={item.video_file[0]} />
                                                                )}
                                                            </div>
                                                            <div className='content-div'>
                                                                <h6>{item.chapter_title}</h6>
                                                                <p>{item.chapter_description}</p>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No chapters available in this section.</p>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No sections available.</p>
                                    )}

                            </div>
                      </div>
  
                      {/* <div className='enroll-div'>
                        <h5>Your Session</h5>

                        <div className='extra-info'>
                            <h6>[BU] Enova - Data for Experts</h6>
                            <div>
                                <p style={{marginBottom:"0px", fontSize:"14px", opacity:"0.7"}}> <i class="fa-regular fa-calendar"></i> Apr 23, 2024 - No end Date</p>
                            </div>
                        </div>

                        <div className='enroll-btn'>
                            <button>Enroll</button>
                        </div>

                      </div> */}
                   </div>
                </div>
            </section>
       </div>
      
    </div>
  )
}

export default StartCourse