# 💳 Credit Card Billing Cycle Simulator - Setup Guide

## Project Overview

This VS Code workspace provides a comprehensive **Credit Card Billing Cycle Simulator** designed for educational purposes. The application allows users to create multiple credit card profiles and observe detailed billing cycle calculations, interest computations, fee structures, and statement generation.

**Key Focus**: Understanding how credit card billing works through realistic simulation and calculation.

### Project Structure

```
credit-card-simulator/
├── backend/                     # Node.js/Express API with PostgreSQL
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── ProfileController.ts
│   │   │   └── CreditCardController.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── UserProfile.ts
│   │   │   ├── CreditCard.ts
│   │   │   └── Transaction.ts
│   │   ├── routes/
│   │   │   ├── profileRoutes.ts
│   │   │   └── creditCardRoutes.ts
│   │   ├── lib/
│   │   │   └── prisma.ts
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── .env
│   └── package.json
├── frontend/                    # React/Vite application with Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── Profile/
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   └── ProfileDashboard.tsx
│   │   │   ├── CreditCards/
│   │   │   │   ├── CreditCardList.tsx
│   │   │   │   └── CreateCreditCardForm.tsx
│   │   │   ├── Transactions/
│   │   │   │   └── TransactionForm.tsx
│   │   │   └── Navigation.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── profileService.ts
│   │   │   └── creditCardService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── utils/
│   ├── .env
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
└── credit-card-simulator.code-workspace
```

## Features Implemented

### Backend Features

- **PostgreSQL Database**: Migrated to PostgreSQL with Prisma ORM
- **User Profile Model**: Complete user profile schema with Prisma validation
- **Credit Card System**: Full credit card management with transactions
- **Profile Controller**: Full CRUD operations for user profiles
- **Credit Card Controller**: Create, manage, and simulate credit cards
- **API Routes**: RESTful endpoints for profile and credit card management
- **Database Seeding**: Sample data for testing and development
- **Type Safety**: Full TypeScript integration with Prisma Client

### Frontend Features

- **Profile Dashboard**: Beautiful, responsive profile overview
- **Profile Form**: Comprehensive form for creating/editing profiles
- **Profile Service**: API integration with error handling
- **Responsive Design**: Mobile-friendly UI components
- **Form Validation**: Client-side validation with user feedback
- **Modern UI**: Styled components with animations and hover effects

### Profile Fields

- **Personal Information**: Name, email, phone, date of birth
- **Address**: Complete address with state selection
- **Financial Data**: Employment status, annual income, credit score
- **Security**: Social Security Number (encrypted storage)
- **Preferences**: Currency, timezone, notification settings
- **Profile Picture**: Avatar support with placeholder fallback

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Open the workspace**:

   ```bash
   code credit-card-simulator.code-workspace
   ```

2. **Install dependencies** (use VS Code tasks or manual):

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment variables**:

   - Backend: Update `backend/.env` with your PostgreSQL DATABASE_URL and secrets
   - Frontend: Update `frontend/.env` if needed

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

### Using VS Code Tasks

This workspace includes predefined tasks:

- **Ctrl+Shift+P** → "Tasks: Run Task"
- Select "Start Backend Dev Server" or "Start Frontend Dev Server"

## API Endpoints

### Profile Routes (`/api/profile`)

- `POST /` - Create user profile
- `GET /me` - Get current user's profile
- `GET /:userId` - Get specific user's profile
- `PUT /:userId` - Update user profile
- `DELETE /:userId` - Delete user profile
- `GET /all` - Get all profiles (admin only)

### Example API Usage

```javascript
// Create profile
const profile = await profileService.createProfile({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "555-123-4567",
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "USA",
  },
  dateOfBirth: "1990-01-01",
  socialSecurityNumber: "123-45-6789",
  employmentStatus: "EMPLOYED",
  annualIncome: 75000,
  creditScore: 720,
});
```

## Development Workflow

### Adding New Profile Features

1. Update the `UserProfile` model in `backend/src/models/UserProfile.ts`
2. Modify the controller validation in `ProfileController.ts`
3. Update the frontend types in `profileService.ts`
4. Enhance the form component in `ProfileForm.tsx`
5. Update the dashboard display in `ProfileDashboard.tsx`

### Database Schema

```typescript
// Prisma schema types
interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: Date;
  socialSecurityNumber: string; // Encrypted
  employmentStatus: EmploymentStatus; // EMPLOYED, UNEMPLOYED, SELF_EMPLOYED, RETIRED, STUDENT
  annualIncome: number;
  creditScore: number;
  profilePicture?: string;
  timezone?: string;
  currency?: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Security Considerations

- Social Security Numbers are marked for encryption (implementation needed)
- JWT authentication integration ready
- CORS configured for development
- Input validation on both client and server
- Sensitive data excluded from JSON serialization

## Styling & UI

The profile system uses a modern, professional design with:

- Gradient backgrounds and smooth animations
- Responsive grid layouts
- Form validation feedback
- Loading states and error handling
- Credit score visualization with color coding
- Mobile-first responsive design

## Next Steps

1. **Authentication**: Implement JWT authentication middleware
2. **File Upload**: Add profile picture upload functionality
3. **Encryption**: Implement SSN encryption/decryption
4. **Testing**: Add unit and integration tests
5. **Credit Cards**: Integrate with credit card management system
6. **Notifications**: Implement email/SMS notification system

## Workspace Configuration

The `.code-workspace` file includes:

- Multi-folder workspace setup
- Task definitions for development
- Debug configuration
- Extension recommendations
- Unified settings for consistent development

## Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/credit_card_simulator
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-32-character-encryption-key
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Credit Card Simulator
VITE_APP_VERSION=1.0.0
```

## Support

For questions or issues with the profile system:

1. Check the browser console for frontend errors
2. Check the server logs for backend errors
3. Verify environment variables are correctly set
4. Ensure PostgreSQL is running and accessible
5. Run `npx prisma studio` to inspect the database

---

**Note**: This profile system is designed to be extensible and can be enhanced with additional features as needed for the credit card simulation requirements.
