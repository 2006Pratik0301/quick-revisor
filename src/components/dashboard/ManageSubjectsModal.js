import React, { useState } from 'react';
import { subjectsAPI } from '../../services/api';
import './ManageSubjectsModal.css';

const ManageSubjectsModal = ({ subjects, onClose, onSubjectDeleted }) => {
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [confirmDelete, setConfirmDelete] = useState(null); // { subjectId, index }

  const handleDelete = async (subjectId, index) => {
    setDeletingIds(prev => new Set(prev).add(subjectId));
    try {
      await subjectsAPI.delete(subjectId);
      onSubjectDeleted(subjectId);
    } catch (error) {
      alert('Failed to delete subject');
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(subjectId);
        return newSet;
      });
    } finally {
      setConfirmDelete(null);
    }
  };

  const openConfirmDelete = (subjectId, index) => {
    setConfirmDelete({ subjectId, index });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="manage-modal-overlay" onClick={handleOverlayClick}>
      <div className="manage-modal-card">
        <div className="manage-modal-header">
          <h3>Manage Subjects</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="manage-modal-content">
          {subjects.length === 0 ? (
            <div className="empty-list">
              <p>No subjects to manage</p>
            </div>
          ) : (
            <ul className="manage-list">
              {[...subjects]
                .sort((a, b) => {
                  const aTime = a.created_at ? new Date(a.created_at).getTime() : a.id;
                  const bTime = b.created_at ? new Date(b.created_at).getTime() : b.id;
                  return aTime - bTime; // oldest first (insertion order)
                })
                .map((subject, index) => (
                  <li key={subject.id} className="manage-list-item">
                    <span className="item-label">
                      Subject {index + 1}: {subject.name}
                    </span>
                    <button
                      className="cancel-btn"
                      onClick={() => openConfirmDelete(subject.id, index)}
                      disabled={deletingIds.has(subject.id)}
                      aria-label={`Delete ${subject.name}`}
                    >
                      {deletingIds.has(subject.id) ? '...' : '×'}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
        {confirmDelete && (
          <div className="confirm-overlay" role="dialog" aria-modal="true" onClick={(e)=>{ if(e.target===e.currentTarget) setConfirmDelete(null); }}>
            <div className="confirm-modal">
              <h3 className="confirm-title">Delete subject?</h3>
              <p className="confirm-message">This will permanently remove the selected subject and all its questions. You can't undo this action.</p>
              <div className="confirm-actions">
                <button className="btn btn-primary" onClick={() => handleDelete(confirmDelete.subjectId, confirmDelete.index)}>Delete</button>
                <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>No thanks</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSubjectsModal;

