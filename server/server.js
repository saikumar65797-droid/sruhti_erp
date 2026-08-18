import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api', authRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Sruthi Technologies Manufacturing ERP API' });
});

app.listen(PORT, () => {
  console.log(`[ERP Server] Running on http://localhost:${PORT}`);
});
