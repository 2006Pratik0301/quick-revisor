import React, { useState } from 'react';
import { questionsAPI } from '../../services/api';
import ChapterSelector from '../common/ChapterSelector';
import './EditQuestionCard.css';

const EditQuestionCard = ({ question, onSave, onClose }) => {
  const getChapterNumber = (topic) => {
    if (!topic) return null;
    const match = String(topic).match(/^Chapter\s+(\d+)/i);
    return match ? Number(match[1]) : null;
  };

  const [chapter, setChapter] = useState(getChapterNumber(question.topic));
  const [questionText, setQuestionText] = useState(question.question_text || '');
  const [answerText, setAnswerText] = useState(question.answer_text || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim() || !answerText.trim()) {
      setError('Both question and answer are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = {
        topic: chapter ? `Chapter ${chapter}` : null,
        question_text: questionText.trim(),
        answer_text: answerText.trim()
      };
      const res = await questionsAPI.update(question.id, data);
      onSave(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-card card">
      <h3>Update Question</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Chapter (Optional)</label>
          <ChapterSelector value={chapter} onChange={setChapter} />
        </div>
        <div className="form-group">
          <label className="form-label">Question *</label>
          <textarea
            className="textarea"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Edit the question"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Answer *</label>
          <textarea
            className="textarea"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Edit the answer"
            rows="6"
            required
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestionCard;