import React, { useState } from 'react';
import { questionsAPI } from '../../services/api';
import './ManageQuestionsModal.css';
import EditQuestionCard from './EditQuestionCard';

const ManageQuestionsModal = ({ questions, onQuestionDeleted, onQuestionUpdated }) => {
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // { questionId, index }

  const handleDelete = async (questionId, index) => {
    setDeletingIds(prev => new Set(prev).add(questionId));
    try {
      await questionsAPI.delete(questionId);
      onQuestionDeleted(questionId);
    } catch (error) {
      alert('Failed to delete question');
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    } finally {
      setConfirmDelete(null);
    }
  };

  const openConfirmDelete = (questionId, index) => {
    setConfirmDelete({ questionId, index });
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    const aTime = a.created_at ? new Date(a.created_at).getTime() : a.id;
    const bTime = b.created_at ? new Date(b.created_at).getTime() : b.id;
    return aTime - bTime;
  });

  return (
    <div className="manage-questions-container">
      {sortedQuestions.length === 0 ? (
        <div className="empty-list">
          <p>No questions to manage</p>
        </div>
      ) : (
        <ul className="manage-questions-list">
          {sortedQuestions.map((question, index) => (
            <li key={question.id} className="manage-question-item">
              <div className="question-item-content">
                <span className="question-number">Question {index + 1}:</span>
                <span className="question-preview">
                  {truncateText(question.question_text)}
                </span>
              </div>
              <div className="manage-actions" style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                <button
                  className="btn btn-primary"
                  onClick={() => setEditingQuestion(question)}
                  aria-label={`Update question ${index + 1}`}
                >
                  Update
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => openConfirmDelete(question.id, index)}
                  disabled={deletingIds.has(question.id)}
                  aria-label={`Delete question ${index + 1}`}
                >
                  <span className="cancel-glyph" aria-hidden="true">
                    {deletingIds.has(question.id) ? '...' : '×'}
                  </span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editingQuestion && (
        <div className="edit-overlay" role="dialog" aria-modal="true">
          <div className="edit-modal">
            <EditQuestionCard
              question={editingQuestion}
              onClose={() => setEditingQuestion(null)}
              onSave={(updated) => {
                onQuestionUpdated && onQuestionUpdated(updated);
                setEditingQuestion(null);
              }}
            />
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="confirm-overlay" role="dialog" aria-modal="true" onClick={(e)=>{ if(e.target===e.currentTarget) setConfirmDelete(null); }}>
          <div className="confirm-modal">
            <h3 className="confirm-title">Delete question?</h3>
            <p className="confirm-message">This will permanently remove the selected question. You can't undo this action.</p>
            <div className="confirm-actions">
              <button className="btn btn-primary" onClick={() => handleDelete(confirmDelete.questionId, confirmDelete.index)}>Delete</button>
              <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>No thanks</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuestionsModal;

