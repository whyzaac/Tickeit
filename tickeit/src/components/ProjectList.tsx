// src/components/ProjectList.tsx
import React, { useEffect, useState } from "react";
import { dataStore } from "../data/data";
import { ProjectBrief } from "../models/interfaces";

interface ProjectListProps {
  onSelectProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<{ id: string; brief: ProjectBrief }[]>([]);

  useEffect(() => {
    // Fetch projects only once when the component mounts
    refreshProjects();
  }, []);

  const refreshProjects = () => {
    const allProjects = dataStore.getAllProjects();
    setProjects(allProjects);
  };

  const handleSelectProject = (projectId: string) => {
    dataStore.setCurrentProject(projectId);
    onSelectProject(projectId);
  };

  const handleDeleteProject = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    if (dataStore.deleteProject(projectId)) {
      refreshProjects();
    }
  };

  if (projects.length === 0) {
    return (
      <div className="empty-projects">
        <p>You don't have any projects yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-card"
          onClick={() => handleSelectProject(project.id)}
        >
          <h3>{project.brief.title}</h3>
          <p>{project.brief.description.substring(0, 100)}...</p>
          <div className="tech-stack">
            {project.brief.techStack.map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
          <button
            className="btn-delete"
            onClick={(e) => handleDeleteProject(e, project.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
