import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

function TakeAssessment() {
  return (
    <div>
        <style>
            {`
            .take-assessment-container{
            background-color: #ffffff;
            padding: 1rem;
            border-radius: 10px;
            }
             .title-text{
            background-color: #2E073F;
            color: #ffffff;
            height: 8rem;
            padding: 2rem;
            border-top-right-radius: 1rem;
            border-top-left-radius: 1rem;
            }
            .assessment-data{
            display: grid;
            grid-template-columns: auto auto;
            padding: 2rem;
            column-gap: 1.5rem;
            row-gap: 1.5rem;
            }
            `}
        </style>
        <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh" }}>
            <Sidebar/>
            <section className="main-content-section">
                <Header/>
                
                <div className='take-assessment-container'>
                    <div className="title-text">
                        <h2>Take <span style={{ fontWeight: "300" }}>Assessment</span></h2>
                    </div>

                    <div className='take-asessment-form'>
                        <div className='assessment-data'>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
      
    </div>
  )
}

export default TakeAssessment
