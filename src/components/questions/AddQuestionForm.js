import React, { useState } from 'react';
import { questionsAPI } from '../../services/api';
import VoiceInput from './VoiceInput';
import ChapterSelector from '../common/ChapterSelector';
import './AddQuestionForm.css';

const AddQuestionForm = ({ subjectId, onSuccess, onCancel }) => {
  const [chapter, setChapter] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
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
      const topicValue = chapter ? `Chapter ${chapter}` : null;
      const response = await questionsAPI.create(subjectId, {
        topic: topicValue,
        question_text: questionText.trim(),
        answer_text: answerText.trim()
      });
      onSuccess(response.data);
      // Reset form
      setChapter(null);
      setQuestionText('');
      setAnswerText('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create question');
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceTranscription = (text) => {
    setQuestionText(prev => prev ? `${prev} ${text}` : text);
  };

  const handleAnswerVoiceTranscription = (text) => {
    setAnswerText(prev => prev ? `${prev} ${text}` : text);
  };

  return (
    <div className="add-question-form card">
      <h3>Add New Question</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Chapter (Optional)</label>
          <ChapterSelector value={chapter} onChange={setChapter} />
        </div>
        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label">Question *</label>
            <VoiceInput onTranscription={handleVoiceTranscription} />
          </div>
          <textarea
            className="textarea"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question or use voice input"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label">Answer *</label>
            <VoiceInput onTranscription={handleAnswerVoiceTranscription} />
          </div>
          <textarea
            className="textarea"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Enter the answer or use voice input"
            rows="6"
            required
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
            {loading ? 'Creating...' : 'Add Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionForm;

