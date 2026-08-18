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
  Ticket,
  Target,
  CheckSquare,
  UserCheck,
  CalendarOff,
  Receipt
} from 'lucide-react';
import logo from '../../assets/logo.png';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const HARDCODED_EMAIL = 'ceo@erp.example';
  const HARDCODED_PASSWORD = 'admin123@';

  const handleAutoFill = () => {
    setEmail(HARDCODED_EMAIL);
    setPassword(HARDCODED_PASSWORD);
    setError('');
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

    setTimeout(() => {
      if (email.trim() === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
        login({
          email: HARDCODED_EMAIL,
          role: 'CEO',
          name: 'Executive Office',
          department: 'Manufacturing HQ'
        });
        setLoading(false);
        navigate('/dashboard');
      } else {
        setError(`Invalid credentials. Please use Email: "${HARDCODED_EMAIL}" and Password: "${HARDCODED_PASSWORD}"`);
        setLoading(false);
      }
    }, 500);
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
            <p>Welcome back! Enter your executive credentials to access the ERP dashboard.</p>
          </div>

          {/* Quick Credential Helper Pill */}
          <div className="quick-credential-pill" onClick={handleAutoFill} title="Click to auto-fill sample CEO credentials">
            <div className="pill-left">
              <Sparkles size={16} className="sparkle-icon" />
              <span>Fill Default CEO Credentials</span>
            </div>
            <span className="pill-badge">ceo@erp.example</span>
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
                  placeholder="ceo@erp.example"
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
                        placeholder="ceo@erp.example" 
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
