import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import { 
  Ticket, 
  Target, 
  CheckSquare, 
  UserCheck, 
  CalendarOff, 
  Receipt,
  Sparkles,
  TrendingUp,
  Activity,
  CheckCircle2,
  Boxes
} from 'lucide-react';
import './dashboard.css';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const kpiStats = [
    { title: 'Open Tickets', count: '14 Active', icon: Ticket, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
    { title: 'New Leads', count: '28 Leads', icon: Target, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
    { title: 'Tasks Pending', count: '09 Pending', icon: CheckSquare, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
    { title: 'Attendance Today', count: '98% Present', icon: UserCheck, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
    { title: 'Leave Requests', count: '03 Pending', icon: CalendarOff, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
    { title: 'Expense Audits', count: '$12,450', icon: Receipt, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
  ];

  return (
    <div className="erp-app-shell">
      <Sidebar isCollapsed={isCollapsed} />
      
      <div className="erp-body-layout">
        <Navbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

        <main className="dashboard-main-content">
          {/* Main Hero Banner with logo combination gradient */}
          <div className="dashboard-hero-banner">
            <div className="banner-left">
              <div className="banner-badge">
                <Sparkles size={14} className="badge-sparkle" />
                <span>SRUTHI TECHNOLOGIES ERP ONLINE</span>
              </div>
              
              {/* Mandatory requested text string */}
              <h1 className="requested-dashboard-text">this is a dashboard page</h1>
              
              <p className="banner-subtitle">
                Welcome to Sruthi Technologies Manufacturing Operations Unit. Integrated management suite for tickets, leads, tasks, attendance, leave, and expenses.
              </p>
            </div>

            <div className="banner-right">
              <div className="banner-stat-box">
                <Activity size={26} className="banner-stat-icon" />
                <div className="stat-meta">
                  <span className="stat-val">Plant Unit 01</span>
                  <span className="stat-lbl">Active Operating Node</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick ERP KPI Grid Overview */}
          <div className="kpi-grid">
            {kpiStats.map((kpi, idx) => {
              const IconComp = kpi.icon;
              return (
                <div key={idx} className="kpi-card">
                  <div className="kpi-top">
                    <span className="kpi-title">{kpi.title}</span>
                    <div className="kpi-icon-wrapper" style={{ background: kpi.badgeColor, color: kpi.color }}>
                      <IconComp size={20} />
                    </div>
                  </div>
                  <div className="kpi-bottom">
                    <span className="kpi-value">{kpi.count}</span>
                    <div className="kpi-trend" style={{ color: kpi.color }}>
                      <TrendingUp size={14} />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Modules Status Panel */}
          <div className="modules-status-card">
            <div className="card-header-flex">
              <div className="title-with-icon">
                <Boxes size={22} className="header-icon-navy" />
                <h3>Manufacturing ERP Core Modules</h3>
              </div>
              <span className="badge-active-white">
                <CheckCircle2 size={14} />
                All Systems Connected
              </span>
            </div>
            
            <div className="modules-list">
              {[
                { name: 'Tickets Module', code: '/tickets', icon: Ticket, color: 'icon-red' },
                { name: 'Leads Pipeline', code: '/leads', icon: Target, color: 'icon-navy' },
                { name: 'Task Allocator', code: '/tasks', icon: CheckSquare, color: 'icon-cyan' },
                { name: 'Attendance System', code: '/attendance', icon: UserCheck, color: 'icon-red' },
                { name: 'Leave Portal', code: '/leave', icon: CalendarOff, color: 'icon-navy' },
                { name: 'Expense Manager', code: '/expense', icon: Receipt, color: 'icon-cyan' },
              ].map((mod, i) => {
                const ModIcon = mod.icon;
                return (
                  <div key={i} className="module-status-row">
                    <div className="row-left">
                      <ModIcon size={18} className={`mod-item-icon ${mod.color}`} />
                      <span className="mod-name">{mod.name}</span>
                      <span className="mod-path">{mod.code}</span>
                    </div>
                    <div className="row-right">
                      <CheckCircle2 size={16} className="check-green" />
                      <span className="mod-status">Operational</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
