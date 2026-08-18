import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  KeyRound, 
  CheckCircle2,
  Building2,
  ShieldCheck,
  X,
  Sparkles,
  Users,
  UserCheck,
  Ticket,
  Target,
  CheckSquare,
  CalendarOff,
  Receipt
} from 'lucide-react';
import logo from '../../assets/logo.png';
import './login.css';

const DEMO_ACCOUNTS = [
  // CEO & HOB
  { role: 'CEO', name: 'Rajesh Kumar', email: 'ceo@sruthitech-demo.com', empId: 'ST-CEO-001', dept: 'Executive', reportsTo: null },
  { role: 'HEAD_OF_BUSINESS', name: 'Anil Reddy', email: 'hob@sruthitech-demo.com', empId: 'ST-HOB-001', dept: 'Executive', reportsTo: 'ST-CEO-001' },
  // Sales Managers
  { role: 'SALES_MANAGER', name: 'Suresh Babu (SM 1)', email: 'salesmanager1@sruthitech-demo.com', empId: 'ST-SM-001', dept: 'Sales', reportsTo: 'ST-HOB-001' },
  { role: 'SALES_MANAGER', name: 'Priya Sharma (SM 2)', email: 'salesmanager2@sruthitech-demo.com', empId: 'ST-SM-002', dept: 'Sales', reportsTo: 'ST-HOB-001' },
  // Sales Engineers
  { role: 'SALES_ENGINEER', name: 'Arjun Rao (SE 1)', email: 'salesengineer1@sruthitech-demo.com', empId: 'ST-SE-001', dept: 'Sales', reportsTo: 'ST-SM-001' },
  { role: 'SALES_ENGINEER', name: 'Naveen Kumar (SE 2)', email: 'salesengineer2@sruthitech-demo.com', empId: 'ST-SE-002', dept: 'Sales', reportsTo: 'ST-SM-001' },
  { role: 'SALES_ENGINEER', name: 'Kiran Patel (SE 3)', email: 'salesengineer3@sruthitech-demo.com', empId: 'ST-SE-003', dept: 'Sales', reportsTo: 'ST-SM-002' },
  { role: 'SALES_ENGINEER', name: 'Rahul Verma (SE 4)', email: 'salesengineer4@sruthitech-demo.com', empId: 'ST-SE-004', dept: 'Sales', reportsTo: 'ST-SM-002' },
  // Service Managers
  { role: 'SERVICE_MANAGER', name: 'Mahesh Reddy (SVM 1)', email: 'servicemanager1@sruthitech-demo.com', empId: 'ST-SVM-001', dept: 'Service', reportsTo: 'ST-HOB-001' },
  { role: 'SERVICE_MANAGER', name: 'Lakshmi Devi (SVM 2)', email: 'servicemanager2@sruthitech-demo.com', empId: 'ST-SVM-002', dept: 'Service', reportsTo: 'ST-HOB-001' },
  // Cluster Incharges
  { role: 'CLUSTER_INCHARGE', name: 'Venkat Rao (Cluster 1)', email: 'cluster1@sruthitech-demo.com', empId: 'ST-CI-001', dept: 'Service', reportsTo: 'ST-SVM-001', clusterId: 'CLUSTER-001' },
  { role: 'CLUSTER_INCHARGE', name: 'Sanjay Kumar (Cluster 2)', email: 'cluster2@sruthitech-demo.com', empId: 'ST-CI-002', dept: 'Service', reportsTo: 'ST-SVM-001', clusterId: 'CLUSTER-002' },
  { role: 'CLUSTER_INCHARGE', name: 'Ramesh Naidu (Cluster 3)', email: 'cluster3@sruthitech-demo.com', empId: 'ST-CI-003', dept: 'Service', reportsTo: 'ST-SVM-002', clusterId: 'CLUSTER-003' },
  // Service Engineers
  { role: 'SERVICE_ENGINEER', name: 'Ajay Kumar (SVE 1)', email: 'serviceengineer1@sruthitech-demo.com', empId: 'ST-SVE-001', dept: 'Service', reportsTo: 'ST-CI-001', clusterId: 'CLUSTER-001' },
  { role: 'SERVICE_ENGINEER', name: 'Vamsi Krishna (SVE 2)', email: 'serviceengineer2@sruthitech-demo.com', empId: 'ST-SVE-002', dept: 'Service', reportsTo: 'ST-CI-001', clusterId: 'CLUSTER-001' },
  { role: 'SERVICE_ENGINEER', name: 'Rohit Singh (SVE 3)', email: 'serviceengineer3@sruthitech-demo.com', empId: 'ST-SVE-003', dept: 'Service', reportsTo: 'ST-CI-001', clusterId: 'CLUSTER-001' },
  { role: 'SERVICE_ENGINEER', name: 'Karthik Reddy (SVE 4)', email: 'serviceengineer4@sruthitech-demo.com', empId: 'ST-SVE-004', dept: 'Service', reportsTo: 'ST-CI-002', clusterId: 'CLUSTER-002' },
  { role: 'SERVICE_ENGINEER', name: 'Manish Kumar (SVE 5)', email: 'serviceengineer5@sruthitech-demo.com', empId: 'ST-SVE-005', dept: 'Service', reportsTo: 'ST-CI-002', clusterId: 'CLUSTER-002' },
  { role: 'SERVICE_ENGINEER', name: 'Harish Rao (SVE 6)', email: 'serviceengineer6@sruthitech-demo.com', empId: 'ST-SVE-006', dept: 'Service', reportsTo: 'ST-CI-002', clusterId: 'CLUSTER-002' },
  { role: 'SERVICE_ENGINEER', name: 'Praveen Kumar (SVE 7)', email: 'serviceengineer7@sruthitech-demo.com', empId: 'ST-SVE-007', dept: 'Service', reportsTo: 'ST-CI-003', clusterId: 'CLUSTER-003' },
  { role: 'SERVICE_ENGINEER', name: 'Tarun Reddy (SVE 8)', email: 'serviceengineer8@sruthitech-demo.com', empId: 'ST-SVE-008', dept: 'Service', reportsTo: 'ST-CI-003', clusterId: 'CLUSTER-003' },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showRoleSelectorModal, setShowRoleSelectorModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSelectDemoUser = (userAcc) => {
    setEmail(userAcc.email);
    setPassword('Demo@123');
    setError('');
    setShowRoleSelectorModal(false);

    // Auto login
    login({
      employeeId: userAcc.empId,
      email: userAcc.email,
      name: userAcc.name,
      role: userAcc.role,
      department: userAcc.dept,
      reportsTo: userAcc.reportsTo,
      clusterId: userAcc.clusterId || null,
    });
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setError('Please enter both Email Address and Password.');
      setLoading(false);
      return;
    }

    // Find account in DEMO_ACCOUNTS
    const foundAcc = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase().trim()
    );

    setTimeout(() => {
      if (foundAcc && (password === 'Demo@123' || password === 'admin123@')) {
        login({
          employeeId: foundAcc.empId,
          email: foundAcc.email,
          name: foundAcc.name,
          role: foundAcc.role,
          department: foundAcc.dept,
          reportsTo: foundAcc.reportsTo,
          clusterId: foundAcc.clusterId || null,
        });
        setLoading(false);
        navigate('/dashboard');
      } else if (email === 'ceo@erp.example' && password === 'admin123@') {
        login({
          employeeId: 'ST-CEO-001',
          email: 'ceo@erp.example',
          name: 'Rajesh Kumar',
          role: 'CEO',
          department: 'Executive',
          reportsTo: null,
        });
        setLoading(false);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Password for demo accounts is "Demo@123".');
        setLoading(false);
      }
    }, 400);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      return;
    }
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setShowForgotModal(false);
      setResetEmail('');
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login-content-wrapper">
        {/* Left Hero Panel */}
        <div className="login-hero-panel">
          <div className="hero-brand">
            <div className="logo-wrapper">
              <img src={logo} alt="Sruthi Technologies" className="hero-logo" />
            </div>
            <div className="hero-titles">
              <h2>SRUTHI TECHNOLOGIES</h2>
              <p className="hero-subtitle">MANUFACTURING ERP UNIT</p>
            </div>
          </div>

          <div className="hero-showcase">
            <h3>Enterprise Operations Control Center</h3>
            <p>Integrated manufacturing hub powering ticket management, leads pipeline, attendance logs, tasks, leaves, and expense audits.</p>

            <div className="feature-grid">
              <div className="feature-item">
                <Ticket size={18} className="feature-icon icon-cyan" />
                <span>Tickets Portal</span>
              </div>
              <div className="feature-item">
                <Target size={18} className="feature-icon icon-red" />
                <span>Leads Pipeline</span>
              </div>
              <div className="feature-item">
                <CheckSquare size={18} className="feature-icon icon-navy" />
                <span>Task Allocation</span>
              </div>
              <div className="feature-item">
                <UserCheck size={18} className="feature-icon icon-cyan" />
                <span>Attendance Logs</span>
              </div>
              <div className="feature-item">
                <CalendarOff size={18} className="feature-icon icon-red" />
                <span>Leave Manager</span>
              </div>
              <div className="feature-item">
                <Receipt size={18} className="feature-icon icon-navy" />
                <span>Expense Audits</span>
              </div>
            </div>
          </div>

          <div className="hero-footer-badge">
            <Building2 size={16} className="building-icon" />
            <span>Sruthi Technologies Plant Operations v2.4</span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="login-form-panel">
          <div className="form-header">
            <h2>Sign In</h2>
            <p>Welcome back! Select a role or enter your credentials to test access.</p>
          </div>

          {/* 1-Click Role Selector Helper Pill */}
          <div className="quick-credential-pill" onClick={() => setShowRoleSelectorModal(true)} title="Click to open 21 Demo Accounts selector">
            <div className="pill-left">
              <Users size={16} className="sparkle-icon" />
              <span>Test Demo Accounts (21 Roles)</span>
            </div>
            <span className="pill-badge">Click to Select</span>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle size={20} className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-field-wrapper">
                <Mail className="input-icon" size={18} />
                <input 
                  id="email"
                  type="email"
                  placeholder="ceo@sruthitech-demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-with-link">
                <label htmlFor="password">Password</label>
                <button 
                  type="button" 
                  className="forgot-password-link"
                  onClick={() => setShowForgotModal(true)}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="input-field-wrapper">
                <Lock className="input-icon" size={18} />
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button 
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked />
                <span className="checkmark"></span>
                <span className="remember-text">Remember terminal session</span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner">Authenticating...</span>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Access ERP Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="security-notice">
            <ShieldCheck size={15} className="shield-icon" />
            <span>Authorized Personnel Only • Sruthi Technologies ERP</span>
          </div>
        </div>
      </div>

      {/* 21 Role Accounts Modal */}
      {showRoleSelectorModal && (
        <div className="modal-overlay">
          <div className="modal-content demo-roles-modal">
            <div className="modal-header">
              <div className="modal-title">
                <Users size={22} className="modal-icon icon-navy" />
                <h3>Select Role to Test (21 Demo Users)</h3>
              </div>
              <button 
                className="close-modal-btn"
                onClick={() => setShowRoleSelectorModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="role-selector-scroll-list">
              <p className="modal-desc">
                Click any employee below to instantly log in as that role and test permission hierarchy:
              </p>

              {['Executive', 'Sales', 'Service'].map((dept) => (
                <div key={dept} className="dept-group">
                  <h4 className="dept-title">{dept} Department</h4>
                  <div className="role-grid">
                    {DEMO_ACCOUNTS.filter((acc) => acc.dept === dept).map((acc) => (
                      <div 
                        key={acc.empId} 
                        className="role-card" 
                        onClick={() => handleSelectDemoUser(acc)}
                      >
                        <div className="role-card-left">
                          <span className="role-emp-id">{acc.empId}</span>
                          <span className="role-name">{acc.name}</span>
                          <span className="role-badge">{acc.role}</span>
                        </div>
                        <span className="select-link">Login →</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <KeyRound size={22} className="modal-icon" />
                <h3>Password Recovery</h3>
              </div>
              <button 
                className="close-modal-btn"
                onClick={() => {
                  setShowForgotModal(false);
                  setResetSuccess(false);
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              {resetSuccess ? (
                <div className="reset-success-message">
                  <CheckCircle2 size={42} className="success-icon" />
                  <h4>Recovery Link Sent</h4>
                  <p>Reset instructions sent to <strong>{resetEmail}</strong>.</p>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword}>
                  <p className="modal-desc">
                    Enter your registered organizational email address. We will send a password reset key.
                  </p>
                  <div className="form-group">
                    <label>Corporate Email</label>
                    <div className="input-field-wrapper">
                      <Mail className="input-icon" size={18} />
                      <input 
                        type="email" 
                        placeholder="ceo@sruthitech-demo.com" 
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="submit-btn modal-submit">
                    Send Reset Link
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
