import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { userService } from '../services/userService';
import type { UserDtoResponse } from '../types/UserDtoResponse';

const Dashboard = () => {
  const [user, setUser] = useState<UserDtoResponse | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Salut, {user?.username || 'Utilizator'}!
          </h1>
          <p className="text-gray-600 mt-2">Gestionează-ți CV-urile și generează noi variante cu AI.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card pentru Creare CV Nou */}
          <Link to="/cv-builder" className="group flex flex-col justify-center items-center bg-white border-2 border-dashed border-gray-300 shadow-sm rounded-xl hover:border-blue-600 hover:shadow-md transition h-52">
            <svg className="size-10 text-gray-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            <span className="mt-2 text-sm font-medium text-gray-600 group-hover:text-blue-600">Creează CV Nou</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;