import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProjectListProps {
  onSelectProject: (projectId: number) => void; // Pass projectId to onSelectProject function
}

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[] | string; // Allow techStack to be a string or an array
  goals: string[];
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects from the backend when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/project-brief');
        setProjects(response.data.data); // Assuming the data comes in the 'data' property
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Function to delete a project both from the UI and backend
  const handleDeleteProject = async (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation(); // Prevent triggering the parent onClick

    try {
      // Delete project from the backend
      await axios.delete(`http://localhost:5001/api/project-brief/${projectId}`);

      // Remove the project from the UI state (optimistic UI update)
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));

      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
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
          onClick={() => onSelectProject(project.id)}
        >
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tech-stack">
            {/* Ensure techStack is treated as an array */}
            {(Array.isArray(project.techStack) ? project.techStack : [project.techStack]).map(
              (tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              )
            )}
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
