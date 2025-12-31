import React from 'react';
import './ChapterGrid.css';

const ChapterGrid = ({ chapters = [], onSelect, includeAll = true, includeNone = true }) => {
  const items = [
    ...(includeAll ? [{ key: 'all', label: 'All Chapters' }] : []),
    ...(includeNone ? [{ key: 'none', label: 'No Chapter' }] : []),
    ...chapters.map((n) => ({ key: n, label: `Chapter ${n}` }))
  ];

  return (
    <div className="chapter-grid">
      {items.map((item) => (
        <button
          key={item.key}
          className="chapter-card btn btn-primary"
          onClick={() => onSelect(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default ChapterGrid;