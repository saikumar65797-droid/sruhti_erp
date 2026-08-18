import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const ERPLayout = () => {
  const { pathname } = useLocation();
  const mainScrollRef = useRef(null);

  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      return true;
    }
    const saved = localStorage.getItem('sruthi_erp_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Scroll to top of page on every route navigation
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <div className="erp-main-scroll-view" ref={mainScrollRef}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ERPLayout;
