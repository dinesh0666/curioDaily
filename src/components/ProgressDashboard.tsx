import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Flame, 
  Target, 
  Calendar,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Award
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip
} from 'recharts';
import { useApp } from '../context/AppContext';
import { storageUtils } from '../utils/storage';
import { getChallengeVarietyScore, getNextMilestone } from '../utils/challengeRotation';
import { challengeDatabase } from '../data/challenges';
import { InterestCategory } from '../types';

const ProgressDashboard: React.FC = () => {
  const { state } = useApp();
  const { user, progress } = state;

  const weeklyProgress = storageUtils.getWeeklyProgress();
  
  // Calculate completion rate
  const totalChallenges = progress.totalChallengesCompleted + progress.totalChallengesSkipped;
  const completionRate = totalChallenges > 0 ? Math.round((progress.totalChallengesCompleted / totalChallenges) * 100) : 0;

  // Enhanced analytics
  const varietyScore = useMemo(() => {
    const completedIds = progress.completedChallenges?.map(c => c.challengeId) || [];
    return getChallengeVarietyScore(completedIds);
  }, [progress.completedChallenges]);

  const nextMilestone = getNextMilestone(progress.currentStreak);

  // Chart data
  const weeklyChartData = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayCompletions = progress.completedChallenges?.filter(c => 
        c.completedAt.split('T')[0] === dateStr && !c.skipped
      ).length || 0;
      
      last7Days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: dayCompletions,
        date: dateStr
      });
    }
    return last7Days;
  }, [progress.completedChallenges]);

  const categoryData = useMemo(() => {
    const categoryCount: Record<InterestCategory, number> = {
      Photography: 0, Languages: 0, Cooking: 0, Fitness: 0, Art: 0,
      Science: 0, Music: 0, Writing: 0, Travel: 0, Technology: 0
    };
    
    progress.completedChallenges?.forEach(completion => {
      const challenge = challengeDatabase.find(c => c.id === completion.challengeId);
      if (challenge && !completion.skipped) {
        categoryCount[challenge.category]++;
      }
    });
    
    return Object.entries(categoryCount)
      .filter(([, count]) => count > 0)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }, [progress.completedChallenges]);

  const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16', '#f43f5e', '#6b7280'];

  // Get recent challenges (last 7 days)
  const recentChallenges = progress.completedChallenges
    .slice(-7)
    .reverse();

  const stats = [
    {
      label: 'Current Streak',
      value: progress.currentStreak,
      icon: <Flame className="w-6 h-6" />,
      color: 'text-orange-500 bg-orange-100',
      suffix: 'days'
    },
    {
      label: 'Longest Streak',
      value: progress.longestStreak,
      icon: <Trophy className="w-6 h-6" />,
      color: 'text-yellow-500 bg-yellow-100',
      suffix: 'days'
    },
    {
      label: 'Completed',
      value: progress.totalChallengesCompleted,
      icon: <Target className="w-6 h-6" />,
      color: 'text-green-500 bg-green-100',
      suffix: 'challenges'
    },
    {
      label: 'Success Rate',
      value: completionRate,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-blue-500 bg-blue-100',
      suffix: '%'
    }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">Loading your progress...</p>
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
            Your Progress
          </h1>
          <p className="text-gray-600">
            Keep up the great work, {user.name}!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="card text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.suffix}
              </div>
              <div className="text-xs text-gray-500 mt-1 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Weekly Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              This Week
            </h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-green-600 mb-1">
                {weeklyProgress.completed}
              </div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-400 mb-1">
                {weeklyProgress.skipped}
              </div>
              <div className="text-xs text-gray-600">Skipped</div>
            </div>
            <div>
              <div className="text-xl font-bold text-primary-600 mb-1">
                {weeklyProgress.total}
              </div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Weekly Goal: 7 challenges</span>
              <span>{weeklyProgress.total}/7</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((weeklyProgress.total / 7) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="bg-primary-500 h-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          
          {recentChallenges.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No challenges completed yet</p>
              <p className="text-sm">Start your first challenge today!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentChallenges.map((challenge, index) => (
                <motion.div
                  key={`${challenge.challengeId}-${challenge.completedAt}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`flex-shrink-0 ${challenge.skipped ? 'text-gray-400' : 'text-green-500'}`}>
                    {challenge.skipped ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">
                      {challenge.skipped ? 'Challenge skipped' : 'Challenge completed'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(challenge.completedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    {challenge.notes && (
                      <div className="text-xs text-gray-600 mt-1 italic">
                        "{challenge.notes}"
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Weekly Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Weekly Activity
            </h2>
          </div>
          
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="completed" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Daily challenges completed this week
            </p>
          </div>
        </motion.div>

        {/* Category Distribution */}
        {categoryData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-primary-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Interest Distribution
              </h2>
            </div>
            
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <defs>
                    {categoryData.map((_, index) => (
                      <linearGradient key={index} id={`color${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.6}/>
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ payload }: any) => `${payload.category}: ${payload.count}`}
                    labelLine={false}
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {categoryData.slice(0, 6).map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-600">
                    {item.category}: {item.count}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Variety & Milestone Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Growth Metrics
            </h2>
          </div>
          
          <div className="space-y-4">
            {/* Variety Scores */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Category Variety</span>
                <span className="font-medium">{Math.round(varietyScore.categoryVariety * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${varietyScore.categoryVariety * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Challenge Type Variety</span>
                <span className="font-medium">{Math.round(varietyScore.typeVariety * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${varietyScore.typeVariety * 100}%` }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="bg-green-500 h-2 rounded-full"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Difficulty Variety</span>
                <span className="font-medium">{Math.round(varietyScore.difficultyVariety * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${varietyScore.difficultyVariety * 100}%` }}
                  transition={{ duration: 1, delay: 1.0 }}
                  className="bg-purple-500 h-2 rounded-full"
                />
              </div>
            </div>
            
            {/* Next Milestone */}
            {nextMilestone && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Next Milestone</span>
                  <span className="font-medium">{progress.currentStreak}/{nextMilestone} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress.currentStreak / nextMilestone) * 100}%` }}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="bg-orange-500 h-2 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {nextMilestone - progress.currentStreak} days until your next milestone!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl"
        >
          <p className="text-sm text-gray-700">
            {progress.currentStreak === 0 
              ? "Every expert was once a beginner. Start your streak today!"
              : progress.currentStreak < 7
              ? `Great start! You're ${7 - progress.currentStreak} days away from your first week streak.`
              : progress.currentStreak < 30
              ? `Amazing consistency! You're building a powerful habit.`
              : `Incredible dedication! You're a true curiosity champion.`
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
