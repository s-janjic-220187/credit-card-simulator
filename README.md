# 💳 Credit Card Billing Cycle Simulator

> **A comprehensive educational platform for understanding credit card billing mechanics, interest calculations, and financial literacy.**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&log## 👤 Author

**Srdjan Janjic**  
📧 Email: srdjan.janjic22@gmail.com  
🌟 Version: v1.0.0  

---

## 💭 About This Project

- **Educational Focus**: Created to provide better financial literacy tools
- **Open Source**: Built with amazing open-source technologies  
- **Learning**: Designed to make credit card concepts accessible and interactive

## 📞 Support

- **Documentation**: [View Docs](./docs/)
- **Issues**: [GitHub Issues](https://github.com/s-janjic-220187/credit-card-simulator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/s-janjic-220187/credit-card-simulator/discussions)

---

**⭐ If this project helps you understand credit cards better, please consider giving it a star!**goColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)

## 🎯 Project Vision

Transform credit card education through interactive simulation and visualization. This platform helps users understand:
- **Billing cycles** and statement generation
- **Interest calculations** and compounding effects  
- **Payment strategies** and their long-term impact
- **Fee structures** and how to avoid them
- **Credit utilization** and score implications
- **Financial decision-making** through scenarios

## 🏗️ Architecture Overview

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
