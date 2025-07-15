# 💳 Credit Card Billing Cycle Simulator

> **A comprehensive educational platform for understanding credit card billing mechanics, interest calculations, and financial literacy.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)

## 👤 Author

**Srdjan Janjic**  
📧 Email: srdjan.janjic22@gmail.com  
🌟 Version: v1.0.0

---

## 🎯 Project Vision

Transform credit card education through interactive simulation and visualization. This platform helps users understand:

- **Billing cycles** and statement generation
- **Interest calculations** and compounding effects
- **Payment strategies** and their long-term impact
- **Fee structures** and how to avoid them
- **Credit utilization** and score implications
- **Financial decision-making** through scenarios

## 🌐 Live Demo

- **Frontend**: https://frontend-ccs-production.up.railway.app
- **Backend API**: https://backend-ccs-production.up.railway.app
- **Health Check**: https://backend-ccs-production.up.railway.app/health

### 🔑 Demo Credentials

- **Email**: `demo@example.com`
- **Password**: `demo123`
- **Features**: Full credit card simulation experience

## 🏗️ Architecture Overview

```
Credit Card Simulator/
├── Backend (Node.js + PostgreSQL)
│   ├── Express.js API Server
│   ├── Prisma ORM with PostgreSQL
│   ├── Authentication & Authorization
│   ├── Billing Calculation Engine
│   └── RESTful API Endpoints
├── Frontend (React + TypeScript)
│   ├── Modern React with Hooks
│   ├── TypeScript for Type Safety
│   ├── Tailwind CSS for Styling
│   ├── Recharts for Data Visualization
│   └── Responsive Design
└── Deployment
    ├── Railway.app Production
    ├── Docker Containerization
    └── CI/CD Pipeline
```

## ✨ Key Features

### 🎯 Core Billing Simulation Engine

- **PostgreSQL Database**: Complete migration with Prisma ORM
- **Billing Service**: Comprehensive billing calculation engine
- **Transaction Management**: Full transaction lifecycle support
- **Statement Generation**: Detailed monthly statements with educational breakdowns
- **Interest Calculations**: Daily compounding with multiple APR support
- **Fee Structure**: Complete fee system (late, overlimit, foreign transaction, annual fees)

### 💳 Manual Transaction Management (NEW)

- ✅ **Manual Transaction Creation**: Add purchases, payments, refunds, fees, and cash advances
- ✅ **Transaction Categories**: Organized spending categories (Groceries, Dining, Gas, etc.)
- ✅ **Real-time Balance Updates**: Automatic credit card balance adjustments
- ✅ **Transaction History**: Complete transaction timeline with filtering and search
- ✅ **Transaction Analytics**: Spending summaries and payment tracking
- ✅ **Smart Validation**: Credit limit checks and transaction validation
- ✅ **Dashboard Integration**: Recent transactions widget on main dashboard
- ✅ **Dedicated Transactions Page**: Full-featured transaction management interface

### 🧮 Advanced Calculator Suite (5 Tools)

- ✅ **Interest Calculator**: APR, daily, and monthly interest calculations
- ✅ **Payment Strategy Analyzer**: Minimum vs. custom vs. aggressive payment comparisons
- ✅ **Fee Structure Simulator**: Comprehensive fee analysis across usage scenarios
- ✅ **Financial Health Calculator**: 100-point assessment across 4 key dimensions
- ✅ **Credit Card Profile Builder**: Custom card configuration with terms and features

### � Data Visualization Suite (6 Components)

- ✅ **Interest Growth Charts**: Interactive compound interest visualizations
- ✅ **Payment Impact Visualizer**: Dramatic payment strategy comparisons
- ✅ **Fee Analysis Dashboard**: Comprehensive fee structure analysis with charts
- ✅ **Billing Cycle Dashboard**: Complete cycle visualization and management
- ✅ **Statement Generator**: Professional statement generation with educational insights
- ✅ **Real-time Updates**: Dynamic charts that respond to user input changes

### 📚 Educational & Learning Platform

- ✅ **Educational Dashboard**: 20+ comprehensive learning modules
- ✅ **Scenario-Based Learning**: 3 interactive scenarios with decision trees
- ✅ **Financial Tips System**: Categorized tips with impact assessments
- ✅ **Knowledge Tracking**: Progress monitoring and achievement system
- ✅ **Risk-Free Practice**: Safe environment for financial decision-making

### 🔧 Backend Services & API

- ✅ **BillingService**: Core billing calculation engine
- ✅ **TransactionService**: Transaction management and processing
- ✅ **CreditScoreCalculatorService**: Credit impact calculations
- ✅ **NotificationService**: Alert and notification system
- ✅ **RESTful APIs**: Complete CRUD operations for all entities
- ✅ **Type Safety**: Full TypeScript integration throughout

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Local Development Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/s-janjic-220187/credit-card-simulator.git
   cd credit-card-simulator
   ```

2. **Install dependencies**:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**:

   **Backend** (`backend/.env`):

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/credit_card_simulator
   JWT_SECRET=your-super-secret-jwt-key
   ENCRYPTION_KEY=your-32-character-encryption-key
   CORS_ORIGIN=http://localhost:5173
   ```

   **Frontend** (`frontend/.env`):

   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_APP_NAME=Credit Card Simulator
   VITE_APP_VERSION=1.0.0
   ```

4. **Set up the database**:

   ```bash
   cd backend
   npx prisma db push
   npx prisma db seed
   ```

5. **Start development servers**:

   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev

   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

6. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Database Studio: `npx prisma studio`

### 🎮 Quick Start with Demo Data

```bash
# Create demo user and credit card
curl -X POST http://localhost:3000/api/demo/create

# Login with demo credentials
# Email: demo@example.com
# Password: demo123
```

## 📊 Database Schema

### Core Models

```typescript
// User Profile
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  annualIncome: number;
  creditScore: number;
  employmentStatus: EmploymentStatus;
  // ... additional fields
}

// Credit Card
interface CreditCard {
  id: string;
  cardNumber: string;
  creditLimit: number;
  currentBalance: number;
  apr: number;
  status: CardStatus;
  cycleStartDate: number;
  // ... billing and fee fields
}

// Transaction
interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  category: TransactionCategory;
  // ... transaction details
}

// Billing Cycle
interface BillingCycle {
  id: string;
  startDate: Date;
  endDate: Date;
  statementBalance: number;
  minimumPayment: number;
  dueDate: Date;
  // ... cycle calculations
}
```

## 🔗 API Documentation

### Authentication Routes

```bash
POST /api/users/login          # User login
POST /api/users               # Create user
GET  /api/users/:id           # Get user details
```

### Profile Management

```bash
POST /api/profile/:userId     # Create profile
GET  /api/profile/:userId     # Get profile
PUT  /api/profile/:userId     # Update profile
```

### Credit Card Operations

```bash
POST /api/:userId/cards       # Create credit card
GET  /api/:userId/cards       # Get user's cards
GET  /api/cards/:cardId       # Get specific card
POST /api/cards/:cardId/freeze # Freeze card
```

### Transaction Management

```bash
POST /api/cards/:cardId/transactions/purchase  # Make purchase
POST /api/cards/:cardId/transactions/refund    # Process refund
GET  /api/cards/:cardId/transactions           # Get transactions
```

### Billing Operations

```bash
POST /api/billing/cycle/:cardId    # Generate billing cycle
GET  /api/billing/cycles/:cardId   # Get cycle history
GET  /api/billing/statement/:cycleId # Get statement
```

## 🎨 UI Components & Features

### Modern Design System

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: User preference support
- **Interactive Charts**: Recharts integration for data visualization
- **Smooth Animations**: CSS transitions and micro-interactions
- **Accessibility**: WCAG 2.1 compliant components

### Key User Interfaces

- **Dashboard**: Comprehensive financial overview
- **Card Management**: Create, view, and manage credit cards
- **Transaction Center**: Purchase simulation and transaction history
- **Billing Cycles**: Interactive billing period management
- **Educational Hub**: Learning modules and financial tips
- **Calculator Suite**: Advanced financial calculation tools

## 🔐 Security Features

- **Data Encryption**: Sensitive data protection
- **Input Validation**: Both client and server-side validation
- **CORS Configuration**: Secure cross-origin requests
- **JWT Authentication**: Secure user sessions
- **SQL Injection Protection**: Prisma ORM safety
- **XSS Protection**: React's built-in protections

## 🚀 Deployment & Production

### Railway Deployment

The application is deployed on Railway with:

- **Frontend**: Static site deployment with automatic builds
- **Backend**: Node.js application with PostgreSQL database
- **Database**: Managed PostgreSQL with automated backups
- **CI/CD**: Automatic deployments on Git push

### Database Migration Strategy

Safe deployment with data persistence:

```javascript
// Intelligent migration logic
if (migrationsExist) {
  await runMigrations(); // Preserve existing data
} else if (!tablesExist) {
  await runDbPush(); // Only for empty databases
} else {
  console.log("Tables exist, skipping schema changes");
}
```

### Environment Configuration

Production environment variables are managed through Railway's interface with secure secret storage.

## 📚 Educational Value

### Learning Outcomes

- **Financial Literacy**: Understanding credit card mechanics
- **Interest Calculations**: Compound interest and APR concepts
- **Payment Strategies**: Impact of different payment amounts
- **Fee Awareness**: Understanding and avoiding credit card fees
- **Credit Score Impact**: How usage affects credit scores
- **Budgeting Skills**: Managing credit within means

### Interactive Scenarios

1. **College Student**: Learning responsible credit use
2. **Young Professional**: Building credit history
3. **Family Manager**: Balancing multiple financial priorities

## 🧪 Testing & Quality

### Testing Strategy

- **Unit Tests**: Core business logic testing
- **Integration Tests**: API endpoint validation
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Database and API performance
- **Security Tests**: Vulnerability assessments

### Code Quality

- **TypeScript**: Full type safety throughout
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality gates

## 📈 Performance Optimization

### Frontend Optimizations

- **Code Splitting**: Lazy loading of route components
- **Bundle Optimization**: Webpack optimization for smaller bundles
- **Caching**: API response caching with React Query
- **Image Optimization**: Optimized asset delivery

### Backend Optimizations

- **Database Indexing**: Optimized query performance
- **Connection Pooling**: Efficient database connections
- **API Caching**: Redis caching for frequent requests
- **Compression**: Gzip compression for responses

## 🔄 Changelog & Updates

### Version 1.0.0 (Latest)

- ✅ Complete billing cycle simulation engine
- ✅ Advanced data visualization suite
- ✅ Educational dashboard and learning modules
- ✅ Comprehensive calculator tools
- ✅ Railway production deployment
- ✅ Database persistence and migration system
- ✅ Mobile-responsive design
- ✅ API documentation and testing suite

### Recent Fixes

- 🔧 Fixed "Route not found" error for first card creation
- 🔧 Resolved Railway database reset issues with safe migrations
- 🔧 Improved API routing and error handling
- 🔧 Enhanced user authentication flow

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Coding Standards

- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📞 Support & Community

### Getting Help

- **Documentation**: Complete API and component documentation
- **Issues**: [GitHub Issues](https://github.com/s-janjic-220187/credit-card-simulator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/s-janjic-220187/credit-card-simulator/discussions)
- **Email**: srdjan.janjic22@gmail.com

### Troubleshooting

**Common Issues:**

1. **Database Connection Issues**:

   ```bash
   # Check database status
   npx prisma studio
   # Reset database
   npx prisma db push --force-reset
   ```

2. **API Connection Errors**:

   ```bash
   # Verify backend is running
   curl http://localhost:3000/health
   # Check environment variables
   ```

3. **Build Errors**:
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Built with amazing open-source technologies
- Inspired by the need for better financial literacy tools
- Designed to make credit card concepts accessible and interactive
- Community feedback and contributions welcome

---

**⭐ If this project helps you understand credit cards better, please consider giving it a star!**

**💡 Educational Note**: This simulator is for educational purposes only and should not be considered financial advice. Always consult with financial professionals for personal financial decisions.

```
├── 🎨 Frontend (React + TypeScript)
│   ├── Interactive calculators and visualizations
│   ├── Educational dashboards and tutorials
│   ├── Scenario-based learning modules
│   └── Responsive UI with Tailwind CSS
│
├── 🔧 Backend (Node.js + Express + TypeScript)
│   ├── RESTful API with comprehensive endpoints
│   ├── Real-time calculation engines
│   ├── User profile and progress management
│   └── Statement and notification services
│
└── 🗄️ Database (PostgreSQL + Prisma)
    ├── User profiles and financial data
    ├── Credit card and transaction records
    ├── Billing cycles and statement history
    └── Learning progress and achievements
```

## ✨ Core Features

### 📊 **Calculation Tools**

- **Interest Calculator**: Real-time APR calculations with payment scenarios
- **Payment Strategy Analyzer**: Compare minimum vs. accelerated payment plans
- **Fee Structure Simulator**: Understand late fees, overlimit charges, and penalties
- **Financial Health Calculator**: Comprehensive credit health assessment

### 📈 **Data Visualizations**

- **Payment Impact Visualizer**: Interactive charts showing payment strategy outcomes
- **Interest Growth Charts**: Visual representation of debt accumulation over time
- **Fee Analysis Dashboard**: Breakdown of all potential credit card costs
- **Utilization Tracking**: Credit usage patterns and recommendations

### 🎓 **Educational Components**

- **Scenario Learning**: Interactive decision trees with real-world situations
- **Educational Dashboard**: Step-by-step guides and best practices
- **Achievement System**: Gamified learning with progress tracking
- **Credit Score Calculator**: Understanding factors that impact your score

### 🔄 **Simulation Engine**

- **Billing Cycle Management**: Automated monthly cycle processing
- **Transaction Processing**: Categorized spending with merchant details
- **Statement Generation**: PDF-ready billing statements
- **Notification System**: Payment reminders and financial tips

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v13 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/credit-card-simulator.git
   cd credit-card-simulator
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your database URL in .env
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Configure API URL in .env
   ```

4. **Start Development Servers**

   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - API Documentation: http://localhost:3000/api/docs

## 📱 User Journey

### 1. **Profile Setup**

- Personal information and financial background
- Credit score and income details
- Financial goals and preferences

### 2. **Credit Card Configuration**

- Create custom credit card profiles
- Set credit limits, APR, and fee structures
- Configure billing cycles and payment dates

### 3. **Transaction Simulation**

- Add purchases across various categories
- Process payments and see immediate impacts
- Track spending patterns and trends

### 4. **Analysis & Learning**

- Use calculators to explore different scenarios
- Visualize long-term impacts of financial decisions
- Complete interactive learning modules
- Track progress and earn achievements

## 🛠️ Development

### Project Structure

```
credit-card-simulator/
├── backend/                 # Node.js API server
│   ├── prisma/             # Database schema and migrations
│   ├── src/
│   │   ├── controllers/    # API route handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── routes/         # Express routes
│   │   └── types/          # TypeScript definitions
│   └── package.json
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Calculators/
│   │   │   ├── Visualizations/
│   │   │   ├── Education/
│   │   │   └── Learning/
│   │   ├── pages/          # Route components
│   │   ├── services/       # API clients
│   │   └── types/          # TypeScript definitions
│   └── package.json
│
└── docs/                   # Documentation
```

### Available Scripts

**Backend:**

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with sample data

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### VS Code Setup

This project includes a configured VS Code workspace with:

- TypeScript extensions and settings
- ESLint and Prettier configuration
- Debugging configurations
- Recommended extensions
- Integrated terminal tasks

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# End-to-end tests
npm run test:e2e
```

## 📊 Database Schema

The application uses PostgreSQL with the following core entities:

- **Users**: Profile and authentication data
- **CreditCards**: Card details and configurations
- **Transactions**: Purchase and payment records
- **BillingCycles**: Monthly billing periods
- **Statements**: Generated billing statements
- **Notifications**: User alerts and reminders

See [Database Documentation](./docs/database.md) for detailed schema information.

## 🔧 Configuration

### Environment Variables

**Backend (.env):**

```env
DATABASE_URL="postgresql://user:password@localhost:5432/credit_card_simulator"
NODE_ENV=development
PORT=3000
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME="Credit Card Simulator"
VITE_APP_VERSION=1.0.0
```

## 📈 Performance

- **Frontend**: Optimized React components with code splitting
- **Backend**: Efficient database queries with Prisma
- **Caching**: Redis integration for session management
- **Monitoring**: Application performance metrics

## 🔒 Security

- JWT-based authentication
- Input validation and sanitization
- SQL injection prevention with Prisma
- CORS configuration
- Environment variable protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [Contributing Guide](./CONTRIBUTING.md) for detailed guidelines.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- **Educational Focus**: Inspired by the need for better financial literacy tools
- **Open Source**: Built with amazing open-source technologies
- **Community**: Thanks to all contributors and educators

## 📞 Support

- **Documentation**: [View Docs](./docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/credit-card-simulator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/credit-card-simulator/discussions)

---

**⭐ If this project helps you understand credit cards better, please consider giving it a star!**
