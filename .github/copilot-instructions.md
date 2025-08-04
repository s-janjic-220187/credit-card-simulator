# Credit Card Billing Simulator - AI Assistant Instructions

> **For AI assistants working on this full-stack educational credit card billing simulator**

## Architecture Overview

**Full-stack educational credit card billing simulator:**

- **Backend**: Node.js/Express + PostgreSQL + Prisma ORM
- **Frontend**: React/TypeScript + Tailwind CSS + Recharts
- **Deployment**: Railway.app + Docker containers

## Core Services & Data Flow

### Business Logic Services

- **BillingService**: Central calculation engine (interest, payments, fees)
- **TransactionService**: Transaction processing and validation
- **CreditScoreCalculatorService**: 100-point financial health scoring

### Database Schema (Prisma)

**Users** → **UserProfile** → **CreditCard[]** → **Transaction[]** → **Statement[]**

- Enums: Use UPPERCASE values (`PURCHASE`, `PAYMENT`, `GROCERIES`, etc.)

### State Management

- **UserContext**: Global user state with reducer pattern
- **React Query**: 5-minute stale time for API responses
- **Toast Notifications**: react-hot-toast for user feedback

## Essential Commands

### Database Operations

```bash
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed:dev      # Seed with TypeScript
npm run db:migrate:deploy # Deploy migrations (production)
```

### Development

```bash
docker-compose up        # Full stack (Backend: 3001, Frontend: 8080, DB: 5432)
npm run dev             # Start development servers
```

### Railway Deployment

- **Environment Variables**: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`, `VITE_API_URL`
- **Migration Strategy**: Auto-run on startup

## Project-Specific Patterns

### API Response Format

```typescript
// Success: { success: true, data: T, message?: string }
// Error: { success: false, message: string, error?: string }
```

### Component Structure

- **Pages** (`pages/`): Route-level components
- **Features** (`components/[Feature]/`): Domain-grouped
- **Shared** (`components/Common/`): Reusable UI

### Calculation Patterns

- **Daily Interest**: APR / 365 / 100
- **Minimum Payment**: Max(2% balance, $35, interest + fees)

### TypeScript Conventions

- **Strict mode**: Handle undefined states
- **Interfaces**: `User`, `Transaction` (no `I` prefix)
- **Services**: Static methods for calculations
- **API**: Generic `ApiResponse<T>` type

### Manual Transaction System

- **Controller**: Validates limits, updates balances
- **Form Component**: Real-time validation
- **Types**: `PURCHASE`, `PAYMENT`, `REFUND`, `FEE`
- **Categories**: `GROCERIES`, `DINING`, `GAS` (match Prisma enums)

## Critical Integration Points

### Database Connection

- **Retry Logic**: 10 attempts with 5-second delays
- **Prisma**: Auto connection pooling
- **Railway**: SSL connection strings

### CORS Configuration

- **Development**: Localhost any port
- **Production**: Railway domains + env origins
- **Credentials**: Always enabled

### Common Pitfalls

- **Prisma Enums**: UPPERCASE values required
- **Railway Builds**: Build-time env vars needed
- **JSX**: Strict parsing - balanced tags
- **Migrations**: Run `prisma generate` after schema changes

## Testing & Quality

### Current State

- **Manual Testing**: Demo credentials (demo@example.com / demo123)
- **Health Checks**: `/health` and `/ping` endpoints
- **Railway Testing**: Production environment validation

### Error Handling Standards

```typescript
// Controller pattern
try {
  res.status(200).json({ success: true, data: result });
} catch (error) {
  console.error("Context:", error);
  res.status(500).json({
    success: false,
    message: "User-friendly message",
  });
}
```

### Logging Conventions

- **Emoji Prefixes**: 🔧 config, ✅ success, ❌ error, ⚠️ warning
- **Structured Context**: Error details with safe client messages
- **CORS Debugging**: Origin logging for Railway troubleshooting

## Performance & Security

### Database Optimization

- **Prisma Relations**: Careful `include` usage to avoid N+1 queries
- **Transaction Queries**: Filter by `creditCardId` and date ranges
- **Connection Pooling**: Automatic via Prisma

### Frontend Performance

- **React Query**: 5-minute cache with stale-while-revalidate
- **Code Splitting**: Lazy load calculator components
- **Chart Optimization**: Limit Recharts data points for large datasets

### Railway Deployment

- **Build Memory**: Frontend requires 4GB RAM (`NODE_OPTIONS="--max-old-space-size=4096"`)
- **Multi-stage Docker**: Reduce production image size
- **Static Assets**: Nginx compression enabled

### Security Essentials

- **Authentication**: JWT with bcryptjs (10 salt rounds)
- **Input Validation**: Joi schemas + Prisma constraints
- **CORS**: Railway domains whitelist only
- **PII Protection**: Secure user profile data handling
- **Financial Precision**: Decimal/BigInt for monetary calculations
