import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Crown, 
  Trophy, 
  Flame, 
  Target,
  Calendar,
  Share2,
  Heart,
  MessageCircle,
  Users,
  Edit3,
  Camera,
  Star,
  Award,
  TrendingUp,
  BookOpen,
  Clock
} from 'lucide-react';

interface UserProfileProps {
  isVisible: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    subscription: 'free' | 'basic' | 'pro' | 'premium';
    joinedAt: string;
    stats: {
      currentStreak: number;
      longestStreak: number;
      totalChallenges: number;
      challengesCreated: number;
      likes: number;
      followers: number;
      following: number;
    };
    badges: Array<{
      id: string;
      name: string;
      icon: string;
      description: string;
      earnedAt: string;
    }>;
    recentChallenges: Array<{
      id: string;
      title: string;
      category: string;
      completedAt: string;
      liked: boolean;
      comments: number;
    }>;
  };
  onEdit?: () => void;
  onFollow?: () => void;
  isOwnProfile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isVisible,
  onClose,
  user,
  onEdit,
  onFollow,
  isOwnProfile = true
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'badges' | 'activity'>('overview');
  const [isFollowing, setIsFollowing] = useState(false);

  const subscriptionColors = {
    free: 'from-gray-400 to-gray-500',
    basic: 'from-blue-400 to-blue-500',
    pro: 'from-indigo-400 to-purple-500',
    premium: 'from-yellow-400 to-orange-500'
  };

  const subscriptionIcons = {
    free: <User className="w-4 h-4" />,
    basic: <Target className="w-4 h-4" />,
    pro: <Star className="w-4 h-4" />,
    premium: <Crown className="w-4 h-4" />
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow?.();
  };

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
          <div className="relative">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-3xl" />
            
            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex items-end gap-4 -mt-16">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Subscription Badge */}
                  <div className={`absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r ${subscriptionColors[user.subscription]} rounded-full flex items-center justify-center shadow-lg`}>
                    {subscriptionIcons[user.subscription]}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                    {user.subscription !== 'free' && (
                      <span className={`px-2 py-1 bg-gradient-to-r ${subscriptionColors[user.subscription]} text-white text-xs font-medium rounded-full capitalize`}>
                        {user.subscription}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  {user.bio && (
                    <p className="text-gray-700 text-sm">{user.bio}</p>
                  )}
                  <p className="text-gray-500 text-sm">
                    Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pb-2">
                  {isOwnProfile ? (
                    <>
                      <button
                        onClick={onEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4 text-gray-600" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleFollow}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                          isFollowing
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                        }`}
                      >
                        <Users className="w-4 h-4" />
                        {isFollowing ? 'Following' : 'Follow'}
                      </button>
                      <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Current Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.totalChallenges}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{user.stats.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex px-6">
              {[
                { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'challenges', label: 'Challenges', icon: <Target className="w-4 h-4" /> },
                { id: 'badges', label: 'Badges', icon: <Award className="w-4 h-4" /> },
                { id: 'activity', label: 'Activity', icon: <Clock className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Achievement Highlights */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-full">
                        <Flame className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{user.stats.longestStreak}</div>
                        <div className="text-sm text-gray-600">Longest Streak</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-2xl border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-full">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{user.badges.length}</div>
                        <div className="text-sm text-gray-600">Badges Earned</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Badges */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Badges</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {user.badges.slice(0, 6).map((badge) => (
                      <motion.div
                        key={badge.id}
                        className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 text-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-2xl mb-2">{badge.icon}</div>
                        <div className="text-sm font-medium text-gray-900">{badge.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Challenges Tab */}
            {activeTab === 'challenges' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Challenges</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                      Completed
                    </button>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm">
                      Created
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {user.recentChallenges.map((challenge) => (
                    <div key={challenge.id} className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span className="capitalize">{challenge.category}</span>
                            <span>Completed {new Date(challenge.completedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className={`p-2 rounded-full transition-colors ${
                            challenge.liked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'
                          }`}>
                            <Heart className={`w-4 h-4 ${challenge.liked ? 'fill-current' : ''}`} />
                          </button>
                          <button className="flex items-center gap-1 p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-xs">{challenge.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Badges Tab */}
            {activeTab === 'badges' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900">All Badges ({user.badges.length})</h3>
                
                <div className="grid grid-cols-4 gap-4">
                  {user.badges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-3xl mb-3">{badge.icon}</div>
                      <div className="font-medium text-gray-900 mb-1">{badge.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{badge.description}</div>
                      <div className="text-xs text-gray-500">
                        Earned {new Date(badge.earnedAt).toLocaleDateString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Completed "Learn 5 Spanish Words"
                      </div>
                      <div className="text-xs text-gray-600">2 hours ago</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Created new challenge "Morning Meditation"
                      </div>
                      <div className="text-xs text-gray-600">1 day ago</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Award className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        Earned "Week Warrior" badge
                      </div>
                      <div className="text-xs text-gray-600">3 days ago</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfile;
