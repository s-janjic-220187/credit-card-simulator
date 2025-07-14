// User types
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country: string;
  annualIncome?: number;
  creditScore?: number;
  employmentStatus?: string;
  createdAt: string;
  updatedAt: string;
}

// Credit Card types
export interface CreditCard {
  id: string;
  userId: string;
  cardNumber: string;
  cardholderName: string;
  cardType: string;
  expiryDate: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  creditLimit: number;
  currentBalance: number;
  availableCredit: number;
  apr: number;
  status: CardStatus;
  issueDate: string;
  cycleStartDate: number;
  lastStatementDate?: string;
  nextDueDate?: string;
  minimumPayment: number;
  createdAt: string;
  updatedAt: string;
  user?: UserProfile;
  transactions?: Transaction[];
  payments?: Payment[];
}

export type CardStatus = 'ACTIVE' | 'FROZEN' | 'CLOSED' | 'EXPIRED';

// Transaction types
export interface Transaction {
  id: string;
  creditCardId: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: TransactionCategory;
  merchantName?: string;
  location?: string;
  timestamp: string;
  status: TransactionStatus;
  referenceId?: string;
  statementId?: string;
  createdAt: string;
}

export type TransactionType = 'PURCHASE' | 'REFUND' | 'INTEREST_CHARGE' | 'FEE' | 'PAYMENT' | 'CREDIT';

export type TransactionCategory = 
  | 'GROCERIES'
  | 'DINING'
  | 'GAS'
  | 'UTILITIES'
  | 'ENTERTAINMENT'
  | 'SHOPPING'
  | 'TRAVEL'
  | 'HEALTHCARE'
  | 'EDUCATION'
  | 'OTHER';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'FAILED';

// Payment types
export interface Payment {
  id: string;
  creditCardId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  referenceId?: string;
  description?: string;
  createdAt: string;
}

export type PaymentMethod = 'BANK_TRANSFER' | 'CHECK' | 'ONLINE' | 'AUTO_PAY' | 'CASH';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

// Form types
export interface CreateUserProfileData {
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

export interface CreateCreditCardData {
  cardholderName: string;
  creditLimit: number;
  apr?: number;
  cycleStartDate?: number;
}

export interface CreateTransactionData {
  amount: number;
  description: string;
  category?: TransactionCategory;
  merchantName?: string;
  location?: string;
}

// Statistics types
export interface TransactionStats {
  totalTransactions: number;
  totalSpent: number;
  totalRefunds: number;
  avgTransactionAmount: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    count: number;
  }>;
}

// Billing Cycle types
export interface BillingCycle {
  id: string;
  creditCardId: string;
  cycleNumber: number;
  startDate: string;
  endDate: string;
  dueDate: string;
  startingBalance: number;
  endingBalance: number;
  averageDailyBalance: number;
  totalPurchases: number;
  totalPayments: number;
  interestCharged: number;
  feesCharged: number;
  minimumPayment: number;
  isPaid: boolean;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
  transactions?: Transaction[];
  payments?: Payment[];
}

// Calculator types
export interface InterestCalculation {
  principal: number;
  apr: number;
  minimumPayment: number;
  payoffTime: number;
  totalInterest: number;
  monthlyInterest: number;
}

export interface PaymentStrategy {
  name: string;
  monthlyPayment: number;
  payoffTime: number;
  totalInterest: number;
  totalAmount: number;
  savings?: number;
}

export interface FeeStructure {
  annualFee: number;
  lateFee: number;
  overLimitFee: number;
  foreignTransactionFee: number;
  cashAdvanceFee: number;
  balanceTransferFee: number;
}

export interface FinancialHealthMetrics {
  creditUtilization: number;
  paymentHistory: number;
  accountAge: number;
  creditMix: number;
  newCredit: number;
  totalScore: number;
  recommendations: string[];
}

// Visualization types
export interface ChartDataPoint {
  month: number;
  balance: number;
  interestPaid: number;
  principalPaid: number;
  cumulativeInterest: number;
}

export interface PaymentImpactData {
  scenario: string;
  monthlyPayment: number;
  payoffMonths: number;
  totalInterest: number;
  totalPaid: number;
}

// Learning/Educational types
export interface LearningScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  questions: ScenarioQuestion[];
  completionReward: number;
}

export interface ScenarioQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface UserProgress {
  userId: string;
  scenariosCompleted: string[];
  totalPoints: number;
  achievements: string[];
  currentLevel: number;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

export type NotificationType = 
  | 'PAYMENT_DUE'
  | 'PAYMENT_OVERDUE' 
  | 'HIGH_UTILIZATION'
  | 'CREDIT_LIMIT_REACHED'
  | 'SUSPICIOUS_ACTIVITY'
  | 'EDUCATIONAL_TIP'
  | 'ACHIEVEMENT_UNLOCKED'
  | 'SYSTEM_MAINTENANCE';

// Credit Score types
export interface CreditScoreHistory {
  id: string;
  userId: string;
  score: number;
  date: string;
  factors: CreditScoreFactor[];
}

export interface CreditScoreFactor {
  factor: string;
  impact: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  weight: number;
  description: string;
}

// Statement types
export interface Statement {
  id: string;
  creditCardId: string;
  billingCycleId: string;
  statementDate: string;
  dueDate: string;
  minimumPayment: number;
  newBalance: number;
  previousBalance: number;
  paymentsAndCredits: number;
  purchasesAndDebits: number;
  interestCharged: number;
  feesCharged: number;
  transactions: Transaction[];
  isGenerated: boolean;
  isPaid: boolean;
  createdAt: string;
}

// Error handling types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: ValidationError[];
  timestamp: string;
}
