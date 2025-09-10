import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TrainingScheduler = () => {
    const [trainingData, setTrainingData] = useState({
        training_category: '',
        training_name: '',
        description: '',
        region: '',
        project_title: '',
        job_title: '',
        from_date: new Date(),
        to_date: new Date(),
        from_time: '',
        to_time: '',
        participants: '',
        venue_name: '',
        status: ''
    });
    const [trainings, setTrainings] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTraining, setSelectedTraining] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrainingData({ ...trainingData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/add_events_data', trainingData);
            alert("training scheduled")
            
            setTrainings([...trainings, response.data]);
            setTrainingData({
                training_category: '',
                training_name: '',
                description: '',
                region: '',
                project_title: '',
                job_title: '',
                from_date: new Date(),
                to_date: new Date(),
                from_time: '',
                to_time: '',
                participants: '',
                venue_name: '',
                status: ''
            });
        } catch (error) {
            console.error('Error saving training:', error);
        }
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        const trainingsOnDate = trainings.filter(training => {
            const trainingDate = new Date(training.from_date);
            return trainingDate.toDateString() === date.toDateString();
        });
        setSelectedTraining(trainingsOnDate);
    };

    useEffect(() => {
        const fetchTrainings = async () => {
            try {
                const response = await axios.get('http://localhost:5000/event_details_get');
                setTrainings(response.data);
            } catch (error) {
                console.error('Error fetching trainings:', error);
            }
        };

        fetchTrainings();
    }, []);

    return (
        <div>
            <h2>Create Training</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="training_category"
                    placeholder="Training Category"
                    value={trainingData.training_category}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="training_name"
                    placeholder="Training Name"
                    value={trainingData.training_name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={trainingData.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="region"
                    placeholder="Region"
                    value={trainingData.region}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="project_title"
                    placeholder="Project Title"
                    value={trainingData.project_title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="job_title"
                    placeholder="Job Title"
                    value={trainingData.job_title}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="from_date"
                    value={trainingData.from_date.toISOString().substring(0, 10)}
                    onChange={(e) => setTrainingData({ ...trainingData, from_date: new Date(e.target.value) })}
                    required
                />
                <input
                    type="date"
                    name="to_date"
                    value={trainingData.to_date.toISOString().substring(0, 10)}
                    onChange={(e) => setTrainingData({ ...trainingData, to_date: new Date(e.target.value) })}
                    required
                />
                <input
                    type="time"
                    name="from_time"
                    value={trainingData.from_time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="to_time"
                    value={trainingData.to_time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="participants"
                    placeholder="Participants"
                    value={trainingData.participants}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="venue_name"
                    placeholder="Venue Name"
                    value={trainingData.venue_name}
                    onChange={handleChange}
                />
                <select
                    name="status"
                    value={trainingData.status}
                    onChange={handleChange}
                >
                    <option value="">Select Status</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button type="submit">Create Training</button>
            </form>
            <button  onClick={toggleCalendar}>
                {showCalendar ? 'Hide Calendar' : 'View Calendar'}
            </button>
            {showCalendar && (
            <div style={{ width: "100%", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Calendar
                    onClickDay={handleDateClick}
                    tileContent={({ date }) => {
                        const trainingOnDate = trainings.filter(training =>
                            new Date(training.from_date).toDateString() === date.toDateString()
                        );

                        const isPastDate = date < new Date(); // Check if the date is in the past

                        if (trainingOnDate.length > 0) {
                            return (
                                <span className={isPastDate ? "blink-red" : "blink"}>
                                    🟢
                                </span>
                            ); // Use red blinking for past dates
                        }

                        return null;
                    }}
                    tileClassName={({ date }) => {
                        const fromDate = new Date(trainingData.from_date);
                        const toDate = new Date(trainingData.to_date);

                        // Check if the date is within the training date range
                        if (date >= fromDate && date <= toDate) {
                            return 'highlight'; // Apply highlight class
                        }
                        return null;
                    }}
                />
                <div style={{ marginTop: '20px' }}>
                    <h3>Training Details for {selectedDate.toDateString()}</h3>
                    {selectedTraining.length > 0 ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse',marginBottom:"100px" }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Training Name</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Category</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Description</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Region</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Project Title</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Job Title</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>From Date</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>To Date</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>From Time</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>To Time</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Participants</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Venue Name</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedTraining.map((training, index) => (
                                    <tr key={index} style={{ border: '1px solid #ccc' }}>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.training_name}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.training_category}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.description}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.region}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.project_title}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.job_title}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{new Date(training.from_date).toDateString()}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{new Date(training.to_date).toDateString()}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.from_time}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.to_time}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.participants}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.venue_name}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{training.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No training scheduled for this date.</p>
                    )}
                </div>
            </div>
        )}

        </div>
    );
};

export default TrainingScheduler;