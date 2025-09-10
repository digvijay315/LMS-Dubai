import React from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'

function TRFPendingForApproval() {
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
            .all-list-request, .assign-service-provider-div{
            margin-top: 2rem;
            }
            .all-list-request, .assign-service-provider-div h5{
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
                        <h2>TRF Pending for <span style={{ fontWeight: "300" }}> Approval</span></h2>
                    </div>

                    <div className='all-list-request'>
                        <h5>TRF pending for approval</h5>

                        <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} > 
                            <thead>
                                <tr>
                                    <th>Sr. no</th>
                                    <th>TRF No.</th>
                                    <th>Training title</th>
                                    <th>Request by</th>
                                    <th>Employee Id</th>
                                    <th>Employee Name</th>
                                    <th>Target date</th>
                                    <th>Eligible</th>
                                    <th>1st Approval</th>
                                    <th>2nd Approval</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='assign-service-provider-div'>
                        <h5>Assign Service Provider</h5>

                        <table id="example" class="table table-striped table-bordered" cellspacing="0" style={{fontSize:"14px"}} > 
                            <thead>
                                <tr>
                                    <th>TRF No</th>
                                    <th>Training Title</th>
                                    <th>Requested by</th>
                                    <th>Service Provider</th>
                                    <th>Quotation Value</th>
                                    <th>Status</th>
                                    <th>PM Comment</th>
                                    <th>L&D Comment</th>
                                    <th>Assign SR</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </div>
      
    </div>
  )
}

export default TRFPendingForApproval
