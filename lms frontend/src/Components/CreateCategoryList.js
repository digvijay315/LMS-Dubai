import '../StyleCode/CreateCategoryList.css';
import Sidebar from './Sidebar';
import Header  from './Header';
import Textedit from './Textedit';

function CreateCategoryList() {
    return (
        <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px"}}>
            
            <Sidebar />

            <section className='main-content-section'>

                <Header />

                <div className='add-new-Catgory'>
                    <div className='adding-course-div'>
                       <h5 style={{marginBottom: "1rem"}}>Add New Category</h5> 
                       <div className="inputs-div">
                            <div className="info-div">
                                <label htmlFor="title">Title</label>
                                <input type="text" placeholder='Category Title' />
                            </div>
                            <div className="info-div">
                                <label htmlFor="parent-category">Parent Category</label>
                                <select name="parent-category" id="parent-category" placeholder='Select none for parent'>
                                    <option value="programming">Programming</option>
                                    <option value="digital-marketing">Digital Marketing</option>
                                    <option value="web-dev">Web Development</option>
                                    <option value="data-science">Data Science</option>
                                    <option value="cyber-security">Cyber Security</option>
                                </select>
                            </div>
                            <div className="info-div">
                                <label htmlFor="icon">Icon Picker</label>
                                <select name="" id="">
                                    <option value="">Picker</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <div className="info-div">
                                <label htmlFor="category">Category Position</label>
                                <input type="text" placeholder='Enter Position' />
                            </div>
                       </div>
                       <div className="info-div">
                            <label htmlFor="meta-title">Meta Title</label>
                            <input type="text" placeholder='Enter meta title' />
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
                            <p style={{fontSize: "12px", fontWeight: "500"}}>Thumbnail (548 x 234)</p>
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

export default CreateCategoryList;