import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';

const Analytics: React.FC = () => {
  const { getAnalytics, wasteEntries } = useData();
  const [timeRange, setTimeRange] = useState('7d');
  const analytics = getAnalytics();

  // Color scheme for charts
  const COLORS = {
    recyclable: '#10B981', // green
    compostable: '#F59E0B', // amber
    landfill: '#EF4444' // red
  };

  // Prepare data for pie chart
  const pieData = Object.entries(analytics.categoryTotals).map(([category, weight]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: Math.round(weight * 100) / 100,
    color: COLORS[category as keyof typeof COLORS]
  }));

  // Prepare weekly trend data
  const weeklyData = (() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayEntries = wasteEntries.filter(entry => entry.date === dateStr);
      const dayData = {
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        recyclable: dayEntries.filter(e => e.category === 'recyclable').reduce((sum, e) => sum + e.weight, 0),
        compostable: dayEntries.filter(e => e.category === 'compostable').reduce((sum, e) => sum + e.weight, 0),
        landfill: dayEntries.filter(e => e.category === 'landfill').reduce((sum, e) => sum + e.weight, 0),
        total: dayEntries.reduce((sum, e) => sum + e.weight, 0)
      };
      
      last7Days.push(dayData);
    }
    return last7Days;
  })();

  // Calculate trends
  const currentWeekTotal = analytics.last7Days;
  const previousWeekEntries = wasteEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return entryDate >= twoWeeksAgo && entryDate < oneWeekAgo;
  });
  const previousWeekTotal = previousWeekEntries.reduce((sum, entry) => sum + entry.weight, 0);
  
  const weeklyTrend = previousWeekTotal > 0 
    ? ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100 
    : 0;

  const stats = [
    {
      name: 'This Week',
      value: `${currentWeekTotal.toFixed(1)} kg`,
      change: weeklyTrend,
      changeType: weeklyTrend <= 0 ? 'positive' : 'negative',
      icon: Calendar
    },
    {
      name: 'Daily Average',
      value: `${(currentWeekTotal / 7).toFixed(1)} kg`,
      change: 12,
      changeType: 'negative',
      icon: TrendingDown
    },
    {
      name: 'Best Category',
      value: 'Recyclable',
      change: 23,
      changeType: 'positive',
      icon: TrendingUp
    },
    {
      name: 'Total Items',
      value: analytics.totalEntries,
      change: 8,
      changeType: 'positive',
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your waste patterns and environmental impact</p>
        </div>
        
        <div className="flex space-x-2">
          {[
            { value: '7d', label: '7 Days' },
            { value: '30d', label: '30 Days' },
            { value: '90d', label: '90 Days' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timeRange === option.value
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-4 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      {stat.change !== undefined && (
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.changeType === 'positive' ? (
                            <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                          ) : (
                            <TrendingDown className="h-4 w-4 flex-shrink-0 self-center" />
                          )}
                          <span className="sr-only">{stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by</span>
                          {Math.abs(stat.change).toFixed(1)}%
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Breakdown Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Waste Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex justify-center space-x-6">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
                <Line type="monotone" dataKey="total" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Breakdown Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Breakdown - Last 7 Days</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="recyclable" stackId="a" fill={COLORS.recyclable} name="Recyclable" />
              <Bar dataKey="compostable" stackId="a" fill={COLORS.compostable} name="Compostable" />
              <Bar dataKey="landfill" stackId="a" fill={COLORS.landfill} name="Landfill" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Environmental Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">
              {((analytics.categoryTotals.recyclable || 0) * 2.5).toFixed(1)}
            </div>
            <div className="text-green-100">kg CO₂ saved</div>
            <div className="text-sm text-green-200 mt-1">Through recycling</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {((analytics.categoryTotals.compostable || 0) * 0.8).toFixed(1)}
            </div>
            <div className="text-green-100">kg methane prevented</div>
            <div className="text-sm text-green-200 mt-1">Through composting</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">
              {analytics.totalEntries}
            </div>
            <div className="text-green-100">items tracked</div>
            <div className="text-sm text-green-200 mt-1">Your sustainability journey</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;