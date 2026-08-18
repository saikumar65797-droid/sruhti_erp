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
  LogOut,
  X
} from 'lucide-react';
import logo from '../../assets/logo.png';
import './sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen, closeMobileSidebar }) => {
  const { logout } = useAuth();

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

  const handleNavClick = () => {
    if (closeMobileSidebar) {
      closeMobileSidebar();
    }
  };

  return (
    <aside className={`screenshot-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Top Logo Area (Mobile & Desktop) */}
      {(!isCollapsed || isMobileOpen) ? (
        <div className="sidebar-logo-container">
          <div className="logo-header-row">
            <img src={logo} alt="Sruthi Technologies" className="sidebar-brand-logo" />
            {isMobileOpen && (
              <button 
                className="mobile-close-btn" 
                onClick={closeMobileSidebar}
                title="Close Menu"
              >
                <X size={20} />
              </button>
            )}
          </div>
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
              onClick={handleNavClick}
              className={({ isActive }) => 
                `screenshot-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <div className="nav-item-icon-wrapper">
                <Icon size={19} className="screenshot-nav-icon" />
              </div>
              {(!isCollapsed || isMobileOpen) && <span className="screenshot-nav-label">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Logout Button */}
      <div className="sidebar-bottom-action">
        <button 
          className="sidebar-logout-btn" 
          onClick={() => {
            handleNavClick();
            logout();
          }}
          title="Logout"
        >
          <div className="nav-item-icon-wrapper">
            <LogOut size={19} className="logout-icon" />
          </div>
          {(!isCollapsed || isMobileOpen) && <span className="sidebar-logout-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
