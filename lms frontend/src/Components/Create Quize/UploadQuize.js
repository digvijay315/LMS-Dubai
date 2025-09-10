
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert, IconButton, Button, Switch, Select, MenuItem, Rating } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Form } from 'react-bootstrap';
import { base_url } from "../Utils/base_url";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

export const saveQuiz = async (quizData) => {
    try {
      const response = await axios.post(`${base_url}/quize_data_save`, quizData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

// Text Question Component
const TextQuestion = ({ question, sectionId, updateQuestion }) => {
    const [options, setOptions] = useState([{ text: '', correct: false }]);
    const [answerType, setAnswerType] = useState('short');

    const handleOptionChange = (idx, value) => {
      const newOptions = [...options];
      newOptions[idx].text = value;
      setOptions(newOptions);
      updateQuestion(sectionId, question.id, 'options', newOptions);
    };

    const addOption = () => {
      setOptions([...options, { text: '', correct: false }]);
    };

    const removeOption = (idx) => {
      const newOptions = options.filter((_, i) => i !== idx);
      setOptions(newOptions);
    };

    return (
        <div>
       <style>
{`
.question-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 100%;
  margin: 1rem auto;
  // padding: 2rem;
  // border-top: 5px solid #7A1CAC;
  // box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
  // border-radius: 1rem;
  // background-color: #ffffff;
  // position: relative;
}
.question-input, .subtitle-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
  .footer-controls{
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(0,0,0,0.1);
  }
  .controls{
  width: 30%;
  margin: 1rem 0px;
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
.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
  input{
  height: 2.5rem;
  padding-left: 10px;
  }
  .desc-del-btn{
    background-color: transparent;
    color: red;
    box-shadow: none;
    width: fit-content;
    border-radius: 50%;
    }
    .desc-del-btn:hover{
    background-color: red;
    color: #ffffff
    }
    .add-option-btn{
    background-color: #ffffff;
    color: #7A1CAC;
    border: 1px solid #7A1CAC;
    width: 22%;
    font-weight: 500;
    }
    .add-option-btn:hover{
    background-color: #7A1CAC;
    color: #ffffff;
    }
    .btn-div button{
    background-color: #7A1CAC;
    }
    .btn-div button:hover{
    background-color: #2E073F;
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
    </style>
      <div className="question-form">
        <div className="question-input">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
                fullWidth
                label="Question Text"
                value={question.questionText || ""}
                onChange={(e) => updateQuestion(sectionId, question.id, "questionText", e.target.value)}
                margin="normal"
            />
            <IconButton color="primary" component="label">
                <input hidden accept="image/*" type="file" />
                <AddPhotoAlternateIcon />
            </IconButton>
            </div>
            </div>

        <div className="options-list">
          {options.map((option, idx) => (
            <div key={idx} className="option-item">
              <TextField
                fullWidth
                type={answerType === 'short' ? 'text' : 'textarea'}
                style={{ width: '100%', height: answerType === 'short' ? 'auto' : '100px' }}
                disabled
                value={option.text}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                placeholder={`Answer option ${idx + 1}`}
              />
              <IconButton onClick={() => removeOption(idx)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <h5>Correct Answer:</h5>
          <button className="add-option-btn" onClick={addOption}>
           <AddIcon /> Add Answer
          </button>
        </div>

        <FormControl component="fieldset">
          <RadioGroup
            row
            value={answerType}
            onChange={(e) => {
              setAnswerType(e.target.value);
              updateQuestion(sectionId, question.id, "answerType", e.target.value);
            }}
          >
            <FormControlLabel checked={answerType === 'short'} onChange={() => setAnswerType('short')} value="short" control={<Radio />} label="Short Answer" />
            <FormControlLabel checked={answerType === 'long'} onChange={() => setAnswerType('long')} value="long" control={<Radio />} label="Long Answer" />
          </RadioGroup>
        </FormControl>
      </div>
      </div>
    );
};

 // Date Question Component
 const DateQuestion = ({ question, sectionId, updateQuestion }) => {
    return (
        <div>
 <style jsx>{`
    .date-question-form {
      max-width: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      border-radius: 10px;
    }
    .question-box {
      border: 1px solid #ddd;
      border-top: 5px solid #7A1CAC;
      padding: 1rem;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: relative;
      background-color: #ffffff;
    }
    .question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .question-input, .answer-input {
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .date-answer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    @media (max-width: 600px) {
      .date-question-form {
        padding: 0.5rem;
      }
    }
          `}</style>
      <div className="question-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField
            fullWidth
            label="Question Text"
            value={question.questionText || ""}
            onChange={(e) => updateQuestion(sectionId, question.id, "questionText", e.target.value)}
            margin="normal"
          />
          <IconButton color="primary" component="label">
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon />
          </IconButton>
        </div>
        
        <TextField
          type="date"
          fullWidth
          disabled
          style={{ marginTop: '20px' }}
        />
      </div>
      </div>
    );
  };

 // Statement (Likert) Question Component
//  const StatementQuestion = ({ question, sectionId, updateQuestion }) => {
//     const [options, setOptions] = useState(Array(5).fill('').map((_, i) => `Option ${i + 1}`));
//     const [statements, setStatements] = useState([{ label: 'Statement 1' }]);

//     const addOption = () => {
//       setOptions([...options, `Option ${options.length + 1}`]);
//     };

//     const deleteOption = (index) => {
//       const newOptions = options.filter((_, i) => i !== index);
//       setOptions(newOptions);
//     };

//     const addStatement = () => {
//       setStatements([...statements, { label: `Statement ${statements.length + 1}` }]);
//     };

//     const deleteStatement = (index) => {
//       const newStatements = statements.filter((_, i) => i !== index);
//       setStatements(newStatements);
//     };

//     return (
//         <div>
//                   <style>
//           {`
//           .main-container-div {
//               background-color: #ffffff;
//               border-radius: 10px;
//               // border-top: 5px solid #7A1CAC;
//               width: 100%;
//               // padding: 2rem;
//               height: fit-content;
//           }
//           .question-container {
//               border: 1px solid #ccc;
//               padding: 15px;
//               border-radius: 10px;
//               margin-bottom: 20px;
//               overflow-x: auto;
//               max-width: 100%;
//           }
//           .options-container, .statements-container {
//               display: flex;
//               gap: 10px;
//               padding: 10px 0;
//           }
//           .option-box, .statement-box {
//               display: flex;
//               flex-direction: column;
//               align-items: center;
//               min-width: 100px;
//           }
//           .statement-row {
//               display: flex;
//               justify-content: space-between;
//               align-items: center;
//               gap: 10px;
//               margin-top: 5px;
//           }
//           .add-statement-btn {
//               background-color: #7A1CAC;
//               color: #ffffff;
//               border: none;
//               margin-top: 10px;
//           }
//           .add-statement-btn:hover {
//               background-color: #2E073F;
//           }
//           `}
//                   </style>

//       <div className="question-content">
//         <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//           <TextField
//             fullWidth
//             label="Question Text"
//             value={question.questionText || ""}
//             onChange={(e) => updateQuestion(sectionId, question.id, "questionText", e.target.value)}
//             margin="normal"
//           />
//           <IconButton color="primary" component="label">
//             <input hidden accept="image/*" type="file" />
//             <AddPhotoAlternateIcon />
//           </IconButton>
//         </div>

//         <div className="options-container" style={{ marginTop: '20px' }}>
//           {options.map((option, index) => (
//             <div key={index} className="option-box">
//               <TextField
//                 value={option}
//                 onChange={(e) => {
//                   const newOptions = [...options];
//                   newOptions[index] = e.target.value;
//                   setOptions(newOptions);
//                 }}
//                 placeholder={`Option ${index + 1}`}
//               />
//               <IconButton onClick={() => deleteOption(index)} color="secondary">
//                 <DeleteIcon />
//               </IconButton>
//             </div>
//           ))}
//           <Button startIcon={<AddIcon />} onClick={addOption}>
//             Add Option
//           </Button>
//         </div>

//         <div className="statements-container" style={{ marginTop: '20px' }}>
//           {statements.map((statement, index) => (
//             <div key={index} className="statement-row">
//               <TextField
//                 value={statement.label}
//                 onChange={(e) => {
//                   const newStatements = [...statements];
//                   newStatements[index].label = e.target.value;
//                   setStatements(newStatements);
//                 }}
//                 placeholder={`Statement ${index + 1}`}
//               />
//               {options.map((_, optionIndex) => (
//                 <div key={optionIndex} style={{ display: 'flex', justifyContent: 'center' }}>
//                   <input
//                     type="radio"
//                     name={`statement-${index}`}
//                     style={{ width: '20px' }}
//                   />
//                 </div>
//               ))}
//               <IconButton onClick={() => deleteStatement(index)} color="secondary">
//                 <DeleteIcon />
//               </IconButton>
//             </div>
//           ))}
//           <Button startIcon={<AddIcon />} onClick={addStatement}>
//             Add Statement
//           </Button>
//         </div>
//       </div>
//       </div>
//     );
//   };

const StatementQuestion = ({ question, sectionId, updateQuestion }) => {
  const [options, setOptions] = useState(
    question.options?.length > 0 
      ? question.options.map(opt => opt.text) 
      : Array(5).fill('').map((_, i) => `Option ${i + 1}`)
  );
  
  const [statements, setStatements] = useState(
    question.statements?.length > 0 
      ? question.statements 
      : [{ label: 'Statement 1' }]
  );

  // Update parent component whenever options or statements change
  useEffect(() => {
      const formattedOptions = options.map(text => ({
          text,
          correct: false // Likert questions don't have correct answers
      }));
      
      updateQuestion(sectionId, question.id, "options", formattedOptions);
  }, [options, sectionId, question.id]);

  useEffect(() => {
      updateQuestion(sectionId, question.id, "statements", statements);
  }, [statements, sectionId, question.id]);

  const addOption = () => {
      const newOptions = [...options, `Option ${options.length + 1}`];
      setOptions(newOptions);
  };

  const deleteOption = (index) => {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
  };

  const addStatement = () => {
      const newStatements = [...statements, { label: `Statement ${statements.length + 1}` }];
      setStatements(newStatements);
  };

  const deleteStatement = (index) => {
      const newStatements = statements.filter((_, i) => i !== index);
      setStatements(newStatements);
  };

  const updateOptionText = (index, value) => {
      const newOptions = [...options];
      newOptions[index] = value;
      setOptions(newOptions);
  };

  const updateStatementText = (index, value) => {
      const newStatements = [...statements];
      newStatements[index].label = value;
      setStatements(newStatements);
  };

  return (
      <div>
          {/* <style>
              {`
              .main-container-div {
                  background-color: #ffffff;
                  border-radius: 10px;
                  width: 100%;
                  height: fit-content;
              }
              .question-container {
                  border: 1px solid #ccc;
                  padding: 15px;
                  border-radius: 10px;
                  margin-bottom: 20px;
                  overflow-x: auto;
                  max-width: 100%;
              }
              .options-container {
                  display: flex;
                  gap: 10px;
                  padding: 10px 0;
              }
              .statements-container {
                  gap: 10px;
                  padding: 10px 0;
              }
              .option-box, .statement-box {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  min-width: 100px;
              }
              .statement-row {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  gap: 10px;
                  margin-top: 5px;
              }
              .add-statement-btn {
                  background-color: #7A1CAC;
                  color: #ffffff;
                  border: none;
                  margin-top: 10px;
              }
              .add-statement-btn:hover {
                  background-color: #2E073F;
              }
              `}
          </style> */}

        <style>
            {`
            .main-container-div {
                background-color: #ffffff;
                border-radius: 10px;
                width: 100%;
                height: fit-content;
                padding: 20px;
            }
            .question-container {
                padding: 15px;
                max-width: 100%;
            }
            .options-container {
                display: grid;
                grid-template-columns: 100px repeat(5, 1fr);
                gap: 10px;
                margin: 30px 0 15px 0;
                margin-left: 220px;
            }
            .statements-container {
                margin-top: 10px;
            }
            .statement-row {
                display: grid;
                grid-template-columns: 180px repeat(5, 1fr);
                gap: 4px;
                align-items: center;
                margin-bottom: 15px;
            }
            .option-title {
                text-align: center;
                color: #666;
                font-size: 14px;
            }
            .statement-text {
                color: #555;
                font-size: 14px;
            }
            .radio-container {
                display: flex;
                justify-content: center;
            }
            input[type="radio"] {
                width: 16px;
                height: 16px;
            }
            `}
        </style>

          <div className="question-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TextField
                      fullWidth
                      label="Question Text"
                      value={question.questionText || ""}
                      onChange={(e) => updateQuestion(sectionId, question.id, "questionText", e.target.value)}
                      margin="normal"
                  />
                  <IconButton color="primary" component="label">
                      <input hidden accept="image/*" type="file" />
                      <AddPhotoAlternateIcon />
                  </IconButton>
              </div>

              <div className="options-container" >
                  {options.map((option, index) => (
                      <div key={index} className="option-box">
                          <TextField
                              value={option}
                              onChange={(e) => updateOptionText(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                          />
                          <IconButton onClick={() => deleteOption(index)} color="secondary">
                              <DeleteIcon />
                          </IconButton>
                      </div>
                  ))}
                  <Button startIcon={<AddIcon />} onClick={addOption}>
                      Option
                  </Button>
              </div>

              <div className="statements-container" style={{ marginTop: '20px' }}>
                  {statements.map((statement, index) => (
                      <div key={index} className="statement-row">
                          <TextField
                              value={statement.label}
                              onChange={(e) => updateStatementText(index, e.target.value)}
                              placeholder={`Statement ${index + 1}`}
                          />
                          {options.map((_, optionIndex) => (
                              <div key={optionIndex} style={{ display: 'flex', justifyContent: 'center' }}>
                                  <input
                                      type="radio"
                                      name={`statement-${index}`}
                                      style={{ width: '20px' }}
                                  />
                              </div>
                          ))}
                          <IconButton onClick={() => deleteStatement(index)} color="secondary">
                              <DeleteIcon />
                          </IconButton>
                      </div>
                  ))}
                  <Button startIcon={<AddIcon />} onClick={addStatement}>
                      Add Statement
                  </Button>
              </div>
          </div>
      </div>
  );
};

// Rating Question Component
const RatingQuestion = ({ question, sectionId, updateQuestion }) => {
    const getIcon = (symbol) => {
      switch (symbol) {
        case 'Star': return <i className="fa-regular fa-star"></i>;
        case 'Heart': return <i className="fa-regular fa-heart"></i>;
        case 'ThumbUp': return <i className="fa-regular fa-thumbs-up"></i>;
        default: return <i className="fa-regular fa-star"></i>;
      }
    };

    return (
        <div>
<style>
{`
  .main-container-section {
    background-color: #ffffff;
    border-radius: 10px;
    // border-top: 5px solid #7A1CAC;
    // box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
    width: 100%;
    // padding: 2rem;
  }
  .css-dqr9h-MuiRating-label {
    margin: 0 5px;
    font-size: 20px;
  }
`}
</style> 
      <div className="question-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TextField
            fullWidth
            label="Question Text"
            value={question.questionText || ""}
            onChange={(e) => updateQuestion(sectionId, question.id, "questionText", e.target.value)}
            margin="normal"
          />
          <IconButton color="primary" component="label">
            <input hidden accept="image/*" type="file" />
            <AddPhotoAlternateIcon />
          </IconButton>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
          <Rating
            value={question.ratingValue || 0}
            onChange={(e, newValue) => updateQuestion(sectionId, question.id, "ratingValue", newValue)}
            max={question.levels || 5}
            icon={getIcon(question.symbol || 'Star')}
            emptyIcon={getIcon(question.symbol || 'Star')}
          />
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <TextField
              label="Levels"
              type="number"
              value={question.levels || 5}
              onChange={(e) => updateQuestion(sectionId, question.id, "levels", e.target.value)}
              inputProps={{ min: 1 }}
              style={{ width: '80px' }}
            />
            <Select
              value={question.symbol || 'Star'}
              onChange={(e) => updateQuestion(sectionId, question.id, "symbol", e.target.value)}
            >
              <MenuItem value="Star">Star</MenuItem>
              <MenuItem value="Heart">Heart</MenuItem>
              <MenuItem value="ThumbUp">Thumb Up</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      </div>
    );
  };


const CreateQuize = () => {

    const navigate = useNavigate();
        const AllQuize = () => {
            navigate('/previewQuize');
        }

  const [sections, setSections] = useState([{ 
    id: 1, 
    title: "", 
    subtitle: "", 
    questions: [] 
  }]);
  const [currentSectionId, setCurrentSectionId] = useState(null);

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: sections.length + 1,
        title: "",
        subtitle: "",
        questions: []
      }
    ]);
  };

const removeSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const addQuestion = (type, sectionId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: [
            ...section.questions,
            {
              id: section.questions.length + 1,
              type,
              questionText: "",
              required: false
            }
          ]
        };
      }
      return section;
    }));
    setCurrentSectionId(null);
  };

  const removeQuestion = (sectionId, questionId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.filter(q => q.id !== questionId)
        };
      }
      return section;
    }));
  };

  const updateQuestion = (sectionId, questionId, field, value) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          questions: section.questions.map(question => {
            if (question.id === questionId) {
              return { ...question, [field]: value };
            }
            return question;
          })
        };
      }
      return section;
    }));
  };

  // const updateQuestion = (sectionId, questionId, field, value) => {
  //   setQuiz(prevQuiz => {
  //       const newQuiz = {...prevQuiz};
  //       const section = newQuiz.sections.find(s => s.id === sectionId);
  //       const question = section.questions.find(q => q.id === questionId);
  //       question[field] = value;
  //       return newQuiz;
  //   });
  // };

  // Get the total questions count before a specific section
  const getQuestionNumberStart = (currentSectionId) => {
    let totalQuestions = 0;
    for (const section of sections) {
      if (section.id < currentSectionId) {
        totalQuestions += section.questions.length;
      }
    }
    return totalQuestions;
  };

   const renderQuestionComponent = (question, sectionId) => {
    const props = {
      question,
      sectionId,
      updateQuestion
    };

    switch (question.type) {
        case "Text":
          return <TextQuestion {...props} />;
        case "Rating":
          return <RatingQuestion {...props} />;
        case "Date":
          return <DateQuestion {...props} />;
        case "Likert":
          return <StatementQuestion {...props} />;
        default:
          return null;
      }
    };


    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
  
    const formatQuizData = () => {
      // Format sections data
      const formattedSections = sections.map(section => {
        // Format questions within each section
        const formattedQuestions = section.questions.map(question => {
          const baseQuestion = {
            id: question.id,
            type: question.type,
            questionText: question.questionText,
            required: question.required || false
          };
  
          // Add type-specific properties
          switch (question.type) {
            case 'Text':
              return {
                ...baseQuestion,
                answerType: question.answerType || 'short',
                options: question.options || []
              };
            case 'Rating':
              return {
                ...baseQuestion,
                levels: question.levels || 5,
                symbol: question.symbol || 'Star'
              };
            case 'Date':
              return baseQuestion;
            case 'Likert':
              return {
                ...baseQuestion,
                statements: question.statements || [],
                options: question.options || []
              };
            default:
              return baseQuestion;
          }
        });
  
        return {
          id: section.id,
          title: section.title,
          subtitle: section.subtitle,
          questions: formattedQuestions
        };
      });
  
      return {
        title,
        description: subtitle, // Using subtitle as description
        sections: formattedSections
      };
    };
  
    const handleSubmit = async () => {
      try {
        setIsSubmitting(true);
        setError(null);
  
        // Validate required fields
        if (!title.trim()) {
          throw new Error('Quiz title is required');
        }
  
        if (sections.length === 0) {
          throw new Error('At least one section is required');
        }
  
        // Check if sections have questions
        const hasQuestions = sections.some(section => section.questions.length > 0);
        if (!hasQuestions) {
          throw new Error('At least one question is required');
        }
  
        const quizData = formatQuizData();
        const response = await saveQuiz(quizData);
        
        // Show success message
        // toast.success('Quiz saved successfully!', );
        Swal.fire("Success", "Quize created successfully!", "success");

        setTitle(''); // Reset the title
        setSubtitle('')
        setSections([]); // Reset the sections
        
      } catch (err) {
        setError(err.message);
        toast.error(err.message, {autoClose: 2000});
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div>
         <style>
{`
  body {
    background-color: rgba(46, 7, 63, 0.1);
    padding: 1.5rem;
  }
  .header-section {
    width: 100%;
    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.7rem 2rem;
  }
    .quiz-details{
     border-top: 5px solid #7A1CAC;
     width: 80%;
     margin: 0 auto;
     margin-top: 1.5rem;
     border-radius: 10px;
     background-color: #ffffff;
     padding: 3rem 6rem;
     box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
     }
  .header-section span i {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .container {
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1.5rem;
  }
  .question-types-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 1rem;
    row-gap: 1rem;
  }
  .question-types-grid button {
    width: 100%;
    height: 2.5rem;
    background-color: #ffffff;
    color: #7A1CAC;
    border: 1px solid #7A1CAC;
    font-weight: 500;
  }
  .question-types-grid button:hover {
    background-color: #7A1CAC;
    color: #ffffff;
  }
  .section-wrapper {
    // border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fff;
    width: 80%;
    margin: 1.5rem auto;
    border-top: 5px solid #7A1CAC;
  }
  .add-question-button, .add-section-button {
    background-color: #7A1CAC;
    color: #ffffff;
    border: none;
  }
  .add-question-button:hover,
  .add-section-button:hover {
    background-color: #2E073F;
  }
    .header .input{
    width: 100%;
    }
    .section-header{
    padding: 10px 2rem;
    background-color: rgba(46, 7, 63, 0.1);
    display: flex;
    justify-content: space-between;
    }
    .section-contents-div{
    padding: 2rem 6rem;
    }
    .quick-start{
    border: 1px solid rgba(0,0,0,0.3);
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 10px;
    }
    .question-wrapper{
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 10px;
    margin: 1rem 0;
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
     .add-new-section-div, .add-section{
    width: 80%;
    margin: 1rem auto;
    }
`}
        </style>
        <div className="create-quiz-container">
            <div className="header-section">
            <NavLink to="/assessment">
                <i className="fa-solid fa-arrow-left"></i>
            </NavLink>

            <button 
      style = {{
        padding:"5px 1.2rem", 
        backgroundColor:"#2E073F", 
        borderRadius:"1rem"
        }}
        onClick={AllQuize}
        > 
        All created survey  <i class="fa-solid fa-arrow-right-long"></i> 
        </button>
            </div>

        <div className="quiz-details">
        <h4>Create Survey</h4>    
          <TextField
            fullWidth
            label="Enter survey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            error={error && !title.trim()}
            helperText={error && !title.trim() ? "Title is required" : ""}
          />
          <TextField
            fullWidth
            label="Enter subtitle (optional)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            margin="normal"
          />    
        </div>

        <div className="sections-container">
        {sections.map((section) => (
            <div key={section.id} className="section-wrapper">
            <div className="section-header">
                <h5>Section {section.id}</h5>
                <button
                onClick={() => removeSection(section.id)}
                className="remove-button"
                >
                <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>

            <div className="section-contents-div">
                <TextField
                fullWidth
                label="Section title"
                value={section.title}
                onChange={(e) => {
                    setSections(sections.map(s => 
                    s.id === section.id ? { ...s, title: e.target.value } : s
                    ));
                }}
                margin="normal"
                />
                <TextField
                fullWidth
                label="Section subtitle"
                value={section.subtitle}
                onChange={(e) => {
                    setSections(sections.map(s => 
                    s.id === section.id ? { ...s, subtitle: e.target.value } : s
                    ));
                }}
                margin="normal"
                />

                {section.questions.map((question, index) => {
                const questionNumber = getQuestionNumberStart(section.id) + index + 1;
                return (
                    <div key={question.id} className="question-wrapper">
                    <div className="question-header">
                        <h5>Question {questionNumber}</h5>
                        <button
                        onClick={() => removeQuestion(section.id, question.id)}
                        className="remove-button"
                        >
                        <i className="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                    <div style={{padding:"0 2rem"}}>{renderQuestionComponent(question, section.id)}</div>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={question.required || false}
                          onChange={(e) => updateQuestion(section.id, question.id, "required", e.target.checked)}
                        />
                      }
                      label="Required"
                    />
                    </div>
                );
                })}

                <button
                className="add-question-button"
                onClick={() => setCurrentSectionId(section.id)}
                >
                Add New Question
                </button>

                {currentSectionId === section.id && (
                    <div className="quick-start">
                        <div className="question-types-grid">
                            <button onClick={() => addQuestion("Text", section.id)}>Text</button>
                            <button onClick={() => addQuestion("Rating", section.id)}>Rating</button>
                            <button onClick={() => addQuestion("Date", section.id)}>Date</button>
                            <button onClick={() => addQuestion("Likert", section.id)}>Likert</button>
                        </div>
                    </div>
                )}
            </div>
            </div>
        ))}
        </div>
        
        <div className="add-section">
        <button onClick={addSection} className="add-section-button">
            Add New Section
        </button>
        </div>
        </div>

        <div className="submit-section" style={{  paddingBottom: '20px', width: "80%", margin:"1rem auto" }}>
          {error && (
            <Alert severity="error" style={{ marginBottom: '10px' }}>
              {error}
            </Alert>
          )}
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            fullWidth
            style={{backgroundColor:"#2E073F"}}
          >
            {isSubmitting ? 'Saving...' : 'Save Survey'}
          </Button>
        </div>
        {/* <div>
            <button onClick={handleSubmit}>Create Quize</button>
        </div> */}

        <ToastContainer/>
  </div>
  );
};

export default CreateQuize;
