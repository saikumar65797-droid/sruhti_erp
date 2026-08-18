import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard,
  Clock, 
  Ticket, 
  Target, 
  CheckSquare, 
  Palmtree, 
  Receipt,
  CalendarDays,
  LogOut
} from 'lucide-react';
import logo from '../../assets/logo.png';
import './sidebar.css';

const Sidebar = ({ isCollapsed }) => {
  const { logout } = useAuth();

  // Menu items in exact requested order:
  // dashboard, attendance, tickets, leads, tasks, leave, expense, calendar
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Attendance', path: '/attendance', icon: Clock },
    { name: 'Tickets', path: '/tickets', icon: Ticket },
    { name: 'Leads', path: '/leads', icon: Target },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Leave', path: '/leave', icon: Palmtree },
    { name: 'Expense', path: '/expense', icon: Receipt },
    { name: 'Calendar', path: '/calendar', icon: CalendarDays },
  ];

  return (
    <aside className={`screenshot-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Top Logo Area */}
      {!isCollapsed ? (
        <div className="sidebar-logo-container">
          <img src={logo} alt="Sruthi Technologies" className="sidebar-brand-logo" />
          <div className="sidebar-divider">
            <span className="divider-line"></span>
            <span className="divider-text">MANUFACTURING ERP</span>
            <span className="divider-line"></span>
          </div>
        </div>
      ) : (
        <div className="sidebar-logo-collapsed">
          <div className="collapsed-logo-badge" title="Sruthi Technologies">
            <img src={logo} alt="Sruthi Logo" className="collapsed-brand-img" />
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="sidebar-nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={item.name}
              className={({ isActive }) => 
                `screenshot-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <div className="nav-item-icon-wrapper">
                <Icon size={19} className="screenshot-nav-icon" />
              </div>
              {!isCollapsed && <span className="screenshot-nav-label">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Logout Button */}
      <div className="sidebar-bottom-action">
        <button 
          className="sidebar-logout-btn" 
          onClick={logout}
          title="Logout"
        >
          <div className="nav-item-icon-wrapper">
            <LogOut size={19} className="logout-icon" />
          </div>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
