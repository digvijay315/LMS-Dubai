import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import Header from '../Header'
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import { toast } from 'react-toastify';

function CustomSelect({ 
    label, 
    options, 
    value, 
    onSelect, 
    searchQuery, 
    onSearchChange, 
    placeholder, 
    renderOption 
  }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const handleSearchClick = (e) => {
      e.stopPropagation();
      // Don't close the dropdown when clicking the search input
      if (!isOpen) {
        setIsOpen(true);
      }
    };
  
    const handleContainerClick = () => {
      setIsOpen(!isOpen);
      if (!isOpen && searchInputRef.current) {
        // Focus the search input when opening the dropdown
        setTimeout(() => {
          searchInputRef.current.focus();
        }, 0);
      }
    };
  
    return (
      <div className="custom-select-container" ref={dropdownRef}>
        <label className="label">{label}</label>
        <div 
          className="select-input-container" 
          onClick={handleContainerClick}
        >
          <div className="selected-value">
            {value ? renderOption(value) : placeholder}
          </div>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isOpen && (
          <div className="dropdown-container" onClick={e => e.stopPropagation()}>
            <div className="search-container">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                onClick={handleSearchClick}
                placeholder="Search..."
                className="dropdown-search"
              />
            </div>
            <div className="options-container">
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option._id}
                    className="option"
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                  >
                    {renderOption(option)}
                  </div>
                ))
              ) : (
                <div className="no-options">No results found</div>
              )}
            </div>
          </div>
        )}
        <style>
            {`
            .custom-select-container {
                position: relative;
                width: 100%;
                margin-bottom: 1rem;
            }

            .select-input-container {
                padding: 0.75rem;
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                background-color: white;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-height: 42px;
            }

            .select-input-container:hover {
                border-color: #cbd5e0;
            }

            .selected-value {
                color: #1a202c;
                font-size: 0.875rem;
            }

            .arrow {
                font-size: 0.75rem;
                transition: transform 0.2s;
                color: #718096;
            }

            .arrow.open {
                transform: rotate(180deg);
            }

            .dropdown-container {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                margin-top: 0.25rem;
                background-color: white;
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 50;
                max-height: 300px;
            }

            .search-container {
                padding: 0.5rem;
                border-bottom: 1px solid #e2e8f0;
            }

            .dropdown-search {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #e2e8f0;
                border-radius: 0.25rem;
                font-size: 0.875rem;
            }

            .dropdown-search:focus {
                outline: none;
                border-color: #4299e1;
                box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
            }

            .options-container {
                max-height: 250px;
                overflow-y: auto;
            }

            .options-container::-webkit-scrollbar {
                width: 6px;
            }

            .options-container::-webkit-scrollbar-track {
                background: #f7fafc;
            }

            .options-container::-webkit-scrollbar-thumb {
                background: #cbd5e0;
                border-radius: 3px;
            }

            .option {
                padding: 0.75rem;
                cursor: pointer;
                font-size: 0.875rem;
                color: #1a202c;
            }

            .option:hover {
                background-color: #f7fafc;
            }

            .no-options {
                padding: 0.75rem;
                color: #718096;
                text-align: center;
                font-size: 0.875rem;
            }

            .details-card {
                margin-top: 1rem;
                padding: 1rem;
                background-color: #f8fafc;
                border-radius: 0.375rem;
                border: 1px solid #e2e8f0;
            }
            `}
        </style>
      </div>
    );
}

function AssignCAT() {

      const [employee, setEmployee] = useState([]);
      const [catData, setCatData] = useState(null);
      const [selectedCAT, setSelectedCAT] = useState(null);
      const [searchCATQuery, setSearchCATQuery] = useState('');
      const [selectedEmployees, setSelectedEmployees] = useState([]);
       const [assignDates, setAssignDates] = useState({});

      const fetchEmployee = async () => {
        try {
          const response = await axios.get(`${base_url}/employee_details_get`);
          console.log(response);
          setEmployee(response.data.employee);
        } catch (error) {
          console.error("Error fetching employee data:", error);
        }
      };
    
      const fetchCATData = async () => {
        try {
          const response = await axios.get(`${base_url}/get_all_cat`);
          console.log(response);
          setCatData(response.data.data);
        } catch (error) {
          console.log('Error fetching CAT data:', error);
        }
      };
    
      useEffect(() => {
        fetchEmployee();
        fetchCATData();
      }, []);

      const filteredCATs = catData?.filter(cat => 
        cat.title.toLowerCase().includes(searchCATQuery.toLowerCase()) ||
        cat.code.toLowerCase().includes(searchCATQuery.toLowerCase())
      ) || [];

      const handleCATSearch = (e) => {
        e.stopPropagation(); // Prevent the dropdown from closing
        setSearchCATQuery(e.target.value);
      };

      const handleSelectAllEmployees = (e) => {
        if (e.target.checked) {
          setSelectedEmployees(employee.map(emp => emp._id));
        } else {
          setSelectedEmployees([]);
        }
      };

     const handleEmployeeSelect = (employeeId) => {
  setSelectedEmployees(prev => {
    const updated = prev.includes(employeeId)
      ? prev.filter(id => id !== employeeId)
      : [...prev, employeeId];

    // Set default assign date if not already set and employee is being added
    if (!prev.includes(employeeId)) {
      setAssignDates(prevDates => ({
        ...prevDates,
        [employeeId]: prevDates[employeeId] || new Date().toISOString().split("T")[0]
      }));
    }

    return updated;
  });
};




      
  const handleDateChange = (employeeId, date) => {
    setAssignDates(prev => ({
      ...prev,
      [employeeId]: date
    }));
  };
    
  const handleAssignCAT = async () => {
    if (!selectedCAT) {
      toast.error('Please select a CAT first');
      return;
    }
    if (selectedEmployees.length === 0) {
      toast.error('Please select at least one employee');
      return;
    }

    const selectedWithDates = selectedEmployees.map(empId => ({
      employeeId: empId,
      date_of_assign: assignDates[empId] || new Date().toISOString().split("T")[0]
    }));

    try {
      const response = await axios.post(`${base_url}/assign_cat`, {
        catId: selectedCAT._id,
        assignments: selectedWithDates
      });

      if (response.data.success) {
        toast.success('CAT assigned successfully');
        setSelectedEmployees([]);
        setSelectedCAT(null);
        setAssignDates({});
        fetchEmployee();
      }
    } catch (error) {
      console.error('Error assigning CAT:', error);
      toast.error(error.response?.data?.message || 'Error assigning CAT');
    }
  };

     useEffect(() => {
  if (employee.length > 0) {
    const table = $('#employeeTable').DataTable({
      dom: '<"dt-buttons"Bf><"clear">lirtp',
      paging: true,
      autoWidth: true,
      buttons: [
        'colvis', 'copyHtml5', 'csvHtml5', 'excelHtml5', 'pdfHtml5', 'print',
      ],
      initComplete: function () {
        this.api().columns().every(function () {
          const that = this;

          // For columns with footer input
          $('input', this.footer()).on('keyup change clear', function () {
            if (that.search() !== this.value) {
              that.search(this.value).draw();
            }
          });
        });
      },
      language: {
        search: "Search by Project / Job Title / ID"
      }
    });

    return () => {
      table.destroy(true);
    };
  }
}, [employee]);




  return (
    <div>

      <style>
      {`
      body{
      background-color: rgba(46, 7, 63, 0.1);
      padding: 20px;
      }
      .take-assessment-container{
      background-color: #ffffff;
      padding: 1rem;
      border-radius: 10px;
      }
      .title-text{
      background-color: #2E073F;
      color: #ffffff;
      height: 6rem;
      padding: 2rem;
      border-top-right-radius: 1rem;
      border-top-left-radius: 1rem;
      }
      .assessment-data{
      padding: 2rem;
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
      .btn-primary{
      background-color: #7A1CAC;
      border: none;
      height: 2rem;
      }
      .btn-primary:hover{
      background-color: #2E073F;
      }
      `}
      </style>

      <div>
        <Sidebar />
        <section className="main-content-section">
          <Header />

          <div className='header-div header-two'>
              <div className='title-name'>
                  <h5>Assign CAT</h5>
                  <p><a onClick={() => window.location.reload()} style={{cursor:"pointer", color:"#099ded"}}>Home</a> <i class="fa-solid fa-caret-right"></i> Assign CAT</p>
              </div>
          </div>

          <div className='take-assessment-container'>
            <div className="title-text">
              <h2>Assign <span style={{ fontWeight: "300" }}>CAT</span></h2>
            </div>

            <div className='take-asessment-form'>
              <div className='assessment-data'>
                <div className="select-wrapper">
                  <CustomSelect
                    label="Select CAT"
                    options={filteredCATs}
                    value={selectedCAT}
                    onSelect={setSelectedCAT}
                    searchQuery={searchCATQuery}
                    onSearchChange={handleCATSearch}
                    placeholder="Select a CAT"
                    renderOption={(cat) => `${cat.title} (${cat.code})`}
                  />
                  
                  {selectedCAT && (
                    <div className="details-card">
                      <h5 className="details-title">Selected CAT Details</h5>
                      <p className="details-text">Title: {selectedCAT.title}</p>
                      <p className="details-text">Code: {selectedCAT.code}</p>
                      <p className="details-text">Valid Till: {new Date(selectedCAT.validTill).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div className='nominee-data'>
                  


                  <table id="employeeTable" className="table table-striped table-bordered">

                    
                    
                    <thead>

                      
                      <tr> 
                        
                        <th>
                          <input
                            type="checkbox"
                            onChange={handleSelectAllEmployees}
                            checked={selectedEmployees.length === employee.length}
                          />
                        </th>

                        
                        <th>Sr no</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Job title</th>
                          <th>Project Name</th> {/* New Column */}
                        <th>Date of assign</th>
                        <th>Date of Complete</th>
                      </tr>
                    </thead>

                    <tfoot>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th><input type="text" placeholder="Search Job Title" /></th>
      <th><input type="text" placeholder="Search Project" /></th>
      <th></th>
      <th></th>
    </tr>
  </tfoot>
                    <tbody>
                      {employee.map((item, index) => (
                        <tr key={item._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedEmployees.includes(item._id)}
                              onChange={() => handleEmployeeSelect(item._id)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{item.employee_id}</td>
                          <td>{item.employee_name}</td>
                          <td>{item.job_title}</td>
                          
                           <td>{item.project_name || '—'}</td> {/* New Cell */}
                      <td>
  {selectedEmployees.includes(item._id) ? (
    <input
      type="date"
      value={assignDates[item._id] || ''}
      onChange={(e) => handleDateChange(item._id, e.target.value)}
      style={{ width: '160px' }}
    />
  ) : (
  <span>
 {item.date_of_assign
  ? new Date(item.date_of_assign).toLocaleDateString()
  : '—'}

</span>

  )}
</td>


<td>
  {item.date_of_complete
    ? new Date(item.date_of_complete).toLocaleDateString()
    : '—'}
</td>






                        </tr>
                      ))}
                    </tbody>


                  </table>




                </div>

                <div className="button-container" style={{ marginTop: '1rem' }}>
                  <button
                    className="btn btn-primary"
                    onClick={handleAssignCAT}
                    disabled={!selectedCAT || selectedEmployees.length === 0}
                  >
                    Assign CAT to Selected Employees
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </div>
  )
}

export default AssignCAT
