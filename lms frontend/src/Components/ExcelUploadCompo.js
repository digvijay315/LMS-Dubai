import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import ExcelUploader from './ExcelUploader'

function ExcelUploadCompo() {
  return (
    <div>
        <style>
            {`
                body {
                    background-color: rgba(46, 7, 63, 0.1);
                    padding: 20px;
                }
                .upload-excel-container {
                    background-color: #ffffff;
                    padding: 1.5rem;
                    border-radius: 10px;
                    height: 78vh;
                }
                .title-text {
                    background-color: #2E073F;
                    color: #ffffff;
                    height: 6rem;
                    padding: 2rem;
                    border-top-right-radius: 1rem;
                    border-top-left-radius: 1rem;
                    margin-bottom: 2rem;
                }
                .upload-file-div {

                }
            `}
        </style>

        <div>
            <Sidebar/>

            <section className="main-content-section">
                <Header/>

                <div className='upload-excel-container'>
                    <div className="title-text">
                        <h2>Upload <span style={{ fontWeight: "300" }}>Excel File</span></h2>
                    </div>

                    <div className='upload-file-div'>
                        <ExcelUploader />
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default ExcelUploadCompo