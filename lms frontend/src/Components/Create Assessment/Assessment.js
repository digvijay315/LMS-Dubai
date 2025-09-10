// // import React, { useState } from 'react';
// // import Sidebar from './Sidebar';
// // import Header from './Header';
// // import Button from 'react-bootstrap/Button';
// // import Modal from 'react-bootstrap/Modal';
// // import QuestionForm from './QuestionForm';
// // import QuestionFormTwo from './QuestionTextForm';
// // import { toast } from 'react-toastify';
// // import MatchTheFollowingForm from './MatchTheFollowingForm';
// // import axios from 'axios';
// // import { NavLink } from 'react-router-dom';

// // function Assessment() {
// //     const [show, setShow] = useState(false);
// //     const [questionText, setQuestionText] = useState('');
// //     const [options, setOptions] = useState([]);
// //     const [correctAnswer, setCorrectAnswer] = useState('');
// //     const [selectedQuestionType, setSelectedQuestionType] = useState('');

// //     const handleClose = () => setShow(false);
// //     const handleShow = () => setShow(true);

// //     function chooseQuestionType() {
// //         const quesType = document.getElementById('question-options').value;
// //         setSelectedQuestionType(quesType);
// //         if (quesType === 'select-type') {
// //             toast.error("Please select the correct option");
// //         }
// //     }

// //     function quickStart() {
// //         document.getElementById('button-grid-id').style.display = "grid";
// //     }

// //     // const submitAssessment = async () => {
// //     //     const title = document.querySelector('input[placeholder="Enter title"]').value;
// //     //     const code = document.querySelector('input[placeholder="Enter Code"]').value;
// //     //     const description = document.querySelector('textarea[placeholder="Enter description here..."]').value;

// //     //     const questions = []; // Collect questions based on their types

// //     //     if (selectedQuestionType === 'select-mcqs') {
// //     //         const mcqData = {
// //     //             questionText: questionText,
// //     //             options: options,
// //     //             correctAnswer: correctAnswer
// //     //         };
// //     //         questions.push({ type: 'mcq', questionData: mcqData });
// //     //     }

// //     //     try {
// //     //         const response = await axios.post('/api/assessments/create', {
// //     //             title,
// //     //             code,
// //     //             description,
// //     //             questions
// //     //         });

// //     //         if (response.status === 201) {
// //     //             toast.success("Assessment created successfully");
// //     //             handleClose();
// //     //         }
// //     //     } catch (error) {
// //     //         toast.error("Error creating assessment");
// //     //         console.error("Error: ", error);
// //     //     }
// //     // };

// //     return (
// //         <div>
// //             <style>
// //             {`
// //             .assessment-related{
// //             width: 100%;
// //             padding: 2rem;
// //             border-radius: 10px;
// //             background-color: #ffffff;
// //             display: flex;
// //             }
// //             .assessment-related div{
// //              height: 2.5rem;
// //             width: 13rem;
// //             background-color: #7A1CAC;
// //             color: #ffffff;
// //             margin-right: 1rem;
// //             display: flex;
// //             justify-content: center;
// //             align-items: center;
// //             transition: all 0.3s ease;
// //             box-shadow: 3px 3px 8px rgba(0, 0, 0, 1);
// //             border-radius: 1.5rem;
// //             cursor: pointer;
// //             }
// //             .assessment-related div:nth-child(3) {
// //             background-color: #ffffff;
// //             color: #7A1CAC;
// //             font-weight: 600;
// //             }
// //             .assessment-related div h6{
// //             margin: 0px;
// //             }
// //             .assessment-form-items{
// //             width: 85%;
// //             margin: 0 auto;
// //             padding: 1rem 0;
// //             }
// //             .info-div-item{
// //             margin: 1rem 0;
// //             }
// //             .title-text{
// //             background-color: #2E073F;
// //             color: #ffffff;
// //             height: 8rem;
// //             padding: 2rem;
// //             border-top-right-radius: 1rem;
// //             border-top-left-radius: 1rem;
// //             }
// //             textarea{
// //             width: 100%;
// //             height: 6rem;
// //             padding: 10px;
// //             }
// //             .container{
// //             width: 85%;
// //             margin: 0 auto;
// //             margin-bottom: 2rem;
// //             border: 2px solid rgba(0,0,0,0.2);
// //             border-radius: 10px;
// //             padding: 1.5rem;
// //             }
// //             .button-grid{
// //             display: grid;
// //             grid-template-columns: auto auto auto;
// //             column-gap: 1rem;
// //             row-gap: 1rem;
// //             }
// //             .button-grid button {
// //             width: 100%;
// //             height: 2.5rem;
// //             background-color: #ffffff;
// //             color: #7A1CAC;
// //             border: 1px solid #7A1CAC;
// //             font-weight: 500;
// //             }
// //             .button-grid button:hover{
// //             background-color: #7A1CAC;
// //             color: #ffffff;
// //             }
// //             .header input{
// //             margin-bottom: 1rem;
// //             }
// //             .header{
// //             margin-top: 0px;
// //             }
// //             .add-question-div{
// //             width: 85%;
// //             margin: 0 auto;
// //             border: 2px solid rgba(0,0,0,0.2);
// //             padding: 1.5rem;
// //             border-radius: 10px;
// //             margin-bottom: 2rem;
// //             }
// //             .questions-container{
// //             display: none;
// //             width: 85%;
// //             margin: 0 auto;
// //             }
// //             .section-module{
// //             margin-top: 1.5rem;
// //             border-radius: 10px;
// //             background-color: #ffffff;
// //             padding: 3rem 6rem;
// //             }
// //             .container{
// //             margin: 0px;
// //             width: 100%;
// //             }
// //             .button-grid{
// //             display: none;
// //             }
// //             `}
// //         </style>
        
// //         <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh" }}>
// //             <Sidebar />
// //             <section className="main-content-section">
// //                 <Header />

// //                 <div className="header-div header-two">
// //                     <div className="title-name">
// //                         <h5>Assessment</h5>
// //                         <p>
// //                         <a
// //                             onClick={() => window.location.reload()}
// //                             style={{ cursor: "pointer", color: "#099ded" }}
// //                         >
// //                             Home
// //                         </a>{" "}
// //                         <i class="fa-solid fa-caret-right"></i>Assessment
// //                         </p>
// //                     </div>
// //                 </div>

// //                 <div className='assessment-related'>
// //                     <div className='create-assessment' onClick={handleShow}>
// //                         <h6>Create Assessment</h6>
// //                     </div>
// //                     <div className='create-quize'>
// //                         <h6> <NavLink to={'/createQuize'}>Create Quize</NavLink> </h6>
// //                     </div>
// //                     <div className='quick-import'>
// //                         <h6>Quick Import</h6>
// //                     </div>
// //                 </div>
// //                 <Modal show={show} onHide={handleClose} size='xl'>
// //                     <Modal.Header closeButton>
// //                         <Modal.Title>Create Assessment</Modal.Title>
// //                     </Modal.Header>
// //                     <Modal.Body>
// //                         <div className='create-assessment-form'>
// //                             <div className="title-text">
// //                                 <h2>Create <span style={{ fontWeight: "300" }}>Assessment</span></h2>
// //                             </div>
// //                             <div className='assessment-form-items'>
// //                                 <div className="info-div-item">
// //                                     <label>Title</label>
// //                                     <input type='text' placeholder='Enter title' />
// //                                 </div>
// //                                 <div className="info-div-item">
// //                                     <label>Code</label>
// //                                     <input type='text' placeholder='Enter Code' />
// //                                 </div>
// //                                 <div className="info-div-item">
// //                                     <label>Description</label>
// //                                     <textarea placeholder='Enter description here...' />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <div className='add-question-div'>
// //                             <h6 style={{ marginBottom: "1rem" }}> <i className="fa-solid fa-circle-plus"></i> Add new question</h6>
// //                             <label>Type of question</label>
// //                             <select id='question-options' onChange={chooseQuestionType}>
// //                                 <option value='select-type'>-- Select type --</option>
// //                                 <option value='select-mcqs'>Multiple Choice Questions</option>
// //                                 <option value='select-text'>Text type questions</option>
// //                                 <option value='select-match'>Match the following</option>
// //                                 <option value='select-duplicate'>Duplicate</option>
// //                             </select>
// //                         </div>
// //                         <div className='mcq-type-container questions-container' style={{ display: selectedQuestionType === 'select-mcqs' ? 'block' : 'none' }}>
// //                             <h5>Multiple Choice Question</h5>
// //                             <QuestionForm setQuestionText={setQuestionText} setOptions={setOptions} setCorrectAnswer={setCorrectAnswer} />
// //                         </div>
// //                         <div className='text-type-container questions-container' style={{ display: selectedQuestionType === 'select-text' ? 'block' : 'none' }}>
// //                             <h5>Text type question</h5>
// //                             <QuestionFormTwo />
// //                         </div>
// //                         <div className='match-type-container questions-container' style={{ display: selectedQuestionType === 'select-match' ? 'block' : 'none' }}>
// //                             <h5>Match the following type questions</h5>
// //                             <MatchTheFollowingForm />
// //                         </div>
// //                     </Modal.Body>
// //                     <Modal.Footer>
// //                         <Button variant='secondary' onClick={handleClose}>Close</Button>
// //                         <Button variant='primary'>Submit Assessment</Button>
// //                     </Modal.Footer>
// //                 </Modal>

// //                 {/* <div className='section-module'>
// //                     <h4>Create Quize</h4>
// //                     <div className="container">
// //                         <div className="header info-div-item">
// //                             <input type='text' placeholder='Enter quize name' />
// //                             <input type='text' placeholder='Enter the subtitle ( Subtitle )' />
// //                         </div>

// //                         <div className="quick-start">
// //                             <h6 style={{color: "#7A1CAC", cursor:"pointer"}}
// //                             onClick={quickStart} > <i class="fa-solid fa-circle-plus"></i> Quick start with</h6>
// //                             <div className="button-grid" id='button-grid-id'>
// //                             <button className="quick-button"> <i class="fa-regular fa-circle-dot"></i> Choice</button>
// //                             <button className="quick-button"> <i class="fa-regular fa-file-lines"></i> Text</button>
// //                             <button className="quick-button"> <i class="fa-regular fa-thumbs-up"></i> Rating</button>
// //                             <button className="quick-button"> <i class="fa-regular fa-calendar-days"></i> Date</button>
// //                             <button className="quick-button"> <i class="fa-solid fa-ranking-star"></i> Ranking</button>
// //                             <button className="quick-button"> <i class="fa-solid fa-ticket"></i>Likert</button>
// //                             <button className="quick-button"> <i class="fa-solid fa-file-arrow-up"></i> Upload File</button>
// //                             <button className="quick-button"> <i class="fa-solid fa-gauge-high"></i> Net Promoter Score®</button>
// //                             <button className="quick-button"> <i class="fa-solid fa-layer-group"></i> Section</button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div> */}
// //             </section>
// //         </div>
// //         </div>
// //     );
// // }

// // export default Assessment;






// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Header from './Header';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import QuestionForm from './QuestionForm';
// import QuestionFormTwo from './QuestionTextForm';
// import { toast } from 'react-toastify';
// import MatchTheFollowingForm from './MatchTheFollowingForm';
// import axios from 'axios';

// function Assessment() {
//     const [show, setShow] = useState(false);
//     const [questionText, setQuestionText] = useState('');
//     const [options, setOptions] = useState([]);
//     const [correctAnswer, setCorrectAnswer] = useState('');
//     const [selectedQuestionType, setSelectedQuestionType] = useState('');

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//     function chooseQuestionType() {
//         const quesType = document.getElementById('question-options').value;
//         setSelectedQuestionType(quesType);
//         if (quesType === 'select-type') {
//             toast.error("Please select the correct option");
//         }
//     }

//     const submitAssessment = async () => {
//         const title = document.querySelector('input[placeholder="Enter title"]').value;
//         const code = document.querySelector('input[placeholder="Enter Code"]').value;
//         const description = document.querySelector('textarea[placeholder="Enter description here..."]').value;

//         const questions = []; // Collect questions based on their types

//         if (selectedQuestionType === 'select-mcqs') {
//             const mcqData = {
//                 questionText: questionText,
//                 options: options,
//                 correctAnswer: correctAnswer
//             };
//             questions.push({ type: 'mcq', questionData: mcqData });
//         }

//         try {
//             const response = await axios.post('http://localhost:5000/create_assessment', {
//                 title,
//                 code,
//                 description,
//                 questions
//             });

//             if (response.status === 201) {
//                 toast.success("Assessment created successfully");
//                 handleClose();
//             }
//         } catch (error) {
//             toast.error("Error creating assessment");
//             console.error("Error: ", error);
//         }
//     };

//     return (
//         <div>
//             <style>
//             {`
//             .assessment-related{
//             width: 100%;
//             padding: 2rem;
//             border-radius: 10px;
//             background-color: #ffffff;
//             display: flex;
//             }
//             .assessment-related div{
//              height: 2.5rem;
//             width: 13rem;
//             background-color: #7A1CAC;
//             color: #ffffff;
//             margin-right: 1rem;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             transition: all 0.3s ease;
//             box-shadow: 3px 3px 8px rgba(0, 0, 0, 1);
//             border-radius: 1.5rem;
//             cursor: pointer;
//             }
//             .assessment-related div:nth-child(3) {
//             background-color: #ffffff;
//             color: #7A1CAC;
//             font-weight: 600;
//             }
//             .assessment-related div h6{
//             margin: 0px;
//             }
//             .assessment-form-items{
//             width: 85%;
//             margin: 0 auto;
//             padding: 1rem 0;
//             }
//             .info-div-item{
//             margin: 1rem 0;
//             }
//             .title-text{
//             background-color: #2E073F;
//             color: #ffffff;
//             height: 8rem;
//             padding: 2rem;
//             border-top-right-radius: 1rem;
//             border-top-left-radius: 1rem;
//             }
//             textarea{
//             width: 100%;
//             height: 6rem;
//             padding: 10px;
//             }
//             .container{
//             width: 85%;
//             margin: 0 auto;
//             margin-bottom: 2rem;
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
//             .add-question-div{
//             width: 85%;
//             margin: 0 auto;
//             border: 2px solid rgba(0,0,0,0.2);
//             padding: 1.5rem;
//             border-radius: 10px;
//             margin-bottom: 2rem;
//             }
//             .questions-container{
//             display: none;
//             width: 85%;
//             margin: 0 auto;
//             }
//             `}
//         </style>
        
//         <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh" }}>
//             <Sidebar />
//             <section className="main-content-section">
//                 <Header />

//                 <div className="header-div header-two">
//                     <div className="title-name">
//                         <h5>Assessment</h5>
//                         <p>
//                         <a
//                             onClick={() => window.location.reload()}
//                             style={{ cursor: "pointer", color: "#099ded" }}
//                         >
//                             Home
//                         </a>{" "}
//                         <i class="fa-solid fa-caret-right"></i>Assessment
//                         </p>
//                     </div>
//                 </div>

//                 <div className='assessment-related'>
//                     <div className='create-assessment' onClick={handleShow}>
//                         <h6>Create Assessment</h6>
//                     </div>
//                     <div className='create-quize'>
//                         <h6>Create Quize</h6>
//                     </div>
//                     <div className='quick-import'>
//                         <h6>Quick Import</h6>
//                     </div>
//                 </div>
//                 <Modal show={show} onHide={handleClose} size='xl'>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Create Assessment</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <div className='create-assessment-form'>
//                             <div className="title-text">
//                                 <h2>Create <span style={{ fontWeight: "300" }}>Assessment</span></h2>
//                             </div>
//                             <div className='assessment-form-items'>
//                                 <div className="info-div-item">
//                                     <label>Title</label>
//                                     <input type='text' placeholder='Enter title' />
//                                 </div>
//                                 <div className="info-div-item">
//                                     <label>Code</label>
//                                     <input type='text' placeholder='Enter Code' />
//                                 </div>
//                                 <div className="info-div-item">
//                                     <label>Description</label>
//                                     <textarea placeholder='Enter description here...' />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className='add-question-div'>
//                             <h6 style={{ marginBottom: "1rem" }}> <i className="fa-solid fa-circle-plus"></i> Add new question</h6>
//                             <label>Type of question</label>
//                             <select id='question-options' onChange={chooseQuestionType}>
//                                 <option value='select-type'>-- Select type --</option>
//                                 <option value='select-mcqs'>Multiple Choice Questions</option>
//                                 <option value='select-text'>Text type questions</option>
//                                 <option value='select-match'>Match the following</option>
//                                 <option value='select-duplicate'>Duplicate</option>
//                             </select>
//                         </div>
//                         <div className='mcq-type-container questions-container' style={{ display: selectedQuestionType === 'select-mcqs' ? 'block' : 'none' }}>
//                             <h5>Multiple Choice Question</h5>
//                             <QuestionForm setQuestionText={setQuestionText} setOptions={setOptions} setCorrectAnswer={setCorrectAnswer} />
//                         </div>
//                         <div className='text-type-container questions-container' style={{ display: selectedQuestionType === 'select-text' ? 'block' : 'none' }}>
//                             <h5>Text type question</h5>
//                             <QuestionFormTwo />
//                         </div>
//                         <div className='match-type-container questions-container' style={{ display: selectedQuestionType === 'select-match' ? 'block' : 'none' }}>
//                             <h5>Match the following type questions</h5>
//                             <MatchTheFollowingForm />
//                         </div>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant='secondary' onClick={handleClose}>Close</Button>
//                         <Button variant='primary' onClick={submitAssessment}>Submit Assessment</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </section>
//         </div>
//         </div>
//     );
// }

// export default Assessment;





import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QuestionForm from './QuestionForm';
import QuestionFormTwo from './QuestionTextForm';
import { toast } from 'react-toastify';
import MatchTheFollowingForm from './MatchTheFollowingForm';
import axios from 'axios';
import { base_url } from '../Utils/base_url';
import { NavLink } from 'react-router-dom';

function Assessment() {
    // const [show, setShow] = useState(false);
    // const [questionText, setQuestionText] = useState('');
    // const [options, setOptions] = useState([]);
    // const [correctAnswer, setCorrectAnswer] = useState('');
    // const [selectedQuestionType, setSelectedQuestionType] = useState('');
    // const [questions, setQuestions] = useState([]); // Holds all added questions

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // // Show specific question type form
    // function chooseQuestionType(type) {
    //     setSelectedQuestionType(type);
    //     document.getElementById('questions-type-id').style.display = 'flex';
    //     document.getElementById('questions-type-id').style.justifyContent = 'space-between';
    // }

    // function MCQquestion() {
    //     setSelectedQuestionType('mcq');
    // }

    // function Textquestion() {
    //     setSelectedQuestionType('text');
    // }

    // function MTFquestion() {
    //     setSelectedQuestionType('match');
    // }

    // // Add the currently selected question to the questions list
    // const addQuestionToAssessment = () => {
    //     if (selectedQuestionType === 'mcq') {
    //         const mcqData = {
    //             type: 'mcq',
    //             questionText,
    //             options,
    //             correctAnswer
    //         };
    //         setQuestions([...questions, mcqData]);
    //     } else if (selectedQuestionType === 'text') {
    //         const textData = {
    //             type: 'text',
    //             questionText
    //         };
    //         setQuestions([...questions, textData]);
    //     } else if (selectedQuestionType === 'match') {
    //         const matchData = {
    //             type: 'match',
    //             // Add your match-the-following question data here
    //         };
    //         setQuestions([...questions, matchData]);
    //     }

    //     // Clear the form after adding the question
    //     setQuestionText('');
    //     setOptions([]);
    //     setCorrectAnswer('');
    // };

    // // Submit the whole assessment with all added questions
    // const submitAssessment = async () => {
    //     const title = document.querySelector('input[placeholder="Enter title"]').value;
    //     const code = document.querySelector('input[placeholder="Enter Code"]').value;
    //     const description = document.querySelector('textarea[placeholder="Enter description here..."]').value;

    //     try {
    //         const response = await axios.post(`${base_url}/create_assessment`, {
    //             title,
    //             code,
    //             description,
    //             questions // Submit all questions
    //         });

    //         if (response.status === 201) {
    //             toast.success("Assessment created successfully");
    //             handleClose();
    //         }
    //     } catch (error) {
    //         toast.error("Error creating assessment");
    //         console.error("Error: ", error);
    //     }
    // };

    return (
        <div>
            <style>
            {`
            .assessment-related{
    width: 100%;
    padding: 2rem;
    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    }
    .assessment-related div{
     height: 2.5rem;
    width: 13rem;
    background-color: #7A1CAC;
    color: #ffffff;
    margin-right: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 1);
    border-radius: 1.5rem;
    cursor: pointer;
    }
    .assessment-related div:nth-child(3) {
    background-color: #ffffff;
    color: #7A1CAC;
    font-weight: 600;
    }
    .assessment-related div h6{
    margin: 0px;
    }
    .assessment-form-items{
    width: 85%;
    margin: 0 auto;
    padding: 1rem 0;
    }
    .info-div-item{
    margin: 1rem 0;
    }
    .title-text{
    background-color: #2E073F;
    color: #ffffff;
    height: 8rem;
    padding: 2rem;
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    }
    textarea{
    width: 100%;
    height: 6rem;
    padding: 10px;
    }
    .container{
    width: 85%;
    margin: 0 auto;
    margin-bottom: 2rem;
    border: 2px solid rgba(0,0,0,0.2);
    border-radius: 10px;
    padding: 1.5rem;
    }
    .button-grid{
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
    .button-grid button:hover{
    background-color: #7A1CAC;
    color: #ffffff;
    }
    .header input{
    margin-bottom: 1rem;
    }
    .header{
    margin-top: 0px;
    }
    .add-question-div{
    width: 85%;
    margin: 0 auto;
    border: 2px solid rgba(0,0,0,0.2);
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    }
    .questions-container{
    width: 85%;
    margin: 0 auto;
    }
    .questions-type-options{
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    }
    .questions-type-options.show {
    display: flex;  /* Add this to toggle visibility */
    }
    .questions-type-options button{
    padding: 8px 1.5rem;
    background-color: #7A1CAC;
    border-radius: 1.5rem;
    }
    .questions-type-options button:hover{
    background-color: #2E073F;
    }
    .added-question{
    margin-top: 2rem;
    }
    .added-btn{
    width: 12rem;
    background-color: #2E073F;
    border: none;
    color: #ffffff;
    height: 2.5rem;
    }
    #questions-type-id{
    display: none;
    }

            `}
            </style>

            <div style={{ backgroundColor: "rgba(46, 7, 63, 0.1)", padding: "20px", height: "100vh" }}>
                <Sidebar />
                <section className="main-content-section">
                    <Header />

                    <div className="header-div header-two">
                    <div className="title-name">
                        <h5>Assessment</h5>
                        <p>
                        <a
                            onClick={() => window.location.reload()}
                            style={{ cursor: "pointer", color: "#099ded" }}
                        >
                            Home
                        </a>{" "}
                        <i class="fa-solid fa-caret-right"></i>Assessment
                        </p>
                    </div>
                </div>

                    <div className='assessment-related'>
                        <div className='create-assessment'>
                            <h6> <NavLink to={'/dataAssessment'}>Create Assessment</NavLink></h6>
                        </div>
                        <div className='create-quize'>
                            <h6> <NavLink to={'/uploadQuiz'}>Create Survey</NavLink> </h6>
                        </div>
                        <div className='quick-import'>
                            
                            <NavLink to={'/excelUploadView'}><h6>Quick Import</h6></NavLink>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Assessment;
