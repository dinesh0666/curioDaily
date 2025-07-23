import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Target, TrendingUp, Clock } from 'lucide-react';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Personalized Challenges",
      description: "Daily micro-challenges tailored to your interests"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "5-15 Minute Activities",
      description: "Perfect bite-sized learning that fits your schedule"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Build Streaks",
      description: "Track your progress and build meaningful habits"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Replace Scrolling",
      description: "Transform mindless time into curious exploration"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 gradient-bg rounded-2xl flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">
            CurioDaily
          </h1>
          <p className="text-gray-600 text-lg">
            Daily curiosity challenges
          </p>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Transform scrolling into learning
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Get personalized micro-challenges that spark curiosity and build meaningful habits. 
            Just 5-15 minutes a day to explore your interests.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-primary-500 mb-2 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            onClick={() => navigate('/interests')}
            className="btn-primary w-full text-lg py-4 mb-4"
          >
            Get Started
          </button>
          <p className="text-sm text-gray-500">
            No account needed • Works offline • Free forever
          </p>
        </motion.div>
      </motion.div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent-100 rounded-full opacity-10"></div>
      </div>
    </div>
  );
};

export default Welcome;
