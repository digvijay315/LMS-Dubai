import '../StyleCode/CreateCategoryList.css';
import Sidebar from './Sidebar';
import Header  from './Header';
import Textedit from './Textedit';

function AddNotice() {
    return (
        <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>
            
            <Sidebar />

            <section className='main-content-section'>

                <Header />

                <div className='add-new-Catgory'>
                    <div className='adding-course-div' style={{width: "100%"}}>
                       <h5 style={{marginBottom: "1rem"}}>Add New notice</h5> 
                       <div className="inputs-div">
                            <div className="info-div">
                                <label htmlFor="title">Title</label>
                                <input type="text" placeholder='Notice Title' />
                            </div>
                            <div className="info-div">
                                <label htmlFor="parent-category">Type</label>
                                <select name="parent-category" id="parent-category" placeholder='Select none for parent'>
                                    <option value="programming">Students</option>
                                    <option value="digital-marketing">instructors </option>
                                    <option value="web-dev">Students and Instructors</option>
                                    <option value="data-science">General Notice</option>
                                    <option value="cyber-security">Academic Notice</option>
                                    <option value="event">Event Notice</option>
                                    <option value="urgent">Urgent Notice</option>
                                    <option value="policy">Policy Notice</option>
                                </select>
                            </div>
                            
                       </div>

                       <label htmlFor="message">Message</label>

                        <Textedit/>
                       
                    </div>

                </div>

            </section>
        </div>
    );
}

export default AddNotice;