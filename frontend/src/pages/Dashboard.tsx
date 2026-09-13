import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { userService } from '../services/userService';
import { cvService } from '../services/cvService';
import type { UserDtoResponse } from '../types/UserDtoResponse';
import type { CvModel } from '../types';

const Dashboard = () => {
  const [user, setUser] = useState<UserDtoResponse | null>(null);
  const [myCvs, setMyCvs] = useState<CvModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userData, cvs] = await Promise.all([
          userService.getCurrentUser().catch(() => null),
          cvService.getMyCvs().catch(() => [])
        ]);
        if (userData) setUser(userData);
        if (cvs) setMyCvs(cvs);
      } catch (error) {
        console.error("Eroare la preluarea datelor:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Salut, {user?.username || 'Utilizator'}!
          </h1>
          <p className="text-slate-600 mt-2">Gestionează-ți CV-urile și generează variante profesionale cu AI.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card pentru Creare CV Nou */}
          <Link
            to="/cv-builder"
            className="group flex flex-col justify-center items-center bg-white border-2 border-dashed border-slate-300 shadow-sm rounded-2xl hover:border-blue-600 hover:shadow-md transition-all h-56 p-6 text-center"
          >
            <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <svg className="size-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </div>
            <span className="mt-3 font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Creează CV Nou</span>
            <span className="text-xs text-slate-400 mt-1">Începe de la zero sau importă date noi</span>
          </Link>

          {/* CV-urile salvate */}
          {myCvs.map((cv) => {
            const title = cv.jobName?.trim() || 'CV fără funcție';
            const name = [cv.personalDetails?.firstName, cv.personalDetails?.lastName].filter(Boolean).join(' ');
            const expCount = cv.experiences?.length || 0;
            const skillCount = (cv.hardSkills?.length || 0) + (cv.softSkills?.length || 0);

            return (
              <div
                key={cv.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md hover:border-blue-400 transition-all h-56 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                      Document Salvat
                    </span>
                    <span className="text-xs text-slate-400">{expCount} exp • {skillCount} skills</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mt-3 line-clamp-1" title={title}>
                    {title}
                  </h3>
                  {name && (
                    <p className="text-xs text-slate-500 mt-1">{name}</p>
                  )}
                  {cv.summary && (
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 italic">
                      "{cv.summary}"
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/cv-builder?id=${cv.id}`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    Deschide în Editor →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {!isLoading && myCvs.length === 0 && (
          <div className="mt-8 text-center text-slate-400 text-sm">
            Nu ai creat încă niciun CV. Apasă pe cardul de mai sus pentru a începe!
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;