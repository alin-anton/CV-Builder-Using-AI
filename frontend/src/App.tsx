import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Importăm scriptul Preline direct (fără /preline la final)
import "preline";

type IStaticMethods = {
  autoInit: () => void;
};

// Spunem TypeScript-ului că există această funcție globală
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

// O componentă care se ocupă de reinițializarea Preline la schimbarea paginii
const PrelineInit = () => {
  const location = useLocation();

  useEffect(() => {
    // Adăugăm un mic delay (setTimeout) pentru a ne asigura că DOM-ul este încărcat complet
    // înainte ca Preline să încerce să atașeze scripturile
    setTimeout(() => {
      if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, [location.pathname]);

  return null;
};

// Componente placeholder
const Login = () => (
  <div className="p-10">
    <h2 className="text-2xl font-bold mb-4">Testează Preline UI</h2>
    {/* Un buton de test cu clase de la Preline */}
    <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
      Buton Preline
    </button>
  </div>
);

const Register = () => <div className="p-10 text-2xl font-bold">Aici va fi formularul de Register</div>;
const Dashboard = () => <div className="p-10 text-2xl font-bold text-blue-600">CV Builder Dashboard - Doar pt useri logați</div>;

function App() {
  return (
    <Router>
      <PrelineInit /> {/* Adăugăm componenta aici, în interiorul Router-ului */}
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;