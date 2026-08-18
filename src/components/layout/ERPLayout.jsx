import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const ERPLayout = () => {
  // Save collapsed state in localStorage so it persists across refreshes & navigation
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sruthi_erp_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const nextState = !prev;
      localStorage.setItem('sruthi_erp_sidebar_collapsed', JSON.stringify(nextState));
      return nextState;
    });
  };

  return (
    <div className="erp-app-shell">
      <Sidebar isCollapsed={isCollapsed} />
      <div className="erp-body-layout">
        <Navbar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default ERPLayout;
