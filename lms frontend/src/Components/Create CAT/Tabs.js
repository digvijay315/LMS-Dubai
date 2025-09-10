import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2'; // or wherever you're importing from

const Tabs = ({ report, formatDate, preparePieChartData, prepareMcqSubskillsChartData, prepareInterviewCatSubskillsChartData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button className={activeTab === 'mcq' ? 'active' : ''} onClick={() => setActiveTab('mcq')}>
          MCQ Responses
        </button>
        <button className={activeTab === 'text' ? 'active' : ''} onClick={() => setActiveTab('text')}>
          Text Responses
        </button>
        <button className={activeTab === 'interview' ? 'active' : ''} onClick={() => setActiveTab('interview')}>
          Interview Details
        </button>
        <button className={activeTab === 'scores' ? 'active' : ''} onClick={() => setActiveTab('scores')}>
          General Scores
        </button>
      </div>

      {/* Overview Content */}
      {activeTab === 'overview' && report && (
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

            <div className="overview-card skills-card">
              <h5>MCQ Subskills Assessment</h5>
              <div className="chart-container">
                {prepareMcqSubskillsChartData() && (
                  <Bar 
                    data={prepareMcqSubskillsChartData()}
                    options={{ scales: { y: { beginAtZero: true, max: 100 } } }}
                  />
                )}
              </div>
            </div>

            <div className="overview-card skills-card">
              <h5>Interview CAT Subskills Assessment</h5>
              <div className="chart-container">
                {prepareInterviewCatSubskillsChartData() && (
                  <Bar 
                    data={prepareInterviewCatSubskillsChartData()}
                    options={{ scales: { y: { beginAtZero: true, max: 100 } } }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Tabs (placeholder for now) */}
      {activeTab === 'mcq' && <div className="tab-content">MCQ Responses content here.</div>}
      {activeTab === 'text' && <div className="tab-content">Text Responses content here.</div>}
      {activeTab === 'interview' && <div className="tab-content">Interview Details content here.</div>}
      {activeTab === 'scores' && <div className="tab-content">General Scores content here.</div>}
    </div>
  );
};

export default Tabs;
