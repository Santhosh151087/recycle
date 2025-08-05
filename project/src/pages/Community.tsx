import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Users, Target, Calendar, Medal, Star, TrendingUp } from 'lucide-react';

const Community: React.FC = () => {
  const { challenges, joinChallenge } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('challenges');

  // Mock leaderboard data
  const leaderboard = [
    { id: '1', name: 'Sarah Green', points: 2150, level: 8, badge: 'Eco Master', avatar: 'SG' },
    { id: '2', name: 'Mike Recycle', points: 1890, level: 7, badge: 'Zero Waste Hero', avatar: 'MR' },
    { id: '3', name: 'Jane Earth', points: 1650, level: 6, badge: 'Compost Queen', avatar: 'JE' },
    { id: '4', name: user?.name || 'You', points: user?.points || 1250, level: user?.level || 5, badge: 'Recycling Champion', avatar: user?.name?.charAt(0) || 'Y' },
    { id: '5', name: 'Tom Clean', points: 1100, level: 5, badge: 'Green Starter', avatar: 'TC' },
    { id: '6', name: 'Lisa Pure', points: 950, level: 4, badge: 'Eco Warrior', avatar: 'LP' },
  ].sort((a, b) => b.points - a.points);

  const handleJoinChallenge = (challengeId: string) => {
    joinChallenge(challengeId);
  };

  const tabs = [
    { id: 'challenges', name: 'Active Challenges', icon: Target },
    { id: 'leaderboard', name: 'Leaderboard', icon: Trophy },
    { id: 'achievements', name: 'Achievements', icon: Medal }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
        <p className="mt-2 text-gray-600">
          Join challenges, compete with friends, and achieve sustainability goals together
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="text-2xl font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Challenges</p>
              <p className="text-2xl font-semibold text-gray-900">{challenges.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Your Rank</p>
              <p className="text-2xl font-semibold text-gray-900">
                #{leaderboard.findIndex(u => u.name === user?.name) + 1}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Points</p>
              <p className="text-2xl font-semibold text-gray-900">{user?.points}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge) => {
              const progress = (challenge.current / challenge.target) * 100;
              const daysLeft = Math.max(0, Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
              
              return (
                <div key={challenge.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {daysLeft}d left
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{challenge.current}/{challenge.target} kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {Math.round(progress)}% complete
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {challenge.participants} participants
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      🏆 {challenge.reward}
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoinChallenge(challenge.id)}
                    className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    Join Challenge
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Eco Warriors</h3>
            <p className="text-sm text-gray-500">See how you rank among community members</p>
          </div>
          
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badge
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboard.map((member, index) => {
                  const isCurrentUser = member.name === user?.name;
                  
                  return (
                    <tr key={member.id} className={`${isCurrentUser ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                            }`}>
                              {index + 1}
                            </div>
                          ) : (
                            <span className="text-sm font-medium text-gray-900">#{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            isCurrentUser ? 'bg-green-500' : 'bg-gray-500'
                          }`}>
                            {member.avatar}
                          </div>
                          <div className="ml-3">
                            <div className={`text-sm font-medium ${isCurrentUser ? 'text-green-900' : 'text-gray-900'}`}>
                              {member.name} {isCurrentUser && '(You)'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Level {member.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.points.toLocaleString()} pts
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                          {member.badge}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'First Steps', description: 'Log your first waste item', unlocked: true, icon: '🌱' },
            { name: 'Recycling Champion', description: 'Recycle 50kg of materials', unlocked: true, icon: '♻️' },
            { name: 'Compost King', description: 'Compost 25kg of organic waste', unlocked: true, icon: '🌿' },
            { name: 'Zero Waste Hero', description: 'Reduce landfill waste by 90%', unlocked: false, icon: '🦸' },
            { name: 'Green Streak', description: 'Log waste for 30 consecutive days', unlocked: false, icon: '🔥' },
            { name: 'Community Leader', description: 'Top 10 in monthly leaderboard', unlocked: false, icon: '👑' }
          ].map((achievement) => (
            <div key={achievement.name} className={`p-6 rounded-lg border-2 ${
              achievement.unlocked 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="text-center">
                <div className={`text-4xl mb-3 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  achievement.unlocked ? 'text-green-900' : 'text-gray-600'
                }`}>
                  {achievement.name}
                </h3>
                <p className={`text-sm ${
                  achievement.unlocked ? 'text-green-700' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {achievement.unlocked && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Medal className="h-3 w-3 mr-1" />
                      Unlocked
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;