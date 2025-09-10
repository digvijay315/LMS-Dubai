import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Trash2, Filter, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { base_url } from '../Utils/base_url';
import Sidebar from '../Sidebar';
import Header from '../Header';

const CompetencyMappingDashboard = () => {
  // State management
  const [mappings, setMappings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    functionType: '',
    jobTitle: '',
    status: '',
    showHistory: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: 'lastUpdated', direction: 'desc' });
  const [expandedRows, setExpandedRows] = useState({});

  // Fetch data from API
  const fetchMappings = async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      if (filters.showHistory) {
        params.showHistory = 'true';
      }
      
      const response = await axios.get(`${base_url}/competency-mappings`, { params });
      setMappings(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch competency mappings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchMappings();
  }, []);

  // Apply filters when they change
  useEffect(() => {
    fetchMappings();
  }, [filters]);

  // Handle search and filtering
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetFilters = () => {
    setFilters({
      functionType: '',
      jobTitle: '',
      status: '',
      showHistory: false
    });
    setSearchTerm('');
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this competency mapping?')) {
      try {
        await axios.delete(`${base_url}/delete_competency_mapping/${id}`);
        fetchMappings(); // Refresh list
      } catch (err) {
        setError('Failed to delete competency mapping');
        console.error(err);
      }
    }
  };

  // Mark competency as completed
const markAsCompleted = async (mappingId, employeeId) => {
  try {
    await axios.post(`${base_url}/competency-completion`, {
      competencyMappingId: mappingId,
      employeeId
    });
    fetchMappings();
  } catch (err) {
    setError('Failed to mark competency as completed');
    console.error(err.response?.data || err.message);
  }
};


  // Filter and sort data
  const filteredMappings = mappings.filter(mapping => {
    const searchLower = searchTerm.toLowerCase();
    
    // Basic search in employee data
    if (
      mapping.employeeId?.toLowerCase().includes(searchLower) ||
      mapping.employeeName?.toLowerCase().includes(searchLower) ||
      mapping.functionType?.toLowerCase().includes(searchLower) ||
      mapping.jobTitle?.toLowerCase().includes(searchLower)
    ) {
      return true;
    }
    
    // Search in competency items
    if (mapping.competencyItems?.some(item => 
      item.mainCategory?.toLowerCase().includes(searchLower) ||
      item.subCategory?.toLowerCase().includes(searchLower) ||
      item.trainingName?.toLowerCase().includes(searchLower) ||
      item.ojtTitle?.toLowerCase().includes(searchLower) ||
      item.assessmentTitle?.toLowerCase().includes(searchLower) ||
      item.ojaTitle?.toLowerCase().includes(searchLower) ||
      item.inaTitle?.toLowerCase().includes(searchLower) ||
      item.status?.toLowerCase().includes(searchLower)
    )) {
      return true;
    }
    
    return false;
  });
  
  // Sort filtered data
  const sortedMappings = [...filteredMappings].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    let bgColor = "bg-gray-200";
    if (status === "completed") bgColor = "bg-green-200 text-green-800";
    if (status === "active") bgColor = "bg-blue-200 text-blue-800";
    if (status === "expired") bgColor = "bg-red-200 text-red-800";
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (

    <div>
      <Sidebar/>
    <section className="main-content-section">
      <Header/> 
      <div className="dashboard-container">
        <h4 className="dashboard-title">Competency Mapping Dashboard</h4>
        
        {/* Search and filter section */}
        <div className="search-filter-panel">
          <div className="search-row">
            <div className="search-container">
              <div className="search-icon">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by employee, function, competency..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="filter-buttons">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle-btn"
              >
                <Filter size={18} />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              <button 
                onClick={resetFilters}
                className="reset-btn"
              >
                <RefreshCw size={18} />
                Reset
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="filter-controls">
              <div className="filter-group">
                <label className="filter-label">Function Type</label>
                <select
                  name="functionType"
                  value={filters.functionType}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All Functions</option>
                  <option value="HVAC">HVAC</option>
                  <option value="ELEC">ELEC</option>
                  <option value="MECH">MECH</option>
                  <option value="PLUMB">PLUMB</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Job Title</label>
                <select
                  name="jobTitle"
                  value={filters.jobTitle}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All Job Titles</option>
                  <option value="Service man">Service man</option>
                    <option value="Technician II">Technician II</option>
                    <option value="Technician III">Technician III</option>
                    <option value="Technician IV">Technician IV</option>
                    <option value="Sr Technician">Sr Technician</option>
                    <option value="Chief tech">Chief tech</option>
                    <option value="Contract Manager">Contract Manager</option>
                    <option value="Team leader">Team leader</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Asst engineer">Asst engineer</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Sr engineer">Sr engineer</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              
              <div className="filter-group history-checkbox">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="showHistory"
                    checked={filters.showHistory}
                    onChange={handleFilterChange}
                    className="history-checkbox-input"
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-label">Show History</span>
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Error message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {/* Loading state */}
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="results-summary">
              Showing {sortedMappings.length} of {mappings.length} competency mappings
            </div>
            
            {/* Data table */}
            <div className="data-table-container">
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        <button 
                          className="sort-button"
                          onClick={() => requestSort('employeeId')}
                        >
                          Employee ID
                          {sortConfig.key === 'employeeId' && (
                            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                          )}
                        </button>
                      </th>
                      <th>
                        <button 
                          className="sort-button"
                          onClick={() => requestSort('employeeName')}
                        >
                          Employee Name
                          {sortConfig.key === 'employeeName' && (
                            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                          )}
                        </button>
                      </th>
                      <th>
                        <button 
                          className="sort-button"
                          onClick={() => requestSort('functionType')}
                        >
                          Function
                          {sortConfig.key === 'functionType' && (
                            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                          )}
                        </button>
                      </th>
                      <th>
                        <button 
                          className="sort-button"
                          onClick={() => requestSort('jobTitle')}
                        >
                          Job Title
                          {sortConfig.key === 'jobTitle' && (
                            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                          )}
                        </button>
                      </th>
                      <th>
                        <button 
                          className="sort-button"
                          onClick={() => requestSort('lastUpdated')}
                        >
                          Last Updated
                          {sortConfig.key === 'lastUpdated' && (
                            sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                          )}
                        </button>
                      </th>
                      <th>Competencies</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMappings.length > 0 ? (
                      sortedMappings.map((mapping) => (
                        <React.Fragment key={mapping._id}>
                          <tr 
                            className={`data-row ${expandedRows[mapping._id] ? 'expanded' : ''}`}
                            onClick={() => toggleRowExpansion(mapping._id)}
                          >
                            <td className="employee-id">{mapping.employee_id}</td>
                            <td>{mapping.employeeName}</td>
                            <td>{mapping.functionType}</td>
                            <td>{mapping.jobTitle}</td>
                            <td>{formatDate(mapping.lastUpdated || mapping.updatedAt)}</td>
                            <td className="competency-count">
                              {mapping.competencyItems?.length || 0} items
                              <button className="expand-button">
                                {expandedRows[mapping._id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </button>
                            </td>
                            <td className="actions-cell">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(mapping._id);
                                }}
                                className="delete-button"
                                disabled={mapping.status !== 'completed'}
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                          
                          {expandedRows[mapping._id] && (
                            <tr className="expanded-content-row">
                              <td colSpan="7">
                                <div className="competency-details">
                                  <h3 className="details-title">Competency Items</h3>
                                  <div className="competency-items-list">
                                    {mapping.competencyItems?.length > 0 ? (
                                      mapping.competencyItems.map((item, index) => (
                                        <div key={index} className="competency-item">
                                          <div className="item-header">
                                            <div className="category">
                                              <span className="main-category">{item.mainCategory}</span>
                                              {item.subCategory && (
                                                <span className="sub-category">({item.subCategory})</span>
                                              )}
                                            </div>
                                            <div className={`status-badge ${item.status}`}>
                                              {item.status}
                                            </div>
                                          </div>
                                          
                                          <div className="item-details">
                                            {item.trainingName && (
                                              <div className="detail-group">
                                                <span className="detail-label">Training:</span>
                                                <p>{item.trainingName} {item.trainingCode && `(${item.trainingCode})`}</p>
                                              </div>
                                            )}
                                            
                                            {item.ojtTitle && (
                                              <div className="detail-group">
                                                <span className="detail-label">OJT:</span>
                                                <p>{item.ojtTitle} {item.ojtCode && `(${item.ojtCode})`}</p>
                                              </div>
                                            )}
                                            
                                            {item.assessmentTitle && (
                                              <div className="detail-group">
                                                <span className="detail-label">Assessment:</span>
                                                <p>{item.assessmentTitle} {item.lmsAssessmentCode && `(${item.lmsAssessmentCode})`}</p>
                                              </div>
                                            )}
                                            
                                            {item.ojaTitle && (
                                              <div className="detail-group">
                                                <span className="detail-label">OJA:</span>
                                                <p>{item.ojaTitle} {item.ojaCode && `(${item.ojaCode})`}</p>
                                              </div>
                                            )}
                                            
                                            {item.inaTitle && (
                                              <div className="detail-group">
                                                <span className="detail-label">INA:</span>
                                                <p>{item.inaTitle} {item.inaCode && `(${item.inaCode})`}</p>
                                              </div>
                                            )}
                                          </div>
                                          
                                          <div className="item-footer">
                                            <div className="metrics">
                                              <div className="metric">
                                                <span className="metric-label">Skill Level:</span> {item.skillLevel || 'N/A'}
                                              </div>
                                              <div className="metric">
                                                <span className="metric-label">Validity:</span> {item.validity || 'N/A'}
                                              </div>
                                              <div className="metric">
                                                <span className="metric-label">Deadline:</span> {item.deadLine ? formatDate(item.deadLine) : 'N/A'}
                                              </div>
                                              <div className="metric">
                                                <span className="metric-label">Assigned:</span> {formatDate(item.assignedDate)}
                                              </div>
                                            </div>
                                            
                                            {item.status === 'active' && (
                                             <button
  onClick={(e) => {
    e.stopPropagation();
    markAsCompleted(mapping._id, mapping.employeeId || mapping.employee_id);
  }}
  className="complete-button"
>
  Mark Complete
</button>

                                            )}
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="no-items-message">No competency items found.</p>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-results">
                          No competency mappings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

      </div>
    </section>

      <style jsx>
        {`

        body {
          background-color: rgba(46, 7, 63, 0.1);
          padding: 20px;
        }

        /* Global styles and variables */
:root {
  --primary-color:rgb(80, 11, 109);
  --primary-light: #e7f0ff;
  --secondary-color: #5c6ac4;
  --accent-color: #00d0b0;
  --text-color: #2d3748;
  --text-light: #718096;
  --border-color: #e2e8f0;
  --background-light: #f8fafc;
  --background-white: #ffffff;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06);
  --red: #e53e3e;
  --green: #38a169;
  --yellow: #d69e2e;
  --border-radius: 6px;
  --transition: all 0.2s ease;
}

/* Dashboard container */
.dashboard-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--text-color);
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background-color: var(--background-white);
  min-height: 100%;
  border-radius: 10px;
}

.dashboard-title {
  color: var(--primary-color);
  // font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--primary-light);
  padding-bottom: 12px;
}

/* Search and filter panel */
.search-filter-panel {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.search-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: var(--background-light);
  border-radius: var(--border-radius);
  padding: 0 12px;
  border: 1px solid var(--border-color);
  flex: 1;
  min-width: 280px;
  transition: var(--transition);
}

.search-container:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(58, 123, 213, 0.15);
}

.search-icon {
  color: var(--text-light);
  margin-right: 8px;
}

.search-input {
  border: none;
  padding: 12px 8px;
  font-size: 15px;
  width: 100%;
  background-color: transparent;
  color: var(--text-color);
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: var(--text-light);
}

.filter-buttons {
  display: flex;
  gap: 12px;
}

.filter-toggle-btn, .reset-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--background-white);
  border: 1px solid var(--border-color);
  padding: 10px 16px;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
  color: var(--text-color);
}

.filter-toggle-btn {
  background-color: var(--primary-light);
  color: var(--primary-color);
  border-color: transparent;
}

.filter-toggle-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.reset-btn:hover {
  background-color: var(--background-light);
}

.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
  flex: 1;
}

.filter-label {
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 6px;
  font-weight: 500;
}

.filter-select {
  padding: 10px 12px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--background-white);
  color: var(--text-color);
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  transition: var(--transition);
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(58, 123, 213, 0.15);
}

.history-checkbox {
  display: flex;
  align-items: flex-end;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  padding-left: 28px;
  user-select: none;
}

.history-checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: var(--background-white);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: var(--transition);
}

.checkbox-container:hover .checkmark {
  background-color: var(--background-light);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-size: 14px;
  color: var(--text-color);
}

/* Error message */
.error-message {
  background-color: #fff5f5;
  color: var(--red);
  padding: 12px 16px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  border-left: 4px solid var(--red);
  font-size: 14px;
}

/* Loading state */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
}

.loader {
  border: 4px solid var(--background-light);
  border-radius: 50%;
  border-top: 4px solid var(--primary-color);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Results summary */
.results-summary {
  color: var(--text-light);
  font-size: 14px;
  margin-bottom: 16px;
}

/* Data table */
.data-table-container {
  background-color: var(--background-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table thead {
  background-color: var(--background-light);
}

.data-table th {
  text-align: left;
  padding: 16px;
  font-weight: 600;
  color: var(--text-color);
  border-bottom: 2px solid var(--border-color);
}

.sort-button {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-weight: 600;
  font-size: 14px;
  padding: 0;
}

.sort-button:hover {
  color: var(--primary-color);
}

.data-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-color);
}

.data-row {
  cursor: pointer;
  transition: var(--transition);
}

.data-row:hover {
  background-color: var(--primary-light);
}

.data-row.expanded {
  background-color: var(--primary-light);
}

.expanded-content-row td {
  padding: 0;
  border-bottom: 1px solid var(--border-color);
}

.employee-id {
  font-family: 'Roboto Mono', monospace;
  color: var(--text-light);
}

.competency-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.expand-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  transition: var(--transition);
}

.expand-button:hover {
  color: var(--primary-color);
}

.actions-cell {
  text-align: center;
}

.delete-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  transition: var(--transition);
  padding: 6px;
  border-radius: 4px;
}

.delete-button:hover {
  color: var(--red);
  background-color: #fff5f5;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.no-results {
  text-align: center;
  padding: 40px !important;
  color: var(--text-light);
  font-style: italic;
}

/* Competency Details */
.competency-details {
  padding: 16px 24px 24px;
  background-color: var(--background-white);
}

.details-title {
  font-size: 16px;
  margin: 0 0 16px;
  color: var(--primary-color);
  font-weight: 600;
}

.competency-items-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 16px;
}

.competency-item {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--background-white);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.competency-item:hover {
  box-shadow: var(--shadow-md);
}

.item-header {
  padding: 12px 16px;
  background-color: var(--primary-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  font-weight: 600;
}

.main-category {
  color: var(--primary-color);
}

.sub-category {
  color: var(--text-light);
  margin-left: 6px;
  font-weight: normal;
}

.status-badge {
  font-size: 12px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 12px;
  text-transform: capitalize;
}

.status-badge.active {
  background-color: #ebf8ff;
  color: #3182ce;
}

.status-badge.completed {
  background-color: #f0fff4;
  color: var(--green);
}

.status-badge.expired {
  background-color: #fffaf0;
  color: var(--yellow);
}

.item-details {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.detail-group {
  margin-bottom: 12px;
}

.detail-group:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-weight: 600;
  color: var(--text-color);
  display: inline-block;
  margin-right: 4px;
}

.detail-group p {
  margin: 4px 0 0;
  color: var(--text-color);
}

.item-footer {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-light);
}

.metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.metric {
  font-size: 13px;
  color: var(--text-light);
}

.metric-label {
  font-weight: 500;
  color: var(--text-color);
}

.complete-button {
  background-color: var(--green);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: var(--border-radius);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.complete-button:hover {
  background-color: #2f855a;
}

.no-items-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 24px;
  color: var(--text-light);
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-buttons {
    justify-content: space-between;
  }
  
  .competency-items-list {
    grid-template-columns: 1fr;
  }
  
  .metrics {
    flex-direction: column;
    gap: 8px;
  }
  
  .item-footer {
    flex-direction: column;
    gap: 12px;
  }
  
  .complete-button {
    width: 100%;
  }
}

        `}
      </style>
      
    </div>
  ); 
};

export default CompetencyMappingDashboard;