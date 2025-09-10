import React from 'react'

function ServiceProviderRegister() {
  return (
    <div>

        <style>
            {`
             body{
             margin: 0;
             padding: 0;
                background-color: rgba(46, 7, 63, 0.2);
                }
                .main-container-div{
                // border: 2px solid #000;
                height: 100vh;
                width: 100vw;
                display: flex;
                justify-content: center;
                align-items: center;
                }
                .provider-registration-form{
                border-top: 5px solid #7A1CAC;
                border-radius: 1rem;
                width: 60%;
                padding: 3rem 0;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #ffffff;
                box-shadow: 10px 10px 20px rgba(0,0,0,0.3);
                }
                .registration-form{
                width: 80%;
                }
                .register-title{
                width: fit-content;
                margin-bottom: 2rem;
                }
                 h5{
                border-bottom: 4px solid #7A1CAC;
                padding-bottom: 10px;
                }
                .register-btn-div button{
                padding: 10px 2.5rem;
                background-color: #7A1CAC;
                margin-top: 12px;
                }
                .register-btn-div button:hover{
                background-color: #2E073F;
                }
                .register-items{
                display: grid;
                grid-template-columns: auto auto;
                column-gap: 2rem;
                row-gap: 1.5rem;
                }
            `}
        </style>

        <div className='main-container-div'>
            <div className='provider-registration-form'>
            <div className='registration-form'>
                    <div className='register-title'>
                        <h5>Service Provider Register</h5>
                    </div>

                    <div className='register-items'>
                        <div className="info-div-item">
                            <label>Company Name</label>
                            <input type='text' placeholder='Enter company name' />
                        </div>
                        <div className="info-div-item">
                            <label>Region</label>
                            <select>
                                <option>--Select Region--</option>
                                <option>Project - 1</option>
                                <option>Project - 2</option>
                                <option>Project - 3</option>
                            </select>
                        </div>
                        <div className="info-div-item">
                            <label>Service Provider Code</label>
                            <input type='text' placeholder='Enter Service provider code' />
                        </div>
                        <div className="info-div-item">
                            <label>Type of training provided</label>
                            <select>
                                <option>--Select Training--</option>
                                <option>Project - 1</option>
                                <option>Project - 2</option>
                                <option>Project - 3</option>
                            </select>
                        </div>
                        <div className="info-div-item">
                            <label>Company Email Id</label>
                            <input type='text' placeholder='Enter company email id' />
                        </div>
                        <div className="info-div-item">
                            <label>Trainers Name</label>
                            <input type='text' placeholder='Enter trainers name' />
                        </div>

                        <div className='register-btn-div'>
                            <button>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default ServiceProviderRegister
