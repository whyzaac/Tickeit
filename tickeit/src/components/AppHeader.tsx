// src/components/AppHeader.tsx
import React from "react";
import { useProject } from "../contexts/ProjectContext";

const AppHeader: React.FC = () => {
  const { projectBrief } = useProject();

  return (
    <header className="app-header">
      <div className="logo">
        <h1>TickeIt AI</h1>
      </div>

     
    </header>
  );
};

export default AppHeader;
