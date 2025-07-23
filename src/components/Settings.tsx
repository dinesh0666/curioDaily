import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Clock, 
  Heart, 
  Trash2, 
  Edit3,
  Save,
  X,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { InterestCategory } from '../types';
import { storageUtils } from '../utils/storage';

const Settings: React.FC = () => {
  const { state, actions } = useApp();
  const { user, progress } = state;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editTime, setEditTime] = useState(user?.preferredChallengeTime || '09:00');
  const [editInterests, setEditInterests] = useState<InterestCategory[]>(user?.interests || []);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const interests = [
    'Photography', 'Languages', 'Cooking', 'Fitness', 'Art', 
    'Science', 'Music', 'Writing', 'Travel', 'Technology'
  ] as InterestCategory[];

  const handleSave = () => {
    if (!user || !editName.trim() || editInterests.length === 0) return;
    
    const updatedUser = {
      ...user,
      name: editName.trim(),
      preferredChallengeTime: editTime,
      interests: editInterests
    };
    
    actions.setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user?.name || '');
    setEditTime(user?.preferredChallengeTime || '09:00');
    setEditInterests(user?.interests || []);
    setIsEditing(false);
  };

  const toggleInterest = (interest: InterestCategory) => {
    setEditInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleDeleteAllData = () => {
    storageUtils.clearAllData();
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Customize your CurioDaily experience
          </p>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Time Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Preferred Challenge Time
                </label>
                <select
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="07:00">7:00 AM - Early Bird</option>
                  <option value="09:00">9:00 AM - Morning Fresh</option>
                  <option value="12:00">12:00 PM - Lunch Break</option>
                  <option value="15:00">3:00 PM - Afternoon Boost</option>
                  <option value="18:00">6:00 PM - Evening Wind Down</option>
                  <option value="20:00">8:00 PM - Night Owl</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Heart className="w-4 h-4 inline mr-1" />
                  Interests ({editInterests.length} selected)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`
                        p-2 rounded-lg border text-sm transition-all duration-200
                        ${editInterests.includes(interest)
                          ? 'border-primary-300 bg-primary-50 text-primary-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }
                      `}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                {editInterests.length === 0 && (
                  <p className="text-red-500 text-xs mt-1">Please select at least one interest</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSave}
                  disabled={!editName.trim() || editInterests.length === 0}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-gray-900">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Challenge Time</label>
                <p className="text-gray-900">
                  {new Date(`2000-01-01T${user.preferredChallengeTime}`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Interests</label>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span
                      key={interest}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card mb-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Journey</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {progress.totalChallengesCompleted}
              </div>
              <div className="text-sm text-gray-600">Challenges Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-1">
                {progress.longestStreak}
              </div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
              Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card border-red-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            This will permanently delete all your data including progress, streaks, and settings. This action cannot be undone.
          </p>
          
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete All Data
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-medium text-red-800">
                Are you absolutely sure? This cannot be undone.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAllData}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* App Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>CurioDaily v1.0.0</p>
          <p>Made with ❤️ for curious minds</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
