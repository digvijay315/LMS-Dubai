// import React from 'react'

// function SeeAssessmentResult() {
//   return (
//     <div>

//       <table>
//         <thead>
//           <tr>
//             <th>Employee Id</th>
//             <th>Employee Name</th>
//             <th>Job Title</th>
//             {/* Section 1 title  */}
//             <th>Section 1</th>
//             {/* Section 1 overall score percentage of questions */}
//             <th>Section 1 Score %</th>
//             <th>Section 2</th>
//             <th>Section 2 Score %</th>
//             {/* Overall score of all sections */}
//             <th>Overall Score %</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
            
//           </tr>
//         </tbody>
//       </table>
        
//     </div>
//   )
// }

// export default SeeAssessmentResult

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { base_url } from '../Utils/base_url';

const SeeAssessmentResult = () => {
    const navigate = useNavigate();
    const { assessmentId } = useParams();
    const [results, setResults] = useState([]);
    const [assessmentDetails, setAssessmentDetails] = useState(null);

    const fetchAssessmentResults = async () => {
        try {
            // Fetch results for specific assessment
            const response = await axios.get(`${base_url}/assessment-responses/${assessmentId}`);
            console.log(response);
            
            setResults(response.data.data);
        } catch (error) {
            console.error('Error fetching assessment results:', error);
        }
    };

    useEffect(() => {
        fetchAssessmentResults();
    }, [assessmentId]);

    const calculateSectionAverage = (sections) => {
        return sections.map(section => ({
            title: section.title,
            averageScore: section.sectionScore || 0
        }));
    };

    return (
        <div style={styles.container}>
            {/* <Sidebar /> */}
            <section style={styles.mainContent}>
                {/* <Header /> */}
                
                <div style={styles.headerDiv}>
                    <div style={styles.titleName}>
                        <h5>Assessment Results</h5>
                        <p>
                            <a href="/" style={styles.homeLink}>Home</a> 
                            <i className="fa-solid fa-caret-right"></i> 
                            Assessment Results
                        </p>
                    </div>
                </div>

                <div style={styles.resultContainer}>
                    <div style={styles.titleText}>
                        <h2>Assessment <span style={styles.lightFont}>Results</span></h2>
                    </div>

                    <table style={styles.resultTable}>
                        <thead>
                            <tr style={styles.tableHeaderRow}>
                                <th style={styles.tableHeader}>Employee ID</th>
                                <th style={styles.tableHeader}>Employee Name</th>
                                <th style={styles.tableHeader}>Job Title</th>
                                {results.length > 0 && results[0].sections.map((section, index) => (
                                    <>
                                        <th key={`section-${index}`} style={styles.tableHeader}>
                                            Section {index + 1}
                                        </th>
                                        <th key={`section-score-${index}`} style={styles.tableHeader}>
                                            Section {index + 1} Score %
                                        </th>
                                    </>
                                ))}
                                <th style={styles.tableHeader}>Overall Score %</th>
                                <th style={styles.tableHeader}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={result._id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                                    <td style={styles.tableCell}>{result.employee_id}</td>
                                    <td style={styles.tableCell}>{result.employee_name}</td>
                                    <td style={styles.tableCell}>{result.job_title}</td>
                                    
                                    {result.sections.map((section, sectionIndex) => (
                                        <>
                                            <td key={`section-title-${sectionIndex}`} style={styles.tableCell}>
                                                {section.title || `Section ${sectionIndex + 1}`}
                                            </td>
                                            <td key={`section-score-${sectionIndex}`} style={styles.tableCell}>
                                                {((section.sectionScore / (section.answers.reduce((sum, ans) => sum + (ans.points || 0), 0)) * 100) || 0).toFixed(2)}%
                                            </td>
                                        </>
                                    ))}
                                    
                                    <td style={styles.tableCell}>{result.scorePercentage.toFixed(2)}%</td>
                                    <td style={styles.tableCell}>
                                        <button 
                                            style={styles.actionButton}
                                            onClick={() => navigate(`/assessment-details/${result._id}`)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {results.length === 0 && (
                        <div style={styles.noResults}>
                            <h3>No Results Available</h3>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
    },
    headerDiv: {
        marginBottom: '20px',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '10px',
    },
    titleName: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    homeLink: {
        color: '#099ded',
        textDecoration: 'none',
        cursor: 'pointer',
    },
    lightFont: {
        fontWeight: 300,
    },
    resultContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        padding: '20px',
    },
    titleText: {
        marginBottom: '20px',
    },
    resultTable: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeaderRow: {
        backgroundColor: '#f0f0f0',
    },
    tableHeader: {
        padding: '12px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
        fontWeight: 'bold',
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    },
    evenRow: {
        backgroundColor: '#f2f2f2',
    },
    oddRow: {
        backgroundColor: 'white',
    },
    actionButton: {
        backgroundColor: '#099ded',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    noResults: {
        textAlign: 'center',
        color: '#666',
        padding: '20px',
    },
};

export default SeeAssessmentResult;