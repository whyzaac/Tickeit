// src/components/AppHeader.tsx
import React from "react";
import { useProject } from "../contexts/ProjectContext";

const AppHeader: React.FC = () => {
  const { projectBrief } = useProject();

  return (
    <header className="app-header">
      <div className="logo">
        <h1>TickeIt AI</h1>
      </div>

      {projectBrief && (
        <div className="project-info">
          <h2>{projectBrief.title}</h2>
          <div className="tech-stack">
            {projectBrief.techStack.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
