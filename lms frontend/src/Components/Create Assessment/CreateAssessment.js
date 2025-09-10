import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
// import QuestionForm from "./QuestionForm";
import QuestionTextForm from "./QuestionTextForm";
import MatchTheFollowingForm from "./MatchTheFollowingForm";
import DuplicateAssessment from "./DuplicateAssessment";
import { NavLink } from "react-bootstrap";
import axios from 'axios';
import { base_url } from "../Utils/base_url";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Form from 'react-bootstrap/Form';
import { FaUpload } from 'react-icons/fa';

function CreateAssessment() {

  const [questionValidations, setQuestionValidations] = useState({});

  // MCQ questions create component
  const QuestionForm = ({ onChange, questionId, sectionId, registerValidation }) => {
    
    const [formState, setFormState] = useState({
      visible: true,
      question: '',
      options: [
        { text: '', correct: false },
        { text: '', correct: false },
      ],
      points: 1,
      multipleAnswers: false,
      mainCategory: '',
      subCategory: '',
      correctAnswers: 1,
      hasValidationError: false,
      validationMessage: '',
    });

    useEffect(() => {
      // Call onChange whenever formState changes
      onChange(formState);
    }, [formState, onChange]);

    // Validation function to check if the correct number of options are selected
    const validateCorrectOptions = () => {
      const correctOptionsCount = formState.options.filter(opt => opt.correct).length;
      
      if (correctOptionsCount === 0) {
        setFormState(prev => ({
          ...prev,
          hasValidationError: true,
          validationMessage: 'Please select at least one correct option'
        }));
        return false;
      }
      
      if (formState.multipleAnswers && correctOptionsCount !== formState.correctAnswers) {
        setFormState(prev => ({
          ...prev,
          hasValidationError: true,
          validationMessage: `Please select exactly ${formState.correctAnswers} correct options`
        }));
        return false;
      }
      
      // If we reach here, validation passed
      setFormState(prev => ({
        ...prev,
        hasValidationError: false,
        validationMessage: ''
      }));
      return true;
    };

    // Register the validation function with the parent component
    useEffect(() => {
      if (registerValidation) {
        registerValidation(sectionId, questionId, validateCorrectOptions);
      }
    }, [sectionId, questionId, registerValidation]);

    const updateState = (key, value) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };

    const updateOption = (index, field, value) => {
      const updatedOptions = [...formState.options];
      updatedOptions[index][field] = value;
      
      setFormState(prev => ({
        ...prev,
        options: updatedOptions,
        hasValidationError: false,
        validationMessage: ''
      }));
    };

    const toggleCorrect = (index) => {
      const updatedOptions = [...formState.options];
      if (formState.multipleAnswers) {
        const correctCount = updatedOptions.filter((opt) => opt.correct).length;

        if (!updatedOptions[index].correct && correctCount >= formState.correctAnswers) {
          toast.error(`You can select up to ${formState.correctAnswers} correct answers.`, {
            autoClose: 2000,
          });
          return;
        }
        updatedOptions[index].correct = !updatedOptions[index].correct;
      } else {
        updatedOptions.forEach((opt, i) => (opt.correct = i === index));
      }
      
      setFormState(prev => ({
        ...prev,
        options: updatedOptions,
        hasValidationError: false,
        validationMessage: ''
      }));
    };

    const handlePointsChange = (value) => {
      updateState('points', Math.max(1, Math.min(10, Number(value))));
    };

    const handleCorrectAnswersChange = (value) => {
      const correctAnswers = Math.min(Number(value), formState.options.length);
      
      const updatedOptions = [...formState.options];
      let correctCount = updatedOptions.filter((opt) => opt.correct).length;

      if (correctCount > correctAnswers) {
        updatedOptions.forEach((opt, idx) => {
          if (correctCount > correctAnswers && opt.correct) {
            opt.correct = false;
            correctCount -= 1;
          }
        });
      }
      
      setFormState(prev => ({
        ...prev,
        correctAnswers,
        options: updatedOptions
      }));
    };

    const addOption = () => {
      updateState('options', [...formState.options, { text: '', correct: false }]);
    };

    const removeOption = (index) => {
      const newOptions = formState.options.filter((_, i) => i !== index);
      updateState('options', newOptions);
    };

    if (!formState.visible) return null;

    return (
      <div className='main-container-div'>
        <div className="question-form" style={{ position: 'relative' }}>
          {formState.hasValidationError && (
            <div className="validation-error" style={{ 
              color: 'red', 
              padding: '8px', 
              marginBottom: '10px', 
              backgroundColor: '#ffeeee', 
              borderRadius: '4px',
              border: '1px solid #ffaaaa'
            }}>
              {formState.validationMessage}
            </div>
          )}
          
          <div className="question-input">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={formState.question}
                onChange={(e) => updateState('question', e.target.value)}
                placeholder="Enter your question"
                style={{ width: '100%' }}
              />
              <IconButton color="primary" component="label">
                <input hidden accept="image/*" type="file" />
                <AddPhotoAlternateIcon />
              </IconButton>
            </div>
          </div>

          <div className="options-list">
            {formState.options.map((option, index) => (
              <div className="option-item" key={index}>
                <input
                  type="checkbox"
                  checked={option.correct}
                  onChange={() => toggleCorrect(index)}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => updateOption(index, 'text', e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <FaUpload className="upload-icon" title="Upload Image" />
                </div>
                <button className="desc-del-btn" onClick={() => removeOption(index)}>
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
            <button className="add-option-btn" onClick={addOption}>
              <i className="fa-solid fa-plus"></i> Add Option
            </button>
          </div>

          <div className="dropdowns">
            <div>
              <label>Main Category:</label>
              <select
                value={formState.mainCategory}
                onChange={(e) => updateState('mainCategory', e.target.value)}
              >
                <option value="">Select Main Category</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
              </select>
            </div>
            <div>
              <label>Sub Category:</label>
              <select
                value={formState.subCategory}
                onChange={(e) => updateState('subCategory', e.target.value)}
              >
                <option value="">Select Sub Category</option>
                <option value="Sub Category 1">Sub Category 1</option>
                <option value="Sub Category 2">Sub Category 2</option>
              </select>
            </div>
          </div>

          <div className="footer-controls">
            <div className="control-item">
              <label>Points:</label>
              <input
                type="number"
                value={formState.points}
                min={1}
                max={10}
                onChange={(e) => handlePointsChange(e.target.value)}
              />
            </div>
            <div className="control-item">
              <Form>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Multiple answers:"
                  checked={formState.multipleAnswers}
                  onChange={(e) => {
                    const multipleAnswers = e.target.checked;
                    
                    const updatedOptions = [...formState.options];
                    if (!multipleAnswers) {
                      updatedOptions.forEach((opt, i) => (opt.correct = i === 0));
                    }
                    
                    setFormState(prev => ({
                      ...prev,
                      multipleAnswers,
                      options: updatedOptions
                    }));
                  }}
                />
              </Form>
            </div>

            {formState.multipleAnswers && (
              <div className="control-item">
                <label>Correct Answers:</label>
                <input
                  type="number"
                  value={formState.correctAnswers}
                  min={1}
                  max={formState.options.length}
                  onChange={(e) => handleCorrectAnswersChange(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  const [sections, setSections] = useState([{ id: 1, questions: [] }]);
  const [globalQuestionNumber, setGlobalQuestionNumber] = useState(1);
  const [questionOptionsVisibility, setQuestionOptionsVisibility] = useState({});
  const [assessmentDetails, setAssessmentDetails] = useState({
    title: "",
    code: "",
    description: "",
    timer: "",
  });

  // Add this function to register validation functions from child components
  const registerValidation = (sectionId, questionId, validationFn) => {
    setQuestionValidations(prev => ({
      ...prev,
      [`${sectionId}-${questionId}`]: validationFn
    }));
  };

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      questions: [],
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (sectionId) => {
    const updatedSections = sections.filter((section) => section.id !== sectionId);
    setSections(updatedSections);
    const updatedVisibility = { ...questionOptionsVisibility };
    delete updatedVisibility[sectionId];
    setQuestionOptionsVisibility(updatedVisibility);

    // Update section titles after removal to ensure they are sequential
    setSections((prevSections) =>
      prevSections.map((section, index) => ({
        ...section,
        id: index + 1, // Update section ID to reflect correct order
      }))
    );
  };

  // const addQuestionToSection = (sectionId, type) => {
  //   const updatedSections = sections.map((section) => {
  //     if (section.id === sectionId) {
  //       const newQuestion = {
  //         id: globalQuestionNumber,
  //         type,
  //       };
  //       section.questions.push(newQuestion);
  //     }
  //     return section;
  //   });
  //   setSections(updatedSections);
  //   setGlobalQuestionNumber(globalQuestionNumber + 1); // Increment global question number
  // };

  // Update addQuestionToSection to validate current questions
  const addQuestionToSection = (sectionId, type) => {
    // Check if there are existing questions in this section
    const currentSection = sections.find(section => section.id === sectionId);
    if (currentSection && currentSection.questions.length > 0) {
      // Get the last question in the section
      const lastQuestion = currentSection.questions[currentSection.questions.length - 1];
      
      // If the last question is an MCQ, validate it before adding a new question
      if (lastQuestion.type === "MCQ") {
        const validationKey = `${sectionId}-${lastQuestion.id}`;
        const validateFn = questionValidations[validationKey];
        
        if (validateFn && !validateFn()) {
          // If validation fails, show a toast message and don't add a new question
          toast.error("Please select at least one correct option before adding a new question.", {
            autoClose: 3000,
          });
          return;
        }
      }
    }

    // If validation passes or there are no questions to validate, add the new question
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const newQuestion = {
          id: globalQuestionNumber,
          type,
        };
        section.questions.push(newQuestion);
      }
      return section;
    });
    setSections(updatedSections);
    setGlobalQuestionNumber(globalQuestionNumber + 1); // Increment global question number
  };

  const removeQuestionFromSection = (sectionId, questionId) => {
    let isQuestionRemoved = false;
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        const filteredQuestions = section.questions.filter(
          (question) => question.id !== questionId
        );
        if (filteredQuestions.length < section.questions.length) {
          isQuestionRemoved = true;
        }
        section.questions = filteredQuestions;
      }
      return section;
    });
    setSections(updatedSections);
    if (isQuestionRemoved) {
      // Decrement globalQuestionNumber to maintain sequential numbering
      setGlobalQuestionNumber(globalQuestionNumber - 1);
    }
  };

  const toggleQuestionOptionsVisibility = (sectionId) => {
    setQuestionOptionsVisibility((prevVisibility) => ({
      ...prevVisibility,
      [sectionId]: !prevVisibility[sectionId],
    }));
  };

  const handleAssessmentInputChange = (e) => {
    const { name, value } = e.target;
    setAssessmentDetails({ ...assessmentDetails, [name]: value });
  };

  // const renderQuestionComponent = (type, sectionId, questionId) => {
  //   const handleQuestionChange = (data) => {
  //     setSections((prevSections) =>
  //       prevSections.map((section) => {
  //         if (section.id === sectionId) {
  //           return {
  //             ...section,
  //             questions: section.questions.map((question) => {
  //               if (question.id === questionId) {
  //                 return { ...question, ...data }; // Update question data
  //               }
  //               return question;
  //             }),
  //           };
  //         }
  //         return section;
  //       })
  //     );
  //   };
  
  //   switch (type) {
  //     case "MCQ":
  //       return <QuestionForm onChange={handleQuestionChange} />;
  //     case "Text":
  //       return <QuestionTextForm onChange={handleQuestionChange} />;
  //     case "Match The Following":
  //       return <MatchTheFollowingForm onChange={handleQuestionChange} />;
  //     case "Duplicate":
  //       return <DuplicateAssessment onChange={handleQuestionChange} />;
  //     default:
  //       return null;
  //   }
  // };


  // Update the renderQuestionComponent function to pass necessary props
  const renderQuestionComponent = (type, sectionId, questionId) => {
    const handleQuestionChange = (data) => {
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              questions: section.questions.map((question) => {
                if (question.id === questionId) {
                  return { ...question, ...data }; // Update question data
                }
                return question;
              }),
            };
          }
          return section;
        })
      );
    };

    switch (type) {
      case "MCQ":
        return <QuestionForm 
          onChange={handleQuestionChange} 
          sectionId={sectionId} 
          questionId={questionId} 
          registerValidation={registerValidation} 
        />;
      case "Text":
        return <QuestionTextForm onChange={handleQuestionChange} />;
      case "Match The Following":
        return <MatchTheFollowingForm onChange={handleQuestionChange} />;
      case "Duplicate":
        return <DuplicateAssessment onChange={handleQuestionChange} />;
      default:
        return null;
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post(`${base_url}/assessment_data_save`, {
  //       assessment_title: assessmentDetails.assessment_title,
  //       assessment_code: assessmentDetails.assessment_code,
  //       assessment_description: assessmentDetails.assessment_description,
  //       assessment_timer: assessmentDetails.assessment_timer,
  //       sections: sections.map((section) => ({
  //         id: section.id,
  //         title: document.getElementById(`section-title-${section.id}`)?.value || '',
  //         subtitle: document.getElementById(`section-subtitle-${section.id}`)?.value || '',
  //         questions: section.questions, // This now contains the updated question data
  //       })),
        
  //     });
  //     console.log('Assessment saved:', response.data);
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Assessment added successfully!',
  //       timer: 2000,
  //       showConfirmButton: false,
  //     });
  //   } catch (error) {
  //     console.error('Error saving assessment:', error.response ? error.response.data : error.message);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error saving assessment!',
  //       text: error.response?.data?.message || error.message,
  //       timer: 3000,
  //       showConfirmButton: true,
  //     });
  //   }
  // };
  
  
  // Update handleSubmit to validate all questions
  const handleSubmit = async () => {
    // Validate all MCQ questions before submitting
    let allValid = true;
    let firstErrorMessage = '';
    
    for (const section of sections) {
      for (const question of section.questions) {
        if (question.type === "MCQ") {
          const validationKey = `${section.id}-${question.id}`;
          const validateFn = questionValidations[validationKey];
          
          if (validateFn && !validateFn()) {
            allValid = false;
            if (!firstErrorMessage) {
              firstErrorMessage = `Validation failed for Question ${question.id} in Section ${section.id}`;
            }
          }
        }
      }
    }
    
    if (!allValid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Errors',
        text: firstErrorMessage || 'Please fix all validation errors before submitting.',
        timer: 3000,
        showConfirmButton: true,
      });
      return;
    }
    
    try {
      const response = await axios.post(`${base_url}/assessment_data_save`, {
        assessment_title: assessmentDetails.assessment_title,
        assessment_code: assessmentDetails.assessment_code,
        assessment_description: assessmentDetails.assessment_description,
        assessment_timer: assessmentDetails.assessment_timer,
        sections: sections.map((section) => ({
          id: section.id,
          title: document.getElementById(`section-title-${section.id}`)?.value || '',
          subtitle: document.getElementById(`section-subtitle-${section.id}`)?.value || '',
          questions: section.questions, // This now contains the updated question data
        })),
      });
      console.log('Assessment saved:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Assessment added successfully!',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error saving assessment:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error saving assessment!',
        text: error.response?.data?.message || error.message,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <div className="header-section">
        <NavLink to={"/assessment"}>
          <span>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
        </NavLink>
      </div>

      <div className="container">
        <h4>Assessment Details</h4>
        <TextField
          name="assessment_title"
          label="Assessment Title"
          // value={assessmentDetails.title}
          onChange={handleAssessmentInputChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          name="assessment_code"
          label="Assessment Code"
          // value={assessmentDetails.code}
          onChange={handleAssessmentInputChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          name="assessment_description"
          label="Assessment Description"
          // value={assessmentDetails.description}
          onChange={handleAssessmentInputChange}
          multiline
          rows={3}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <TextField
          name="assessment_timer"
          label="Timer (in minutes)"
          // value={assessmentDetails.timer}
          onChange={handleAssessmentInputChange}
          type="number"
          style={{ width: "100%" }}
        />
      </div>
      {sections.map((section) => {
        return (
          <div key={section.id} className="section-module">
            <div className="section-title-div">
              <h4>Section {section.id}</h4>
              <Button
                className="delete_section"
                onClick={() => removeSection(section.id)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </div>
            <div className="section-contents-div">
              <TextField
                id={`section-title-${section.id}`}
                label="Section Title"
                multiline
                style={{ width: "100%", marginBottom: "1rem" }}
              />
              <TextField
                id={`section-subtitle-${section.id}`}
                label="Section Subtitle"
                multiline
                style={{ width: "100%", marginBottom: "1rem" }}
              />

              {section.questions.map((question) => {
                return (
                  <div key={question.id} className="class-container-div">
                    <div className="question-header">
                      <h5>Question No. {question.id}</h5>
                      <Button
                        className="delete_question"
                        onClick={() =>
                          removeQuestionFromSection(section.id, question.id)
                        }
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </Button>
                    </div>
                    <div style={{padding:"1rem 2rem"}}>
                     {renderQuestionComponent(question.type)}
                    </div>
                  </div>
                );
              })}

              <Button
                className="add-new-questions-btn"
                onClick={() => toggleQuestionOptionsVisibility(section.id)}
              >
                Add Question
              </Button>

                {questionOptionsVisibility[section.id] && (
                  <div className="all-type-questions-options">
                    <Button
                      className="question-type-btn"
                      onClick={() => addQuestionToSection(section.id, "MCQ")}
                    >
                      MCQ
                    </Button>
                    <Button
                      className="question-type-btn"
                      onClick={() => addQuestionToSection(section.id, "Text")}
                    >
                      Text
                    </Button>
                    <Button
                      className="question-type-btn"
                      onClick={() => addQuestionToSection(section.id, "Match The Following")}
                    >
                      Match the Following
                    </Button>
                    <Button
                      className="question-type-btn"
                      onClick={() => addQuestionToSection(section.id, "Duplicate")}
                    >
                      Duplicate
                    </Button>
                  </div>
                )}

            </div>
          </div>
        );
      })}
      <div className="add-new-section-div">
        <Button
          className="add-new-section-btn"
          onClick={addSection}
        >
          Add New Section
        </Button>
      </div>
      <div>
        <Button onClick={handleSubmit}>Create Assessment</Button>
      </div>

    </div>
  );
}

export default CreateAssessment;




{/* <style>
{`
.question-form {
 display: flex;
 flex-direction: column;
 gap: 16px;
 max-width: 100%;
 margin: 1rem auto;
 // padding: 2rem;
 // border: 2px solid rgba(0,0,0,0.2);
 border-radius: 8px;
 background-color: #ffffff;
}
.footer-controls{
 display: flex;
 justify-content: space-between;
 padding-top: 1rem;
 border-top: 1px solid rgba(0,0,0,0.1);
}
.options-list {
 display: flex;
 flex-direction: column;
 gap: 8px;
}
.option-item {
 display: flex;
 align-items: center;
 gap: 8px;
}
.upload-icon {
 margin-left: 8px;
 cursor: pointer;
 color: #007bff;
}
.desc-del-btn {
 background-color: transparent;
 color: red;
 box-shadow: none;
 width: fit-content;
 border-radius: 50%;
}
.desc-del-btn:hover {
 background-color: red;
 color: #ffffff;
}
.add-option-btn {
 background-color: #ffffff;
 color: #7A1CAC;
 border: 1px solid #7A1CAC;
 width: 18%;
 font-weight: 500;
}
.add-option-btn:hover {
 background-color: #7A1CAC;
 color: #ffffff;
}
.btn-div button {
 background-color: #7A1CAC;
}
.btn-div button:hover {
 background-color: #2E073F;
}
input {
 height: 2.5rem;
 padding-left: 10px;
}
.dropdowns {
 display: flex;
 gap: 16px;
 margin-top: 16px;
}  
.dropdowns select {
 border-color: rgba(0,0,0,0.5);
}
`}
       </style> */}





{/* <style>
{`
body {
  background-color: rgba(46, 7, 63, 0.2);
  padding: 1.5rem;
}
.header-section {
  height: 5rem;
  width: 100%;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 1.7rem 2rem;
}
.container {
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 10px;
  padding: 2rem 6rem;
  background: #ffffff;
  width: 70%;
  margin: 1.5rem auto;
}
.section-module {
  border-top: 5px solid #7A1CAC;
  width: 70%;
  margin: 1.5rem auto;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
  position: relative;
}
.section-module .section-title-div{
  padding: 10px 2rem;
  background-color: rgba(46, 7, 63, 0.1);
  display: flex;
  justify-content: space-between;
}
.section-module .section-contents-div{
  padding: 2rem 6rem;
}
.question-type-btn {
  width: 23%;
  height: 2rem;
  background-color: #7A1CAC;
  border: none;
}
.question-type-btn:hover{
  background-color: #2E073F;
}
.add-new-questions-btn,
.add-new-section-btn {
  width: 13rem;
  height: 2rem;
  background-color: #7A1CAC;
  border: none;
}
.add-new-questions-btn:hover,
.add-new-section-btn:hover {
  background-color: #2E073F;
}
.delete_section {
  background-color: #dc3545;
  width: 2rem;
  height: 2rem;
  border: none;
}
.delete_question{
  background-color: transparent;
  width: 2rem;
  height: 2rem;
  border: none;
}
.delete_section:hover,
.delete_question:hover{
  background-color: red;
}
.add-new-section-div{
  width: 70%;
  margin: auto;
}
.all-type-questions-options{
  border: 1px solid rgba(0,0,0,0.4);
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  margin-top: 1rem;
  border-radius: 10px;
}
.class-container-div{
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 10px;
  margin-bottom: 1rem;
}
.question-header{
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #2E073F;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.question-header h5{
  color: #fff;
}
`}
</style> */}

