import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "preline";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CvBuilder from './pages/CvBuilder';

declare global {
  interface Window {
    HSStaticMethods: {
      autoInit: () => void;
    };
  }
}

const PrelineInit = () => {
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <PrelineInit />
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Routes>
          {/* Rute Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rute Aplicație */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cv-builder" element={<CvBuilder />} />
          
          {/* Redirect automat - poți alege să meargă spre dashboard sau direct în editor */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;