import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

function HRSidebar() {

    const navigate = useNavigate();

        const logOut = () => {
          localStorage.removeItem('employeeData');
          toast.warning('You logged out successfully');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }

  return (
    <div>

      <style>{`
  .accordion-button::after {
    display: none !important;
  }
`}</style>

        <section className="left-Dashboard">
          <div className="dashboard-list">
            <div className="title-div">
              <img src="" alt="" />
              <h5>
                HR RECRUITMENT
              </h5>
            </div>
            <div className="list-options">
              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <NavLink to={'/createProjectHR'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                      
                    >
                      Create Project
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <NavLink to={'/approvalsList'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Approvals List
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <NavLink to={'/recruitmentPlan'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Recruitment Plan
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/candidateRegistration'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Candidates Registration
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/candidateList'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Candidates List
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/assignCompetencyAssessmentTest'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Assign Competency Assessment Test
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/candidateLogin'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Candidate Login
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/interviewLogin'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Interviewer Login
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/technichalInterviewResults'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Technichal Interview Results
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/HrInterview'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      HR Interview
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/hrInterviewResults'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      HR Interview Results
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/candidateStatus'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Candidate Status
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/visaDepartmentAdmin'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Visa Department Admin
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/loginCandidates'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Candidate Login Document
                    </button>
                    </NavLink>
                  </h2>
                </div>

                <div className="accordion-item">
                  <h2 className="accordion-header">
                  <NavLink to={'/candidateDocumentsReview'}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                    >
                      Candidate Documents Review
                    </button>
                    </NavLink>
                  </h2>
                </div>
              </div>
            </div>

            <div className="logout-section">
              <button 
                onClick={logOut}
                style={{
                  backgroundColor: '#2C073C',
                  color: 'white',
                  borderColor: '#4B0082',
                  padding: '12px 24px',
                  fontSize: '14px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Log out <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          </div>
        </section>
    </div>
  )
}

export default HRSidebar