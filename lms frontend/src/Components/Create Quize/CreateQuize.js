// import React, { useState } from "react";
// import TextQuize from "./TextQuize";
// import RatingQuestionQuize from "./RatingQuestionQuize";
// import DateQuestionForm from "./DateQuestionForm";
// import StatementQuestion from "./StatementQuestion";
// import { NavLink } from "react-router-dom";

// function CreateQuize() {
//   const [questions, setQuestions] = useState([]); // Array to hold questions
//   const [showQuickStart, setShowQuickStart] = useState(false); // Toggle for quick start buttons

//   const addQuestion = (type) => {
//     setQuestions([...questions, { type, id: questions.length + 1 }]);
//     setShowQuickStart(false); // Hide quick start after selecting a question type
//   };

//   const handleAddNew = () => {
//     setShowQuickStart(true); // Show quick start buttons when "Add New Question" is clicked
//   };

//   const deleteQuestion = (id) => {
//     setQuestions(questions.filter((question) => question.id !== id));
//   };

//   const renderQuestionComponent = (question) => {
//     switch (question.type) {
//       case "Text":
//         return <TextQuize />;
//       case "Rating":
//         return <RatingQuestionQuize />;
//       case "Date":
//         return <DateQuestionForm />;
//       case "Likert":
//         return <StatementQuestion />;
//       case "UploadFile":
//         return (
//           <div>
//             <h4>Upload file here...</h4>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//        <style>
//             {
//             `
//             body{
//             background-color: rgba(46, 7, 63, 0.2);
//             padding: 1.5rem;
//             }
//             .header-section{
//             // height: 5rem;
//             width: 100%;
//             border-radius: 10px;
//             background-color: #ffffff;
//             padding: 1.7rem 2rem;
//             }
//             .header-section span i{
//             font-size: 1.5rem;
//             cursor: pointer;
//             }
//             .container{
//             border: 2px solid rgba(0,0,0,0.2);
//             border-radius: 10px;
//             padding: 1.5rem;
//             }
//             .button-grid{
//             display: grid;
//             grid-template-columns: auto auto auto;
//             column-gap: 1rem;
//             row-gap: 1rem;
//             }
//             .button-grid button {
//             width: 100%;
//             height: 2.5rem;
//             background-color: #ffffff;
//             color: #7A1CAC;
//             border: 1px solid #7A1CAC;
//             font-weight: 500;
//             }
//             .button-grid button:hover{
//             background-color: #7A1CAC;
//             color: #ffffff;
//             }
//             .header input{
//             margin-bottom: 1rem;
//             }
//             .header{
//             margin-top: 0px;
//             }
//             .section-module{
//             border-top: 5px solid #7A1CAC;
//             width: 70%;
//             margin: 0 auto;
//             margin-top: 1.5rem;
//             border-radius: 10px;
//             background-color: #ffffff;
//             padding: 3rem 6rem;
//             box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
//             }
//             .container{
//             margin: 0px;
//             width: 100%;
//             }
//             .questions-container{
//             width: 70%;
//             margin: 0 auto;
//             margin-top: 1.5rem;
//             }
//             .quick-start{
//             background-color: #fff;
//             padding: 2rem;
//             border-radius: 10px;
//             box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
//             margin-bottom: 1rem;
//             }
//             .question-item{
//             max-width: 100%;
//             margin: 1rem auto;
//             padding: 2rem;
//             border-top: 5px solid #7A1CAC;
//             box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
//             border-radius: 1rem;
//             background-color: #ffffff;
//           }
//             .add-new-button{
//             background-color: #7A1CAC;
//           color: #ffffff;
//           border: none;
//           }
//           .add-new-button:hover{
//           background-color: #2E073F;
//         }
//             `
//             }
//         </style>

//       <div className="header-section">
//         <NavLink to={'/assessment'}>
//             <span>
//                 <i class="fa-solid fa-arrow-left"></i>
//             </span>
//         </NavLink>
//       </div>

//       <div className="section-module">
//         <h4>Create Survey</h4>
//         <div className="container">
//           <div className="header info-div-item">
//             <input type="text" placeholder="Enter quiz name" />
//             <input type="text" placeholder="Enter the subtitle ( Subtitle )" />
//           </div>
//         </div>
//       </div>

//       <div className="questions-container">
//         {questions.map((question, index) => (
//           <div key={question.id} className="question-item">
//             <h5 className="question-number">Question {index + 1}</h5>
//             {renderQuestionComponent(question)}
//             <button
//               className="delete-button"
//               onClick={() => deleteQuestion(question.id)}
//             >
//               Delete Question
//             </button>
//           </div>
//         ))}

//         {showQuickStart && (
//           <div className="quick-start">
//             {/* <h6 style={{ color: "#7A1CAC", cursor: "pointer" }}>
//               <i className="fa-solid fa-circle-plus"></i> Quick start with
//             </h6> */}
//             <div className="button-grid">
//               <button onClick={() => addQuestion("Text")}>
//                 <i className="fa-regular fa-file-lines"></i> Text
//               </button>
//               <button onClick={() => addQuestion("Rating")}>
//                 <i className="fa-regular fa-thumbs-up"></i> Rating
//               </button>
//               <button onClick={() => addQuestion("Date")}>
//                 <i className="fa-regular fa-calendar-days"></i> Date
//               </button>
//               <button onClick={() => addQuestion("Likert")}>
//                 <i className="fa-solid fa-ticket"></i> Likert
//               </button>
//               <button onClick={() => addQuestion("UploadFile")}>
//                 <i className="fa-solid fa-file-arrow-up"></i> Upload File
//               </button>
//               <button>
//                 <i class="fa-solid fa-layer-group" /> Section
//               </button>
//             </div>
//           </div>
//         )}

//         {!showQuickStart && (
//           <button className="add-new-button" onClick={handleAddNew}>
//             Add New Question
//           </button>
//         )}
//       </div>

//       <div className="another-section-div">


//       </div>
//     </div>
//   );
// }

// export default CreateQuize;


import React, { useState } from "react";
import TextQuize from "./TextQuize";
import RatingQuestionQuize from "./RatingQuestionQuize";
import DateQuestionForm from "./DateQuestionForm";
import StatementQuestion from "./StatementQuestion";
import { NavLink } from "react-router-dom";
import TextField from "@mui/material/TextField";

function CreateQuize() {
  const [sections, setSections] = useState([{ id: 1, questions: [] }]);
  const [questions, setQuestions] = useState([]); // Array to hold questions
  // const [sections, setSections] = useState([]); // Array to hold sections
  const [currentSectionId, setCurrentSectionId] = useState(null); // Tracks current section for "Add New Question"

  const addQuestion = (type, sectionId) => {
    const newQuestion = {
      type,
      id: questions.length + 1, // Assign unique serial number globally
      sectionId,
    };
    setQuestions([...questions, newQuestion]);
    setCurrentSectionId(null); // Hide quick start after selecting a question type
  };

  const handleAddNew = (sectionId) => {
    setCurrentSectionId(sectionId); // Show quick start in the correct section
  };

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      questions: [],
    };
    setSections([...sections, newSection]);
  };

  const handleSectionChange = (id, field, value) => {
    const updatedSections = sections.map((section) =>
      section.id === id ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  // Function to remove a question
  const removeQuestion = (questionId) => {
    setQuestions(questions.filter((question) => question.id !== questionId));
  };

  // Function to remove a section
  const removeSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
    // Remove all questions associated with this section
    setQuestions(questions.filter((question) => question.sectionId !== sectionId));

    // Update section titles after removal to ensure they are sequential
    setSections((prevSections) =>
      prevSections.map((section, index) => ({
        ...section,
        id: index + 1, // Update section ID to reflect correct order
      }))
    );
  };

  const renderQuestionComponent = (question) => {
    switch (question.type) {
      case "Text":
        return <TextQuize />;
      case "Rating":
        return <RatingQuestionQuize />;
      case "Date":
        return <DateQuestionForm />;
      case "Likert":
        return <StatementQuestion />;
      case "UploadFile":
        return (
          <div>
            <h4>Upload file here...</h4>
          </div>
        );
      default:
        return null;
    }
  };

  const getQuestionSerialNumber = (sectionId, questionIndex) => {
    // Count questions in previous sections to calculate global serial number
    const questionsBeforeThisSection = questions.filter(
      (question) => question.sectionId < sectionId
    ).length;

    return questionsBeforeThisSection + questionIndex + 1;
  };

  return (
    <div>
      {/* Styles */}
      <style>
{`
  body {
    background-color: rgba(46, 7, 63, 0.2);
    padding: 1.5rem;
  }
  .header-section {
    width: 100%;
    border-radius: 10px;
    background-color: #ffffff;
    padding: 1.7rem 2rem;
  }
    .section-module{
     border-top: 5px solid #7A1CAC;
     width: 80%;
     margin: 0 auto;
     margin-top: 1.5rem;
     border-radius: 10px;
     background-color: #ffffff;
     padding: 3rem 6rem;
     box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
     border: 2px solid #000;
     }
  .header-section span i {
    font-size: 1.5rem;
    cursor: pointer;
  }
  .container {
    // border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1.5rem;
  }
  .button-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    column-gap: 1rem;
    row-gap: 1rem;
  }
  .button-grid button {
    width: 100%;
    height: 2.5rem;
    background-color: #ffffff;
    color: #7A1CAC;
    border: 1px solid #7A1CAC;
    font-weight: 500;
  }
  .button-grid button:hover {
    background-color: #7A1CAC;
    color: #ffffff;
  }
  .section {
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fff;
    width: 70%;
    margin: 1.5rem auto;
    border-top: 5px solid #7A1CAC;
  }
  .add-new-button {
    background-color: #7A1CAC;
    color: #ffffff;
    border: none;
  }
  .add-new-button:hover {
    background-color: #2E073F;
  }
    .header .input{
    width: 100%;
    }
    .section-title-div{
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
    .question-item{
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
     .add-new-section-div{
    width: 70%;
    margin: 1rem auto;
    }
`}
</style>

      {/* Header Section */}
      <div className="header-section">
        <NavLink to={"/assessment"}>
          <span>
            <i className="fa-solid fa-arrow-left"></i>
          </span>
        </NavLink>
      </div>

      {/* Quiz Details Section */}
      <div className="section-module">
        <h4>Create Survey</h4>
        <div className="container">
          <div className="header">
            <TextField className="input" name="quiz_name" label="Enter quize title" maxRows={10} style={{ width: "100%", marginBottom: "1rem" }} />
            <TextField className="input" name="subtitle" label="Enter subtitle (optional)" />
          </div>
        </div>
      </div>

      {/* Sections and Questions */}
      <div className="questions-container">
        {sections.map((section) => (
          <div key={section.id} className="section">
            <div className="section-title-div">
              <h5>Section {section.id}</h5>
              {/* Remove Section Button */}
              <button
                onClick={() => removeSection(section.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <div className="section-contents-div">
            <TextField
              name="section_title"
              label="Section title"
              multiline
              maxRows={10}
              value={section.title}
              style={{ width: "100%", marginBottom: "1rem" }}
              onChange={(e) =>
                handleSectionChange(section.id, "title", e.target.value)
              }
            />
            <TextField
              name="subtitle"
              label="Enter subtitle"
              value={section.subtitle}
              style={{ width: "100%", marginBottom: "1rem" }}
              onChange={(e) =>
                handleSectionChange(section.id, "subtitle", e.target.value)
              }
            />

            {questions
              .filter((question) => question.sectionId === section.id)
              .map((question, index) => (
                <div key={question.id} className="question-item">
                  <div className="question-header">
                    <h5>Question {getQuestionSerialNumber(section.id, index)}</h5>

                    {/* Remove Question Button */}
                    <button
                      onClick={() => removeQuestion(question.id)}
                      style={{
                        backgroundColor: "transparent",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <div style={{padding:"1rem 2rem"}}> {renderQuestionComponent(question)} </div>
                                   
                </div>
              ))}

            <button
              className="add-new-button"
              onClick={() => handleAddNew(section.id)}
            >
              Add New Question
            </button>

            {currentSectionId === section.id && (
              <div className="quick-start">
                <div className="button-grid">
                  <button onClick={() => addQuestion("Text", section.id)}>
                    Text
                  </button>
                  <button onClick={() => addQuestion("Rating", section.id)}>
                    Rating
                  </button>
                  <button onClick={() => addQuestion("Date", section.id)}>
                    Date
                  </button>
                  <button onClick={() => addQuestion("Likert", section.id)}>
                    Likert
                  </button>
                  <button onClick={() => addQuestion("UploadFile", section.id)}>
                    Upload File
                  </button>
                </div>
              </div>
            )}
            </div>      
          </div>
        ))}
        <div className="add-new-section-div">
          <button className="add-new-button" onClick={addSection}>
            Add New Section
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuize;


