import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import { UserCheck, Clock } from 'lucide-react';
import './attendance.css';

const Attendance = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="erp-app-shell">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="erp-body-layout">
        <Navbar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="module-main-content">
          <div className="module-header-card">
            <div className="header-icon-box">
              <UserCheck size={28} />
            </div>
            <div>
              <h2>Attendance Management</h2>
              <p>GPS-stamped check-in / check-out. Shift rosters and employee time logs.</p>
            </div>
          </div>

          <div className="module-placeholder-box">
            <Clock size={48} className="placeholder-icon" />
            <h3>Attendance Module Initialized</h3>
            <p>Phase 1 login and dashboard complete. Attendance features will be connected in Phase 2.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
