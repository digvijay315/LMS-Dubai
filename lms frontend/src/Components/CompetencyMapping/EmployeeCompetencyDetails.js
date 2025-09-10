import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../Utils/base_url';

export default function EmployeeCompetencyDetails() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [competencyItems, setCompetencyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date filter states
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    fetchEmployeeCompetencyData();
  }, [employeeId]);

  const fetchEmployeeCompetencyData = async () => {
    try {
      setLoading(true);
      const employeeResponse = await axios.get(`${base_url}/employees`);
      const foundEmployee = employeeResponse.data.find(
        emp => String(emp.employee_id) === String(employeeId)
      );

      if (!foundEmployee) {
        throw new Error("Employee not found");
      }
      setEmployee(foundEmployee);

      const mappingsResponse = await axios.get(`${base_url}/employee_competency_mappings/${foundEmployee._id}`);

      if (Array.isArray(mappingsResponse.data) && mappingsResponse.data.length > 0) {
        setCompetencyItems(mappingsResponse.data[0].competencyItems || []);
      } else if (mappingsResponse.data?.competencyItems) {
        setCompetencyItems(mappingsResponse.data.competencyItems);
      } else {
        setCompetencyItems([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee competency data:", error);
      setError("Failed to load employee data. Please try again.");
      setLoading(false);
      toast.error("Failed to load employee data");
    }
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      await axios.patch(`${base_url}/competency_item_status`, {
        employeeId,
        itemId,
        status: newStatus
      });

      const updatedItems = competencyItems.map(item =>
        item._id === itemId ? { ...item, status: newStatus } : item
      );

      setCompetencyItems(updatedItems);

      // If filtered view is active, update filteredItems accordingly
      if (filteredItems !== null) {
        const filteredUpdated = updatedItems.filter(item => {
          if (item.status !== 'completed' || !item.deadLine) return false;
          const dl = new Date(item.deadLine);
          const from = new Date(fromDate);
          const to = new Date(toDate);
          return dl >= from && dl <= to;
        });
        setFilteredItems(filteredUpdated);
      }

      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating competency item status:", error);
      toast.error("Failed to update status");
    }
  };

  // Filter handler
  const handleFilter = () => {
    if (!fromDate || !toDate) {
      toast.error("Please select both From and To dates");
      return;
    }
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = competencyItems.filter(item => {
      if (item.status !== 'completed' || !item.deadLine) return false;
      const dl = new Date(item.deadLine);
      return dl >= from && dl <= to;
    });

    setFilteredItems(filtered);
  };

  const clearFilter = () => {
    setFromDate('');
    setToDate('');
    setFilteredItems(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!employee) return <div className="error">Employee not found</div>;

  const itemsToShow = filteredItems === null ? competencyItems : filteredItems;

  return (
    <div className="employee-competency-details">
      <div className="header">
        <h1>Competency Details for {employee.employee_name}</h1>
        <Link to="/competencyMapping" className="btn btn-primary">Back to Mapping</Link>
      </div>

      <div className="employee-info">
        <div><strong>Employee ID:</strong> {employee.employee_id}</div>
        <div><strong>Function:</strong> {employee.function_title}</div>
        <div><strong>Job Title:</strong> {employee.job_title}</div>
      </div>

      {/* Date filter: inline from-to and buttons */}
      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem' }}>
          From:
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            style={{ marginTop: '4px' }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', fontSize: '0.9rem' }}>
          To:
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            style={{ marginTop: '4px' }}
          />
        </label>

        <button onClick={handleFilter} className="btn btn-secondary btn-sm" style={{ height: '32px' }}>
          Filter Completed
        </button>

        <button onClick={clearFilter} className="btn btn-link btn-sm" style={{ height: '32px' }}>
          Clear
        </button>
      </div>

      <h2>Competency Items</h2>

      {itemsToShow.length === 0 ? (
        <div className="no-items">No competency items assigned to this employee yet.</div>
      ) : (
        <table className="items-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Skill Level</th>
              <th>Training</th>
              <th>OJT</th>
              <th>Assessment</th>
              <th>OJA</th>
              <th>INA</th>
              <th>Validity</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {itemsToShow.map(item => (
              <tr key={item._id} className={`status-${item.status}`}>
                <td>{item.mainCategory}</td>
                <td>{item.subCategory}</td>
                <td>{item.skillLevel}</td>
                <td>{item.trainingCode === 'NA' ? 'N/A' : item.trainingCode}</td>
                <td>{item.ojtCode === 'NA' ? 'N/A' : item.ojtCode}</td>
                <td>{item.lmsAssessmentCode === 'NA' ? 'N/A' : item.lmsAssessmentCode}</td>
                <td>{item.ojaCode === 'NA' ? 'N/A' : item.ojaCode}</td>
                <td>{item.inaCode === 'NA' ? 'N/A' : item.inaCode}</td>
                <td>{item.validity}</td>
                <td>{new Date(item.deadLine).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div className="status-actions" style={{ display: 'flex', gap: '6px' }}>
                    {item.status !== 'completed' && (
                      <button
                        onClick={() => handleStatusChange(item._id, 'completed')}
                        className="btn btn-success btn-sm"
                      >
                        Mark Complete
                      </button>
                    )}
                    {item.status !== 'expired' && (
                      <button
                        onClick={() => handleStatusChange(item._id, 'expired')}
                        className="btn btn-danger btn-sm"
                      >
                        Mark Expired
                      </button>
                    )}
                    {(item.status === 'completed' || item.status === 'expired') && (
                      <button
                        onClick={() => handleStatusChange(item._id, 'active')}
                        className="btn btn-primary btn-sm"
                      >
                        Reactivate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ToastContainer />
    </div>
  );
}
