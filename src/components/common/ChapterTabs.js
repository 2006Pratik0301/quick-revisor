import React from "react";
import "../../styles/chapter-tabs.css";

const ChapterTabs = ({ chapters = [], active, onChange }) => {
  const tabs = [
    { id: "all", label: "All (No None)" },
    ...chapters.map((n) => ({ id: `chapter-${n}`, label: `Chapter ${n}` })),
    { id: "none", label: "None" }
  ];

  return (
    <div className="chapter-tabs" role="tablist" aria-label="Flashcards chapter filter">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`chapter-tab ${active === tab.id ? "active" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ChapterTabs;