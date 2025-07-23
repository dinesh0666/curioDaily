import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Crown, 
  Sparkles, 
  Zap, 
  Users, 
  Target, 
  TrendingUp,
  Shield,
  Star
} from 'lucide-react';

interface SubscriptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubscribe: (tier: 'basic' | 'pro' | 'premium') => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isVisible,
  onClose,
  onSubscribe
}) => {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro' | 'premium'>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      id: 'basic' as const,
      name: 'Basic',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200',
      popular: false,
      monthlyPrice: 4.99,
      yearlyPrice: 49.99,
      features: [
        'Unlimited daily challenges',
        'Basic progress tracking',
        'Challenge history',
        'Email support',
        'Mobile app access'
      ],
      limitations: [
        'Limited to 3 custom challenges',
        'Basic analytics only'
      ]
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      borderColor: 'border-indigo-200',
      popular: true,
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        'Everything in Basic',
        'Unlimited custom challenges',
        'Advanced analytics & insights',
        'Challenge sharing & social features',
        'Priority support',
        'Export progress data',
        'Custom challenge categories',
        'Streak recovery (1 per month)'
      ],
      limitations: []
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      icon: <Crown className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-600',
      borderColor: 'border-yellow-200',
      popular: false,
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        'Everything in Pro',
        'AI-powered challenge suggestions',
        'Team & family accounts (up to 5)',
        'Advanced goal setting & tracking',
        'White-label customization',
        'API access for integrations',
        'Dedicated account manager',
        'Unlimited streak recovery',
        'Early access to new features'
      ],
      limitations: []
    }
  ];

  const currentTier = tiers.find(tier => tier.id === selectedTier)!;
  const price = billingCycle === 'monthly' ? currentTier.monthlyPrice : currentTier.yearlyPrice;
  const savings = billingCycle === 'yearly' ? Math.round((currentTier.monthlyPrice * 12 - currentTier.yearlyPrice) / (currentTier.monthlyPrice * 12) * 100) : 0;

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-100">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-8 h-8 text-indigo-500" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Upgrade to Premium
                </h2>
              </div>
              <p className="text-gray-600">
                Unlock advanced features and supercharge your curiosity journey
              </p>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-center">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <motion.div
                  key={tier.id}
                  className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                    selectedTier === tier.id
                      ? `${tier.borderColor} shadow-lg scale-105`
                      : 'border-gray-200 hover:border-gray-300'
                  } ${tier.popular ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${tier.color} text-white mb-3`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-gray-900">
                      ${billingCycle === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice}
                      <span className="text-base font-normal text-gray-500">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <div className="text-sm text-green-600 font-medium">
                        Save ${(tier.monthlyPrice * 12 - tier.yearlyPrice).toFixed(2)} per year
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {tier.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Selected Plan Summary */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">Selected Plan: {currentTier.name}</h4>
                <p className="text-sm text-gray-600">
                  Billed {billingCycle} • {savings > 0 && `${savings}% savings`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  {billingCycle === 'yearly' ? 'per year' : 'per month'}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Maybe Later
              </button>
              <motion.button
                onClick={() => onSubscribe(selectedTier)}
                className={`flex-1 py-3 px-6 bg-gradient-to-r ${currentTier.color} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield className="w-5 h-5" />
                Subscribe to {currentTier.name}
              </motion.button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              30-day money-back guarantee • Cancel anytime • Secure payment
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionModal;
