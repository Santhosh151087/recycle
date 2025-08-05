import React, { useState } from 'react';
import { MapPin, Clock, Phone, ExternalLink, Search, Filter, Recycle, Leaf, Trash2, Calendar } from 'lucide-react';

const LocalServices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [userLocation, setUserLocation] = useState('');

  // Mock data for local services
  const services = [
    {
      id: '1',
      name: 'GreenCycle Recycling Center',
      type: 'recycling',
      address: '123 Eco Street, Green Valley, CA 94040',
      phone: '(555) 123-4567',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
      distance: '2.3 miles',
      services: ['Plastic recycling', 'Metal recycling', 'Electronic waste', 'Paper & cardboard'],
      website: 'https://greencycle.example.com',
      rating: 4.5,
      description: 'Full-service recycling center accepting most recyclable materials.'
    },
    {
      id: '2',
      name: 'Community Compost Hub',
      type: 'composting',
      address: '456 Garden Lane, Green Valley, CA 94041',
      phone: '(555) 234-5678',
      hours: 'Daily: 7:00 AM - 7:00 PM',
      distance: '1.8 miles',
      services: ['Food waste composting', 'Yard waste', 'Finished compost pickup', 'Composting workshops'],
      website: 'https://compostHub.example.com',
      rating: 4.8,
      description: 'Community-run composting facility with educational programs.'
    },
    {
      id: '3',
      name: 'Eco-Waste Solutions',
      type: 'collection',
      address: '789 Clean Drive, Green Valley, CA 94042',
      phone: '(555) 345-6789',
      hours: 'Mon-Fri: 7:00 AM - 5:00 PM',
      distance: '3.1 miles',
      services: ['Curbside pickup', 'Bulk waste removal', 'Hazardous waste', 'Construction debris'],
      website: 'https://ecowaste.example.com',
      rating: 4.2,
      description: 'Professional waste collection and disposal services.'
    },
    {
      id: '4',
      name: 'Tech Recycle Pro',
      type: 'electronics',
      address: '321 Tech Avenue, Green Valley, CA 94043',
      phone: '(555) 456-7890',
      hours: 'Tue-Sat: 10:00 AM - 6:00 PM',
      distance: '4.5 miles',
      services: ['Computer recycling', 'Phone & tablet recycling', 'Battery disposal', 'Data destruction'],
      website: 'https://techrecycle.example.com',
      rating: 4.7,
      description: 'Specialized electronic waste recycling with secure data destruction.'
    },
    {
      id: '5',
      name: 'Green Valley Hazmat Center',
      type: 'hazardous',
      address: '654 Safety Road, Green Valley, CA 94044',
      phone: '(555) 567-8901',
      hours: 'Wed & Sat: 9:00 AM - 3:00 PM',
      distance: '5.2 miles',
      services: ['Paint disposal', 'Chemical waste', 'Battery recycling', 'Oil & automotive fluids'],
      website: 'https://hazmat.greenvalley.gov',
      rating: 4.3,
      description: 'Municipal hazardous waste collection facility.'
    },
    {
      id: '6',
      name: 'Donation Drop-Off Center',
      type: 'donation',
      address: '987 Charity Circle, Green Valley, CA 94045',
      phone: '(555) 678-9012',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM',
      distance: '2.7 miles',
      services: ['Clothing donations', 'Furniture pickup', 'Household items', 'Book donations'],
      website: 'https://donate.example.com',
      rating: 4.6,
      description: 'Local charity accepting donations to reduce waste and help community.'
    }
  ];

  const collectionSchedule = [
    {
      type: 'General Waste',
      days: ['Tuesday', 'Friday'],
      nextPickup: '2025-01-21',
      color: 'bg-gray-500'
    },
    {
      type: 'Recycling',
      days: ['Wednesday'],
      nextPickup: '2025-01-22',
      color: 'bg-green-500'
    },
    {
      type: 'Organic/Compost',
      days: ['Monday', 'Thursday'],
      nextPickup: '2025-01-23',
      color: 'bg-orange-500'
    },
    {
      type: 'Bulk Items',
      days: ['First Saturday of month'],
      nextPickup: '2025-02-01',
      color: 'bg-blue-500'
    }
  ];

  const serviceTypes = [
    { value: 'all', label: 'All Services', icon: MapPin },
    { value: 'recycling', label: 'Recycling Centers', icon: Recycle },
    { value: 'composting', label: 'Composting', icon: Leaf },
    { value: 'collection', label: 'Waste Collection', icon: Trash2 },
    { value: 'electronics', label: 'Electronics', icon: MapPin },
    { value: 'hazardous', label: 'Hazardous Waste', icon: MapPin },
    { value: 'donation', label: 'Donations', icon: MapPin }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || service.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'recycling': return Recycle;
      case 'composting': return Leaf;
      case 'collection': return Trash2;
      default: return MapPin;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'recycling': return 'text-green-600 bg-green-100';
      case 'composting': return 'text-orange-600 bg-orange-100';
      case 'collection': return 'text-blue-600 bg-blue-100';
      case 'electronics': return 'text-purple-600 bg-purple-100';
      case 'hazardous': return 'text-red-600 bg-red-100';
      case 'donation': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Local Services</h1>
        <p className="mt-2 text-gray-600">
          Find recycling centers, composting facilities, and waste collection services near you
        </p>
      </div>

      {/* Location Input */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Set Your Location</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Enter your address or zip code"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              value={userLocation}
              onChange={(e) => setUserLocation(e.target.value)}
            />
          </div>
          <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
            Update Location
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Current location: Green Valley, CA (default)
        </p>
      </div>

      {/* Collection Schedule */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Waste Collection Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {collectionSchedule.map((schedule, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full ${schedule.color} mr-2`}></div>
                <h4 className="font-medium text-gray-900">{schedule.type}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {schedule.days.join(', ')}
              </p>
              <p className="text-sm text-green-600 font-medium">
                Next: {new Date(schedule.nextPickup).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {serviceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => {
          const Icon = getServiceIcon(service.type);
          const colorClasses = getServiceColor(service.type);
          
          return (
            <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <div className={`p-3 rounded-md ${colorClasses} mr-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{service.type.replace('-', ' ')} Service</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(service.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1">({service.rating})</span>
                  </div>
                  <p className="text-sm font-medium text-green-600">{service.distance}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{service.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">{service.address}</span>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">{service.hours}</span>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-sm text-gray-600">{service.phone}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Services Offered:</h4>
                <div className="flex flex-wrap gap-2">
                  {service.services.map((s, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                  Get Directions
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Website
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency & Special Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <h4 className="font-medium text-red-900 mb-2">Hazardous Waste Emergency</h4>
            <p className="text-sm text-red-700 mb-2">For spills or dangerous materials</p>
            <p className="text-red-800 font-semibold">(555) 911-HAZMAT</p>
          </div>
          
          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h4 className="font-medium text-blue-900 mb-2">Bulk Item Pickup</h4>
            <p className="text-sm text-blue-700 mb-2">Schedule large item collection</p>
            <p className="text-blue-800 font-semibold">(555) 123-BULK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalServices;