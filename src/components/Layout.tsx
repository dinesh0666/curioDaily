import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Settings, Play, Crown, User, Plus, Shield } from 'lucide-react';
import SubscriptionModal from './SubscriptionModal';
import AuthModal from './AuthModal';
import ChallengeCreator from './ChallengeCreator';
import UserProfile from './UserProfile';
import AdminPanel from './AdminPanel';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChallengeCreator, setShowChallengeCreator] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Mock user data - in real app, this would come from context/state
  const currentUser = {
    id: 'user123',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
    bio: 'Curious learner exploring new challenges every day!',
    subscription: 'free' as const,
    joinedAt: '2024-01-15',
    stats: {
      currentStreak: 7,
      longestStreak: 21,
      totalChallenges: 45,
      challengesCreated: 3,
      likes: 89,
      followers: 23,
      following: 15
    },
    badges: [
      {
        id: '1',
        name: 'Week Warrior',
        icon: '🔥',
        description: 'Complete challenges for 7 days straight',
        earnedAt: '2024-01-20'
      },
      {
        id: '2',
        name: 'Creator',
        icon: '✨',
        description: 'Create your first challenge',
        earnedAt: '2024-01-18'
      }
    ],
    recentChallenges: [
      {
        id: '1',
        title: 'Learn 5 Spanish Words',
        category: 'Languages',
        completedAt: '2024-01-20',
        liked: true,
        comments: 3
      }
    ]
  };

  const handleSaveChallenge = (challenge: any) => {
    console.log('Saving challenge:', challenge);
    // In real app, this would save to backend
  };

  const navItems = [
    { path: '/', icon: <Home className="w-5 h-5" />, label: 'Challenge' },
    { path: '/feed', icon: <Play className="w-5 h-5" />, label: 'Feed' },
    { path: '/progress', icon: <TrendingUp className="w-5 h-5" />, label: 'Progress' },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Premium Features */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 z-30">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-bold text-gray-900">CurioDaily</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChallengeCreator(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Create Challenge"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-20">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'text-primary-600 bg-primary-50' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {item.icon}
                <span className="text-xs mt-1 font-medium">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Premium Feature Modals - Hidden for now */}
      {/* <SubscriptionModal
        isVisible={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={(tier) => {
          console.log('Subscribing to:', tier);
          setShowSubscriptionModal(false);
          // Handle subscription logic
        }}
      /> */}
      
      {/* <AuthModal
        isVisible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={(user) => {
          console.log('User authenticated:', user);
          setShowAuthModal(false);
          // Handle successful authentication
        }}
      /> */}
      
      <ChallengeCreator
        isVisible={showChallengeCreator}
        onClose={() => setShowChallengeCreator(false)}
        onSave={handleSaveChallenge}
        userSubscription={currentUser.subscription}
      />
      
      {/* <UserProfile
        isVisible={showUserProfile}
        onClose={() => setShowUserProfile(false)}
        user={currentUser}
        onEdit={() => {
          setShowUserProfile(false);
          // Open edit profile modal
        }}
        isOwnProfile={true}
      /> */}
      
      {/* <AdminPanel
        isVisible={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        userRole="admin"
      /> */}
    </div>
  );
};

export default Layout;
