import React, { useState, useEffect } from "react";
import "../../styles/chapter-selector.css";

const ChapterSelector = ({ value, onChange, initialCount = 4 }) => {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    setChapters(Array.from({ length: initialCount }, (_, i) => i + 1));
  }, [initialCount]);

  const addChapter = () => {
    const next = chapters.length ? Math.max(...chapters) + 1 : 1;
    setChapters([...chapters, next]);
  };

  const isNone = value == null;

  return (
    <div className="chapter-selector" role="group" aria-label="Chapter selection">
      <div className="chapter-buttons">
        {chapters.map((num) => (
          <button
            key={num}
            type="button"
            className={`btn ${value === num ? "btn-primary" : "btn-secondary"}`}
            onClick={() => onChange(num)}
            aria-pressed={value === num}
          >
            {`Chapter ${num}`}
          </button>
        ))}
        <button
          type="button"
          className="btn btn-primary add-btn"
          onClick={addChapter}
          aria-label="Add next chapter"
        >
          Add Chapter
        </button>
        <button
          type="button"
          className={`btn ${isNone ? "btn-primary" : "btn-secondary"} none-btn`}
          onClick={() => onChange(null)}
          aria-pressed={isNone}
        >
          None
        </button>
      </div>
    </div>
  );
};

export default ChapterSelector;