import React, { useState } from "react";
import { useProject } from "../contexts/ProjectContext";
import Select from "react-select";
import axios from 'axios'; // Import axios for API requests

// Combine availableTechStacks with your current tech stack options
const availableTechStacks = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Next.js",
  "Vue.js",
  "Angular",
  "Python",
  "Django",
  "Flask",
  "AWS",
  "Docker",
  "Kubernetes"
];

const roleOptions = [
  { value: "frontend", label: "frontend" },
  { value: "backend", label: "backend" },
];

const techOptions = availableTechStacks.map((tech) => ({
  value: tech,
  label: tech
}));

type Role = "frontend" | "backend";

interface TeamMember {
  id: string;
  name: string;
  role: Role;
}

const ProjectBriefForm: React.FC = () => {
  const { setProjectBrief } = useProject();  // This might be used if you're storing the brief in a context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "member-1", name: "", role: "frontend" as Role },
  ]);
  const [goals, setGoals] = useState("");

  const handleTechChange = (selectedOptions: any) => {
    setTechStack(selectedOptions ? selectedOptions.map((option: any) => option.value) : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert goals to an array (splitting by newline) and filter empty lines
    const goalsArray = goals.split("\n").filter((goal) => goal.trim() !== "");
    
    try {
      // Send the project data to the backend
      await axios.post('http://localhost:5001/api/project-brief', {
        title,
        description,
        techStack,
        teamMembers,
        goals: goalsArray,
      });

      // Optionally, clear the form after submission
      setTitle('');
      setDescription('');
      setTechStack([]);
      setTeamMembers([{ id: "member-1", name: "", role: "frontend" as Role }]);
      setGoals('');

      // If you're saving to a context (like `useProject`), update it here:
      setProjectBrief({
        title,
        description,
        techStack,
        teamMembers,
        goals: goalsArray,
      });

      // Optionally, you can add feedback or other actions after the submission is successful
      alert("Project Brief saved successfully!");

    } catch (error) {
      console.error("Error submitting project brief:", error);
    }
  };

  // Update Team Member
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers];
    if (field === "role") {
      updatedMembers[index][field] = value as Role;  // Cast to Role
    } else {
      updatedMembers[index][field] = value;
    }
    setTeamMembers(updatedMembers);
  };

  // Add New Team Member
  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { id: `member-${teamMembers.length + 1}`, name: "", role: "frontend" as Role },
    ]);
  };

  return (
    <div className="card p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Project Brief</h2>
      <form onSubmit={handleSubmit}>

        {/* Project Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Project Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Project Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Project Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <label htmlFor="techStack" className="block text-sm font-medium">Tech Stack</label>
          <Select
            id="techStack"
            isMulti
            options={techOptions}
            value={techStack.map((tech) => ({ value: tech, label: tech }))}
            onChange={handleTechChange}
            placeholder="Select Tech Stack"
            className="mt-1"
          />
        </div>

        {/* Team Member Inputs */}
        <div className="mb-4">
          <label htmlFor="teamMembers" className="block text-sm font-medium">Add Team Members (Name and Role)</label>
          <div className="space-y-4">
            {/* Loop through the team members */}
            {teamMembers.map((member, index) => (
              <div key={index} className="flex space-y-4 mb-4">
                {/* Name Input */}
                <input
                  type="text"
                  placeholder={`Enter Name ${index + 1}`}
                  value={member.name}
                  onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                  className="p-3 border border-gray-300 rounded-md w-full"
                />
                {/* Role Dropdown */}
                <Select
                  value={{ value: member.role, label: member.role }}
                  onChange={(selectedOption) => handleTeamMemberChange(index, "role", selectedOption?.value || "")}
                  options={roleOptions}
                  className="w-40"
                />
              </div>
            ))}
          </div>
          {/* Add Team Member Button */}
          <button
            type="button"
            onClick={addTeamMember}
            className="btn-primary"
          >
            Add Team Member
          </button>
        </div>

        {/* Project Goals */}
        <div className="form-group">
          <label htmlFor="goals" className="block text-sm font-medium">Project Goals (one per line)</label>
          <textarea
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Create a functional MVP\nImplement user authentication\nDeploy to production"
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="btn-primary">
          Save Project Brief
        </button>
      </form>
    </div>
  );
};

export default ProjectBriefForm;
