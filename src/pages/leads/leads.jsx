import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import { Target, TrendingUp } from 'lucide-react';
import '../attendance/attendance.css';

const Leads = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="erp-app-shell">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="erp-body-layout">
        <Navbar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />
        <main className="module-main-content">
          <div className="module-header-card">
            <div className="header-icon-box">
              <Target size={28} />
            </div>
            <div>
              <h2>Leads Management</h2>
              <p>Client pipeline, manufacturing contract leads, and CRM interactions.</p>
            </div>
          </div>
          <div className="module-placeholder-box">
            <TrendingUp size={48} className="placeholder-icon" />
            <h3>Leads Module Ready</h3>
            <p>Phase 1 complete. Lead acquisition pipeline will be configured next.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leads;
