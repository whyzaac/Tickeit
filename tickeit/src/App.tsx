// src/App.tsx
import React, { useState, useEffect } from "react";
import { ProjectProvider } from "./contexts/ProjectContext";
import AppHeader from "./components/AppHeader";
import ProjectList from "./components/ProjectList";
import ProjectBriefForm from "./components/ProjectBriefForm";
import MeetingNotesInput from "./components/MeetingNotesInput";
import RoleSelector from "./components/RoleSelector";
import TaskList from "./components/TaskList";
import AIStandupChat from "./components/AIStandupChat";
import ChosenStacks from "./components/ChosenStacks";
import "./App.css";
import { dataStore } from "./services/dataStore";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'projectList' | 'projectBrief' | 'main'>('projectList');
  const [projectCreated, setProjectCreated] = useState(false);

  // Reset projectCreated flag when navigating to project list
  useEffect(() => {
    if (currentPage === 'projectList' && projectCreated) {
      setProjectCreated(false);
    }
  }, [currentPage, projectCreated]);

  const handleProjectCreation = () => {
    setProjectCreated(true);
    setCurrentPage('main');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'projectList':
        return (
          <div className="project-list-container">
            <h2>Your Projects</h2>
            <ProjectList onSelectProject={() => setCurrentPage('main')} />
            <button className="btn-primary" onClick={() => setCurrentPage('projectBrief')}>
              Create New Project
            </button>
          </div>
        );
      case 'projectBrief':
        return (
          <div className="setup-container">
            {/* Back Button */}
            <button 
              className="btn-back"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '0.5rem', marginBottom: '1rem' }}
              onClick={() => setCurrentPage('projectList')}
            >
              &larr; Back to Projects
            </button>
            
            <h2>Set Up Your Project</h2>
            <ProjectBriefForm />
            <button className="btn-primary" onClick={handleProjectCreation}>
              Continue
            </button>
          </div>
        );
      case 'main':
        return (
          <>
            {/* Back Button */}
            <button 
              className="btn-back"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', padding: '0.5rem', marginBottom: '1rem' }}
              onClick={() => setCurrentPage('projectList')}
            >
              &larr; Back to Projects
            </button>

            <div className="left-panel">
              <ChosenStacks />
              <MeetingNotesInput />
              <AIStandupChat />
            </div>
            <div className="right-panel">
              <RoleSelector />
              <TaskList />
            </div>
          </>
        );
    }
  };

  return (
    <ProjectProvider>
      <div className="app-container">
        <AppHeader />
        <main className="app-content">
          {renderContent()}
        </main>
        <footer className="app-footer">
          <p>Team 45 - iNTUition 2025</p>
        </footer>
      </div>
    </ProjectProvider>
  );
};

export default App;
