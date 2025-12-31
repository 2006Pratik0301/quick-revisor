import React, { useState } from 'react';
import { subjectsAPI } from '../../services/api';
import './AddSubjectForm.css';

const AddSubjectForm = ({ onSuccess, onCancel }) => {
  const [year, setYear] = useState('');
  const [name, setName] = useState('');
  const [relatedQuestion, setRelatedQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Subject name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await subjectsAPI.create({
        year: year.trim() || null,
        name: name.trim(),
        related_question: relatedQuestion.trim() || null
      });
      onSuccess(response.data);
      // Reset form
      setYear('');
      setName('');
      setRelatedQuestion('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create subject');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-subject-form card">
      <h3>Add New Subject</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Year (Optional)</label>
          <input
            type="text"
            className="input"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g., 2024, First Year, etc."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Subject Name *</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subject name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Related Question (Optional)</label>
          <textarea
            className="textarea"
            value={relatedQuestion}
            onChange={(e) => setRelatedQuestion(e.target.value)}
            placeholder="Any related question or description"
            rows="3"
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Subject'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubjectForm;

