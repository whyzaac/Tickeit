import React, { createContext, useState, useContext, ReactNode } from "react";
import {
  ProjectBrief,
  MeetingNote,
  Task,
  Role,
  ProjectContext as IProjectContext,
} from "../models/interfaces";

const ProjectContext = createContext<IProjectContext | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projectBrief, setProjectBrief] = useState<ProjectBrief | null>(null);
  const [meetingNotes, setMeetingNotes] = useState<MeetingNote[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const addMeetingNote = (note: MeetingNote) => {
    setMeetingNotes([...meetingNotes, note]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const selectRole = (role: Role) => {
    setSelectedRole(role);
  };

  return (
    <ProjectContext.Provider
      value={{
        projectBrief,
        meetingNotes,
        tasks,
        selectedRole,
        setProjectBrief,
        addMeetingNote,
        setTasks,
        updateTask,
        selectRole,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = (): IProjectContext => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
