import React from 'react'

function StepsCourse() {
  return (
    <div>

        <style>{`
        .main-div{
        border: 1px solid rgba(0,0,0,0.2);
        padding: 1rem;
        display: flex;
        border-radius: 8px;
        transition: all 0.3s ease;
        margin-bottom: 1rem;
        }
        .main-div:hover{
        border-color: #ffffff;
        box-shadow: 3px 3px 6px rgba(0,0,0,0.2);
        }
        .courseImg-div img{
        width: 130px;
        heigt: 50px;
        margin-right: 1rem;
        border-radius: 6px;
        }
        .content-div p{
        font-size: 12px;
        opacity: 0.7;
        margin: 0px;
        }
        `}</style>
        <div className='main-div'>
            <div className='courseImg-div'>
                <img src='photo_1.jpg' />
            </div>
            <div className='content-div'>
                <h6>Data Engineer: Beginer</h6>
                <p>A data engineer is a professional responsible for designing, building, and maintaining the infrastructure that allows data to be collected, stored, and processed efficiently.</p>
            </div>
        </div>
      
    </div>
  )
}

export default StepsCourse
