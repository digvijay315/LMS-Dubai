import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import axios from 'axios';
import { base_url } from '../Utils/base_url';

function CustomSelect({ 
    label, 
    options, 
    value, 
    onSelect, 
    searchQuery, 
    onSearchChange, 
    placeholder, 
    renderOption 
  }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  
    const handleSearchClick = (e) => {
      e.stopPropagation();
      // Don't close the dropdown when clicking the search input
      if (!isOpen) {
        setIsOpen(true);
      }
    };
  
    const handleContainerClick = () => {
      setIsOpen(!isOpen);
      if (!isOpen && searchInputRef.current) {
        // Focus the search input when opening the dropdown
        setTimeout(() => {
          searchInputRef.current.focus();
        }, 0);
      }
    };
  
    return (
      <div className="custom-select-container" ref={dropdownRef}>
        <label className="label">{label}</label>
        <div 
          className="select-input-container" 
          onClick={handleContainerClick}
        >
          <div className="selected-value">
            {value ? renderOption(value) : placeholder}
          </div>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isOpen && (
          <div className="dropdown-container" onClick={e => e.stopPropagation()}>
            <div className="search-container">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                onClick={handleSearchClick}
                placeholder="Search..."
                className="dropdown-search"
              />
            </div>
            <div className="options-container">
              {options.length > 0 ? (
                options.map((option) => (
                  <div
                    key={option._id}
                    className="option"
                    onClick={() => {
                      onSelect(option);
                      setIsOpen(false);
                    }}
                  >
                    {renderOption(option)}
                  </div>
                ))
              ) : (
                <div className="no-options">No results found</div>
              )}
            </div>
          </div>
        )}
        <style>
            {`
            .custom-select-container {
                position: relative;
                width: 100%;
                margin-bottom: 1rem;
            }

            .select-input-container {
                padding: 0.75rem;
                border: 1px solid #7A1CAC;
                border-radius: 0.375rem;
                background-color: white;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-height: 42px;
            }

            .select-input-container:hover {
                border-color: #cbd5e0;
            }

            .selected-value {
                color: #1a202c;
                font-size: 0.875rem;
            }

            .arrow {
                font-size: 0.75rem;
                transition: transform 0.2s;
                color: #718096;
            }

            .arrow.open {
                transform: rotate(180deg);
            }

            .dropdown-container {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                margin-top: 0.25rem;
                background-color: white;
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                z-index: 50;
                max-height: 300px;
            }

            .search-container {
                padding: 0.5rem;
                border-bottom: 1px solid #e2e8f0;
            }

            .dropdown-search {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #e2e8f0;
                border-radius: 0.25rem;
                font-size: 0.875rem;
            }

            .dropdown-search:focus {
                outline: none;
                border-color: #4299e1;
                box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
            }

            .options-container {
                max-height: 250px;
                overflow-y: auto;
            }

            .options-container::-webkit-scrollbar {
                width: 6px;
            }

            .options-container::-webkit-scrollbar-track {
                background: #f7fafc;
            }

            .options-container::-webkit-scrollbar-thumb {
                background: #cbd5e0;
                border-radius: 3px;
            }

            .option {
                padding: 0.75rem;
                cursor: pointer;
                font-size: 0.875rem;
                color: #1a202c;
            }

            .option:hover {
                background-color: #f7fafc;
            }

            .no-options {
                padding: 0.75rem;
                color: #718096;
                text-align: center;
                font-size: 0.875rem;
            }

            .details-card {
                margin-top: 1rem;
                padding: 1rem;
                background-color: #f8fafc;
                border-radius: 0.375rem;
                border: 1px solid #e2e8f0;
            }
            `}
        </style>
      </div>
    );
}

function ConductInterviewCAT() {
  const [employee, setEmployee] = useState(null);
  const [catData, setCatData] = useState(null);
  const [selectedCAT, setSelectedCAT] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchCATQuery, setSearchCATQuery] = useState('');
  const [searchEmployeeQuery, setSearchEmployeeQuery] = useState('');
  const [selectedMainSkill, setSelectedMainSkill] = useState(null);
  const [selectedSubSkill, setSelectedSubSkill] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [questionRatings, setQuestionRatings] = useState({});
  const [usedSubSkills, setUsedSubSkills] = useState(new Set());
  const [catResponses, setCatResponses] = useState([]);
  const [employeeResponse, setEmployeeResponse] = useState(null);
  const [textScores, setTextScores] = useState({});
  const [textQuestionPoints, setTextQuestionPoints] = useState({});
  const [subSkillQuestionCounts, setSubSkillQuestionCounts] = useState({});
  const [hasMinimumQuestions, setHasMinimumQuestions] = useState(false);

      // Add new state to track completed sub-skills
      const [completedSubSkills, setCompletedSubSkills] = useState(new Set());

          // Effect to check if minimum questions requirement is met
    useEffect(() => {
      if (selectedCAT) {
          const requiredSubSkills = selectedCAT.mainSkills[0]?.subSkills.length || 0;
          const completedCount = completedSubSkills.size;
          setHasMinimumQuestions(completedCount >= 1);
      }
    }, [completedSubSkills, selectedCAT]);

        // Fetch CAT responses when CAT is selected
        useEffect(() => {
          if (selectedCAT?._id) {
            fetchCATResponses(selectedCAT._id);
          }
        }, [selectedCAT]);

         // Fetch employee's response when employee is selected
    useEffect(() => {
      if (selectedCAT?._id && selectedEmployee?.employee_id) {
        fetchEmployeeResponse(selectedCAT._id, selectedEmployee.employee_id);
      }
    }, [selectedCAT, selectedEmployee]);

    const fetchCATResponses = async (catId) => {
      try {
          const response = await axios.get(`${base_url}/cat_responses/${catId}`);
          const responses = response.data.data;
          setCatResponses(responses);
          
          // Update filtered employees based on CAT responses
          if (employee) {
              const employeesWithCAT = employee.filter(emp => 
                  responses.some(response => response.employee_id === emp.employee_id)
              );
              setEmployee(employeesWithCAT); // Update employee list to only show relevant employees
          }
      } catch (error) {
          console.error("Error fetching CAT responses:", error);
      }
  };

  // Fetch all employees and CAT data initially
  const fetchInitialData = async () => {
    try {
        const [employeeResponse, catResponse] = await Promise.all([
            axios.get(`${base_url}/employee_details_get`),
            axios.get(`${base_url}/get_all_cat`)
        ]);
        
        setEmployee(employeeResponse.data.employee);
        setCatData(catResponse.data.data);
    } catch (error) {
        console.error("Error fetching initial data:", error);
    }
};

// Initial data fetch
useEffect(() => {
    fetchInitialData();
}, []);

useEffect(() => {
  if (selectedCAT?._id) {
      fetchCATResponses(selectedCAT._id);
      // Reset employee selection when CAT changes
      setSelectedEmployee(null);
      setEmployeeResponse(null);
  }
}, [selectedCAT]);

    const fetchEmployeeResponse = async (catId, employeeId) => {
      try {
        const response = await axios.get(`${base_url}/cat_response/${catId}/${employeeId}`);
        setEmployeeResponse(response.data.data);

        // Fetch the CAT details to get question points
        const catDetailsResponse = await axios.get(`${base_url}/get_cat_byid/${catId}`);
        const textQuestions = catDetailsResponse.data.data.textQuestions;
        
        // Create a map of question IDs to their points
        const pointsMap = {};
        textQuestions.forEach(question => {
            pointsMap[question._id] = question.points;
        });
        setTextQuestionPoints(pointsMap);
        
        // Initialize text scores
        const initialTextScores = {};
        response.data.data.responses.text.forEach(item => {
          initialTextScores[item.questionId] = item.score || 0;
        });
        setTextScores(initialTextScores);
        
        // Initialize interview ratings
        const initialRatings = {};
        response.data.data.responses.interview.forEach(item => {
          initialRatings[item.questionId] = item.ratingScore || "";
        });
        setQuestionRatings(initialRatings);
      } catch (error) {
        console.error("Error fetching employee response:", error);
      }
    };

        // Filter employees to only show those who have completed the selected CAT
        const filteredEmployees = employee?.filter(emp => {
          const matchesSearch = emp.employee_name?.toLowerCase().includes(searchEmployeeQuery.toLowerCase()) ||
                              emp.employee_id?.toLowerCase().includes(searchEmployeeQuery.toLowerCase());
          const hasCompletedCAT = catResponses.some(response => 
              response.employee_id === emp.employee_id
          );
          return matchesSearch && hasCompletedCAT;
      }) || [];
    
      const handleTextScoreChange = (questionId, score) => {
        const maxPoints = textQuestionPoints[questionId] || 0;
        const validScore = Math.min(Math.max(0, Number(score)), maxPoints);
        
        setTextScores(prev => ({
            ...prev,
            [questionId]: validScore
        }));
      };

        const renderEmployeeSelect = () => {
          if (!selectedCAT) {
              return (
                  <div className="select-wrapper">
                      <p className="select-message">Please select a CAT first</p>
                  </div>
              );
          }
  
          return (
              <div className="select-wrapper">
                  <CustomSelect
                      label="Select Employee"
                      options={filteredEmployees}
                      value={selectedEmployee}
                      onSelect={setSelectedEmployee}
                      searchQuery={searchEmployeeQuery}
                      onSearchChange={handleEmployeeSearch}
                      placeholder={
                          filteredEmployees.length === 0 
                              ? "No employees have completed this CAT" 
                              : "Select an Employee"
                      }
                      renderOption={(emp) => `${emp.employee_name} (${emp.employee_id})`}
                  />
                  
                  {selectedEmployee && employeeResponse && (
                      <div className="details-card">
                          <h3 className="details-title">Selected Employee Details</h3>
                          <p className="details-text">Name: {selectedEmployee.employee_name}</p>
                          <p className="details-text">ID: {selectedEmployee.employee_id}</p>
                          <p className="details-text">Designation: {selectedEmployee.designation}</p>
                          <p className="details-text">MCQ Score: {employeeResponse.mcqTotalScore}</p>
                          <p className="details-text">MCQ Average: {employeeResponse.mcqAverage}%</p>
                      </div>
                  )}
              </div>
          );
      };

  // Reset selections when CAT changes
  useEffect(() => {
    setSelectedMainSkill(null);
    setSelectedSubSkill(null);
    setSelectedQuestions([]);
    setQuestionRatings({});
    setUsedSubSkills(new Set()); // Reset used sub-skills
  }, [selectedCAT]);

  // Reset sub-skill when main skill changes
  useEffect(() => {
    setSelectedSubSkill(null);
    setSelectedQuestions([]);
    setQuestionRatings({});
  }, [selectedMainSkill]);

  const filteredCATs = catData?.filter(cat => 
    cat.title.toLowerCase().includes(searchCATQuery.toLowerCase()) ||
    cat.code.toLowerCase().includes(searchCATQuery.toLowerCase())
  ) || [];

  const handleCATSearch = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setSearchCATQuery(e.target.value);
  };

  const handleEmployeeSearch = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing
    setSearchEmployeeQuery(e.target.value);
  };

  const handleAddQuestion = (question) => {
    setSelectedQuestions(prev => [...prev, question]);
    setQuestionRatings(prev => ({
        ...prev,
        [question._id]: ""
    }));
    
    // Update question count for this sub-skill
    const newCounts = {
        ...subSkillQuestionCounts,
        [question.subSkillId]: (subSkillQuestionCounts[question.subSkillId] || 0) + 1
    };
    setSubSkillQuestionCounts(newCounts);
    
    // If this sub-skill now has 5 questions, mark it as completed
    if (newCounts[question.subSkillId] >= 5) {
        setCompletedSubSkills(prev => new Set([...prev, question.subSkillId]));
        setUsedSubSkills(prev => new Set([...prev, question.subSkillId]));
    }
  };

  const handleRatingChange = (questionId, rating) => {
    setQuestionRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const isQuestionSelected = (questionId) => {
    return selectedQuestions.some(q => q._id === questionId);
  };


    // Modify the text responses section in the render
    const handleRemoveQuestion = (questionId) => {
      const removedQuestion = selectedQuestions.find(q => q._id === questionId);
      if (!removedQuestion) return;

      setSelectedQuestions(prev => prev.filter(q => q._id !== questionId));
      
      const updatedRatings = { ...questionRatings };
      delete updatedRatings[questionId];
      setQuestionRatings(updatedRatings);
      
      // Update question count and completion status
      const newCount = (subSkillQuestionCounts[removedQuestion.subSkillId] || 0) - 1;
      setSubSkillQuestionCounts(prev => ({
          ...prev,
          [removedQuestion.subSkillId]: newCount
      }));
      
      if (newCount < 5) {
          const newCompletedSubSkills = new Set(completedSubSkills);
          newCompletedSubSkills.delete(removedQuestion.subSkillId);
          setCompletedSubSkills(newCompletedSubSkills);
          
          const newUsedSubSkills = new Set(usedSubSkills);
          newUsedSubSkills.delete(removedQuestion.subSkillId);
          setUsedSubSkills(newUsedSubSkills);
      }
  };

    const renderTextResponses = () => {
      if (!employeeResponse?.responses?.text) return null;

      return (
          <>
              <h5>Text Responses</h5>
              {employeeResponse.responses.text.map(item => (
                  <div key={item.questionId} className="text-response">
                      <p><strong>Question:</strong> {item.question}</p>
                      <p><strong>Answer:</strong> {item.answer}</p>
                      <div className="score-input">
                          <label>Score (0-{textQuestionPoints[item.questionId] || 0}):</label>
                          <input
                              type="number"
                              min="0"
                              max={textQuestionPoints[item.questionId] || 0}
                              value={textScores[item.questionId] || 0}
                              onChange={(e) => handleTextScoreChange(item.questionId, e.target.value)}
                          />
                          <span className="max-points">
                              Max Points: {textQuestionPoints[item.questionId] || 0}
                          </span>
                      </div>
                  </div>
              ))}
          </>
      );
    };

  const handleSubmit = async () => {
    try {
        // Create a complete updated response object
        const updatedResponse = {
            ...employeeResponse,
            responses: {
                mcq: employeeResponse.responses.mcq, // Keep existing MCQ responses
                text: employeeResponse.responses.text.map(item => ({
                    ...item,
                    score: Number(textScores[item.questionId]) || 0
                })),
                interview: selectedQuestions.map(question => ({
                    questionId: question._id,
                    question: question.question,
                    ratingRange: question.ratingRange,
                    ratingScore: Number(questionRatings[question._id]) || 0,
                    subSkillName: question.subSkillName,
                    mainSkillName: question.mainSkillName 
                }))
            },
            mcqTotalScore: employeeResponse.mcqTotalScore,
            mcqAverage: employeeResponse.mcqAverage,
            passed: employeeResponse.passed
        };

        const response = await axios.put(
            `${base_url}/update-cat-response/${employeeResponse._id}`, 
            updatedResponse
        );
        
        if (response.data.success) {
            alert("Interview responses submitted successfully!");
        } else {
            alert("Error submitting responses: " + response.data.message);
        }
    } catch (error) {
        console.error("Error submitting interview responses:", error);
        alert("Error submitting responses: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>

      <style>
      {`
      body {
          background-color: rgba(46, 7, 63, 0.1);
          padding: 20px;
      }
      .conduct-cat-container {
          background-color: #ffffff;
          padding: 1rem;
          border-radius: 10px;
      }
      .title-text {
          background-color: #2E073F;
          color: #ffffff;
          height: 8rem;
          padding: 2rem;
          border-top-right-radius: 1rem;
          border-top-left-radius: 1rem;
      }
      .select-container {
          padding: 2rem;
      }
      .selection-group {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
      }
      .select-wrapper {
          flex: 1;
      }
      .details-card {
          padding: 1rem;
          margin-top: 1rem;
          background-color: #f8f9fa;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .search-input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
      }
      .select-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 0.25rem;
          background-color: white;
      }
      .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
      }
      .details-title {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
      }
      .details-text {
          margin: 0.25rem 0;
          color: #4a5568;
      }

      /* Main container styles */
      .Main-Sub-skills-div {
      display: flex;
      gap: 20px;
      margin: 30px 0px;
      padding: 20px;
      background-color: #f8f9fa;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }

      .Main-skill-div,
      .Sub-skill-div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      }

      /* Select styles */
      .skill-select {
      padding: 10px;
      border: 1px solid #7A1CAC;
      border-radius: 6px;
      background-color: white;
      font-size: 1rem;
      transition: border-color 0.2s ease-in-out;
      }

      .skill-select:focus {
      outline: none;
      border-color: #7A1CAC;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
      }

      .skill-select:disabled {
      background-color: #e9ecef;
      cursor: not-allowed;
      }

      /* Label styles */
      label {
      font-weight: 600;
      color: #495057;
      margin-bottom: 4px;
      }

      /* Questions container */
      .questions-container {
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .questions-container h5 {
      font-size: 1.25rem;
      color: #212529;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e9ecef;
      }

      /* Available and Selected Questions sections */
      .available-questions,
      .selected-questions {
      margin-bottom: 30px;
      }

      .available-questions h6,
      .selected-questions h4 {
      font-size: 1.1rem;
      color: #495057;
      margin-bottom: 15px;
      }

      /* Question item styles */
      .question-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background-color:rgba(133, 71, 166, 0.07);
      border-radius: 6px;
      margin-bottom: 15px;
      border: 1px solid #e9ecef;
      transition: transform 0.2s ease;
      }

      .question-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }

      .question-item p {
      margin-bottom: 10px;
      color: #212529;
      }

      .rating-range {
      font-size: 0.9rem;
      color: #6c757d;
      font-style: italic;
      }

      /* Button styles */
      .add-question-btn {
      background-color: #7A1CAC;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: background-color 0.2s ease;
      }

      .add-question-btn:hover {
      background-color:rgba(122, 28, 172, 0.82);
      }

      /* Rating input styles */
      .rating-input {
      display: flex;
      align-items: center;
      // gap: 10px;
      margin-top: 10px;
      }

      .rating-input label {
      font-size: 0.9rem;
      color: #495057;
      }

      /* Responsive design */
      @media (max-width: 768px) {
      .Main-Sub-skills-div {
      flex-direction: column;
      }

      .Main-skill-div,
      .Sub-skill-div {
      width: 100%;
      }
      }

      // .question-header {
      // display: flex;
      // justify-content: space-between;
      // align-items: flex-start;
      // gap: 10px;
      // }

      .remove-question-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      flex-shrink: 0;
      }

      .remove-question-btn:hover {
      background-color: #c82333;
      }

      .rating-select-field {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      // width: 100px;
      margin-left: 10px;
      background-color: white;
      cursor: pointer;
      }

      .rating-select-field:focus {
      outline: none;
      border-color: #7A1CAC;
      box-shadow: 0 0 0 2px rgba(122, 28, 172, 0.1);
      }

      h5{
      color: #7A1CAC;

      }
      `}
      </style>

        <div>
          <Sidebar />
          <section className="main-content-section">
            <Header />

            <div className="conduct-cat-container">
              <div className="title-text">
                <h2>Conduct Interview <span style={{ fontWeight: "300" }}>CAT</span></h2>
              </div>

              <div className="select-container">
                  <div className="selection-group">
                      <div className="select-wrapper">
                      <CustomSelect
                          label="Select CAT"
                          options={filteredCATs}
                          value={selectedCAT}
                          onSelect={setSelectedCAT}
                          searchQuery={searchCATQuery}
                          onSearchChange={handleCATSearch}
                          placeholder="Select a CAT"
                          renderOption={(cat) => `${cat.title} (${cat.code})`}
                      />
                      
                      {selectedCAT && (
                          <div className="details-card">
                          <h3 className="details-title">Selected CAT Details</h3>
                          <p className="details-text">Title: {selectedCAT.title}</p>
                          <p className="details-text">Code: {selectedCAT.code}</p>
                          <p className="details-text">Valid Till: {new Date(selectedCAT.validTill).toLocaleDateString()}</p>
                          </div>
                      )}
                      </div>

                      {renderEmployeeSelect()}
                  </div>

                  {selectedEmployee && employeeResponse && (
                    <div className="response-details">
                      <h5>MCQ Results</h5>
                      <p>Total Score: {employeeResponse.mcqTotalScore}</p>
                      <p>Average: {employeeResponse.mcqAverage}%</p>
                      
                      {/* <h5>Text Responses</h5>
                      {employeeResponse.responses.text.map(item => (
                        <div key={item.questionId} className="text-response">
                          <p><strong>Question:</strong> {item.question}</p>
                          <p><strong>Answer:</strong> {item.answer}</p>
                          <div className="score-input">
                            <label>Score:</label>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={textScores[item.questionId] || 0}
                              onChange={(e) => handleTextScoreChange(item.questionId, e.target.value)}
                            />
                          </div>
                        </div>
                      ))} */}
                      {renderTextResponses()}

                      {/* ... existing interview questions code ... */}
                    </div>
                  )}

                  {/* {selectedSubSkill && (
                        <div className="questions-container">
                          <h5>Interview Questions</h5>
                          <div className="available-questions">
                            <h6>Available Questions</h6>
                            {selectedSubSkill.interviewQuestions.map(question => (
                              <div key={question._id} className="question-item">
                                <div>
                                  <p>{question.question}</p>
                                  <p className="rating-range" style={{marginBottom:"0px"}}>Rating Range: {question.ratingRange}</p>
                                </div>
                                {!isQuestionSelected(question._id) && (
                                  <button
                                    onClick={() => handleAddQuestion(question)}
                                    className="add-question-btn"
                                  >
                                    Add Question
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>

                          {selectedQuestions.length > 0 && (
                            <div className="selected-questions">
                              <h4>Selected Questions</h4>
                              {selectedQuestions.map(question => (
                                <div key={question._id} className="question-item">
                                  <div className="question-header">
                                    <p style={{marginBottom:"0px"}}>{question.question}</p>
                                    <div className="rating-input">
                                      <label>Rating ({question.ratingRange}):</label>
                                      <select
                                        value={questionRatings[question._id] || ''}
                                        onChange={(e) => handleRatingChange(question._id, e.target.value)}
                                        className="rating-select-field"
                                      >
                                        <option value="">Select Rating</option>
                                        {[...Array(question.ratingRange === '1-5' ? 5 : 10)].map((_, index) => (
                                          <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>

                                  <button 
                                    onClick={() => handleRemoveQuestion(question._id)} 
                                    className="remove-question-btn"
                                    aria-label="Remove question"
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                  )} */}

                <div className="questions-container">
                {selectedQuestions.length > 0 && (
                      <div className="selected-questions">
                          <h4>Selected Questions</h4>
                          {Array.from(usedSubSkills).map(subSkillId => {
                              const subSkillQuestions = selectedQuestions.filter(
                                  q => q.subSkillId === subSkillId
                              );
                              if (subSkillQuestions.length === 0) return null;

                              return (
                                  <div key={subSkillId} className="sub-skill-questions">
                                      <h5>{subSkillQuestions[0].subSkillName}</h5>
                                      {subSkillQuestions.map(question => (
                                          <div key={question._id} className="question-item">
                                            <div>
                                              <p>{question.question}</p>
                                              <div className="rating-input">
                                                  <label>
                                                      Rating ({question.ratingRange}):
                                                      <select
                                                          value={questionRatings[question._id] || ''}
                                                          onChange={(e) => handleRatingChange(question._id, e.target.value)}
                                                      >
                                                          <option value="">Select Rating</option>
                                                          {[...Array(question.ratingRange === '1-5' ? 5 : 10)].map((_, i) => (
                                                              <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                          ))}
                                                      </select>
                                                  </label>
                                              </div>
                                            </div>
                                              <button
                                                  onClick={() => handleRemoveQuestion(question._id)}
                                                  className="remove-question-btn"
                                              >
                                                  Remove
                                              </button>
                                          </div>
                                      ))}
                                  </div>
                              );
                          })}
                      </div>
                  )}
                  
                  {selectedSubSkill && (
                      <>
                          <h5>Interview Questions for {selectedSubSkill.name}</h5>
                          <p style={{fontSize:"14px"}}>Please select atleast five questions to proceed.</p>
                          <div className="available-questions">
                              {selectedSubSkill.interviewQuestions.map(question => (
                                  <div key={question._id} className="question-item">
                                    <div>
                                      <p>{question.question}</p>
                                      <p className="rating-range">Rating Range: {question.ratingRange}</p>
                                    </div>
                                      {!isQuestionSelected(question._id) && (
                                          <button
                                              onClick={() => handleAddQuestion({
                                                  ...question,
                                                  subSkillId: selectedSubSkill._id,
                                                  subSkillName: selectedSubSkill.name,
                                                  mainSkillName: selectedCAT.mainSkills[0].name
                                              })}
                                              className="add-question-btn"
                                              disabled={subSkillQuestionCounts[selectedSubSkill._id] >= 5}
                                          >
                                              Add Question
                                          </button>
                                      )}
                                  </div>
                              ))}
                          </div>
                      </>
                  )}
                </div>

                  <div className='Main-Sub-skills-div'>
                    <div className='Main-skill-div'>
                      <label>Main Skill</label>
                      <div className="main-skill-name">
                        {selectedCAT?.mainSkills[0]?.name || "No main skill available"}
                      </div>
                    </div>
                    

                    <div className='Sub-skill-div'>
                      <label>Select Sub Skill</label>
                      <select
                        value={selectedSubSkill?._id || ""}
                        onChange={(e) => {
                          const skill = selectedCAT?.mainSkills[0]?.subSkills.find(s => s._id === e.target.value);
                          setSelectedSubSkill(skill);
                        }}
                        className="skill-select"
                      >
                        <option value="">Select Sub Skill</option>
                        {selectedCAT?.mainSkills[0]?.subSkills
                          .filter(skill => !usedSubSkills.has(skill._id)) // Filter out used sub-skills
                          .map(skill => (
                            <option key={skill._id} value={skill._id}>
                              {skill.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>







                  </div>




               <button 
  onClick={() => {
    if (!hasMinimumQuestions) {
      alert("Please select the minimum number of questions.");
      return;
    }

    const unrated = selectedQuestions.find(q => !questionRatings[q._id]);
    if (unrated) {
      alert(`Please rate all selected questions.`);
      return;
    }

    handleSubmit(); // Proceed if all checks pass
  }}
  className="submit-button"
>
  Submit Interview Response
</button>


              </div>
            </div>
          </section>

          <style jsx>{`
            .select-message {
            padding: 1rem;
            color: #666;
            text-align: center;
            background: #f8f9fa;
            border-radius: 4px;
            margin-top: 1rem;
            }
  .response-details {
    margin-top: 2rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }
  .text-response {
    margin: 1rem 0;
    padding: 1rem;
    background: white;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  .score-input {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }
  .score-input input {
    width: 80px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .submit-button {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .submit-button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
    .score-input {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-top: 0.5rem;
            }
            .score-input input {
                width: 80px;
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            .max-points {
                color: #666;
                font-size: 0.9em;
            }
          `}</style> 

        </div>
    </div>
  );
}

export default ConductInterviewCAT;


