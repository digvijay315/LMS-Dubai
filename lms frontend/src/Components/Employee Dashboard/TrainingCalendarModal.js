import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TrainingCalendarModal = ({ isOpen, onClose, trainingId, trainingName, employeeId, competencyItemId }) => {
  const [trainingEvents, setTrainingEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchTrainingEvents = async () => {
      if (!isOpen || !trainingId) return;
      
      try {
        setLoading(true);
        // Fetch all training events with matching training ID or name
        const response = await axios.get(`${base_url}/training_events_by_training/${trainingId}`);
        setTrainingEvents(response.data);
      } catch (error) {
        console.error('Error fetching training events:', error);
        toast.error('Failed to load training schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingEvents();
  }, [isOpen, trainingId, trainingName]);

  // Handle date click on calendar
  const handleDateClick = (date) => {
    // Format the date to match the format stored in the database (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];
    
    // Find events scheduled for this date
    const eventsOnDate = trainingEvents.filter(event => 
      event.from_date === formattedDate || 
      (new Date(event.from_date) <= date && new Date(event.to_date) >= date)
    );
    
    if (eventsOnDate.length > 0) {
      setSelectedDate(date);
      setSelectedEvent(eventsOnDate[0]); // Select the first event if multiple exist
    } else {
      setSelectedDate(null);
      setSelectedEvent(null);
      toast.info('No training events scheduled for this date');
    }
  };

  // Register for the selected training event
  const registerForTraining = async () => {
    if (!selectedEvent || !employeeId) return;
    
    try {
      setRegistering(true);
      
      const registrationData = {
        employeeId: employeeId,
        eventId: selectedEvent._id,
        trainingId: trainingId,
        competencyItemId: competencyItemId,
        registrationDate: new Date().toISOString(),
        status: 'registered'
      };
      
      const response = await axios.post(`${base_url}/register_for_training`, registrationData);
      
      if (response.data.success) {
        toast.success('Successfully registered for training!', {autoClose: 2000});
        setTimeout(() => {
            onClose();  
        }, 2000);   
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering for training:', error);
      toast.error('Failed to register for training');
    } finally {
      setRegistering(false);
    }
  };

  // Highlight dates with training events
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null;
    
    const formattedDate = date.toISOString().split('T')[0];
    
    const hasEvent = trainingEvents.some(event => 
      event.from_date === formattedDate || 
      (new Date(event.from_date) <= date && new Date(event.to_date) >= date)
    );
    
    return hasEvent ? 'training-date' : null;
  };

  // Return null if modal is not open
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="training-calendar-modal">
        <div className="modal-header">
          <h2>Training Schedule: {trainingName}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <div className="loading-spinner">Loading training schedule...</div>
          ) : trainingEvents.length === 0 ? (
            <div className="no-events">
              <p>No scheduled training events found for this training.</p>
            </div>
          ) : (
            <div className="calendar-container">
              <Calendar 
                className="training-calendar"
                tileClassName={tileClassName}
                onClickDay={handleDateClick}
              />
              
              {selectedEvent && (
                <div className="event-details">
                  <h3>Training Details</h3>
                  <div className="detail-row">
                    <span className="detail-label">Training:</span>
                    <span className="detail-value">{selectedEvent.training_name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Code:</span>
                    <span className="detail-value">{selectedEvent.training_code}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category:</span>
                    <span className="detail-value">{selectedEvent.training_category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Mode:</span>
                    <span className="detail-value">{selectedEvent.training_mode}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Trainer:</span>
                    <span className="detail-value">{selectedEvent.trainer_name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Dates:</span>
                    <span className="detail-value">
                      {selectedEvent.from_date} to {selectedEvent.to_date}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Time:</span>
                    <span className="detail-value">
                      {selectedEvent.from_time} - {selectedEvent.to_time}
                    </span>
                  </div>
                  {selectedEvent.venue_name && (
                    <div className="detail-row">
                      <span className="detail-label">Venue:</span>
                      <span className="detail-value">{selectedEvent.venue_name}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value">{selectedEvent.description}</span>
                  </div>
                  
                  <button 
                    className="register-btn"
                    onClick={registerForTraining}
                    disabled={registering}
                  >
                    {registering ? 'Registering...' : 'Click to Register'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer/>

      <style jsx>{`
    /* Training Calendar Modal Styles */
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

.training-calendar-modal {
background-color: white;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
width: 90%;
max-width: 1000px;
max-height: 90vh;
overflow-y: auto;
}

.modal-header {
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px 24px;
border-bottom: 1px solid #eaeaea;
}

.modal-header h2 {
margin: 0;
font-size: 20px;
color: #333;
}

.close-btn {
background: none;
border: none;
font-size: 24px;
cursor: pointer;
color: #777;
}

.modal-body {
padding: 24px;
}

.loading-spinner {
display: flex;
justify-content: center;
align-items: center;
height: 200px;
color: #777;
}

.no-events {
text-align: center;
padding: 40px 0;
color: #777;
}

.calendar-container {
display: flex;
flex-wrap: wrap;
gap: 24px;
}

.training-calendar {
width: 100%;
max-width: 450px;
border: none !important;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.react-calendar__tile {
padding: 10px;
height: 60px;
display: flex;
justify-content: center;
align-items: center;
}

/* Style for dates with training events */
.training-date {
background-color: rgba(76, 175, 80, 0.2);
border-radius: 50%;
position: relative;
}

.training-date:after {
content: '';
position: absolute;
bottom: 4px;
left: 50%;
transform: translateX(-50%);
width: 6px;
height: 6px;
background-color: #4CAF50;
border-radius: 50%;
}

/* Add animation for blinking effect */
@keyframes blink {
0% { opacity: 1; }
50% { opacity: 0.5; }
100% { opacity: 1; }
}

.training-date.selected {
animation: blink 1.5s infinite;
background-color: rgba(76, 175, 80, 0.4);
}

.event-details {
flex: 1;
min-width: 300px;
background-color: #f9f9f9;
border-radius: 8px;
padding: 20px;
}

.event-details h3 {
margin-top: 0;
margin-bottom: 16px;
color: #333;
font-size: 18px;
}

.detail-row {
display: flex;
margin-bottom: 12px;
}

.detail-label {
font-weight: 600;
width: 100px;
color: #555;
}

.detail-value {
flex: 1;
}

.register-btn {
margin-top: 24px;
background-color: #4CAF50;
color: white;
border: none;
border-radius: 4px;
padding: 12px 24px;
font-size: 16px;
cursor: pointer;
transition: background-color 0.3s;
}

.register-btn:hover {
background-color: #388E3C;
}

.register-btn:disabled {
background-color: #9E9E9E;
cursor: not-allowed;
}

/* Responsive styles */
@media (max-width: 768px) {
.calendar-container {
  flex-direction: column;
}

.training-calendar {
  max-width: 100%;
}
}
    `}
</style>

    </div>
  );
};

export default TrainingCalendarModal;



