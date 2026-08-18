import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import { Ticket, Wrench } from 'lucide-react';
import '../attendance/attendance.css';

const Tickets = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="erp-app-shell">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="erp-body-layout">
        <Navbar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="module-main-content">
          <div className="module-header-card">
            <div className="header-icon-box">
              <Ticket size={28} />
            </div>
            <div>
              <h2>Tickets Management</h2>
              <p>Support desk, machinery breakdown alerts, and technical issue tickets.</p>
            </div>
          </div>
          <div className="module-placeholder-box">
            <Wrench size={48} className="placeholder-icon" />
            <h3>Tickets Module Ready</h3>
            <p>Phase 1 complete. Detailed ticket dispatch system will be configured next.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tickets;
