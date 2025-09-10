import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import axios from 'axios';
import { base_url } from '../Utils/base_url';

function ViewTrainingRequestList() {

    const [trainingRequest, setTrainingRequest] = useState([]);
    const fetchTrainingRequest = async () => {
        try {
            const resp = await axios.get(`${base_url}/get_trainingrequestdata`);
            console.log(resp);
            setTrainingRequest(resp.data.trainingRequest_form);
            // const employee_data = resp.data.trainingRequest_form.
        } catch (error) {
            console.log(error);
        }
    }

    const [employee, setemployee] = useState('');
    const fetchTrainingById = async (_id) => {
        try {
            const id = _id;
            const resp = await axios.get(`${base_url}/get_trainingByID/${id}`);
            setemployee(resp.data.trainingRequest_form.employees_ids);
            console.log(employee);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTrainingRequest(); 
        fetchTrainingById();
    }, []);


  return (
    <div>

        <style>
            {`
            body{
            background-color: rgba(46, 7, 63, 0.1);
            padding: 20px;
            }
            .create-training-budget{
            background-color: #ffffff;
            padding: 1.5rem;
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
            .all-list-request{
            margin-top: 2rem;
            padding: 1rem;
            border: 1px solid rgba(0,0,0,0.3);
            border-radius: 8px;
            }
            .all-list-request h5{
            margin-bottom: 1.5rem;
            }
            `}
        </style>

        <div>
            <Sidebar/>

            <section className="main-content-section">
                <Header/>

                <div className='create-training-budget'>
                    <div className="title-text">
                        <h2>View Training <span style={{ fontWeight: "300" }}> Request</span></h2>
                    </div>

                    <div className='all-list-request'>
                        <h5>All Training Request list</h5>

                        <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} >
                            <thead>
                                <tr>
                                    <th>Sr.No.</th>
                                    <th>Employee ID</th>
                                    <th>Name</th>
                                    <th>Training Name</th>
                                    <th>Status</th>
                                    <th>Valid till</th>
                                    <th>Eligible</th>
                                    <th>Comments</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   Array.isArray(trainingRequest) ? trainingRequest.map((item, index) => (
                                        <tr>
                                            <td>{index+1}</td>
                                            <td></td>
                                            <td>{item.request_raised_by}</td>
                                            <td>{item.training_title}</td>
                                            <td></td>
                                            <td>{item.target_date}</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                   )) : []
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

export default ViewTrainingRequestList
