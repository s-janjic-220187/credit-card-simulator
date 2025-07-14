/**
 * English Localization File
 * Default language for the SJ-CCMS application
 */

export const en = {
  // Common/Global
  common: {
    // Navigation
    dashboard: 'Dashboard',
    cards: 'Cards',
    billing: 'Billing',
    statements: 'Statements',
    tools: 'Tools',
    learn: 'Learn',
    scenarios: 'Scenarios',
    account: 'Account',
    
    // Account Menu
    profileSettings: 'Profile Settings',
    adminDashboard: 'Admin Dashboard',
    logout: 'Logout',
    
    // Common Actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    create: 'Create',
    update: 'Update',
    submit: 'Submit',
    close: 'Close',
    search: 'Search',
    filter: 'Filter',
    reset: 'Reset',
    confirm: 'Confirm',
    
    // Common Labels
    name: 'Name',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    description: 'Description',
    category: 'Category',
    type: 'Type',
    balance: 'Balance',
    limit: 'Limit',
    available: 'Available',
    
    // Status Values
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
    cancelled: 'Cancelled',
    suspended: 'Suspended',
    closed: 'Closed',
    
    // Time
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    thisYear: 'This Year',
    
    // Currency
    currency: '$',
    
    // Loading States
    loading: 'Loading...',
    noData: 'No data available',
    error: 'Error',
    
    // Validation
    required: 'Required',
    invalid: 'Invalid',
    tooShort: 'Too short',
    tooLong: 'Too long',
  },

  // Authentication
  auth: {
    welcomeBack: 'Welcome Back',
    signInPrompt: 'Sign in to your account',
    loginButton: 'Sign In',
    signingIn: 'Signing In...',
    createAccount: 'Create one',
    demoLogin: '🚀 Use Demo Account',
    loadingDemo: 'Loading Demo...',
    orSeparator: 'or',
    noAccount: "Don't have an account? ",
  },

  // Navigation Component
  navigation: {
    brand: 'SJ-CCMS',
    mobile: {
      menu: 'Menu',
      close: 'Close',
    },
    calculators: {
      title: 'Calculators',
      interestCalculator: 'Interest Calculator',
      paymentStrategy: 'Payment Strategy',
      feeSimulator: 'Fee Simulator',
      financialHealth: 'Financial Health',
    },
    analytics: {
      title: 'Analytics',
      interestGrowth: 'Interest Growth',
      paymentImpact: 'Payment Impact',
      feeAnalysis: 'Fee Analysis',
    },
  },

  // Dashboard
  dashboard: {
    title: 'SJ Credit Card Management Suite',
    subtitle: 'Master credit card fundamentals with this comprehensive educational platform. Learn about billing cycles, interest calculations, payment strategies, and more through interactive tools and simulations.',
    welcome: 'Welcome back!',
    yourCards: 'Your Credit Cards',
    creditCard: 'Credit Card',
    cardholder: 'Cardholder',
    available: 'Available',
    limit: 'Limit',
    balance: 'Balance',
    clickForDetails: 'Click for details →',
    helpText: '💡 Click on any card to view detailed information, transactions, and account details',
    
    // Feature cards
    billingCycle: {
      title: 'Billing Cycle Dashboard',
      description: 'Visualize and manage complete billing cycles with detailed breakdowns of purchases, payments, interest, and fees.',
      action: 'Explore Billing Cycles →'
    },
    interestCalculator: {
      title: 'Interest Calculator',
      description: 'Interactive calculator for APR, daily, and monthly interest rates with educational breakdowns and comparisons.',
      action: 'Calculate Interest →'
    },
    paymentStrategy: {
      title: 'Payment Strategy Analyzer',
      description: 'Compare minimum, custom, and aggressive payment strategies to optimize payoff time and minimize interest costs.',
      action: 'Analyze Strategies →'
    },
    feeSimulator: {
      title: 'Fee Structure Simulator',
      description: 'Analyze and compare credit card fee structures across different usage scenarios and spending patterns.',
      action: 'Simulate Fees →'
    },
    cardBuilder: {
      title: 'Credit Card Profile Builder',
      description: 'Create detailed credit card profiles with custom terms, rewards, and features for comprehensive comparisons.',
      action: 'Build Profiles →'
    },
    statementGenerator: {
      title: 'Statement Generator',
      description: 'Generate realistic credit card statements and understand all components including interest calculations and fees.',
      action: 'Generate Statements →'
    },
    educationCenter: {
      title: 'Education Center',
      description: 'Comprehensive learning modules, tips, and strategies to master credit card management and financial literacy.',
      action: 'Start Learning →'
    },
    financialHealth: {
      title: 'Financial Health Score',
      description: 'Comprehensive assessment of your financial health across credit, debt, cash flow, and financial habits.',
      action: 'Calculate Score →'
    },
    scenarioLearning: {
      title: 'Scenario-Based Learning',
      description: 'Practice financial decision-making through interactive scenarios with real-world challenges and outcomes.',
      action: 'Practice Scenarios →'
    },
    
    // Key features
    keyFeatures: {
      title: '🌟 Key Learning Features',
      interactiveSimulations: {
        title: 'Interactive Simulations',
        description: 'Real-time calculations and scenario modeling'
      },
      educationalContent: {
        title: 'Educational Content',
        description: 'Comprehensive learning modules and guides'
      },
      dataVisualization: {
        title: 'Data Visualization',
        description: 'Charts and graphs for better understanding'
      },
      practicalApplication: {
        title: 'Practical Application',
        description: 'Real-world scenarios and case studies'
      }
    },
    
    // Quick start guide
    quickStart: {
      title: '🚀 Quick Start Guide',
      step1: {
        title: 'Start with Education',
        description: 'Begin with the Education Center to learn credit card fundamentals and best practices.'
      },
      step2: {
        title: 'Use Calculators',
        description: 'Experiment with interactive calculators to understand interest, payments, and fees.'
      },
      step3: {
        title: 'Build & Compare',
        description: 'Create credit card profiles and generate statements to compare different scenarios.'
      }
    },
    
    // Visualizations
    visualizations: {
      title: '📈 Advanced Data Visualizations',
      subtitle: 'Explore interactive charts and visualizations to better understand credit card behavior and payment strategies.',
      interestGrowth: {
        title: 'Interest Growth Charts',
        description: 'Visualize how interest compounds over time with different payment strategies and see the dramatic impact of payment amounts.',
        action: 'Explore Charts'
      },
      paymentImpact: {
        title: 'Payment Impact Visualizer',
        description: 'See the powerful effect of increasing your payments with side-by-side comparisons and savings calculations.',
        action: 'Visualize Impact'
      },
      feeAnalysis: {
        title: 'Fee Analysis Dashboard',
        description: 'Comprehensive analysis of fee structures with interactive charts to understand where your money goes.',
        action: 'Analyze Fees'
      }
    },
    
    // Statistics
    statistics: {
      interactiveTools: 'Interactive Tools',
      dataVisualizations: 'Data Visualizations',
      learningModules: 'Learning Modules',
      scenarios: 'Scenarios to Explore'
    },
    
    // Footer
    footer: {
      createdBy: 'Created by:',
      contact: 'Contact:',
      version: 'Version:',
      description: 'Educational Credit Card Billing Simulator'
    },
    
    quickActions: {
      title: 'Quick Actions',
      newTransaction: 'New Transaction',
      viewStatements: 'View Statements',
      payBill: 'Pay Bill',
      contactSupport: 'Contact Support',
    },
    gettingStarted: {
      title: 'Getting Started',
      step1: {
        title: 'Start with Education',
        description: 'Begin with the Education Center to learn credit card fundamentals and best practices.',
      },
      step2: {
        title: 'Use Calculators',
        description: 'Experiment with interactive calculators to understand interest, payments, and fees.',
      },
      step3: {
        title: 'Explore Scenarios',
        description: 'Try different financial scenarios to see the impact of various decisions.',
      },
    },
    recentActivity: 'Recent Activity',
    upcomingPayments: 'Upcoming Payments',
    accountSummary: 'Account Summary',
  },

  // Credit Card Components
  creditCard: {
    details: {
      title: 'Credit Card Details',
      tabs: {
        overview: 'Overview',
        transactions: 'Transactions',
        details: 'Details',
      },
      cardInfo: {
        cardNumber: 'Card Number',
        expiryDate: 'Expiry Date',
        cvv: 'CVV',
        cardholderName: 'Cardholder Name',
        issueDate: 'Issue Date',
        cardStatus: 'Card Status',
      },
      limits: {
        title: 'Limits and Balances',
        creditLimit: 'Credit Limit',
        currentBalance: 'Current Balance',
        availableCredit: 'Available Credit',
        minimumPayment: 'Minimum Payment',
        nextDueDate: 'Next Due Date',
      },
      fees: {
        title: 'Fees and Interest',
        apr: 'Annual Percentage Rate',
        annualFee: 'Annual Fee',
        lateFeePct: 'Late Fee (%)',
        lateFeeFlat: 'Late Fee (Flat)',
        foreignTransFee: 'Foreign Transaction Fee',
        cashAdvanceFee: 'Cash Advance Fee',
        balanceTransferFee: 'Balance Transfer Fee',
      },
    },
    builder: {
      title: 'Credit Card Profile Builder',
      subtitle: 'Create your personalized credit card profile',
      tabs: {
        basic: 'Basic Info',
        financial: 'Financial Terms',
        rewards: 'Rewards Program',
        features: 'Features & Benefits',
      },
      basic: {
        cardholderName: 'Cardholder Name',
        cardType: 'Card Type',
        issuer: 'Issuer',
        design: 'Card Design',
      },
      financial: {
        creditLimit: 'Credit Limit',
        interestRate: 'Interest Rate',
        annualFee: 'Annual Fee',
        gracePerod: 'Grace Period',
        billingCycle: 'Billing Cycle',
      },
      rewards: {
        programType: 'Program Type',
        cashbackRate: 'Cashback Rate',
        pointsRate: 'Points Rate',
        bonusCategories: 'Bonus Categories',
      },
      features: {
        contactless: 'Contactless',
        mobilePay: 'Mobile Pay',
        fraudProtection: 'Fraud Protection',
        travelInsurance: 'Travel Insurance',
        conciergeService: 'Concierge Service',
      },
    },
  },

  // Transaction Components
  transactions: {
    form: {
      title: 'New Transaction',
      merchant: 'Merchant',
      merchantPlaceholder: 'e.g., Amazon, Walmart, Starbucks',
      category: 'Category',
      categoryRequired: 'Category *',
      description: 'Description',
      descriptionRequired: 'Description *',
      descriptionPlaceholder: 'What was this purchase for?',
      location: 'Location (Optional)',
      locationPlaceholder: 'e.g., New York, NY',
      amount: 'Amount',
      amountRequired: 'Amount *',
    },
    categories: {
      GROCERIES: 'Groceries',
      DINING: 'Dining',
      GAS: 'Gas',
      SHOPPING: 'Shopping',
      TRAVEL: 'Travel',
      HEALTHCARE: 'Healthcare',
      EDUCATION: 'Education',
      OTHER: 'Other',
    },
    history: {
      title: 'Transaction History',
      noTransactions: 'No transactions found',
      filterBy: 'Filter by',
      sortBy: 'Sort by',
      dateRange: 'Date Range',
    },
  },

  // Profile Components
  profile: {
    dashboard: {
      title: 'Profile Information',
      editProfile: 'Edit Profile',
      personalInfo: {
        title: 'Personal Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        dateOfBirth: 'Date of Birth',
      },
      financialInfo: {
        title: 'Financial Information',
        annualIncome: 'Annual Income',
        employmentStatus: 'Employment Status',
        creditScore: 'Credit Score',
        creditRating: 'Credit Rating',
      },
      addressInfo: {
        title: 'Address Information',
        street: 'Street',
        city: 'City',
        state: 'State',
        zipCode: 'ZIP Code',
        country: 'Country',
      },
      creditScoreRanges: {
        excellent: 'Excellent',
        good: 'Good',
        fair: 'Fair',
        poor: 'Poor',
      },
    },
    form: {
      title: 'Edit Profile',
      personalDetails: 'Personal Details',
      financialDetails: 'Financial Details',
      addressDetails: 'Address Details',
      employmentStatuses: {
        EMPLOYED: 'Employed',
        SELF_EMPLOYED: 'Self-Employed',
        UNEMPLOYED: 'Unemployed',
        RETIRED: 'Retired',
        STUDENT: 'Student',
      },
    },
  },

  // Calculator Components
  calculators: {
    interest: {
      title: 'Interest Calculator',
      description: 'Calculate interest charges on your credit card balance',
      principal: 'Principal Balance',
      annualRate: 'Annual Interest Rate (%)',
      months: 'Months',
      monthlyPayment: 'Monthly Payment',
      result: {
        totalInterest: 'Total Interest',
        totalPaid: 'Total Amount Paid',
        payoffTime: 'Payoff Time',
      },
    },
    paymentStrategy: {
      title: 'Payment Strategy Calculator',
      description: 'Compare different payment strategies',
      minimumPayment: 'Minimum Payment',
      customPayment: 'Custom Payment',
      strategy: {
        minimum: 'Minimum Payment Only',
        fixed: 'Fixed Payment',
        percentage: 'Percentage of Balance',
      },
    },
    feeSimulator: {
      title: 'Fee Simulator',
      description: 'Simulate various credit card fees',
      latePaymentFee: 'Late Payment Fee',
      overlimitFee: 'Over-limit Fee',
      foreignTransactionFee: 'Foreign Transaction Fee',
      cashAdvanceFee: 'Cash Advance Fee',
    },
    financialHealth: {
      title: 'Financial Health Calculator',
      description: 'Assess your financial health',
      monthlyIncome: 'Monthly Income',
      monthlyExpenses: 'Monthly Expenses',
      monthlyDebtPayments: 'Monthly Debt Payments',
      emergencyFund: 'Emergency Fund',
      creditCardDebt: 'Credit Card Debt',
      otherDebt: 'Other Debt',
      result: {
        score: 'Health Score',
        rating: 'Rating',
        recommendations: 'Recommendations',
      },
    },
  },

  // Education Components
  education: {
    dashboard: {
      title: 'Credit Card Education Center',
      subtitle: 'Master credit card fundamentals, strategies, and best practices to make informed financial decisions.',
      tabs: {
        overview: 'Overview',
        modules: 'Learning Modules',
        tips: 'Tips & Strategies',
        calculator: 'Quick Calculator',
        quiz: 'Knowledge Quiz',
      },
      progress: {
        learningProgress: 'Learning Progress',
        totalPoints: 'Total Points',
        earnPoints: 'Earn 10 points per completed module',
        learningLevel: 'Learning Level',
        advanceLevel: 'Complete more modules to advance',
      },
      quickStart: {
        title: 'Quick Start Guide',
        newToCreditCards: {
          title: 'New to Credit Cards?',
          step1: 'Start with Basics: Learn fundamental concepts',
          step2: 'Understand Interest: Know how costs are calculated',
          step3: 'Payment Strategies: Learn smart payment methods',
        },
        wantToOptimize: {
          title: 'Want to Optimize?',
          step1: 'Rewards Maximization: Get more value from spending',
          step2: 'Credit Score Optimization: Improve your score',
          step3: 'Advanced Strategies: Master complex techniques',
        },
      },
      featuredTips: {
        title: 'Featured Tips',
      },
      quickCalculator: {
        title: 'Quick Financial Calculator',
        description: 'Use interactive calculators to understand interest, payments, and rewards in real-time.',
        interestCalculator: {
          title: 'Interest Calculator',
          description: 'Calculate interest charges on your balance',
          button: 'Open Calculator',
        },
        paymentStrategy: {
          title: 'Payment Strategy',
          description: 'Compare different payment strategies',
          button: 'Open Calculator',
        },
        rewardsCalculator: {
          title: 'Rewards Calculator',
          description: 'Calculate potential rewards earnings',
          button: 'Open Calculator',
        },
      },
      knowledgeQuiz: {
        title: 'Knowledge Quiz',
        description: 'Test your credit card knowledge with this comprehensive quiz covering all topics.',
        comingSoon: 'Coming Soon! An interactive quiz will be added shortly.',
      },
    },
    modules: {
      basics: {
        title: 'Credit Card Basics',
        overview: 'Learn the fundamental concepts of credit cards, how they work, and why they are a valuable financial tool.',
        keyPoints: [
          'What is a credit card and how does it work',
          'Difference between credit cards and debit cards',
          'Basic credit card terminology',
          'Types of credit cards available',
          'Pros and cons of using credit cards',
        ],
      },
      interest: {
        title: 'Understanding Interest and APR',
        overview: 'Master how credit card interest is calculated and how you can minimize interest charges.',
        keyPoints: [
          'What is APR and how it differs from interest rates',
          'How daily periodic rates work',
          'Grace period and how to take advantage of it',
          'Factors that affect your interest rates',
          'Strategies to avoid interest charges',
        ],
      },
      payments: {
        title: 'Payment Strategies',
        overview: 'Learn different payment strategies and their impact on your financial health.',
        keyPoints: [
          'Understanding minimum payment requirements',
          'Benefits of paying full balance',
          'Strategic partial payments',
          'Timing of payments for optimal impact',
          'Automating payments for consistency',
        ],
      },
    },
    tips: {
      categories: {
        payment_strategy: 'Payment Strategy',
        credit_utilization: 'Credit Utilization',
        rewards_optimization: 'Rewards Optimization',
        fee_avoidance: 'Fee Avoidance',
        credit_building: 'Credit Building',
      },
      impactLevels: {
        high: 'High Impact',
        medium: 'Medium Impact',
        low: 'Low Impact',
      },
    },
  },

  // Admin Components
  admin: {
    dashboard: {
      title: 'Admin Dashboard',
      subtitle: 'System administration and user monitoring',
      tabs: {
        overview: 'Overview',
        users: 'Users',
        creditCards: 'Credit Cards',
        transactions: 'Transactions',
      },
      stats: {
        totalUsers: 'Total Users',
        recentlyCreated: 'Recently Created',
        totalCards: 'Total Cards',
        totalTransactions: 'Total Transactions',
        totalValue: 'Total Value',
      },
      userManagement: {
        title: 'User Management',
        viewDetails: 'View Details',
        editUser: 'Edit User',
        deleteUser: 'Delete User',
        userDetails: {
          title: 'User Details',
          personalInfo: 'Personal Information',
          accountInfo: 'Account Information',
          creditCards: 'Credit Cards',
          role: 'Role',
          createdAt: 'Created At',
          lastLogin: 'Last Login',
        },
      },
      creditCardManagement: {
        title: 'Credit Card Management',
        editCard: 'Edit Card',
        cardDetails: 'Card Details',
        updateCard: 'Update Card',
        cardSummary: 'Card Summary',
      },
      transactionMonitoring: {
        title: 'Transaction Monitoring',
        recentTransactions: 'Recent Transactions',
        noTransactions: 'No transactions found',
      },
    },
  },

  // Billing and Statements
  billing: {
    cycle: {
      title: 'Billing Cycles',
      currentCycle: 'Current Cycle',
      nextStatement: 'Next Statement',
      cycleLength: 'Cycle Length',
      gracePerod: 'Grace Period',
    },
    statement: {
      title: 'Statement',
      generate: 'Generate Statement',
      download: 'Download',
      period: 'Statement Period',
      summary: 'Summary',
    },
  },

  // Visualizations
  visualizations: {
    interestGrowth: {
      title: 'Interest Growth Charts',
      description: 'Visualize how interest accumulates over time',
    },
    paymentImpact: {
      title: 'Payment Impact Visualizer',
      description: 'See how different payment amounts dramatically affect your debt payoff journey',
      calculating: 'Calculating payment impact...',
      controls: {
        customPayment: 'Custom Payment ($)',
        viewType: 'View Type',
        balanceOverTime: 'Balance Over Time',
        interestSavings: 'Interest Savings',
      },
    },
    feeAnalysis: {
      title: 'Fee Analysis',
      description: 'Analyze various credit card fees and their impact',
    },
  },

  // Learning Scenarios
  scenarios: {
    title: 'Learning Scenarios',
    description: 'Explore different financial scenarios and their outcomes',
  },

  // Error Messages
  errors: {
    generic: 'An error occurred. Please try again.',
    network: 'Network error. Please check your connection.',
    notFound: 'The requested resource was not found.',
    unauthorized: 'You are not authorized to perform this action.',
    validation: 'Please check your input.',
    server: 'Server error. Please try again later.',
  },

  // Success Messages
  success: {
    saved: 'Successfully saved',
    updated: 'Successfully updated',
    deleted: 'Successfully deleted',
    created: 'Successfully created',
    loggedOut: 'Successfully logged out',
  },

  // Logout Page
  logout: {
    title: 'Logged Out',
    message: 'You have been successfully logged out.',
    subtitle: 'Thank you for using SJ-CCMS!',
    description: 'Your session has been securely ended. You can log in again at any time to access your account.',
    actions: {
      loginAgain: 'Log In Again',
      backToHome: 'Back to Home',
    },
    securityNote: 'For security reasons, all active sessions have been terminated.',
  },
};
