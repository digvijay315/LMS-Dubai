import React from 'react'
import SidebarTwo from './SidebarTwo'
import TopBar from './TopBar'
import TopPickCourse from './TopPickCourse'

function MyCareerJourney() {
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
            padding: 1.5rem;
            }
            .profile-div, .top-picks-courses{
            border: 1px solid rgba(0,0,0,0.2);
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
            padding: 2rem;
            border-radius: 8px;
            }
            .profile-div{
            margin-bottom: 1.5rem;
            }
            .profileInfo-div{
            border: 1px solid rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            width: 25%;
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 8px;
            }
            .profile-photo-div img{
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            margin-right: 20px;
            }
            .info-content-div{
            padding-top: 1rem;
            }
            .MuiBox-root {
            padding: 0;
            padding-bottom: 1rem;
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
                   <div className='profile-div'>
                        <div className='titleName-div'>
                            <h3>My Career Journey</h3>
                        </div>
                        <div className='info-section'>
                            <div className='profileInfo-div'>
                                <div className='profile-photo-div'>
                                    <img src='image.png' />
                                </div>
                                <div className='info-content-div'>
                                    <h5>Vivek Gupta</h5>
                                    <p>See Profile</p>
                                </div>
                            </div>
                        </div>
                   </div>

                   <div className='top-picks-courses' style={{height: "450px"}}>
                        <div className='pick-courses-div'>
                            <TopPickCourse/>
                        </div>
                   </div>
                </div>
            </section>
       </div>
    </div>
  )
}

export default MyCareerJourney
