import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import './FlashcardsCarousel.css';

const FlashcardsCarousel = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : questions.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [questions.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : questions.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < questions.length - 1 ? prev + 1 : 0));
  };

  const handleGoToCard = (index) => {
    setCurrentIndex(index);
  };

  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="flashcards-carousel">
      <div className="carousel-container">
        <button
          className="carousel-nav-btn prev-btn"
          onClick={handlePrevious}
          aria-label="Previous card"
        >
          <span className="chevron">‹</span>
        </button>

        <div className="carousel-card-wrapper">
          <div
            className="carousel-card-container"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {questions.map((question, index) => (
              <div key={question.id} className="carousel-card-item carousel-question-card">
                <QuestionCard
                  question={question}
                  onDelete={() => {}} // No delete in carousel view
                  showDelete={false}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-nav-btn next-btn"
          onClick={handleNext}
          aria-label="Next card"
        >
          <span className="chevron">›</span>
        </button>
      </div>

      <div className="carousel-footer">
        <div className="carousel-counter">
          Card {currentIndex + 1} of {questions.length}
        </div>
        <div className="carousel-dots">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => handleGoToCard(index)}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsCarousel;

