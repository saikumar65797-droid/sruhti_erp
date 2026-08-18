import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    leadId: {
      type: String,
      required: true,
      unique: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['New Lead', 'In Negotiation', 'Quotation Sent', 'Deal Closed', 'Lost'],
      default: 'New Lead',
    },
    assignedEngineerId: {
      type: String, // ST-SE-001, etc.
      required: true,
    },
    assignedEngineerName: {
      type: String,
      required: true,
    },
    managerId: {
      type: String, // ST-SM-001 or ST-SM-002
      required: true,
    },
  },
  {
    collection: 'sales_leads',
    timestamps: true,
  }
);

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);

export default Lead;
