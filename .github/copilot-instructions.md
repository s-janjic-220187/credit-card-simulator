# Credit Card Billing Simulator - AI Coding Instructions

## Project Architecture

This is a full-stack **educational credit card billing simulator** with:

- **Backend**: Node.js/Express + PostgreSQL + Prisma ORM
- **Frontend**: React/TypeScript + Tailwind CSS + Recharts
- **Deployment**: Railway.app + Docker containers

## Key Components & Data Flow

### Core Business Logic

- **BillingService** (`backend/src/services/BillingService.ts`): Central billing calculation engine with interest calculations, minimum payments, and fee structures
- **TransactionService** (`backend/src/services/TransactionService.ts`): Transaction processing and validation
- **CreditScoreCalculatorService**: 100-point financial health scoring system

### Database Schema (Prisma)

- **Users** → **UserProfile** → **CreditCard[]** → **Transaction[]** → **Statement[]**
- Key relationships: User owns multiple credit cards, each card has transactions and statements
- Enums: `TransactionType`, `TransactionCategory`, `TransactionStatus` (use UPPERCASE values)

### Frontend State Management

- **UserContext** (`frontend/src/contexts/UserContext.tsx`): Global user state with reducer pattern
- **React Query**: API state management with 5-minute stale time
- **Toast notifications**: react-hot-toast for user feedback

## Development Workflows

### Database Operations

```bash
# Local development
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run db:seed:dev      # Seed with TypeScript

# Production
npm run db:migrate:deploy # Deploy migrations
npm run db:seed          # Seed with JavaScript
```

### Docker Development

```bash
docker-compose up        # Full stack with PostgreSQL
# Backend: http://localhost:3001
# Frontend: http://localhost:8080
# Database: localhost:5432
```

### Railway Deployment

- **Multi-stage Dockerfiles**: Builder + production stages
- **Environment Variables**:
  - Backend: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`
  - Frontend: `VITE_API_URL` (points to Railway backend)
- **Migration Strategy**: Prisma migrations run in startup script

## Project-Specific Patterns

### API Response Format

```typescript
// Success responses
{ success: true, data: T, message?: string }
// Error responses
{ success: false, message: string, error?: string }
```

### Component Structure

- **Pages** (`frontend/src/pages/`): Route-level components
- **Feature Components** (`frontend/src/components/[Feature]/`): Grouped by domain
- **Shared Components** (`frontend/src/components/Common/`): Reusable UI elements

### Calculation Engine Patterns

- **Daily Interest Rate**: APR / 365 / 100
- **Minimum Payment**: Max(2% of balance, $35, interest + fees)
- **Fee Calculations**: Configurable percentages with caps

### TypeScript Conventions

- **Strict mode enabled**: All components must handle undefined states
- **Interface naming**: `User`, `CreditCard`, `Transaction` (no `I` prefix)
- **Service methods**: Static methods for pure calculations
- **API responses**: Generic `ApiResponse<T>` type

### Authentication Flow

1. **Login/Register** → UserContext state update
2. **Profile Creation** → Required before accessing features
3. **Credit Card Setup** → Required for billing simulation
4. **Dashboard Access** → Full feature availability

### Manual Transaction System (Recent Addition)

- **TransactionController.createManualTransaction**: Validates credit limits, updates balances
- **TransactionForm Component**: Real-time validation with category enums
- **Transaction Types**: `PURCHASE`, `PAYMENT`, `REFUND`, `FEE`, `CASH_ADVANCE`
- **Categories**: `GROCERIES`, `DINING`, `GAS`, etc. (must match Prisma enum values)

## Critical Integration Points

### Database Connection

- **Retry Logic**: 10 attempts with 5-second delays on startup
- **Connection Pooling**: Prisma handles automatically
- **Railway**: Uses connection string with SSL

### CORS Configuration

- **Development**: Allows localhost with any port
- **Production**: Whitelist Railway domains + environment variable origins
- **Credentials**: Always enabled for authentication

### File Structure Conventions

- **Controllers**: One per domain (`UserController`, `BillingController`)
- **Routes**: RESTful patterns (`/api/users`, `/api/credit-cards/:id/transactions`)
- **Services**: Business logic abstraction from controllers
- **Components**: Feature-based organization with co-located styles

## Common Pitfalls

- **Prisma Enums**: Must use UPPERCASE values in API calls
- **Railway Builds**: Environment variables required at build time for frontend
- **JSX Structure**: Strict parsing - ensure balanced div tags
- **Database Migrations**: Always run `prisma generate` after schema changes

## Testing Patterns

### Current State

- **No formal test suite**: Project currently lacks unit/integration tests
- **Manual testing**: Relies on demo credentials and browser testing
- **API testing**: Use curl/Postman for endpoint validation

### Testing Approach When Adding Tests

```bash
# Demo credentials for manual testing
Email: demo@example.com
Password: demo123

# Health checks
curl https://backend-ccs-production.up.railway.app/health
```

## Error Handling & Logging

### Backend Error Patterns

```typescript
// Controller error handling standard
try {
  // business logic
  res.status(200).json({ success: true, data: result });
} catch (error) {
  console.error("Error context:", error);
  res.status(500).json({
    success: false,
    message: "User-friendly message",
    error: error instanceof Error ? error.message : "Unknown error",
  });
}
```

### Logging Conventions

- **Emoji prefixes**: 🔧 config, ✅ success, ❌ error, ⚠️ warning, 🔍 debug
- **Structured logging**: Context-specific console messages with error details
- **Database errors**: Always log full error object but return safe messages to client
- **CORS debugging**: Detailed origin logging for troubleshooting Railway deployments

### Frontend Error Handling

- **Toast notifications**: react-hot-toast for user-facing errors
- **API wrapper**: Centralized error handling in `services/api.ts`
- **React Query**: Automatic retry and error state management

## Performance Considerations

### Database Optimization

- **Prisma relations**: Use `include` carefully to avoid N+1 queries
- **Billing calculations**: Cache results when possible, especially for complex fee calculations
- **Transaction queries**: Always filter by `creditCardId` and date ranges
- **Connection pooling**: Prisma handles automatically, but monitor in production

### Frontend Performance

- **React Query caching**: 5-minute stale time for user data
- **Component lazy loading**: Large calculator components should be code-split
- **Chart rendering**: Recharts can be expensive with large datasets - limit data points
- **State management**: UserContext holds minimal global state, use local state for UI

### Railway Deployment Performance

- **Build optimization**: Multi-stage Dockerfiles reduce image size
- **Memory limits**: Frontend build requires up to 4GB RAM (`NODE_OPTIONS="--max-old-space-size=4096"`)
- **Static assets**: Frontend serves from nginx with compression

## Security Practices

### Authentication & Authorization

```typescript
// JWT token handling
const token = localStorage.getItem("token");
// Always include in axios headers for authenticated requests
```

### Backend Security

- **Password hashing**: bcryptjs with salt rounds of 10
- **JWT secrets**: Minimum 32 characters, environment variable only
- **Input validation**: Joi schemas for request validation
- **SQL injection prevention**: Prisma ORM provides automatic escaping
- **Rate limiting**: Not implemented (consider adding for production)

### CORS Security

- **Development**: Allows all localhost origins
- **Production**: Whitelist only Railway domains and environment-specified origins
- **Credentials**: Always enabled for cookie/header auth

### Data Sanitization

- **User inputs**: Always validate against Prisma schema constraints
- **Enum validation**: Strict matching against defined Prisma enums
- **Financial calculations**: Use Decimal/BigInt for monetary values to avoid floating point errors
- **PII handling**: User profiles contain sensitive data - ensure proper access controls
