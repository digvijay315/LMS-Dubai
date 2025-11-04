import React, { useState } from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import { useEffect } from 'react'
import axios from 'axios'
import { base_url } from '../Utils/base_url'
import { FaUserTie, FaEnvelope, FaBriefcase, FaCalendarAlt, FaCertificate } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom'
import './Css/candidate_profile.css';

function CandidateProfileView() {

    const location = useLocation()

   
    const id=location.state.id;

    const [candidate, setCandidate] = useState([]);
  

    const getCandidates = async () => {
        try {
            const response = await axios.get(`${base_url}/get_candidate/${id}`);  
            console.log('Candidate data:', response);
            setCandidate(response.data.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
            toast.error('Failed to load candidates');
        }
    }


    useEffect(() => {
        getCandidates();
    }, []);




  return (
    <div>

      
        
        <div>
            <HRSidebar/>
            <section className="main-content-section">
                <HRHeader/>

    <div className="candidate-profile-wrapper">
      <div className="profile-card header-card">
        <h1>{candidate.candidateName}</h1>
        <p className="job">{candidate.jobTitle}</p>
        <p className="email">{candidate.email}</p>
      </div>

      <div className="profile-grid">
        {/* Basic Info */}
        <div className="profile-card">
          <h2>Basic Information</h2>
          <div className="info-grid">
            <p><strong>Project Name:</strong> {candidate.projectName}</p>
            <p><strong>Username:</strong> {candidate.username}</p>
            <p><strong>Qualification:</strong> {candidate.qualification}</p>
            <p><strong>Nationality:</strong> {candidate.nationality}</p>
            <p><strong>Current Job Title:</strong> {candidate.currentJobTitle || "N/A"}</p>
            <p><strong>Total Experience:</strong> {candidate.totalYearsOfExperience} years</p>
            <p><strong>Job Function:</strong> {candidate.jobFunction}</p>
            <p><strong>Temp Code:</strong> {candidate.tempLoginCode}</p>
            <p><strong>Expiry:</strong> {new Date(candidate.tempCodeExpiry).toLocaleString()}</p>
            <p><strong>Created At:</strong> {new Date(candidate.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* CV Details */}
        <div className="profile-card">
          <h2>CV Details</h2>
          <p><strong>CV URL:</strong> <a href={candidate.cv} target="_blank" rel="noreferrer">View</a></p>
          {candidate.cvViewUrl && (
            <p><strong>CV View URL:</strong> <a href={candidate.cvViewUrl} target="_blank" rel="noreferrer">Open</a></p>
          )}
          <p><strong>Cloudinary Public ID:</strong> {candidate.cvPublicId || "N/A"}</p>
        </div>

        {/* Experience */}
        <div className="profile-card">
          <h2>Experience</h2>
          {candidate.experiences?.length ? (
            candidate.experiences.map((exp, i) => (
              <div key={i} className="sub-card">
                <h3>{exp.jobTitle}</h3>
                <p><strong>Company:</strong> {exp.companyName}</p>
                <p><strong>From:</strong> {new Date(exp.fromDate).toLocaleDateString()}</p>
                <p><strong>To:</strong> {exp.isCurrentlyWorking ? "Present" : new Date(exp.toDate).toLocaleDateString()}</p>
                <p><strong>Responsibilities:</strong> {exp.jobResponsibilities}</p>
              </div>
            ))
          ) : (
            <p>No experience records found.</p>
          )}
        </div>

        {/* Certificates */}
        <div className="profile-card">
          <h2>Certificates</h2>
          {candidate.certificates?.length ? (
            candidate.certificates.map((cert, i) => (
              <div key={i} className="sub-card">
                <h3>{cert.certificateName}</h3>
                <p><strong>Issued:</strong> {new Date(cert.issueDate).toLocaleDateString()}</p>
                <p><strong>Valid Till:</strong> {cert.validTill ? new Date(cert.validTill).toLocaleDateString() : "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No certificates found.</p>
          )}
        </div>

        {/* CAT Test */}
        <div className="profile-card">
          <h2>CAT Test Info</h2>
          {candidate.catTest?.id ? (
            <div className="sub-card">
              <p><strong>Test ID:</strong> {candidate.catTest.id}</p>
              <p><strong>Code:</strong> {candidate.catTest.code}</p>
              <p><strong>Title:</strong> {candidate.catTest.title}</p>
              <p><strong>Assigned:</strong> {new Date(candidate.catTest.assignedAt).toLocaleString()}</p>
            </div>
          ) : (
            <p>No CAT test assigned.</p>
          )}
        </div>
      </div>
    </div>

            </section>
        </div>
    </div>
  )
}

export default CandidateProfileView