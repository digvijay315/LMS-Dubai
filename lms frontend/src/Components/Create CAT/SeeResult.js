// import React from 'react'

// function SeeResult() {
//   return (
//     <div>
//       <h4>CAT Title Name</h4>

//       <table>
//         <thead>
//           <tr>
//             <th>Employee Id</th>
//             <th>Employee Name</th>
//             <th>Job title</th>
//             <th>Skill Level</th>
//             <th>CAT Code</th>
//             <th>Main Skill name</th>

//             {/* For MCQ type overall score% */}
//             <th>Sub skill 1</th>
//             <th>Sub skill 1 score%</th>
//             <th>Sub skill 2</th>
//             <th>Sub skill 2 score%</th>
//             <th>Sub skill 3</th>
//             <th>Sub skill 3 score%</th>
//             <th>Sub skill 4</th>
//             <th>Sub skill 4 score%</th>
//             <th>Sub skill 5</th>
//             <th>Sub skill 5 score%</th>
//             <th>Overall final score of all five sub skills</th>

//             {/* For Text Overall score% */}
//             <th>Overall score of Text type</th>

//             {/* For Interview type overall score% */}
//             <th>Sub skill 1</th>
//             <th>Sub skill 1 score%</th>
//             <th>Sub skill 2</th>
//             <th>Sub skill 2 score%</th>
//             <th>Sub skill 3</th>
//             <th>Sub skill 3 score%</th>
//             <th>Sub skill 4</th>
//             <th>Sub skill 4 score%</th>
//             <th>Sub skill 5</th>
//             <th>Sub skill 5 score%</th>
//             <th>Overall final score% of all five sub skills</th>

//             {/* For score of overall CAT (MCQ+Text+Interview) */}
//             <th>Overall final CAT score%</th>
//           </tr>
//         </thead>
//       </table>
//     </div>
//   )
// }

// export default SeeResult



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { base_url } from '../Utils/base_url';

// function SeeResult() {
//     const { catId } = useParams();
//     const [results, setResults] = useState([]);
//     const [catTitle, setCatTitle] = useState('');

//     useEffect(() => {
//         const fetchResults = async () => {
//             try {
//                 const response = await axios.get(`${base_url}/get_cat_results/${catId}`);
//                 setResults(response.data.data);
//                 setCatTitle(response.data.data[0]?.catTitle || 'CAT Results');
//             } catch (error) {
//                 console.error('Error fetching results:', error);
//             }
//         };

//         fetchResults();
//     }, [catId]);

//     return (
//         <div className="results-container">
//             <h4>{catTitle}</h4>
            
//             <div className="table-responsive">
//                 <table className="results-table">
//                     <thead>
//                         <tr>
//                             <th rowSpan="2">Employee ID</th>
//                             <th rowSpan="2">Employee Name</th>
//                             <th rowSpan="2">Job Title</th>
//                             <th rowSpan="2">CAT Code</th>
//                             <th rowSpan="2">Main Skill</th>
                            
//                             {/* MCQ Section */}
//                             <th colSpan="6" className="section-header">MCQ Assessment</th>
                            
//                             {/* Text Section */}
//                             <th rowSpan="2">Text Assessment Score %</th>
                            
//                             {/* Interview Section */}
//                             <th colSpan="6" className="section-header">Interview Assessment</th>
                            
//                             {/* Overall Score */}
//                             <th rowSpan="2">Overall CAT Score %</th>
//                             <th rowSpan="2">Status</th>
//                         </tr>
//                         <tr>
//                             {/* MCQ Sub-headers */}
//                             <th>Sub Skill 1 %</th>
//                             <th>Sub Skill 2 %</th>
//                             <th>Sub Skill 3 %</th>
//                             <th>Sub Skill 4 %</th>
//                             <th>Sub Skill 5 %</th>
//                             <th>Overall MCQ %</th>
                            
//                             {/* Interview Sub-headers */}
//                             <th>Sub Skill 1 %</th>
//                             <th>Sub Skill 2 %</th>
//                             <th>Sub Skill 3 %</th>
//                             <th>Sub Skill 4 %</th>
//                             <th>Sub Skill 5 %</th>
//                             <th>Overall Interview %</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {results.map((result, index) => (
//                             <tr key={index}>
//                                 <td>{result.employee_id}</td>
//                                 <td>{result.employee_name}</td>
//                                 <td>{result.job_title}</td>
//                                 <td>{result.catCode}</td>
//                                 <td>{result.mainSkill}</td>
                                
//                                 {/* MCQ Scores */}
//                                 {Array.from({ length: 5 }).map((_, i) => (
//                                     <td key={`mcq-${i}`}>
//                                         {Object.values(result.mcqSubSkillScores)[i]?.scorePercentage || 'N/A'}
//                                     </td>
//                                 ))}
//                                 <td>{result.overallMcqScore}</td>
                                
//                                 {/* Text Score */}
//                                 <td>{result.textScore || 'N/A'}</td>
                                
//                                 {/* Interview Scores */}
//                                 {Array.from({ length: 5 }).map((_, i) => (
//                                     <td key={`interview-${i}`}>
//                                         {Object.values(result.interviewScores)[i] || 'N/A'}
//                                     </td>
//                                 ))}
//                                 <td>
//                                     {Object.values(result.interviewScores).length > 0
//                                         ? (Object.values(result.interviewScores).reduce((a, b) => a + b, 0) / 
//                                            Object.values(result.interviewScores).length).toFixed(2)
//                                         : 'N/A'
//                                     }
//                                 </td>
                                
//                                 {/* Overall Score */}
//                                 <td>{result.overallAverage}</td>
//                                 <td>{result.passed ? 'Passed' : 'Failed'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default SeeResult;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { base_url } from '../Utils/base_url';
import Tabs from './Tabs';
import { Button } from 'bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SeeResult() {
    const { catId } = useParams();
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [catTitle, setCatTitle] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewMode, setViewMode] = useState('summary');
    const [searchTerm, setSearchTerm] = useState('');
    const [scoreFilter, setScoreFilter] = useState({
        minScore: '',
        maxScore: '',
        scoreType: 'overall' // default to overall score
    });
 const [expandedQuestions, setExpandedQuestions] = useState({});
   const [activeTab, setActiveTab] = useState('overview');


 const { id } = useParams();
  //const navigate = useNavigate();
  //const [results, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  
const [selectedResult, setSelectedResult] = useState(null);

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.parsed}%`,
      },
    },
  },
};





const exportToExcel = () => {
  const data = filteredResults.map((result) => {
    const mcqSubSkills = result.mcqDetails?.subSkillScores || {};
    const interviewSubSkills = result.interviewDetails?.subSkillScores || {};

    // Convert subskills to flat entries
    const mcqEntries = Object.entries(mcqSubSkills).slice(0, 5).reduce((acc, [key, value], index) => {
      acc[`MCQ Sub Category ${index + 1}`] = key || '';
      acc[`MCQ Score ${index + 1}`] = value?.scorePercentage ? `${value.scorePercentage}%` : '';
      return acc;
    }, {});

    const interviewEntries = Object.entries(interviewSubSkills).slice(0, 5).reduce((acc, [key, value], index) => {
      acc[`Interview Sub Category ${index + 1}`] = key || '';
      acc[`Interview Score ${index + 1}`] = value?.averageScore ? `${value.averageScore}%` : '';
      return acc;
    }, {});

    return {
      'Employee ID': result.employee_id,
      'Employee Name': result.employee_name,
      'Job Title': result.job_title,
      'Skill Level': result.tag,
      'CAT Code': result.catCode,
      'Main Category': result.mainSkill,

      ...mcqEntries,

      'MCQ Overall Score': `${result.scores.mcq}%`,
      'Text Score': result.scores.text ? `${result.scores.text}%` : 'N/A',

      ...interviewEntries,

      'Interview Overall Score': result.scores.interview ? `${result.scores.interview}%` : 'N/A',
      'CAT Overall Score': `${result.scores.overall}%`,
      'Status': result.passed ? 'PASSED' : 'NOT COMPLETED',
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'CAT Results');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  saveAs(dataBlob, 'CAT_Results.xlsx');
};


// In useEffect after fetching results
const getRecommendationColor = (recommendation) => {
  switch (recommendation) {
    case 'Highly recommended':
      return '#4CAF50'; // Green
    case 'Selected':
      return '#2196F3'; // Blue
    case 'Second Option':
      return '#FF9800'; // Orange
    case 'Rejected':
      return '#F44336'; // Red
    default:
      return '#757575'; // Grey
  }
};



 



useEffect(() => {
  const fetchResults = async () => {
    try {
      const response = await axios.get(`${base_url}/get_cat_results/${catId}`);
      setFilteredResults(response.data.data);
      setCatTitle(response.data.data[0]?.catTitle || 'CAT Results');
      setSelectedResult(response.data.data[0]); // Fix: this is also inside try
      setResults(response.data.data); // ❗ add this

    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  fetchResults();
}, [catId]);


   const preparePieChartData = () => {
  if (!selectedResult) return null;

  const mcq = selectedResult.mcqPercentage ?? selectedResult.scores?.mcq ?? 0;
  const text = selectedResult.textPercentage ?? selectedResult.scores?.text ?? 0;
  const interview = selectedResult.interviewPercentage ?? selectedResult.scores?.interview ?? 0;

  return {
    labels: ['MCQ Score', 'Text Score', 'Interview CAT Score'],
    datasets: [
      {
        label: 'Score Breakdown',
        data: [mcq, text, interview],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
};



const prepareMcqSubskillsChartData = () => {
  if (!selectedResult || !selectedResult.mcqDetails || !selectedResult.mcqDetails.subSkillScores) return null;

  const labels = [];
  const data = [];

  Object.entries(selectedResult.mcqDetails.subSkillScores).forEach(([subSkillName, subSkillData]) => {
    labels.push(subSkillName);
    data.push(subSkillData.scorePercentage);
  });

  return {
    labels,
    datasets: [
      {
        label: 'MCQ Subskill Score (%)',
        data,
        backgroundColor: '#ff9800',
      },
    ],
  };
};



const prepareInterviewCatSubskillsChartData = () => {
  if (
    !selectedResult ||
    !selectedResult.interviewDetails ||
    typeof selectedResult.interviewDetails.subSkillScores !== 'object'
  ) return null;

  const labels = [];
  const data = [];

  Object.entries(selectedResult.interviewDetails.subSkillScores).forEach(([name, subSkill]) => {
    labels.push(name);
    data.push(subSkill.averageScore || 0);
  });

  return {
    labels,
    datasets: [
      {
        label: 'Average Score (%)',
        data,
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };
};


// ✅ Safe date formatting utility
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

  

  
  
//......................................................................................//
    // Advanced Search functionality
    useEffect(() => {
        let filtered = results;

        // Text search filter
        if (searchTerm) {
            const searchTermLower = searchTerm.toLowerCase();
            filtered = filtered.filter(result => 
                result.employee_id.toLowerCase().includes(searchTermLower) ||
                result.employee_name.toLowerCase().includes(searchTermLower) ||
                result.job_title.toLowerCase().includes(searchTermLower) ||
                result.mainSkill.toLowerCase().includes(searchTermLower)
            );
        }

        // Score range filter
        if (scoreFilter.minScore !== '' || scoreFilter.maxScore !== '') {
            const min = parseFloat(scoreFilter.minScore) || 0;
            const max = parseFloat(scoreFilter.maxScore) || 100;
            
            filtered = filtered.filter(result => {
                let score;
                switch(scoreFilter.scoreType) {
                    case 'mcq':
                        score = result.scores.mcq;
                        break;
                    case 'text':
                        score = result.scores.text;
                        break;
                    case 'interview':
                        score = result.scores.interview;
                        break;
                    default:
                        score = result.scores.overall;
                }
                return score >= min && score <= max;
            });
        }

        setFilteredResults(filtered);
    }, [searchTerm, scoreFilter, results]);







    {/* if (loading) {
    return (
      <div>
          <div className="container">
            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading candidate results...</p>
            </div>
          </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div>
          <div className="container">
            <div className="error-container">
              <h3>Report Not Found</h3>
              <p>The requested candidate results could not be found.</p>
              <button 
                className="btn btn-primary mt-3" 
                onClick={() => navigate('/technichalInterviewResults')}
              >
                Go Back
              </button>
            </div>
          </div>
      </div>
    );
  } */}

const prepareRadialChartData = (interviewSectionScores) => {
  if (!Array.isArray(interviewSectionScores)) return [];

  return interviewSectionScores.map(section => ({
    name: section.subSkillName || 'Unnamed',
    value: section.subSkillPercentage ?? 0,
    fill: getColorForPercentage(section.subSkillPercentage ?? 0)
  }));
};


   const getColorForPercentage = (percentage) => {
    if (percentage >= 90) return '#4CAF50';  // Green for excellent
    if (percentage >= 75) return '#2196F3';  // Blue for very good
    if (percentage >= 60) return '#FFC107';  // Amber for good
    return '#F44336';  // Red for needs improvement
  };

   const getPerformanceRating = (percentage) => {
      if (percentage >= 90) return 'Outstanding';
      if (percentage >= 75) return 'Excellent';
      if (percentage >= 60) return 'Very Good';
      return 'Needs Improvement';
    };

      const radialChartData = results.interviewSectionScores 
  ? prepareRadialChartData(results.interviewSectionScores) 
  : [];

  const toggleQuestionExpand = (index) => {
      setExpandedQuestions(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    };

 




    const handleScoreFilterChange = (e) => {
        const { name, value } = e.target;
        setScoreFilter(prev => ({
            ...prev,
            [name]: value
        }));
    };



    const getScoreColor = (score) => {
        if (score >= 80) return '#28a745';
        if (score >= 60) return '#ffc107';
        return '#dc3545';
    };

    const InterviewSection = ({ interviewDetails }) => {

        const styles = {
            section: {
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            },
            subSkillContainer: {
              marginBottom: '24px',
              border: '1px solid #e1e4e8',
              borderRadius: '6px',
              padding: '16px'
            },
            subSkillHeader: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              borderBottom: '1px solid #e1e4e8',
              paddingBottom: '12px'
            },
            subSkillTitle: {
              margin: 0,
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600'
            },
            subSkillScore: {
              fontSize: '16px',
              fontWeight: '500'
            },
            questionsContainer: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            },
            questionCard: {
              padding: '16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e1e4e8'
            },
            questionTitle: {
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px'
            },
            questionText: {
              marginBottom: '12px',
              color: '#4a5568'
            },
            scoreContainer: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            },
            scoreLabel: {
              fontWeight: '500',
              color: '#4a5568'
            },
            overallInterviewScore: {
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#2c3e50',
              borderRadius: '6px',
              color: 'white',
              textAlign: 'center'
            },
            overallTitle: {
              margin: '0 0 8px 0',
              fontSize: '18px'
            },
            overallScoreValue: {
              fontSize: '24px',
              fontWeight: '600'
            }
          };
          
        const { subSkillScores } = interviewDetails;
      
        return (
          <div style={styles.section}>
            <h5 style={styles.sectionTitle}>Interview Assessment</h5>
            
            {/* Display each subskill and its questions */}
          {subSkillScores && typeof subSkillScores === 'object' && !Array.isArray(subSkillScores) && 
  Object.entries(subSkillScores).map(([name, data]) => (
    <div key={name} style={styles.subSkillContainer}>
                {/* Subskill Header */}
                <div style={styles.subSkillHeader}>
                  <h4 style={styles.subSkillTitle}>{name}</h4>
                  <div style={styles.subSkillScore}>
                    Overall Score: 
                    <span style={{ 
                      color: getScoreColor(data.averageScore),
                      marginLeft: '8px',
                      fontWeight: '600'
                    }}>
                      {data.averageScore}%
                    </span>
                  </div>
                </div>
      
                {/* Questions for this subskill */}
                <div style={styles.questionsContainer}>
                  {Array.isArray(data?.questions) &&
  data.questions.map((question, index) => (
    <div key={index} style={styles.questionCard}>
      <div style={styles.questionTitle}>
        Question {index + 1}
                      </div>
                      <div style={styles.questionText}>
                        {question.question}
                      </div>
                      <div style={styles.scoreContainer}>
                        <span style={styles.scoreLabel}>Score:</span>
                        <span style={{
                          color: getScoreColor((question.score / question.maxScore) * 100),
                          fontWeight: '600'
                        }}>
                          {question.score}/{question.maxScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      
            {/* Overall Interview Score */}
            <div style={styles.overallInterviewScore}>
              <h5 style={styles.overallTitle}>Overall Interview Score</h5>
              <div style={styles.overallScoreValue}>
                {calculateOverallInterviewScore(subSkillScores)}%
              </div>
            </div>
          </div>
        );
    };

    const calculateOverallInterviewScore = (subSkillScores) => {
        const scores = Object.values(subSkillScores);
        const total = scores.reduce((sum, data) => sum + data.averageScore, 0);
       if (!Array.isArray(scores) || scores.length === 0) return '0.00';

return (total / scores.length).toFixed(2);

    };

    const renderSubSkillScores = (subSkillScores) => {
        if (!subSkillScores || typeof subSkillScores !== 'object') return [];

return Object.entries(subSkillScores).map(([name, data]) =>  (
            <div key={name} style={styles.subSkillScore}>
                <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{name}</h5>
                <div style={styles.scoreLabel}>Score: 
                    <span style={{ ...styles.scoreValue, color: getScoreColor(data.scorePercentage) }}>
                        {data.scorePercentage}%
                    </span>
                </div>
                <div style={styles.scoreLabel}>Correct: {data.correctCount}/{data.totalQuestions}</div>
                <div style={styles.scoreLabel}>Points: {data.totalPoints}/{data.maxPossiblePoints}</div>
            </div>
        ));
    };


    

    const renderDetailedView = (employee) => {
        if (!employee) return null;

        return (

           
            <div style={styles.detailedView}>
<div 
  className="results-tabs" 
  style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
>
  <button 
    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
    onClick={() => setActiveTab('overview')}
  >
    Overview
  </button>

  <button 
    className={`tab-button ${activeTab === 'mcq' ? 'active' : ''}`}
    onClick={() => setActiveTab('mcq')}
  >
    MCQ Responses
  </button>

  <button 
    className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
    onClick={() => setActiveTab('text')}
  >
    Text Responses
  </button>

  <button 
    className={`tab-button ${activeTab === 'interview' ? 'active' : ''}`}
    onClick={() => setActiveTab('interview')}
  >
   Interview Responses
  </button>
</div>






           <div className="results-content">
                     {/* Overview Tab */}
{activeTab === 'overview' && selectedResult && (
  <div className="tab-content">
    <div className="overview-grid">

     <div className="overview-row" style={{ display: 'flex', gap: '100px', alignItems: 'flex-start',
     marginTop:"50px" 
      }}>
  {/* 1. Summary Card */}
  {/* 1. Summary Card */}
<div
  className="overview-card summary-card"
  style={{
    backgroundColor: 'gray',
    width: '40%',
    height: 'auto',
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
    boxSizing: 'border-box',
  }}
>
  <h5>Summary</h5>

  <div className="summary-item">
    <span>Employee ID:</span>
    <strong>{selectedResult?.employee_id || 'N/A'}</strong>
  </div>

  <div className="summary-item">
    <span>Employee Name:</span>
    <strong>{selectedResult?.employee_name || 'N/A'}</strong>
  </div>

  <div className="summary-item">
    <span>Job Title:</span>
    <strong>{selectedResult?.job_title || 'N/A'}</strong>
  </div>

  <div className="summary-item">
    <span>Skill Level:</span>
    <strong>{selectedResult?.tag || 'N/A'}</strong>
  </div>

  <div className="summary-item">
    <span>CAT Code:</span>
    <strong>{selectedResult?.catCode || 'N/A'}</strong>
  </div>

  <div className="summary-item">
    <span>Main Skill:</span>
    <strong>{selectedResult?.mainSkill || 'N/A'}</strong>
  </div>

  <div className="summary-item">
    <span>MCQ Score:</span>
    <strong>{selectedResult?.scores?.mcq ?? 'N/A'}%</strong>
  </div>

  <div className="summary-item">
    <span>Text Score:</span>
    <strong>{selectedResult?.scores?.text ?? 'N/A'}%</strong>
  </div>

  <div className="summary-item">
    <span>Interview Score:</span>
    <strong>{selectedResult?.scores?.interview ?? 'N/A'}%</strong>
  </div>

  <div className="summary-item">
    <span>Overall Score:</span>
    <strong>{selectedResult?.scores?.overall ?? 'N/A'}%</strong>
  </div>

 <div className="summary-item">
  <span>Status:</span>
  <strong style={{ color: selectedResult?.passed ? '#28a745' : '#dc3545' }}>
    {selectedResult?.passed ? 'PASSED' : 'NOT COMPLETED'}
  </strong>
</div>



</div>


  {/* 2. CAT Score Card */}
<div
  className="overview-card score-card"
  style={{
    backgroundColor: '  green',
    width: '40%',
    height: '330px',
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
    boxSizing: 'border-box',
  }}
>
  <h5>Overall CAT Score</h5>

  <div
    className="score-circle"
    style={{
      fontSize: '32px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '10px 0',
    }}
  >
    {selectedResult?.scores?.overall ?? 'N/A'}%
  </div>

  <div className="score-breakdown" style={{ lineHeight: '1.6' }}>
    <div>
      <span>MCQ:</span>{' '}
      <strong>
        {selectedResult?.scores?.mcq ?? 'N/A'}%
      </strong>
    </div>
    <div>
      <span>Text:</span>{' '}
      <strong>
        {selectedResult?.scores?.text ?? 'N/A'}%
      </strong>
    </div>
    <div>
      <span>Interview:</span>{' '}
      <strong>
        {selectedResult?.scores?.interview ?? 'N/A'}%
      </strong>
    </div>
  </div>
</div>



</div>
{/* Overview Charts Row */}
<div
  className="overview-charts-row"
  style={{
    display: 'flex',
    flexWrap: 'wrap',
    gap: '100px', // exact gap between charts
    justifyContent: 'flex-start',
    marginTop: '20px',
  }}
>
  {/* 3. Pie Chart */}
  <div
    className="overview-card chart-card"
    style={{
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      flex: '1 1 400px',
      maxWidth: '500px',
      boxSizing: 'border-box',
    }}
  >
    <h5 style={{ marginTop: 0 }}>Score Distribution</h5>
    <div
      className="chart-container"
      style={{
        width: '100%',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      {preparePieChartData() ? (
        <Pie data={preparePieChartData()} options={pieOptions} />
      ) : (
        <p>No data to show</p>
      )}
    </div>
  </div>

  {/* 4. MCQ Subskills Bar Chart */}
 <div
  className="overview-card skills-card"
  style={{
    backgroundColor: '#2196F3',
    padding: '20px',
    borderRadius: '8px',
    flex: '1 1 400px',
    maxWidth: '500px',
    boxSizing: 'border-box',
  }}
>
  <h5 style={{ color: '#fff' }}>MCQ Subskills Assessment</h5>
  <div
    className="chart-container"
    style={{
      width: '100%',
      minHeight: '200px',
    }}
  >
    {prepareMcqSubskillsChartData()?.labels?.length > 0 ? (
      <Bar
        data={prepareMcqSubskillsChartData()}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        }}
      />
    ) : (
      <p style={{ color: '#fff' }}>No MCQ Subskill data</p>
    )}
  </div>
</div>




</div>



      {/* 5. Interview Subskills Bar Chart */}
     <div
  className="overview-card skills-card"
  style={{
    backgroundColor: '#4CAF50', // You can use a distinct color like green
    padding: '20px',
    borderRadius: '8px',
    flex: '1 1 400px',
    maxWidth: '500px',
    boxSizing: 'border-box',
    marginTop: '20px',
  }}
>
  <h5 style={{ color: '#fff' }}>Interview CAT Subskills Assessment</h5>
  <div
    className="chart-container"
    style={{
      width: '100%',
      minHeight: '200px',
    }}
  >
    {prepareInterviewCatSubskillsChartData()?.labels?.length > 0 ? (
      <Bar
        data={prepareInterviewCatSubskillsChartData()}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        }}
      />
    ) : (
      <p style={{ color: '#fff' }}>No Interview Subskill data</p>
    )}
  </div>
</div>


    </div>
  </div>
)}

                      {/* MCQ Responses Tab */}
                      {activeTab === 'mcq' && (
                       <div style={styles.section}>
                    <h5 style={styles.sectionTitle}>MCQ Assessment</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                        {renderSubSkillScores(employee.mcqDetails.subSkillScores)}
                    </div>
                    <div style={{ marginTop: '15px', fontWeight: '600' }}>
                        Overall MCQ Score: 
                        <span style={{ color: getScoreColor(employee.scores.mcq) }}>
                            {employee.scores.mcq}%
                        </span>
                    </div>
                </div>
                      )}

                      
          {activeTab === 'text' && (
  <div className="tab-content">
    {employee?.textDetails ? (
      // ✅ Your new layout
      <div style={styles.section}>
        <h5 style={styles.sectionTitle}>Text Assessment</h5>
        <div style={{ marginBottom: '15px', fontWeight: '600' }}>
          Average Score:
          <span style={{ color: getScoreColor(employee.textDetails.average) }}>
            {employee.textDetails.average}%
          </span>
        </div>
        <div>
          {Array.isArray(employee?.textDetails?.responses) &&
            employee.textDetails.responses.map((response, index) => (
              <div key={index} style={styles.response}>
                <h6 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                  Question {index + 1}
                </h6>
                <div style={styles.scoreLabel}>Answer: {response.answer}</div>
                <div style={styles.scoreLabel}>
                  Score:
                  <span style={{ color: getScoreColor((response.score / 5) * 100) }}>
                    {response.score}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    ) : (
      // ❌ Fallback if employee.textDetails not found
      <div className="text-summary">
        <p>No text response details available.</p>
      </div>
    )}
  </div>
)}

          
                      {/* Add this as a new tab content in the existing component, replacing the comment */}
                      {/* {activeTab === 'interview-details' && (
                        <div className="tab-content interview-details-container">
                          <h5>Interview Section Evaluation</h5>
                          
                          {results.interviewSectionScores && Object.keys(results.interviewSectionScores).length > 0 ? (
                            <div className="interview-section-grid">
                              {Object.entries(results.interviewSectionScores).map(([skillName, skillData]) => (
                                <div key={skillName} className="interview-skill-card">
                                  <div className="skill-header">
                                    <h6>{skillData.subSkillName}</h6>
                                    <div className="skill-score">
                                      <span className="score-value">
                                        {typeof skillData === 'object' 
                                          ? `${skillData.subSkillTotalScore || 0}/${skillData.maxScore || skillData.subSkillMaxScore}` 
                                          : 'N/A'}
                                      </span>
                                      <span className="score-percentage">
                                        {typeof skillData === 'object' 
                                          ? `${((skillData.subSkillTotalScore / skillData.subSkillMaxScore) * 100).toFixed(2)}%` 
                                          : ''}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="skill-questions">
                                    {typeof skillData === 'object' && skillData.questions && 
                                      skillData.questions.map((question, index) => (
                                        <div key={index} className="interview-question-item">
                                          <div className="question-header">
                                            <div className="question-text">Q{index + 1}: {question.questionText}</div>
                                            <span className="question-score">
                                              {question.score}/{question.maxScore}
                                            </span>
                                          </div>  
                                          {question.comment && (
                                            <div className="reviewer-comments">
                                              <strong>Reviewer Comments:</strong>
                                              <p>{question.comment}</p>
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              ))}
                              
                              <div className="interview-overall-summary">
                                <h6>Overall Interview Performance</h6>
                                <div className="performance-circle" style={{
                                  background: `conic-gradient(
                                    #4CAF50 ${results.interviewPercentage}%, 
                                    #f0f0f0 ${results.interviewPercentage}% 100%
                                  )`
                                }}>
                                  <span className="performance-value">{results.interviewPercentage}%</span>
                                </div>
                                <div className="performance-rating">
                                  {results.interviewPercentage >= 90 ? (
                                    <span className="rating-excellent">Outstanding</span>
                                  ) : results.interviewPercentage >= 75 ? (
                                    <span className="rating-good">Excellent</span>
                                  ) : results.interviewPercentage >= 60 ? (
                                    <span className="rating-satisfactory">Very Good</span>
                                  ) : (
                                    <span className="rating-needs-improvement">Needs Improvement</span>
                                  )}
                                </div>
                                <div className="total-score-summary">
                                  <span>Total Interview Score:</span>
                                  <strong>{results.interviewTotalScore}/{results.interviewMaxScore}</strong>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="no-interview-data">
                              <p>No detailed interview evaluation available.</p>
                            </div>
                          )}
                        </div>
                      )} */}
          
                    {activeTab === 'interview' && (
  <div className="tab-content">
    {employee?.interviewDetails ? (
      <InterviewSection interviewDetails={employee.interviewDetails} />
    ) : (
      <p>No interview data available.</p>
    )}
  </div>
)}


          
                      {/* General Scores Tab
                      {activeTab === 'interview' && (
                        <div className="tab-content">
                          <h5>General Assessment</h5>
                          <div className="interview-summary">
                            <div className="interview-date">
                              <span>Interview Date:</span>
                              <strong>{formatDate(results.interviewDate) || 'Not conducted yet'}</strong>
                            </div>
                            <div className="interview-recommendation">
                              <span>Final Recommendation:</span>
                              <strong 
                                style={{ color: getRecommendationColor(results.recommendation) }}
                              >
                                {results.recommendation}
                              </strong>
                            </div>
                          </div>
          
                          <div className="interview-scores">
                            <h6 className="section-title">General Score Breakdown</h6>
                          {results?.interviewScores && 
 Object.entries(results.interviewScores).length > 0 ? (
                              <div className="score-container">
                                <table className="interview-table">
                                  <thead>
                                    <tr>
                                      <th>Assessment Area</th>
                                      <th>Score</th>
                                      <th>Comments</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                   {results?.interviewScores && 
  Object.entries(results.interviewScores).map(([area, data]) =>(
                                      <tr key={area}>
                                        <td>{area}</td>
                                        <td className="score-cell">{typeof data === 'object' ? data.score : data}/5</td>
                                        <td className="comment-cell">{typeof data === 'object' ? data.comment : ''}</td>
                                      </tr>
                                    ))}
                                    <tr className="total-row">
                                      <td className="total-label">Total Score</td>
                                      <td className="total-score">{results.generalTotalScore}/{results.generalMaxScore}</td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </table>
                                
                                <div className="score-summary">
                                  <div className="percentage-container">
                                    <div className="percentage-circle" style={{
                                      background: `conic-gradient(
                                        #4CAF50 ${results.generalPercentage}%, 
                                        #f0f0f0 ${results.generalPercentage}% 100%
                                      )`
                                    }}>
                                      <span className="percentage-value">{results.generalPercentage}%</span>
                                    </div>
                                    <div className="score-label">Overall Performance</div>
                                  </div>
                                  
                                  <div className="score-assessment">
                                    {results.generalPercentage >= 90 ? (
                                      <span className="excellent">Excellent</span>
                                    ) : results.generalPercentage >= 75 ? (
                                      <span className="good">Good</span>
                                    ) : results.generalPercentage >= 60 ? (
                                      <span className="satisfactory">Satisfactory</span>
                                    ) : (
                                      <span className="needs-improvement">Needs Improvement</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="no-interview">
                                <p>No interview scores have been recorded yet.</p>
                              </div>
                            )}
                          </div>







                          
                        </div>
                      )} */}



                    </div>

  {/* {activeTab === 'overview' && (
    <>
      <h3>Overview Chart</h3>
      {preparePieChartData() ? (
        <Pie data={preparePieChartData()} />
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  )}

 {activeTab === 'mcq' && (
    <>
      <h3>MCQ Subskills Chart</h3>
      {prepareMcqSubskillsChartData() ? (
        <Bar data={prepareMcqSubskillsChartData()} />
      ) : (
        <p>Loading MCQ chart...</p>
      )}
    </>
  )}



                  */}

                 
               <button 
  style={{ ...styles.backButton, marginTop: '10px' }}
  onClick={() => {
    setSelectedEmployee(null);
    setViewMode('summary');
  }}
>
  ← Back to Summary
</button>


                <h4 style={{ ...styles.sectionTitle, fontSize: '24px' }}>
                    Results for {employee.employee_name}
                </h4>

                {/* MCQ Section */}
                

                {/* Text Assessment Section */}
                





                {/* Interview Section */}
                {/* In your renderDetailedView function, replace the interview section with: */}
                

                <div style={{ ...styles.section, backgroundColor: '#2c3e50', color: 'white' }}>
                    <h5 style={{ ...styles.sectionTitle, color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                        Overall Results
                    </h5>
                    <div style={{ fontSize: '18px', marginBottom: '10px' }}>
                        Final Score: 
                        <span style={{ 
                            color: getScoreColor(employee.scores.overall),
                            marginLeft: '10px',
                            fontWeight: '600'
                        }}>
                            {employee.scores.overall}%
                        </span>
                    </div>
                    <div style={{ 
                        ...styles.statusBadge,
                        backgroundColor: employee.passed ? '#28a745' : '#dc3545'
                    }}>
                        {employee.passed ? 'PASSED' : 'NOT COMPLETED'}
                    </div>
                </div>


            </div>
        );
    };

    const renderMcqSubSkills = (result) => {
        const subSkills = result.mcqDetails?.subSkillScores || {};
        const entries = Object.entries(subSkills);
        const filledEntries = Array(5).fill(null).map((_, i) => entries[i] || [null, null]);
        
        return filledEntries.flatMap(([name, data]) => [
            <td style={styles.td}>{name || ''}</td>,
            <td style={{...styles.td, color: getScoreColor(data?.scorePercentage || 0)}}>
                {data?.scorePercentage ? `${data.scorePercentage}%` : ''}
            </td>
        ]);
    };

    const renderInterviewSubSkills = (result) => {
        const subSkills = result.interviewDetails?.subSkillScores || {};
        const entries = Object.entries(subSkills);
        const filledEntries = Array(5).fill(null).map((_, i) => entries[i] || [null, null]);
        
        return filledEntries.flatMap(([name, data]) => [
            <td style={styles.td}>{name || ''}</td>,
            <td style={{...styles.td, color: getScoreColor(data?.averageScore || 0)}}>
                {data?.averageScore ? `${data.averageScore}%` : ''}
            </td>
        ]);
    };


    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h4 style={styles.title}>{catTitle}</h4>
                <input 
                    type="text" 
                    placeholder="Search by employee, skill, or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        width: '250px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                {/* Score Filter Inputs */}
                <select 
                    name="scoreType" 
                    value={scoreFilter.scoreType}
                    onChange={handleScoreFilterChange}
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        borderRadius: '4px',
                        width: '300px',
                        border: '1px solid #ccc'
                    }}
                >
                    <option value="overall">Overall Score</option>
                    <option value="mcq">MCQ Score</option>
                    <option value="text">Text Score</option>
                    <option value="interview">Interview Score</option>
                </select>

                <input 
                    type="number" 
                    name="minScore"
                    placeholder="Min Score (%)"
                    value={scoreFilter.minScore}
                    onChange={handleScoreFilterChange}
                    min="0"
                    max="100"
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        width: '150px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />

                <input 
                    type="number" 
                    name="maxScore"
                    placeholder="Max Score (%)"
                    value={scoreFilter.maxScore}
                    onChange={handleScoreFilterChange}
                    min="0"
                    max="100"
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        width: '150px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />

                {viewMode === 'summary' && (
                    <div style={{ color: '#6c757d', fontSize: '14px', marginLeft: '10px' }}>
                        Total Candidates: {results.length}
                    </div>
                )}
            </div>



            

            {viewMode === 'summary' ? (
                <div style={{ overflowX: 'auto' }}>
                  <button
  onClick={exportToExcel}
  style={{
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '0px',
    marginBottom: '10px'
  }}
>
  Export to Excel
</button>
                    <table style={styles.table}>

                      
                        <thead>
                            <tr>
                                <th style={{...styles.th, minWidth: '100px'}} colSpan={5}>Employee Details</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Skills Category</th>
                                <th style={{...styles.th, minWidth: '120px'}} colSpan={10}>MCQ Type</th>
                                <th style={{...styles.th, minWidth: '120px'}}>MCQ overall score</th>
                                <th style={{...styles.th, minWidth: '100px'}}>Text Type</th>
                                <th style={{...styles.th, minWidth: '120px'}} colSpan={10}>Interview Type</th>
                                <th style={{...styles.th, minWidth: '140px'}}>Interview overall score</th>
                                <th style={{...styles.th, minWidth: '120px'}}>CAT Overall final</th>
                                <th style={{...styles.th, minWidth: '100px'}} colSpan={2}>Others</th>
                            </tr>
                            <tr>
                                {/* Employee Details */}
                                <th style={{...styles.th, minWidth: '120px'}}>Employee ID</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Employee Name</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Job Title</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Skill Level</th>
                                <th style={{...styles.th, minWidth: '120px'}}>CAT Code</th>

                                {/* Skills Category */}
                                <th style={{...styles.th, minWidth: '150px'}}>Main Category title</th>

                                {/* MCQ Type */}
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 1</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 2</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 3</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 4</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 5</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>

                                {/* MCQ overall score */}
                                <th style={{...styles.th, minWidth: '120px'}}>MCQ Score</th>

                                {/* Text Type Score */}
                                <th style={{...styles.th, minWidth: '100px'}}>Text Score</th>

                                {/* Interview Type */}
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 1</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 2</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 3</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 4</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 5</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>

                                {/* Interview overall score */}
                                <th style={{...styles.th, minWidth: '140px'}}>Interview Score</th>

                                {/* CAT Overall final */}
                                <th style={{...styles.th, minWidth: '120px'}}>Overall Score</th>

                                {/* Others */}
                                <th style={{...styles.th, minWidth: '100px'}}>Status</th>
                                <th style={{...styles.th, minWidth: '100px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                           {Array.isArray(filteredResults) &&
  filteredResults.map((result, index) => (
                                <tr key={index}>
                                    <td style={styles.td}>{result.employee_id}</td>
                                    <td style={styles.td}>{result.employee_name}</td>
                                    <td style={styles.td}>{result.job_title}</td>
                                    <td style={styles.td}>{result.tag}</td>
                                    <td style={styles.td}>{result.catCode}</td>
                                    <td style={styles.td}>{result.mainSkill}</td>

                                    {/* MCQ Sub Skills */}
                                    {renderMcqSubSkills(result)}

                                    {/* MCQ Overall Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.mcq)}}>
                                        {result.scores.mcq}%
                                    </td>

                                    {/* Text Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.text || 0)}}>
                                        {result.scores.text || 'N/A'}%
                                    </td>

                                    {/* Interview Sub Skills */}
                                    {renderInterviewSubSkills(result)}

                                    {/* Interview Overall Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.interview || 0)}}>
                                        {result.scores.interview || 'N/A'}%
                                    </td>

                                    {/* Overall Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.overall)}}>
                                        {result.scores.overall}%
                                    </td>

                                    {/* Status and Actions */}
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.statusBadge,
                                            backgroundColor: result.passed ? '#28a745' : '#dc3545',
                                            color: 'white'
                                        }}>
                                            {result.passed ? 'PASSED' : 'NOT COMPLETED'}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button 
                                            style={styles.detailsBtn}
                                            onClick={() => {
                                                setSelectedEmployee(result);
                                                setViewMode('detailed');
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>




                </div>
            ) : (
                renderDetailedView(selectedEmployee)
            )}
        </div>
    );
}

export default SeeResult;   


const styles = {
    container: {
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        backgroundColor: '#f8f9fa',
        padding: '15px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#2c3e50',
        margin: '0',
        fontSize: '24px'
    },
    tableContainer: {
        overflowX: 'auto',
        whiteSpace: 'nowrap',
    },
    viewToggleBtn: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        minWidth: '2000px',
    },
    th: {
        padding: '12px 15px',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
        color: '#2c3e50',
        fontWeight: '600',
        textAlign: 'left',
        whiteSpace: 'nowrap', // Prevent text wrapping
        position: 'sticky', // Keep header visible during scroll
        top: 0,
        zIndex: 1,
        minWidth: '120px', // Minimum width for each column
    },
    td: {
        padding: '12px 15px',
        borderBottom: '1px solid #dee2e6',
        color: '#2c3e50',
        whiteSpace: 'nowrap', // Prevent text wrapping
    },
    detailsBtn: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '130px'
    },
    detailedView: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    section: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px'
    },
    sectionTitle: {
        color: '#2c3e50',
        borderBottom: '2px solid #dee2e6',
        paddingBottom: '10px',
        marginBottom: '15px'
    },
    subSkillScore: {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '6px',
        marginBottom: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    scoreLabel: {
        color: '#6c757d',
        fontSize: '14px',
        marginBottom: '5px'
    },
    scoreValue: {
        color: '#2c3e50',
        fontSize: '16px',
        fontWeight: '600'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontWeight: '500',
        fontSize: '14px',
        display: 'inline-block'
    },
    backButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px'
    },
    response: {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '6px',
        marginBottom: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }
};