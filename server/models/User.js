import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: [
        'CEO',
        'HEAD_OF_BUSINESS',
        'SALES_MANAGER',
        'SALES_ENGINEER',
        'SERVICE_MANAGER',
        'CLUSTER_INCHARGE',
        'SERVICE_ENGINEER',
      ],
    },
    reportsTo: {
      type: String, // Employee ID of manager
      default: null,
    },
    clusterId: {
      type: String, // e.g. CLUSTER-001, CLUSTER-002, CLUSTER-003
      default: null,
    },
    department: {
      type: String,
      enum: ['Executive', 'Sales', 'Service'],
      required: true,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
