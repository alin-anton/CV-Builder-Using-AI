// Înlocuiește în src/pages/Register.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Parolele nu se potrivesc!");
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await authService.register({ username, email, password });
      navigate('/login'); // Succes! Îl trimitem să se logheze
    } catch (err: any) {
      setError(err.response?.data?.message || 'Eroare la crearea contului. Încearcă alt username.');
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
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Creează Cont</h1>
            <p className="text-sm text-slate-500 mt-2">
              Ai deja un cont? <Link className="text-blue-600 font-semibold hover:underline transition-all" to="/login">Intră aici</Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Utilizator</label>
              <input 
                type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="Alege un nume de utilizator" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-slate-700">Email</label>
              <input 
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                placeholder="adresa@exemplu.ro" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700">Parolă</label>
                <input 
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  placeholder="••••••••" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-slate-700">Confirmă</label>
                <input 
                  type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" disabled={isLoading}
                className="w-full py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                {isLoading ? 'Se creează contul...' : 'Înregistrare'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;