import React, { useEffect, useState } from "react";
import { useI18n } from "../../contexts/I18nContext";

interface CreditCardProfile {
  id: string;
  name: string;
  issuer: string;
  category:
    | "rewards"
    | "cashback"
    | "travel"
    | "business"
    | "student"
    | "secured";

  // Financial Terms
  apr: {
    purchase: number;
    balanceTransfer: number;
    cashAdvance: number;
  };
  creditLimit: number;

  // Fees
  annualFee: number;
  foreignTransactionFee: number;
  balanceTransferFee: number;
  cashAdvanceFee: number;
  lateFee: number;
  overlimitFee: number;

  // Rewards
  rewardsProgram: {
    type: "cashback" | "points" | "miles" | "none";
    baseRate: number; // percentage or points per dollar
    bonusCategories: Array<{
      category: string;
      rate: number;
      limit?: number; // quarterly/annual limit
    }>;
    signupBonus?: {
      amount: number;
      requirement: number; // spending requirement
      timeframe: number; // months
    };
  };

  // Features
  features: string[];
  introOffers: Array<{
    type: "apr" | "balance_transfer" | "cashback";
    rate: number;
    duration: number; // months
    description: string;
  }>;

  // Target Market
  creditScoreRequirement: number;
  targetAudience: string[];
}

const CreditCardProfileBuilder: React.FC = () => {
  const { t } = useI18n();
  const [profiles, setProfiles] = useState<CreditCardProfile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<CreditCardProfile>({
    id: "",
    name: "",
    issuer: "",
    category: "cashback",
    apr: {
      purchase: 18.99,
      balanceTransfer: 18.99,
      cashAdvance: 25.99,
    },
    creditLimit: 5000,
    annualFee: 0,
    foreignTransactionFee: 0,
    balanceTransferFee: 3,
    cashAdvanceFee: 5,
    lateFee: 39,
    overlimitFee: 25,
    rewardsProgram: {
      type: "cashback",
      baseRate: 1,
      bonusCategories: [],
    },
    features: [],
    introOffers: [],
    creditScoreRequirement: 700,
    targetAudience: [],
  });

  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "basic" | "financial" | "rewards" | "features"
  >("basic");
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>(
    []
  );

  // Load profiles from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem("creditCardProfiles");
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    }
  }, []);

  // Save profiles to localStorage
  useEffect(() => {
    localStorage.setItem("creditCardProfiles", JSON.stringify(profiles));
  }, [profiles]);

  const cardCategories = [
    {
      value: "cashback",
      label: t.creditCard.builder.categories.cashback,
      icon: "💰",
    },
    {
      value: "rewards",
      label: t.creditCard.builder.categories.rewards,
      icon: "🎁",
    },
    {
      value: "travel",
      label: t.creditCard.builder.categories.travel,
      icon: "✈️",
    },
    {
      value: "business",
      label: t.creditCard.builder.categories.business,
      icon: "🏢",
    },
    {
      value: "student",
      label: t.creditCard.builder.categories.student,
      icon: "🎓",
    },
    {
      value: "secured",
      label: t.creditCard.builder.categories.secured,
      icon: "🔒",
    },
  ];

  const commonFeatures = [
    {
      value: "No Foreign Transaction Fees",
      label:
        t.creditCard.builder.features.featureOptions.noForeignTransactionFees,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.fraudProtection,
      label: t.creditCard.builder.features.featureOptions.fraudProtection,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.priceProtection,
      label: t.creditCard.builder.features.featureOptions.priceProtection,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.extendedWarranty,
      label: t.creditCard.builder.features.featureOptions.extendedWarranty,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.purchaseProtection,
      label: t.creditCard.builder.features.featureOptions.purchaseProtection,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.travelInsurance,
      label: t.creditCard.builder.features.featureOptions.travelInsurance,
    },
    {
      value: "Rental Car Insurance",
      label: t.creditCard.builder.features.featureOptions.rentalCarInsurance,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.roadsideAssistance,
      label: t.creditCard.builder.features.featureOptions.roadsideAssistance,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.conciergeService,
      label: t.creditCard.builder.features.featureOptions.conciergeService,
    },
    {
      value: "Airport Lounge Access",
      label: t.creditCard.builder.features.featureOptions.airportLoungeAccess,
    },
    {
      value: "TSA PreCheck/Global Entry Credit",
      label: t.creditCard.builder.features.featureOptions.tsaPreCheckCredit,
    },
    {
      value: "Cell Phone Protection",
      label: t.creditCard.builder.features.featureOptions.cellPhoneProtection,
    },
    {
      value: t.components.creditCardProfileBuilder.benefits.baggageInsurance,
      label: t.creditCard.builder.features.featureOptions.baggageInsurance,
    },
    {
      value: "Trip Cancellation Insurance",
      label:
        t.creditCard.builder.features.featureOptions.tripCancellationInsurance,
    },
  ];

  const bonusCategories = [
    {
      value: t.components.creditCardProfileBuilder.categories.gasStations,
      label: t.creditCard.builder.rewards.bonusCategoryOptions.gasStations,
    },
    {
      value: "Groceries",
      label: t.creditCard.builder.rewards.bonusCategoryOptions.groceries,
    },
    {
      value: "Restaurants",
      label: t.creditCard.builder.rewards.bonusCategoryOptions.restaurants,
    },
    {
      value: "Travel",
      label: t.creditCard.builder.rewards.bonusCategoryOptions.travel,
    },
    {
      value: t.components.creditCardProfileBuilder.categories.onlineShopping,
      label: t.creditCard.builder.rewards.bonusCategoryOptions.onlineShopping,
    },
    {
      value: t.components.creditCardProfileBuilder.categories.departmentStores,
      label: t.creditCard.builder.rewards.bonusCategoryOptions.departmentStores,
    },
    {
      value: t.components.creditCardProfileBuilder.categories.streamingServices,
      label:
        t.creditCard.builder.rewards.bonusCategoryOptions.streamingServices,
    },
    {
      value: "Phone/Internet Bills",
      label:
        t.creditCard.builder.rewards.bonusCategoryOptions.phoneInternetBills,
    },
    {
      value: "Pharmacies",
      label: t.creditCard.builder.rewards.bonusCategoryOptions.pharmacies,
    },
    {
      value: "Transit",
      label: t.creditCard.builder.rewards.bonusCategoryOptions.transit,
    },
    {
      value: "Home Improvement",
      label: t.creditCard.builder.rewards.bonusCategoryOptions.homeImprovement,
    },
    {
      value: "Office Supplies",
      label: t.creditCard.builder.rewards.bonusCategoryOptions.officeSupplies,
    },
  ];

  const saveProfile = () => {
    if (!currentProfile.name || !currentProfile.issuer) {
      alert(t.creditCard.builder.requiredFields);
      return;
    }

    const profileToSave = {
      ...currentProfile,
      id: editingProfile || Date.now().toString(),
    };

    if (editingProfile) {
      setProfiles((prev) =>
        prev.map((p) => (p.id === editingProfile ? profileToSave : p))
      );
    } else {
      setProfiles((prev) => [...prev, profileToSave]);
    }

    resetForm();
  };

  const resetForm = () => {
    setCurrentProfile({
      id: "",
      name: "",
      issuer: "",
      category: "cashback",
      apr: { purchase: 18.99, balanceTransfer: 18.99, cashAdvance: 25.99 },
      creditLimit: 5000,
      annualFee: 0,
      foreignTransactionFee: 0,
      balanceTransferFee: 3,
      cashAdvanceFee: 5,
      lateFee: 39,
      overlimitFee: 25,
      rewardsProgram: { type: "cashback", baseRate: 1, bonusCategories: [] },
      features: [],
      introOffers: [],
      creditScoreRequirement: 700,
      targetAudience: [],
    });
    setEditingProfile(null);
    setActiveTab("basic");
  };

  const editProfile = (profile: CreditCardProfile) => {
    setCurrentProfile(profile);
    setEditingProfile(profile.id);
  };

  const deleteProfile = (id: string) => {
    if (confirm(t.creditCard.builder.deleteConfirmation)) {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const addBonusCategory = () => {
    setCurrentProfile((prev) => ({
      ...prev,
      rewardsProgram: {
        ...prev.rewardsProgram,
        bonusCategories: [
          ...prev.rewardsProgram.bonusCategories,
          { category: "", rate: 2 },
        ],
      },
    }));
  };

  const updateBonusCategory = (index: number, field: string, value: any) => {
    setCurrentProfile((prev) => ({
      ...prev,
      rewardsProgram: {
        ...prev.rewardsProgram,
        bonusCategories: prev.rewardsProgram.bonusCategories.map((cat, i) =>
          i === index ? { ...cat, [field]: value } : cat
        ),
      },
    }));
  };

  const removeBonusCategory = (index: number) => {
    setCurrentProfile((prev) => ({
      ...prev,
      rewardsProgram: {
        ...prev.rewardsProgram,
        bonusCategories: prev.rewardsProgram.bonusCategories.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const toggleFeature = (feature: string) => {
    setCurrentProfile((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const calculateValue = (
    profile: CreditCardProfile,
    annualSpending: number = 12000
  ) => {
    const spendingByCategory = {
      "Gas Stations": annualSpending * 0.1,
      Groceries: annualSpending * 0.2,
      Restaurants: annualSpending * 0.15,
      Travel: annualSpending * 0.1,
      Other: annualSpending * 0.45,
    };

    let totalRewards = 0;

    // Calculate bonus category rewards
    profile.rewardsProgram.bonusCategories.forEach((bonus) => {
      const categorySpending =
        spendingByCategory[bonus.category as keyof typeof spendingByCategory] ||
        0;
      const limitedSpending = bonus.limit
        ? Math.min(categorySpending, bonus.limit)
        : categorySpending;
      totalRewards += limitedSpending * (bonus.rate / 100);
    });

    // Calculate base rate rewards on remaining spending
    const bonusCategorySpending = profile.rewardsProgram.bonusCategories.reduce(
      (sum, bonus) => {
        const categorySpending =
          spendingByCategory[
            bonus.category as keyof typeof spendingByCategory
          ] || 0;
        return (
          sum +
          (bonus.limit
            ? Math.min(categorySpending, bonus.limit)
            : categorySpending)
        );
      },
      0
    );

    const baseSpending = annualSpending - bonusCategorySpending;
    totalRewards += baseSpending * (profile.rewardsProgram.baseRate / 100);

    // Subtract annual fee
    const netValue = totalRewards - profile.annualFee;

    return { totalRewards, netValue };
  };

  const toggleComparison = (profileId: string) => {
    setSelectedForComparison((prev) =>
      prev.includes(profileId)
        ? prev.filter((id) => id !== profileId)
        : prev.length < 3
        ? [...prev, profileId]
        : prev
    );
  };

  if (compareMode) {
    const comparisonProfiles = profiles.filter((p) =>
      selectedForComparison.includes(p.id)
    );

    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {t.creditCard.builder.comparison.title}
          </h1>
          <button
            onClick={() => setCompareMode(false)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            {t.creditCard.builder.backToBuilder}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisonProfiles.map((profile) => {
            const value = calculateValue(profile);
            return (
              <div
                key={profile.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <p className="text-gray-600">{profile.issuer}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
                    {
                      cardCategories.find((c) => c.value === profile.category)
                        ?.label
                    }
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">
                      {t.creditCard.builder.comparison.annualValue}
                    </h4>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(value.netValue)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t.creditCard.builder.comparison.rewards}:{" "}
                      {formatCurrency(value.totalRewards)} -{" "}
                      {t.creditCard.builder.comparison.fee}:{" "}
                      {formatCurrency(profile.annualFee)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      {t.creditCard.builder.comparison.apr}
                    </h4>
                    <div className="text-lg">{profile.apr.purchase}%</div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      {t.creditCard.builder.comparison.creditLimit}
                    </h4>
                    <div className="text-lg">
                      {formatCurrency(profile.creditLimit)}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      {t.creditCard.builder.comparison.rewardsRate}
                    </h4>
                    <div className="text-lg">
                      {profile.rewardsProgram.baseRate}%{" "}
                      {t.creditCard.builder.comparison.baseRate}
                    </div>
                    {profile.rewardsProgram.bonusCategories.length > 0 && (
                      <div className="text-sm text-gray-600">
                        + {t.creditCard.builder.comparison.bonusCategories}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">
                      {t.creditCard.builder.comparison.keyFeatures}
                    </h4>
                    <div className="text-sm space-y-1">
                      {profile.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="text-gray-600">
                          • {feature}
                        </div>
                      ))}
                      {profile.features.length > 3 && (
                        <div className="text-gray-500">
                          + {profile.features.length - 3}{" "}
                          {t.creditCard.builder.comparison.more}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            🏦 {t.creditCard.builder.title}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setCompareMode(true)}
              disabled={selectedForComparison.length < 2}
              className={`px-4 py-2 rounded-lg ${
                selectedForComparison.length >= 2
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {t.creditCard.builder.compareSelected} (
              {selectedForComparison.length})
            </button>
          </div>
        </div>
        <p className="text-gray-600">{t.creditCard.builder.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Builder Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {editingProfile
                  ? t.creditCard.builder.editProfile
                  : t.creditCard.builder.createNewProfile}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={saveProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingProfile
                    ? t.creditCard.builder.updateProfile
                    : t.creditCard.builder.saveProfile}
                </button>
                {editingProfile && (
                  <button
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    {t.creditCard.builder.cancelEdit}
                  </button>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b mb-6">
              {[
                { key: "basic", label: t.creditCard.builder.tabs.basic },
                {
                  key: "financial",
                  label: t.creditCard.builder.tabs.financial,
                },
                { key: "rewards", label: t.creditCard.builder.tabs.rewards },
                { key: "features", label: t.creditCard.builder.tabs.features },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 font-medium ${
                    activeTab === tab.key
                      ? "border-b-2 border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "basic" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.creditCard.builder.basic.cardNameRequired}
                    </label>
                    <input
                      type="text"
                      value={currentProfile.name}
                      onChange={(e) =>
                        setCurrentProfile((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={
                        t.creditCard.builder.basic.cardNamePlaceholder
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.creditCard.builder.basic.issuerRequired}
                    </label>
                    <input
                      type="text"
                      value={currentProfile.issuer}
                      onChange={(e) =>
                        setCurrentProfile((prev) => ({
                          ...prev,
                          issuer: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={t.creditCard.builder.basic.issuerPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.creditCard.builder.basic.cardCategory}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {cardCategories.map((category) => (
                      <div
                        key={category.value}
                        onClick={() =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            category: category.value as any,
                          }))
                        }
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          currentProfile.category === category.value
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{category.icon}</div>
                          <div className="text-sm font-medium">
                            {category.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.creditCard.builder.basic.creditLimit}
                    </label>
                    <input
                      type="number"
                      value={currentProfile.creditLimit}
                      onChange={(e) =>
                        setCurrentProfile((prev) => ({
                          ...prev,
                          creditLimit: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.creditCard.builder.basic.creditScoreRequirement}
                    </label>
                    <input
                      type="number"
                      value={currentProfile.creditScoreRequirement}
                      onChange={(e) =>
                        setCurrentProfile((prev) => ({
                          ...prev,
                          creditScoreRequirement: Number(e.target.value),
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "financial" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    {t.creditCard.builder.financial.aprRates}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.creditCard.builder.financial.purchaseApr}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={currentProfile.apr.purchase}
                        onChange={(e) =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            apr: {
                              ...prev.apr,
                              purchase: Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.creditCard.builder.financial.balanceTransferApr}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={currentProfile.apr.balanceTransfer}
                        onChange={(e) =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            apr: {
                              ...prev.apr,
                              balanceTransfer: Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.creditCard.builder.financial.cashAdvanceApr}
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={currentProfile.apr.cashAdvance}
                        onChange={(e) =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            apr: {
                              ...prev.apr,
                              cashAdvance: Number(e.target.value),
                            },
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">
                    {t.creditCard.builder.financial.fees}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.creditCard.builder.financial.annualFee}
                      </label>
                      <input
                        type="number"
                        value={currentProfile.annualFee}
                        onChange={(e) =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            annualFee: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.creditCard.builder.financial.foreignTransactionFee}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={currentProfile.foreignTransactionFee}
                        onChange={(e) =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            foreignTransactionFee: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.creditCard.builder.financial.balanceTransferFee}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={currentProfile.balanceTransferFee}
                        onChange={(e) =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            balanceTransferFee: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.creditCard.builder.financial.cashAdvanceFee}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={currentProfile.cashAdvanceFee}
                        onChange={(e) =>
                          setCurrentProfile((prev) => ({
                            ...prev,
                            cashAdvanceFee: Number(e.target.value),
                          }))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rewards" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.creditCard.builder.rewards.rewardsType}
                    </label>
                    <select
                      value={currentProfile.rewardsProgram.type}
                      onChange={(e) =>
                        setCurrentProfile((prev) => ({
                          ...prev,
                          rewardsProgram: {
                            ...prev.rewardsProgram,
                            type: e.target.value as any,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="cashback">
                        {t.creditCard.builder.rewardTypes.cashback}
                      </option>
                      <option value="points">
                        {t.creditCard.builder.rewardTypes.points}
                      </option>
                      <option value="miles">
                        {t.creditCard.builder.rewardTypes.miles}
                      </option>
                      <option value="none">
                        {t.creditCard.builder.rewardTypes.none}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.creditCard.builder.rewards.baseRate}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={currentProfile.rewardsProgram.baseRate}
                      onChange={(e) =>
                        setCurrentProfile((prev) => ({
                          ...prev,
                          rewardsProgram: {
                            ...prev.rewardsProgram,
                            baseRate: Number(e.target.value),
                          },
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">
                      {t.creditCard.builder.rewards.bonusCategories}
                    </h3>
                    <button
                      onClick={addBonusCategory}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      {t.creditCard.builder.rewards.addCategory}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {currentProfile.rewardsProgram.bonusCategories.map(
                      (category, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <select
                            value={category.category}
                            onChange={(e) =>
                              updateBonusCategory(
                                index,
                                "category",
                                e.target.value
                              )
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">
                              {t.creditCard.builder.rewards.selectCategory}
                            </option>
                            {bonusCategories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>

                          <input
                            type="number"
                            step="0.1"
                            placeholder={
                              t.creditCard.builder.rewards.ratePlaceholder
                            }
                            value={category.rate}
                            onChange={(e) =>
                              updateBonusCategory(
                                index,
                                "rate",
                                Number(e.target.value)
                              )
                            }
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <input
                            type="number"
                            placeholder={
                              t.creditCard.builder.rewards.limitPlaceholder
                            }
                            value={category.limit || ""}
                            onChange={(e) =>
                              updateBonusCategory(
                                index,
                                "limit",
                                e.target.value
                                  ? Number(e.target.value)
                                  : undefined
                              )
                            }
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <button
                            onClick={() => removeBonusCategory(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            {t.creditCard.builder.rewards.remove}
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    {t.creditCard.builder.features.cardFeatures}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {commonFeatures.map((feature) => (
                      <label key={feature.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={currentProfile.features.includes(
                            feature.value
                          )}
                          onChange={() => toggleFeature(feature.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{feature.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Profiles */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              {t.creditCard.builder.savedProfiles.title} ({profiles.length})
            </h2>

            <div className="space-y-4">
              {profiles.map((profile) => {
                const value = calculateValue(profile);
                return (
                  <div key={profile.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{profile.name}</h3>
                        <p className="text-sm text-gray-600">
                          {profile.issuer}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedForComparison.includes(profile.id)}
                          onChange={() => toggleComparison(profile.id)}
                          className="text-blue-600"
                        />
                        <button
                          onClick={() => editProfile(profile)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {t.creditCard.builder.savedProfiles.edit}
                        </button>
                        <button
                          onClick={() => deleteProfile(profile.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          {t.creditCard.builder.savedProfiles.delete}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>
                          {t.creditCard.builder.savedProfiles.annualValue}
                        </span>
                        <span
                          className={`font-medium ${
                            value.netValue >= 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {formatCurrency(value.netValue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.creditCard.builder.comparison.apr}:</span>
                        <span>{profile.apr.purchase}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.creditCard.builder.comparison.rewards}:</span>
                        <span>
                          {profile.rewardsProgram.baseRate}%{" "}
                          {t.creditCard.builder.comparison.baseRate}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {profiles.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {t.creditCard.builder.savedProfiles.noProfilesYet}
                </div>
              )}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-900">
              💡 {t.creditCard.builder.tips.title}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded-lg p-3">
                <strong>{t.creditCard.builder.tips.accurateData}</strong>
                <p className="mt-1 text-gray-700">
                  {t.creditCard.builder.tips.accurateDataDesc}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <strong>{t.creditCard.builder.tips.considerSpending}</strong>
                <p className="mt-1 text-gray-700">
                  {t.creditCard.builder.tips.considerSpendingDesc}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <strong>{t.creditCard.builder.tips.totalCost}</strong>
                <p className="mt-1 text-gray-700">
                  {t.creditCard.builder.tips.totalCostDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardProfileBuilder;
