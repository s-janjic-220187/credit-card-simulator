/**
 * English Localization File
 * Default language for the SJ-CCMS application
 */

export const en = {
  // Common/Global
  common: {
    // Navigation
    dashboard: "Dashboard",
    cards: "Cards",
    billing: "Billing",
    statements: "Statements",
    tools: "Tools",
    learn: "Learn",
    scenarios: "Scenarios",
    account: "Account",

    // Account Menu
    profileSettings: "Profile Settings",
    adminDashboard: "Admin Dashboard",
    logout: "Logout",

    // Common Actions
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    create: "Create",
    update: "Update",
    submit: "Submit",
    close: "Close",
    search: "Search",
    filter: "Filter",
    reset: "Reset",
    confirm: "Confirm",

    // Common Labels
    name: "Name",
    email: "Email",
    username: "Username",
    password: "Password",
    status: "Status",
    date: "Date",
    amount: "Amount",
    description: "Description",
    category: "Category",
    type: "Type",
    balance: "Balance",
    limit: "Limit",
    available: "Available",

    // Status Values
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    suspended: "Suspended",
    closed: "Closed",

    // Time
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    thisMonth: "This Month",
    lastMonth: "Last Month",
    thisYear: "This Year",

    // Currency
    currency: "$",

    // Loading States
    loading: "Loading...",
    noData: "No data available",
    error: "Error",

    // Validation
    required: "Required",
    invalid: "Invalid",
    tooShort: "Too short",
    tooLong: "Too long",
  },

  // Authentication
  auth: {
    welcomeBack: "Welcome Back",
    signInPrompt: "Sign in to your account",
    loginButton: "Sign In",
    signingIn: "Signing In...",
    createAccount: "Create one",
    demoLogin: "🚀 Use Demo Account",
    loadingDemo: "Loading Demo...",
    orSeparator: "or",
    noAccount: "Don't have an account? ",

    // Registration
    registration: {
      title: "Create Account",
      subtitle: "Get started with your credit card simulator",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      createButton: "Create Account",
      creating: "Creating Account...",
      alreadyHaveAccount: "Already have an account? ",
      signIn: "Sign in",

      // Validation Messages
      passwordMismatch: "Passwords do not match",
      accountCreationFailed: "Failed to create account",
    },

    // Credit Card Demo
    cardDemo: {
      cardHolder: "CARD HOLDER",
      expires: "EXPIRES",
      demoUser: "SJ-CCMS USER",
    },
  },

  // Navigation Component
  navigation: {
    brand: "SJ-CCMS",
    mobile: {
      menu: "Menu",
      close: "Close",
    },
    calculators: {
      title: "Calculators",
      interestCalculator: "Interest Calculator",
      paymentStrategy: "Payment Strategy",
      feeSimulator: "Fee Simulator",
      financialHealth: "Financial Health",
    },
    analytics: {
      title: "Analytics",
      interestGrowth: "Interest Growth",
      paymentImpact: "Payment Impact",
      feeAnalysis: "Fee Analysis",
    },
  },

  // Dashboard
  dashboard: {
    title: "SJ Credit Card Management Suite",
    subtitle:
      "Master credit card fundamentals with this comprehensive educational platform. Learn about billing cycles, interest calculations, payment strategies, and more through interactive tools and simulations.",
    welcome: "Welcome back!",
    yourCards: "Your Credit Cards",
    creditCard: "Credit Card",
    cardholder: "Cardholder",
    available: "Available",
    limit: "Limit",
    balance: "Balance",
    clickForDetails: "Click for details →",
    helpText:
      "💡 Click on any card to view detailed information, transactions, and account details",

    // Feature cards
    billingCycle: {
      title: "Billing Cycle Dashboard",
      description:
        "Visualize and manage complete billing cycles with detailed breakdowns of purchases, payments, interest, and fees.",
      action: "Explore Billing Cycles →",
    },
    interestCalculator: {
      title: "Interest Calculator",
      description:
        "Interactive calculator for APR, daily, and monthly interest rates with educational breakdowns and comparisons.",
      action: "Calculate Interest →",
    },
    paymentStrategy: {
      title: "Payment Strategy Analyzer",
      description:
        "Compare minimum, custom, and aggressive payment strategies to optimize payoff time and minimize interest costs.",
      action: "Analyze Strategies →",
    },
    feeSimulator: {
      title: "Fee Structure Simulator",
      description:
        "Analyze and compare credit card fee structures across different usage scenarios and spending patterns.",
      action: "Simulate Fees →",
    },
    cardBuilder: {
      title: "Credit Card Profile Builder",
      description:
        "Create detailed credit card profiles with custom terms, rewards, and features for comprehensive comparisons.",
      action: "Build Profiles →",
    },
    transactionManagement: {
      title: "Transaction Management",
      description:
        "Add, edit, and manage manual transactions for your credit cards. Track spending and payments.",
      action: "Manage Transactions →",
    },
    statementGenerator: {
      title: "Statement Generator",
      description:
        "Generate realistic credit card statements and understand all components including interest calculations and fees.",
      action: "Generate Statements →",
    },
    educationCenter: {
      title: "Education Center",
      description:
        "Comprehensive learning modules, tips, and strategies to master credit card management and financial literacy.",
      action: "Start Learning →",
    },
    financialHealth: {
      title: "Financial Health Score",
      description:
        "Comprehensive assessment of your financial health across credit, debt, cash flow, and financial habits.",
      action: "Calculate Score →",
    },
    scenarioLearning: {
      title: "Scenario-Based Learning",
      description:
        "Practice financial decision-making through interactive scenarios with real-world challenges and outcomes.",
      action: "Practice Scenarios →",
    },

    // Key features
    keyFeatures: {
      title: "🌟 Key Learning Features",
      interactiveSimulations: {
        title: "Interactive Simulations",
        description: "Real-time calculations and scenario modeling",
      },
      educationalContent: {
        title: "Educational Content",
        description: "Comprehensive learning modules and guides",
      },
      dataVisualization: {
        title: "Data Visualization",
        description: "Charts and graphs for better understanding",
      },
      practicalApplication: {
        title: "Practical Application",
        description: "Real-world scenarios and case studies",
      },
    },

    // Quick start guide
    quickStart: {
      title: "🚀 Quick Start Guide",
      step1: {
        title: "Start with Education",
        description:
          "Begin with the Education Center to learn credit card fundamentals and best practices.",
      },
      step2: {
        title: "Use Calculators",
        description:
          "Experiment with interactive calculators to understand interest, payments, and fees.",
      },
      step3: {
        title: "Build & Compare",
        description:
          "Create credit card profiles and generate statements to compare different scenarios.",
      },
    },

    // Visualizations
    visualizations: {
      title: "📈 Advanced Data Visualizations",
      subtitle:
        "Explore interactive charts and visualizations to better understand credit card behavior and payment strategies.",
      interestGrowth: {
        title: "Interest Growth Charts",
        description:
          "Visualize how interest compounds over time with different payment strategies and see the dramatic impact of payment amounts.",
        action: "Explore Charts",
      },
      paymentImpact: {
        title: "Payment Impact Visualizer",
        description:
          "See the powerful effect of increasing your payments with side-by-side comparisons and savings calculations.",
        action: "Visualize Impact",
      },
      feeAnalysis: {
        title: "Fee Analysis Dashboard",
        description:
          "Comprehensive analysis of fee structures with interactive charts to understand where your money goes.",
        action: "Analyze Fees",
      },
    },

    // Statistics
    statistics: {
      interactiveTools: "Interactive Tools",
      dataVisualizations: "Data Visualizations",
      learningModules: "Learning Modules",
      scenarios: "Scenarios to Explore",
    },

    // Footer
    footer: {
      createdBy: "Created by:",
      contact: "Contact:",
      version: "Version:",
      description: "Educational Credit Card Billing Simulator",
    },

    quickActions: {
      title: "Quick Actions",
      newTransaction: "New Transaction",
      viewStatements: "View Statements",
      payBill: "Pay Bill",
      contactSupport: "Contact Support",
    },
    gettingStarted: {
      title: "Getting Started",
      step1: {
        title: "Start with Education",
        description:
          "Begin with the Education Center to learn credit card fundamentals and best practices.",
      },
      step2: {
        title: "Use Calculators",
        description:
          "Experiment with interactive calculators to understand interest, payments, and fees.",
      },
      step3: {
        title: "Explore Scenarios",
        description:
          "Try different financial scenarios to see the impact of various decisions.",
      },
    },
    recentActivity: "Recent Activity",
    upcomingPayments: "Upcoming Payments",
    accountSummary: "Account Summary",
  },

  // Credit Card Components
  creditCard: {
    details: {
      title: "Credit Card Details",
      tabs: {
        overview: "Overview",
        transactions: "Transactions",
        details: "Details",
      },
      cardInfo: {
        cardNumber: "Card Number",
        expiryDate: "Expiry Date",
        cvv: "CVV",
        cardholderName: "Cardholder Name",
        issueDate: "Issue Date",
        cardStatus: "Card Status",
      },
      limits: {
        title: "Limits and Balances",
        creditLimit: "Credit Limit",
        currentBalance: "Current Balance",
        availableCredit: "Available Credit",
        minimumPayment: "Minimum Payment",
        nextDueDate: "Next Due Date",
      },
      fees: {
        title: "Fees and Interest",
        apr: "Annual Percentage Rate",
        annualFee: "Annual Fee",
        lateFeePct: "Late Fee (%)",
        lateFeeFlat: "Late Fee (Flat)",
        foreignTransFee: "Foreign Transaction Fee",
        cashAdvanceFee: "Cash Advance Fee",
        balanceTransferFee: "Balance Transfer Fee",
      },
    },
    builder: {
      title: "Credit Card Profile Builder",
      subtitle:
        "Create detailed credit card profiles to compare features, costs, and benefits. Build custom scenarios to find the best card for your spending patterns.",
      createNewProfile: "Create New Profile",
      editProfile: "Edit Profile",
      saveProfile: "Save Profile",
      updateProfile: "Update Profile",
      cancelEdit: "Cancel",
      compareSelected: "Compare Selected",
      backToBuilder: "Back to Builder",
      deleteConfirmation: "Are you sure you want to delete this profile?",
      requiredFields: "Please provide card name and issuer",

      tabs: {
        basic: "Basic Info",
        financial: "Financial Terms",
        rewards: "Rewards Program",
        features: "Features & Benefits",
      },

      basic: {
        cardName: "Card Name",
        cardNameRequired: "Card Name *",
        cardNamePlaceholder: "e.g., Chase Freedom Unlimited",
        issuer: "Issuer",
        issuerRequired: "Issuer *",
        issuerPlaceholder: "e.g., Chase",
        cardCategory: "Card Category",
        creditLimit: "Credit Limit ($)",
        creditScoreRequirement: "Credit Score Requirement",
      },

      financial: {
        aprRates: "APR Rates (%)",
        purchaseApr: "Purchase APR",
        balanceTransferApr: "Balance Transfer APR",
        cashAdvanceApr: "Cash Advance APR",
        fees: "Fees",
        annualFee: "Annual Fee ($)",
        foreignTransactionFee: "Foreign Transaction Fee (%)",
        balanceTransferFee: "Balance Transfer Fee (%)",
        cashAdvanceFee: "Cash Advance Fee (%)",
      },

      rewards: {
        rewardsType: "Rewards Type",
        baseRate: "Base Rate (%)",
        bonusCategories: "Bonus Categories",
        addCategory: "Add Category",
        selectCategory: "Select Category",
        ratePlaceholder: "Rate %",
        limitPlaceholder: "Limit ($)",
        remove: "Remove",
        bonusCategoryOptions: {
          gasStations: "Gas Stations",
          groceries: "Groceries",
          restaurants: "Restaurants",
          travel: "Travel",
          onlineShopping: "Online Shopping",
          departmentStores: "Department Stores",
          streamingServices: "Streaming Services",
          phoneInternetBills: "Phone/Internet Bills",
          pharmacies: "Pharmacies",
          transit: "Transit",
          homeImprovement: "Home Improvement",
          officeSupplies: "Office Supplies",
        },
      },

      features: {
        cardFeatures: "Card Features",
        featureOptions: {
          noForeignTransactionFees: "No Foreign Transaction Fees",
          fraudProtection: "Fraud Protection",
          priceProtection: "Price Protection",
          extendedWarranty: "Extended Warranty",
          purchaseProtection: "Purchase Protection",
          travelInsurance: "Travel Insurance",
          rentalCarInsurance: "Rental Car Insurance",
          roadsideAssistance: "Roadside Assistance",
          conciergeService: "Concierge Service",
          airportLoungeAccess: "Airport Lounge Access",
          tsaPreCheckCredit: "TSA PreCheck/Global Entry Credit",
          cellPhoneProtection: "Cell Phone Protection",
          baggageInsurance: "Baggage Insurance",
          tripCancellationInsurance: "Trip Cancellation Insurance",
        },
      },

      comparison: {
        title: "Credit Card Comparison",
        annualValue: "Annual Value",
        rewards: "Rewards",
        fee: "Fee",
        apr: "APR",
        creditLimit: "Credit Limit",
        rewardsRate: "Rewards Rate",
        baseRate: "base",
        bonusCategories: "Bonus categories",
        keyFeatures: "Key Features",
        more: "more",
      },

      savedProfiles: {
        title: "Saved Profiles",
        annualValue: "Annual Value:",
        noProfilesYet: "No profiles saved yet. Create your first profile!",
        edit: "Edit",
        delete: "Delete",
      },

      tips: {
        title: "Profile Building Tips",
        accurateData: "Accurate Data:",
        accurateDataDesc:
          "Use real card terms from issuer websites for accurate comparisons.",
        considerSpending: "Consider Your Spending:",
        considerSpendingDesc:
          "Match bonus categories to your actual spending patterns.",
        totalCost: "Total Cost Analysis:",
        totalCostDesc:
          "Factor in annual fees, interest, and penalty fees, not just rewards.",
      },

      categories: {
        cashback: "Cash Back",
        rewards: "Rewards Points",
        travel: "Travel",
        business: "Business",
        student: "Student",
        secured: "Secured",
      },

      rewardTypes: {
        cashback: "Cash Back",
        points: "Points",
        miles: "Miles",
        none: "No Rewards",
      },
    },
  },

  // Transaction Components
  transactions: {
    title: "Transactions",
    selectCard: "Select Credit Card",
    addTransaction: "Add Transaction",

    // Dashboard
    dashboard: {
      recentTransactions: "Recent Transactions",
      totalSpent: "Total Spent",
      totalPayments: "Total Payments",
      netChange: "Net Change",
      noTransactionsYet: "No transactions yet",
      getStartedMessage: "Get started by adding your first transaction",
      addFirstTransaction: "Add First Transaction",
      showingRecent: "Showing {count} most recent transactions",
      cancelConfirmation: "Are you sure you want to cancel this transaction?",
      transactionCancelled: "Transaction cancelled successfully",
      cancelFailed: "Failed to cancel transaction",
      loadFailed: "Failed to load transactions",
    },
    form: {
      title: "New Transaction",
      merchant: "Merchant",
      merchantPlaceholder: "e.g., Amazon, Walmart, Starbucks",
      category: "Category",
      categoryRequired: "Category *",
      description: "Description",
      descriptionRequired: "Description *",
      descriptionPlaceholder: "Brief description of the transaction",
      location: "Location (Optional)",
      locationPlaceholder: "e.g., New York, NY",
      amount: "Amount",
      amountRequired: "Amount ($) *",
      additionalFees: "Additional Fees ($)",
      merchantNameRequired: "Merchant Name *",
      type: "Transaction Type",
      typeRequired: "Type *",
      creating: "Creating...",
      createTransaction: "Create Transaction",
      balanceIncrease: "⚠ This will increase your balance",
      balanceDecrease: "✓ This will reduce your balance",
    },
    types: {
      PURCHASE: "Purchase",
      PAYMENT: "Payment",
      REFUND: "Refund",
      FEE: "Fee",
      CASH_ADVANCE: "Cash Advance",
    },
    typeDescriptions: {
      PURCHASE: "Regular purchase transaction",
      PAYMENT: "Payment towards credit card balance",
      REFUND: "Refund from merchant",
      FEE: "Credit card fee (annual, late, etc.)",
      CASH_ADVANCE: "Cash advance from credit card",
    },
    categories: {
      GROCERIES: "Groceries",
      DINING: "Dining & Restaurants",
      GAS: "Gas & Fuel",
      UTILITIES: "Utilities",
      ENTERTAINMENT: "Entertainment",
      SHOPPING: "Shopping",
      TRAVEL: "Travel",
      HEALTHCARE: "Healthcare",
      EDUCATION: "Education",
      OTHER: "Other",
    },
    history: {
      title: "Transaction History",
      noTransactions: "No transactions found",
      filterBy: "Filter by",
      sortBy: "Sort by",
      dateRange: "Date Range",
    },
    analytics: {
      title: "Spending Analytics",
      subtitle: "Analyze your spending patterns and track financial goals",
      loading: "Loading analytics...",
      loadFailed: "Failed to load spending analytics",
      totalSpent: "Total Spent",
      totalPayments: "Total Payments",
      netChange: "Net Change",
      averageTransaction: "Average Transaction",
      spending: "Spending",
      payments: "Payments",
      spendingByCategory: "Spending by Category",
      categoryDetails: "Category Details",
      monthlyTrends: "Monthly Spending Trends",
      monthlyBudget: "Monthly Budget",
      budgetLimit: "Budget Limit",
      currentSpending: "Current Spending",
      remainingBudget: "Remaining Budget",
      progress: "Progress",
      topMerchants: "Top Merchants",
      noMerchantsData: "No merchant data available",
      tabs: {
        overview: "Overview",
        categories: "Categories",
        trends: "Trends",
        goals: "Goals",
      },
      insights: {
        title: "Smart Insights",
        spendingPattern: "Spending Pattern Analysis",
        spendingPatternDesc:
          "Track your spending habits across categories to identify areas for optimization.",
        budgetTracking: "Budget Tracking",
        budgetTrackingDesc:
          "Set monthly budgets and monitor your progress to stay on track with financial goals.",
        categoryOptimization: "Category Optimization",
        categoryOptimizationDesc:
          "Identify which categories consume most of your budget and find opportunities to save.",
        trendAnalysis: "Trend Analysis",
        trendAnalysisDesc:
          "Analyze spending trends over time to make informed financial decisions.",
      },
    },
    searchFilters: {
      title: "Transaction Search & Filter",
      subtitle:
        "Find and analyze your transactions with advanced filtering options",
      searchPlaceholder: "Search by merchant, description, or location...",
      filters: "Filters",
      export: "Export",
      advancedFilters: "Advanced Filters",
      clearFilters: "Clear Filters",
      type: "Transaction Type",
      category: "Category",
      sortBy: "Sort By",
      amountRange: "Amount Range",
      dateFrom: "From Date",
      dateTo: "To Date",
      minAmount: "Min",
      maxAmount: "Max",
      allTypes: "All Types",
      allCategories: "All Categories",
      sortByDate: "Date",
      sortByAmount: "Amount",
      sortByMerchant: "Merchant",
      ascending: "Ascending",
      descending: "Descending",
      resultsFound: "Results found",
      of: "of",
      totalValue: "Total value",
      loading: "Loading transactions...",
      loadFailed: "Failed to load transactions",
      noResults: "No transactions found",
      tryDifferentFilters: "Try adjusting your filters or search terms",
      exportSuccess: "Transactions exported successfully",
    },
    hub: {
      title: "Transaction Management Hub",
      subtitle: "Comprehensive transaction management and analysis tools",
      noCards: "No Credit Cards Found",
      noCardsDesc: "You need at least one credit card to manage transactions.",
      goToDashboard: "Go to Dashboard",
      availableCredit: "Available Credit",
      quickActions: "Quick Actions",
      addTransaction: "Add Transaction",
      addTransactionDesc: "Record a new transaction",
      searchTransactions: "Search & Filter",
      searchTransactionsDesc: "Find specific transactions",
      viewAnalytics: "View Analytics",
      viewAnalyticsDesc: "Spending insights & trends",
      manageBudget: "Manage Budget",
      manageBudgetDesc: "Set limits & track goals",
      createTransaction: "Create New Transaction",
      createTransactionDesc: "Add a new transaction to your credit card",
      transactionCreated: "Transaction created successfully!",
      managingCard: "Managing Card",
      currentBalance: "Current Balance",
      creditLimit: "Credit Limit",
      tabs: {
        overview: "Overview",
        overviewDesc: "Dashboard & quick actions",
        search: "Search",
        searchDesc: "Advanced filtering",
        analytics: "Analytics",
        analyticsDesc: "Spending insights",
        budget: "Budget",
        budgetDesc: "Budget planning",
        create: "Create",
        createDesc: "Add transaction",
      },
    },
  },

  // Profile Components
  profile: {
    dashboard: {
      title: "Profile Information",
      editProfile: "Edit Profile",
      personalInfo: {
        title: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        dateOfBirth: "Date of Birth",
      },
      financialInfo: {
        title: "Financial Information",
        annualIncome: "Annual Income",
        employmentStatus: "Employment Status",
        creditScore: "Credit Score",
        creditRating: "Credit Rating",
      },
      addressInfo: {
        title: "Address Information",
        street: "Street",
        city: "City",
        state: "State",
        zipCode: "ZIP Code",
        country: "Country",
      },
      creditScoreRanges: {
        excellent: "Excellent",
        good: "Good",
        fair: "Fair",
        poor: "Poor",
      },
    },
    form: {
      title: "Edit Profile",
      personalDetails: "Personal Details",
      financialDetails: "Financial Details",
      addressDetails: "Address Details",
      employmentStatuses: {
        EMPLOYED: "Employed",
        SELF_EMPLOYED: "Self-Employed",
        UNEMPLOYED: "Unemployed",
        RETIRED: "Retired",
        STUDENT: "Student",
      },
    },
  },

  // Billing Cycle Components
  billingCycle: {
    dashboard: {
      title: "Billing Cycle Dashboard",
      description:
        "Track and analyze credit card billing cycles, interest calculations, and fee structures.",
      noCreditCards: "No Credit Cards Found",
      noCreditCardsDesc:
        "To use the billing cycle features, you need to have at least one credit card set up. Credit cards are required to generate billing cycles, track spending, and analyze interest calculations.",
      quickSetup: "Quick Setup Options",
      createDemoCard: "Create Demo Credit Card",
      demoCardDesc:
        "Instantly creates a demo user profile and credit card with realistic settings for testing",
      cycleOverview: "Cycle Overview",
      currentCycle: "Current Cycle",
      previousCycles: "Previous Cycles",
      cycleDetails: "Cycle Details",
      startingBalance: "Starting Balance",
      endingBalance: "Ending Balance",
      totalPurchases: "Total Purchases",
      totalPayments: "Total Payments",
      interestCharged: "Interest Charged",
      feesCharged: "Fees Charged",
      minimumPayment: "Minimum Payment",
      dueDate: "Due Date",
      paid: "Paid",
      unpaid: "Unpaid",
      overdue: "Overdue",
    },
  },

  // Statement Components
  statement: {
    generator: {
      title: "Statement Generator",
      viewStatement: "View Statement",
      statementBuilder: "Statement Builder",
      backToBuilder: "Back to Builder",
      accountInfo: {
        title: "Account Information",
        cardholderName: "Cardholder Name",
        accountNumber: "Account Number",
        creditLimit: "Credit Limit ($)",
        previousBalance: "Previous Balance ($)",
        apr: "APR (%)",
        minimumPaymentPct: "Minimum Payment (%)",
      },
      statementPeriod: {
        title: "Statement Period",
        startDate: "Start Date",
        endDate: "End Date",
        paymentDueDate: "Payment Due Date",
      },
      addTransaction: {
        title: "Add Transaction",
        description: "Description",
        amount: "Amount ($)",
        category: "Category",
        transactionType: "Transaction Type",
        date: "Date",
        addTransactionBtn: "Add Transaction",
      },
      transactionList: {
        title: "Transactions",
        date: "Date",
        description: "Description",
        category: "Category",
        amount: "Amount",
        actions: "Actions",
        remove: "Remove",
        noTransactions: "No transactions yet",
      },
      statementSummary: {
        title: "Statement Summary",
        previousBalance: "Previous Balance",
        purchases: "Purchases",
        payments: "Payments",
        fees: "Fees",
        interest: "Interest",
        newBalance: "New Balance",
        availableCredit: "Available Credit",
        minimumPayment: "Minimum Payment",
        paymentDueDate: "Payment Due Date",
      },
      transactionTypes: {
        purchase: "Purchase",
        payment: "Payment",
        fee: "Fee",
        interest: "Interest",
        credit: "Credit",
      },
      categories: {
        groceries: "Groceries",
        gas: "Gas",
        dining: "Dining",
        onlineShopping: "Online Shopping",
        travel: "Travel",
        entertainment: "Entertainment",
        utilities: "Utilities",
        healthcare: "Healthcare",
        education: "Education",
        other: "Other",
        purchase: "Purchase",
        fee: "Fee",
      },
    },
  },

  // Calculator Components
  calculators: {
    interest: {
      title: "Interest Calculator",
      description: "Calculate interest charges on your credit card balance",
      principal: "Principal Balance",
      annualRate: "Annual Interest Rate (%)",
      months: "Months",
      monthlyPayment: "Monthly Payment",
      result: {
        totalInterest: "Total Interest",
        totalPaid: "Total Amount Paid",
        payoffTime: "Payoff Time",
      },
    },
    paymentStrategy: {
      title: "Payment Strategy Calculator",
      description: "Compare different payment strategies",
      minimumPayment: "Minimum Payment",
      customPayment: "Custom Payment",
      strategy: {
        minimum: "Minimum Payment Only",
        fixed: "Fixed Payment",
        percentage: "Percentage of Balance",
      },
    },
    feeSimulator: {
      title: "Fee Simulator",
      description: "Simulate various credit card fees",
      latePaymentFee: "Late Payment Fee",
      overlimitFee: "Over-limit Fee",
      foreignTransactionFee: "Foreign Transaction Fee",
      cashAdvanceFee: "Cash Advance Fee",
    },
    financialHealth: {
      title: "Financial Health Calculator",
      description: "Assess your financial health",
      monthlyIncome: "Monthly Income",
      monthlyExpenses: "Monthly Expenses",
      monthlyDebtPayments: "Monthly Debt Payments",
      emergencyFund: "Emergency Fund",
      creditCardDebt: "Credit Card Debt",
      otherDebt: "Other Debt",
      result: {
        score: "Health Score",
        rating: "Rating",
        recommendations: "Recommendations",
      },
    },
  },

  // Education Components
  education: {
    dashboard: {
      title: "Credit Card Education Center",
      subtitle:
        "Master credit card fundamentals, strategies, and best practices to make informed financial decisions.",
      tabs: {
        overview: "Overview",
        modules: "Learning Modules",
        tips: "Tips & Strategies",
        calculator: "Quick Calculator",
        quiz: "Knowledge Quiz",
      },
      progress: {
        learningProgress: "Learning Progress",
        totalPoints: "Total Points",
        earnPoints: "Earn 10 points per completed module",
        learningLevel: "Learning Level",
        advanceLevel: "Complete more modules to advance",
      },
      quickStart: {
        title: "Quick Start Guide",
        newToCreditCards: {
          title: "New to Credit Cards?",
          step1: "Start with Basics: Learn fundamental concepts",
          step2: "Understand Interest: Know how costs are calculated",
          step3: "Payment Strategies: Learn smart payment methods",
        },
        wantToOptimize: {
          title: "Want to Optimize?",
          step1: "Rewards Maximization: Get more value from spending",
          step2: "Credit Score Optimization: Improve your score",
          step3: "Advanced Strategies: Master complex techniques",
        },
      },
      featuredTips: {
        title: "Featured Tips",
      },
      quickCalculator: {
        title: "Quick Financial Calculator",
        description:
          "Use interactive calculators to understand interest, payments, and rewards in real-time.",
        interestCalculator: {
          title: "Interest Calculator",
          description: "Calculate interest charges on your balance",
          button: "Open Calculator",
        },
        paymentStrategy: {
          title: "Payment Strategy",
          description: "Compare different payment strategies",
          button: "Open Calculator",
        },
        rewardsCalculator: {
          title: "Rewards Calculator",
          description: "Calculate potential rewards earnings",
          button: "Open Calculator",
        },
      },
      knowledgeQuiz: {
        title: "Knowledge Quiz",
        description:
          "Test your credit card knowledge with this comprehensive quiz covering all topics.",
        comingSoon: "Coming Soon! An interactive quiz will be added shortly.",
      },
    },
    modules: {
      basics: {
        title: "Credit Card Basics",
        overview:
          "Learn the fundamental concepts of credit cards, how they work, and why they are a valuable financial tool.",
        keyPoints: [
          "What is a credit card and how does it work",
          "Difference between credit cards and debit cards",
          "Basic credit card terminology",
          "Types of credit cards available",
          "Pros and cons of using credit cards",
        ],
      },
      interest: {
        title: "Understanding Interest and APR",
        overview:
          "Master how credit card interest is calculated and how you can minimize interest charges.",
        keyPoints: [
          "What is APR and how it differs from interest rates",
          "How daily periodic rates work",
          "Grace period and how to take advantage of it",
          "Factors that affect your interest rates",
          "Strategies to avoid interest charges",
        ],
      },
      payments: {
        title: "Payment Strategies",
        overview:
          "Learn different payment strategies and their impact on your financial health.",
        keyPoints: [
          "Understanding minimum payment requirements",
          "Benefits of paying full balance",
          "Strategic partial payments",
          "Timing of payments for optimal impact",
          "Automating payments for consistency",
        ],
      },
    },
    tips: {
      categories: {
        payment_strategy: "Payment Strategy",
        credit_utilization: "Credit Utilization",
        rewards_optimization: "Rewards Optimization",
        fee_avoidance: "Fee Avoidance",
        credit_building: "Credit Building",
      },
      impactLevels: {
        high: "High Impact",
        medium: "Medium Impact",
        low: "Low Impact",
      },
    },
    noProfile: {
      title: "No Profile Found",
      description:
        "Create your profile to get started with the credit card simulator",
      createButton: "Create Profile",
    },
  },

  // Admin Components
  admin: {
    dashboard: {
      title: "SJ-CCMS Admin Dashboard",
      subtitle: "Complete system oversight and user management",
      errorLoading: "Error Loading Dashboard",
      tabs: {
        overview: "Overview",
        users: "Users",
        creditCards: "Credit Cards",
        transactions: "Transactions",
      },
      stats: {
        totalUsers: "Total Users",
        recentlyCreated: "Recently Created",
        totalCards: "Total Cards",
        creditCards: "Credit Cards",
        activeCards: "Active cards in system",
        transactions: "Transactions",
        totalTransactions: "Total Transactions",
        totalValue: "Total Value",
      },
      sections: {
        recentActivity: "Recent Activity",
        userManagement: "User Management",
        creditCardManagement: "Credit Card Management",
        creditScore: "Credit Score",
      },
      userManagement: {
        title: "User Management",
        viewDetails: "View Details",
        editUser: "Edit User",
        deleteUser: "Delete User",
        userDetails: {
          title: "User Details",
          personalInfo: "Personal Information",
          accountInfo: "Account Information",
          creditCards: "Credit Cards",
          role: "Role",
          createdAt: "Created At",
          lastLogin: "Last Login",
        },
      },
      creditCardManagement: {
        title: "Credit Card Management",
        editCard: "Edit Card",
        cardDetails: "Card Details",
        updateCard: "Update Card",
        cardSummary: "Card Summary",
      },
      transactionMonitoring: {
        title: "Transaction Monitoring",
        recentTransactions: "Recent Transactions",
        noTransactions: "No transactions found",
      },
    },
  },

  // Billing and Statements
  billing: {
    cycle: {
      title: "Billing Cycles",
      currentCycle: "Current Cycle",
      nextStatement: "Next Statement",
      cycleLength: "Cycle Length",
      gracePerod: "Grace Period",
    },
    statement: {
      title: "Statement",
      generate: "Generate Statement",
      download: "Download",
      period: "Statement Period",
      summary: "Summary",
    },
  },

  // Visualizations
  visualizations: {
    interestGrowth: {
      title: "Interest Growth Charts",
      description: "Visualize how interest accumulates over time",
      minimumPayment: "Minimum Payment",
      customPayment: "Custom Payment",
      remainingBalance: "Remaining Balance",
      monthlyInterest: "Monthly Interest",
      cumulativeInterest: "Cumulative Interest",
      monthlyPrincipal: "Monthly Principal",
    },
    paymentImpact: {
      title: "Payment Impact Visualizer",
      description:
        "See how different payment amounts dramatically affect your debt payoff journey",
      calculating: "Calculating payment impact...",
      controls: {
        customPayment: "Custom Payment ($)",
        viewType: "View Type",
        balanceOverTime: "Balance Over Time",
        interestSavings: "Interest Savings",
      },
      scenarios: {
        minimumPayment: "Minimum Payment",
        doublePayment: "Double Payment",
        triplePayment: "Triple Payment",
      },
      savings: {
        interestSavings: "Interest Savings",
        timeSavings: "Time Savings",
        totalSavings: "Total Savings",
      },
      charts: {
        balanceOverTime: "Balance Over Time",
        interestSavings: "Interest Savings vs Minimum Payment",
        savingsVsMinimum: "Savings vs Minimum",
      },
    },
    feeAnalysis: {
      title: "Fee Analysis",
      description: "Analyze various credit card fees and their impact",
      usageScenarios: {
        lightUsage: "Light Usage",
        moderateUsage: "Moderate Usage",
        heavyUsage: "Heavy Usage",
      },
      feeTypes: {
        annualFees: "Annual Fees",
        transactionFees: "Transaction Fees",
        penaltyFees: "Penalty Fees",
        totalFees: "Total Fees",
        annualFee: "Annual Fee",
        overlimitFees: "Overlimit Fees",
        foreignTransactionFees: "Foreign Transaction Fees",
        balanceTransferFees: "Balance Transfer Fees",
        cashAdvanceFees: "Cash Advance Fees",
        latePaymentFees: "Late Payment Fees",
        returnedPaymentFees: "Returned Payment Fees",
      },
    },
  },

  // Learning Scenarios
  scenarios: {
    title: "Learning Scenarios",
    description: "Explore different financial scenarios and their outcomes",
  },

  // Error Messages
  errors: {
    generic: "An error occurred. Please try again.",
    network: "Network error. Please check your connection.",
    notFound: "The requested resource was not found.",
    unauthorized: "You are not authorized to perform this action.",
    validation: "Please check your input.",
    server: "Server error. Please try again later.",
  },

  // Success Messages
  success: {
    saved: "Successfully saved",
    updated: "Successfully updated",
    deleted: "Successfully deleted",
    created: "Successfully created",
    loggedOut: "Successfully logged out",
  },

  // Logout Page
  logout: {
    title: "Logged Out",
    message: "You have been successfully logged out.",
    subtitle: "Thank you for using SJ-CCMS!",
    description:
      "Your session has been securely ended. You can log in again at any time to access your account.",
    loggingOut: "Logging out...",
    loggingOutMessage: "Please wait while we securely sign you out.",
    confirmTitle: "Sign Out",
    confirmMessage: "Are you sure you want to sign out?",
    currentlySignedIn: "Currently signed in as:",
    actions: {
      loginAgain: "Log In Again",
      backToHome: "Back to Home",
      confirmLogout: "🚪 Yes, Sign Out",
      switchAccount: "🔄 Switch Account",
      cancel: "← Cancel",
    },
    securityNote:
      "For security reasons, all active sessions have been terminated.",
    sessionClearWarning:
      "Your session data will be cleared when you sign out.\nMake sure to save any important work before continuing.",
  },

  // Visualization Components
  visualization: {
    paymentImpact: {
      title: "Payment Impact Visualizer",
      viewTypes: {
        balance: "Balance Reduction",
        interest: "Interest Accumulation",
        comparison: "Side-by-Side Comparison",
        savings: "Interest Savings",
      },
      labels: {
        viewType: "View Type:",
        monthlyPayment: "Monthly Payment:",
        payoffTime: "Payoff Time:",
        totalInterest: "Total Interest:",
        totalCost: "Total Cost:",
        savingsVsMinimum: "Savings vs Minimum:",
      },
      charts: {
        totalInterestComparison: "Total Interest Comparison",
        payoffTimeComparison: "Payoff Time Comparison",
      },
      summary: {
        title: "Payment Impact Summary",
        keyInsights: "Key Payment Insights",
      },
    },
    interestGrowth: {
      title: "Interest Growth Analysis",
      loading: "Calculating interest scenarios...",
      chartTypes: {
        balance: "Balance Over Time",
        interest: "Interest Analysis",
        comparison: "Payment Comparison",
      },
      scenarios: {
        minimum: "Minimum Payment",
        custom: "Custom Payment",
      },
      labels: {
        chartType: "Chart Type:",
        scenario: "Scenario:",
        monthlyPayment: "Monthly Payment:",
        payoffTime: "Payoff Time:",
        totalInterest: "Total Interest:",
        totalCost: "Total Cost:",
      },
      charts: {
        totalInterestComparison: "Total Interest Paid Comparison",
        payoffTimeComparison: "Payoff Time Comparison",
      },
      summary: {
        title: "Payment Scenarios Summary",
        keyInsights: "Key Insights",
      },
    },
    feeAnalysis: {
      title: "Fee Analysis Dashboard",
      labels: {
        usageScenario: "Usage Scenario:",
        timeframe: "Timeframe:",
      },
      charts: {
        feeDistribution: "Fee Distribution",
        detailedBreakdown: "Detailed Breakdown",
        usageScenarioComparison: "Usage Scenario Comparison",
        feeAnalysisInsights: "Fee Analysis Insights",
        customizeFeeStructure: "Customize Fee Structure",
      },
    },
  },

  // Transaction Lists
  transactionsList: {
    title: "Transaction History",
    searchPlaceholder: "Search transactions...",
    filters: {
      allTypes: "All Types",
      cashAdvance: "Cash Advance",
      allCategories: "All Categories",
      groceries: "Groceries",
      gasoline: "Gasoline",
      utilities: "Utilities",
      entertainment: "Entertainment",
    },
  },

  // Statement Generator
  statementGenerator: {
    placeholders: {
      merchantName: "e.g., AMAZON.COM PURCHASE",
    },
  },

  // Fee Structure Simulator
  feeStructureSimulator: {
    placeholders: {
      amount: "Amount",
      description: "Description",
    },
  },

  // Test Component
  test: {
    loadingMessage: "If you see this, React is loading correctly.",
    consoleMessage: "Check the browser console for debug logs.",
  },

  // Budget Planning & Goals
  budget: {
    title: "Budget Planner & Goals",
    subtitle: "Plan your spending, set financial goals, and track progress",
    monthlyBudget: "Monthly Budget",
    setBudgetLimits: "Set spending limits for each category",
    editBudget: "Edit Budget",
    budgetSaved: "Budget saved successfully",
    goalsSaved: "Goals saved successfully",
    totalBudget: "Total Budget",
    totalSpent: "Total Spent",
    remaining: "Remaining",
    budgetCategories: "Budget Categories",
    addCategory: "Add Category",
    used: "used",
    spendingGoals: "Spending Goals",
    setFinancialGoals: "Set and track your financial goals",
    addGoal: "Add Goal",
    saveGoals: "Save Goals",
    targetAmount: "Target Amount",
    currentAmount: "Current Amount",
    deadline: "Deadline",
    category: "Category",
    progress: "Progress",
    smartAlerts: "Smart Alerts",
    budgetNotifications: "Get notified when approaching budget limits",
    currentAlerts: "Current Alerts",
    budgetWarning: "budget is over 80% used",
    goalDeadlineApproaching: "deadline is approaching",
    noActiveAlerts: "No active alerts at this time",
    tabs: {
      budget: "Budget",
      goals: "Goals",
      alerts: "Alerts",
    },
  },
};
