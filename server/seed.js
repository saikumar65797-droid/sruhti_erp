import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Lead from './models/Lead.js';
import Ticket from './models/Ticket.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<db_username>:<db_password>@cluster0.ol89r1y.mongodb.net/erp_sruthi?appName=Cluster0';

const DUMMY_USERS = [
  // CEO (1)
  {
    employeeId: 'ST-CEO-001',
    email: 'ceo@sruthitech-demo.com',
    name: 'Rajesh Kumar',
    role: 'CEO',
    department: 'Executive',
    reportsTo: null,
    clusterId: null,
  },
  // Head of Business (1)
  {
    employeeId: 'ST-HOB-001',
    email: 'hob@sruthitech-demo.com',
    name: 'Anil Reddy',
    role: 'HEAD_OF_BUSINESS',
    department: 'Executive',
    reportsTo: 'ST-CEO-001',
    clusterId: null,
  },

  // Sales Managers (2)
  {
    employeeId: 'ST-SM-001',
    email: 'salesmanager1@sruthitech-demo.com',
    name: 'Suresh Babu',
    role: 'SALES_MANAGER',
    department: 'Sales',
    reportsTo: 'ST-HOB-001',
    clusterId: null,
  },
  {
    employeeId: 'ST-SM-002',
    email: 'salesmanager2@sruthitech-demo.com',
    name: 'Priya Sharma',
    role: 'SALES_MANAGER',
    department: 'Sales',
    reportsTo: 'ST-HOB-001',
    clusterId: null,
  },

  // Sales Engineers (4)
  {
    employeeId: 'ST-SE-001',
    email: 'salesengineer1@sruthitech-demo.com',
    name: 'Arjun Rao',
    role: 'SALES_ENGINEER',
    department: 'Sales',
    reportsTo: 'ST-SM-001',
    clusterId: null,
  },
  {
    employeeId: 'ST-SE-002',
    email: 'salesengineer2@sruthitech-demo.com',
    name: 'Naveen Kumar',
    role: 'SALES_ENGINEER',
    department: 'Sales',
    reportsTo: 'ST-SM-001',
    clusterId: null,
  },
  {
    employeeId: 'ST-SE-003',
    email: 'salesengineer3@sruthitech-demo.com',
    name: 'Kiran Patel',
    role: 'SALES_ENGINEER',
    department: 'Sales',
    reportsTo: 'ST-SM-002',
    clusterId: null,
  },
  {
    employeeId: 'ST-SE-004',
    email: 'salesengineer4@sruthitech-demo.com',
    name: 'Rahul Verma',
    role: 'SALES_ENGINEER',
    department: 'Sales',
    reportsTo: 'ST-SM-002',
    clusterId: null,
  },

  // Service Managers (2)
  {
    employeeId: 'ST-SVM-001',
    email: 'servicemanager1@sruthitech-demo.com',
    name: 'Mahesh Reddy',
    role: 'SERVICE_MANAGER',
    department: 'Service',
    reportsTo: 'ST-HOB-001',
    clusterId: null,
  },
  {
    employeeId: 'ST-SVM-002',
    email: 'servicemanager2@sruthitech-demo.com',
    name: 'Lakshmi Devi',
    role: 'SERVICE_MANAGER',
    department: 'Service',
    reportsTo: 'ST-HOB-001',
    clusterId: null,
  },

  // Cluster Incharges (3)
  {
    employeeId: 'ST-CI-001',
    email: 'cluster1@sruthitech-demo.com',
    name: 'Venkat Rao',
    role: 'CLUSTER_INCHARGE',
    department: 'Service',
    reportsTo: 'ST-SVM-001',
    clusterId: 'CLUSTER-001',
  },
  {
    employeeId: 'ST-CI-002',
    email: 'cluster2@sruthitech-demo.com',
    name: 'Sanjay Kumar',
    role: 'CLUSTER_INCHARGE',
    department: 'Service',
    reportsTo: 'ST-SVM-001',
    clusterId: 'CLUSTER-002',
  },
  {
    employeeId: 'ST-CI-003',
    email: 'cluster3@sruthitech-demo.com',
    name: 'Ramesh Naidu',
    role: 'CLUSTER_INCHARGE',
    department: 'Service',
    reportsTo: 'ST-SVM-002',
    clusterId: 'CLUSTER-003',
  },

  // Service Engineers (8)
  {
    employeeId: 'ST-SVE-001',
    email: 'serviceengineer1@sruthitech-demo.com',
    name: 'Ajay Kumar',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-001',
    clusterId: 'CLUSTER-001',
  },
  {
    employeeId: 'ST-SVE-002',
    email: 'serviceengineer2@sruthitech-demo.com',
    name: 'Vamsi Krishna',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-001',
    clusterId: 'CLUSTER-001',
  },
  {
    employeeId: 'ST-SVE-003',
    email: 'serviceengineer3@sruthitech-demo.com',
    name: 'Rohit Singh',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-001',
    clusterId: 'CLUSTER-001',
  },
  {
    employeeId: 'ST-SVE-004',
    email: 'serviceengineer4@sruthitech-demo.com',
    name: 'Karthik Reddy',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-002',
    clusterId: 'CLUSTER-002',
  },
  {
    employeeId: 'ST-SVE-005',
    email: 'serviceengineer5@sruthitech-demo.com',
    name: 'Manish Kumar',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-002',
    clusterId: 'CLUSTER-002',
  },
  {
    employeeId: 'ST-SVE-006',
    email: 'serviceengineer6@sruthitech-demo.com',
    name: 'Harish Rao',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-002',
    clusterId: 'CLUSTER-002',
  },
  {
    employeeId: 'ST-SVE-007',
    email: 'serviceengineer7@sruthitech-demo.com',
    name: 'Praveen Kumar',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-003',
    clusterId: 'CLUSTER-003',
  },
  {
    employeeId: 'ST-SVE-008',
    email: 'serviceengineer8@sruthitech-demo.com',
    name: 'Tarun Reddy',
    role: 'SERVICE_ENGINEER',
    department: 'Service',
    reportsTo: 'ST-CI-003',
    clusterId: 'CLUSTER-003',
  },
];

async function seedDatabase() {
  try {
    console.log('[Seed] Connecting to Database...');
    if (MONGODB_URI.includes('<db_username>')) {
      console.log('[Seed] Database connection URI contains placeholder. Skipping live MongoDB seed.');
      return;
    }
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Database Connected.');

    const defaultHashedPassword = await bcrypt.hash('Demo@123', 10);

    // 1. Idempotent User Seed
    console.log('[Seed] Seeding 21 Organizational Hierarchy Users...');
    for (const u of DUMMY_USERS) {
      await User.findOneAndUpdate(
        { employeeId: u.employeeId },
        { ...u, password: defaultHashedPassword },
        { upsert: true, new: true }
      );
    }
    console.log('[Seed] 21 Users Seeded Successfully.');

    // 2. Idempotent Sales Leads Seed
    console.log('[Seed] Seeding Dummy Sales Leads...');
    const salesEngineers = DUMMY_USERS.filter((u) => u.role === 'SALES_ENGINEER');
    let leadCount = 1;
    for (const se of salesEngineers) {
      for (let i = 1; i <= 8; i++) {
        const leadId = `LEAD-2026-${String(leadCount).padStart(3, '0')}`;
        await Lead.findOneAndUpdate(
          { leadId },
          {
            leadId,
            customerName: `Manufacturing Client #${leadCount} Pvt Ltd`,
            title: `CNC Machinery Order #${leadCount}`,
            value: Math.floor(Math.random() * 50000) + 15000,
            status: ['New Lead', 'In Negotiation', 'Quotation Sent', 'Deal Closed'][i % 4],
            assignedEngineerId: se.employeeId,
            assignedEngineerName: se.name,
            managerId: se.reportsTo,
          },
          { upsert: true, new: true }
        );
        leadCount++;
      }
    }
    console.log('[Seed] 32 Sales Leads Seeded Successfully.');

    // 3. Idempotent Service Tickets Seed
    console.log('[Seed] Seeding Dummy Service Tickets...');
    const serviceEngineers = DUMMY_USERS.filter((u) => u.role === 'SERVICE_ENGINEER');
    let ticketCount = 1;
    for (const sve of serviceEngineers) {
      // Find CI and SVM
      const ci = DUMMY_USERS.find((u) => u.employeeId === sve.reportsTo);
      const svmId = ci ? ci.reportsTo : 'ST-SVM-001';

      for (let i = 1; i <= 4; i++) {
        const ticketId = `TKT-2026-${String(ticketCount).padStart(3, '0')}`;
        await Ticket.findOneAndUpdate(
          { ticketId },
          {
            ticketId,
            customerName: `Industrial Plant #${ticketCount} Infra`,
            issueDescription: `Hydraulic pump pressure loss on Line #${i}`,
            priority: ['High', 'Medium', 'Low', 'Critical'][i % 4],
            status: ['Open', 'In Progress', 'Waiting for Customer', 'Resolved'][i % 4],
            assignedEngineerId: sve.employeeId,
            assignedEngineerName: sve.name,
            clusterId: sve.clusterId,
            clusterInchargeId: sve.reportsTo,
            serviceManagerId: svmId,
          },
          { upsert: true, new: true }
        );
        ticketCount++;
      }
    }
    console.log('[Seed] 32 Service Tickets Seeded Successfully.');
    console.log('[Seed] Seeding Complete! Exiting...');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
}

seedDatabase();
