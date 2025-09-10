import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '../Utils/base_url';

const QuizResponseDetails = () => {
  const { responseId } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponseDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/quiz-response/${responseId}`);
        if (response.data && response.data.data) {
          setResponseData(response.data.data);
        } else {
          setError('Invalid response format from server');
          toast.error('Invalid response format from server');
        }
      } catch (error) {
        setError(error.message);
        toast.error('Error fetching response details');
      } finally {
        setLoading(false);
      }
    };
    fetchResponseDetails();
  }, [responseId]);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error || !responseData) return <div className="error-container">Error: {error || 'No data available'}</div>;

  const hasAnswers = responseData.answers && Array.isArray(responseData.answers);

  // Render match/matrix/likert as table (SR2 style)
  const renderMatrixTable = (answerObj) => (
    <div style={{ overflowX: 'auto', margin: '14px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f7f7f7' }}>
            <th style={{ textAlign: 'left', padding: '8px', fontWeight: 'bold' }}>Statement</th>
            {answerObj.options && answerObj.options.map((opt, idx) => (
              <th key={idx} style={{ textAlign: 'center', padding: '8px', fontWeight: 'bold' }}>{opt}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {answerObj.answer.map((pair, rowIdx) => (
            <tr key={rowIdx}>
              <td style={{ textAlign: 'left', fontWeight: 600, padding: '8px' }}>{pair.statement}</td>
              {answerObj.options.map((opt, colIdx) => (
                <td key={colIdx} style={{ textAlign: 'center', padding: '8px' }}>
<label className="custom-radio">
  <input
    type="radio"
    checked={opt === pair.selectedOption}
    style={{ display: 'none' }}
    disabled
    readOnly
  />
  <span className={opt === pair.selectedOption ? 'radio-dot checked' : 'radio-dot'}></span>
</label>


</td>

              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div
      className="quiz-response-container"
      style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}
    >
      <div
        className="response-card"
        style={{
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h4
          className="card-title"
          style={{
            color: '#2E073F',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid #2E073F'
          }}
        >
          Survey Response Details
        </h4>

        {/* Employee Information */}
        <div className="info-section" style={{
          background: '#f8f9fa',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h5 style={{ marginBottom: '1rem', color: '#2E073F' }}>Employee Information</h5>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <div className="info-label" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Employee ID</div>
              <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem' }}>{responseData.employee_id || 'N/A'}</div>
            </div>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <div className="info-label" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Name</div>
              <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem' }}>{responseData.employee_name || 'N/A'}</div>
            </div>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <div className="info-label" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Job Title</div>
              <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem' }}>{responseData.job_title || 'N/A'}</div>
            </div>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <div className="info-label" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Survey Title</div>
              <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem' }}>{responseData.quizTitle || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div
          className="results-summary"
          style={{
            background: '#EDE7F6',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '2rem'
          }}
        >
          <h5 style={{ marginBottom: '1rem', color: '#2E073F' }}>Survey Results</h5>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <div className="info-label" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Completion Time</div>
              <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem' }}>
                {responseData.completionTime
                  ? `${Math.floor(responseData.completionTime / 60)} minutes ${responseData.completionTime % 60} seconds`
                  : 'N/A'}
              </div>
            </div>
            <div className="info-item" style={{ marginBottom: '1rem' }}>
              <div className="info-label" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>Submitted At</div>
              <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem' }}>
                {responseData.submittedAt ? new Date(responseData.submittedAt).toLocaleString() : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="answer-section" style={{ marginTop: '2rem' }}>
          <h5 style={{ marginBottom: '1.5rem', color: '#2E073F' }}>Question Responses</h5>
          {hasAnswers ? (
            responseData.answers.map((answer, index) => {
              const isMatrixType =
                Array.isArray(answer.answer) &&
                answer.answer.length > 0 &&
                answer.options &&
                answer.options.length > 0 &&
                typeof answer.answer[0] === "object" &&
                "statement" in answer.answer[0] &&
                "selectedOption" in answer.answer[0];

              return (
                <div
                  key={index}
                  className={`answer-item ${answer.isCorrect ? 'answer-correct' : 'answer-incorrect'}`}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    backgroundColor: answer.isCorrect ? '#E8F5E9' : '#FFEBEE',
                    borderColor: answer.isCorrect ? '#81C784' : '#E57373'
                  }}
                >
                  <div
                    className="answer-header"
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span className="question-number" style={{ fontWeight: 600, fontSize: '1.1rem', color: '#2E073F' }}>
                      Question {answer.questionId || index + 1}
                    </span>
                    {answer.isCorrect !== null && (
                      <span
                        className={`status-badge ${answer.isCorrect ? 'status-correct' : 'status-incorrect'}`}
                        style={{
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          backgroundColor: answer.isCorrect ? '#C8E6C9' : '#FFCDD2',
                          color: answer.isCorrect ? '#2E7D32' : '#C62828'
                        }}
                      >
                        {answer.isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                      {answer.questionText || 'N/A'}
                    </div>
                    <div className="info-label" style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                      Your Answer
                    </div>
                    <div className="info-value" style={{ color: '#2E073F', fontWeight: 600, fontSize: '1.1rem' }}>
                      {isMatrixType
                        ? renderMatrixTable(answer)
                        : Array.isArray(answer.answer)
                          ? (
                            <ul style={{ paddingLeft: '1.2rem', marginBottom: 0 }}>
                              {answer.answer.map((pair, i) => (
                                <li key={i}>
                                  <strong>{pair.statement}:</strong> {pair.selectedOption}
                                </li>
                              ))}
                            </ul>
                          )
                          : typeof answer.answer === 'object'
                            ? JSON.stringify(answer.answer)
                            : answer.answer || 'No answer provided'
                      }
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-answers-message" style={{ color: '#C62828', fontSize: '1.1rem' }}>
              No answers available for this quiz response.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResponseDetails;
