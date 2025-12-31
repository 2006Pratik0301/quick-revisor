import React from 'react';
import './QuestionTabs.css';

const QuestionTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'add', label: 'Add Question' },
    { id: 'manage', label: 'Manage Questions' },
    { id: 'flashcards', label: 'Flashcards' }
  ];

  return (
    <div className="question-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default QuestionTabs;

