// src/components/AIStandupChat.tsx
import React, { useState } from "react";
import { useProject } from "../contexts/ProjectContext";
import { getAIStandupResponse } from "../services/aiService";
import { Role } from "../models/interfaces";

const AIStandupChat: React.FC = () => {
  const { projectBrief, tasks, meetingNotes, selectedRole } = useProject();
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!projectBrief || !selectedRole) {
    return (
      <div className="ai-standup-chat card">
        <h2>AI Stand-Up</h2>
        <p>Please select a role to get personalized guidance.</p>
      </div>
    );
  }

  const handleStandupRequest = async () => {
    setIsLoading(true);
    try {
      const aiResponse = await getAIStandupResponse(
        selectedRole,
        projectBrief,
        tasks,
        meetingNotes
      );
      setResponse(aiResponse);
    } catch (error) {
      console.error("Error getting AI standup response:", error);
      setResponse(
        "Sorry, I encountered an error while generating your standup guidance."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-standup-chat card">
      <h2>AI Stand-Up</h2>
      <p className="standup-intro">
        Ask the AI what you should work on today as a {selectedRole}.
      </p>

      <button
        className="btn-primary"
        onClick={handleStandupRequest}
        disabled={isLoading}
      >
        {isLoading ? "Thinking..." : "What should I work on today?"}
      </button>

      {response && (
        <div className="standup-response">
          <h3>Your priorities today:</h3>
          <div className="response-content">
            {response.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIStandupChat;
