// Shared types for the Credit Card Billing Simulator Backend

export enum TransactionType {
  PURCHASE = 'PURCHASE',
  PAYMENT = 'PAYMENT',
  CASH_ADVANCE = 'CASH_ADVANCE',
  BALANCE_TRANSFER = 'BALANCE_TRANSFER',
  FEE = 'FEE',
  INTEREST = 'INTEREST',
  REFUND = 'REFUND'
}

export enum TransactionCategory {
  GROCERIES = 'GROCERIES',
  DINING = 'DINING',
  GAS = 'GAS',
  UTILITIES = 'UTILITIES',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SHOPPING = 'SHOPPING',
  TRAVEL = 'TRAVEL',
  HEALTHCARE = 'HEALTHCARE',
  EDUCATION = 'EDUCATION',
  OTHER = 'OTHER'
}

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  FROZEN = 'FROZEN',
  CLOSED = 'CLOSED',
  EXPIRED = 'EXPIRED'
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  ONLINE = 'ONLINE',
  AUTO_PAY = 'AUTO_PAY',
  CASH = 'CASH'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export enum NotificationType {
  PAYMENT_DUE = 'PAYMENT_DUE',
  PAYMENT_OVERDUE = 'PAYMENT_OVERDUE',
  HIGH_UTILIZATION = 'HIGH_UTILIZATION',
  CREDIT_LIMIT_REACHED = 'CREDIT_LIMIT_REACHED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  EDUCATIONAL_TIP = 'EDUCATIONAL_TIP',
  ACHIEVEMENT_UNLOCKED = 'ACHIEVEMENT_UNLOCKED',
  SYSTEM_MAINTENANCE = 'SYSTEM_MAINTENANCE'
}

// Request/Response interfaces
export interface CreateUserProfileRequest {
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  employmentStatus?: string;
  annualIncome?: number;
  creditScore?: number;
}

export interface CreateCreditCardRequest {
  cardholderName: string;
  creditLimit: number;
  apr?: number;
  cycleStartDate?: number;
  cardType?: string;
  issuer?: string;
}

export interface CreateTransactionRequest {
  creditCardId: string;
  amount: number;
  description: string;
  category?: TransactionCategory;
  merchantName?: string;
  location?: string;
  type?: TransactionType;
}

export interface BillingCycleCalculation {
  cycleNumber: number;
  startDate: Date;
  endDate: Date;
  dueDate: Date;
  startingBalance: number;
  endingBalance: number;
  averageDailyBalance: number;
  totalPurchases: number;
  totalPayments: number;
  interestCharged: number;
  feesCharged: number;
  minimumPayment: number;
}

export interface InterestCalculationResult {
  dailyRate: number;
  monthlyInterest: number;
  compoundedInterest: number;
  averageDailyBalance: number;
  daysInCycle: number;
}

export interface PaymentAnalysis {
  minimumPayment: number;
  suggestedPayment: number;
  payoffTime: number;
  totalInterest: number;
  interestSavings: number;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp: string;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ServiceError extends Error {
  code: string;
  statusCode: number;
  details?: ValidationError[];
}

// Database query options
export interface QueryOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
