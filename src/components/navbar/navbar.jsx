import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ChevronsLeft, 
  ChevronsRight, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  Building 
} from 'lucide-react';
import './navbar.css';

const Navbar = ({ isCollapsed, toggleSidebar }) => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const userName = user?.name || 'Executive Office';
  const userRole = user?.role || 'CEO';
  const initial = userName.charAt(0).toUpperCase() || 'E';

  // Handle click outside to close the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

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
      <div className="navbar-right" ref={dropdownRef}>
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

        {/* Dropdown Card */}
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
