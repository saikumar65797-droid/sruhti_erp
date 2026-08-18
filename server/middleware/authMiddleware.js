import User from '../models/User.js';

export const buildHierarchyFilter = async (req, res, next) => {
  try {
    const employeeId = req.headers['x-employee-id'] || 'ST-CEO-001';
    const role = req.headers['x-user-role'] || 'CEO';

    // Attaching user context
    req.userContext = {
      employeeId,
      role,
    };

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
