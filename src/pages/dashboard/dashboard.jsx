import React from 'react';
import { useAuth } from '../../context/AuthContext';
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
  Boxes,
  User,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import './dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const role = user?.role || 'CEO';
  const name = user?.name || 'Executive Office';
  const empId = user?.employeeId || 'ST-CEO-001';
  const department = user?.department || 'Executive';
  const clusterId = user?.clusterId || null;

  // Role-based KPI stats generator
  const getKpiStatsForRole = () => {
    switch (role) {
      case 'SALES_ENGINEER':
        return [
          { title: 'My Sales Leads', count: '8 Assigned', icon: Target, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
          { title: 'My Quotations', count: '4 Active', icon: Receipt, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
          { title: 'Pending Tasks', count: '3 Tasks', icon: CheckSquare, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
          { title: 'My Deals Value', count: '$142,500', icon: TrendingUp, color: '#10B981', badgeColor: 'rgba(16, 185, 129, 0.08)' },
        ];
      case 'SALES_MANAGER':
        return [
          { title: 'Team Sales Leads', count: '16 Total', icon: Target, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
          { title: 'Assigned Engineers', count: '2 Sales Engs', icon: Users, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
          { title: 'Team Quotations', count: '8 Sent', icon: Receipt, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
          { title: 'Pipeline Target', count: '$380,000', icon: TrendingUp, color: '#10B981', badgeColor: 'rgba(16, 185, 129, 0.08)' },
        ];
      case 'SERVICE_ENGINEER':
        return [
          { title: 'My Cluster Tickets', count: '4 Open', icon: Ticket, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
          { title: 'Assigned Cluster', count: clusterId || 'CLUSTER-001', icon: Building2, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
          { title: 'Attendance Today', count: 'Present', icon: UserCheck, color: '#10B981', badgeColor: 'rgba(16, 185, 129, 0.08)' },
          { title: 'Resolved This Week', count: '6 Resolved', icon: CheckSquare, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
        ];
      case 'CLUSTER_INCHARGE':
        return [
          { title: 'Cluster Total Tickets', count: '12 Active', icon: Ticket, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
          { title: 'Managed Cluster', count: clusterId || 'CLUSTER-001', icon: Building2, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
          { title: 'Cluster Engineers', count: '3 Engineers', icon: Users, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
          { title: 'Cluster SLA Score', count: '96% Met', icon: TrendingUp, color: '#10B981', badgeColor: 'rgba(16, 185, 129, 0.08)' },
        ];
      case 'SERVICE_MANAGER':
        return [
          { title: 'Managed Clusters', count: '2 Clusters', icon: Building2, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
          { title: 'Service Tickets', count: '24 Total', icon: Ticket, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
          { title: 'Cluster Incharges', count: '2 Incharges', icon: Users, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
          { title: 'Service Engineers', count: '6 Engineers', icon: UserCheck, color: '#10B981', badgeColor: 'rgba(16, 185, 129, 0.08)' },
        ];
      case 'HEAD_OF_BUSINESS':
      case 'CEO':
      default:
        return [
          { title: 'Enterprise Leads', count: '32 Active', icon: Target, color: '#D32F2F', badgeColor: 'rgba(211, 47, 47, 0.08)' },
          { title: 'Service Tickets', count: '32 Tickets', icon: Ticket, color: '#0F2137', badgeColor: 'rgba(15, 33, 55, 0.08)' },
          { title: 'Org Employees', count: '21 Users', icon: Users, color: '#00838F', badgeColor: 'rgba(0, 188, 212, 0.08)' },
          { title: 'Active Clusters', count: '3 Clusters', icon: Building2, color: '#10B981', badgeColor: 'rgba(16, 185, 129, 0.08)' },
        ];
    }
  };

  const kpiStats = getKpiStatsForRole();

  return (
    <main className="dashboard-main-content">
      {/* Main Hero Banner */}
      <div className="dashboard-hero-banner">
        <div className="banner-left">
          <div className="banner-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>ROLE SCOPE: {role} • {empId}</span>
          </div>
          
          {/* Mandatory requested text string */}
          <h1 className="requested-dashboard-text">this is a dashboard page</h1>
          
          <p className="banner-subtitle">
            Welcome back, <strong>{name}</strong> ({role}). You are accessing Sruthi Technologies Manufacturing ERP under department: <strong>{department}</strong>.
          </p>
        </div>

        <div className="banner-right">
          <div className="banner-stat-box">
            <ShieldCheck size={26} className="banner-stat-icon" />
            <div className="stat-meta">
              <span className="stat-val">{role}</span>
              <span className="stat-lbl">Role Authorization Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Specific KPI Grid Overview */}
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
                  <span>Authorized</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Organizational Hierarchy Scope Panel */}
      <div className="modules-status-card">
        <div className="card-header-flex">
          <div className="title-with-icon">
            <Boxes size={22} className="header-icon-navy" />
            <h3>Organizational Hierarchy Scope — {role}</h3>
          </div>
          <span className="badge-active-white">
            <CheckCircle2 size={14} />
            Data Scope Active
          </span>
        </div>
        
        <div className="modules-list">
          {[
            { name: 'Active User Profile', detail: `${name} (${empId})`, status: 'Authenticated' },
            { name: 'Role Permission Level', detail: role, status: 'Active' },
            { name: 'Assigned Department', detail: department, status: 'Active' },
            { name: 'Reporting Line Manager', detail: user?.reportsTo ? `Reports to ${user.reportsTo}` : 'Top Organizational Executive', status: 'Verified' },
            { name: 'Assigned Plant Cluster', detail: clusterId ? `Assigned to ${clusterId}` : 'All Plant Clusters', status: 'Scoped' },
          ].map((item, i) => (
            <div key={i} className="module-status-row">
              <div className="row-left">
                <CheckCircle2 size={18} className="check-green" />
                <span className="mod-name">{item.name}</span>
                <span className="mod-path">{item.detail}</span>
              </div>
              <div className="row-right">
                <span className="mod-status">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
