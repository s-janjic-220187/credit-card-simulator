import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';
import profileRoutes from './routes/profileRoutes';
import creditCardRoutes from './routes/creditCardRoutes';
import billingRoutes from './routes/billingRoutes';
import transactionRoutes from './routes/transactionRoutes';
import creditScoreRoutes from './routes/creditScoreRoutes';
import notificationRoutes from './routes/notificationRoutes';
import demoRoutes from './routes/demoRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection test
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL database');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    
    // Allow localhost with any port
    if(/^http:\/\/localhost(:[0-9]+)?$/.test(origin)){
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Credit Card Simulator API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api', creditCardRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/credit-score', creditScoreRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/demo', demoRoutes);

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📖 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN}`);
});

// Export for testing and other modules
export { prisma };
export default app;
