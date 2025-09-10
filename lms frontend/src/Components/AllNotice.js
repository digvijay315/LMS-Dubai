import '../StyleCode/AllSubjectList.css';
import Sidebar from './Sidebar';
import Header from './Header';
import { NavLink } from 'react-router-dom';

function AllNotice() {
    return (
        <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>

            <Sidebar />

            <section className='main-content-section'>

                <Header />

            <div className='header-div header-two'>
                <div className='title-name'>
                    <h5>Notice List</h5>
                    <p style={{opacity: "0.5"}}>All Notice Here</p>
                </div>
                <div className="category-btn">
                    <button> <NavLink to={'/createSubject'}>Add Notice</NavLink> </button>
                </div>
            </div>

            <div className='courses-list-section'>
                <table style={{padding: "1rem"}} className='all-notice-table'>
                    <thead>
                        <tr style={{borderTop: "none"}}>
                            <th style={{paddingRight: "14rem"}}>Notice title</th>
                            <th style={{paddingRight: "5rem"}}>Message</th>
                            <th style={{paddingRight: "5rem"}}>Type</th>
                            <th style={{paddingRight: "14rem"}}>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{fontWeight: "500"}} className='course-td'>
                                New Private Course Published
                            </td>
                            <td><button className='view-notice'>View notice</button></td>
                            <td>Students and instructors</td>
                            <td>
                                2018-02-05
                            </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "500"}} className='course-td'>
                            New Course: Advanced JavaScript
                            </td>
                            <td><button className='view-notice'>View notice</button></td>
                            <td>All Students</td>
                            <td>
                            2023-10-26
                            </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td style={{fontWeight: "500"}} className='course-td'>
                            Guest Lecture: AI Ethics
                            </td>
                            <td><button className='view-notice'>View notice</button></td>
                            <td>All Students and Faculty</td>
                            <td>
                                2022-12-01
                            </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        Workshop: Data Science Bootcamp
                        </td>
                        <td><button className='view-notice'>View notice</button></td>
                            <td>All Students</td>
                            <td>
                               2020-11-20 
                            </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        Webinar: Future of Blockchain
                        </td>
                        <td><button className='view-notice'>View notice</button></td>
                            <td>All Students</td>
                            <td>
                                2021-10-23
                            </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                        <tr>
                        <td style={{fontWeight: "500"}} className='course-td'>
                        Hackathon: Innovate 2023
                        </td>
                        <td><button className='view-notice'>View notice</button></td>
                            <td>All Students and Alumni</td>
                            <td>
                                2024-05-23x
                            </td>
                            <td>
                                <button className='edit-btn'><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className='delete-btn'><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </section>
        </div>
    );
}

export default AllNotice;