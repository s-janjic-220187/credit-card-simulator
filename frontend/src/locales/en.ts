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
    time: "Time",

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

    // Language
    languageSelector: "Language / Sprache",
    englishUS: "English (US)",
    germanDE: "Deutsch (Deutschland)",
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
    transactions: "Transactions",
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
    unknownMerchant: "Unknown Merchant",

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
      INTEREST: "Interest",
      CREDIT: "Credit",
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
    statuses: {
      ACTIVE: "Active",
      PENDING: "Pending",
      CANCELLED: "Cancelled",
      COMPLETED: "Completed",
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
      utilization: "utilized",
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
      sections: {
        address: "Address",
        employment: "Employment",
        creditInformation: "Credit Information",
        accountInformation: "Account Information",
      },
      labels: {
        profileCreated: "Profile Created",
        lastUpdated: "Last Updated",
      },
      personalInfo: {
        title: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        dateOfBirth: "Date of Birth",
        name: "Name",
        phoneLabel: "Phone",
        dateOfBirthLabel: "Date of Birth",
      },
      financialInfo: {
        title: "Financial Information",
        annualIncome: "Annual Income",
        employmentStatus: "Employment Status",
        creditScore: "Credit Score",
        creditRating: "Credit Rating",
        statusLabel: "Status",
        annualIncomeLabel: "Annual Income",
        creditScoreLabel: "Credit Score",
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
      title: "💳 Billing Cycle Dashboard",
      description:
        "Track and analyze credit card billing cycles, interest calculations, and fee structures.",
      generateNewCycle: "Generate New Cycle",
      billingCycles: "Billing Cycles",
      cycleNumber: "Cycle #",
      overview: "Overview",
      current: "Current",
      paid: "Paid",
      overdue: "Overdue",
      balance: "Balance",

      // No cycles found section
      noBillingCyclesFound: "No Billing Cycles Found",
      noBillingCyclesDesc: "No billing cycles exist for this credit card yet.",
      toGetStarted: "💡 To get started:",
      getStartedSteps: [
        "Make sure you have a valid credit card in the system",
        'Click "Generate New Cycle" to create your first billing cycle',
        "Add some transactions to see billing cycle calculations",
      ],
      noCreditCardsYet: "Don't have any credit cards set up yet?",
      createDemoData: "🚀 Create Demo Data",
      createDemoDataDesc:
        "This will create a demo user, profile, and credit card for testing",

      // Cycle overview cards
      startingBalance: "Starting Balance",
      totalPurchases: "Total Purchases",
      endingBalance: "Ending Balance",

      // Interest & Fees section
      interestAndFees: "Interest & Fees",
      averageDailyBalance: "Average Daily Balance",
      interestCharged: "Interest Charged",
      feesCharged: "Fees Charged",
      totalPayments: "Total Payments",
      minimumPayment: "Minimum Payment",
      dueDate: "Due Date",

      // Educational section
      howCalculated: "How This Cycle Was Calculated",
      interestCalculation: "Interest Calculation",
      interestCalculationDesc:
        "Daily interest rate × Average daily balance × Days in cycle = Interest charge",
      averageDailyBalanceCalc: "Average Daily Balance",
      averageDailyBalanceDesc:
        "Sum of daily balances ÷ Number of days in cycle =",
      minimumPaymentCalc: "Minimum Payment",
      minimumPaymentDesc:
        "Typically 2-3% of balance or $35 (whichever is higher), plus interest and fees =",

      // No cycle selected
      selectBillingCycle: "Select a Billing Cycle",
      selectBillingCycleDesc:
        "Choose a billing cycle from the list to view detailed calculations, interest breakdowns, and educational information.",

      // Legacy fields (keeping for compatibility)
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
      unpaid: "Unpaid",
      selectCycle: "Select a Billing Cycle",
      selectCycleDesc:
        "Choose a billing cycle from the list to view detailed calculations, interest breakdowns, and educational information.",
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
          memberSince: "Member Since",
          creditScore: "Credit Score",
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

  // Hardcoded Component Strings
  components: {
    // Admin Dashboard
    adminDashboard: {
      loadingMessage: "Loading admin dashboard...",
      retry: "Retry",
      user: "User",
      cards: "Cards",
      actions: "Actions",
      view: "View",
      delete: "Delete",
      cardholder: "Cardholder",
      limit: "Limit",
      balance: "Balance",
      available: "Available",
      issued: "Issued",
      recentTransactions: "Recent Transactions",
      refresh: "Refresh",
      date: "Date",
      card: "Card",
      userDetails: "User Details",
      personalInformation: "Personal Information",
      name: "Name",
      creditLimit: "Credit Limit",
      currentBalance: "Current Balance",
      editCreditCard: "Edit Credit Card",
      cancel: "Cancel",
      updateCard: "Update Card",
      cardStatuses: {
        active: "Active",
        inactive: "Inactive",
        suspended: "Suspended",
        closed: "Closed",
      },
    },

    // Navigation
    navigation: {
      mobileBrandShort: "💳 SJ",
      openNavigationMenu: "Open navigation menu",
    },

    // Visualization Components
    visualizations: {
      paymentImpact: {
        paymentPower: "🚀 Payment Power",
        timeValue: "⏰ Time Value",
        compoundEffect: "📈 Compound Effect",
        strategyTip: "💡 Strategy Tip",
        paymentPowerDesc:
          "Every extra dollar you pay dramatically reduces your total interest costs.",
        timeValueDesc:
          "The sooner you pay off your balance, the more you save on interest payments.",
        compoundEffectDesc:
          "Interest compounds daily. Higher payments break this expensive cycle faster.",
        strategyTipDesc:
          "Even small increases in payment amount can save you hundreds or thousands in interest.",
      },
      interestGrowth: {
        doubleMinimum: "2x Minimum",
        tripleMinimum: "3x Minimum",
        paymentImpact: "💡 Payment Impact",
        interestCompounds: "📈 Interest Compounds",
        timeValue: "⏰ Time Value",
        paymentImpactDesc:
          "Small increases in payment amount create dramatic savings in total interest paid.",
        interestCompoundsDesc:
          "Credit card interest compounds daily, making small balances grow exponentially.",
        timeValueDesc:
          "The longer you carry a balance, the more expensive it becomes due to compounding interest.",
      },
      feeAnalysis: {
        monthly: "Monthly",
        annual: "Annual",
        annualFeeImpact: "💳 Annual Fee Impact",
        foreignTransactionFees: "🌍 Foreign Transaction Fees",
        balanceTransferStrategy: "🔄 Balance Transfer Strategy",
        cashAdvanceCosts: "💰 Cash Advance Costs",
        penaltyFeeAvoidance: "⚠️ Penalty Fee Avoidance",
        totalCostAnalysis: "📊 Total Cost Analysis",
        annualFee: "Annual Fee ($)",
        foreignTransactionFee: "Foreign Transaction Fee (%)",
        balanceTransferFee: "Balance Transfer Fee (%)",
        cashAdvanceFee: "Cash Advance Fee (%)",
        latePaymentFee: "Late Payment Fee ($)",
        overlimitFee: "Overlimit Fee ($)",
        annualFeeImpactDesc:
          "Annual fees reduce your effective rewards rate. Calculate if rewards exceed fees.",
        foreignTransactionFeesDesc:
          "Avoid foreign transaction fees when traveling by using the right cards.",
        balanceTransferStrategyDesc:
          "Balance transfer fees can be worth it for significant interest savings.",
        cashAdvanceCostsDesc:
          "Cash advances are expensive with high fees and immediate interest charges.",
        penaltyFeeAvoidanceDesc:
          "Late and overlimit fees are entirely avoidable with proper payment habits.",
        totalCostAnalysisDesc:
          "Consider all fees when evaluating the true cost of credit card ownership.",
      },
    },

    // Transaction Components
    transactions: {
      transactionTypes: {
        purchase: "Purchase",
        payment: "Payment",
        refund: "Refund",
        fee: "Fee",
        interest: "Interest",
        credit: "Credit",
      },
      categories: {
        dining: "Dining",
        gas: "Gas",
        groceries: "Groceries",
        entertainment: "Entertainment",
        utilities: "Utilities",
        shopping: "Shopping",
        travel: "Travel",
        healthcare: "Healthcare",
        education: "Education",
        other: "Other",
      },
      messages: {
        failedToLoad: "Failed to load transactions",
        confirmCancel: "Are you sure you want to cancel this transaction?",
        cancelledSuccessfully: "Transaction cancelled successfully",
        failedToCancel: "Failed to cancel transaction",
      },
      search: "Search",
      type: "Type",
      category: "Category",
      cancel: "Cancel",
      cancelled: "CANCELLED",
    },

    // Statement Generator
    statementGenerator: {
      title: "Credit Card Statement",
      addTransaction: "Add Transaction",
      validationError: "Please fill in description and amount",
      keyMetrics: "Key Metrics",
      creditUtilization: "Credit Utilization",
      availableCredit: "Available Credit",
      interestThisPeriod: "Interest This Period",
      feesThisPeriod: "Fees This Period",
      spendingByCategory: "Spending by Category",
      paymentImpact: "Payment Impact",
      recommendations: "Recommendations",
      highCreditUtilization: "High Credit Utilization",
      editStatement: "Edit Statement",
      viewAnalysis: "View Analysis",
      viewStatement: "View Statement",
      statementAnalysis: "Statement Analysis",
      creditCardStatement: "CREDIT CARD STATEMENT",
      accountHolder: "Account Holder",
      accountNumber: "Account Number",
      creditLimit: "Credit Limit",
      statementPeriod: "Statement Period",
      paymentDueDate: "Payment Due Date",
      newBalance: "New Balance",
      minimumPaymentDue: "Minimum Payment Due",
      accountSummary: "Account Summary",
      previousBalance: "Previous Balance",
      paymentsCredits: "Payments & Credits",
      purchasesAdvances: "Purchases & Advances",
      feesInterest: "Fees & Interest",
      creditInformation: "Credit Information",
      annualPercentageRate: "Annual Percentage Rate",
      transactionHistory: "Transaction History",
      date: "Date",
      description: "Description",
      category: "Category",
      amount: "Amount",
      currentTransactions: "Current Transactions",
      remove: "Remove",
      type: "Type",
      interestCharges: "Interest Charges",
      feesCharged: "Fees Charged",
      importantPaymentInformation: "Important Payment Information",
      minimumPayment: "Minimum Payment",
      latePaymentFee: "Late Payment Fee",
      interestCalculation: "Interest Calculation",
      placeholders: {
        merchantName: "e.g., AMAZON.COM PURCHASE",
      },
      messages: {
        highCreditUtilizationDesc:
          "Your utilization is {{utilization}}%. Consider paying down balance to below 30% to improve credit score.",
        interestChargesDesc:
          "You paid {{amount}} in interest. Pay your full balance to avoid interest charges.",
        feesChargedDesc:
          "You were charged {{amount}} in fees. Review fee policies to avoid future charges.",
        minimumPaymentDesc:
          "{{amount}} (or {{percentage}}% of balance, whichever is greater)",
        latePaymentFeeDesc:
          "Up to {{amount}} if payment is received after due date",
        interestCalculationDesc:
          "Interest is calculated daily on your average daily balance at {{apr}}% APR",
        statementDescription:
          "Generate and analyze realistic credit card statements to understand billing cycles, interest calculations, and payment strategies.",
      },
    },

    // Scenario Learning
    scenarioLearning: {
      title: "🎯 Scenario-Based Learning",
      description:
        "Practice real-world financial decision making through interactive scenarios. Test your knowledge and learn from realistic situations.",
      startScenario: "Start Scenario",
      learningObjectives: "Learning Objectives:",
      moreObjectives: "more objectives...",
      howItWorks: {
        title: "How Scenario Learning Works",
        step1: {
          title: "1. Read the Situation",
          description:
            "Each scenario presents a realistic financial situation with specific challenges.",
        },
        step2: {
          title: "2. Make Decisions",
          description:
            "Choose from multiple options for each decision point in the scenario.",
        },
        step3: {
          title: "3. Learn from Results",
          description:
            "Get immediate feedback and understand the consequences of your choices.",
        },
      },
      difficulties: {
        beginner: "beginner",
        intermediate: "intermediate",
        advanced: "advanced",
      },
      categories: {
        debt_management: "debt management",
        credit_building: "credit building",
        payment_strategy: "payment strategy",
        fee_avoidance: "fee avoidance",
      },
      backToScenarios: "← Back to Scenarios",
      progress: "Progress",
      score: "Score",
      points: "points",
      availableIncome: "Available Income",
      yourPreviousDecisions: "Your Previous Decisions",
      decisionAnalysis: "Decision Analysis",
      situation: "Situation",
      currentBalance: "Current Balance",
      apr: "APR",
      creditScore: "Credit Score",
      monthlyIncome: "Monthly Income",
      monthlyExpenses: "Monthly Expenses",
      decision: "Decision",
      clickToSelect: "Click to select this option and see the outcome",
      yourChoice: "Your choice:",
      impact: "impact",
      scenarioComplete: "Scenario Complete!",
      pointsEarned: "Points earned:",
      tryAgain: "Try Again",
      chooseNewScenario: "Choose New Scenario",
      positiveImpact: "positive",
      negativeImpact: "negative",
      neutralImpact: "neutral",
      scenarios: {
        emergencyDebt: {
          title: "Emergency Debt Management",
          description:
            "Navigate an unexpected financial emergency while managing existing credit card debt.",
          situation:
            "You have a $3,500 balance on your credit card (18% APR, $5,000 limit) and have been making $150 monthly payments. Your car suddenly needs $1,200 in repairs. You have $300 in savings and earn $3,200/month with $2,800 in expenses.",
          objectives: [
            "Handle the emergency repair without severely damaging your credit",
            "Minimize long-term interest costs",
            "Maintain a sustainable payment plan",
          ],
          decisions: {
            emergencyFunding: {
              question: "How should you fund the $1,200 car repair?",
              options: [
                {
                  text: "Use your credit card ($300 savings + $900 on card)",
                  explanation:
                    "This pushes your utilization to 88% and adds high-interest debt.",
                },
                {
                  text: "Use savings + personal loan for remaining amount",
                  explanation:
                    "Personal loan likely has lower interest than credit card.",
                },
                {
                  text: "Use savings + negotiate payment plan with mechanic",
                  explanation:
                    "Best option - avoids new debt and may be interest-free.",
                },
                {
                  text: "Use payday loan for quick cash",
                  explanation:
                    "Payday loans have extremely high interest rates (400%+ APR).",
                },
              ],
            },
            paymentStrategy: {
              question:
                "After handling the emergency, how should you adjust your credit card payments?",
              options: [
                {
                  text: "Reduce to minimum payments temporarily",
                  explanation:
                    "Will significantly increase interest costs over time.",
                },
                {
                  text: "Maintain $150/month but cut other expenses",
                  explanation:
                    "Good discipline, but may be challenging to sustain.",
                },
                {
                  text: "Increase payments to $200/month by reducing entertainment budget",
                  explanation:
                    "Excellent - pays off debt faster and saves interest.",
                },
                {
                  text: "Use debt avalanche method across all debts",
                  explanation:
                    "Mathematically optimal approach for multiple debts.",
                },
              ],
            },
            creditUtilization: {
              question:
                "Your credit utilization is now high. What should be your immediate priority?",
              options: [
                {
                  text: "Request a credit limit increase",
                  explanation:
                    "May help utilization but could tempt more spending.",
                },
                {
                  text: "Pay down the balance aggressively",
                  explanation:
                    "Best long-term strategy for credit score and finances.",
                },
                {
                  text: "Open a new credit card for more available credit",
                  explanation:
                    "Hard inquiry hurts score and adds temptation to spend.",
                },
                {
                  text: "Focus on making all payments on time",
                  explanation:
                    "Payment history is most important factor in credit score.",
                },
              ],
            },
          },
          outcomes: {
            excellent: {
              title: "Financial Crisis Averted!",
              description:
                "You handled the emergency smartly, minimized debt growth, and created a sustainable recovery plan.",
            },
            good: {
              title: "Managed Well",
              description:
                "You made mostly good decisions with minor room for improvement in debt management.",
            },
            poor: {
              title: "Learning Experience",
              description:
                "This situation highlighted areas where different choices could lead to better financial outcomes.",
            },
          },
        },
        creditBuilding: {
          title: "Building Credit from Scratch",
          description:
            "Learn how to responsibly build credit history with your first credit card.",
          situation:
            "You're 22 years old and just got your first credit card with a $1,000 limit and 24% APR. You have a steady income of $2,500/month and want to build excellent credit for future goals like buying a car or home.",
          objectives: [
            "Establish positive payment history",
            "Keep utilization low for optimal credit score",
            "Build credit responsibly without accumulating debt",
          ],
          decisions: {
            spendingStrategy: {
              question:
                "How much should you spend on your credit card each month?",
              options: [
                {
                  text: "Use it for everything to build credit quickly ($800-900/month)",
                  explanation:
                    "High utilization (80-90%) significantly hurts your credit score.",
                },
                {
                  text: "Use it for small purchases only ($50-100/month)",
                  explanation:
                    "Perfect! 5-10% utilization is ideal for credit building.",
                },
                {
                  text: "Max it out and pay minimum payments",
                  explanation:
                    "Worst strategy - hurts credit score and creates expensive debt.",
                },
                {
                  text: "Only use it for emergencies",
                  explanation: "Safe but minimal credit building activity.",
                },
              ],
            },
            paymentTiming: {
              question: "When should you pay your credit card bill?",
              options: [
                {
                  text: "Pay the full balance every month before the due date",
                  explanation:
                    "Excellent! Avoids interest and builds perfect payment history.",
                },
                {
                  text: "Pay minimum amount to keep a small balance for credit building",
                  explanation:
                    "Myth! Carrying a balance doesn't help credit and costs interest.",
                },
                {
                  text: "Pay before the statement date to show $0 balance",
                  explanation:
                    "Good for utilization but may not show account activity.",
                },
                {
                  text: "Pay a few days after the due date",
                  explanation: "Late payments severely damage credit scores.",
                },
              ],
            },
            creditGrowth: {
              question:
                "After 6 months of responsible use, what should you do next?",
              options: [
                {
                  text: "Request a credit limit increase on your current card",
                  explanation: "Good strategy to lower utilization ratio.",
                },
                {
                  text: "Apply for multiple new cards to increase available credit",
                  explanation:
                    "Multiple inquiries in short time can hurt your score.",
                },
                {
                  text: "Continue current strategy and gradually increase usage",
                  explanation:
                    "Steady approach - patience builds strong credit.",
                },
                {
                  text: "Apply for one additional card with better rewards",
                  explanation:
                    "Reasonable if you maintain low utilization across both cards.",
                },
              ],
            },
          },
          outcomes: {
            excellent: {
              title: "Credit Building Champion!",
              description:
                "You've established excellent habits that will serve you well throughout your financial journey.",
            },
            good: {
              title: "Strong Foundation",
              description:
                "You're on the right track with minor adjustments needed for optimization.",
            },
            poor: {
              title: "Course Correction Needed",
              description:
                "These insights will help you avoid common credit building mistakes.",
            },
          },
        },
        balanceTransfer: {
          title: "Strategic Balance Transfer",
          description:
            "Optimize your debt payoff strategy using balance transfer options.",
          situation:
            "You have $8,000 in credit card debt across 3 cards with different APRs (Card A: $3,000 at 22%, Card B: $3,500 at 19%, Card C: $1,500 at 25%). You receive a balance transfer offer: 0% APR for 15 months, 3% transfer fee, then 16.99% APR.",
          objectives: [
            "Minimize total interest paid",
            "Create sustainable payoff plan",
            "Avoid falling back into debt",
          ],
          decisions: {
            transferDecision: {
              question:
                "Which balances should you transfer to the 0% APR card?",
              options: [
                {
                  text: "Transfer all $8,000 to maximize 0% period",
                  explanation:
                    "Good strategy if you can pay it off within 15 months.",
                },
                {
                  text: "Transfer only the highest APR debt (Card C: $1,500 at 25%)",
                  explanation: "Conservative but may not maximize the benefit.",
                },
                {
                  text: "Transfer the two highest balances (Cards A & B: $6,500)",
                  explanation:
                    "Excellent balance of benefit and manageable payment plan.",
                },
                {
                  text: "Don't transfer - the 3% fee isn't worth it",
                  explanation:
                    "Missing a significant opportunity to save on interest.",
                },
              ],
            },
            payoffStrategy: {
              question:
                "What monthly payment should you target for the transferred balance?",
              options: [
                {
                  text: "$400/month (will pay off in ~16 months)",
                  explanation:
                    "Risky - you'll barely finish before the promotional rate ends.",
                },
                {
                  text: "$500/month (will pay off in ~13 months)",
                  explanation:
                    "Good buffer - finished before promotional rate expires.",
                },
                {
                  text: "$600/month (will pay off in ~11 months)",
                  explanation:
                    "Excellent - maximum benefit with comfortable margin.",
                },
                {
                  text: "Minimum payments to stretch it out",
                  explanation: "Defeats the purpose of the 0% promotion.",
                },
              ],
            },
            remainingCards: {
              question: "How should you handle the cards you didn't transfer?",
              options: [
                {
                  text: "Close them to remove temptation",
                  explanation:
                    "Closing cards reduces available credit and hurts credit score.",
                },
                {
                  text: "Keep them open but cut up the physical cards",
                  explanation:
                    "Smart! Maintains credit history while removing temptation.",
                },
                {
                  text: "Use them for small purchases to keep them active",
                  explanation: "Good if you can pay them off immediately.",
                },
                {
                  text: "Focus all payments on transfer card and pay minimums on others",
                  explanation: "Makes sense during the promotional period.",
                },
              ],
            },
          },
          outcomes: {
            excellent: {
              title: "Transfer Master!",
              description:
                "You've maximized the benefit of the balance transfer while avoiding common pitfalls.",
            },
            good: {
              title: "Strategic Thinking",
              description:
                "Good use of the transfer option with room for minor optimization.",
            },
            poor: {
              title: "Missed Opportunity",
              description:
                "Understanding these strategies better will help with future debt management.",
            },
          },
        },
      },
    },

    // Credit Card Details
    creditCardDetails: {
      changePIN: "Change PIN",
      confirmPIN: "Confirm PIN",
      changingPIN: "Changing PIN...",
      currentLimitNoLimit: "Current limit: No limit set",
      placeholders: {
        pinDefault: "0000",
        spendingLimit: "1000.00",
      },
    },

    // Financial Health Calculator
    financialHealthCalculator: {
      placeholders: {
        creditLimit: "5000",
        balance: "10000",
        cardsCount: "2",
        interestRate: "22.0",
        creditScore: "700",
        monthlyIncome: "5000",
        monthlyExpenses: "3500",
        monthlyDebtPayments: "500",
      },
    },

    // Fee Analysis Dashboard
    feeAnalysisDashboard: {
      chartLabels: {
        annualFees: "Annual Fees",
        transactionFees: "Transaction Fees",
        penaltyFees: "Penalty Fees",
        totalFees: "Total Fees",
      },
    },

    // Profile Components
    profileForm: {
      editProfile: "Edit Profile",
      createProfile: "Create Profile",
      updateProfile: "Update Profile",
    },

    // Credit Card Profile Builder
    creditCardProfileBuilder: {
      benefits: {
        fraudProtection: "Fraud Protection",
        priceProtection: "Price Protection",
        extendedWarranty: "Extended Warranty",
        purchaseProtection: "Purchase Protection",
        travelInsurance: "Travel Insurance",
        roadsideAssistance: "Roadside Assistance",
        conciergeService: "Concierge Service",
        baggageInsurance: "Baggage Insurance",
      },
      categories: {
        gasStations: "Gas Stations",
        onlineShopping: "Online Shopping",
        departmentStores: "Department Stores",
        streamingServices: "Streaming Services",
      },
    },

    // Budget Planner
    budgetPlanner: {
      newCategory: "New Category",
      newGoal: "New Goal",
    },

    // Payment Impact Visualizer
    paymentImpactVisualizer: {
      minimumPayment: "Minimum Payment",
    },
  },
};
