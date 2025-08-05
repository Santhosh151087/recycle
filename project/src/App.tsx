import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WasteLogging from './pages/WasteLogging';
import Analytics from './pages/Analytics';
import Community from './pages/Community';
import Education from './pages/Education';
import LocalServices from './pages/LocalServices';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="logging" element={<WasteLogging />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="community" element={<Community />} />
                <Route path="education" element={<Education />} />
                <Route path="services" element={<LocalServices />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;