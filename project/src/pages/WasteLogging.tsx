import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Plus, Trash2, Recycle, Leaf, Check } from 'lucide-react';

const WasteLogging: React.FC = () => {
  const { addWasteEntry, wasteEntries } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    category: 'recyclable' as 'recyclable' | 'compostable' | 'landfill',
    weight: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const categoryOptions = [
    {
      value: 'recyclable',
      label: 'Recyclable',
      icon: Recycle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Plastic, glass, paper, metal',
      points: 10
    },
    {
      value: 'compostable',
      label: 'Compostable',
      icon: Leaf,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Food scraps, organic waste',
      points: 8
    },
    {
      value: 'landfill',
      label: 'Landfill',
      icon: Trash2,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Non-recyclable waste',
      points: 2
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCategory = categoryOptions.find(c => c.value === formData.category);
    const entry = {
      item: formData.item,
      category: formData.category,
      weight: parseFloat(formData.weight),
      date: formData.date,
      points: selectedCategory?.points || 0
    };

    addWasteEntry(entry);
    
    // Reset form
    setFormData({
      item: '',
      category: 'recyclable',
      weight: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    setShowForm(false);
    setShowSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const recentEntries = wasteEntries.slice(0, 10);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Waste Logging</h1>
          <p className="mt-2 text-gray-600">Track your daily waste and earn points</p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Log Waste
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Waste entry logged successfully! Points added to your account.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryOptions.map((category) => {
          const Icon = category.icon;
          const categoryEntries = wasteEntries.filter(entry => entry.category === category.value);
          const totalWeight = categoryEntries.reduce((sum, entry) => sum + entry.weight, 0);
          
          return (
            <div key={category.value} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-md ${category.bgColor}`}>
                  <Icon className={`h-6 w-6 ${category.color}`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{category.label}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Weight:</span>
                  <span className="text-sm font-medium text-gray-900">{totalWeight.toFixed(1)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Items Logged:</span>
                  <span className="text-sm font-medium text-gray-900">{categoryEntries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Points per kg:</span>
                  <span className="text-sm font-medium text-green-600">{category.points} pts</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Logging Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Log New Waste Item</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Description
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Plastic water bottle"
                    value={formData.item}
                    onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="space-y-2">
                    {categoryOptions.map((category) => {
                      const Icon = category.icon;
                      return (
                        <label key={category.value} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={formData.category === category.value}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                          />
                          <div className="ml-3 flex items-center">
                            <Icon className={`h-4 w-4 ${category.color} mr-2`} />
                            <span className="text-sm text-gray-900">{category.label}</span>
                            <span className="text-xs text-gray-500 ml-2">({category.points} pts/kg)</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="0.5"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Log Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Entries</h3>
        </div>
        
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weight
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentEntries.map((entry) => {
                const category = categoryOptions.find(c => c.value === entry.category);
                const Icon = category?.icon || Trash2;
                
                return (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon className={`h-4 w-4 ${category?.color} mr-2`} />
                        <span className="text-sm text-gray-900 capitalize">{entry.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.weight} kg
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      +{entry.points} pts
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {recentEntries.length === 0 && (
            <div className="text-center py-12">
              <Trash2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No entries yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by logging your first waste item.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WasteLogging;