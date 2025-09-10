import { useEffect, useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import axios from "axios";
import '../StyleCode/AdminDashboard.css';
import '../StyleCode/AllEmployeeList.css'
import { useNavigate } from "react-router-dom";
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import { base_url } from "./Utils/base_url";


function AllStudentsList() {

    useEffect(() => {
        get_std_data();
    }, []);

    const navigate = useNavigate();

    const [stdData, setStdData] = useState([]);
    const get_std_data = async () => {
        try {
            const resp = await axios.get(`${base_url}/student_details_get`);
            console.log(resp);
            
            setStdData(resp.data.student);
        } catch (error) {
            console.log(error);
        }
    }

    // const delete_std_data = async (_id) => {
    //     try {
    //         const id = _id;
    //         const resp = await axios.delete(`http://localhost:5000/studentsdelete/${id}`);
    //         alert("student data delete");
    //         navigate('/AllStudentList')
            
    //         setStdData(resp.data.student);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const delete_std_data = async (_id) => {
        try {
          const id = _id;
          const resp = await axios.delete(`${base_url}/studentsdelete/${id}`);
          alert("Student data deleted");
    
          setStdData(resp.data.student);
          
          // After the deletion is successful, navigate to another route
          navigate('/AllStudentList');
        } catch (error) {
          console.log(error);
        }
      }


      useEffect(() => {
        if (stdData.length > 0) {
          // Initialize DataTable
          const table = $('#employeeTable').DataTable({
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
              const footer = $('#employeeTable tfoot tr');
              $('#employeeTable thead').append(footer);
            },
          });
    
          // Apply search functionality
          $('#employeeTable thead').on('keyup', 'input', function () {
            table.column($(this).parent().index()).search(this.value).draw();
          });
    
          // Cleanup on component unmount
          return () => {
            table.destroy(true);
          };
        }
      }, [stdData]);

  return (
    <div style={{backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh"}}>

<style>{`
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
        `}</style>

        <Sidebar/>

        <section className='main-content-section'>
        <Header/>

                <div className='header-div header-two'>
                    <div className='title-name'>
                        <h5>Students List</h5>
                        <p style={{opacity: "0.5"}}>All students list</p>
                    </div>
                </div>

                <div className='all-users-list'>
                    <table id="employeeTable" className="table table-striped table-bordered" style={{ fontSize: '14px' }}>
                        <thead style={{}}>
                            <tr style={{borderTop: "none"}}>
                                <th style={{paddingRight: "10rem"}}>Std. Name</th>
                                <th style={{paddingRight: "5rem"}}>Username</th>
                                <th style={{paddingRight: "10rem"}}>Email</th>
                                <th style={{paddingRight: "5rem"}}>Password</th>
                                <th>Delete Students</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                            
                                stdData.map((item) => 
                                    <tr>
                                        <td>{item.first_name}{item.last_name}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email_id}</td>
                                        <td>{item.confirm_password}</td>
                                        <td><button onClick={()=>delete_std_data(item._id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>
        </section>
      
    </div>
  )
}

export default AllStudentsList
