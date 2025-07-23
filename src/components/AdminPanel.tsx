import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield,
  Users,
  Target,
  BarChart3,
  Settings,
  Flag,
  Crown,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Upload,
  Plus,
  X
} from 'lucide-react';

interface AdminPanelProps {
  isVisible: boolean;
  onClose: () => void;
  userRole: 'admin' | 'moderator';
}

interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'basic' | 'pro' | 'premium';
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'suspended' | 'banned';
  challengesCompleted: number;
  challengesCreated: number;
}

interface Challenge {
  id: string;
  title: string;
  category: string;
  createdBy: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  reports: number;
  completions: number;
  likes: number;
}

interface Report {
  id: string;
  type: 'challenge' | 'comment' | 'user';
  targetId: string;
  targetTitle: string;
  reportedBy: string;
  reason: string;
  description: string;
  createdAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  isVisible,
  onClose,
  userRole
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'challenges' | 'reports' | 'analytics'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  const stats = {
    totalUsers: 12543,
    activeUsers: 8921,
    totalChallenges: 1847,
    pendingChallenges: 23,
    totalReports: 15,
    pendingReports: 7,
    revenue: 45230,
    subscriptions: {
      free: 8234,
      basic: 2341,
      pro: 1456,
      premium: 512
    }
  };

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      subscription: 'pro',
      joinedAt: '2024-01-15',
      lastActive: '2024-01-20',
      status: 'active',
      challengesCompleted: 45,
      challengesCreated: 3
    },
    // Add more mock users...
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Learn 10 Spanish Words',
      category: 'Languages',
      createdBy: 'user123',
      createdAt: '2024-01-20',
      status: 'pending',
      reports: 0,
      completions: 234,
      likes: 89
    },
    // Add more mock challenges...
  ];

  const reports: Report[] = [
    {
      id: '1',
      type: 'challenge',
      targetId: 'challenge123',
      targetTitle: 'Inappropriate Challenge Title',
      reportedBy: 'user456',
      reason: 'inappropriate_content',
      description: 'This challenge contains inappropriate language.',
      createdAt: '2024-01-20',
      status: 'pending'
    },
    // Add more mock reports...
  ];

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
          className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-indigo-500" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
                <p className="text-sm text-gray-600 capitalize">{userRole}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
                { id: 'users', label: 'Users', icon: <Users className="w-5 h-5" /> },
                { id: 'challenges', label: 'Challenges', icon: <Target className="w-5 h-5" /> },
                { id: 'reports', label: 'Reports', icon: <Flag className="w-5 h-5" /> },
                { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.id === 'reports' && stats.pendingReports > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {stats.pendingReports}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Users</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                        </div>
                        <Users className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Active Users</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-500" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Total Challenges</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalChallenges.toLocaleString()}</p>
                        </div>
                        <Target className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">Revenue</p>
                          <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
                        </div>
                        <Crown className="w-8 h-8 text-yellow-500" />
                      </div>
                    </div>
                  </div>

                  {/* Subscription Distribution */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Subscription Distribution</h4>
                    <div className="grid grid-cols-4 gap-4">
                      {Object.entries(stats.subscriptions).map(([tier, count]) => (
                        <div key={tier} className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{count.toLocaleString()}</div>
                          <div className="text-sm text-gray-600 capitalize">{tier}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-700">Challenge "Morning Meditation" approved</span>
                        <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-sm text-gray-700">New user registration: john@example.com</span>
                        <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                        <Flag className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-700">New report submitted for inappropriate content</span>
                        <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>

                  {/* Users Table */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${
                                  user.subscription === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                                  user.subscription === 'pro' ? 'bg-purple-100 text-purple-800' :
                                  user.subscription === 'basic' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.subscription}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  user.status === 'active' ? 'bg-green-100 text-green-800' :
                                  user.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>Completed: {user.challengesCompleted}</div>
                                <div>Created: {user.challengesCreated}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex gap-2">
                                  <button className="text-indigo-600 hover:text-indigo-900">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button className="text-gray-600 hover:text-gray-900">
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button className="text-red-600 hover:text-red-900">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Challenges Tab */}
              {activeTab === 'challenges' && (
                <div className="space-y-6">
                  {/* Search and Filters */}
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search challenges..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Challenges Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                      <div key={challenge.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{challenge.title}</h4>
                            <p className="text-sm text-gray-600">{challenge.category}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            challenge.status === 'approved' ? 'bg-green-100 text-green-800' :
                            challenge.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {challenge.status}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div>Created: {new Date(challenge.createdAt).toLocaleDateString()}</div>
                          <div>Completions: {challenge.completions}</div>
                          <div>Likes: {challenge.likes}</div>
                          {challenge.reports > 0 && (
                            <div className="text-red-600">Reports: {challenge.reports}</div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 py-2 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm">
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            Approve
                          </button>
                          <button className="flex-1 py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                            <XCircle className="w-4 h-4 inline mr-1" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reports Tab */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  {/* Reports List */}
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="bg-white border border-gray-200 rounded-2xl p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                                report.type === 'challenge' ? 'bg-blue-100 text-blue-800' :
                                report.type === 'comment' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {report.type}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {report.status}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-1">{report.targetTitle}</h4>
                            <p className="text-sm text-gray-600 mb-2">Reason: {report.reason.replace('_', ' ')}</p>
                            <p className="text-sm text-gray-700">{report.description}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              Reported by {report.reportedBy} on {new Date(report.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600">Detailed analytics and reporting features coming soon.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
