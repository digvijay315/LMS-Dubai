import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '../Utils/base_url';

const EmployeeINAPlatform = () => {
  const { employeeId, inaCode, competencyItemId } = useParams();
  const navigate = useNavigate();
  const [inaData, setInaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState('');
  const [developmentNeeds, setDevelopmentNeeds] = useState('');
//   const base_url = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchINAData = async () => {
      try {
        const response = await axios.get(`${base_url}/get_ina_dataById/${inaCode}`);
        setInaData(response.data.create_ina);
        
        // Initialize ratings state with empty values
        const initialRatings = {};
        if (response.data && response.data.activities) {
          response.data.activities.forEach(activity => {
            if (activity.content) {
              activity.content.forEach(item => {
                initialRatings[`${activity._id}-${item._id}`] = null;
              });
            }
          });
        }
        setRatings(initialRatings);
      } catch (error) {
        console.error('Error fetching INA data:', error);
        toast.error('Failed to load the INA assessment');
      } finally {
        setLoading(false);
      }
    };

    fetchINAData();
  }, [inaCode]);

  const handleRatingChange = (activityId, itemId, value) => {
    setRatings(prev => ({
      ...prev,
      [`${activityId}-${itemId}`]: parseInt(value, 10)
    }));
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleDevelopmentNeedsChange = (e) => {
    setDevelopmentNeeds(e.target.value);
  };

  const calculateFinalScore = () => {
    if (!inaData || !inaData.activities) return 0;
    
    let totalRating = 0;
    let totalItems = 0;
    
    Object.entries(ratings).forEach(([key, rating]) => {
      if (rating !== null) {
        totalRating += rating;
        totalItems++;
      }
    });
    
    return totalItems > 0 ? (totalRating / totalItems).toFixed(2) : 0;
  };

  const checkAllRated = () => {
    if (!inaData || !inaData.activities) return false;
    
    for (const key in ratings) {
      if (ratings[key] === null) {
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkAllRated()) {
      toast.warning('Please rate all items before submitting');
      return;
    }
    
    const finalScore = calculateFinalScore();
    
    setSubmitLoading(true);
    
    try {
      // Create submission data structure
      const submissionData = {
        employeeId,
        competencyItemId,
        inaCode,
        inaTitle: inaData.ina_title,
        ratings: { ...ratings },
        comments,
        developmentNeeds,
        finalScore,
        submittedDate: new Date()
      };
      
      // Submit INA results
      await axios.post(`${base_url}/submit_ina_result`, submissionData);
      
      // Update competency item status if needed
      await axios.patch(`${base_url}/update_competency_item_status`, {
        competencyItemId,
        status: 'Completed',
        score: finalScore
      });
      
      toast.success('INA assessment submitted successfully');
      
      // Navigate back to competency list
      navigate(`/competencyMappingList/${employeeId}`);
    } catch (error) {
      console.error('Error submitting INA assessment:', error);
      toast.error('Failed to submit your assessment');
    } finally {
      setSubmitLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate(`/competencyMappingList/${employeeId}`);
  };

  if (loading) {
    return (
      <div className="assessment-loading">
        <div className="spinner"></div>
        <p>Loading INA assessment...</p>
      </div>
    );
  }

  if (!inaData) {
    return (
      <div className="assessment-error">
        <p>No INA data found for the specified code.</p>
        <button onClick={() => navigate(`/competency-mappings/${employeeId}`)}>
          Return to Competency Mappings
        </button>
      </div>
    );
  }

  // Parse rating range (e.g., "1-5" to get min and max values)
  const ratingRange = inaData.rating_range_ina.split('-');
  const minRating = parseInt(ratingRange[0], 10) || 1;
  const maxRating = parseInt(ratingRange[1], 10) || 5;

  return (
    <div>

        <div className="ina-container">
        <h4 style={{marginBottom:"1rem", padding:"1rem 2rem", backgroundColor:"#4B0082", color:"#fff", borderRadius:"8px"}}>INA - On Job Training</h4>
          <div className="ina-header">
            <h1>{inaData.ina_title}</h1>
            <p className="ina-code">Code: {inaData.ina_code}</p>
            <p className="rating-instruction">
              Please rate your current proficiency level for each item on a scale of {inaData.rating_range_ina}.
              <br />
              <small>
                {minRating} = Low Proficiency/Development Needed, {maxRating} = High Proficiency/Mastery
              </small>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {inaData.activities && inaData.activities.map(activity => (
              <div className="ina-activity-section" key={activity._id}>
                <h2 className="activity-title">{activity.activity_ina_title}</h2>
                
                <div className="ina-items">
                  <div className="rating-header">
                    <span className="item-description">Competency/Skill Description</span>
                    <div className="rating-scale">
                      {Array.from({ length: maxRating - minRating + 1 }, (_, i) => minRating + i).map(num => (
                        <span key={num} className="rating-value">{num}</span>
                      ))}
                    </div>
                  </div>
                  
                  {activity.content && activity.content.map(item => (
                    <div className="ina-item" key={item._id || item.srno}>
                      <div className="item-content">
                        <span className="item-number">{item.srno}.</span>
                        <span className="item-description">{item.description}</span>
                      </div>
                      <div className="rating-options">
                        {Array.from({ length: maxRating - minRating + 1 }, (_, i) => minRating + i).map(num => (
                          <label key={num} className="rating-radio">
                            <input
                              type="radio"
                              name={`rating-${activity._id}-${item._id || item.srno}`}
                              value={num}
                              checked={ratings[`${activity._id}-${item._id || item.srno}`] === num}
                              onChange={() => handleRatingChange(activity._id, item._id || item.srno, num)}
                            />
                            <span className="checkmark"></span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="ina-development-needs">
              <h3>Development Needs</h3>
              <textarea 
                value={developmentNeeds}
                onChange={handleDevelopmentNeedsChange}
                placeholder="Describe your specific development needs related to the assessed competencies..."
                rows={5}
              ></textarea>
            </div>

            <div className="ina-comments">
              <h3>Additional Comments</h3>
              <textarea 
                value={comments}
                onChange={handleCommentsChange}
                placeholder="Add any additional comments or feedback here..."
                rows={4}
              ></textarea>
            </div>

            <div className="ina-actions">
              <button 
                type="submit" 
                className="submit-btn"
                disabled={submitLoading || !checkAllRated()}
              >
                {submitLoading ? 'Submitting...' : 'Submit Self-Assessment'}
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

      <style jsx>
        {`
        /* Common styles for assessment components */
.oja-container,
.ina-container {
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 2rem auto;
}

.oja-header,
.ina-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.oja-header h1,
.ina-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.oja-code,
.ina-code {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.rating-instruction {
  background-color: #f0f7ff;
  padding: 0.8rem;
  border-radius: 4px;
  border-left: 4px solid #3498db;
  margin-top: 1rem;
}

.rating-instruction small {
  display: block;
  margin-top: 0.5rem;
  color: #555;
}

.oja-activity-section,
.ina-activity-section {
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.activity-title {
  background-color: #f2f2f2;
  padding: 0.8rem 1rem;
  font-size: 1.2rem;
  margin: 0;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
}

.oja-items,
.ina-items {
  padding: 1rem;
}

.rating-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #eaeaea;
  font-weight: bold;
}

.rating-header .item-description {
  flex: 1;
}

.rating-scale {
  display: flex;
  justify-content: space-around;
  width: 35%;
  text-align: center;
}

.rating-value {
  width: 30px;
  display: inline-block;
}

.oja-item,
.ina-item {
  display: flex;
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.oja-item:last-child,
.ina-item:last-child {
  border-bottom: none;
}

.item-content {
  flex: 1;
  display: flex;
  align-items: flex-start;
}

.item-number {
  margin-right: 0.5rem;
  color: #666;
  min-width: 25px;
}

.item-description {
  flex: 1;
}

.rating-options {
  display: flex;
  justify-content: space-around;
  width: 35%;
}

.rating-radio {
  display: block;
  position: relative;
  padding-left: 0;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  width: 30px;
  height: 30px;
  text-align: center;
}

.rating-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 50%;
  border: 1px solid #ddd;
}

.rating-radio:hover input ~ .checkmark {
  background-color: #ccc;
}

.rating-radio input:checked ~ .checkmark {
  background-color: #3498db;
  border-color: #3498db;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.rating-radio input:checked ~ .checkmark:after {
  display: block;
}

.rating-radio .checkmark:after {
  top: 6px;
  left: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.oja-comments,
.ina-comments,
.ina-development-needs {
  margin: 2rem 0;
}

.oja-comments h3,
.ina-comments h3,
.ina-development-needs h3 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: #333;
}

.oja-comments textarea,
.ina-comments textarea,
.ina-development-needs textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: inherit;
}

.oja-actions,
.ina-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  border: none;
}

.submit-btn:hover:not(:disabled) {
  background-color: #2980b9;
}

.submit-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background-color: #f5f5f5;
}

.assessment-loading,
.assessment-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #3498db;
  animation: spin 1s ease infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive styles */
@media (max-width: 768px) {
  .oja-container,
  .ina-container {
    padding: 1rem;
    margin: 1rem;
  }
  
  .rating-options,
  .rating-scale {
    width: 45%;
  }
  
  .oja-item,
  .ina-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .rating-options {
    width: 100%;
    margin-top: 1rem;
    justify-content: flex-start;
    gap: 1rem;
  }
  
  .oja-actions,
  .ina-actions {
    flex-direction: column;
  }
  
  .submit-btn,
  .cancel-btn {
    width: 100%;
  }
}
        `}
      </style>
    </div>
  );
};

export default EmployeeINAPlatform;