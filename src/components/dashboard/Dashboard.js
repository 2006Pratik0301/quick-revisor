import React, { useState, useEffect } from 'react';
import { subjectsAPI } from '../../services/api';
import SubjectCard from './SubjectCard';
import AddSubjectForm from './AddSubjectForm';
import ManageSubjectsModal from './ManageSubjectsModal';
import './Dashboard.css';

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const response = await subjectsAPI.getAll();
      setSubjects(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load subjects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectCreated = (newSubject) => {
    setSubjects([newSubject, ...subjects]);
    setShowAddForm(false);
  };

  const handleSubjectDeleted = (subjectId) => {
    setSubjects(subjects.filter(s => s.id !== subjectId));
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Subjects</h2>
        <div className="dashboard-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setShowManageModal(true)}
          >
            Manage
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Subject'}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="add-form-container">
          <AddSubjectForm
            onSuccess={handleSubjectCreated}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {showManageModal && (
        <ManageSubjectsModal
          subjects={subjects}
          onClose={() => setShowManageModal(false)}
          onSubjectDeleted={handleSubjectDeleted}
        />
      )}

      {subjects.length === 0 && !showAddForm ? (
        <div className="empty-state">
          <p>No subjects yet. Create your first subject to get started!</p>
        </div>
      ) : (
        <div className="subjects-grid">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onDelete={handleSubjectDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

