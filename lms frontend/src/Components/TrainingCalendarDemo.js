import React, {useEffect, useState, useRef} from 'react';
import TrainingCalendar from './TrainingCalendar';
import Header from './Header';
import Sidebar from './Sidebar';
import 'datatables.net'; // Import DataTables
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { base_url } from './Utils/base_url';


function TrainingCalendarDemo() {
  
  return (

    <div >

      <style>
        {`
        body {
            background-color: rgba(46, 7, 63, 0.1);
            padding: 20px;
        }
        #create-training-btn{
        width: 15rem;
        }
        #create-training-btn a{
        text-decoration: none;
        color: #ffffff;
        }
        `}
      </style>

      <Sidebar/>

        <section className="main-content-section">

            <Header/>

            <div className='header-div header-two'>
                <div className='title-name'>
                    <h5>Training Calendar</h5>
                    <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i class="fa-solid fa-caret-right"></i> Training Calendar</p>
                </div>
                <div className="category-btn">
                    <button id='create-training-btn'> <NavLink to={'/AddEvent'}>Create New Training</NavLink> </button>
                </div>
            </div>

           <section className='calendar-view'>

             <div className='calendar-div' style={{backgroundColor:"#ffffff", padding:"1.5rem", borderRadius:"10px"}}>
                <TrainingCalendar />
             </div>
           </section>

        </section>
      
    </div>
  )
}

export default TrainingCalendarDemo;
