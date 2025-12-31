import React from "react";
import ChapterCard from "./ChapterCard";
import "./ChapterGrid.css";

const ChapterGrid = ({ chapters = [], onSelect }) => {
  const items = [
    { id: "all", label: "All Chapters" },
    ...chapters.map((n) => ({ id: `chapter-${n}`, label: `Chapter ${n}` })),
    { id: "none", label: "No Chapter" }
  ];

  return (
    <div className="chapter-grid" role="list" aria-label="Choose a chapter to view flashcards">
      {items.map((item) => (
        <div key={item.id} role="listitem" className="chapter-grid-item">
          <ChapterCard id={item.id} label={item.label} onClick={onSelect} />
        </div>
      ))}
    </div>
  );
};

export default ChapterGrid;