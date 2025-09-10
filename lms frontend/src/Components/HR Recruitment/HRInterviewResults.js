import React, {useState, useEffect} from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import $ from 'jquery'
import { toast } from 'react-toastify'
import axios from 'axios'
import { base_url } from '../Utils/base_url'
import { useNavigate } from 'react-router-dom'

function HRInterviewResults() {

  const [hrdata, setHrdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHRResults = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${base_url}/fetch_all_hr_response`);
      console.log(response);
      
      setHrdata(response.data.data);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching HR results:', error);
      toast.error('Error fetching HR results');
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHRResults();
  }, [])

  useEffect(() => {
            if (hrdata.length > 0) {
              // Initialize DataTable
              const table = $('#candidateTable').DataTable({
                dom: '<"dt-buttons"Bf><"clear">lirtp',
                paging: true,
                autoWidth: true,
                buttons: [
                  'colvis',
                  'copyHtml5',
                  'csvHtml5',
                  'excelHtml5',
                  'pdfHtml5',
                  'print',
                ],
                initComplete: function () {
                  const footer = $('#candidateTable tfoot tr');
                  $('#candidateTable thead').append(footer);
                },
              });
        
              // Apply search functionality
              $('#candidateTable thead').on('keyup', 'input', function () {
                table.column($(this).parent().index()).search(this.value).draw();
              });
        
              // Cleanup on component unmount
              return () => {
                table.destroy(true);
              };
            }
  }, [hrdata]);

    // Function to navigate to the report view page
    const handleViewReport = (candidateId, projectId) => {
      // Make sure we get the ID string, not the object
      const candidateIdStr = typeof candidateId === 'object' ? candidateId._id : candidateId;
      const projectIdStr = typeof projectId === 'object' ? projectId._id : projectId;
      
      navigate(`/hrInteview_report/${candidateIdStr}/${projectIdStr}`);
    };

  return (
    <div>

<style>
{`
body {
  background-color:#f7f9fc;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  color: #333;
}
  .container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  }
  .candidate-list-header {
margin-bottom: 30px;
border-bottom: 2px solid #e9ecef;
padding-bottom: 15px;
}

.candidate-list-header h5 {
color: #2c3e50;
font-size: 1.5rem;
font-weight: 600;
margin: 0;
display: inline-flex;
align-items: center;
}

.candidate-list-header h5::before {
content: "";
display: inline-block;
width: 6px;
height: 24px;
background-color: #3498db;
margin-right: 10px;
border-radius: 3px;
}

table {
font-size: 14px;
}

.dt-paging-button{
padding: 8px 1rem;
border: none;
margin: 0 5px;
background-color: #ffffff;
// border: #7A1CAC solid 1px;
font-weight: 500;
border-radius: 5px;
transition: all 0.3s ease;
box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
}
.dt-paging-button:hover{
background-color: #7A1CAC;
color: #ffffff;
}
.nominee-data{
background-color: #ffffff;
padding: 2rem 1.5rem;
border-radius: 10px;
margin-top: 1.5rem;
margin-bottom: 10px;
box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
}
#dt-length-0{
width: 7%;
}

.dt-paging-button{
background-color: #ffffff;
box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
color: #000;
margin: 0 5px;
width: 2.5rem;
transition: 0.3s all ease;
}
.dt-paging-button:hover{
background-color: #7A1CAC;
color: #ffffff;
}
.dt-search{
float: right;
margin-bottom: 14px;
}
.dt-search #dt-search-0{
height: 2.5rem;
border-radius: 5px;
border: none;
border: 2px solid #7A1CAC;
padding-left: 10px;
}
.dt-search #dt-search-0:focus{
outline: none;
}
.dt-container {
padding: 10px;
}

th, td {
font-size: 12px;}
`}
</style>

    <div>
        <HRSidebar/>
        <section className="main-content-section">
          <HRHeader/>

          <div className='container'>
                    <div className='candidate-list-header'>
                      <h5>HR Interview Results</h5>
                    </div>
                    
                    <div className='table-responsive'>
                    {loading ? (
                      <div className="loading-spinner">Loading...</div>
                    ) : (
                      <table id='candidateTable' className='table table-striped table-bordered'>
                        <thead>
                          <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Project</th>
                            <th scope='col'>Candidate Code</th>
                            <th scope='col'>Candidate Name</th>
                            <th scope='col'>General Score</th>
                            <th scope='col'>Interview Date</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {hrdata.length === 0 ? (
                          <tr>
                            <td colSpan="9" className="text-center">No HR reports found</td>
                          </tr>
                        ) : (
                          hrdata.map((data, index) => (
                            <tr key={data._id || index}>
                              <th>{index+1}</th>
                              <td>{data.projectTitle}</td>
                              <td>{data.candidateCode}</td>
                              <td>{data.candidateName}</td>
                              <td>{data.totalScore}</td>
                              <td>{new Date(data.interviewDate).toLocaleDateString()}</td>        
                              <td>
                                <span className={`badge ${data.recommendation === 'Selected' || data.recommendation === 'Highly recommended' 
                                  ? 'bg-success' 
                                  : data.recommendation === 'Rejected' 
                                  ? 'bg-danger' 
                                  : 'bg-warning'}`}>
                                  {data.recommendation}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className='btn'
                                  onClick={() => handleViewReport(data.candidate, data.project)}
                                >
                                    View report
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                    )}
                    </div>
                  </div>
        </section>

      </div>


    </div>
  )
}

export default HRInterviewResults

