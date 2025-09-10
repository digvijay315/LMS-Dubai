import React from 'react'
import MenuItem from '../MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { NavLink } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import logo from '../Images/logo1.png'


function SidebarTwo() {
  return (
    <div>
        <style>{`
        .sidebarTwo-content{
        height: 100vh;
        padding: 1rem;
        }
         .dash-options{
        display: flex;
        align-items: center;
        border-radius: 5px;
        padding-left: 10px;
        margin: 10px 0;
        height: 3rem;
        cursor: pointer;
        // border: 1px solid #000;
        }
        .dash-options:hover{
        background-color: rgba(46, 7, 63, 0.2);
        }
        .dash-options h5{
        margin: 0 1rem;
        }
        .dash-options h5 a{
        text-decoration: none;
        color: #000;
        }
        .dash-Menu{
        border-radius: 10px;
        background-color: #ffffff;
        padding: 1rem;
        height: 100%;
        }
        .title-div{
        border-bottom: 2px solid #7A1CAC;
        }
        .title-div h4{
        font-weight: 600;
        color: #7A1CAC;
        }
        .title-div h4 span{
        font-weight: 300;
        }
        svg{
        color: #7A1CAC;
        }
        .learnOptions-div p{
        padding-left: 10px;
        margin: 0px;
        }
        .learnOptions-div{
        margin-top: 1.5rem;
        }
        `}</style>

    <div className='sidebarTwo-content'>
        <div className='dash-Menu'>
            <div className='title-div'>
                <img src={logo} style={{height:"150px",width:"200px",marginTop:"-40px"}}></img>
            </div>
            <div className='dash-options'>
                <HomeIcon/>
                <h5><NavLink to={'/maincourse'}>Home</NavLink></h5>   
            </div>
            <div className='dash-options'>
                <DescriptionIcon/>
                <h5><NavLink to={'/mycareerjourney'}>My Career Journey</NavLink></h5>   
            </div>
            <div className='dash-options'>
                <DescriptionIcon/>
                <h5><NavLink to={'/curriculum'}>Course Curriculum</NavLink></h5>   
            </div>

            <div className='learnOptions-div'>
                <p>Learn</p>
                <div className='dash-options'>
                    <LibraryBooksIcon/>
                    <h5> <NavLink to={'/myLibrary'}>My Library</NavLink> </h5>   
                </div>
            </div>
            
        </div>
    </div>
      
    </div>
  )
}

export default SidebarTwo
