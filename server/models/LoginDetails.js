import mongoose from 'mongoose';

const loginDetailsSchema = new mongoose.Schema(
  {
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
    role: {
      type: String,
      default: 'CEO',
    },
    name: {
      type: String,
      default: 'Executive Office',
    },
  },
  {
    collection: 'login_details',
    timestamps: true,
  }
);

const LoginDetails = mongoose.models.LoginDetails || mongoose.model('LoginDetails', loginDetailsSchema);

export default LoginDetails;
