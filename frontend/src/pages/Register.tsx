import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.register({ username, password });
      navigate('/login'); // După creare, îl trimitem să se logheze
    } catch (err) {
      setError('Eroare la crearea contului. Username-ul ar putea fi deja folosit.');
    }
  };

  return (
    <div className="flex h-full items-center justify-center py-16">
      <main className="w-full max-w-md mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">Creează cont</h1>
              <p className="mt-2 text-sm text-gray-600">
                Ai deja un cont? <Link className="text-blue-600 decoration-2 hover:underline font-medium" to="/login">Intră aici</Link>
              </p>
            </div>
            <div className="mt-5">
              {error && <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}
              <form onSubmit={handleRegister} className="grid gap-y-4">
                <div>
                  <label className="block text-sm mb-2">Nume utilizator</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm mb-2">Parolă</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500" required />
                </div>
                <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Înregistrare
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;