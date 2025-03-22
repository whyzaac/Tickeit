// src/components/MeetingNotesInput.tsx
import React, { useState } from "react";
import { useProject } from "../contexts/ProjectContext";
import { generateTasksFromContext } from "../services/aiService";

const MeetingNotesInput: React.FC = () => {
  const { projectBrief, meetingNotes, addMeetingNote, tasks, setTasks } =
    useProject();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !projectBrief) return;

    const newNote = {
      id: `note-${Date.now()}`,
      content,
      date: new Date(),
    };

    addMeetingNote(newNote);

    // Generate tasks from the meeting notes
    setIsLoading(true);
    try {
      const newTasks = await generateTasksFromContext(
        projectBrief,
        [...meetingNotes, newNote],
        tasks
      );

      setTasks([...tasks, ...newTasks]);
    } catch (error) {
      console.error("Error generating tasks:", error);
    } finally {
      setIsLoading(false);
    }

    setContent("");
  };

  if (!projectBrief) {
    return <p>Please set up your project brief first.</p>;
  }

  return (
    <div className="card">
      <h2>Meeting Notes</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="meetingNotes">
            Paste your meeting transcript or notes
          </label>
          <textarea
            id="meetingNotes"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your meeting notes here..."
            rows={10}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Generating Tasks..." : "Process Meeting Notes"}
        </button>
      </form>

      <div className="meeting-history">
        <h3>Previous Meeting Notes</h3>
        {meetingNotes.length === 0 ? (
          <p>No meeting notes yet.</p>
        ) : (
          meetingNotes.map((note) => (
            <div key={note.id} className="meeting-note">
              <p className="note-date">{note.date.toLocaleString()}</p>
              <p className="note-content">
                {note.content.substring(0, 100)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MeetingNotesInput;
