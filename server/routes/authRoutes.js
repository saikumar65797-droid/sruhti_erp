import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Fallback dataset of all 21 users for local testing
const DEMO_USERS = [
  { employeeId: 'ST-CEO-001', email: 'ceo@sruthitech-demo.com', name: 'Rajesh Kumar', role: 'CEO', department: 'Executive', reportsTo: null, clusterId: null },
  { employeeId: 'ST-HOB-001', email: 'hob@sruthitech-demo.com', name: 'Anil Reddy', role: 'HEAD_OF_BUSINESS', department: 'Executive', reportsTo: 'ST-CEO-001', clusterId: null },
  { employeeId: 'ST-SM-001', email: 'salesmanager1@sruthitech-demo.com', name: 'Suresh Babu', role: 'SALES_MANAGER', department: 'Sales', reportsTo: 'ST-HOB-001', clusterId: null },
  { employeeId: 'ST-SM-002', email: 'salesmanager2@sruthitech-demo.com', name: 'Priya Sharma', role: 'SALES_MANAGER', department: 'Sales', reportsTo: 'ST-HOB-001', clusterId: null },
  { employeeId: 'ST-SE-001', email: 'salesengineer1@sruthitech-demo.com', name: 'Arjun Rao', role: 'SALES_ENGINEER', department: 'Sales', reportsTo: 'ST-SM-001', clusterId: null },
  { employeeId: 'ST-SE-002', email: 'salesengineer2@sruthitech-demo.com', name: 'Naveen Kumar', role: 'SALES_ENGINEER', department: 'Sales', reportsTo: 'ST-SM-001', clusterId: null },
  { employeeId: 'ST-SE-003', email: 'salesengineer3@sruthitech-demo.com', name: 'Kiran Patel', role: 'SALES_ENGINEER', department: 'Sales', reportsTo: 'ST-SM-002', clusterId: null },
  { employeeId: 'ST-SE-004', email: 'salesengineer4@sruthitech-demo.com', name: 'Rahul Verma', role: 'SALES_ENGINEER', department: 'Sales', reportsTo: 'ST-SM-002', clusterId: null },
  { employeeId: 'ST-SVM-001', email: 'servicemanager1@sruthitech-demo.com', name: 'Mahesh Reddy', role: 'SERVICE_MANAGER', department: 'Service', reportsTo: 'ST-HOB-001', clusterId: null },
  { employeeId: 'ST-SVM-002', email: 'servicemanager2@sruthitech-demo.com', name: 'Lakshmi Devi', role: 'SERVICE_MANAGER', department: 'Service', reportsTo: 'ST-HOB-001', clusterId: null },
  { employeeId: 'ST-CI-001', email: 'cluster1@sruthitech-demo.com', name: 'Venkat Rao', role: 'CLUSTER_INCHARGE', department: 'Service', reportsTo: 'ST-SVM-001', clusterId: 'CLUSTER-001' },
  { employeeId: 'ST-CI-002', email: 'cluster2@sruthitech-demo.com', name: 'Sanjay Kumar', role: 'CLUSTER_INCHARGE', department: 'Service', reportsTo: 'ST-SVM-001', clusterId: 'CLUSTER-002' },
  { employeeId: 'ST-CI-003', email: 'cluster3@sruthitech-demo.com', name: 'Ramesh Naidu', role: 'CLUSTER_INCHARGE', department: 'Service', reportsTo: 'ST-SVM-002', clusterId: 'CLUSTER-003' },
  { employeeId: 'ST-SVE-001', email: 'serviceengineer1@sruthitech-demo.com', name: 'Ajay Kumar', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-001', clusterId: 'CLUSTER-001' },
  { employeeId: 'ST-SVE-002', email: 'serviceengineer2@sruthitech-demo.com', name: 'Vamsi Krishna', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-001', clusterId: 'CLUSTER-001' },
  { employeeId: 'ST-SVE-003', email: 'serviceengineer3@sruthitech-demo.com', name: 'Rohit Singh', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-001', clusterId: 'CLUSTER-001' },
  { employeeId: 'ST-SVE-004', email: 'serviceengineer4@sruthitech-demo.com', name: 'Karthik Reddy', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-002', clusterId: 'CLUSTER-002' },
  { employeeId: 'ST-SVE-005', email: 'serviceengineer5@sruthitech-demo.com', name: 'Manish Kumar', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-002', clusterId: 'CLUSTER-002' },
  { employeeId: 'ST-SVE-006', email: 'serviceengineer6@sruthitech-demo.com', name: 'Harish Rao', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-002', clusterId: 'CLUSTER-002' },
  { employeeId: 'ST-SVE-007', email: 'serviceengineer7@sruthitech-demo.com', name: 'Praveen Kumar', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-003', clusterId: 'CLUSTER-003' },
  { employeeId: 'ST-SVE-008', email: 'serviceengineer8@sruthitech-demo.com', name: 'Tarun Reddy', role: 'SERVICE_ENGINEER', department: 'Service', reportsTo: 'ST-CI-003', clusterId: 'CLUSTER-003' },
];

// GET /api/users/all (Returns list of 21 test accounts for Login page role selector)
router.get('/users/all', (req, res) => {
  res.json({ success: true, count: DEMO_USERS.length, users: DEMO_USERS });
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check MongoDB if connected
    let userRecord = null;
    try {
      userRecord = await User.findOne({ email: cleanEmail });
    } catch (err) {
      // Fallback
    }

    // Match DB user or DEMO_USERS
    if (!userRecord) {
      userRecord = DEMO_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    }

    // Password validation for Demo@123 or admin123@ or ceo@erp.example
    const isValidPass =
      password === 'Demo@123' ||
      password === 'admin123@' ||
      (userRecord && userRecord.password && (await bcrypt.compare(password, userRecord.password)));

    if (userRecord && isValidPass) {
      return res.json({
        success: true,
        user: {
          employeeId: userRecord.employeeId || 'ST-CEO-001',
          email: userRecord.email,
          name: userRecord.name,
          role: userRecord.role,
          department: userRecord.department,
          reportsTo: userRecord.reportsTo,
          clusterId: userRecord.clusterId,
        },
      });
    }

    // Default Fallback CEO
    if (cleanEmail === 'ceo@erp.example' && password === 'admin123@') {
      return res.json({
        success: true,
        user: {
          employeeId: 'ST-CEO-001',
          email: 'ceo@erp.example',
          name: 'Rajesh Kumar',
          role: 'CEO',
          department: 'Executive',
          reportsTo: null,
          clusterId: null,
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Password for demo accounts is "Demo@123".',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
