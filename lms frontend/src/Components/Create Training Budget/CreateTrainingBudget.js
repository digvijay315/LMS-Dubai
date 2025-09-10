import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import axios from 'axios'
import { base_url } from "../Utils/base_url";
import { toast } from 'react-toastify';

function CreateTrainingBudget() {

    const [trainingBudget, setTrainingBudget] = useState({
        project_title:"",
        training_title:"",
        budget_code:"",
        budget_value:"",
        currency:"",
        contengency_code:"",
        contengency_value:"",
        status:"",
        release_date:"",
        valid_date:"",
        utilised_date:"",
    })

    const saveTrainingBudget = async () => {
        try {
           const resp = await axios.post(`${base_url}/create_training_budget`, trainingBudget);
           if(resp.status == 200){
            toast.success("Training Budget data save successfully", { autoClose: 2000});
            setTrainingBudget([]);
           } 
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTrainingBudget();
    }, []);

    const [budgetData, setBudgetData] = useState([]);
    const getTrainingBudget = async () => {
        try {
            const resp = await axios.get(`${base_url}/get_training_budget_data`);
            console.log(resp);
            setBudgetData(resp.data.training_budget);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <style>
            {`
            .create-training-budget{
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
            .cat-data{
            display: grid;
            grid-template-columns: auto auto;
            padding: 2rem;
            column-gap: 1.5rem;
            row-gap: 1.5rem;
            }
            .budget-code-div{
            border: 1px solid rgba(0,0,0,0.5);
            padding: 1rem;
            border-radius: 8px;
            }
            .create-btn{
            background-color: #7A1CAC;
            width: 6rem;
            height: 3rem;
            }
            .create-btn:hover{
            background-color: #2E073F;
            }
            `}
        </style>

        <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100%" }}>
            <Sidebar/>

            <section className="main-content-section">
                <Header/>

                <div className='create-training-budget'>
                    <div className="title-text">
                        <h2>Create Training <span style={{ fontWeight: "300" }}>Budget</span></h2>
                    </div>

                    <div className='create-cat-form'>
                        <div className='cat-data'>
                            <div className="info-div-item">
                                <label>Project</label>
                                <select id='project_title' onChange={(e) => {setTrainingBudget({...trainingBudget, project_title: e.target.value})}}>
                                    <option>--Select Project--</option>
                                    <option>Project-1</option>
                                    <option>Project-2</option>
                                    <option>Project-3</option>
                                </select>
                            </div>
                            <div className="info-div-item">
                                <label>Training title</label>
                                <select id='training_title' onChange={(e) => {setTrainingBudget({...trainingBudget, training_title: e.target.value})}}>
                                    <option>--Select training--</option>
                                    <option>Training-1</option>
                                    <option>Training-2</option>
                                    <option>Training-3</option>
                                </select>
                            </div>
                            <div className='budget-code-div'>
                                <div className="info-div-item">
                                    <label>Budget Code</label>
                                    <input type='text' placeholder='Enter budget code' id='budget_code' onChange={(e) => {setTrainingBudget({...trainingBudget, budget_code: e.target.value})}} />
                                    
                                </div>
                                <div className="info-div-item">
                                    <label>Value</label>
                                    {/* <input type='text' placeholder='Enter the value' id='budge_value' onChange={(e) => {setTrainingBudget({...trainingBudget, budge_value: e.target.value})}} /> */}
                                    <section style={{display:"flex"}}>
                                        <input type="text" class="form-control" placeholder="Enter budget value" id='budget_value' onChange={(e) => {setTrainingBudget({...trainingBudget, budget_value: e.target.value})}} />
                                        <select class="custom-select" id='currency' onChange={(e) => {setTrainingBudget({...trainingBudget, currency: e.target.value})}}>
                                            <option selected>Select Currency</option>
                                            <option >₺ (TL)</option>
                                            <option >$ (Dolar)</option>
                                            <option >€ (Euro)</option>
                                            <option>₹ (Rupee)</option>
                                        </select>
                                    </section>
                                </div>
                            </div>
                            <div className='budget-code-div'>
                                <div className="info-div-item">
                                    <label>Contengency Budget Code</label>
                                    <input type='text' placeholder='Enter contengency budget' id='contengency_code' onChange={(e) => {setTrainingBudget({...trainingBudget, contengency_code: e.target.value})}} />
                                </div>
                                <div className="info-div-item">
                                    <label>Value</label>
                                    <input type='text' placeholder='Enter the value' id='contengency_value' onChange={(e) => {setTrainingBudget({...trainingBudget, contengency_value: e.target.value})}} />
                                </div>
                            </div>
                            <div className="info-div-item">
                                <label>Status</label>
                                <select id='status' onChange={(e) => {setTrainingBudget({...trainingBudget, status: e.target.value})}}>
                                    <option>--Select status--</option>
                                    <option>Approved</option>
                                    <option>On-Hold</option>
                                    <option>Utilised</option>
                                    <option>Unbudgeted</option>
                                </select>
                            </div>
                            <div className="info-div-item">
                                <label>Release Date</label>
                                <input type='date' placeholder='Enter release date' id='release_date' onChange={(e) => {setTrainingBudget({...trainingBudget, release_date: e.target.value})}} />
                            </div>
                            <div className="info-div-item">
                                <label>Valid Date</label>
                                <input type='date' placeholder='Enter valid date' id='valid_date' onChange={(e) => {setTrainingBudget({...trainingBudget, valid_date: e.target.value})}} />
                            </div>
                            <div className="info-div-item">
                                <label>If utilised</label>
                                <input type='date' placeholder='Enter date of utilised' id='utilised_date' onChange={(e) => {setTrainingBudget({...trainingBudget, utilised_date: e.target.value})}} />
                            </div>
                            <div>
                                <button className='create-btn' onClick={saveTrainingBudget}>Create</button>
                            </div>
                        </div> 
                    </div>

                    <div className='training-budeget_data'>
                        <h5>All Training budget list</h5>
                        <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} >
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Budget Code</th>
                                    <th>Training title</th>
                                    <th>Project Name</th>
                                    <th>Currency</th>
                                    <th>Value</th>
                                    <th>Status</th>
                                    <th>Release Date</th>
                                    <th>Valid Date</th>
                                    <th>Total Budget</th>
                                    <th>Actual Spend</th>
                                    <th>Balance</th>
                                    <th>Discrepancy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    budgetData.map((item, index) => 
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{item.budget_code}</td>
                                            <td>{item.training_title}</td>
                                            <td>{item.project_title}</td>
                                            <td>{item.currency}</td>
                                            <td>{item.budget_value}</td>
                                            <td>{item.status}</td>
                                            <td>{item.release_date}</td>
                                            <td>{item.valid_date}</td>
                                            <td>{item.budget_value}</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
      
    </div>
  )
}

export default CreateTrainingBudget
