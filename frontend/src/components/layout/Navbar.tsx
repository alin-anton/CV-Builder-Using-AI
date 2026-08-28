import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 text-sm py-3 transition-all">
      <nav className="max-w-[100rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between">
          <Link className="flex-none text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight" to="/dashboard">
            CV Builder AI
          </Link>
        </div>
        <div className="flex flex-row items-center gap-6 mt-2 sm:mt-0">
          <Link className="font-medium text-slate-600 hover:text-blue-600 transition-colors" to="/dashboard">Dashboard</Link>
          <Link className="font-medium text-slate-600 hover:text-blue-600 transition-colors" to="/cv-builder">Editor CV</Link>
          <button onClick={handleLogout} className="font-medium text-slate-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-md hover:bg-red-50">
            Deconectare
          </button>
        </div>
      </nav>
    </header>
  );
};