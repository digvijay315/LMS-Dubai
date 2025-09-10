import React from 'react'
import SidebarTwo from './SidebarTwo'
import TopBar from './TopBar'
import { NavLink } from 'react-router-dom'
import LearningHistoryCourseList from './LearningHistoryCourseList'

function LearningHistoryCourse() {
  return (
    <div style={{backgroundColor:"rgba(46, 7, 63, 0.1)"}}>

        <style>
            {`
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
            .category-div button{
            border-radius: 1.5rem;
            margin: 5px;
            }
            .category-div button:nth-child(1){
            width: 4rem;
            height: 2.5rem;
            background-color: #7A1CAC;
            }
            .category-div button:nth-child(2){
            width: 10rem;
            height: 2.5rem;
            background-color: #ffffff;
            border: 1px solid #7A1CAC; 
            color: #7A1CAC;
            }
            .category-div button:nth-child(3){
            width: 12rem;
            height: 2.5rem;
            background-color: #ffffff;
            border: 1px solid #7A1CAC; 
            color: #7A1CAC;
            }
            .category-div button:nth-child(2):hover,
            .category-div button:nth-child(3):hover{
            background-color: #7A1CAC;
            border: 1px solid #7A1CAC; 
            color: #ffffff;
            }
            .main-content-div{
            background-color: #ffffff;
            border-radius: 10px;
            margin-top: 1rem;
            padding: 1rem;
            }
           
            .mylibrary-content, .all-content-options{
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 10px;
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
            margin: 0 2rem;
            padding: 2rem 2rem;
            }
            .all-courses-list{
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 10px;
            box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
            margin: 2rem;
            }
            .activity-options{
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
            }
            .act-items{
            border: 1px solid rgba(0,0,0,0.2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            width: 32%;
            padding: 1rem;
            }
            .activity-options img{
            width: 2.5rem;
            height: 2.5rem;
            margin-right: 1rem;
            }
            .content-div h6, p{
            margin: 0;
            }
            .content-div h6 span{
            font-weight: 400;
            }
            .all-content-options{
            display: flex;
            justify-content: space-evenly;
            margin-top: 2rem;
            }
            .all-content-options button{
            width: 22%;
            height: 3rem;
            background-color: rgba(46, 7, 63, 0.08);
            color: #7A1CAC;
            }
            .all-content-options button:hover{
            background-color: #7A1CAC;
            color: #ffffff;
            }
            .all-content-options button a {
            text-decoration: none;
            color: #7A1CAC; /* Default text color */
            }

            /* Hover and active state */
            .all-content-options button:hover a,
            .all-content-options button a.active {
            background-color: #7A1CAC;
            color: #ffffff;
            }

            /* Button hover and active background */
            .all-content-options button:hover,
            .all-content-options button a.active {
            background-color: #7A1CAC;
            color: #ffffff;
            }
            `}
        </style>

        <div className='main-courses-div'>
            <div className='sidebartwo-div'>
                <SidebarTwo />
            </div>

            <section className='top-main-content'>
                <div>
                    <TopBar/>
                </div>
                <div className='main-content-div'>
                    <div className='mylibrary-content'>
                        <div>
                            <h2>My Library</h2>
                        </div>
                        <div className='activity-options'>
                            <div className='weekly-goal act-items'>
                                <img src='9603388.png' />
                                <div className='content-div'>
                                    <h6>Weekly goal <span>(Oct 07 to Oct 16)</span> </h6>
                                    <p style={{opacity: 0.7}}> 0/120 mins </p>
                                </div>
                            </div>
                            <div className='skills-div act-items'>
                                <img src='11791780.png' />
                                <div className='content-div'>
                                    <h6>Skills </h6>
                                    <p style={{opacity: 0.7}}> 12 followed skills </p>
                                </div>
                            </div>
                            <div className='skill-evaluations act-items'>
                                <img src='12158023.png' />
                                <div className='content-div'>
                                    <h6>Skill Evaluations </h6>
                                    <p style={{opacity: 0.7}}> 0 evaluations </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className='all-activity-content'>
                        <div className='all-content-options'>
                           <button> <NavLink to={'/progreesCourse'}>In Progress (1)</NavLink> </button>
                           <button> <NavLink to={'/savedCourse'}>Saved (10)</NavLink> </button>
                           <button>My Collections</button>
                           <button style={{backgroundColor:"#7A1CAC", color:"#ffffff"}}><NavLink to={'/learningHistory'}>Learning History</NavLink></button>
                        </div>

                        <div className='all-courses-list'>
                            <LearningHistoryCourseList/>
                        </div>
                    </section>
                </div>
            </section>
       </div>
      
    </div>
  )
}

export default LearningHistoryCourse
