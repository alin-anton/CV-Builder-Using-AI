import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';
import type { JSX } from 'react/jsx-runtime';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Dacă nu are token, dă-i redirect forțat la /login
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Dacă are, afișează pagina cerută
  return children;
};