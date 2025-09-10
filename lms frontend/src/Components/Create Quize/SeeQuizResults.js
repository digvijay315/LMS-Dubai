import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { base_url } from '../Utils/base_url';
import { useParams } from 'react-router-dom';

function SeeQuizResults() {
    const { quizId } = useParams();
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await axios.get(`${base_url}/quiz-responses/${quizId}`);
                console.log('API Response:', response);
                
                // Check if response has data property and it's properly structured
                if (response.data && response.data.success && Array.isArray(response.data.data)) {
                    setResponses(response.data.data);
                } else {
                    console.error('Invalid response structure:', response.data);
                    toast.error('Invalid response format from server');
                    setResponses([]);
                }
            } catch (error) {
                console.error('Error fetching responses:', error);
                toast.error(error.response?.data?.message || 'Error fetching quiz responses');
                setResponses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, [quizId]);

    const handleViewDetails = (responseId) => {
        navigate(`/quiz-response/${responseId}`);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px'
            }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!responses.length) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px'
            }}>
                <p>No quiz responses available.</p>
            </div>
        );
    }

    return (
        <div className="p-6" style={{padding: '2rem'}}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
                <thead style={{ backgroundColor: '#2E073F', color: 'white' }}>
                    <tr>
                        <th style={tableHeaderStyle}>Sr. no.</th>
                        <th style={tableHeaderStyle}>Employee Id</th>
                        <th style={tableHeaderStyle}>Employee name</th>
                        <th style={tableHeaderStyle}>Job title</th>
                        <th style={tableHeaderStyle}>Quiz title</th>
                        <th style={tableHeaderStyle}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {responses.map((response, index) => (
                        <tr key={response._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={tableCellStyle}>{index + 1}</td>
                            <td style={tableCellStyle}>{response.employee_id}</td>
                            <td style={tableCellStyle}>{response.employee_name}</td>
                            <td style={tableCellStyle}>{response.job_title}</td>
                            <td style={tableCellStyle}>{response.quizTitle}</td>
                            <td style={tableCellStyle}>
                                <button
                                    onClick={() => handleViewDetails(response._id)}
                                    style={buttonStyle}
                                >
                                    View details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Styles
const tableHeaderStyle = {
    padding: '16px',
    textAlign: 'left',
    fontWeight: '600'
};

const tableCellStyle = {
    padding: '16px',
    borderBottom: '1px solid #eee'
};

const buttonStyle = {
    backgroundColor: '#2E073F',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':hover': {
        backgroundColor: '#1a0426'
    }
};

export default SeeQuizResults;