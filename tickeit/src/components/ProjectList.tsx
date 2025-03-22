import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProjectListProps {
  onSelectProject: (projectId: number) => void; // Pass projectId to onSelectProject function
}

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
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

  return (
    <div className="project-list">
      <h3>Existing Projects:</h3>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="project-item">
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <button
              className="btn-secondary"
              onClick={() => onSelectProject(project.id)} // Pass project ID to the handler
            >
              Select Project
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
