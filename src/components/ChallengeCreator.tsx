import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  X, 
  Save, 
  Eye, 
  Clock, 
  Target, 
  Lightbulb,
  Users,
  Share2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Crown
} from 'lucide-react';
import { InterestCategory, ChallengeType } from '../types';
import { generateUUID } from '../utils/uuid';

interface ChallengeCreatorProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (challenge: CustomChallenge) => void;
  userSubscription: 'free' | 'basic' | 'pro' | 'premium';
}

interface CustomChallenge {
  id: string;
  title: string;
  description: string;
  category: InterestCategory;
  type: ChallengeType;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  steps: string[];
  tags: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
}

const ChallengeCreator: React.FC<ChallengeCreatorProps> = ({
  isVisible,
  onClose,
  onSave,
  userSubscription
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [challenge, setChallenge] = useState<Partial<CustomChallenge>>({
    title: '',
    description: '',
    category: 'Personal Growth' as InterestCategory,
    type: 'Try This' as ChallengeType,
    difficulty: 'easy',
    estimatedTime: '5',
    steps: [''],
    tags: [],
    isPublic: false
  });
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories: InterestCategory[] = [
    'Photography', 'Languages', 'Cooking', 'Fitness', 'Art',
    'Science', 'Music', 'Writing', 'Travel', 'Technology'
  ];

  const challengeTypes: ChallengeType[] = [
    'Learn Something New', 'Try This', 'Create', 'Explore'
  ];

  const maxChallenges = {
    free: 1,
    basic: 3,
    pro: Infinity,
    premium: Infinity
  };

  const canCreateChallenge = maxChallenges[userSubscription] === Infinity || 
    (typeof maxChallenges[userSubscription] === 'number' && maxChallenges[userSubscription] > 0);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!challenge.title?.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!challenge.description?.trim()) {
        newErrors.description = 'Description is required';
      }
    }

    if (step === 2) {
      if (!challenge.steps?.some(step => step.trim())) {
        newErrors.steps = 'At least one step is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const addStep = () => {
    setChallenge({
      ...challenge,
      steps: [...(challenge.steps || []), '']
    });
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...(challenge.steps || [])];
    newSteps[index] = value;
    setChallenge({
      ...challenge,
      steps: newSteps
    });
  };

  const removeStep = (index: number) => {
    const newSteps = challenge.steps?.filter((_, i) => i !== index) || [];
    setChallenge({
      ...challenge,
      steps: newSteps
    });
  };

  const addTag = () => {
    if (newTag.trim() && !challenge.tags?.includes(newTag.trim())) {
      setChallenge({
        ...challenge,
        tags: [...(challenge.tags || []), newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setChallenge({
      ...challenge,
      tags: challenge.tags?.filter(t => t !== tag) || []
    });
  };

  const handleSave = () => {
    if (validateStep(1) && validateStep(2)) {
      const newChallenge: CustomChallenge = {
        id: generateUUID(),
        title: challenge.title!,
        description: challenge.description!,
        category: challenge.category!,
        type: challenge.type!,
        difficulty: challenge.difficulty!,
        estimatedTime: challenge.estimatedTime!,
        steps: challenge.steps?.filter(step => step.trim()) || [],
        tags: challenge.tags || [],
        isPublic: challenge.isPublic || false,
        createdBy: 'current-user',
        createdAt: new Date().toISOString()
      };
      
      onSave(newChallenge);
      onClose();
    }
  };

  if (!isVisible) return null;

  if (!canCreateChallenge) {
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
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Upgrade to Create Challenges
              </h3>
              <p className="text-gray-600 mb-6">
                Create unlimited custom challenges with a Pro or Premium subscription.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                >
                  Maybe Later
                </button>
                <button className="flex-1 py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold">
                  Upgrade Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-indigo-500" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Create Challenge</h2>
                  <p className="text-gray-600">Design a custom challenge for yourself or the community</p>
                </div>
              </div>
              
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Hide Preview' : 'Preview'}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep > step ? 'bg-indigo-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            {/* Form */}
            <div className={`${showPreview ? 'w-1/2' : 'w-full'} p-6`}>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Challenge Title *
                        </label>
                        <input
                          type="text"
                          value={challenge.title || ''}
                          onChange={(e) => setChallenge({ ...challenge, title: e.target.value })}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            errors.title ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="e.g., Learn 10 new words in Spanish"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={challenge.description || ''}
                          onChange={(e) => setChallenge({ ...challenge, description: e.target.value })}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                            errors.description ? 'border-red-300' : 'border-gray-300'
                          }`}
                          rows={3}
                          placeholder="Describe what this challenge involves and why it's valuable..."
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            value={challenge.category || ''}
                            onChange={(e) => setChallenge({ ...challenge, category: e.target.value as InterestCategory })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type
                          </label>
                          <select
                            value={challenge.type || ''}
                            onChange={(e) => setChallenge({ ...challenge, type: e.target.value as ChallengeType })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            {challengeTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Difficulty
                          </label>
                          <select
                            value={challenge.difficulty || 'easy'}
                            onChange={(e) => setChallenge({ ...challenge, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Time (minutes)
                          </label>
                          <input
                            type="number"
                            value={challenge.estimatedTime || ''}
                            onChange={(e) => setChallenge({ ...challenge, estimatedTime: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            min="1"
                            max="120"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Steps */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Steps</h3>
                    
                    <div className="space-y-3">
                      {challenge.steps?.map((step, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={step}
                              onChange={(e) => updateStep(index, e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder={`Step ${index + 1}...`}
                            />
                          </div>
                          {challenge.steps!.length > 1 && (
                            <button
                              onClick={() => removeStep(index)}
                              className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      
                      <button
                        onClick={addStep}
                        className="flex items-center gap-2 px-4 py-2 text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add Step
                      </button>
                      
                      {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Tags & Settings */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags & Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tags
                        </label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTag()}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Add a tag..."
                          />
                          <button
                            onClick={addTag}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {challenge.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="text-indigo-500 hover:text-indigo-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-gray-400" />
                          <div>
                            <h4 className="font-medium text-gray-900">Make Public</h4>
                            <p className="text-sm text-gray-600">Share this challenge with the community</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={challenge.isPublic || false}
                            onChange={(e) => setChallenge({ ...challenge, isPublic: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Challenge
                  </button>
                )}
              </div>
            </div>

            {/* Preview */}
            {showPreview && (
              <div className="w-1/2 border-l border-gray-200 p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {challenge.type}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      {challenge.difficulty}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {challenge.title || 'Challenge Title'}
                  </h4>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {challenge.estimatedTime || '5'} minutes
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {challenge.category}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {challenge.description || 'Challenge description will appear here...'}
                  </p>
                  
                  {challenge.steps && challenge.steps.some(step => step.trim()) && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Steps:</h5>
                      <ol className="space-y-2">
                        {challenge.steps.filter(step => step.trim()).map((step, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </span>
                            <span className="text-sm text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  
                  {challenge.tags && challenge.tags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-1">
                        {challenge.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChallengeCreator;
