import React, { useState } from 'react';
import QuestionForm from './QuestionForm';

const AddQuestionContainer = ({ onSaveQuestion, questionType }) => {
    const [questions, setQuestions] = useState([]);

    const addNewQuestion = () => {
        setQuestions([...questions, {}]);
    };

    const deleteQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const saveQuestion = (questionData) => {
        onSaveQuestion({
            ...questionData,
            type: questionType,
        });
    };

    return (
        <div>
            {questions.map((_, index) => (
                <QuestionForm
                    key={index}
                    index={index}
                    onDelete={deleteQuestion}
                    onSaveQuestion={saveQuestion}
                />
            ))}

            <button onClick={addNewQuestion}>
                <i className="fa-solid fa-plus"></i> Add new question
            </button>
        </div>
    );
};

export default AddQuestionContainer;
