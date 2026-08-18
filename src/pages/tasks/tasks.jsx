import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import { CheckSquare, ListTodo } from 'lucide-react';
import '../attendance/attendance.css';

const Tasks = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="erp-app-shell">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="erp-body-layout">
        <Navbar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="module-main-content">
          <div className="module-header-card">
            <div className="header-icon-box">
              <CheckSquare size={28} />
            </div>
            <div>
              <h2>Task Management</h2>
              <p>Plant production assignments, shop floor tasks, and deadlines.</p>
            </div>
          </div>
          <div className="module-placeholder-box">
            <ListTodo size={48} className="placeholder-icon" />
            <h3>Task Module Ready</h3>
            <p>Phase 1 complete. Task delegation board will be configured next.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
