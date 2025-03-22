// src/models/interfaces.ts
export type Role = "frontend" | "backend" | "ai" | "pm" | "designer";

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedRole: Role;
  assignedUser: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export interface ProjectBrief {
  title: string;
  description: string;
  techStack: string[];
  teamMembers: TeamMember[];
  goals: string[];
}

export interface MeetingNote {
  id: string;
  content: string;
  date: Date;
}

export interface ProjectContext {
  projectBrief: ProjectBrief | null;
  meetingNotes: MeetingNote[];
  tasks: Task[];
  selectedRole: Role | null;
  setProjectBrief: (brief: ProjectBrief) => void;
  addMeetingNote: (note: MeetingNote) => void;
  setTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
  selectRole: (role: Role | null) => void;
}
