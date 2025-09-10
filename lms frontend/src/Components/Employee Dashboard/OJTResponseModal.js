import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '../Utils/base_url';

const OJTResponseModal = ({ isOpen, onClose, ojtData, employeeId }) => {
  // Use state to track employee checks
  const [activityChecks, setActivityChecks] = useState(
    ojtData.activities.map(activity => 
      activity.content.map(item => item.employeeChecked || false)
    )
  );
  
  const [saving, setSaving] = useState(false);

  if (!isOpen || !ojtData) return null;

  // Handle checkbox change
  const handleCheckboxChange = (activityIndex, contentIndex) => {
    const newChecks = [...activityChecks];
    newChecks[activityIndex][contentIndex] = !newChecks[activityIndex][contentIndex];
    setActivityChecks(newChecks);
  };

  // Save employee responses
  const saveEmployeeResponses = async () => {
    setSaving(true);
    try {
      // Prepare data for update
      const updatedActivities = ojtData.activities.map((activity, activityIndex) => ({
        activity_id: activity.activity_id,
        content: activity.content.map((content, contentIndex) => ({
          content_id: content.content_id,
          employeeChecked: activityChecks[activityIndex][contentIndex]
        }))
      }));

      // Send update request
      const response = await axios.put(
        `${base_url}/update-employee-ojt-checks/${ojtData._id}/${employeeId}`, 
        { activities: updatedActivities }
      );

      if (response.data.success) {
        toast.success('Your OJT responses have been saved successfully');
        onClose(); // Close modal after successful save
      } else {
        toast.error(response.data.message || 'Failed to save your responses');
      }
    } catch (error) {
      console.error('Error saving employee OJT responses:', error);
      toast.error('An error occurred while saving your responses');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="ojt-modal-container">
        <div className="ojt-modal-header">
          <h2>{ojtData.ojt_title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="ojt-modal-content">
          <div className="ojt-info">
            <p><strong>OJT Code:</strong> {ojtData.ojt_code}</p>
            <p><strong>Conducted By:</strong> {ojtData.conductedBy_name}</p>
            <p><strong>Conducted On:</strong> {new Date(ojtData.conductDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {ojtData.status}</p>
          </div>
          
          <div className="ojt-activities">
            <h3>OJT Activities</h3>
            
            {ojtData.activities.map((activity, activityIndex) => (
              <div key={activity.activity_id} className="ojt-activity">
                <h4>{activity.activity_ojt_title}</h4>
                
                <div className="content-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>Description</th>
                        <th>Trainer Check</th>
                        <th>Your Check</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activity.content.map((content, contentIndex) => (
                        <tr key={content.content_id}>
                          <td>{content.srno}</td>
                          <td>{content.description}</td>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={content.trainerChecked} 
                              disabled 
                            />
                          </td>
                          <td>
                            <input 
                              type="checkbox" 
                              checked={activityChecks[activityIndex][contentIndex]} 
                              onChange={() => handleCheckboxChange(activityIndex, contentIndex)} 
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="ojt-modal-footer">
          <button 
            className="cancel-btn" 
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button 
            className="save-btn" 
            onClick={saveEmployeeResponses}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Responses'}
          </button>
        </div>
      </div>

      <style jsx>{`
      /* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* OJT Modal Container */
.ojt-modal-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* OJT Modal Header */
.ojt-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e1e4e8;
  background-color: #f6f8fa;
}

.ojt-modal-header h2 {
  margin: 0;
  font-size: 20px;
  color: #24292e;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #586069;
}

.close-btn:hover {
  color: #24292e;
}

/* OJT Modal Content */
.ojt-modal-content {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

/* OJT Info section */
.ojt-info {
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f6f8fa;
  border-radius: 6px;
}

.ojt-info p {
  margin: 8px 0;
}

/* OJT Activities */
.ojt-activities {
  margin-bottom: 20px;
}

.ojt-activities h3 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #24292e;
}

.ojt-activity {
  margin-bottom: 24px;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  overflow: hidden;
}

.ojt-activity h4 {
  margin: 0;
  padding: 12px 16px;
  background-color: #f6f8fa;
  border-bottom: 1px solid #e1e4e8;
  font-size: 16px;
}

/* Content Table */
.content-table {
  overflow-x: auto;
}

.content-table table {
  width: 100%;
  border-collapse: collapse;
}

.content-table th,
.content-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e1e4e8;
}

.content-table th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.content-table tr:last-child td {
  border-bottom: none;
}

/* Checkboxes */
.content-table input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.content-table input[type="checkbox"]:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* OJT Modal Footer */
.ojt-modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e1e4e8;
  background-color: #f6f8fa;
}

/* Buttons */
.cancel-btn, .save-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  color: #24292e;
}

.cancel-btn:hover {
  background-color: #f3f4f6;
}

.save-btn {
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, 0.15);
  color: white;
}

.save-btn:hover {
  background-color: #2c974b;
}

.cancel-btn:disabled, .save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* OJT Status in CompetencyMappingList */
.ojt-status {
  margin: 10px 0;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.text-green-600 {
  background-color: rgba(46, 160, 67, 0.1);
  color: #2ea043;
}

.text-blue-600 {
  background-color: rgba(33, 136, 255, 0.1);
  color: #2188ff;
}

.text-yellow-600 {
  background-color: rgba(249, 197, 19, 0.1);
  color: #cb9a00;
}

.text-orange-600 {
  background-color: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.text-gray-600 {
  background-color: rgba(88, 96, 105, 0.1);
  color: #586069;
}

.ojt-status-loading {
  color: #586069;
  font-style: italic;
  margin: 10px 0;
  font-size: 14px;
}

/* View OJT Button */
.view-btn.ojt-btn {
  background-color: #0366d6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}

.view-btn.ojt-btn:hover {
  background-color: #0358c2;
}
    
        `}</style>
    </div>
  );
};

export default OJTResponseModal;