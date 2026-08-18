import express from 'express';
import LoginDetails from '../models/LoginDetails.js';

const router = express.Router();

// Hardcoded fallback credentials
const HARDCODED_EMAIL = 'ceo@erp.example';
const HARDCODED_PASSWORD = 'admin123@';

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Check DB first if available
    let user = null;
    try {
      user = await LoginDetails.findOne({ email: email.toLowerCase() });
    } catch (err) {
      console.log('[Auth] DB lookup skipped, checking hardcoded fallback credentials');
    }

    if (user && user.password === password) {
      return res.json({
        success: true,
        user: {
          email: user.email,
          role: user.role,
          name: user.name,
        },
      });
    }

    // Fallback to hardcoded CEO credentials
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      return res.json({
        success: true,
        user: {
          email: HARDCODED_EMAIL,
          role: 'CEO',
          name: 'Executive Office',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: `Invalid credentials. Use email: "${HARDCODED_EMAIL}" and password: "${HARDCODED_PASSWORD}"`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
