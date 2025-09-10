import React, {useState} from 'react'
import QuestionForm from './QuestionForm';
import QuestionFormTwo from './QuestionTextForm';
import MatchTheFollowingForm from './MatchTheFollowingForm';
import Button from 'react-bootstrap/Button';
import DuplicateAssessment from './DuplicateAssessment';

function AddDifferentSection() {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [questions, setQuestions] = useState([]); // Holds all added questions

    function chooseQuestionType(type) {
        setSelectedQuestionType(type);
        document.getElementById('questions-type-id').style.display = 'flex';
        document.getElementById('questions-type-id').style.justifyContent = 'space-between';
    }

    function MCQquestion() {
        setSelectedQuestionType('mcq');
    }

    function Textquestion() {
        setSelectedQuestionType('text');
    }

    function MTFquestion() {
        setSelectedQuestionType('match');
    }

    function DuplicateQuestion() {
        setSelectedQuestionType('duplicate');
    }

    const addQuestionToAssessment = () => {
        if (selectedQuestionType === 'mcq') {
            const mcqData = {
                type: 'mcq',
                questionText,
                options,
                correctAnswer
            };
            setQuestions([...questions, mcqData]);
        } else if (selectedQuestionType === 'text') {
            const textData = {
                type: 'text',
                questionText
            };
            setQuestions([...questions, textData]);
        } else if (selectedQuestionType === 'match') {
            const matchData = {
                type: 'match',
                // Add your match-the-following question data here
            };
            setQuestions([...questions, matchData]);
        } else if (selectedQuestionType === 'duplicate') {
            const duplicateData = {
                type: 'duplicate',
            };
            setQuestions([...questions, duplicateData]);
        }

        // Clear the form after adding the question
        setQuestionText('');
        setOptions([]);
        setCorrectAnswer('');
    };

  return (
    <div>

        <style>
            {`
            body{
            background-color: rgba(46, 7, 63, 0.2);
            padding: 1.5rem;
            }
            .header-section{
            height: 5rem;
            width: 100%;
            border-radius: 10px;
            background-color: #ffffff;
            }
            .section-module{
            border-top: 5px solid #7A1CAC;
            width: 70%;
            margin: 0 auto;
            margin-top: 1.5rem;
            border-radius: 10px;
            background-color: #ffffff;
            padding: 3rem 6rem;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
            }
            .section-module h4{
            margin-bottom: 1.5rem;
            }
            .container{
            border: 2px solid rgba(0,0,0,0.2);
            border-radius: 10px;
            padding: 1.5rem;
            }
            .info-div-item{
            margin: 1rem 0;
            }
            .add-question-div{
            margin: 2rem auto 0 auto;
            border: 2px solid rgba(0,0,0,0.2);
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 2rem;
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
            background-color: #7A1CAC;
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

        <div className='header-section'>
        
        </div>

        <div className='section-module'>
            <h4>Add Section</h4>
            <div className="container">
                <div className="header info-div-item">
                    <div className="info-div-item">
                        <label>Section Name</label>
                        <input type='text' placeholder='Enter section name' />
                    </div>
                    <div className="info-div-item">
                        <label>Add Subtitle</label>
                        <input type='text' placeholder='Enter subtitle' />
                    </div>
                </div>
            </div>

            <div className='add-question-div'>
                <h6 style={{ marginBottom: "1rem" }}>Add questions</h6>
                <label style={{color:'#7A1CAC', cursor:"pointer"}} onClick={() => chooseQuestionType('')}> 
                    <i className="fa-solid fa-circle-plus"></i> Type of question
                </label>
                <div className='questions-type-options' id='questions-type-id'>
                    <button id='mcq-questions-btn' onClick={MCQquestion}>Multiple Choice Questions</button>
                    <button id='text-questions-btn' onClick={Textquestion}>Text type questions</button>
                    <button id='match-following-btn' onClick={MTFquestion}>Match the following</button>
                    <button id='duplicate-questions-btn' onClick={DuplicateQuestion}>Duplicate</button>
                </div>
            </div>

                            {selectedQuestionType === 'mcq' && (
                                <div className='mcq-type-container questions-container'>
                                    <h5>Multiple Choice Question</h5>
                                    <QuestionForm setQuestionText={setQuestionText} setOptions={setOptions} setCorrectAnswer={setCorrectAnswer} />
                                    {/* <Button variant="primary" className='added-btn' onClick={addQuestionToAssessment}>Add MCQ Question</Button> */}
                                </div>
                            )}

                            {selectedQuestionType === 'text' && (
                                <div className='text-type-container questions-container'>
                                    <h5>Text type question</h5>
                                    <QuestionFormTwo setQuestionText={setQuestionText} />
                                    {/* <Button variant="primary" className='added-btn' onClick={addQuestionToAssessment}>Add Text Question</Button> */}
                                </div>
                            )}

                            {selectedQuestionType === 'match' && (
                                <div className='match-type-container questions-container'>
                                    <h5>Match the following type questions</h5>
                                    <MatchTheFollowingForm />
                                    {/* <Button variant="primary" className='added-btn' onClick={addQuestionToAssessment}>Add Match Question</Button> */}
                                </div>
                            )}

                            {selectedQuestionType === 'duplicate' && (
                                <div className='duplicate-type-container questions-container'>
                                    {/* <h5>Duplicate type questions</h5> */}
                                    <DuplicateAssessment />
                                    {/* <Button variant="primary" className='added-btn' onClick={addQuestionToAssessment}>Add Duplicate</Button> */}
                                </div>
                            )}

                            {/* List of all added questions */}
                            <div className='questions-container added-question'>
                                <h5>All Added Questions:</h5>
                                <ul>
                                    {questions.map((q, index) => (
                                        <li key={index}>
                                            {q.type.toUpperCase()} Question: {q.questionText}
                                        </li>
                                    ))}
                                </ul>
                            </div>

        </div>
      
    </div>
  )
}

export default AddDifferentSection
