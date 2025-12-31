import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { questionsAPI, subjectsAPI } from '../../services/api';
import QuestionCard from './QuestionCard';
import AddQuestionForm from './AddQuestionForm';
import ManageQuestionsModal from './ManageQuestionsModal';
import FlashcardsCarousel from './FlashcardsCarousel';
import ChapterGrid from './ChapterGrid';
import QuestionTabs from './QuestionTabs';
import './QuestionList.css';

const QuestionList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('add');
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [manageSelectedChapter, setManageSelectedChapter] = useState(null);

  // Derive chapter list and filtered questions
  const getChapterNumber = (topic) => {
    if (!topic) return null;
    const match = topic.match(/^Chapter\s+(\d+)/i);
    return match ? Number(match[1]) : null;
  };

  const chapters = Array.from(
    new Set(
      questions
        .map((q) => getChapterNumber(q.topic))
        .filter((n) => n != null)
    )
  ).sort((a, b) => a - b);

  const filteredQuestions = (() => {
    if (selectedChapter === 'none') {
      return questions.filter((q) => getChapterNumber(q.topic) == null);
    }
    if (typeof selectedChapter === 'number') {
      return questions.filter((q) => getChapterNumber(q.topic) === selectedChapter);
    }
    if (selectedChapter === 'all') {
      return questions.filter((q) => getChapterNumber(q.topic) != null);
    }
    return [];
  })();

  const manageFilteredQuestions = (() => {
    if (manageSelectedChapter === 'none') {
      return questions.filter((q) => getChapterNumber(q.topic) == null);
    }
    if (typeof manageSelectedChapter === 'number') {
      return questions.filter((q) => getChapterNumber(q.topic) === manageSelectedChapter);
    }
    if (manageSelectedChapter === 'all') {
      return questions.filter((q) => getChapterNumber(q.topic) != null);
    }
    return [];
  })();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [subjectRes, questionsRes] = await Promise.all([
        subjectsAPI.getById(id),
        questionsAPI.getBySubject(id)
      ]);
      setSubject(subjectRes.data);
      setQuestions(questionsRes.data);
      setError('');
    } catch (err) {
      setError('Failed to load questions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionCreated = (newQuestion) => {
    setQuestions([newQuestion, ...questions]);
    setActiveTab('flashcards');
    setSelectedChapter(null);
  };

  const handleQuestionUpdated = (updated) => {
    setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
  };

  const handleQuestionDeleted = (questionId) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  if (loading) {
    return (
      <div className="question-list-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error && !subject) {
    return (
      <div className="question-list-container">
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="question-list-container">
      <div className="question-list-header">
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
            style={{ marginBottom: '1rem' }}
          >
            ← Back to Dashboard
          </button>
          <h2>{subject?.name}</h2>
          {subject?.year && <p className="subject-meta">Year: {subject.year}</p>}
        </div>
      </div>

      <QuestionTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {error && <div className="error-message">{error}</div>}

      <div className="tab-content">
        {activeTab === 'add' && (
          <div className="add-form-container">
            <AddQuestionForm
              subjectId={id}
              onSuccess={handleQuestionCreated}
              onCancel={() => setActiveTab('flashcards')}
            />
          </div>
        )}

        {activeTab === 'manage' && (
          <>
            {questions.length === 0 ? (
              <div className="empty-state">
                <p>No questions to manage.</p>
              </div>
            ) : (
              <>
                {manageSelectedChapter == null ? (
                  <ChapterGrid
                    chapters={chapters}
                    onSelect={(value) => {
                      if (typeof value === 'string' && value.startsWith('chapter-')) {
                        const num = Number(value.replace('chapter-', ''));
                        setManageSelectedChapter(Number.isNaN(num) ? null : num);
                      } else {
                        setManageSelectedChapter(value);
                      }
                    }}
                  />
                ) : (
                  <>
                    <div className="flashcards-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setManageSelectedChapter(null)}
                      >
                        ← Back to Chapters
                      </button>
                    </div>
                    <ManageQuestionsModal
                      questions={manageFilteredQuestions}
                      onQuestionDeleted={handleQuestionDeleted}
                      onQuestionUpdated={handleQuestionUpdated}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'flashcards' && (
          <>
            {questions.length === 0 ? (
              <div className="empty-state">
                <p>No questions yet. Add your first question to get started!</p>
              </div>
            ) : (
              <>
                {selectedChapter == null ? (
                  <ChapterGrid
                    chapters={chapters}
                    onSelect={(value) => {
                      if (typeof value === 'string' && value.startsWith('chapter-')) {
                        const num = Number(value.replace('chapter-', ''));
                        setSelectedChapter(Number.isNaN(num) ? null : num);
                      } else {
                        setSelectedChapter(value);
                      }
                    }}
                  />
                ) : (
                  <>
                    <div className="flashcards-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setSelectedChapter(null)}
                      >
                        ← Back to Chapters
                      </button>
                    </div>
                    {filteredQuestions.length === 0 ? (
                      <div className="empty-state">
                        <p>No flashcards for the selected chapter.</p>
                      </div>
                    ) : (
                      <FlashcardsCarousel questions={filteredQuestions} />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionList;

