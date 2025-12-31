import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjectsAPI } from '../../services/api';
import './SubjectCard.css';

const SubjectCard = ({ subject, onDelete, showDelete = false }) => {
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleClick = () => {
    navigate(`/subjects/${subject.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this subject? All questions will also be deleted.')) {
      setDeleting(true);
      try {
        await subjectsAPI.delete(subject.id);
        onDelete(subject.id);
      } catch (error) {
        alert('Failed to delete subject');
        setDeleting(false);
      }
    }
  };

  return (
    <div className="subject-card card scale-in" onClick={handleClick}>
      <div className="subject-card-header">
        <h3 className="subject-name">{subject.name}</h3>
        {showDelete && (
          <button
            className="delete-btn"
            onClick={handleDelete}
            disabled={deleting}
            aria-label="Delete subject"
          >
            ×
          </button>
        )}
      </div>
      {subject.year && (
        <div className="subject-year">{subject.year}</div>
      )}
      {subject.related_question && (
        <div className="subject-related">
          <p>{subject.related_question}</p>
        </div>
      )}
      <div className="subject-card-footer">
        <span className="click-hint">Click to view questions →</span>
      </div>
    </div>
  );
};

export default SubjectCard;

