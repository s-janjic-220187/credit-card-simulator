# 💳 Credit Card Billing Cycle Simulator

A full-stack web application that simulates credit card billing cycles, interest, fees, and statement generation.  
Designed as a **profile-driven calculator**, this tool allows users to create multiple credit card profiles and observe how billing cycles, charges, and fees are calculated in various scenarios.

## 🎯 Project Overview

This application provides comprehensive credit card billing simulation with:

- **Billing Cycle Management**: Simulate monthly cycles with customizable dates
- **Interest Calculations**: APR-based daily interest computation
- **Fee Simulation**: Late fees, overlimit fees, foreign transaction fees
- **Statement Generation**: Detailed monthly statements with all charges
- **Profile-Based Testing**: Create multiple credit card profiles to compare scenarios
- **Educational Tool**: Understanding credit card mechanics and costs

## Project Structure

```
credit-card-simulator/
├── backend/                 # Node.js/Express API with PostgreSQL
│   ├── src/
│   │   ├── controllers/     # Billing cycle and statement controllers
│   │   ├── models/         # Credit card profile and billing models
│   │   ├── routes/         # API routes for simulation
│   │   ├── services/       # Billing calculation business logic
│   │   ├── lib/           # Prisma client and utilities
│   │   └── index.ts        # Entry point
│   ├── prisma/            # Database schema and migrations
│   │   ├── schema.prisma  # Credit card billing data model
│   │   └── seed.ts        # Sample billing scenarios
│   ├── .env               # Environment variables
│   ├── tsconfig.json      # TypeScript configuration
│   └── package.json       # Dependencies
│
├── frontend/               # React/Vite application with Tailwind CSS
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Billing UI components
│   │   │   ├── BillingCycle/   # Cycle management components
│   │   │   ├── CreditCard/     # Card profile components
│   │   │   ├── Statement/      # Statement generation
│   │   │   ├── Calculators/    # Interest and fee calculators
│   │   │   ├── Visualization/  # Interactive charts and data visualization
│   │   │   └── Education/      # Educational content and modules
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API calls for billing simulation
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Billing calculation utilities
│   │   └── main.tsx       # Entry point
│   ├── .env              # Environment variables
│   ├── tsconfig.json     # TypeScript configuration
│   └── package.json      # Dependencies
│
├── .gitignore            # Git ignore file
├── PROFILE_SETUP.md      # Setup documentation
├── MIGRATION_SUMMARY.md  # Migration details
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v12 or higher)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
4. Set up PostgreSQL database:

   ```bash
   cd backend
   npx prisma db push
   npx prisma db seed
   ```

   npm install

   ```

   ```

5. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

The backend will run on `http://localhost:3000` and the frontend on `http://localhost:5175`.

## 🌟 Features

### Core Billing Simulation

- **Multiple Credit Card Profiles**: Create and manage different card types with varying terms
- **Billing Cycle Management**: Simulate monthly cycles with customizable statement dates
- **Interest Calculations**: Daily interest computation based on APR and balance
- **Fee Structure**: Late fees, overlimit fees, foreign transaction fees, annual fees
- **Statement Generation**: Detailed monthly statements with all charges and payments
- **Balance Tracking**: Current balance, available credit, minimum payment calculations

### Advanced Calculators

- **Interest Calculator**: APR, daily, and monthly interest rate calculations with educational breakdowns
- **Payment Strategy Analyzer**: Compare minimum, custom, and aggressive payment strategies
- **Fee Structure Simulator**: Analyze and compare fee structures across different usage scenarios
- **Financial Health Score Calculator**: Comprehensive assessment of financial wellness across four key areas

### Interactive Learning

- **Scenario-Based Learning**: Practice real-world financial decision making through interactive scenarios
- **Educational Dashboard**: Comprehensive learning modules, tips, and strategies for financial literacy
- **Real-World Challenges**: Emergency debt management, credit building, balance transfer strategies
- **Risk-Free Practice**: Learn from mistakes without real financial consequences

### Data Visualization Suite

- **Interest Growth Charts**: Interactive visualizations showing how interest compounds over time
- **Payment Impact Visualizer**: Dramatic comparisons of different payment strategies with savings calculations
- **Fee Analysis Dashboard**: Comprehensive fee structure analysis with pie charts and breakdowns
- **Scenario Comparison Tools**: Side-by-side analysis of multiple payment approaches and outcomes
- **Real-time Chart Updates**: Dynamic visualizations that respond to user input changes
- **Educational Insights**: Built-in tips and explanations for each visualization

### Profile-Driven Calculator

- **Card Terms Configuration**: APR, credit limit, fees, billing cycle dates
- **Transaction Simulation**: Add purchases, payments, cash advances
- **Time-Based Simulation**: Fast-forward through multiple billing cycles
- **Real-time Calculations**: Instant updates to balances and interest

## Technologies Used

### Backend

- Node.js & Express.js
- TypeScript
- PostgreSQL with Prisma ORM
- Billing calculation engine
- Statement generation service
- Interest computation algorithms

### Frontend

- React 18 with TypeScript
- Vite build tool
- Tailwind CSS for styling
- React Query for state management
- React Router for navigation
- Recharts for data visualizations
- React Hook Form for form management

## 📊 API Endpoints

### Credit Card Profiles

- `POST /api/credit-cards` - Create new credit card profile
- `GET /api/credit-cards/:userId` - Get user's credit card profiles
- `PUT /api/credit-cards/:cardId` - Update credit card profile
- `DELETE /api/credit-cards/:cardId` - Delete credit card profile

### Billing Simulation

- `POST /api/billing/cycle/:cardId` - Generate billing cycle
- `GET /api/billing/cycle/:cardId/:cycleId` - Get specific billing cycle
- `POST /api/billing/transaction/:cardId` - Add transaction to current cycle
- `GET /api/billing/statement/:cardId/:cycleId` - Generate statement

### Calculations

- `GET /api/calculations/interest/:cardId` - Calculate current interest
- `GET /api/calculations/fees/:cardId` - Calculate applicable fees
- `GET /api/calculations/minimum-payment/:cardId` - Calculate minimum payment
- `GET /api/calculations/payoff/:cardId` - Calculate payoff scenarios

### User Profiles

- `POST /api/profile` - Create user profile
- `GET /api/profile/me` - Get current user's profile
- `PUT /api/profile/:userId` - Update user profile

## 🎓 Educational Use Cases

This simulator is designed for:

- **Personal Finance Education**: Understanding credit card mechanics and building financial literacy
- **Financial Planning**: Testing payment strategies and financial decisions before implementation
- **Academic Use**: Teaching financial literacy concepts through interactive scenarios and visualizations
- **Professional Training**: Credit counseling, financial advisory scenarios, and decision-making practice
- **Comparison Shopping**: Evaluating different credit card offers and fee structures
- **Risk-Free Learning**: Practice financial decision-making without real financial consequences
- **Financial Health Assessment**: Comprehensive evaluation of personal financial wellness

## 🚀 Recent Enhancements

- ✅ Scenario-based learning with interactive decision trees
- ✅ Financial health score calculator with comprehensive assessment
- ✅ Advanced data visualizations with payment impact analysis
- ✅ Enhanced educational content with 20+ learning modules
- ✅ Interactive fee analysis and comparison tools
- ✅ Real-world financial scenarios and challenges

## 🔮 Future Enhancements

- Credit score impact simulation
- Rewards program calculations
- Balance transfer scenarios
- Debt consolidation analysis
- Mobile app version
- API integrations with real financial data
- Advanced scenario builder
- Gamification features

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/billing-enhancement`
3. Make your changes
4. Add tests for billing calculations
5. Submit a pull request

## License

MIT License - Educational and personal use encouraged
