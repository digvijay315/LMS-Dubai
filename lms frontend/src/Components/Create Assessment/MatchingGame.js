import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MatchingGame = () => {
  const [questions] = useState([
    { id: 1, text: "Capital of France?" },
    { id: 2, text: "Largest planet?" },
    { id: 3, text: "Speed of light?" },
  ]);

  const [answers, setAnswers] = useState([
    { id: 1, text: "Paris" },
    { id: 2, text: "Jupiter" },
    { id: 3, text: "299,792 km/s" },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const correctOrder = [1, 2, 3];

  const checkAnswers = () => {
    const isCorrect = answers.every((answer, index) => answer.id === correctOrder[index]);
    alert(isCorrect ? "Correct!" : "Try Again!");
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.setData('text/plain', index);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    setDraggedItem(null);
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    const dragIndex = Number(e.dataTransfer.getData('text/plain'));
    const newAnswers = [...answers];
    const [removed] = newAnswers.splice(dragIndex, 1);
    newAnswers.splice(dropIndex, 0, removed);
    setAnswers(newAnswers);
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Header>
          <Card.Title className="text-center mb-0">
            Match Questions with Answers
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Row className="g-4">
            {/* Answers Section */}
            <Col md={6}>
              <h3 className="mb-3">Answers</h3>
              {answers.map((answer, index) => (
                <div
                  key={answer.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  style={{ 
                    cursor: 'grab',
                    marginBottom: '15px',
                    position: 'relative',
                    transform: dragOverIndex === index ? 'translateY(10px)' : 'none',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  {dragOverIndex === index && draggedItem !== index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#007bff',
                        borderRadius: '2px'
                      }}
                    />
                  )}
                  <Card 
                    className="h-100"
                    bg="light"
                    style={{
                      boxShadow: dragOverIndex === index ? '0 0 10px rgba(0,123,255,0.3)' : 'none',
                      transform: draggedItem === index ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Card.Body>
                      {answer.text}
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </Col>

            {/* Questions Section */}
            <Col md={6}>
              <h3 className="mb-3">Questions</h3>
              {questions.map((question) => (
                <Card 
                  key={question.id} 
                  className="mb-3"
                  bg="success"
                  text="dark"
                >
                  <Card.Body>
                    {question.text}
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button 
              variant="primary" 
              onClick={checkAnswers}
              size="lg"
            >
              Check Answers
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MatchingGame;