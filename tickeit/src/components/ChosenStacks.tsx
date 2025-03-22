// src/components/ChosenStacks.tsx
import React from "react";
import { useProject } from "../contexts/ProjectContext";

const ChosenStacks: React.FC = () => {
  const { projectBrief } = useProject();

  if (!projectBrief || !projectBrief.techStack || projectBrief.techStack.length === 0) {
    return <p>No tech stack chosen yet.</p>;
  }

  return (
    <div className="card">
      <h2>{projectBrief.title}</h2>
      <div className="tech-stack">
        {projectBrief.techStack.map((tech, index) => (
          <span key={index} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ChosenStacks;
