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
import adminRoutes from './routes/adminRoutes';

// Load environment variables
dotenv.config();

// Debug logging
console.log('🔧 Environment:', process.env.NODE_ENV);
console.log('🔧 Database URL present:', !!process.env.DATABASE_URL);
console.log('🔧 Database URL preview:', process.env.DATABASE_URL?.substring(0, 50) + '...');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection test with retries
const connectDB = async () => {
  const maxRetries = 10;
  const retryDelay = 5000; // 5 seconds
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await prisma.$connect();
      console.log('✅ Connected to PostgreSQL database');
      return;
    } catch (error) {
      console.error(`❌ Database connection attempt ${attempt}/${maxRetries} failed:`, error);
      
      if (attempt === maxRetries) {
        console.error('❌ Failed to connect to database after all retries');
        process.exit(1);
      }
      
      console.log(`⏳ Retrying database connection in ${retryDelay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    
    // In production, use environment variable for CORS origin
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    }
    
    // In development, allow localhost with any port
    if (process.env.NODE_ENV !== 'production' && /^http:\/\/localhost(:[0-9]+)?$/.test(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Credit Card Simulator API',
    timestamp: new Date().toISOString(),
    message: 'Service is running'
  });
});

// Basic health check without database
app.get('/ping', (_req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Service is running',
    timestamp: new Date().toISOString()
  });
});

// Environment debug endpoint
app.get('/debug', (_req, res) => {
  res.json({
    status: 'OK',
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseUrlPresent: !!process.env.DATABASE_URL,
    databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 20) + '...',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', async (_req, res) => {
  const healthData = {
    status: 'OK', 
    message: 'Credit Card Simulator API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: '1.0.0'
  };

  try {
    // Test database connection with a timeout
    const dbTest = prisma.$queryRaw`SELECT 1`;
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 5000)
    );
    
    await Promise.race([dbTest, timeoutPromise]);
    
    res.json({ 
      ...healthData,
      database: 'Connected'
    });
  } catch (error) {
    // Return partial health if database is down but service is running
    res.status(200).json({
      ...healthData,
      database: 'Disconnected',
      databaseError: error instanceof Error ? error.message : 'Unknown error'
    });
  }
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
app.use('/api/admin', adminRoutes);

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

// Initialize database connection asynchronously (non-blocking)
(async () => {
  try {
    await connectDB();
    console.log('🗄️ Database initialization completed');
  } catch (error) {
    console.error('🚨 Database initialization failed, but server is still running:', error);
  }
})();

// Export for testing and other modules
export { prisma };
export default app;
