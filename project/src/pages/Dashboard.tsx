import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { 
  TrendingDown, 
  Trophy, 
  Recycle, 
  Leaf,
  Target,
  Award
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { getAnalytics, challenges } = useData();
  const analytics = getAnalytics();

  const stats = [
    {
      name: 'Total Waste Logged',
      value: `${analytics.totalWeight.toFixed(1)} kg`,
      icon: TrendingDown,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Items Recycled',
      value: `${analytics.categoryTotals.recyclable?.toFixed(1) || 0} kg`,
      icon: Recycle,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Composted',
      value: `${analytics.categoryTotals.compostable?.toFixed(1) || 0} kg`,
      icon: Leaf,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'Points Earned',
      value: user?.points || 0,
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const activeChallenge = challenges[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's your sustainability impact overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className={`p-3 rounded-md ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Challenge */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Target className="h-8 w-8 mr-3" />
            <div>
              <h3 className="text-xl font-semibold">Active Challenge</h3>
              <p className="text-green-100">{activeChallenge.title}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-100">Progress</p>
            <p className="text-2xl font-bold">
              {Math.round((activeChallenge.current / activeChallenge.target) * 100)}%
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-green-100 mb-1">
            <span>{activeChallenge.description}</span>
            <span>{activeChallenge.current}/{activeChallenge.target} kg</span>
          </div>
          <div className="w-full bg-green-400 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${Math.min((activeChallenge.current / activeChallenge.target) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-green-100">
            {activeChallenge.participants} participants
          </span>
          <span className="text-sm font-medium">
            Reward: {activeChallenge.reward}
          </span>
        </div>
      </div>

      {/* Recent Activity & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Level</h3>
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{user?.level}</span>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-500">Level {user?.level} Eco Warrior</p>
              <p className="text-lg font-medium text-gray-900">{user?.points} points</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 rounded-full h-2"
                  style={{ width: `${((user?.points || 0) % 300) / 3}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {300 - ((user?.points || 0) % 300)} points to next level
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Badges</h3>
          <div className="grid grid-cols-3 gap-3">
            {user?.badges.map((badge, index) => (
              <div key={index} className="text-center">
                <div className="h-12 w-12 mx-auto rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="text-xs text-gray-600 font-medium">{badge}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <TrendingDown className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">Log New Waste</p>
              <p className="text-xs text-gray-500">Track your daily waste</p>
            </div>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <div className="text-center">
              <Trophy className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">View Challenges</p>
              <p className="text-xs text-gray-500">Join community challenges</p>
            </div>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <Leaf className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">Learn More</p>
              <p className="text-xs text-gray-500">Sustainability tips</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;