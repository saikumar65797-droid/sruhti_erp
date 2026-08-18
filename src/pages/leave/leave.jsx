import React from 'react';
import { Palmtree, Calendar } from 'lucide-react';
import '../attendance/attendance.css';

const Leave = () => {
  return (
    <main className="module-main-content">
      <div className="module-header-card">
        <div className="header-icon-box">
          <Palmtree size={28} />
        </div>
        <div>
          <h2>Leave Portal</h2>
          <p>Employee leave applications, holiday calendars, and approval workflows.</p>
        </div>
      </div>
      <div className="module-placeholder-box">
        <Calendar size={48} className="placeholder-icon" />
        <h3>Leave Portal Ready</h3>
        <p>Phase 1 complete. Leave application system will be configured next.</p>
      </div>
    </main>
  );
};

export default Leave;
