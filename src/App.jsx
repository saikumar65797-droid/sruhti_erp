import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ERPLayout from './components/layout/ERPLayout';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import Attendance from './pages/attendance/attendance';
import Tickets from './pages/tickets/tickets';
import Leads from './pages/leads/leads';
import Tasks from './pages/tasks/tasks';
import Leave from './pages/leave/leave';
import Expense from './pages/expense/expense';

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Public Route Guard (Redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      
      {/* Protected ERP Shell Layout */}
      <Route element={<ProtectedRoute><ERPLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/expense" element={<Expense />} />
      </Route>

      {/* Fallback to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
