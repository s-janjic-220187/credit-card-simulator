/**
 * German Localization File
 * Comprehensive translations for all UI elemen    required: 'Pflichtfeld',
    invalid: 'Ungültig',
    tooShort: 'Zu kurz',
    tooLong: 'Zu lang',
  },

  // Authentication
  auth: {
    welcomeBack: 'Willkommen zurück',
    signInPrompt: 'Melden Sie sich in Ihr Konto an',
    loginButton: 'Anmelden',
    signingIn: 'Anmeldung läuft...',
    createAccount: 'Erstellen',
    demoLogin: '🚀 Demo-Konto verwenden',
    loadingDemo: 'Demo wird geladen...',
    orSeparator: 'oder',
    noAccount: 'Haben Sie noch kein Konto? ',
  },

  // Navigation Componenthe SJ-CCMS application
 */

export const de = {
  // Common/Global
  common: {
    // Navigation
    dashboard: "Dashboard",
    cards: "Karten",
    billing: "Abrechnung",
    statements: "Abrechnungen",
    tools: "Werkzeuge",
    learn: "Lernen",
    scenarios: "Szenarien",
    account: "Konto",

    // Account Menu
    profileSettings: "Profil-Einstellungen",
    adminDashboard: "Admin-Dashboard",
    logout: "Abmelden",

    // Common Actions
    save: "Speichern",
    cancel: "Abbrechen",
    delete: "Löschen",
    edit: "Bearbeiten",
    view: "Anzeigen",
    create: "Erstellen",
    update: "Aktualisieren",
    submit: "Absenden",
    close: "Schließen",
    search: "Suchen",
    filter: "Filtern",
    reset: "Zurücksetzen",
    confirm: "Bestätigen",

    // Common Labels
    name: "Name",
    email: "E-Mail",
    username: "Benutzername",
    password: "Passwort",
    status: "Status",
    date: "Datum",
    amount: "Betrag",
    description: "Beschreibung",
    category: "Kategorie",
    type: "Typ",
    balance: "Saldo",
    limit: "Limit",
    available: "Verfügbar",

    // Status Values
    active: "Aktiv",
    inactive: "Inaktiv",
    pending: "Ausstehend",
    completed: "Abgeschlossen",
    cancelled: "Storniert",
    suspended: "Gesperrt",
    closed: "Geschlossen",

    // Time
    today: "Heute",
    yesterday: "Gestern",
    thisWeek: "Diese Woche",
    thisMonth: "Dieser Monat",
    lastMonth: "Letzter Monat",
    thisYear: "Dieses Jahr",
    time: "Zeit",

    // Currency
    currency: "€",

    // Loading States
    loading: "Lade...",
    noData: "Keine Daten verfügbar",
    error: "Fehler",

    // Validation
    required: "Pflichtfeld",
    invalid: "Ungültig",
    tooShort: "Zu kurz",
    tooLong: "Zu lang",

    // Language
    languageSelector: "Language / Sprache",
    englishUS: "English (US)",
    germanDE: "Deutsch (Deutschland)",
  },

  // Authentication
  auth: {
    welcomeBack: "Willkommen zurück",
    signInPrompt: "Melden Sie sich in Ihr Konto an",
    loginButton: "Anmelden",
    signingIn: "Anmeldung läuft...",
    createAccount: "Erstellen",
    demoLogin: "🚀 Demo-Konto verwenden",
    loadingDemo: "Demo wird geladen...",
    orSeparator: "oder",
    noAccount: "Haben Sie noch kein Konto? ",

    // Registration
    registration: {
      title: "Konto erstellen",
      subtitle: "Beginnen Sie mit Ihrem Kreditkarten-Simulator",
      username: "Benutzername",
      email: "E-Mail",
      password: "Passwort",
      confirmPassword: "Passwort bestätigen",
      createButton: "Konto erstellen",
      creating: "Konto wird erstellt...",
      alreadyHaveAccount: "Haben Sie bereits ein Konto? ",
      signIn: "Anmelden",

      // Validation Messages
      passwordMismatch: "Passwörter stimmen nicht überein",
      accountCreationFailed: "Konto konnte nicht erstellt werden",
    },

    // Credit Card Demo
    cardDemo: {
      cardHolder: "KARTENINHABER",
      expires: "GÜLTIG BIS",
      demoUser: "SJ-CCMS NUTZER",
    },
  },

  // Navigation Component
  navigation: {
    brand: "SJ-CCMS",
    transactions: "Transaktionen",
    mobile: {
      menu: "Menü",
      close: "Schließen",
    },
    calculators: {
      title: "Rechner",
      interestCalculator: "Zinsrechner",
      paymentStrategy: "Zahlungsstrategie",
      feeSimulator: "Gebührensimulator",
      financialHealth: "Finanzielle Gesundheit",
    },
    analytics: {
      title: "Analysen",
      interestGrowth: "Zinswachstum",
      paymentImpact: "Zahlungsauswirkung",
      feeAnalysis: "Gebührenanalyse",
    },
  },

  // Dashboard
  dashboard: {
    title: "SJ Kreditkarten-Management-Suite",
    subtitle:
      "Meistern Sie die Grundlagen von Kreditkarten mit dieser umfassenden Bildungsplattform. Lernen Sie über Abrechnungszyklen, Zinsberechnungen, Zahlungsstrategien und mehr durch interaktive Tools und Simulationen.",
    welcome: "Willkommen zurück!",
    yourCards: "Ihre Kreditkarten",
    creditCard: "Kreditkarte",
    cardholder: "Karteninhaber",
    available: "Verfügbar",
    limit: "Limit",
    balance: "Saldo",
    clickForDetails: "Für Details klicken →",
    helpText:
      "💡 Klicken Sie auf eine beliebige Karte, um detaillierte Informationen, Transaktionen und Kontodetails anzuzeigen",

    // Feature cards
    billingCycle: {
      title: "Abrechnungszyklus-Dashboard",
      description:
        "Visualisieren und verwalten Sie komplette Abrechnungszyklen mit detaillierten Aufschlüsselungen von Käufen, Zahlungen, Zinsen und Gebühren.",
      action: "Abrechnungszyklen erkunden →",
    },
    interestCalculator: {
      title: "Zinsrechner",
      description:
        "Interaktiver Rechner für effektive Jahreszinsen, tägliche und monatliche Zinssätze mit pädagogischen Aufschlüsselungen und Vergleichen.",
      action: "Zinsen berechnen →",
    },
    paymentStrategy: {
      title: "Zahlungsstrategie-Analyzer",
      description:
        "Vergleichen Sie Mindest-, individuelle und aggressive Zahlungsstrategien, um die Tilgungszeit zu optimieren und Zinskosten zu minimieren.",
      action: "Strategien analysieren →",
    },
    feeSimulator: {
      title: "Gebührenstruktur-Simulator",
      description:
        "Analysieren und vergleichen Sie Kreditkartengebührenstrukturen in verschiedenen Nutzungsszenarien und Ausgabenmustern.",
      action: "Gebühren simulieren →",
    },
    cardBuilder: {
      title: "Kreditkarten-Profil-Builder",
      description:
        "Erstellen Sie detaillierte Kreditkartenprofile mit benutzerdefinierten Bedingungen, Belohnungen und Funktionen für umfassende Vergleiche.",
      action: "Profile erstellen →",
    },
    transactionManagement: {
      title: "Transaktionsverwaltung",
      description:
        "Fügen Sie manuelle Transaktionen für Ihre Kreditkarten hinzu, bearbeiten und verwalten Sie sie. Verfolgen Sie Ausgaben und Zahlungen.",
      action: "Transaktionen verwalten →",
    },
    statementGenerator: {
      title: "Abrechnungs-Generator",
      description:
        "Generieren Sie realistische Kreditkartenabrechnungen und verstehen Sie alle Komponenten einschließlich Zinsberechnungen und Gebühren.",
      action: "Abrechnungen generieren →",
    },
    educationCenter: {
      title: "Bildungszentrum",
      description:
        "Umfassende Lernmodule, Tipps und Strategien zur Beherrschung des Kreditkarten-Managements und der Finanzbildung.",
      action: "Lernen beginnen →",
    },
    financialHealth: {
      title: "Finanzgesundheits-Score",
      description:
        "Umfassende Bewertung Ihrer Finanzgesundheit in den Bereichen Kredit, Schulden, Cashflow und Finanzgewohnheiten.",
      action: "Score berechnen →",
    },
    scenarioLearning: {
      title: "Szenario-basiertes Lernen",
      description:
        "Üben Sie finanzielle Entscheidungsfindung durch interaktive Szenarien mit realen Herausforderungen und Ergebnissen.",
      action: "Szenarien üben →",
    },

    // Key features
    keyFeatures: {
      title: "🌟 Wichtige Lernfunktionen",
      interactiveSimulations: {
        title: "Interaktive Simulationen",
        description: "Echtzeitberechnungen und Szenario-Modellierung",
      },
      educationalContent: {
        title: "Bildungsinhalte",
        description: "Umfassende Lernmodule und Leitfäden",
      },
      dataVisualization: {
        title: "Datenvisualisierung",
        description: "Diagramme und Grafiken für besseres Verständnis",
      },
      practicalApplication: {
        title: "Praktische Anwendung",
        description: "Reale Szenarien und Fallstudien",
      },
    },

    // Quick start guide
    quickStart: {
      title: "🚀 Schnellstart-Leitfaden",
      step1: {
        title: "Beginnen Sie mit der Bildung",
        description:
          "Beginnen Sie mit dem Bildungszentrum, um die Grundlagen von Kreditkarten und bewährte Praktiken zu lernen.",
      },
      step2: {
        title: "Verwenden Sie Rechner",
        description:
          "Experimentieren Sie mit interaktiven Rechnern, um Zinsen, Zahlungen und Gebühren zu verstehen.",
      },
      step3: {
        title: "Erstellen & Vergleichen",
        description:
          "Erstellen Sie Kreditkartenprofile und generieren Sie Abrechnungen, um verschiedene Szenarien zu vergleichen.",
      },
    },

    // Visualizations
    visualizations: {
      title: "📈 Erweiterte Datenvisualisierungen",
      subtitle:
        "Erkunden Sie interaktive Diagramme und Visualisierungen, um das Verhalten von Kreditkarten und Zahlungsstrategien besser zu verstehen.",
      interestGrowth: {
        title: "Zinswachstums-Diagramme",
        description:
          "Visualisieren Sie, wie sich Zinsen im Laufe der Zeit mit verschiedenen Zahlungsstrategien zusammensetzen und sehen Sie die dramatischen Auswirkungen der Zahlungsbeträge.",
        action: "Diagramme erkunden",
      },
      paymentImpact: {
        title: "Zahlungsauswirkung-Visualisierer",
        description:
          "Sehen Sie die starke Wirkung der Erhöhung Ihrer Zahlungen mit Seite-an-Seite-Vergleichen und Einsparungsberechnungen.",
        action: "Auswirkung visualisieren",
      },
      feeAnalysis: {
        title: "Gebührenanalyse-Dashboard",
        description:
          "Umfassende Analyse von Gebührenstrukturen mit interaktiven Diagrammen, um zu verstehen, wohin Ihr Geld fließt.",
        action: "Gebühren analysieren",
      },
    },

    // Statistics
    statistics: {
      interactiveTools: "Interaktive Tools",
      dataVisualizations: "Datenvisualisierungen",
      learningModules: "Lernmodule",
      scenarios: "Zu erkundende Szenarien",
    },

    // Footer
    footer: {
      createdBy: "Erstellt von:",
      contact: "Kontakt:",
      version: "Version:",
      description: "Bildungs-Kreditkarten-Abrechnungs-Simulator",
    },

    quickActions: {
      title: "Schnellaktionen",
      newTransaction: "Neue Transaktion",
      viewStatements: "Abrechnungen anzeigen",
      payBill: "Rechnung bezahlen",
      contactSupport: "Support kontaktieren",
    },
    gettingStarted: {
      title: "Erste Schritte",
      step1: {
        title: "Mit Bildung beginnen",
        description:
          "Beginnen Sie mit dem Bildungszentrum, um die Grundlagen von Kreditkarten und bewährte Praktiken zu erlernen.",
      },
      step2: {
        title: "Rechner verwenden",
        description:
          "Experimentieren Sie mit interaktiven Rechnern, um Zinsen, Zahlungen und Gebühren zu verstehen.",
      },
      step3: {
        title: "Szenarien erkunden",
        description:
          "Probieren Sie verschiedene Finanzszenarien aus, um die Auswirkungen verschiedener Entscheidungen zu sehen.",
      },
    },
    recentActivity: "Letzte Aktivitäten",
    upcomingPayments: "Anstehende Zahlungen",
    accountSummary: "Kontoübersicht",
  },

  // Credit Card Components
  creditCard: {
    details: {
      title: "Kreditkartendetails",
      tabs: {
        overview: "Übersicht",
        transactions: "Transaktionen",
        details: "Details",
      },
      cardInfo: {
        cardNumber: "Kartennummer",
        expiryDate: "Ablaufdatum",
        cvv: "CVV",
        cardholderName: "Karteninhaber",
        issueDate: "Ausgabedatum",
        cardStatus: "Kartenstatus",
      },
      limits: {
        title: "Limits und Salden",
        creditLimit: "Kreditlimit",
        currentBalance: "Aktueller Saldo",
        availableCredit: "Verfügbares Kreditlimit",
        minimumPayment: "Mindestzahlung",
        nextDueDate: "Nächster Fälligkeitstermin",
      },
      fees: {
        title: "Gebühren und Zinsen",
        apr: "Effektiver Jahreszins",
        annualFee: "Jahresgebühr",
        lateFeePct: "Verzugsgebühr (%)",
        lateFeeFlat: "Verzugsgebühr (Pauschal)",
        foreignTransFee: "Auslandstransaktionsgebühr",
        cashAdvanceFee: "Bargeldvorschussgebühr",
        balanceTransferFee: "Saldoübertragungsgebühr",
      },
    },
    builder: {
      title: "Kreditkarten-Profil-Builder",
      subtitle:
        "Erstellen Sie detaillierte Kreditkartenprofile zum Vergleich von Funktionen, Kosten und Vorteilen. Bauen Sie benutzerdefinierte Szenarien, um die beste Karte für Ihre Ausgabenmuster zu finden.",
      createNewProfile: "Neues Profil erstellen",
      editProfile: "Profil bearbeiten",
      saveProfile: "Profil speichern",
      updateProfile: "Profil aktualisieren",
      cancelEdit: "Abbrechen",
      compareSelected: "Ausgewählte vergleichen",
      backToBuilder: "Zurück zum Builder",
      deleteConfirmation:
        "Sind Sie sicher, dass Sie dieses Profil löschen möchten?",
      requiredFields: "Bitte geben Sie Kartenname und Herausgeber an",

      tabs: {
        basic: "Grundinformationen",
        financial: "Finanzielle Bedingungen",
        rewards: "Belohnungsprogramm",
        features: "Funktionen & Vorteile",
      },

      basic: {
        cardName: "Kartenname",
        cardNameRequired: "Kartenname *",
        cardNamePlaceholder: "z.B. Chase Freedom Unlimited",
        issuer: "Herausgeber",
        issuerRequired: "Herausgeber *",
        issuerPlaceholder: "z.B. Chase",
        cardCategory: "Kartenkategorie",
        creditLimit: "Kreditlimit ($)",
        creditScoreRequirement: "Kredit-Score-Anforderung",
      },

      financial: {
        aprRates: "APR-Sätze (%)",
        purchaseApr: "Kauf-APR",
        balanceTransferApr: "Saldoübertragung-APR",
        cashAdvanceApr: "Bargeldvorschuss-APR",
        fees: "Gebühren",
        annualFee: "Jahresgebühr ($)",
        foreignTransactionFee: "Auslandstransaktionsgebühr (%)",
        balanceTransferFee: "Saldoübertragungsgebühr (%)",
        cashAdvanceFee: "Bargeldvorschussgebühr (%)",
      },

      rewards: {
        rewardsType: "Belohnungstyp",
        baseRate: "Grundrate (%)",
        bonusCategories: "Bonus-Kategorien",
        addCategory: "Kategorie hinzufügen",
        selectCategory: "Kategorie auswählen",
        ratePlaceholder: "Rate %",
        limitPlaceholder: "Limit ($)",
        remove: "Entfernen",
        bonusCategoryOptions: {
          gasStations: "Tankstellen",
          groceries: "Lebensmittel",
          restaurants: "Restaurants",
          travel: "Reisen",
          onlineShopping: "Online-Shopping",
          departmentStores: "Kaufhäuser",
          streamingServices: "Streaming-Dienste",
          phoneInternetBills: "Telefon-/Internetrechnungen",
          pharmacies: "Apotheken",
          transit: "Öffentliche Verkehrsmittel",
          homeImprovement: "Hausverbesserung",
          officeSupplies: "Bürobedarf",
        },
      },

      features: {
        cardFeatures: "Kartenfunktionen",
        featureOptions: {
          noForeignTransactionFees: "Keine Auslandstransaktionsgebühren",
          fraudProtection: "Betrugsschutz",
          priceProtection: "Preisschutz",
          extendedWarranty: "Erweiterte Garantie",
          purchaseProtection: "Kaufschutz",
          travelInsurance: "Reiseversicherung",
          rentalCarInsurance: "Mietwagen-Versicherung",
          roadsideAssistance: "Pannenhilfe",
          conciergeService: "Concierge-Service",
          airportLoungeAccess: "Flughafen-Lounge-Zugang",
          tsaPreCheckCredit: "TSA PreCheck/Global Entry Guthaben",
          cellPhoneProtection: "Handy-Schutz",
          baggageInsurance: "Gepäckversicherung",
          tripCancellationInsurance: "Reiserücktrittsversicherung",
        },
      },

      comparison: {
        title: "Kreditkartenvergleich",
        annualValue: "Jährlicher Wert",
        rewards: "Belohnungen",
        fee: "Gebühr",
        apr: "APR",
        creditLimit: "Kreditlimit",
        rewardsRate: "Belohnungsrate",
        baseRate: "Basis",
        bonusCategories: "Bonus-Kategorien",
        keyFeatures: "Hauptmerkmale",
        more: "weitere",
      },

      savedProfiles: {
        title: "Gespeicherte Profile",
        annualValue: "Jährlicher Wert:",
        noProfilesYet:
          "Noch keine Profile gespeichert. Erstellen Sie Ihr erstes Profil!",
        edit: "Bearbeiten",
        delete: "Löschen",
      },

      tips: {
        title: "Profilerstellungstipps",
        accurateData: "Genaue Daten:",
        accurateDataDesc:
          "Verwenden Sie echte Kartenbedingungen von Herausgeberwebsites für genaue Vergleiche.",
        considerSpending: "Berücksichtigen Sie Ihre Ausgaben:",
        considerSpendingDesc:
          "Passen Sie Bonus-Kategorien an Ihre tatsächlichen Ausgabenmuster an.",
        totalCost: "Gesamtkostenanalyse:",
        totalCostDesc:
          "Berücksichtigen Sie Jahresgebühren, Zinsen und Strafgebühren, nicht nur Belohnungen.",
      },

      categories: {
        cashback: "Cashback",
        rewards: "Belohnungspunkte",
        travel: "Reisen",
        business: "Geschäft",
        student: "Student",
        secured: "Gesichert",
      },

      rewardTypes: {
        cashback: "Cashback",
        points: "Punkte",
        miles: "Meilen",
        none: "Keine Belohnungen",
      },
    },
  },

  // Transaction Components
  transactions: {
    title: "Transaktionen",
    selectCard: "Kreditkarte auswählen",
    addTransaction: "Transaktion hinzufügen",
    unknownMerchant: "Unbekannter Händler",

    // Dashboard
    dashboard: {
      recentTransactions: "Letzte Transaktionen",
      totalSpent: "Gesamtausgaben",
      totalPayments: "Gesamtzahlungen",
      netChange: "Nettoveränderung",
      noTransactionsYet: "Noch keine Transaktionen",
      getStartedMessage: "Beginnen Sie mit Ihrer ersten Transaktion",
      addFirstTransaction: "Erste Transaktion hinzufügen",
      showingRecent: "Zeige die {count} neuesten Transaktionen",
      cancelConfirmation:
        "Sind Sie sicher, dass Sie diese Transaktion stornieren möchten?",
      transactionCancelled: "Transaktion erfolgreich storniert",
      cancelFailed: "Transaktion konnte nicht storniert werden",
      loadFailed: "Transaktionen konnten nicht geladen werden",
    },
    form: {
      title: "Neue Transaktion",
      merchant: "Händler",
      merchantPlaceholder: "z.B. Amazon, Walmart, Starbucks",
      category: "Kategorie",
      categoryRequired: "Kategorie *",
      description: "Beschreibung",
      descriptionRequired: "Beschreibung *",
      descriptionPlaceholder: "Kurze Beschreibung der Transaktion",
      location: "Ort (Optional)",
      locationPlaceholder: "z.B. Berlin, Deutschland",
      amount: "Betrag",
      amountRequired: "Betrag ($) *",
      additionalFees: "Zusätzliche Gebühren ($)",
      merchantNameRequired: "Händlername *",
      type: "Transaktionstyp",
      typeRequired: "Typ *",
      creating: "Erstelle...",
      createTransaction: "Transaktion erstellen",
      balanceIncrease: "⚠ Dies erhöht Ihren Saldo",
      balanceDecrease: "✓ Dies reduziert Ihren Saldo",
    },
    types: {
      PURCHASE: "Kauf",
      PAYMENT: "Zahlung",
      REFUND: "Rückerstattung",
      FEE: "Gebühr",
      CASH_ADVANCE: "Bargeldvorschuss",
      INTEREST: "Zinsen",
      CREDIT: "Kredit",
    },
    typeDescriptions: {
      PURCHASE: "Reguläre Kauftransaktion",
      PAYMENT: "Zahlung zum Kreditkartensaldo",
      REFUND: "Rückerstattung vom Händler",
      FEE: "Kreditkartengebühr (jährlich, verspätet, etc.)",
      CASH_ADVANCE: "Bargeldvorschuss von der Kreditkarte",
    },
    categories: {
      GROCERIES: "Lebensmittel",
      DINING: "Restaurant & Gastronomie",
      GAS: "Benzin & Kraftstoff",
      UTILITIES: "Versorgungsunternehmen",
      ENTERTAINMENT: "Unterhaltung",
      SHOPPING: "Einkaufen",
      TRAVEL: "Reisen",
      HEALTHCARE: "Gesundheitswesen",
      EDUCATION: "Bildung",
      OTHER: "Sonstiges",
    },
    statuses: {
      ACTIVE: "Aktiv",
      PENDING: "Ausstehend",
      CANCELLED: "Storniert",
      COMPLETED: "Abgeschlossen",
    },
    history: {
      title: "Transaktionshistorie",
      noTransactions: "Keine Transaktionen gefunden",
      filterBy: "Filtern nach",
      sortBy: "Sortieren nach",
      dateRange: "Datumsbereich",
    },
    analytics: {
      title: "Ausgaben-Analyse",
      subtitle:
        "Analysieren Sie Ihre Ausgabenmuster und verfolgen Sie finanzielle Ziele",
      loading: "Lade Analyse...",
      loadFailed: "Fehler beim Laden der Ausgaben-Analyse",
      totalSpent: "Gesamt ausgegeben",
      totalPayments: "Gesamt-Zahlungen",
      netChange: "Netto-Veränderung",
      averageTransaction: "Durchschnittliche Transaktion",
      spending: "Ausgaben",
      payments: "Zahlungen",
      spendingByCategory: "Ausgaben nach Kategorie",
      categoryDetails: "Kategorie-Details",
      monthlyTrends: "Monatliche Ausgaben-Trends",
      monthlyBudget: "Monatsbudget",
      budgetLimit: "Budget-Limit",
      currentSpending: "Aktuelle Ausgaben",
      remainingBudget: "Verbleibendes Budget",
      progress: "Fortschritt",
      topMerchants: "Top-Händler",
      noMerchantsData: "Keine Händlerdaten verfügbar",
      tabs: {
        overview: "Übersicht",
        categories: "Kategorien",
        trends: "Trends",
        goals: "Ziele",
      },
      insights: {
        title: "Intelligente Einblicke",
        spendingPattern: "Ausgabenmuster-Analyse",
        spendingPatternDesc:
          "Verfolgen Sie Ihre Ausgabengewohnheiten nach Kategorien, um Optimierungsbereiche zu identifizieren.",
        budgetTracking: "Budget-Verfolgung",
        budgetTrackingDesc:
          "Setzen Sie Monatsbudgets und überwachen Sie Ihren Fortschritt, um Ihre finanziellen Ziele zu erreichen.",
        categoryOptimization: "Kategorie-Optimierung",
        categoryOptimizationDesc:
          "Identifizieren Sie, welche Kategorien den größten Teil Ihres Budgets verbrauchen und finden Sie Sparmöglichkeiten.",
        trendAnalysis: "Trend-Analyse",
        trendAnalysisDesc:
          "Analysieren Sie Ausgaben-Trends über die Zeit, um fundierte finanzielle Entscheidungen zu treffen.",
      },
    },
    searchFilters: {
      title: "Transaktionssuche & Filter",
      subtitle:
        "Finden und analysieren Sie Ihre Transaktionen mit erweiterten Filteroptionen",
      searchPlaceholder: "Suche nach Händler, Beschreibung oder Ort...",
      filters: "Filter",
      export: "Exportieren",
      advancedFilters: "Erweiterte Filter",
      clearFilters: "Filter löschen",
      type: "Transaktionstyp",
      category: "Kategorie",
      sortBy: "Sortieren nach",
      amountRange: "Betragsspanne",
      dateFrom: "Von Datum",
      dateTo: "Bis Datum",
      minAmount: "Min",
      maxAmount: "Max",
      allTypes: "Alle Typen",
      allCategories: "Alle Kategorien",
      sortByDate: "Datum",
      sortByAmount: "Betrag",
      sortByMerchant: "Händler",
      ascending: "Aufsteigend",
      descending: "Absteigend",
      resultsFound: "Ergebnisse gefunden",
      of: "von",
      totalValue: "Gesamtwert",
      loading: "Lade Transaktionen...",
      loadFailed: "Fehler beim Laden der Transaktionen",
      noResults: "Keine Transaktionen gefunden",
      tryDifferentFilters:
        "Versuchen Sie, Ihre Filter oder Suchbegriffe anzupassen",
      exportSuccess: "Transaktionen erfolgreich exportiert",
    },
    hub: {
      title: "Transaktionsverwaltungs-Hub",
      subtitle: "Umfassende Tools zur Transaktionsverwaltung und -analyse",
      noCards: "Keine Kreditkarten gefunden",
      noCardsDesc:
        "Sie benötigen mindestens eine Kreditkarte, um Transaktionen zu verwalten.",
      goToDashboard: "Zum Dashboard",
      availableCredit: "Verfügbares Kreditlimit",
      quickActions: "Schnellaktionen",
      addTransaction: "Transaktion hinzufügen",
      addTransactionDesc: "Neue Transaktion erfassen",
      searchTransactions: "Suchen & Filtern",
      searchTransactionsDesc: "Spezifische Transaktionen finden",
      viewAnalytics: "Analysen anzeigen",
      viewAnalyticsDesc: "Ausgaben-Einblicke & Trends",
      manageBudget: "Budget verwalten",
      manageBudgetDesc: "Limits setzen & Ziele verfolgen",
      createTransaction: "Neue Transaktion erstellen",
      createTransactionDesc:
        "Eine neue Transaktion zu Ihrer Kreditkarte hinzufügen",
      transactionCreated: "Transaktion erfolgreich erstellt!",
      managingCard: "Verwaltete Karte",
      currentBalance: "Aktueller Saldo",
      creditLimit: "Kreditlimit",
      utilization: "ausgelastet",
      tabs: {
        overview: "Übersicht",
        overviewDesc: "Dashboard & Schnellaktionen",
        search: "Suchen",
        searchDesc: "Erweiterte Filterung",
        analytics: "Analysen",
        analyticsDesc: "Ausgaben-Einblicke",
        budget: "Budget",
        budgetDesc: "Budgetplanung",
        create: "Erstellen",
        createDesc: "Transaktion hinzufügen",
      },
    },
  },

  // Profile Components
  profile: {
    dashboard: {
      title: "Profilinformationen",
      editProfile: "Profil bearbeiten",
      sections: {
        address: "Adresse",
        employment: "Beschäftigung",
        creditInformation: "Kreditinformationen",
        accountInformation: "Kontoinformationen",
      },
      labels: {
        profileCreated: "Profil erstellt",
        lastUpdated: "Zuletzt aktualisiert",
      },
      personalInfo: {
        title: "Persönliche Informationen",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail-Adresse",
        phone: "Telefonnummer",
        dateOfBirth: "Geburtsdatum",
        name: "Name",
        phoneLabel: "Telefon",
        dateOfBirthLabel: "Geburtsdatum",
      },
      financialInfo: {
        title: "Finanzielle Informationen",
        annualIncome: "Jahreseinkommen",
        employmentStatus: "Beschäftigungsstatus",
        creditScore: "Kredit-Score",
        creditRating: "Kreditbewertung",
        statusLabel: "Status",
        annualIncomeLabel: "Jahreseinkommen",
        creditScoreLabel: "Kredit-Score",
      },
      addressInfo: {
        title: "Adressinformationen",
        street: "Straße",
        city: "Stadt",
        state: "Bundesland",
        zipCode: "Postleitzahl",
        country: "Land",
      },
      creditScoreRanges: {
        excellent: "Ausgezeichnet",
        good: "Gut",
        fair: "Angemessen",
        poor: "Schlecht",
      },
    },
    form: {
      title: "Profil bearbeiten",
      personalDetails: "Persönliche Daten",
      financialDetails: "Finanzielle Details",
      addressDetails: "Adressdaten",
      employmentStatuses: {
        EMPLOYED: "Angestellt",
        SELF_EMPLOYED: "Selbstständig",
        UNEMPLOYED: "Arbeitslos",
        RETIRED: "Rentner",
        STUDENT: "Student",
      },
    },
  },

  // Billing Cycle Components
  billingCycle: {
    dashboard: {
      title: "💳 Abrechnungszyklus-Dashboard",
      description:
        "Verfolgen und analysieren Sie Kreditkarten-Abrechnungszyklen, Zinsberechnungen und Gebührenstrukturen.",
      generateNewCycle: "Neuen Zyklus generieren",
      billingCycles: "Abrechnungszyklen",
      cycleNumber: "Zyklus #",
      overview: "Übersicht",
      current: "Aktuell",
      paid: "Bezahlt",
      overdue: "Überfällig",
      balance: "Saldo",

      // No cycles found section
      noBillingCyclesFound: "Keine Abrechnungszyklen gefunden",
      noBillingCyclesDesc:
        "Für diese Kreditkarte existieren noch keine Abrechnungszyklen.",
      toGetStarted: "Zum Einstieg:",
      getStartedSteps: [
        "Stellen Sie sicher, dass Sie eine gültige Kreditkarte im System haben",
        'Klicken Sie auf "Neuen Zyklus generieren", um Ihren ersten Abrechnungszyklus zu erstellen',
        "Fügen Sie einige Transaktionen hinzu, um Abrechnungszyklus-Berechnungen zu sehen",
      ],
      noCreditCardsYet: "Haben Sie noch keine Kreditkarten eingerichtet?",
      createDemoData: "Demo-Daten erstellen",
      createDemoDataDesc:
        "Dies erstellt einen Demo-Benutzer, ein Profil und eine Kreditkarte zum Testen",

      // Cycle overview cards
      startingBalance: "Startsaldo",
      totalPurchases: "Gesamtkäufe",
      endingBalance: "Endsaldo",

      // Interest & Fees section
      interestAndFees: "Zinsen & Gebühren",
      averageDailyBalance: "Durchschnittlicher Tagessaldo",
      interestCharged: "Berechnete Zinsen",
      feesCharged: "Berechnete Gebühren",
      totalPayments: "Gesamtzahlungen",
      minimumPayment: "Mindestzahlung",
      dueDate: "Fälligkeitsdatum",

      // Educational section
      howCalculated: "Wie dieser Zyklus berechnet wurde",
      interestCalculation: "Zinsberechnung",
      interestCalculationDesc:
        "Tageszinssatz × Durchschnittlicher Tagessaldo × Tage im Zyklus = Zinsgebühr",
      averageDailyBalanceCalc: "Durchschnittlicher Tagessaldo",
      averageDailyBalanceDesc:
        "Summe der Tagessalden ÷ Anzahl der Tage im Zyklus =",
      minimumPaymentCalc: "Mindestzahlung",
      minimumPaymentDesc:
        "Normalerweise 2-3% des Saldos oder 35€ (je nachdem, was höher ist), plus Zinsen und Gebühren =",

      // No cycle selected
      selectBillingCycle: "Abrechnungszyklus auswählen",
      selectBillingCycleDesc:
        "Wählen Sie einen Abrechnungszyklus aus der Liste, um detaillierte Berechnungen, Zinsaufschlüsselungen und Bildungsinformationen anzuzeigen.",

      // Legacy fields (keeping for compatibility)
      noCreditCards: "Keine Kreditkarten gefunden",
      noCreditCardsDesc:
        "Um die Abrechnungszyklus-Funktionen zu nutzen, benötigen Sie mindestens eine eingerichtete Kreditkarte. Kreditkarten sind erforderlich, um Abrechnungszyklen zu generieren, Ausgaben zu verfolgen und Zinsberechnungen zu analysieren.",
      quickSetup: "Schnelle Setup-Optionen",
      createDemoCard: "Demo-Kreditkarte erstellen",
      demoCardDesc:
        "Erstellt sofort ein Demo-Benutzerprofil und eine Kreditkarte mit realistischen Einstellungen zum Testen",
      cycleOverview: "Zyklus-Übersicht",
      currentCycle: "Aktueller Zyklus",
      previousCycles: "Vorherige Zyklen",
      cycleDetails: "Zyklus-Details",
      unpaid: "Unbezahlt",
      selectCycle: "Rechnungszyklus auswählen",
      selectCycleDesc:
        "Wählen Sie einen Rechnungszyklus aus der Liste aus, um detaillierte Berechnungen, Zinsaufschlüsselungen und Bildungsinformationen anzuzeigen.",
    },
  },

  // Statement Components
  statement: {
    generator: {
      title: "Kontoauszug-Generator",
      viewStatement: "Kontoauszug anzeigen",
      statementBuilder: "Kontoauszug-Builder",
      backToBuilder: "Zurück zum Builder",
      accountInfo: {
        title: "Kontoinformationen",
        cardholderName: "Karteninhaber",
        accountNumber: "Kontonummer",
        creditLimit: "Kreditlimit ($)",
        previousBalance: "Vorheriger Saldo ($)",
        apr: "APR (%)",
        minimumPaymentPct: "Mindestzahlung (%)",
      },
      statementPeriod: {
        title: "Abrechnungszeitraum",
        startDate: "Startdatum",
        endDate: "Enddatum",
        paymentDueDate: "Zahlungsfälligkeitsdatum",
      },
      addTransaction: {
        title: "Transaktion hinzufügen",
        description: "Beschreibung",
        amount: "Betrag ($)",
        category: "Kategorie",
        transactionType: "Transaktionstyp",
        date: "Datum",
        addTransactionBtn: "Transaktion hinzufügen",
      },
      transactionList: {
        title: "Transaktionen",
        date: "Datum",
        description: "Beschreibung",
        category: "Kategorie",
        amount: "Betrag",
        actions: "Aktionen",
        remove: "Entfernen",
        noTransactions: "Noch keine Transaktionen",
      },
      statementSummary: {
        title: "Kontoauszug-Zusammenfassung",
        previousBalance: "Vorheriger Saldo",
        purchases: "Käufe",
        payments: "Zahlungen",
        fees: "Gebühren",
        interest: "Zinsen",
        newBalance: "Neuer Saldo",
        availableCredit: "Verfügbares Kreditlimit",
        minimumPayment: "Mindestzahlung",
        paymentDueDate: "Zahlungsfälligkeitsdatum",
      },
      transactionTypes: {
        purchase: "Kauf",
        payment: "Zahlung",
        fee: "Gebühr",
        interest: "Zinsen",
        credit: "Guthaben",
      },
      categories: {
        groceries: "Lebensmittel",
        gas: "Tankstelle",
        dining: "Restaurant",
        onlineShopping: "Online-Shopping",
        travel: "Reisen",
        entertainment: "Unterhaltung",
        utilities: "Versorgungsunternehmen",
        healthcare: "Gesundheitswesen",
        education: "Bildung",
        other: "Sonstiges",
        purchase: "Kauf",
        fee: "Gebühr",
      },
    },
  },

  // Calculator Components
  calculators: {
    interest: {
      title: "Zinsrechner",
      description: "Berechnen Sie Zinsen auf Ihr Kreditkartenguthaben",
      principal: "Anfangssaldo",
      annualRate: "Jährlicher Zinssatz (%)",
      months: "Monate",
      monthlyPayment: "Monatliche Zahlung",
      result: {
        totalInterest: "Gesamtzinsen",
        totalPaid: "Gesamtbetrag gezahlt",
        payoffTime: "Tilgungszeit",
      },
    },
    paymentStrategy: {
      title: "Zahlungsstrategierechner",
      description: "Vergleichen Sie verschiedene Zahlungsstrategien",
      minimumPayment: "Mindestzahlung",
      customPayment: "Benutzerdefinierte Zahlung",
      strategy: {
        minimum: "Nur Mindestzahlung",
        fixed: "Feste Zahlung",
        percentage: "Prozentsatz des Saldos",
      },
    },
    feeSimulator: {
      title: "Gebührensimulator",
      description: "Simulieren Sie verschiedene Kreditkartengebühren",
      latePaymentFee: "Verzugsgebühr",
      overlimitFee: "Überziehungsgebühr",
      foreignTransactionFee: "Auslandstransaktionsgebühr",
      cashAdvanceFee: "Bargeldvorschussgebühr",
    },
    financialHealth: {
      title: "Rechner für finanzielle Gesundheit",
      description: "Bewerten Sie Ihre finanzielle Gesundheit",
      monthlyIncome: "Monatliches Einkommen",
      monthlyExpenses: "Monatliche Ausgaben",
      monthlyDebtPayments: "Monatliche Schuldenzahlungen",
      emergencyFund: "Notfallfonds",
      creditCardDebt: "Kreditkartenschulden",
      otherDebt: "Andere Schulden",
      result: {
        score: "Gesundheitsscore",
        rating: "Bewertung",
        recommendations: "Empfehlungen",
      },
    },
  },

  // Education Components
  education: {
    dashboard: {
      title: "Kreditkarten-Bildungszentrum",
      subtitle:
        "Meistern Sie die Grundlagen, Strategien und bewährten Praktiken von Kreditkarten, um fundierte finanzielle Entscheidungen zu treffen.",
      tabs: {
        overview: "Übersicht",
        modules: "Lernmodule",
        tips: "Tipps & Strategien",
        calculator: "Schnellrechner",
        quiz: "Wissensquiz",
      },
      progress: {
        learningProgress: "Lernfortschritt",
        totalPoints: "Gesamtpunkte",
        earnPoints: "10 Punkte pro abgeschlossenem Modul verdienen",
        learningLevel: "Lernniveau",
        advanceLevel: "Weitere Module abschließen zum Aufsteigen",
      },
      quickStart: {
        title: "Schnellstart-Leitfaden",
        newToCreditCards: {
          title: "Neu bei Kreditkarten?",
          step1: "Mit den Grundlagen beginnen: Grundlegende Konzepte lernen",
          step2: "Zinsen verstehen: Wissen, wie Kosten berechnet werden",
          step3: "Zahlungsstrategien: Intelligente Zahlungsmethoden lernen",
        },
        wantToOptimize: {
          title: "Möchten Sie optimieren?",
          step1: "Belohnungen maximieren: Mehr Wert aus Ausgaben ziehen",
          step2: "Kredit-Score optimieren: Ihren Score verbessern",
          step3: "Fortgeschrittene Strategien: Komplexe Techniken meistern",
        },
      },
      featuredTips: {
        title: "Empfohlene Tipps",
      },
      quickCalculator: {
        title: "Schneller Finanzrechner",
        description:
          "Verwenden Sie interaktive Rechner, um Zinsen, Zahlungen und Belohnungen in Echtzeit zu verstehen.",
        interestCalculator: {
          title: "Zinsrechner",
          description: "Zinskosten für Ihr Guthaben berechnen",
          button: "Rechner öffnen",
        },
        paymentStrategy: {
          title: "Zahlungsstrategie",
          description: "Verschiedene Zahlungsstrategien vergleichen",
          button: "Rechner öffnen",
        },
        rewardsCalculator: {
          title: "Belohnungsrechner",
          description: "Potenzielle Belohnungseinnahmen berechnen",
          button: "Rechner öffnen",
        },
      },
      knowledgeQuiz: {
        title: "Wissensquiz",
        description:
          "Testen Sie Ihr Kreditkartenwissen mit diesem umfassenden Quiz zu allen Themen.",
        comingSoon:
          "Bald verfügbar! Ein interaktives Quiz wird bald hinzugefügt.",
      },
    },
    modules: {
      basics: {
        title: "Kreditkartengrundlagen",
        overview:
          "Lernen Sie die fundamentalen Konzepte von Kreditkarten, wie sie funktionieren und warum sie ein wertvolles Finanzinstrument sind.",
        keyPoints: [
          "Was ist eine Kreditkarte und wie funktioniert sie",
          "Unterschied zwischen Kreditkarten und Debitkarten",
          "Grundlegende Kreditkartenterminologie",
          "Arten von Kreditkarten verfügbar",
          "Vor- und Nachteile der Kreditkartennutzung",
        ],
      },
      interest: {
        title: "Zinsen und APR verstehen",
        overview:
          "Meistern Sie, wie Kreditkartenzinsen berechnet werden und wie Sie Zinskosten minimieren können.",
        keyPoints: [
          "Was ist APR und wie unterscheidet es sich von Zinssätzen",
          "Wie tägliche periodische Zinssätze funktionieren",
          "Schonfristenperioden und wie man sie nutzt",
          "Faktoren, die Ihre Zinssätze beeinflussen",
          "Strategien zur Vermeidung von Zinskosten",
        ],
      },
      payments: {
        title: "Zahlungsstrategien",
        overview:
          "Lernen Sie verschiedene Zahlungsstrategien und deren Auswirkungen auf Ihre finanzielle Gesundheit.",
        keyPoints: [
          "Mindestzahlungsanforderungen verstehen",
          "Vorteile der Zahlung des vollen Saldos",
          "Strategische Teilzahlungen",
          "Timing von Zahlungen für optimale Auswirkungen",
          "Automatisierung von Zahlungen für Konsistenz",
        ],
      },
    },
    tips: {
      categories: {
        payment_strategy: "Zahlungsstrategie",
        credit_utilization: "Kreditnutzung",
        rewards_optimization: "Belohnungsoptimierung",
        fee_avoidance: "Gebührenvermeidung",
        credit_building: "Kreditaufbau",
      },
      impactLevels: {
        high: "Hohe Auswirkung",
        medium: "Mittlere Auswirkung",
        low: "Niedrige Auswirkung",
      },
    },
    noProfile: {
      title: "Kein Profil gefunden",
      description:
        "Erstellen Sie Ihr Profil, um mit dem Kreditkarten-Simulator zu beginnen",
      createButton: "Profil erstellen",
    },
  },

  // Admin Components
  admin: {
    dashboard: {
      title: "SJ-CCMS Admin-Dashboard",
      subtitle: "Vollständige Systemübersicht und Benutzerverwaltung",
      errorLoading: "Fehler beim Laden des Dashboards",
      tabs: {
        overview: "Übersicht",
        users: "Benutzer",
        creditCards: "Kreditkarten",
        transactions: "Transaktionen",
      },
      stats: {
        totalUsers: "Gesamtbenutzer",
        recentlyCreated: "Kürzlich erstellt",
        totalCards: "Gesamtkarten",
        creditCards: "Kreditkarten",
        activeCards: "Aktive Karten im System",
        transactions: "Transaktionen",
        totalTransactions: "Gesamttransaktionen",
        totalValue: "Gesamtwert",
      },
      sections: {
        recentActivity: "Letzte Aktivität",
        userManagement: "Benutzerverwaltung",
        creditCardManagement: "Kreditkartenverwaltung",
        creditScore: "Kredit-Score",
      },
      userManagement: {
        title: "Benutzerverwaltung",
        viewDetails: "Details anzeigen",
        editUser: "Benutzer bearbeiten",
        deleteUser: "Benutzer löschen",
        userDetails: {
          title: "Benutzerdetails",
          personalInfo: "Persönliche Informationen",
          accountInfo: "Kontoinformationen",
          creditCards: "Kreditkarten",
          role: "Rolle",
          createdAt: "Erstellt am",
          memberSince: "Mitglied seit",
          creditScore: "Kreditwürdigkeit",
          lastLogin: "Letzter Login",
        },
      },
      creditCardManagement: {
        title: "Kreditkartenverwaltung",
        editCard: "Karte bearbeiten",
        cardDetails: "Kartendetails",
        updateCard: "Karte aktualisieren",
        cardSummary: "Kartenzusammenfassung",
      },
      transactionMonitoring: {
        title: "Transaktionsüberwachung",
        recentTransactions: "Letzte Transaktionen",
        noTransactions: "Keine Transaktionen gefunden",
      },
    },
  },

  // Billing and Statements
  billing: {
    cycle: {
      title: "Abrechnungszyklen",
      currentCycle: "Aktueller Zyklus",
      nextStatement: "Nächste Abrechnung",
      cycleLength: "Zykluslänge",
      gracePerod: "Schonfrist",
    },
    statement: {
      title: "Abrechnungsnachweis",
      generate: "Abrechnung erstellen",
      download: "Herunterladen",
      period: "Abrechnungszeitraum",
      summary: "Zusammenfassung",
    },
  },

  // Visualizations
  visualizations: {
    interestGrowth: {
      title: "Zinswachstums-Diagramme",
      description:
        "Visualisieren Sie, wie sich Zinsen im Laufe der Zeit akkumulieren",
      minimumPayment: "Mindestzahlung",
      customPayment: "Benutzerdefinierte Zahlung",
      remainingBalance: "Verbleibendes Guthaben",
      monthlyInterest: "Monatliche Zinsen",
      cumulativeInterest: "Kumulierte Zinsen",
      monthlyPrincipal: "Monatliche Tilgung",
    },
    paymentImpact: {
      title: "Zahlungsauswirkung-Visualizer",
      description:
        "Sehen Sie, wie verschiedene Zahlungsbeträge Ihre Schuldenrückzahlung dramatisch beeinflussen",
      calculating: "Berechne Zahlungsauswirkung...",
      controls: {
        customPayment: "Benutzerdefinierte Zahlung ($)",
        viewType: "Ansichtstyp",
        balanceOverTime: "Saldo über Zeit",
        interestSavings: "Zinsersparnisse",
      },
      scenarios: {
        minimumPayment: "Mindestzahlung",
        doublePayment: "Doppelte Zahlung",
        triplePayment: "Dreifache Zahlung",
      },
      savings: {
        interestSavings: "Zinsersparnisse",
        timeSavings: "Zeitersparnis",
        totalSavings: "Gesamtersparnisse",
      },
      charts: {
        balanceOverTime: "Saldo über Zeit",
        interestSavings: "Zinsersparnisse im Vergleich zur Mindestzahlung",
        savingsVsMinimum: "Ersparnisse vs. Mindestzahlung",
      },
    },
    feeAnalysis: {
      title: "Gebührenanalyse",
      description:
        "Analysieren Sie verschiedene Kreditkartengebühren und deren Auswirkungen",
      usageScenarios: {
        lightUsage: "Geringe Nutzung",
        moderateUsage: "Mittlere Nutzung",
        heavyUsage: "Starke Nutzung",
      },
      feeTypes: {
        annualFees: "Jahresgebühren",
        transactionFees: "Transaktionsgebühren",
        penaltyFees: "Strafgebühren",
        totalFees: "Gesamtgebühren",
        annualFee: "Jahresgebühr",
        overlimitFees: "Überziehungsgebühren",
        foreignTransactionFees: "Auslandstransaktionsgebühren",
        balanceTransferFees: "Saldoübertragungsgebühren",
        cashAdvanceFees: "Bargeldvorschussgebühren",
        latePaymentFees: "Verzugsgebühren",
        returnedPaymentFees: "Rückgabegebühren",
      },
    },
  },

  // Learning Scenarios
  scenarios: {
    title: "Lernszenarien",
    description:
      "Erkunden Sie verschiedene Finanzszenarien und ihre Auswirkungen",
  },

  // Error Messages
  errors: {
    generic: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
    network: "Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.",
    notFound: "Die angeforderte Ressource wurde nicht gefunden.",
    unauthorized: "Sie sind nicht berechtigt, diese Aktion auszuführen.",
    validation: "Bitte überprüfen Sie Ihre Eingaben.",
    server: "Serverfehler. Bitte versuchen Sie es später erneut.",
  },

  // Success Messages
  success: {
    saved: "Erfolgreich gespeichert",
    updated: "Erfolgreich aktualisiert",
    deleted: "Erfolgreich gelöscht",
    created: "Erfolgreich erstellt",
    loggedOut: "Erfolgreich abgemeldet",
  },

  // Logout Page
  logout: {
    title: "Abmelden",
    message: "Sie wurden erfolgreich abgemeldet.",
    subtitle: "Vielen Dank für die Nutzung des SJ-CCMS!",
    description:
      "Ihre Sitzung wurde sicher beendet. Sie können sich jederzeit wieder anmelden, um auf Ihr Konto zuzugreifen.",
    loggingOut: "Abmeldung läuft...",
    loggingOutMessage: "Bitte warten Sie, während wir Sie sicher abmelden.",
    confirmTitle: "Abmelden",
    confirmMessage: "Sind Sie sicher, dass Sie sich abmelden möchten?",
    currentlySignedIn: "Derzeit angemeldet als:",
    actions: {
      loginAgain: "Erneut anmelden",
      backToHome: "Zurück zur Startseite",
      confirmLogout: "🚪 Ja, abmelden",
      switchAccount: "🔄 Konto wechseln",
      cancel: "← Abbrechen",
    },
    securityNote:
      "Aus Sicherheitsgründen wurden alle aktiven Sitzungen beendet.",
    sessionClearWarning:
      "Ihre Sitzungsdaten werden beim Abmelden gelöscht.\nStellen Sie sicher, dass Sie wichtige Arbeiten vor dem Fortfahren speichern.",
  },

  // Visualization Components
  visualization: {
    paymentImpact: {
      title: "Visualisierung der Zahlungsauswirkungen",
      viewTypes: {
        balance: "Saldoreduktion",
        interest: "Zinsakkumulation",
        comparison: "Nebeneinander-Vergleich",
        savings: "Zinsersparnisse",
      },
      labels: {
        viewType: "Ansichtstyp:",
        monthlyPayment: "Monatliche Zahlung:",
        payoffTime: "Rückzahlungszeit:",
        totalInterest: "Gesamtzinsen:",
        totalCost: "Gesamtkosten:",
        savingsVsMinimum: "Ersparnisse vs. Minimum:",
      },
      charts: {
        totalInterestComparison: "Vergleich der Gesamtzinsen",
        payoffTimeComparison: "Vergleich der Rückzahlungszeit",
      },
      summary: {
        title: "Zusammenfassung der Zahlungsauswirkungen",
        keyInsights: "Wichtige Zahlungserkenntnisse",
      },
    },
    interestGrowth: {
      title: "Zinswachstumsanalyse",
      loading: "Zinsszenarien werden berechnet...",
      chartTypes: {
        balance: "Saldo über Zeit",
        interest: "Zinsanalyse",
        comparison: "Zahlungsvergleich",
      },
      scenarios: {
        minimum: "Mindestzahlung",
        custom: "Benutzerdefinierte Zahlung",
      },
      labels: {
        chartType: "Diagrammtyp:",
        scenario: "Szenario:",
        monthlyPayment: "Monatliche Zahlung:",
        payoffTime: "Rückzahlungszeit:",
        totalInterest: "Gesamtzinsen:",
        totalCost: "Gesamtkosten:",
      },
      charts: {
        totalInterestComparison: "Vergleich der Gesamtzinsen",
        payoffTimeComparison: "Vergleich der Rückzahlungszeit",
      },
      summary: {
        title: "Zusammenfassung der Zahlungsszenarien",
        keyInsights: "Wichtige Erkenntnisse",
      },
    },
    feeAnalysis: {
      title: "Gebührenanalyse-Dashboard",
      labels: {
        usageScenario: "Nutzungsszenario:",
        timeframe: "Zeitrahmen:",
      },
      charts: {
        feeDistribution: "Gebührenverteilung",
        detailedBreakdown: "Detaillierte Aufschlüsselung",
        usageScenarioComparison: "Vergleich der Nutzungsszenarien",
        feeAnalysisInsights: "Gebührenanalyse-Erkenntnisse",
        customizeFeeStructure: "Gebührenstruktur anpassen",
      },
    },
  },

  // Transaction Lists
  transactionsList: {
    title: "Transaktionsverlauf",
    searchPlaceholder: "Transaktionen suchen...",
    filters: {
      allTypes: "Alle Typen",
      cashAdvance: "Bargeldvorschuss",
      allCategories: "Alle Kategorien",
      groceries: "Lebensmittel",
      gasoline: "Benzin",
      utilities: "Versorgungsunternehmen",
      entertainment: "Unterhaltung",
    },
  },

  // Statement Generator
  statementGenerator: {
    placeholders: {
      merchantName: "z.B. AMAZON.COM EINKAUF",
    },
  },

  // Fee Structure Simulator
  feeStructureSimulator: {
    placeholders: {
      amount: "Betrag",
      description: "Beschreibung",
    },
  },

  // Test Component
  test: {
    loadingMessage: "Wenn Sie dies sehen, lädt React korrekt.",
    consoleMessage: "Überprüfen Sie die Browser-Konsole auf Debug-Logs.",
  },

  // Budget Planning & Goals
  budget: {
    title: "Budget-Planer & Ziele",
    subtitle:
      "Planen Sie Ihre Ausgaben, setzen Sie finanzielle Ziele und verfolgen Sie den Fortschritt",
    monthlyBudget: "Monatsbudget",
    setBudgetLimits: "Ausgabenlimits für jede Kategorie festlegen",
    editBudget: "Budget bearbeiten",
    budgetSaved: "Budget erfolgreich gespeichert",
    goalsSaved: "Ziele erfolgreich gespeichert",
    totalBudget: "Gesamtbudget",
    totalSpent: "Gesamt ausgegeben",
    remaining: "Verbleibend",
    budgetCategories: "Budget-Kategorien",
    addCategory: "Kategorie hinzufügen",
    used: "verwendet",
    spendingGoals: "Ausgabenziele",
    setFinancialGoals: "Setzen und verfolgen Sie Ihre finanziellen Ziele",
    addGoal: "Ziel hinzufügen",
    saveGoals: "Ziele speichern",
    targetAmount: "Zielbetrag",
    currentAmount: "Aktueller Betrag",
    deadline: "Frist",
    category: "Kategorie",
    progress: "Fortschritt",
    smartAlerts: "Intelligente Benachrichtigungen",
    budgetNotifications: "Benachrichtigung bei Annäherung an Budget-Limits",
    currentAlerts: "Aktuelle Benachrichtigungen",
    budgetWarning: "Budget ist zu über 80% ausgeschöpft",
    goalDeadlineApproaching: "Frist nähert sich",
    noActiveAlerts: "Derzeit keine aktiven Benachrichtigungen",
    tabs: {
      budget: "Budget",
      goals: "Ziele",
      alerts: "Benachrichtigungen",
    },
  },

  // Hardcoded Component Strings
  components: {
    // Admin Dashboard
    adminDashboard: {
      loadingMessage: "Admin-Dashboard wird geladen...",
      retry: "Wiederholen",
      user: "Benutzer",
      cards: "Karten",
      actions: "Aktionen",
      view: "Anzeigen",
      delete: "Löschen",
      cardholder: "Karteninhaber",
      limit: "Limit",
      balance: "Saldo",
      available: "Verfügbar",
      issued: "Ausgegeben",
      recentTransactions: "Letzte Transaktionen",
      refresh: "Aktualisieren",
      date: "Datum",
      card: "Karte",
      userDetails: "Benutzerdetails",
      personalInformation: "Persönliche Informationen",
      name: "Name",
      creditLimit: "Kreditlimit",
      currentBalance: "Aktueller Saldo",
      editCreditCard: "Kreditkarte bearbeiten",
      cancel: "Abbrechen",
      updateCard: "Karte aktualisieren",
      cardStatuses: {
        active: "Aktiv",
        inactive: "Inaktiv",
        suspended: "Gesperrt",
        closed: "Geschlossen",
      },
    },

    // Navigation
    navigation: {
      mobileBrandShort: "💳 SJ",
      openNavigationMenu: "Navigationsmenü öffnen",
    },

    // Visualization Components
    visualizations: {
      paymentImpact: {
        paymentPower: "🚀 Zahlungskraft",
        timeValue: "⏰ Zeitwert",
        compoundEffect: "📈 Zinseszinseffekt",
        strategyTip: "💡 Strategietipp",
        paymentPowerDesc:
          "Jeder zusätzliche Euro reduziert Ihre Gesamtzinskosten dramatisch.",
        timeValueDesc:
          "Je früher Sie Ihr Guthaben tilgen, desto mehr sparen Sie bei den Zinsen.",
        compoundEffectDesc:
          "Zinsen werden täglich kapitalisiert. Höhere Zahlungen durchbrechen diesen teuren Zyklus schneller.",
        strategyTipDesc:
          "Schon kleine Erhöhungen des Zahlungsbetrags können Ihnen Hunderte oder Tausende an Zinsen sparen.",
      },
      interestGrowth: {
        doubleMinimum: "2x Minimum",
        tripleMinimum: "3x Minimum",
        paymentImpact: "💡 Zahlungsauswirkung",
        interestCompounds: "📈 Zinsen akkumulieren",
        timeValue: "⏰ Zeitwert",
        paymentImpactDesc:
          "Kleine Erhöhungen des Zahlungsbetrags schaffen dramatische Einsparungen bei den Gesamtzinsen.",
        interestCompoundsDesc:
          "Kreditkartenzinsen werden täglich kapitalisiert und lassen kleine Salden exponentiell wachsen.",
        timeValueDesc:
          "Je länger Sie ein Guthaben halten, desto teurer wird es durch Zinseszinseffekt.",
      },
      feeAnalysis: {
        monthly: "Monatlich",
        annual: "Jährlich",
        annualFeeImpact: "💳 Jahresgebühr-Auswirkung",
        foreignTransactionFees: "🌍 Auslandstransaktionsgebühren",
        balanceTransferStrategy: "🔄 Saldoübertragungsstrategie",
        cashAdvanceCosts: "💰 Bargeldvorschuss-Kosten",
        penaltyFeeAvoidance: "⚠️ Strafgebühren-Vermeidung",
        totalCostAnalysis: "📊 Gesamtkostenanalyse",
        annualFee: "Jahresgebühr (€)",
        foreignTransactionFee: "Auslandstransaktionsgebühr (%)",
        balanceTransferFee: "Saldoübertragungsgebühr (%)",
        cashAdvanceFee: "Bargeldvorschussgebühr (%)",
        latePaymentFee: "Verzugsgebühr (€)",
        overlimitFee: "Überlimitgebühr (€)",
        annualFeeImpactDesc:
          "Jahresgebühren reduzieren Ihre effektive Belohnungsrate. Berechnen Sie, ob Belohnungen die Gebühren übersteigen.",
        foreignTransactionFeesDesc:
          "Vermeiden Sie Auslandstransaktionsgebühren auf Reisen, indem Sie die richtigen Karten verwenden.",
        balanceTransferStrategyDesc:
          "Saldoübertragungsgebühren können sich für erhebliche Zinseinsparungen lohnen.",
        cashAdvanceCostsDesc:
          "Bargeldvorschüsse sind teuer mit hohen Gebühren und sofortigen Zinsen.",
        penaltyFeeAvoidanceDesc:
          "Verspätungs- und Überlimitgebühren sind mit ordentlichen Zahlungsgewohnheiten völlig vermeidbar.",
        totalCostAnalysisDesc:
          "Berücksichtigen Sie alle Gebühren bei der Bewertung der wahren Kosten des Kreditkartenbesitzes.",
      },
    },

    // Transaction Components
    transactions: {
      transactionTypes: {
        purchase: "Kauf",
        payment: "Zahlung",
        refund: "Rückerstattung",
        fee: "Gebühr",
        interest: "Zinsen",
        credit: "Guthaben",
      },
      categories: {
        dining: "Restaurant",
        gas: "Benzin",
        groceries: "Lebensmittel",
        entertainment: "Unterhaltung",
        utilities: "Versorgungsunternehmen",
        shopping: "Einkaufen",
        travel: "Reisen",
        healthcare: "Gesundheitswesen",
        education: "Bildung",
        other: "Sonstiges",
      },
      messages: {
        failedToLoad: "Fehler beim Laden der Transaktionen",
        confirmCancel:
          "Sind Sie sicher, dass Sie diese Transaktion stornieren möchten?",
        cancelledSuccessfully: "Transaktion erfolgreich storniert",
        failedToCancel: "Fehler beim Stornieren der Transaktion",
      },
      search: "Suchen",
      type: "Typ",
      category: "Kategorie",
      cancel: "Stornieren",
      cancelled: "STORNIERT",
    },

    // Statement Generator
    statementGenerator: {
      title: "Kreditkartenabrechnung",
      addTransaction: "Transaktion hinzufügen",
      validationError: "Bitte geben Sie Beschreibung und Betrag ein",
      keyMetrics: "Wichtige Kennzahlen",
      creditUtilization: "Kreditnutzung",
      availableCredit: "Verfügbarer Kredit",
      interestThisPeriod: "Zinsen in diesem Zeitraum",
      feesThisPeriod: "Gebühren in diesem Zeitraum",
      spendingByCategory: "Ausgaben nach Kategorie",
      paymentImpact: "Zahlungsauswirkung",
      highCreditUtilization: "Hohe Kreditnutzung",
      editStatement: "Abrechnung bearbeiten",
      viewAnalysis: "Analyse anzeigen",
      viewStatement: "Abrechnung anzeigen",
      statementAnalysis: "Abrechnungsanalyse",
      creditCardStatement: "KREDITKARTENABRECHNUNG",
      accountHolder: "Kontoinhaber",
      accountNumber: "Kontonummer",
      creditLimit: "Kreditlimit",
      statementPeriod: "Abrechnungszeitraum",
      paymentDueDate: "Zahlungsfälligkeitsdatum",
      newBalance: "Neuer Saldo",
      minimumPaymentDue: "Mindestfällige Zahlung",
      accountSummary: "Kontozusammenfassung",
      previousBalance: "Vorheriger Saldo",
      paymentsCredits: "Zahlungen & Guthaben",
      purchasesAdvances: "Käufe & Vorschüsse",
      feesInterest: "Gebühren & Zinsen",
      creditInformation: "Kreditinformationen",
      annualPercentageRate: "Effektiver Jahreszins",
      transactionHistory: "Transaktionsverlauf",
      date: "Datum",
      description: "Beschreibung",
      category: "Kategorie",
      amount: "Betrag",
      currentTransactions: "Aktuelle Transaktionen",
      remove: "Entfernen",
      type: "Typ",
      recommendations: "Empfehlungen",
      interestCharges: "Zinsgebühren",
      feesCharged: "Berechnete Gebühren",
      importantPaymentInformation: "Wichtige Zahlungsinformationen",
      minimumPayment: "Mindestzahlung",
      latePaymentFee: "Verzugsgebühr",
      interestCalculation: "Zinsberechnung",
      placeholders: {
        merchantName: "z.B. AMAZON.COM EINKAUF",
      },
      messages: {
        highCreditUtilizationDesc:
          "Ihre Nutzung beträgt {{utilization}}%. Erwägen Sie, den Saldo auf unter 30% zu reduzieren, um Ihre Kreditwürdigkeit zu verbessern.",
        interestChargesDesc:
          "Sie haben {{amount}} an Zinsen bezahlt. Zahlen Sie Ihren vollständigen Saldo, um Zinsgebühren zu vermeiden.",
        feesChargedDesc:
          "Ihnen wurden {{amount}} an Gebühren berechnet. Überprüfen Sie die Gebührenrichtlinien, um zukünftige Gebühren zu vermeiden.",
        minimumPaymentDesc:
          "{{amount}} (oder {{percentage}}% des Saldos, je nachdem, welcher Betrag höher ist)",
        latePaymentFeeDesc:
          "Bis zu {{amount}}, wenn die Zahlung nach dem Fälligkeitsdatum eingeht",
        interestCalculationDesc:
          "Zinsen werden täglich auf Ihren durchschnittlichen Tagessaldo mit {{apr}}% effektivem Jahreszins berechnet",
        statementDescription:
          "Erstellen und analysieren Sie realistische Kreditkartenabrechnungen, um Abrechnungszyklen, Zinsberechnungen und Zahlungsstrategien zu verstehen.",
      },
    },

    // Scenario Learning
    scenarioLearning: {
      title: "🎯 Szenario-basiertes Lernen",
      description:
        "Üben Sie reale finanzielle Entscheidungsfindung durch interaktive Szenarien. Testen Sie Ihr Wissen und lernen Sie aus realistischen Situationen.",
      startScenario: "Szenario starten",
      learningObjectives: "Lernziele:",
      moreObjectives: "weitere Ziele...",
      howItWorks: {
        title: "So funktioniert Szenario-Lernen",
        step1: {
          title: "1. Situation verstehen",
          description:
            "Jedes Szenario präsentiert eine realistische finanzielle Situation mit spezifischen Herausforderungen.",
        },
        step2: {
          title: "2. Entscheidungen treffen",
          description:
            "Wählen Sie aus mehreren Optionen für jeden Entscheidungspunkt im Szenario.",
        },
        step3: {
          title: "3. Aus Ergebnissen lernen",
          description:
            "Erhalten Sie sofortiges Feedback und verstehen Sie die Konsequenzen Ihrer Entscheidungen.",
        },
      },
      difficulties: {
        beginner: "anfänger",
        intermediate: "fortgeschritten",
        advanced: "experte",
      },
      categories: {
        debt_management: "Schuldenverwaltung",
        credit_building: "Kreditaufbau",
        payment_strategy: "Zahlungsstrategie",
        fee_avoidance: "Gebührenvermeidung",
      },
      backToScenarios: "← Zurück zu Szenarien",
      progress: "Fortschritt",
      score: "Punktzahl",
      points: "Punkte",
      availableIncome: "Verfügbares Einkommen",
      yourPreviousDecisions: "Ihre bisherigen Entscheidungen",
      decisionAnalysis: "Entscheidungsanalyse",
      situation: "Situation",
      currentBalance: "Aktueller Saldo",
      apr: "Effektiver Jahreszins",
      creditScore: "Kredit-Score",
      monthlyIncome: "Monatliches Einkommen",
      monthlyExpenses: "Monatliche Ausgaben",
      decision: "Entscheidung",
      clickToSelect:
        "Klicken Sie, um diese Option auszuwählen und das Ergebnis zu sehen",
      yourChoice: "Ihre Wahl:",
      impact: "Auswirkung",
      scenarioComplete: "Szenario abgeschlossen!",
      pointsEarned: "Punkte erhalten:",
      tryAgain: "Nochmal versuchen",
      chooseNewScenario: "Neues Szenario wählen",
      positiveImpact: "positiv",
      negativeImpact: "negativ",
      neutralImpact: "neutral",
      scenarios: {
        emergencyDebt: {
          title: "Notfall-Schuldenverwaltung",
          description:
            "Bewältigen Sie einen unerwarteten finanziellen Notfall bei gleichzeitigem Management bestehender Kreditkartenschulden.",
          situation:
            "Sie haben einen Saldo von 3.500 $ auf Ihrer Kreditkarte (18% effektiver Jahreszins, 5.000 $ Limit) und leisten monatlich 150 $ Zahlungen. Ihr Auto benötigt plötzlich 1.200 $ für Reparaturen. Sie haben 300 $ Erspartes und verdienen 3.200 $/Monat bei 2.800 $ Ausgaben.",
          objectives: [
            "Die Notreparatur bewältigen, ohne Ihre Kreditwürdigkeit schwer zu beschädigen",
            "Langfristige Zinskosten minimieren",
            "Einen nachhaltigen Zahlungsplan beibehalten",
          ],
          decisions: {
            emergencyFunding: {
              question:
                "Wie sollten Sie die 1.200 $ für die Autoreparatur finanzieren?",
              options: [
                {
                  text: "Kreditkarte verwenden (300 $ Erspartes + 900 $ auf Karte)",
                  explanation:
                    "Dies erhöht Ihre Auslastung auf 88% und fügt hochverzinsliche Schulden hinzu.",
                },
                {
                  text: "Erspartes + Privatkredit für verbleibenden Betrag verwenden",
                  explanation:
                    "Privatkredit hat wahrscheinlich niedrigere Zinsen als Kreditkarte.",
                },
                {
                  text: "Erspartes + Zahlungsplan mit Mechaniker aushandeln",
                  explanation:
                    "Beste Option - vermeidet neue Schulden und kann zinsfrei sein.",
                },
                {
                  text: "Zahltagdarlehen für schnelles Bargeld verwenden",
                  explanation:
                    "Zahltagdarlehen haben extrem hohe Zinssätze (400%+ effektiver Jahreszins).",
                },
              ],
            },
            paymentStrategy: {
              question:
                "Nach Bewältigung des Notfalls, wie sollten Sie Ihre Kreditkartenzahlungen anpassen?",
              options: [
                {
                  text: "Vorübergehend auf Mindestzahlungen reduzieren",
                  explanation:
                    "Wird die Zinskosten über die Zeit erheblich erhöhen.",
                },
                {
                  text: "150 $/Monat beibehalten, aber andere Ausgaben kürzen",
                  explanation:
                    "Gute Disziplin, aber möglicherweise schwer durchzuhalten.",
                },
                {
                  text: "Zahlungen auf 200 $/Monat durch Reduzierung des Unterhaltungsbudgets erhöhen",
                  explanation:
                    "Ausgezeichnet - tilgt Schulden schneller und spart Zinsen.",
                },
                {
                  text: "Schuldenlawinen-Methode für alle Schulden verwenden",
                  explanation:
                    "Mathematisch optimaler Ansatz für mehrere Schulden.",
                },
              ],
            },
            creditUtilization: {
              question:
                "Ihre Kreditauslastung ist jetzt hoch. Was sollte Ihre sofortige Priorität sein?",
              options: [
                {
                  text: "Kreditlimiterhöhung beantragen",
                  explanation:
                    "Kann bei Auslastung helfen, könnte aber zu mehr Ausgaben verleiten.",
                },
                {
                  text: "Saldo aggressiv abzahlen",
                  explanation:
                    "Beste langfristige Strategie für Kredit-Score und Finanzen.",
                },
                {
                  text: "Neue Kreditkarte für mehr verfügbares Guthaben eröffnen",
                  explanation:
                    "Harte Anfrage schadet Score und fügt Versuchung zum Ausgeben hinzu.",
                },
                {
                  text: "Sich darauf konzentrieren, alle Zahlungen pünktlich zu leisten",
                  explanation:
                    "Zahlungshistorie ist der wichtigste Faktor für Kredit-Score.",
                },
              ],
            },
          },
          outcomes: {
            excellent: {
              title: "Finanzkrise abgewendet!",
              description:
                "Sie haben den Notfall klug bewältigt, Schuldenwachstum minimiert und einen nachhaltigen Erholungsplan erstellt.",
            },
            good: {
              title: "Gut verwaltet",
              description:
                "Sie haben größtenteils gute Entscheidungen getroffen mit kleinen Verbesserungsmöglichkeiten im Schuldenmanagement.",
            },
            poor: {
              title: "Lernerfahrung",
              description:
                "Diese Situation hat Bereiche aufgezeigt, in denen andere Entscheidungen zu besseren finanziellen Ergebnissen führen könnten.",
            },
          },
        },
        creditBuilding: {
          title: "Kreditaufbau von Grund auf",
          description:
            "Lernen Sie, wie Sie verantwortlich eine Kredithistorie mit Ihrer ersten Kreditkarte aufbauen.",
          situation:
            "Sie sind 22 Jahre alt und haben gerade Ihre erste Kreditkarte mit 1.000 $ Limit und 24% effektivem Jahreszins erhalten. Sie haben ein stabiles Einkommen von 2.500 $/Monat und möchten exzellente Kreditwürdigkeit für zukünftige Ziele wie Autokauf oder Eigenheim aufbauen.",
          objectives: [
            "Positive Zahlungshistorie etablieren",
            "Auslastung niedrig für optimalen Kredit-Score halten",
            "Kredit verantwortlich aufbauen ohne Schuldenanhäufung",
          ],
          decisions: {
            spendingStrategy: {
              question:
                "Wie viel sollten Sie monatlich auf Ihrer Kreditkarte ausgeben?",
              options: [
                {
                  text: "Für alles verwenden, um schnell Kredit aufzubauen (800-900 $/Monat)",
                  explanation:
                    "Hohe Auslastung (80-90%) schadet Ihrem Kredit-Score erheblich.",
                },
                {
                  text: "Nur für kleine Einkäufe verwenden (50-100 $/Monat)",
                  explanation:
                    "Perfekt! 5-10% Auslastung ist ideal für Kreditaufbau.",
                },
                {
                  text: "Bis zum Limit ausschöpfen und Mindestzahlungen leisten",
                  explanation:
                    "Schlechteste Strategie - schadet Kredit-Score und erzeugt teure Schulden.",
                },
                {
                  text: "Nur für Notfälle verwenden",
                  explanation: "Sicher, aber minimale Kreditaufbau-Aktivität.",
                },
              ],
            },
            paymentTiming: {
              question: "Wann sollten Sie Ihre Kreditkartenrechnung bezahlen?",
              options: [
                {
                  text: "Den vollen Saldo jeden Monat vor dem Fälligkeitsdatum zahlen",
                  explanation:
                    "Ausgezeichnet! Vermeidet Zinsen und baut perfekte Zahlungshistorie auf.",
                },
                {
                  text: "Mindestbetrag zahlen, um kleinen Saldo für Kreditaufbau zu behalten",
                  explanation:
                    "Mythos! Saldo zu tragen hilft nicht beim Kredit und kostet Zinsen.",
                },
                {
                  text: "Vor Abrechnungsdatum zahlen, um 0 $ Saldo zu zeigen",
                  explanation:
                    "Gut für Auslastung, aber zeigt möglicherweise keine Kontoaktivität.",
                },
                {
                  text: "Einige Tage nach Fälligkeitsdatum zahlen",
                  explanation:
                    "Verspätete Zahlungen schaden Kredit-Scores erheblich.",
                },
              ],
            },
            creditGrowth: {
              question:
                "Nach 6 Monaten verantwortlicher Nutzung, was sollten Sie als nächstes tun?",
              options: [
                {
                  text: "Kreditlimiterhöhung für aktuelle Karte beantragen",
                  explanation:
                    "Gute Strategie zur Senkung der Auslastungsrate.",
                },
                {
                  text: "Mehrere neue Karten beantragen, um verfügbares Guthaben zu erhöhen",
                  explanation:
                    "Mehrere Anfragen in kurzer Zeit können Ihrem Score schaden.",
                },
                {
                  text: "Aktuelle Strategie fortsetzen und Nutzung schrittweise erhöhen",
                  explanation:
                    "Stetiger Ansatz - Geduld baut starken Kredit auf.",
                },
                {
                  text: "Eine zusätzliche Karte mit besseren Belohnungen beantragen",
                  explanation:
                    "Vernünftig, wenn Sie niedrige Auslastung bei beiden Karten beibehalten.",
                },
              ],
            },
          },
          outcomes: {
            excellent: {
              title: "Kreditaufbau-Champion!",
              description:
                "Sie haben exzellente Gewohnheiten entwickelt, die Ihnen während Ihrer gesamten finanziellen Reise dienen werden.",
            },
            good: {
              title: "Starkes Fundament",
              description:
                "Sie sind auf dem richtigen Weg mit kleineren Anpassungen für Optimierung.",
            },
            poor: {
              title: "Kurskorrektur erforderlich",
              description:
                "Diese Erkenntnisse helfen Ihnen, häufige Kreditaufbau-Fehler zu vermeiden.",
            },
          },
        },
        balanceTransfer: {
          title: "Strategische Saldoübertragung",
          description:
            "Optimieren Sie Ihre Schuldenrückzahlungsstrategie mit Saldoübertragungsoptionen.",
          situation:
            "Sie haben 8.000 $ Kreditkartenschulden auf 3 Karten mit verschiedenen effektiven Jahreszinsen (Karte A: 3.000 $ bei 22%, Karte B: 3.500 $ bei 19%, Karte C: 1.500 $ bei 25%). Sie erhalten ein Saldoübertragungsangebot: 0% effektiver Jahreszins für 15 Monate, 3% Übertragungsgebühr, dann 16,99% effektiver Jahreszins.",
          objectives: [
            "Gesamte gezahlte Zinsen minimieren",
            "Nachhaltigen Rückzahlungsplan erstellen",
            "Rückfall in Schulden vermeiden",
          ],
          decisions: {
            transferDecision: {
              question:
                "Welche Salden sollten Sie auf die 0%-Karte übertragen?",
              options: [
                {
                  text: "Alle 8.000 $ übertragen, um 0%-Periode zu maximieren",
                  explanation:
                    "Gute Strategie, wenn Sie es innerhalb von 15 Monaten zurückzahlen können.",
                },
                {
                  text: "Nur die höchste effektive Jahreszins-Schuld übertragen (Karte C: 1.500 $ bei 25%)",
                  explanation:
                    "Konservativ, aber maximiert möglicherweise nicht den Nutzen.",
                },
                {
                  text: "Die zwei höchsten Salden übertragen (Karten A & B: 6.500 $)",
                  explanation:
                    "Exzellente Balance aus Nutzen und handhabbarem Zahlungsplan.",
                },
                {
                  text: "Nicht übertragen - die 3% Gebühr ist es nicht wert",
                  explanation:
                    "Verpasst eine bedeutende Gelegenheit, Zinsen zu sparen.",
                },
              ],
            },
            payoffStrategy: {
              question:
                "Welche monatliche Zahlung sollten Sie für den übertragenen Saldo anpeilen?",
              options: [
                {
                  text: "400 $/Monat (wird in ~16 Monaten abgezahlt)",
                  explanation:
                    "Riskant - Sie werden knapp vor Ende der Aktionslaufzeit fertig.",
                },
                {
                  text: "500 $/Monat (wird in ~13 Monaten abgezahlt)",
                  explanation:
                    "Guter Puffer - fertig bevor Aktionslaufzeit abläuft.",
                },
                {
                  text: "600 $/Monat (wird in ~11 Monaten abgezahlt)",
                  explanation:
                    "Ausgezeichnet - maximaler Nutzen mit komfortabler Marge.",
                },
                {
                  text: "Mindestzahlungen, um es zu strecken",
                  explanation: "Macht den Zweck der 0%-Aktion zunichte.",
                },
              ],
            },
            remainingCards: {
              question:
                "Wie sollten Sie mit den Karten umgehen, die Sie nicht übertragen haben?",
              options: [
                {
                  text: "Schließen, um Versuchung zu entfernen",
                  explanation:
                    "Kartenschließung reduziert verfügbares Guthaben und schadet Kredit-Score.",
                },
                {
                  text: "Offen lassen, aber physische Karten zerschneiden",
                  explanation:
                    "Klug! Erhält Kredithistorie bei gleichzeitiger Entfernung der Versuchung.",
                },
                {
                  text: "Für kleine Einkäufe verwenden, um sie aktiv zu halten",
                  explanation: "Gut, wenn Sie sie sofort abzahlen können.",
                },
                {
                  text: "Alle Zahlungen auf Übertragungskarte konzentrieren und Mindestbeträge bei anderen",
                  explanation: "Macht während der Aktionsperiode Sinn.",
                },
              ],
            },
          },
          outcomes: {
            excellent: {
              title: "Übertragungsmeister!",
              description:
                "Sie haben den Nutzen der Saldoübertragung maximiert und häufige Fallstricke vermieden.",
            },
            good: {
              title: "Strategisches Denken",
              description:
                "Gute Nutzung der Übertragungsoption mit Raum für kleinere Optimierung.",
            },
            poor: {
              title: "Verpasste Gelegenheit",
              description:
                "Diese Strategien besser zu verstehen wird bei zukünftigem Schuldenmanagement helfen.",
            },
          },
        },
      },
    },

    // Credit Card Details
    creditCardDetails: {
      changePIN: "PIN ändern",
      confirmPIN: "PIN bestätigen",
      changingPIN: "PIN wird geändert...",
      currentLimitNoLimit: "Aktuelles Limit: Kein Limit gesetzt",
      placeholders: {
        pinDefault: "0000",
        spendingLimit: "1000,00",
      },
    },

    // Financial Health Calculator
    financialHealthCalculator: {
      placeholders: {
        creditLimit: "5000",
        balance: "10000",
        cardsCount: "2",
        interestRate: "22,0",
        creditScore: "700",
        monthlyIncome: "5000",
        monthlyExpenses: "3500",
        monthlyDebtPayments: "500",
      },
    },

    // Fee Analysis Dashboard
    feeAnalysisDashboard: {
      chartLabels: {
        annualFees: "Jahresgebühren",
        transactionFees: "Transaktionsgebühren",
        penaltyFees: "Strafgebühren",
        totalFees: "Gesamtgebühren",
      },
    },

    // Profile Components
    profileForm: {
      editProfile: "Profil bearbeiten",
      createProfile: "Profil erstellen",
      updateProfile: "Profil aktualisieren",
    },

    // Credit Card Profile Builder
    creditCardProfileBuilder: {
      benefits: {
        fraudProtection: "Betrugsschutz",
        priceProtection: "Preisschutz",
        extendedWarranty: "Erweiterte Garantie",
        purchaseProtection: "Kaufschutz",
        travelInsurance: "Reiseversicherung",
        roadsideAssistance: "Pannenhilfe",
        conciergeService: "Concierge-Service",
        baggageInsurance: "Gepäckversicherung",
      },
      categories: {
        gasStations: "Tankstellen",
        onlineShopping: "Online-Shopping",
        departmentStores: "Kaufhäuser",
        streamingServices: "Streaming-Dienste",
      },
    },

    // Budget Planner
    budgetPlanner: {
      newCategory: "Neue Kategorie",
      newGoal: "Neues Ziel",
    },

    // Payment Impact Visualizer
    paymentImpactVisualizer: {
      minimumPayment: "Mindestbetrag",
    },
  },
};
