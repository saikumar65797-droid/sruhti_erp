import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const ERPLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // If screen width is mobile/tablet, default to collapsed
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      return true;
    }
    const saved = localStorage.getItem('sruthi_erp_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle window resize auto-adjustment
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => {
        const nextState = !prev;
        localStorage.setItem('sruthi_erp_sidebar_collapsed', JSON.stringify(nextState));
        return nextState;
      });
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <div className="erp-app-shell">
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          className="mobile-sidebar-backdrop" 
          onClick={closeMobileSidebar}
        />
      )}

      <Sidebar 
        isCollapsed={isCollapsed} 
        isMobileOpen={isMobileOpen}
        closeMobileSidebar={closeMobileSidebar}
      />

      <div className="erp-body-layout">
        <Navbar 
          isCollapsed={isCollapsed} 
          isMobileOpen={isMobileOpen}
          toggleSidebar={toggleSidebar} 
        />
        <div className="erp-main-scroll-view">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ERPLayout;
