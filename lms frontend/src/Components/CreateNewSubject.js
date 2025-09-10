import '../StyleCode/CreateNewSubject.css';
import Sidebar from './Sidebar';
import Header from './Header';
import Textedit from './Textedit';

function CreateNewSubject() {
    return (
        <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>
            
            <Sidebar />

            <section className='main-content-section'>

                <Header />

                <div className='add-new-Catgory'>
                    <div className='adding-course-div'>
                       <h5 style={{marginBottom: "1rem"}}>Add New Subject</h5> 
                       <div className="inputs-div">
                            <div className="info-div">
                                <label htmlFor="title">Subject Name</label>
                                <input type="text" placeholder='Subjet Name' />
                            </div>

                            <div className="info-div">
                                <label htmlFor="meta-title">Meta Title</label>
                                <input type="text" placeholder='Meta Title' />
                            </div>
                       </div>

                       <div className="meta-description">
                        <label htmlFor="meta-desc">Meta Description</label>
                        {/* <img src="desc.png" style={{width: "100%"}} /> */}
                        <Textedit/>
                       </div>
                    </div>
                    <div className='add-media-files'>
                        <div className="content-div">
                            <h5 style={{marginBottom: "1.5rem"}}>Add media files</h5>
                            <p style={{fontSize: "12px", fontWeight: "500"}}>Thumbnail (828 x 490)</p>
                            <div className="upload-div" style={{marginTop: "1rem"}}>
                                <input type="file" id='file-upload' style={{display: "none"}} />
                                <p><label htmlFor="file-upload"><i class="fa-solid fa-arrow-up-from-bracket"></i></label></p>
                            </div>
                            <button>Next</button>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    );
}

export default CreateNewSubject;