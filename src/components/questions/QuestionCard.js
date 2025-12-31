import React, { useState } from 'react';
import { questionsAPI } from '../../services/api';
import './QuestionCard.css';

const QuestionCard = ({ question, onDelete, showDelete = true }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this question?')) {
      setDeleting(true);
      try {
        await questionsAPI.delete(question.id);
        onDelete(question.id);
      } catch (error) {
        alert('Failed to delete question');
        setDeleting(false);
      }
    }
  };

  return (
    <div className="question-card-container scale-in">
      <div className="flip-container">
        <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flip-card-front card">
            <div className="question-card-header">
              {question.topic && (
                <span className="question-topic">{question.topic}</span>
              )}
              {showDelete && (
                <button
                  className="delete-btn"
                  onClick={handleDelete}
                  disabled={deleting}
                  aria-label="Delete question"
                >
                  ×
                </button>
              )}
            </div>
            <div className="question-content">
              <h4 className="question-label">Question</h4>
              <p className="question-text">{question.question_text}</p>
            </div>
            <div className="flip-hint">Click to see answer →</div>
          </div>
          <div className="flip-card-back card">
            <div className="answer-content">
              <h4 className="answer-label">Answer</h4>
              <p className="answer-text">{question.answer_text}</p>
            </div>
            <div className="flip-hint">Click to see question ←</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;

