import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';


// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function CandidateReportViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // Fetch the candidate response data
  useEffect(() => {
    const fetchCandidateReport = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/get_cat_candidate_responses/${id}`);
        setReport(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching candidate report:', error);
        toast.error('Error fetching candidate report');
        setLoading(false);
      }
    };

    if (id) {
      fetchCandidateReport();
    }
  }, [id]);

  // Prepare chart data for the scores
  // const preparePieChartData = () => {
  //   if (!report) return null;

  //   return {
  //     labels: ['MCQ Score', 'Text Score'],
  //     datasets: [
  //       {
  //         data: [report.mcqPercentage, report.textPercentage],
  //         backgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 159, 64, 0.8)'],
  //         borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  // };

  const preparePieChartData = () => {
    if (!report) return null;
  
    return {
      labels: ['MCQ Score', 'Text Score', 'Interview CAT Score'],
      datasets: [
        {
          data: [
            report.mcqPercentage, 
            report.textPercentage, 
            report.interviewPercentage
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)', 
            'rgba(255, 159, 64, 0.8)',
            'rgba(153, 102, 255, 0.8)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)', 
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  // Function to prepare MCQ subskills chart data
const prepareMcqSubskillsChartData = () => {
  if (!report) return null;

  // Group MCQ responses by subskill
  const subskills = {};
  report.mcqResponses.forEach(response => {
    if (!response.subSkillName) return;
    
    if (!subskills[response.subSkillName]) {
      subskills[response.subSkillName] = {
        total: 0,
        earned: 0
      };
    }
    subskills[response.subSkillName].total += response.maxPoints;
    subskills[response.subSkillName].earned += response.points;
  });

  const subskillNames = Object.keys(subskills);
  const percentages = subskillNames.map(subskill => 
    parseFloat(((subskills[subskill].earned / subskills[subskill].total) * 100).toFixed(2))
  );

  return {
    labels: subskillNames,
    datasets: [
      {
        label: 'MCQ Subskill Score (%)',
        data: percentages,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
};

// Function to prepare Interview CAT subskills chart data
// const prepareInterviewCatSubskillsChartData = () => {
//   if (!report) return null;

//   // Group Interview CAT responses by subskill
//   const subskills = {};
//   report.interviewSectionScores.forEach(response => {
//     if (!response.subSkillName) return;
    
//     if (!subskills[response.subSkillName]) {
//       subskills[response.subSkillName] = {
//         total: 0,
//         earned: 0
//       };
//     }
//     subskills[response.subSkillName].total += response.maxPoints;
//     subskills[response.subSkillName].earned += response.points;
//   });

//   const subskillNames = Object.keys(subskills);
//   const percentages = subskillNames.map(subskill => 
//     parseFloat(((subskills[subskill].earned / subskills[subskill].total) * 100).toFixed(2))
//   );

//   return {
//     labels: subskillNames,
//     datasets: [
//       {
//         label: 'Interview CAT Subskill Score (%)',
//         data: percentages,
//         backgroundColor: 'rgba(153, 102, 255, 0.8)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };
// };

const prepareInterviewCatSubskillsChartData = () => {
  if (!report || !report.interviewSectionScores) return null;

  // Group Interview CAT responses by subskill
  const subskills = {};
  report.interviewSectionScores.forEach(section => {
    if (!section.subSkillName) return;
    
    if (!subskills[section.subSkillName]) {
      subskills[section.subSkillName] = {
        percentage: section.subSkillPercentage || 0
      };
    }
  });

  const subskillNames = Object.keys(subskills);
  const percentages = subskillNames.map(subskill => subskills[subskill].percentage);

  return {
    labels: subskillNames,
    datasets: [
      {
        label: 'Interview CAT Subskill Score (%)',
        data: percentages,
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
};

  // Prepare bar chart data for skills
  // const prepareSkillsChartData = () => {
  //   if (!report) return null;

  //   // Collect unique skill names from MCQ responses
  //   const skills = {};
  //   report.mcqResponses.forEach(response => {
  //     if (!skills[response.subSkillName]) {
  //       skills[response.subSkillName] = {
  //         total: 0,
  //         earned: 0
  //       };
  //     }
  //     skills[response.subSkillName].total += response.maxPoints;
  //     skills[response.subSkillName].earned += response.points;
  //   });

  //   const skillNames = Object.keys(skills);
  //   const percentages = skillNames.map(skill => 
  //     parseFloat(((skills[skill].earned / skills[skill].total) * 100).toFixed(2))
  //   );

  //   return {
  //     labels: skillNames,
  //     datasets: [
  //       {
  //         label: 'Skill Score (%)',
  //         data: percentages,
  //         backgroundColor: 'rgba(75, 192, 192, 0.8)',
  //         borderColor: 'rgba(75, 192, 192, 1)',
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  // };

  // Function to get recommendation color
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
  
  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div>
          <div className="container">
            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading candidate report...</p>
            </div>
          </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div>
          <div className="container">
            <div className="error-container">
              <h3>Report Not Found</h3>
              <p>The requested candidate report could not be found.</p>
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
  }

  // Transform interview section scores for radial chart
  const prepareRadialChartData = (interviewSectionScores) => {
    return interviewSectionScores.map(section => ({
      name: section.subSkillName,
      value: section.subSkillPercentage,
      fill: getColorForPercentage(section.subSkillPercentage)
    }));
  };

   // Color coding based on performance percentage
   const getColorForPercentage = (percentage) => {
    if (percentage >= 90) return '#4CAF50';  // Green for excellent
    if (percentage >= 75) return '#2196F3';  // Blue for very good
    if (percentage >= 60) return '#FFC107';  // Amber for good
    return '#F44336';  // Red for needs improvement
  };

    // Determine overall performance rating
    const getPerformanceRating = (percentage) => {
      if (percentage >= 90) return 'Outstanding';
      if (percentage >= 75) return 'Excellent';
      if (percentage >= 60) return 'Very Good';
      return 'Needs Improvement';
    };

      // Prepare radial chart data
  const radialChartData = report.interviewSectionScores 
  ? prepareRadialChartData(report.interviewSectionScores) 
  : [];

    // Toggle question expansion
    const toggleQuestionExpand = (index) => {
      setExpandedQuestions(prev => ({
        ...prev,
        [index]: !prev[index]
      }));
    };

      // Determine score color based on percentage
  const getScoreColor = (score, maxScore) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return '#4CAF50';  // Green
    if (percentage >= 75) return '#2196F3';  // Blue
    if (percentage >= 60) return '#FFC107';  // Amber
    return '#F44336';  // Red
  };

  return (
    <div>

      <style>
      {`
        .report-container {
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          margin: 20px;
          padding: 20px;
        }

        .report-header-main {
          display: flex;
          align-items: center;
          margin-bottom: 24px;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 16px;
        }

        .back-button {
          margin-right: 16px;
        }

        .report-title {
          flex-grow: 1;
        }

        .report-title h4 {
          margin-bottom: 8px;
          color: #343a40;
        }

        .report-subtitle {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .cat-badge, .date-badge, .recommendation-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .cat-badge {
          background-color: #e9ecef;
          color: #495057;
        }

        .date-badge {
          background-color: #e3f2fd;
          color: #0d47a1;
        }

        .recommendation-badge {
          color: white;
        }

        .status-badge {
          text-transform: capitalize;
          background-color: #e9ecef;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
        }

        .report-tabs {
          display: flex;
          border-bottom: 1px solid #dee2e6;
          margin-bottom: 20px;
        }

        .tab-button {
          padding: 10px 16px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          font-weight: 500;
          color: #6c757d;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-button:hover {
          color: #fff;
          // background-color: #2e86de;
        }

        .tab-button.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }

        .tab-content {
          padding: 16px 0;
        }

        /* Overview Tab Styling */
        .overview-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .overview-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          padding: 20px;
        }

        .overview-card h5 {
          margin-bottom: 16px;
          color: #343a40;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 8px;
        }

        .summary-item, .breakdown-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .summary-item span, .breakdown-item span {
          color: #6c757d;
        }

        .score-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: conic-gradient(
            #007bff 0% ${props => props.totalPercentage || 0}%, 
            #e9ecef ${props => props.totalPercentage || 0}% 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
        }

        .score-circle:before {
          content: '';
          width: 100px;
          height: 100px;
          background: white;
          border-radius: 50%;
          position: absolute;
        }

        .score-value {
          position: relative;
          z-index: 1;
          font-size: 24px;
          font-weight: bold;
          color: #343a40;
        }

        .chart-container {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* MCQ Tab Styling */
        .mcq-summary, .text-summary {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .mcq-total, .text-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mcq-item, .text-item {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .mcq-item.correct {
          border-left: 4px solid #4caf50;
        }

        .mcq-item.incorrect {
          border-left: 4px solid #f44336;
        }

        .mcq-header, .text-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .mcq-number, .text-number {
          background-color: #e9ecef;
          color: #495057;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
          margin-right: 12px;
        }

        .mcq-skill-tag, .text-type-tag {
          background-color: #e3f2fd;
          color: #0d47a1;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.85rem;
          margin-right: auto;
        }

        .mcq-score, .text-score {
          font-weight: 500;
        }

        .mcq-question, .text-question {
          font-size: 1rem;
          margin-bottom: 16px;
          color: #343a40;
        }

        .text-subtitle {
          font-size: 0.9rem;
          color: #6c757d;
          margin-bottom: 16px;
        }

        .mcq-options, .mcq-selection, .text-answer, .text-review {
          margin-bottom: 12px;
        }

        .options-label, .selection-label, .answer-label, .review-header {
          font-weight: 500;
          margin-bottom: 8px;
          color: #495057;
        }

        .options-list, .selection-list {
          list-style: none;
          padding-left: 0;
        }

        .options-list li, .selection-list li {
          padding: 6px 12px;
          margin-bottom: 4px;
          border-radius: 4px;
          background-color: #f8f9fa;
        }

        .correct-option {
          border-left: 3px solid #4caf50;
        }

        .selected-option {
          background-color: #e8f5e9 !important;
        }

        .correct-icon {
          color: #4caf50;
          margin-left: 8px;
        }

        .incorrect-icon {
          color: #f44336;
          margin-left: 8px;
        }

        .answer-content {
          background-color: #f8f9fa;
          padding: 12px;
          border-radius: 4px;
          border-left: 3px solid #007bff;
          white-space: pre-wrap;
        }

        .review-rating {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }

        .stars {
          margin-left: 12px;
          display: inline-flex;
        }

        .star {
          color: #e0e0e0;
          margin-right: 2px;
        }

        .star.filled {
          color: #ffc107;
        }

        .review-comments span {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #495057;
        }

        .comments-content {
          background-color: #f8f9fa;
          padding: 12px;
          border-radius: 4px;
          border-left: 3px solid #6c757d;
        }

        /* Interview Tab Styling */
        .interview-summary {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .interview-date span, .interview-recommendation span {
          display: block;
          color: #6c757d;
          margin-bottom: 4px;
        }

        .interview-scores {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      }

      .section-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 15px;
      color: #333;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 8px;
      }

      .score-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      }

      @media (min-width: 768px) {
      .score-container {
      flex-direction: row;
      align-items: flex-start;
      }

      .interview-table {
      flex: 3;
      }

      .score-summary {
      flex: 2;
      margin-left: 20px;
      border-left: 1px solid #f0f0f0;
      padding-left: 20px;
      }
      }

      .interview-table {
      width: 100%;
      border-collapse: collapse;
      }

      .interview-table th {
      text-align: left;
      padding: 10px;
      background-color: #f8f9fa;
      font-weight: 600;
      color: #495057;
      }

      .interview-table td {
      padding: 10px;
      border-bottom: 1px solid #e9ecef;
      }

      .score-cell {
      font-weight: 600;
      text-align: center;
      }

      .total-row {
      background-color: #f8f9fa;
      font-weight: 600;
      }

      .total-label {
      color: #495057;
      }

      .total-score {
      text-align: center;
      color: #0056b3;
      }

      .percentage-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
      }

      .percentage-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      margin-bottom: 10px;
      }

      .percentage-circle::before {
      content: '';
      width: 100px;
      height: 100px;
      background: white;
      border-radius: 50%;
      position: absolute;
      }

      .percentage-value {
      position: relative;
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
      }

      .score-label {
      font-size: 0.9rem;
      color: #6c757d;
      text-align: center;
      }

      .score-assessment {
      text-align: center;
      font-size: 1.2rem;
      font-weight: 600;
      margin-top: 15px;
      padding: 10px;
      border-radius: 4px;
      }

      .excellent {
      color: #28a745;
      }

      .good {
      color: #17a2b8;
      }

      .satisfactory {
      color: #fd7e14;
      }

      .needs-improvement {
      color: #dc3545;
      }

      .no-interview {
      background-color: #f8f9fa;
      border-radius: 4px;
      padding: 15px;
      text-align: center;
      color: #6c757d;
      }

        /* Loading and Error states */
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 0;
        }

        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        /* Interview Section Styles */
      .interview-report-container {
                font-family: 'Arial', sans-serif;
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f6f9;
              }

              .report-card {
                background-color: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
              }

              .report-header {
                background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                color: white;
                padding: 20px;
                text-align: center;
              }

              .report-header h2 {
                margin: 0;
                font-size: 24px;
                font-weight: bold;
              }

              .report-content {
                padding: 30px;
              }

              .skill-performance-overview {
                margin-bottom: 30px;
              }

              .detailed-skill-scores {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                background-color: white;
                padding: 2rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 12px;
                margin-bottom: 30px;
              }

              .skill-section-card {
                background-color: white;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
                transition: transform 0.3s ease;
              }

              .skill-section-card:hover {
                transform: translateY(-5px);
              }

              .skill-section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
              }

              .progress-bar {
                height: 8px;
                background-color: #e0e0e0;
                border-radius: 10px;
                overflow: hidden;
              }

              .progress-fill {
                height: 100%;
              }

              .overall-performance-summary {
                background-color: white;
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                margin-top: 30px;
              }

              .performance-circle {
                width: 250px;
                height: 250px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }

              .performance-percentage {
                color: white;
                font-size: 48px;
                font-weight: bold;
              }

              .performance-rating {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 15px;
              }

              @media (max-width: 768px) {
                .detailed-skill-scores {
                  grid-template-columns: 1fr;
                }

                .performance-circle {
                  width: 200px;
                  height: 200px;
                }

                .performance-percentage {
                  font-size: 36px;
                }
              }

              .questions-container {
                background-color: #fff;
                border-radius: 8px;
                padding: 15px;
                margin-top: 15px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }

              .question-item {
                background-color: white;
                border-radius: 8px;
                margin-bottom: 10px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                overflow: hidden;
                transition: all 0.3s ease;
              }

              .question-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px 15px;
                cursor: pointer;
                background-color: #f0f4f8;
                border-bottom: 1px solid #e9ecef;
              }

              .question-header:hover {
                background-color: #e9ecef;
              }

              .question-text {
                flex-grow: 1;
                font-weight: 600;
                color: #2c3e50;
              }

              .question-score {
                font-weight: bold;
                padding: 4px 8px;
                border-radius: 4px;
                margin-left: 10px;
              }

              .question-details {
                padding: 12px 15px;
                background-color: white;
                display: none;
              }

              .question-details.expanded {
                display: block;
                animation: fadeIn 0.3s ease;
              }

              .reviewer-comment {
                background-color: #f1f5f9;
                border-left: 4px solid #3b82f6;
                padding: 10px;
                margin-top: 10px;
                font-style: italic;
                color: #475569;
              }

              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }

              .no-comments {
                color: #6b7280;
                font-style: italic;
                text-align: center;
                padding: 10px;
              }
      `}
      </style>

        <div className="report-container">
          <div className="report-header-main">
            <button 
              className="btn btn-sm btn-outline-secondary back-button" 
              onClick={() => navigate('/technichalInterviewResults')}
              style={{width: '130px'}}
            >
              &larr; Back to List
            </button>
            <div className="report-title">
              <h4>{report.candidateName}'s Assessment Report</h4>
              <div className="report-subtitle">
                <span className="cat-badge">{report.catTitle}</span>
                <span className="date-badge">
                  {formatDate(report.interviewDate || report.endTime)}
                </span>
                <span 
                  className="recommendation-badge" 
                  style={{ backgroundColor: getRecommendationColor(report.recommendation) }}
                >
                  {report.recommendation}
                </span>
              </div>
            </div>
          </div>

          <div className="report-tabs">
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
  className={`tab-button ${activeTab === 'interview-details' ? 'active' : ''}`}
  onClick={() => setActiveTab('interview-details')}
>
  Interview Details
</button>


            <button 
              className={`tab-button ${activeTab === 'interview' ? 'active' : ''}`}
              onClick={() => setActiveTab('interview')}
            >
              General Scores
            </button>
          </div>

          <div className="report-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="overview-grid">
                  <div className="overview-card summary-card">
                    <h5>Summary</h5>
                    <div className="summary-item">
                      <span>Candidate Username:</span>
                      <strong>{report.candidateUsername}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Candidate Name:</span>
                      <strong>{report.candidateName}</strong>
                    </div>
                    <div className="summary-item">
                      <span>CAT Code:</span>
                      <strong>{report.catCode}</strong>
                    </div>
                    <div className="summary-item">
                      <span>Test Status:</span>
                      <strong className="status-badge">{report.status}</strong>
                    </div>
                    {report.duration && (
                      <div className="summary-item">
                        <span>Duration:</span>
                        <strong>{report.duration} minutes</strong>
                      </div>
                    )}
                    <div className="summary-item">
                      <span>Start Time:</span>
                      <strong>{formatDate(report.startTime)}</strong>
                    </div>
                    <div className="summary-item">
                      <span>End Time:</span>
                      <strong>{formatDate(report.endTime)}</strong>
                    </div>
                  </div>

                  <div className="overview-card score-card">
                    <h5>Overall CAT Score</h5>
                    <div className="score-circle">
                      <div className="score-value">{report.totalPercentage}%</div>
                    </div>
                    <div className="score-breakdown">
                      <div className="breakdown-item">
                        <span>MCQ Score:</span>
                        <strong>{report.mcqScore}/{report.mcqMaxScore} ({report.mcqPercentage}%)</strong>
                      </div>
                      <div className="breakdown-item">
                        <span>Text Score:</span>
                        <strong>{report.textScore}/{report.textMaxScore} ({report.textPercentage}%)</strong>
                      </div>
                      <div className="breakdown-item">
                        <span>Interview Score:</span>
                        <strong>{report.interviewTotalScore}/{report.interviewMaxScore} ({report.interviewPercentage}%)</strong>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card chart-card">
                    <h5>Score Distribution</h5>
                    <div className="chart-container">
                      {preparePieChartData() && <Pie data={preparePieChartData()} />}
                    </div>
                  </div>

                  {/* <div className="overview-card skills-card">
                    <h5>Skills Assessment</h5>
                    <div className="chart-container">
                      {prepareSkillsChartData() && <Bar 
                        data={prepareSkillsChartData()}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100
                            }
                          }
                        }}
                      />}
                    </div>
                  </div> */}

                  <div className="overview-card skills-card">
                    <h5>MCQ Subskills Assessment</h5>
                    <div className="chart-container">
                      {prepareMcqSubskillsChartData() && <Bar 
                        data={prepareMcqSubskillsChartData()}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100
                            }
                          }
                        }}
                      />}
                    </div>
                  </div>

                  <div className="overview-card skills-card">
                    <h5>Interview CAT Subskills Assessment</h5>
                    <div className="chart-container">
                      {prepareInterviewCatSubskillsChartData() && <Bar 
                        data={prepareInterviewCatSubskillsChartData()}
                        options={{
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100
                            }
                          }
                        }}
                      />}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* MCQ Responses Tab */}
            {activeTab === 'mcq' && (
              <div className="tab-content">
                <h5>Multiple Choice Questions ({report.mcqResponses.length})</h5>
                <div className="mcq-summary">
                  <div className="mcq-total">
                    <span>Total MCQ Score:</span>
                    <strong>{report.mcqScore}/{report.mcqMaxScore} ({report.mcqPercentage}%)</strong>
                  </div>
                </div>
                
                <div className="mcq-list">
                  {report.mcqResponses.map((mcq, index) => (
                    <div 
                      key={mcq.questionId} 
                      className={`mcq-item ${mcq.isCorrect ? 'correct' : 'incorrect'}`}
                    >
                      <div className="mcq-header">
                        <div className="mcq-number">Q{index + 1}</div>
                        <div className="mcq-skill-tag">{mcq.skillName}: {mcq.subSkillName}</div>
                        <div className="mcq-score">
                          Score: {mcq.points}/{mcq.maxPoints}
                        </div>
                      </div>
                      <div className="mcq-question">{mcq.question}</div>
                      <div className="mcq-options">
                        <div className="options-label">Options:</div>
                        <ul className="options-list">
                          {mcq.correctOptions.map((option, optIndex) => (
                            <li 
                              key={optIndex} 
                              className={`
                                ${option.correct ? 'correct-option' : ''}
                                ${mcq.selectedOptions.includes(option.text) ? 'selected-option' : ''}
                              `}
                            >
                              {option.text}
                              {option.correct && <span className="correct-icon">✓</span>}
                              {mcq.selectedOptions.includes(option.text) && !option.correct && 
                                <span className="incorrect-icon">✗</span>
                              }
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mcq-selection">
                        <div className="selection-label">Candidate selected:</div>
                        <ul className="selection-list">
                          {mcq.selectedOptions.map((selected, selIndex) => (
                            <li key={selIndex}>{selected}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Text Responses Tab */}
            {activeTab === 'text' && (
              <div className="tab-content">
                <h5>Text Responses ({report.textResponses.length})</h5>
                <div className="text-summary">
                  <div className="text-total">
                    <span>Total Text Score:</span>
                    <strong>{report.textScore}/{report.textMaxScore} ({report.textPercentage}%)</strong>
                  </div>
                </div>
                
                <div className="text-list">
                  {report.textResponses.map((text, index) => (
                    <div key={text.questionId} className="text-item">
                      <div className="text-header">
                        <div className="text-number">Q{index + 1}</div>
                        <div className="text-type-tag">{text.answerType === 'short' ? 'Short Answer' : 'Long Answer'}</div>
                        <div className="text-score">
                          Score: {text.points}/{text.maxPoints}
                        </div>
                      </div>
                      <div className="text-question">{text.question}</div>
                      {text.subtitle && <div className="text-subtitle">{text.subtitle}</div>}
                      <div className="text-answer">
                        <div className="answer-label">Candidate's Answer:</div>
                        <div className="answer-content">{text.answer}</div>
                      </div>
                      <div className="text-review">
                        <div className="review-header">Reviewer's Assessment</div>
                        <div className="review-rating">
                          <span>Rating:</span>
                          <div className="stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <span 
                                key={star} 
                                className={`star ${star <= text.reviewerRating ? 'filled' : ''}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        {text.reviewerComments && (
                          <div className="review-comments">
                            <span>Comments:</span>
                            <div className="comments-content">{text.reviewerComments}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add this as a new tab content in the existing component, replacing the comment */}
            {/* {activeTab === 'interview-details' && (
              <div className="tab-content interview-details-container">
                <h5>Interview Section Evaluation</h5>
                
                {report.interviewSectionScores && Object.keys(report.interviewSectionScores).length > 0 ? (
                  <div className="interview-section-grid">
                    {Object.entries(report.interviewSectionScores).map(([skillName, skillData]) => (
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
                          #4CAF50 ${report.interviewPercentage}%, 
                          #f0f0f0 ${report.interviewPercentage}% 100%
                        )`
                      }}>
                        <span className="performance-value">{report.interviewPercentage}%</span>
                      </div>
                      <div className="performance-rating">
                        {report.interviewPercentage >= 90 ? (
                          <span className="rating-excellent">Outstanding</span>
                        ) : report.interviewPercentage >= 75 ? (
                          <span className="rating-good">Excellent</span>
                        ) : report.interviewPercentage >= 60 ? (
                          <span className="rating-satisfactory">Very Good</span>
                        ) : (
                          <span className="rating-needs-improvement">Needs Improvement</span>
                        )}
                      </div>
                      <div className="total-score-summary">
                        <span>Total Interview Score:</span>
                        <strong>{report.interviewTotalScore}/{report.interviewMaxScore}</strong>
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

            {activeTab === 'interview-details' && (
                <div className="tab-content">
                  <h5>Interview Section Evaluation</h5>
                  <div className="text-summary">
                    <div className="text-total">
                      <span>Total Interview Score:</span>
                      <strong>{report.interviewTotalScore}/{report.interviewMaxScore} ({report.interviewPercentage}%)</strong>
                    </div>
                  </div>
                    
                  <div className="report-content">
                    {/* Radial Chart Section */}
                    <div className="skill-performance-overview">
                      <h5>Skill Performance Overview</h5>
                      {/* <ResponsiveContainer width="100%" height={300}>
                        <RadialBarChart 
                          innerRadius="20%" 
                          outerRadius="90%" 
                          data={radialChartData} 
                          startAngle={90} 
                          endAngle={-270}
                        >
                          <RadialBar 
                            minAngle={15} 
                            label={{ position: 'insideStart', fill: 'white' }} 
                            background 
                            dataKey="value" 
                          />
                          <Tooltip 
                            content={({ payload }) => {
                              if (payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div style={{
                                    backgroundColor: 'white',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px'
                                  }}>
                                    <p>{data.name}</p>
                                    <p>Performance: {data.value.toFixed(2)}%</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </RadialBarChart>
                      </ResponsiveContainer> */}
                    </div>

                    {/* Detailed Skill Scores */}
                    <div className="detailed-skill-scores">
                      {report.interviewSectionScores && report.interviewSectionScores.map((skillSection, index) => (
                        <div 
                          key={index} 
                          className="skill-section-card"
                          style={{ 
                            borderLeft: `5px solid ${getColorForPercentage(skillSection.subSkillPercentage)}`,
                          }}
                        >
                          <div className="skill-section-header">
                            <h6>{skillSection.subSkillName}</h6>
                            <span 
                              style={{ 
                                backgroundColor: getColorForPercentage(skillSection.subSkillPercentage) + '20',
                                color: getColorForPercentage(skillSection.subSkillPercentage),
                                padding: '2px 8px',
                                borderRadius: '4px'
                              }}
                            >
                              {skillSection.subSkillPercentage.toFixed(2)}%
                            </span>
                          </div>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ 
                                width: `${skillSection.subSkillPercentage}%`, 
                                backgroundColor: getColorForPercentage(skillSection.subSkillPercentage)
                              }}
                            ></div>
                          </div>
                          <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                            <span>Score: {skillSection.subSkillTotalScore}/{skillSection.subSkillMaxScore}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* New addition: Questions Component */}
                    <div className='all-questions-view'>
                      {report.interviewSectionScores && report.interviewSectionScores.map((skillSection, index) => (
                        <div className="questions-container">
                          <h6 className="text-lg font-semibold mb-3">
                            Interview Questions for {skillSection.subSkillName}
                          </h6>
                          
                          {skillSection.questions && skillSection.questions.length > 0 ? (
                            skillSection.questions.map((question, index) => (
                              <div 
                                key={index} 
                                className="question-item"
                                onClick={() => toggleQuestionExpand(index)}
                              >
                                <div className="question-header">
                                  <div className="question-text">
                                    Q{index + 1}: {question.questionText}
                                  </div>
                                  <span 
                                    className="question-score" 
                                    style={{ 
                                      backgroundColor: getScoreColor(question.score, question.maxScore) + '20',
                                      color: getScoreColor(question.score, question.maxScore)
                                    }}
                                  >
                                    {question.score}/{question.maxScore}
                                  </span>
                                </div>
                                
                                <div 
                                  className={`question-details ${expandedQuestions[index] ? 'expanded' : ''}`}
                                >
                                  {question.comment ? (
                                    <div className="reviewer-comment">
                                      <strong>Reviewer Comments: </strong>
                                      {question.comment}
                                    </div>
                                  ) : (
                                    <div className="no-comments">
                                      No additional comments from the interviewer
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="no-comments">
                              No questions available for this sub-skill
                            </div>
                          )}
                        </div>
                     ))}   
                    </div>

                    {/* Overall Performance Summary */}
                    <div className="overall-performance-summary">
                      <h5>Overall Interview Performance</h5>
                      <div 
                        className="performance-circle"
                        style={{
                          background: `conic-gradient(
                            ${getColorForPercentage(report.interviewPercentage)} ${report.interviewPercentage}%, 
                            #f0f0f0 ${report.interviewPercentage}% 100%
                          )`
                        }}
                      >
                        <span className="performance-percentage">
                          {report.interviewPercentage}%
                        </span>
                      </div>
                      <div 
                        className="performance-rating"
                        style={{ 
                          color: getColorForPercentage(report.interviewPercentage)
                        }}
                      >
                        {getPerformanceRating(report.interviewPercentage)}
                      </div>
                      <div>
                        <span>Total Interview Score: </span>
                        <strong>{report.interviewTotalScore}/{report.interviewMaxScore}</strong>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {/* General Scores Tab */}
            {activeTab === 'interview' && (
              <div className="tab-content">
                <h5>General Assessment</h5>
                <div className="interview-summary">
                  <div className="interview-date">
                    <span>Interview Date:</span>
                    <strong>{formatDate(report.interviewDate) || 'Not conducted yet'}</strong>
                  </div>
                  <div className="interview-recommendation">
                    <span>Final Recommendation:</span>
                    <strong 
                      style={{ color: getRecommendationColor(report.recommendation) }}
                    >
                      {report.recommendation}
                    </strong>
                  </div>
                </div>

                <div className="interview-scores">
                  <h6 className="section-title">General Score Breakdown</h6>
                  {report.interviewScores && Object.entries(report.interviewScores).length > 0 ? (
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
                          {Object.entries(report.interviewScores).map(([area, data]) => (
                            <tr key={area}>
                              <td>{area}</td>
                              <td className="score-cell">{typeof data === 'object' ? data.score : data}/5</td>
                              <td className="comment-cell">{typeof data === 'object' ? data.comment : ''}</td>
                            </tr>
                          ))}
                          <tr className="total-row">
                            <td className="total-label">Total Score</td>
                            <td className="total-score">{report.generalTotalScore}/{report.generalMaxScore}</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                      
                      <div className="score-summary">
                        <div className="percentage-container">
                          <div className="percentage-circle" style={{
                            background: `conic-gradient(
                              #4CAF50 ${report.generalPercentage}%, 
                              #f0f0f0 ${report.generalPercentage}% 100%
                            )`
                          }}>
                            <span className="percentage-value">{report.generalPercentage}%</span>
                          </div>
                          <div className="score-label">Overall Performance</div>
                        </div>
                        
                        <div className="score-assessment">
                          {report.generalPercentage >= 90 ? (
                            <span className="excellent">Excellent</span>
                          ) : report.generalPercentage >= 75 ? (
                            <span className="good">Good</span>
                          ) : report.generalPercentage >= 60 ? (
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
            )}
          </div>
        </div>
    </div>
  );
}

export default CandidateReportViewer;

