import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  Building, 
  Ban, 
  User 
} from 'lucide-react';
import './navbar.css';

const Navbar = ({ isCollapsed, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const userName = user?.name || 'Executive CEO';
  const userRole = user?.role || 'CEO';
  const initial = userName.charAt(0).toUpperCase() || 'D';

  return (
    <header className="screenshot-navbar">
      {/* Left side: Sidebar collapse toggle icon « */}
      <div className="navbar-left">
        <button 
          className="collapse-toggle-btn" 
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Right side: User Profile Badge & Dropdown */}
      <div className="navbar-right">
        <div 
          className="user-profile-badge" 
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="avatar-circle">
            <span>{initial}</span>
          </div>
          <div className="user-text-meta">
            <span className="user-fullname">{userName}</span>
            <span className="user-role-label">{userRole}</span>
          </div>
          {showDropdown ? (
            <ChevronUp size={14} className="dropdown-caret" />
          ) : (
            <ChevronDown size={14} className="dropdown-caret" />
          )}
        </div>

        {/* Dropdown Card matching Screenshot 3 */}
        {showDropdown && (
          <div className="profile-dropdown-card">
            <div className="dropdown-profile-header">
              <div className="avatar-circle dropdown-avatar">
                <span>{initial}</span>
              </div>
              <div className="user-text-meta">
                <span className="user-fullname">{userName}</span>
                <span className="user-role-label">{userRole}</span>
              </div>
            </div>

            <div className="dropdown-menu-list">
              <div className="dropdown-item">
                <Bell size={18} className="dropdown-item-icon" />
                <span>Notifications</span>
              </div>

              <div className="dropdown-item">
                <Building size={18} className="dropdown-item-icon" />
                <span>Organization</span>
              </div>

              <div className="dropdown-divider"></div>

              <div 
                className="dropdown-item signout-item" 
                onClick={() => {
                  setShowDropdown(false);
                  logout();
                }}
              >
                <Ban size={18} className="signout-icon" />
                <span>Sign out</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
