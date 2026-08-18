import React from 'react';
import { Receipt, DollarSign } from 'lucide-react';
import '../attendance/attendance.css';

const Expense = () => {
  return (
    <main className="module-main-content">
      <div className="module-header-card">
        <div className="header-icon-box">
          <Receipt size={28} />
        </div>
        <div>
          <h2>Expense Audits</h2>
          <p>Manufacturing procurement expenses, travel vouchers, and reimbursement claims.</p>
        </div>
      </div>
      <div className="module-placeholder-box">
        <DollarSign size={48} className="placeholder-icon" />
        <h3>Expense Module Ready</h3>
        <p>Phase 1 complete. Expense voucher and audit approval workflow will be configured next.</p>
      </div>
    </main>
  );
};

export default Expense;
