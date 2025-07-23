import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Languages, 
  ChefHat, 
  Dumbbell, 
  Palette, 
  Microscope, 
  Music, 
  PenTool, 
  MapPin, 
  Laptop,
  ArrowRight,
  Clock
} from 'lucide-react';
import { InterestCategory } from '../types';
import { useApp } from '../context/AppContext';

const InterestSelection: React.FC = () => {
  const navigate = useNavigate();
  const { actions } = useApp();
  const [selectedInterests, setSelectedInterests] = useState<InterestCategory[]>([]);
  const [userName, setUserName] = useState('');
  const [preferredTime, setPreferredTime] = useState('09:00');
  const [step, setStep] = useState(1); // 1: interests, 2: name & time

  const interests = [
    { name: 'Photography' as InterestCategory, icon: <Camera className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
    { name: 'Languages' as InterestCategory, icon: <Languages className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
    { name: 'Cooking' as InterestCategory, icon: <ChefHat className="w-6 h-6" />, color: 'bg-orange-100 text-orange-600' },
    { name: 'Fitness' as InterestCategory, icon: <Dumbbell className="w-6 h-6" />, color: 'bg-red-100 text-red-600' },
    { name: 'Art' as InterestCategory, icon: <Palette className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
    { name: 'Science' as InterestCategory, icon: <Microscope className="w-6 h-6" />, color: 'bg-teal-100 text-teal-600' },
    { name: 'Music' as InterestCategory, icon: <Music className="w-6 h-6" />, color: 'bg-pink-100 text-pink-600' },
    { name: 'Writing' as InterestCategory, icon: <PenTool className="w-6 h-6" />, color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Travel' as InterestCategory, icon: <MapPin className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Technology' as InterestCategory, icon: <Laptop className="w-6 h-6" />, color: 'bg-gray-100 text-gray-600' },
  ];

  const toggleInterest = (interest: InterestCategory) => {
    setSelectedInterests((prev: InterestCategory[]) => 
      prev.includes(interest) 
        ? prev.filter((i: InterestCategory) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedInterests.length >= 1) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    if (userName.trim() && selectedInterests.length > 0) {
      actions.createUser(userName.trim(), selectedInterests, preferredTime);
      navigate('/');
    }
  };

  if (step === 1) {
    return (
      <div className="min-h-screen px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              What sparks your curiosity?
            </h1>
            <p className="text-gray-600">
              Select your interests to get personalized daily challenges
            </p>
            <div className="mt-4 text-sm text-primary-600">
              Choose at least 1 • Selected: {selectedInterests.length}
            </div>
          </div>

          {/* Interest Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {interests.map((interest, index) => (
              <motion.button
                key={interest.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => toggleInterest(interest.name)}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${selectedInterests.includes(interest.name)
                    ? 'border-primary-300 bg-primary-50 shadow-md scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }
                `}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 ${interest.color}`}>
                  {interest.icon}
                </div>
                <h3 className="font-medium text-gray-900 text-sm">
                  {interest.name}
                </h3>
              </motion.button>
            ))}
          </div>

          {/* Continue Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedInterests.length >= 1 ? 1 : 0.5 }}
            onClick={handleNext}
            disabled={selectedInterests.length < 1}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Almost ready!
          </h1>
          <p className="text-gray-600">
            Tell us a bit about yourself to personalize your experience
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 mb-8">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Preferred Time */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              When would you like your daily challenge?
            </label>
            <select
              id="time"
              value={preferredTime}
              onChange={(e: any) => setPreferredTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="07:00">7:00 AM - Early Bird</option>
              <option value="09:00">9:00 AM - Morning Fresh</option>
              <option value="12:00">12:00 PM - Lunch Break</option>
              <option value="15:00">3:00 PM - Afternoon Boost</option>
              <option value="18:00">6:00 PM - Evening Wind Down</option>
              <option value="20:00">8:00 PM - Night Owl</option>
            </select>
          </div>

          {/* Selected Interests Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your selected interests ({selectedInterests.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest: InterestCategory) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-primary-600 text-sm mt-2 hover:text-primary-700 transition-colors"
            >
              Change interests
            </button>
          </div>
        </div>

        {/* Complete Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: userName.trim() ? 1 : 0.5 }}
          onClick={handleComplete}
          disabled={!userName.trim()}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Start My Journey
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <p className="text-center text-sm text-gray-500 mt-4">
          You can always change these settings later
        </p>
      </motion.div>
    </div>
  );
};

export default InterestSelection;
