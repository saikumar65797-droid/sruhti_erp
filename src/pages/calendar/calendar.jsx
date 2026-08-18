import React from 'react';
import { CalendarDays } from 'lucide-react';
import '../attendance/attendance.css';

const Calendar = () => {
  return (
    <main className="module-main-content">
      <div className="module-header-card">
        <div className="header-icon-box">
          <CalendarDays size={28} />
        </div>
        <div>
          <h2>Calendar & Schedules</h2>
          <p>Shift rosters, plant holiday calendar, and event schedules.</p>
        </div>
      </div>
      <div className="module-placeholder-box">
        <CalendarDays size={48} className="placeholder-icon" />
        <h3>Calendar Module Ready</h3>
        <p>Phase 1 complete. Company calendar and event schedules will be configured next.</p>
      </div>
    </main>
  );
};

export default Calendar;
