
import { ProjectBrief, MeetingNote, Task, Role } from "../models/interfaces";

interface ProjectData {
  brief: ProjectBrief;
  meetingNotes: MeetingNote[];
  tasks: Task[];
  selectedRole: Role | null;
}

class DataStore {
  private projects: Map<string, ProjectData> = new Map();
  private currentProjectId: string | null = null;

  getCurrentProject(): ProjectData | null {
    if (!this.currentProjectId) return null;
    return this.projects.get(this.currentProjectId) || null;
  }

  setCurrentProject(projectId: string): void {
    if (this.projects.has(projectId)) {
      this.currentProjectId = projectId;
    }
  }

  getAllProjects(): { id: string, brief: ProjectBrief }[] {
    return Array.from(this.projects.entries()).map(([id, project]) => ({
      id,
      brief: project.brief
    }));
  }

  createProject(brief: ProjectBrief): string {
    const projectId = `project-${Date.now()}`;
    this.projects.set(projectId, {
      brief,
      meetingNotes: [],
      tasks: [],
      selectedRole: null
    });
    this.currentProjectId = projectId;
    return projectId;
  }

  deleteProject(projectId: string): boolean {
    if (this.projects.has(projectId)) {
      this.projects.delete(projectId);
      if (this.currentProjectId === projectId) {
        this.currentProjectId = null;
      }
      return true;
    }
    return false;
  }

  getProjectBrief(): ProjectBrief | null {
    const project = this.getCurrentProject();
    return project ? project.brief : null;
  }

  setProjectBrief(brief: ProjectBrief): void {
    const project = this.getCurrentProject();
    if (project) {
      project.brief = brief;
    }
  }

  getMeetingNotes(): MeetingNote[] {
    const project = this.getCurrentProject();
    return project ? project.meetingNotes : [];
  }

  addMeetingNote(note: MeetingNote): void {
    const project = this.getCurrentProject();
    if (project) {
      project.meetingNotes.push(note);
    }
  }

  getTasks(): Task[] {
    const project = this.getCurrentProject();
    return project ? project.tasks : [];
  }

  setTasks(tasks: Task[]): void {
    const project = this.getCurrentProject();
    if (project) {
      project.tasks = tasks;
    }
  }

  updateTask(updatedTask: Task): void {
    const project = this.getCurrentProject();
    if (project) {
      project.tasks = project.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
    }
  }

  addTasks(newTasks: Task[]): void {
    const project = this.getCurrentProject();
    if (project) {
      project.tasks = [...project.tasks, ...newTasks];
    }
  }

  getSelectedRole(): Role | null {
    const project = this.getCurrentProject();
    return project ? project.selectedRole : null;
  }

  selectRole(role: Role | null): void {
    const project = this.getCurrentProject();
    if (project) {
      project.selectedRole = role;
    }
  }

  resetStore(): void {
    this.projects.clear();
    this.currentProjectId = null;
  }

  isInitialized(): boolean {
    return this.projects.size > 0;
  }
}

export const dataStore = new DataStore();
