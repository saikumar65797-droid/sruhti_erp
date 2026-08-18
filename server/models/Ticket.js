import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    issueDescription: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low', 'Critical'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Open', 'Assigned', 'In Progress', 'Waiting for Customer', 'Resolved', 'Closed', 'Escalated'],
      default: 'Open',
    },
    assignedEngineerId: {
      type: String, // ST-SVE-001 to ST-SVE-008
      required: true,
    },
    assignedEngineerName: {
      type: String,
      required: true,
    },
    clusterId: {
      type: String, // CLUSTER-001, CLUSTER-002, CLUSTER-003
      required: true,
    },
    clusterInchargeId: {
      type: String, // ST-CI-001, ST-CI-002, ST-CI-003
      required: true,
    },
    serviceManagerId: {
      type: String, // ST-SVM-001 or ST-SVM-002
      required: true,
    },
    resolutionDate: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'service_tickets',
    timestamps: true,
  }
);

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

export default Ticket;
