import React from 'react';
import { Ticket, Wrench } from 'lucide-react';
import '../attendance/attendance.css';

const Tickets = () => {
  return (
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
  );
};

export default Tickets;
