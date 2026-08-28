// Înlocuiește în src/pages/Login.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // resetăm eroarea la o nouă încercare
    
    try {
      await authService.login(username, password);
      navigate('/dashboard'); // Succes! Mergem la dashboard
    } catch (err: any) {
      // Afișăm o eroare generică sau mesajul din backend
      setError(err.response?.data?.message || 'Date de autentificare incorecte!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="w-full max-w-md z-10 p-6">
        <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-slate-900/5 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Bine ai revenit</h1>
            <p className="text-sm text-slate-500 mt-2">
              Nu ai cont încă? <Link className="text-blue-600 font-semibold hover:underline transition-all" to="/register">Înregistrează-te</Link>
            </p>
          </div>

          {/* Afișare eroare */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Utilizator</label>
              <input 
                type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="Introdu numele de utilizator" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Parolă</label>
              <input 
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="••••••••" 
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit" disabled={isLoading}
                className="w-full py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                {isLoading ? 'Se autentifică...' : 'Autentificare'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;