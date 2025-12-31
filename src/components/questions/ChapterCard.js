import React from "react";
import "./ChapterGrid.css";

const ChapterCard = ({ id, label, onClick }) => {
  const handleClick = () => onClick(id);
  return (
    <div className="chapter-card card scale-in" role="button" tabIndex={0} aria-label={label} onClick={handleClick} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}>
      <div className="chapter-card-header">
        <h3 className="chapter-name">{label}</h3>
      </div>
      <div className="chapter-card-footer">
        <span className="click-hint">Click to view Flashcards →</span>
      </div>
    </div>
  );
};

export default ChapterCard;