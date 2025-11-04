import React, { useState, useEffect, useRef } from 'react';
import HRSidebar from './HRSidebar';
import HRHeader from './HRHeader';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import Swal from 'sweetalert2';

function InterviewerLogin() {
  // State management
  const [projects, setProjects] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [catAssignments, setCatAssignments] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedCatResponse, setSelectedCatResponse] = useState(null);
  const [projectSearchTerm, setProjectSearchTerm] = useState('');
  const [candidateSearchTerm, setCandidateSearchTerm] = useState('');
  const [interviewScores, setInterviewScores] = useState({
    q1: { score: 0, comment: '' },
    q2: { score: 0, comment: '' },
    q3: { score: 0, comment: '' },
    q4: { score: 0, comment: '' },
    q5: { score: 0, comment: '' }
  });
  const [recommendation, setRecommendation] = useState('');
  const [textRatings, setTextRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const projectDropdownRef = useRef(null);
  const candidateDropdownRef = useRef(null);
  const catDropdownRef = useRef(null);

  // Add these new states to the top of your InterviewerLogin component where other states are defined
  const [mainSkills, setMainSkills] = useState([]);
  const [selectedMainSkill, setSelectedMainSkill] = useState(null);
  const [selectedSubSkill, setSelectedSubSkill] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [interviewSectionScores, setInterviewSectionScores] = useState({});
  const [interviewMaxScore, setInterviewMaxScore] = useState(0);
  const [interviewTotalScore, setInterviewTotalScore] = useState(0);
  const [interviewPercentage, setInterviewPercentage] = useState(0);

  // Modify the state to use an array to store interview section scores for multiple sub skills
const [allInterviewSectionScores, setAllInterviewSectionScores] = useState([]);


const [comment, setComment] = useState('');
const [isMcqExpanded, setIsMcqExpanded] = useState(false);
const [expandedMainSkills, setExpandedMainSkills] = useState({});
const [expandedSubSkills, setExpandedSubSkills] = useState({});
const [selectedMainSkillForQA, setSelectedMainSkillForQA] = useState(null);
const [selectedSubSkillForQA, setSelectedSubSkillForQA] = useState(null);

const [isTextExpanded, setIsTextExpanded] = useState(false);
const [isTextSubmitted, setIsTextSubmitted] = useState(false);

const [isInterviewExpanded, setIsInterviewExpanded] = useState(false);
const [textTotalScore, setTextTotalScore] = useState(0);
const [textMaxScore, setTextMaxScore] = useState(0);
const showGeneralInterview = textTotalScore > 0 && interviewTotalScore > 0;
const [selectedInterviewQuestions, setSelectedInterviewQuestions] = useState([]);
const allCATQuestionsScored = selectedInterviewQuestions.length > 0 &&
  selectedInterviewQuestions.every(
    qId => interviewSectionScores[qId]?.score > 0
  );


useEffect(() => {
  let totalScore = 0;
  let totalMaxScore = 0;
  selectedInterviewQuestions.forEach(qId => {
    const q = interviewQuestions.find((q, idx) => (q._id || `interview_q_${idx}`) === qId);
    if (!q) return;
    const maxScore = q.ratingRange === '1-10' ? 10 : 5;
    const scoreObj = interviewSectionScores[qId] || { score: 0 };
    totalScore += Number(scoreObj.score) || 0;
    totalMaxScore += maxScore;
  });
  setInterviewTotalScore(totalScore);
  setInterviewMaxScore(totalMaxScore);
  setInterviewPercentage(totalMaxScore > 0 ? ((totalScore / totalMaxScore) * 100).toFixed(2) : 0);
}, [selectedInterviewQuestions, interviewSectionScores, interviewQuestions]);


useEffect(() => {
  if (!selectedCatResponse?.textResponses) return;

  let total = 0;
  let maxTotal = 0;

  // Map questionId to maxPoints (fallback to 10 if not specified)
  const maxPointsMap = {};
  selectedCatResponse.textResponses.forEach(resp => {
    maxPointsMap[resp.questionId] = resp.maxPoints || 10;
  });

  textRatings.forEach(r => {
    total += r.points || 0;
    maxTotal += maxPointsMap[r.questionId] || 10;
  });

  setTextTotalScore(total);
  setTextMaxScore(maxTotal);
}, [textRatings, selectedCatResponse]);



  // Add this effect to fetch main skills when a CAT response is selected
  useEffect(() => {
    if (selectedCatResponse) {
      fetchCatDetails(selectedCatResponse.catId);
    }
  }, [selectedCatResponse]);

  // Add this new function to fetch CAT details including main skills
  const fetchCatDetails = async (catId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base_url}/get_cat_byid/${catId}`);
      console.log(response);
      
      if (response.data && response.data.data) {
        const catData = response.data.data;

        setMainSkills(catData.mainSkills);
        
        if (catData.mainSkills && catData.mainSkills.length > 0) {
          setMainSkills(catData.mainSkills);
          
          // If there's only one main skill, select it by default
          if (catData.mainSkills.length === 1) {
            setSelectedMainSkill(catData.mainSkills[0]);
          }
        }
      }
    } catch (err) {
      setError('Failed to fetch CAT details: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add this function to handle main skill selection
  const handleMainSkillSelect = (mainSkill) => {
    setSelectedMainSkill(mainSkill);
    setSelectedSubSkill(null);
    setInterviewQuestions([]);
  };

  // Add this function to handle sub skill selection
  const handleSubSkillSelect = (subSkill) => {
    setSelectedSubSkill(subSkill);
    if (subSkill.interviewQuestions && subSkill.interviewQuestions.length > 0) {
      setInterviewQuestions(subSkill.interviewQuestions);

       // Check if this sub skill already has scores
    const existingSubSkillScores = allInterviewSectionScores.find(
      section => section.subSkillId === subSkill._id
    );
      
      // Initialize scores for these questions
      const initialScores = {};
      subSkill.interviewQuestions.forEach((question, index) => {
        const questionId = question._id || `interview_q_${index}`;
        initialScores[questionId] = {
          score: existingSubSkillScores 
            ? (existingSubSkillScores.questions.find(q => q.questionId === questionId)?.score || 0)
            : 0,
          maxScore: question.ratingRange === '1-10' ? 10 : 5,
          comment: existingSubSkillScores 
            ? (existingSubSkillScores.questions.find(q => q.questionId === questionId)?.comment || '')
            : ''
        };
      });
      setInterviewSectionScores(initialScores);
      
      // Calculate max possible score
      // const maxScore = subSkill.interviewQuestions.reduce((total, q) => {
      //   return total + (q.ratingRange === '1-10' ? 10 : 5);
      // }, 0);
      
      // setInterviewMaxScore(maxScore);
    }
  };

  // Add this function to handle score changes for interview section questions
// Modify handleInterviewSectionScoreChange to accumulate scores across sub skills
const handleInterviewSectionScoreChange = (questionId, field, value) => {
  setInterviewSectionScores(prev => {
    // Create a new updated scores object
    const updated = {
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [field]: value
      }
    };
    
    // Prepare the full sub skill section data
    const subSkillSectionData = {
      subSkillId: selectedSubSkill._id,
      subSkillName: selectedSubSkill.name,
      questions: Object.entries(updated).map(([qId, data]) => ({
        questionId: qId,
        questionText: interviewQuestions.find(q => q._id === qId)?.question || '',
        score: data.score,
        maxScore: data.maxScore,
        comment: data.comment
      }))
    };
    
    // Update allInterviewSectionScores
    setAllInterviewSectionScores(prevSections => {
      // Remove existing entry for this sub skill
      const filteredSections = prevSections.filter(
        section => section.subSkillId !== selectedSubSkill._id
      );
      
      // Add the new/updated sub skill section
      return [...filteredSections, subSkillSectionData];
    });
    
    // Recalculate total score from scratch using the latest allInterviewSectionScores
    const updatedSections = [...allInterviewSectionScores.filter(
      section => section.subSkillId !== selectedSubSkill._id
    ), subSkillSectionData];
    
    // Calculate total score across ALL sub skills
    let totalScore = 0;
    let overallMaxScore = 0;
    
    updatedSections.forEach(section => {
      section.questions.forEach(q => {
        totalScore += q.score;
        overallMaxScore += q.maxScore;
      });
    });
    
    setInterviewTotalScore(totalScore);
    setInterviewMaxScore(overallMaxScore);
    if (overallMaxScore > 0) {
      setInterviewPercentage(parseFloat(((totalScore / overallMaxScore) * 100).toFixed(2)));
    }
    
    return updated;
  });
};


   // Add click outside listener effect
   useEffect(() => {
    function handleClickOutside(event) {
      if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
        setShowProjectDropdown(false);
      }
      if (candidateDropdownRef.current && !candidateDropdownRef.current.contains(event.target)) {
        setShowCandidateDropdown(false);
      }
      if (catDropdownRef.current && !catDropdownRef.current.contains(event.target)) {
        setShowCatDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project._id);
    setProjectSearchTerm(project.code + ' - ' + project.name);
    setShowProjectDropdown(false);
  };

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate._id);
    setCandidateSearchTerm(candidate.candidateName);
    setShowCandidateDropdown(false);
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch candidates when a project is selected
  useEffect(() => {
    if (selectedProject) {
      fetchCandidates();
    }
  }, [selectedProject]);

  // Fetch CAT assignments when a candidate is selected
  useEffect(() => {
    if (selectedCandidate) {
      fetchCatAssignments();
      // Reset any previously selected CAT response
      setSelectedCatResponse(null);
    }
  }, [selectedCandidate]);

  // Initialize text ratings when a CAT response is selected
  useEffect(() => {
    if (selectedCatResponse && selectedCatResponse.textResponses) {
      const initialTextRatings = selectedCatResponse.textResponses.map(response => ({
        questionId: response.questionId,
        points: response.reviewerRating || 0,
        rating: response.reviewerRating || 0,
        comments: response.reviewerComments || ''
      }));
      setTextRatings(initialTextRatings);
    }
  }, [selectedCatResponse]);

  // API calls
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base_url}/get_projects`);
      setProjects(response.data);
    } catch (err) {
      setError('Failed to fetch projects: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCandidates = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base_url}/get_all_candidates`);
      setCandidates(response.data.data);
    } catch (err) {
      setError('Failed to fetch candidates: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCatAssignments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${base_url}/get_assigned_cats_candidates/${selectedCandidate}`);
      console.log("CAT Assignments:", response.data); 
      setCatAssignments(response.data.data);
    } catch (err) {
      setError('Failed to fetch CAT assignments: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCatResponse = async (catId) => {
    setIsLoading(true);
    setError(''); // Clear any previous errors
    try {
      const response = await axios.get(`${base_url}/get_cat_candidate_response/${selectedCandidate}/${catId}`);
      console.log("CAT Response:", response.data);
      
      if (response.data.success && response.data.count > 0) {
        // Process the response data before setting it to state
        const responseData = response.data.data[0];
        
        // Make sure all necessary properties exist
        const processedResponse = {
          ...responseData,
          mcqScore: responseData.mcqScore || 0,
          mcqMaxScore: responseData.mcqMaxScore || 0,
          mcqPercentage: responseData.mcqPercentage || 0,
          textScore: responseData.textScore || 0,
          textMaxScore: responseData.textMaxScore || 0,
          textPercentage: responseData.textPercentage || 0,
          totalScore: responseData.totalScore || 0,
          totalPercentage: responseData.totalPercentage || 0,
          catTitle: responseData.catTitle || "CAT Response",
          textResponses: responseData.textResponses || []
        };
        
        setSelectedCatResponse(processedResponse);
      } else {
        setError('No response found for this candidate and CAT');
        setSelectedCatResponse(null);
      }
    } catch (err) {
      console.error('Error fetching response:', err);
      setError('Failed to fetch CAT response: ' + (err.response?.data?.message || err.message));
      setSelectedCatResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewResponse = (catId) => {
    fetchCatResponse(catId);
  };

  const handleTextRatingChange = (questionId, field, value) => {
    setTextRatings(prevRatings => 
      prevRatings.map(rating => 
        rating.questionId === questionId ? { ...rating, [field]: value } : rating
      )
    );
  };

  const handleInterviewScoreChange = (question, field, value) => {
    setInterviewScores(prev => ({
      ...prev,
      [question]: { ...prev[question], [field]: value }
    }));
  };

  const handleRecommendationChange = (e) => {
    setRecommendation(e.target.value);
  };
  
  const handleSubmitResponse = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Validate project selection
      if (!selectedProject) {
        setError('Please select a project before submitting');
        setIsLoading(false);
        return;
      }

      // Format the interview scores as expected by the API
      // const formattedInterviewScores = {};
      // Object.entries(interviewScores).forEach(([question, data]) => {
      //   formattedInterviewScores[question] = data.score;
      // });

      const formattedInterviewScores = {};
      Object.entries(interviewScores).forEach(([question, data]) => {
        formattedInterviewScores[question] = {
          score: data.score,
          comment: data.comment
        };
      });
  
      // Format interview section scores
      const formattedInterviewSectionScores = allInterviewSectionScores.map(subSkillSection => ({
        subSkillId: subSkillSection.subSkillId,
        subSkillName: subSkillSection.subSkillName,
        questions: subSkillSection.questions.map(q => ({
          questionId: q.questionId,
          questionText: q.questionText,
          score: q.score,
          maxScore: q.maxScore,
          comment: q.comment
        }))
      }));
  
      const requestBody = {
        interviewScores: formattedInterviewScores,
        textRatings: textRatings,
        interviewSectionScores: formattedInterviewSectionScores,
        recommendation: recommendation,
        projectId: selectedProject
      };
  
      // Make the API call to submit the interview results
      const response = await axios.post(
        `${base_url}/candidate_responses/${selectedCatResponse._id}/interview_results`, 
        requestBody
      );
  
      if (response.data.success) {
        Swal.fire("Success", "Interview response submitted successfully!", "success");
        setSuccessMessage('Interview response submitted successfully!');
        setTimeout(() => setSuccessMessage(''), 2000);
        
        // Optionally refresh the CAT response data
        if (selectedCatResponse && selectedCatResponse.catId) {
          fetchCatResponse(selectedCatResponse.catId);
        }
      } else {
        setError(response.data.message || 'Failed to submit response');
      }
    } catch (err) {
      console.error('Error submitting response:', err);
      setError('Failed to submit response: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };









  

  return (
    <div>

      <style>
      {`
      body {
        background-color: #f0f4f8;
        font-family: 'Inter', sans-serif;
        color: #333;
        padding: 20px;
      }

      .interviewer-login-container {
        background-color: #fff;
        padding: 30px;
        border-radius: 10px;
        // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .interviewer-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 15px;
        color: #2E073F;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .candidate-list-header h5 {
      color: #2c3e50;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      display: inline-flex;
      align-items: center;
      }

      .candidate-list-header h5::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 24px;
      background-color: #3498db;
      margin-right: 10px;
      border-radius: 3px;
      }

      .search-container {
        position: relative;
        margin-bottom: 20px;
      }

      .search-container input {
        width: 100%;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 14px;
      }

      .search-icon {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #2E073F;
      }

      .select-container {
        margin-bottom: 25px;
        width:100%
      }

      .select-container label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #2E073F;
      }

      .select-container select {
        width: 100%;
        padding: 12px 15px;
        border-radius: 5px;
        border: 1px solid #ddd;
        background-color: #f9f9f9;
        font-size: 14px;
        color: #333;
        cursor: pointer;
      }

      .cat-list {
        margin: 25px 0;
        border: 1px solid #eee;
        border-radius: 5px;
        overflow: hidden;
      }

      .cat-item {
        padding: 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .cat-item:last-child {
        border-bottom: none;
      }

      .cat-title {
        font-weight: 500;
      }

      .cat-code {
        color: #666;
        font-size: 0.9em;
      }

      .view-button {
        background-color: #2E073F;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s;
      }

      .view-button:hover {
        background-color: #45105f;
      }

      .response-details {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 5px;
        margin-top: 20px;
      }

      .score-summary {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }

      .score-box {
        text-align: center;
        padding: 15px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        flex: 1;
        margin: 0 5px;
      }

      .score-box h5 {
        margin: 0 0 5px 0;
        color: #2E073F;
      }

      .score-value {
        font-size: 1.5em;
        font-weight: bold;
        color: #333;
      }

      .text-responses {
        margin-top: 25px;
      }

      .text-response-item {
        background-color: white;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }

      .question-text {
        font-weight: 500;
        margin-bottom: 10px;
        color: #2E073F;
      }

      .answer-text {
        background-color: #f5f5f5;
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 15px;
        white-space: pre-wrap;
      }

      .rating-container {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }

      .rating-container label {
        margin-right: 10px;
        min-width: 80px;
      }

      .rating-container input, 
      .rating-container select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
      }

      .rating-container textarea {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        width: 100%;
        min-height: 80px;
        margin-top: 10px;
      }

      .interview-questions {
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }

      .question {
        background-color: white;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      }

      .question label {
        display: block;
        font-weight: 500;
        margin-bottom: 10px;
        color: #2E073F;
      }

      .score-input {
        display: flex;
        align-items: center;
        margin-top: 10px;
      }

      .score-input span {
        margin-right: 10px;
        min-width: 60px;
      }

      .score-input select {
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        width: 100px;
      }

      .comment-input {
        margin-top: 10px;
      }

      .comment-input textarea {
        width: 100%;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ddd;
        min-height: 80px;
      }

      .recommendation-container {
        margin-top: 30px;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 5px;
      }

      .recommendation-container label {
        display: block;
        font-weight: 500;
        margin-bottom: 10px;
        color: #2E073F;
      }

      .recommendation-container select {
        width: 100%;
        padding: 12px 15px;
        border-radius: 5px;
        border: 1px solid #ddd;
        background-color: white;
        font-size: 14px;
      }

      .submit-button {
        background-color: #2E073F;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        margin-top: 20px;
        transition: background-color 0.3s;
        width: 100%;
        font-size: 16px;
      }

      .submit-button:hover {
        background-color: #45105f;
      }

      .submit-button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }

      .alert {
        padding: 10px 15px;
        border-radius: 5px;
        margin-bottom: 15px;
      }

      .alert-error {
        background-color: #fee2e2;
        border: 1px solid #fecaca;
        color: #ef4444;
      }

      .alert-success {
        background-color: #dcfce7;
        border: 1px solid #bbf7d0;
        color: #16a34a;
      }

      .loading-indicator {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        color: #2E073F;
      }

      .section-title {
        font-size: 18px;
        font-weight: 600;
        color: #2E073F;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 2px solid #eee;
      }

      .cat-status {
        font-size: 12px;
        padding: 4px 8px;
        border-radius: 12px;
        font-weight: 500;
      }

      .status-completed {
        background-color: #dcfce7;
        color: #16a34a;
      }

      .status-in-progress {
        background-color: #fef9c3;
        color: #ca8a04;
      }

      .status-assigned {
        background-color: #e0f2fe;
        color: #0284c7;
      }

      .status-expired {
        background-color: #fee2e2;
        color: #ef4444;
      }

      /* Add this CSS to your existing styles */
      .custom-dropdown {
      position: relative;
      width: 100%;
      }

      .dropdown-header {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 0;
      background-color: #fff;
      cursor: pointer;
      }

      .dropdown-header input {
      flex-grow: 1;
      border: none;
      padding: 12px 15px;
      border-radius: 5px;
      outline: none;
      background: transparent;
      }

      .dropdown-arrow {
      padding: 0 10px;
      color: #666;
      }

      .dropdown-list {
      position: absolute;
      width: 100%;
      max-height: 300px;
      overflow-y: auto;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-top: 5px;
      z-index: 100;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }

      .dropdown-list input {
      width: calc(100% - 20px);
      padding: 10px;
      margin: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      }

      .dropdown-items {
      max-height: 250px;
      overflow-y: auto;
      }

      .dropdown-item {
      padding: 10px 15px;
      cursor: pointer;
      border-bottom: 1px solid #f5f5f5;
      }

      .dropdown-item:hover {
      background-color: #f5f5f5;
      }

      /* CAT Interview Section Styles */
      .cat-interview-questions {
        background-color: #f9f9f9;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .skill-selection {
        margin-bottom: 15px;
      }

      .skill-selection label {
        display: block;
        font-weight: 600;
        margin-bottom: 8px;
      }

      .skill-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .skill-button {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px 15px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .skill-button:hover:not(:disabled) {
        background-color: #e0e0e0;
      }

      .skill-button.selected {
        background-color: #007bff;
        color: white;
        border-color: #007bff;
      }

      .skill-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .interview-section-questions {
        margin-top: 20px;
        border: 1px solid #eee;
        border-radius: 6px;
        padding: 15px;
      }

      .interview-section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }

      .interview-section-header h6 {
        font-size: 16px;
        margin: 0;
      }

      .interview-score-summary {
        background-color: #e9f7fe;
        color: #0277bd;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
      }

      .interview-question-item {
        padding: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
      }

      .interview-question-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
      }

      .interview-question-item .question-text {
        font-weight: 500;
        margin-bottom: 10px;
      }

      .rating-container, .comment-container {
        margin-top: 8px;
      }

      .rating-container {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .rating-container select {
        padding: 6px 10px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      .comment-container textarea {
        width: 100%;
        min-height: 60px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #ccc;
        resize: vertical;
      }


      .mcq-container {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .mcq-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      background-color: #f5f5f5;
      padding: 15px;
      border-radius: 8px;
    }

    .mcq-title {
      font-size: 20px;
      // font-weight: bold;
      font-weight: 600;
      color: #2E073F;
    }

    .mcq-stats {
      display: flex;
      gap: 20px;
    }

    .mcq-stat {
      font-weight: bold;
    }

    /* Grid layout for questions */
    .mcq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .mcq-question-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
    }

    .mcq-question {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 16px;
    }

    .mcq-answers {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mcq-answer {
      display: flex;
      align-items: flex-start;
      gap: 5px;
    }

    .mcq-answer-label {
      font-weight: bold;
      min-width: 120px;
    }

    .mcq-answer-value {
      flex: 1;
    }

    .mcq-result {
      margin-top: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .mcq-correct {
      color: #2e7d32;
      font-weight: bold;
    }

    .mcq-incorrect {
      color: #c62828;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .mcq-grid {
        grid-template-columns: 1fr;
      }
      
      .mcq-header {
        flex-direction: column;
        gap: 10px;
      }
    }

      `}
      </style>

      <div>
        <HRSidebar />
        <section className="main-content-section">
          <HRHeader />

          <div className="interviewer-login-container">
            <div className="interviewer-header">
              <div className='candidate-list-header'>
                <h5>Interviewer Dashboard</h5>
              </div>
              
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="interviewer-login-form">
              <div style={{display:"flex",gap:"50px"}}>
              <div className="select-container">
                <label>Select Project</label>
                <div className="custom-dropdown" ref={projectDropdownRef}>
                  <div 
                    className="dropdown-header" 
                    onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                  >
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearchTerm}
                      onChange={(e) => {
                        setProjectSearchTerm(e.target.value);
                        setShowProjectDropdown(true);
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowProjectDropdown(true);
                      }}
                    />
                    <span className="dropdown-arrow">▼</span>
                  </div>
                  
                  {showProjectDropdown && (
                    <div className="dropdown-list">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={projectSearchTerm}
                        onChange={(e) => setProjectSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="dropdown-items">
                        {projects
                          .filter(project => 
                            project.code.toLowerCase().includes(projectSearchTerm.toLowerCase()) ||
                            project.name.toLowerCase().includes(projectSearchTerm.toLowerCase())
                          )
                          .map(project => (
                            <div 
                              key={project._id} 
                              className="dropdown-item"
                              onClick={() => handleProjectSelect(project)}
                            >
                              {project.code} - {project.name}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedProject && (
                <div className="select-container">
                  <label>Select Candidate</label>
                  <div className="custom-dropdown" ref={candidateDropdownRef}>
                    <div 
                      className="dropdown-header" 
                      onClick={() => setShowCandidateDropdown(!showCandidateDropdown)}
                    >
                      <input
                        type="text"
                        placeholder="Search candidates..."
                        value={candidateSearchTerm}
                        onChange={(e) => {
                          setCandidateSearchTerm(e.target.value);
                          setShowCandidateDropdown(true);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCandidateDropdown(true);
                        }}
                      />
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    
                    {showCandidateDropdown && (
                      <div className="dropdown-list">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={candidateSearchTerm}
                          onChange={(e) => setCandidateSearchTerm(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="dropdown-items">
                          {candidates
                            .filter(candidate => 
                              candidate.candidateName.toLowerCase().includes(candidateSearchTerm.toLowerCase()) ||
                              (candidate.username && candidate.username.toLowerCase().includes(candidateSearchTerm.toLowerCase())) ||
                              (candidate.email && candidate.email.toLowerCase().includes(candidateSearchTerm.toLowerCase())) ||
                              (candidate.tempLoginCode && candidate.tempLoginCode.toLowerCase().includes(candidateSearchTerm.toLowerCase()))
                            )
                            .map(candidate => (
                              <div 
                                key={candidate._id} 
                                className="dropdown-item"
                                onClick={() => handleCandidateSelect(candidate)}
                              >
                                {candidate.candidateName} - {candidate.email || 'No email'}
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </div>
               
              )}
          </div>
              {/* CAT List */}
              {selectedCandidate && (
                <>
                  <h5 className="section-title">Candidate Assessment Tests</h5>
                  {isLoading && !selectedCatResponse ? (
                    <div className="loading-indicator">Loading CAT assignments...</div>
                  ) : catAssignments.length > 0 ? (
                    <div className="cat-list">
                      {catAssignments.map((assignment) => (
                        <div key={assignment._id || assignment.catId._id} className="cat-item">
                          <div>
                            <div className="cat-title">
                              {assignment.catId.title}
                              <span className={`cat-status status-${assignment.status}`}>
                                {assignment.status}
                              </span>
                            </div>
                            <div className="cat-code">Code: {assignment.catId.code}</div>
                          </div>
                          <button
                            className="view-button"
                            onClick={() => handleViewResponse(assignment.catId._id)}
                            // disabled={!['completed', 'reviewed', 'submitted'].includes(assignment.status)}
                          >
                            View Response
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>No CAT assignments found for this candidate.</div>
                  )}
                </>
              )}

              {/* Selected CAT Response Details */}
              {isLoading && selectedCatResponse ? (
                <div className="loading-indicator">Loading CAT response...</div>
              ) : selectedCatResponse ? (
                <div className="response-details">
                  <h5 className="section-title">
                    {selectedCatResponse.catTitle || "CAT Response"} - Results
                  </h5>

                  {/* Score Summary */}
              {/* Score Summary */}
<div className="score-summary">
 <div 
  className="score-box" 
  style={{ cursor: 'pointer' }}
  onClick={() => setIsMcqExpanded(prev => !prev)}
>
  <h6 style={{ display: 'flex', alignItems: 'center' }}>
    MCQ Score
    <span className={`expand-arrow ${isMcqExpanded ? 'expanded' : ''}`} />
  </h6>
  <div className="score-value">
    {selectedCatResponse.mcqScore || 0}/{selectedCatResponse.mcqMaxScore || 0} ({((selectedCatResponse.mcqPercentage || 0).toFixed(1))}%)
  </div>
</div>

<div 
  className="score-box" 
  style={{ cursor: !isTextSubmitted ? 'pointer' : 'default' }}
  onClick={() => {
    if (!isTextSubmitted) setIsTextExpanded(prev => !prev);
  }}
>
  <h6 style={{ display: 'flex', alignItems: 'center' }}>
    Text Score
    <span className={`expand-arrow ${isTextExpanded ? 'expanded' : ''}`} />
  </h6>
  <div className="score-value">
    {textTotalScore}/{textMaxScore} {(textMaxScore > 0 ? ((textTotalScore / textMaxScore) * 100).toFixed(1) : 0)}%
  </div>
</div>



  {/* Add CAT Interview Score box here */}
 <div 
  className="score-box"
  style={{ cursor: 'pointer' }}
  onClick={() => setIsInterviewExpanded(prev => !prev)}
>
  <h6 style={{ display: 'flex', alignItems: 'center' }}>
    CAT Interview Score
    <span 
      className={`expand-arrow ${isInterviewExpanded ? 'expanded' : ''}`} 
      style={{
        marginLeft: 8,
        border: 'solid #222',
        borderWidth: '0 2px 2px 0',
        padding: 3,
        display: 'inline-block',
        transform: isInterviewExpanded ? 'rotate(-135deg)' : 'rotate(45deg)',
        transition: 'transform 0.2s',
      }}
    />
  </h6>
  <div className="score-value">
    {interviewTotalScore}/{interviewMaxScore}
    {interviewMaxScore > 0 && ` (${((interviewTotalScore / interviewMaxScore) * 100).toFixed(1)}%)`}
  </div>
</div>


 <div className="score-box">
  <h6>Total CAT Score</h6>
  <div className="score-value">
    {((selectedCatResponse.totalPercentage || 0).toFixed(1))}%
  </div>
</div>

</div>


                  {/* MCQ Responses */}
                  {isMcqExpanded &&  (
                    <div class="mcq-container">
                      <div class="mcq-header">
                        <div class="mcq-title">Multiple Choice Questions</div>
                        <div class="mcq-stats">
                          <div class="mcq-stat">Total Questions: {selectedCatResponse.mcqResponses.length}</div>
                          <div class="mcq-stat">Correct Answers: {selectedCatResponse.mcqResponses.filter(q => q.isCorrect).length}</div>
                        </div>
                      </div>
                      
                      <div class="mcq-grid">
                        {selectedCatResponse.mcqResponses.map((response, index) => (
                          <div class="mcq-question-card">
                            <div class="mcq-question">Q{index + 1}: {response.question}</div>
                            <div className="mcq-answers">
                              <div className="mcq-answer">
                                <div className="mcq-answer-label">Selected Answer:</div>
                                <div className="mcq-answer-value">
                                  {response.selectedOptions.map((option, i) => (
                                    <span key={i}>{option}{i < response.selectedOptions.length - 1 ? ', ' : ''}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="mcq-answer">
                                <div className="mcq-answer-label">Correct Options:</div>
                                <div className="mcq-answer-value">
                                  {response.correctOptions.map((option, i) => (
                                    <span key={i} className={option.correct ? "mcq-correct" : ""}>
                                      {option.text}{i < response.correctOptions.length - 1 ? ', ' : ''}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div key={response.questionId || index} className={`mcq-result ${response.isCorrect ? 'mcq-correct' : 'mcq-incorrect'}`}>
                              {response.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
             )}

                  {/* Text Responses for Review */}
                 {isTextExpanded && !isTextSubmitted && selectedCatResponse.textResponses && (
  <div className="text-responses">
    <h5 className="section-title">Text Responses</h5>
    {selectedCatResponse.textResponses.map((response, index) => {
      const rating = textRatings.find(r => r.questionId === response.questionId) || {};
      return (
        <div key={response.questionId || index} className="text-response-item">
          <div className="question-text">Q{index + 1}: {response.question}</div>
          {response.subtitle && <div className="question-subtitle">{response.subtitle}</div>}
          <div className="answer-text">{response.answer}</div>
          
          <div className="rating-container">
            <label>Points:</label>
            <input
              type="number"
              min="0"
              max={response.maxPoints || 10}
              value={rating.points || 0}
              onChange={(e) => handleTextRatingChange(response.questionId, 'points', Number(e.target.value))}
            />
            <span>/ {response.maxPoints || 10}</span>
          </div>
          
          <div className="rating-container">
            <label>Rating:</label>
            <select
              value={rating.rating || 0}
              onChange={(e) => handleTextRatingChange(response.questionId, 'rating', Number(e.target.value))}
            >
              <option value="0">0 - Poor</option>
              <option value="1">1 - Below Average</option>
              <option value="2">2 - Average</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          
          <div className="rating-container">
            <textarea
              placeholder="Reviewer comments..."
              value={rating.comments || ''}
              onChange={(e) => handleTextRatingChange(response.questionId, 'comments', e.target.value)}
            />
          </div>
        </div>
      );
    })}

    
  </div>
)}

                </div>
              ) : null}
            </div>

            {/* // JSX to add to your render function - Place this before the General Interview Questions section */}
           {isInterviewExpanded && (
              <div className="cat-interview-questions">
                <h5 className="section-title">CAT Interview Section</h5>
                
                {/* Main Skill Selection */}
                {mainSkills.length > 1 && (
                  <div className="skill-selection">
                    <label>Select Main Skill:</label>
                    <div className="skill-buttons">
                      {mainSkills.map((skill) => (
                        <button
                          key={skill._id}
                          className={`skill-button ${selectedMainSkill && selectedMainSkill._id === skill._id ? 'selected' : ''}`}
                          onClick={() => handleMainSkillSelect(skill)}
                        >
                          {skill.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                
                {/* Sub Skill Selection - Only shown if a main skill is selected */}
                {selectedMainSkill && selectedMainSkill.subSkills && selectedMainSkill.subSkills.length > 0 && (
                  <div className="skill-selection">
                    <label>Select Sub Skill:</label>
                    <div className="skill-buttons">
                      {selectedMainSkill.subSkills.map((subSkill) => (
                        <button
                          key={subSkill._id}
                          className={`skill-button ${selectedSubSkill && selectedSubSkill._id === subSkill._id ? 'selected' : ''}`}
                          onClick={() => handleSubSkillSelect(subSkill)}
                          disabled={!subSkill.interviewQuestions || subSkill.interviewQuestions.length === 0}
                        >
                          {subSkill.name} 
                          {(!subSkill.interviewQuestions || subSkill.interviewQuestions.length === 0) && 
                            ' (No interview questions)'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Interview Questions for Selected Sub Skill */}


                {selectedInterviewQuestions.length > 0 && (
  <div>
    <h5>Selected Interview Questions</h5>
    {interviewQuestions
      .filter((q, idx) => selectedInterviewQuestions.includes(q._id || `interview_q_${idx}`))
      .map((question, idx) => {
        const questionId = question._id || `interview_q_${idx}`;
        const maxRating = question.ratingRange === '1-10' ? 10 : 5;
        return (
          <div key={questionId} className="interview-question-item">
            <div className="question-text">Q: {question.question}</div>
            <div className="rating-container">
              <label>Score:</label>
              <select
                value={interviewSectionScores[questionId]?.score || 0}
                onChange={e => handleInterviewSectionScoreChange(questionId, 'score', Number(e.target.value))}
              >
                {[...Array(maxRating + 1).keys()].map(score => (
                  <option key={score} value={score}>{score}</option>
                ))}
              </select>
              <span>/ {maxRating}</span>
            </div>
            <div className="comment-container">
              <textarea
                placeholder="Interviewer comments..."
                value={interviewSectionScores[questionId]?.comment || ''}
                onChange={e => handleInterviewSectionScoreChange(questionId, 'comment', e.target.value)}
              />
            </div>
          </div>
        );
      })}
  </div>
)}

              {selectedSubSkill && interviewQuestions.length > 0 && (
  <div className="interview-section-questions">
    <div style={{ marginBottom: 10 }}>
      <strong>Select (add) the questions you want to include:</strong>
    </div>
    {interviewQuestions.map((question, idx) => {
      const questionId = question._id || `interview_q_${idx}`;
      const checked = selectedInterviewQuestions.includes(questionId);
      return (
        <div key={questionId} style={{ marginBottom: 8 }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={e => {
              setSelectedInterviewQuestions(prev =>
                e.target.checked
                  ? [...prev, questionId]
                  : prev.filter(id => id !== questionId)
              );
            }}
            id={`select-question-${questionId}`}
          />
          <label htmlFor={`select-question-${questionId}`} style={{ marginLeft: 6 }}>
            {question.question}
          </label>
        </div>
      );
    })}
  </div>
)}



              </div>
            )}

            {/* General Interview Questions */}
        {allCATQuestionsScored && (
              <div className="general-interview-questions">
                <h5 className="section-title">General Interview Questions</h5>
                <div className="interview-questions">
                  <div className="question">
                    <label>Q1. Tell me about yourself</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q1.score} 
                        onChange={(e) => handleInterviewScoreChange('q1', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="Interviewer comments..."
                        value={interviewScores.q1.comment}
                        onChange={(e) => handleInterviewScoreChange('q1', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q2. Why do you want to work with us?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q2.score} 
                        onChange={(e) => handleInterviewScoreChange('q2', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="Interviewer comments..."
                        value={interviewScores.q2.comment}
                        onChange={(e) => handleInterviewScoreChange('q2', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q3. What are your strengths and weaknesses?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q3.score} 
                        onChange={(e) => handleInterviewScoreChange('q3', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="Interviewer comments..."
                        value={interviewScores.q3.comment}
                        onChange={(e) => handleInterviewScoreChange('q3', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q4. Where do you see yourself in 5 years?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q4.score} 
                        onChange={(e) => handleInterviewScoreChange('q4', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="Interviewer comments..."
                        value={interviewScores.q4.comment}
                        onChange={(e) => handleInterviewScoreChange('q4', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q5. Why should we hire you?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q5.score} 
                        onChange={(e) => handleInterviewScoreChange('q5', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="Interviewer comments..."
                        value={interviewScores.q5.comment}
                        onChange={(e) => handleInterviewScoreChange('q5', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}


   {/* General Interview Questions */}
            {selectedCandidate && (
              <div className="general-interview-questions">
                <h5 className="section-title">General Interview Questions</h5>
                <div className="interview-questions">
                  <div className="question">
                    <label>Q1. Tell me about yourself</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q1.score} 
                        onChange={(e) => handleInterviewScoreChange('q1', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q1.comment}
                        onChange={(e) => handleInterviewScoreChange('q1', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q2. Why do you want to work with us?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q2.score} 
                        onChange={(e) => handleInterviewScoreChange('q2', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q2.comment}
                        onChange={(e) => handleInterviewScoreChange('q2', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q3. What are your strengths and weaknesses?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q3.score} 
                        onChange={(e) => handleInterviewScoreChange('q3', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q3.comment}
                        onChange={(e) => handleInterviewScoreChange('q3', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q4. Where do you see yourself in 5 years?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q4.score} 
                        onChange={(e) => handleInterviewScoreChange('q4', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q4.comment}
                        onChange={(e) => handleInterviewScoreChange('q4', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="question">
                    <label>Q5. Why should we hire you?</label>
                    <div className="score-input">
                      <span>Score:</span>
                      <select 
                        value={interviewScores.q5.score} 
                        onChange={(e) => handleInterviewScoreChange('q5', 'score', Number(e.target.value))}
                      >
                        {[0, 1, 2, 3, 4, 5].map(score => (
                          <option key={score} value={score}>{score}</option>
                        ))}
                      </select>
                    </div>
                    <div className="comment-input">
                      <textarea 
                        placeholder="HR Interviewer comments..."
                        value={interviewScores.q5.comment}
                        onChange={(e) => handleInterviewScoreChange('q5', 'comment', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Recommendation Section */}
            {selectedCandidate && (
             <div className="recommendation-container">
  <label>Recommendation</label>
  <select value={recommendation} onChange={handleRecommendationChange}>
    <option value="">-- Select recommendation --</option>
    <option value="Selected">Selected</option>
    <option value="Rejected">Rejected</option>
    <option value="Second Option">Second Option</option>
    <option value="Highly recommended">Highly recommended</option>
  </select>

  <label>Comments</label>
  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Enter your comments here..."
    rows={4}
    style={{
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px'
    }}
  />

  <button 
    className="submit-button"
    onClick={handleSubmitResponse}
    disabled={isLoading || !selectedCandidate || !recommendation || !selectedCatResponse}
  >
    {isLoading ? 'Submitting...' : 'Submit Response'}
  </button>
</div>


            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default InterviewerLogin;

