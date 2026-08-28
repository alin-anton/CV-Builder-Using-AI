import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import "preline";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CvBuilder from './pages/CvBuilder';
import { ProtectedRoute } from './components/ProtectedRoute';

declare global {
  interface Window { HSStaticMethods: { autoInit: () => void; }; }
}

const PrelineInit = () => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      if (window.HSStaticMethods) window.HSStaticMethods.autoInit();
    }, 100);
  }, [location.pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <PrelineInit />
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
        <Routes>
          {/* Rute publice */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rute protejate (accesibile DOAR după login) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cv-builder" 
            element={
              <ProtectedRoute>
                <CvBuilder />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect by default către dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;