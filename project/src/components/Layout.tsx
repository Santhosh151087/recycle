import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  PlusCircle, 
  BarChart3, 
  Users, 
  BookOpen, 
  MapPin,
  LogOut,
  Leaf
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Log Waste', href: '/logging', icon: PlusCircle },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Education', href: '/education', icon: BookOpen },
    { name: 'Local Services', href: '/services', icon: MapPin },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-gray-200">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">EcoTracker</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Level {user?.level} • {user?.points} pts</p>
              </div>
              <button
                onClick={logout}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 ml-64">
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;