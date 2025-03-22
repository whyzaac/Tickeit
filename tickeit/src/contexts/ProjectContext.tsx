import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import {
  ProjectBrief,
  MeetingNote,
  Task,
  Role,
  ProjectContext as IProjectContext,
} from "../models/interfaces";
import { dataStore } from "../data/data";

const ProjectContext = createContext<IProjectContext | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use state to trigger re-renders, but get actual data from dataStore
  const [updateTrigger, setUpdateTrigger] = useState(0);
  
  // Force component update
  const forceUpdate = () => setUpdateTrigger(prev => prev + 1);
  
  // Get data from the store
  const projectBrief = dataStore.getProjectBrief();
  const meetingNotes = dataStore.getMeetingNotes();
  const tasks = dataStore.getTasks();
  const selectedRole = dataStore.getSelectedRole();

  const setProjectBrief = (brief: ProjectBrief) => {
    dataStore.setProjectBrief(brief);
    forceUpdate();
  };

  const addMeetingNote = (note: MeetingNote) => {
    dataStore.addMeetingNote(note);
    forceUpdate();
  };

  const setTasks = (newTasks: Task[]) => {
    dataStore.setTasks(newTasks);
    forceUpdate();
  };

  const updateTask = (updatedTask: Task) => {
    dataStore.updateTask(updatedTask);
    forceUpdate();
  };

  const selectRole = (role: Role | null) => {
    dataStore.selectRole(role);
    forceUpdate();
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
