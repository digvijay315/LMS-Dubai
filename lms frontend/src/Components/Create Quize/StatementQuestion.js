import React, { useState } from 'react';
import { TextField, Button, IconButton, Switch, FormControlLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const StatementQuestion = () => {
    const [questions, setQuestions] = useState([
        {
            id: 1,
            text: '',
            options: Array(5).fill('').map((_, i) => `Option ${i + 1}`),
            statements: [{ label: `Statement 1` }],
            required: false,
        },
    ]);

    const deleteQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const addOption = (questionIndex) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex].options.push(`Option ${updatedQuestions[questionIndex].options.length + 1}`);
            return updatedQuestions;
        });
    };

    const deleteOption = (questionIndex, optionIndex) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex].options.splice(optionIndex, 1);
            return updatedQuestions;
        });
    };

    const addStatement = (questionIndex) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            const newStatementCount = updatedQuestions[questionIndex].statements.length + 1;
            updatedQuestions[questionIndex].statements.push({
                label: `Statement ${newStatementCount}`,
            });
            return updatedQuestions;
        });
    };

    const deleteStatement = (questionIndex, statementIndex) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex].statements.splice(statementIndex, 1);
            return updatedQuestions;
        });
    };

    const handleQuestionChange = (index, field, value) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index][field] = value;
            return updatedQuestions;
        });
    };

    const handleOptionLabelChange = (questionIndex, optionIndex, value) => {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[questionIndex].options[optionIndex] = value;
            return updatedQuestions;
        });
    };

    return (
        <div>

<style>
{`
.main-container-div {
    background-color: #ffffff;
    border-radius: 10px;
    // border-top: 5px solid #7A1CAC;
    width: 100%;
    // padding: 2rem;
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
.options-container, .statements-container {
    display: flex;
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
</style>
           
            <div className="main-container-div">
                <div style={{ width: '100%' }}>
                    {questions.map((question, qIndex) => (
                        <div key={question.id} className="question-container">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {/* <h5>Question no. {qIndex + 1}</h5> */}
                                <IconButton aria-label="delete" onClick={() => deleteQuestion(qIndex)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <TextField
                                    fullWidth
                                    label="Question"
                                    value={question.text}
                                    onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                                    placeholder="Enter your question"
                                    variant="outlined"
                                />
                                <IconButton color="primary" component="label">
                                    <input hidden accept="image/*" type="file" />
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </div>
                            <div className="options-container">
                                {question.options.map((option, oIndex) => (
                                    <div key={oIndex} className="option-box">
                                        <TextField
                                            value={option}
                                            onChange={(e) => handleOptionLabelChange(qIndex, oIndex, e.target.value)}
                                            placeholder={`Option ${oIndex + 1}`}
                                            variant="outlined"
                                        />
                                        <IconButton
                                            aria-label="delete option"
                                            onClick={() => deleteOption(qIndex, oIndex)}
                                            color="secondary"
                                            size="small"
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                ))}
                                <IconButton aria-label="add option" onClick={() => addOption(qIndex)} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </div>
                            <div className="statements-container">
                                <span style={{ fontWeight: 'bold', marginRight: 5, width: '120px' }}>Statement</span>
                                {question.options.map((option, oIndex) => (
                                    <div key={oIndex} className="option-box">
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                            {question.statements.map((statement, sIndex) => (
                                <div key={sIndex} className="statement-row">
                                    <TextField
                                        onChange={(e) =>
                                            handleQuestionChange(qIndex, `statements[${sIndex}].label`, e.target.value)
                                        }
                                        placeholder={`Statement ${sIndex + 1}`}
                                        variant="outlined"
                                        style={{ width: '180px' }}
                                    />
                                    {question.options.map((_, oIndex) => (
                                        <div key={oIndex} style={{ display: 'flex', justifyContent: 'center' }}>
                                            <input
                                                type="radio"
                                                name={`statement-${qIndex}-${sIndex}`}
                                                style={{ width: '20px' }}
                                            />
                                        </div>
                                    ))}
                                    <IconButton
                                        aria-label="delete statement"
                                        onClick={() => deleteStatement(qIndex, sIndex)}
                                        color="secondary"
                                        size="small"
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </div>
                            ))}
                            <Button
                                variant="contained"
                                onClick={() => addStatement(qIndex)}
                                className="add-statement-btn"
                            >
                                Add Statement
                            </Button>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={question.required}
                                        onChange={() => handleQuestionChange(qIndex, 'required', !question.required)}
                                    />
                                }
                                label="Required"
                                style={{ marginTop: 10 }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatementQuestion;

