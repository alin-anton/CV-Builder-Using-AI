import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { MobileToolbar } from '../components/cv/MobileToolbar';
import { PastCvsSidebar } from '../components/cv/PastCvsSidebar';
import { FormSidebar } from '../components/cv/FormSidebar';
import { CvCanvas } from '../components/cv/CvCanvas';
import { cvService } from '../services/cvService';
import { userService } from '../services/userService';
import type { CvModel } from '../types';

const createInitialCv = (userEmail = ''): CvModel => ({
  jobName: '',
  summary: '',
  personalDetails: {
    firstName: '',
    lastName: '',
    phone: '',
    email: userEmail,
    city: '',
    languages: [],
    links: []
  },
  educationDetails: {
    educationalInstutions: [],
    certifications: []
  },
  experiences: [],
  projects: [],
  optionals: [],
  softSkills: [],
  hardSkills: []
});

const CvBuilder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [cvList, setCvList] = useState<CvModel[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cvData, setCvData] = useState<CvModel>(createInitialCv());
  const [isPastCvsOpen, setIsPastCvsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Închide panourile pe tasta Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPastCvsOpen(false);
        setIsFormOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Previne derularea paginii când un panou mobil este deschis
  useEffect(() => {
    if (isPastCvsOpen || isFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPastCvsOpen, isFormOpen]);

  const fetchCvHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const list = await cvService.getMyCvs();
      setCvList(list);
      return list;
    } catch (err) {
      console.error("Eroare la încărcarea istoricului de CV-uri:", err);
      return [];
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  // La pornire: încarcă istoricul și datele utilizatorului
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        const user = await userService.getCurrentUser().catch(() => null);
        if (user?.email && isMounted) {
          setCvData(prev => {
            if (!prev.personalDetails?.email) {
              return {
                ...prev,
                personalDetails: { ...prev.personalDetails, email: user.email }
              };
            }
            return prev;
          });
        }

        const list = await fetchCvHistory();
        const idParam = searchParams.get('id');
        if (idParam && list.length > 0 && isMounted) {
          const found = list.find(c => c.id === idParam);
          if (found) {
            setCvData(found);
          }
        }
      } catch (err) {
        console.error("Eroare la inițializare:", err);
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, [fetchCvHistory, searchParams]);

  const sanitizeCvData = (data: CvModel): CvModel => {
    const cleanList = (arr?: string[]) =>
      (arr || []).map(s => (typeof s === 'string' ? s.trim() : '')).filter(Boolean);

    return {
      ...data,
      hardSkills: cleanList(data.hardSkills),
      softSkills: cleanList(data.softSkills),
      experiences: (data.experiences || []).map(exp => ({
        ...exp,
        descriptions: cleanList(exp.descriptions),
        skillsAquired: cleanList(exp.skillsAquired),
      })),
      projects: (data.projects || []).map(proj => ({
        ...proj,
        descriptions: cleanList(proj.descriptions),
        skillsUsed: cleanList(proj.skillsUsed),
      })),
    };
  };

  const handleGeneratePdf = async () => {
    if (!cvData.jobName?.trim()) {
      setErrorMessage('Te rugăm să completezi funcția vizată (Job Name)!');
      return;
    }
    if (!cvData.personalDetails?.firstName?.trim() || !cvData.personalDetails?.lastName?.trim()) {
      setErrorMessage('Te rugăm să completezi prenumele și numele în detaliile personale!');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const sanitized = sanitizeCvData(cvData);

      // 1. Salvează sau actualizează CV-ul în MongoDB
      const savedCv = await cvService.saveCv(sanitized);
      
      // 2. Actualizează starea locală cu noul ID
      setCvData(savedCv);
      setSearchParams({ id: savedCv.id! });

      // 3. Generează PDF-ul instant folosind datele curente
      const pdfBase64 = await cvService.getPreviewUrl(savedCv);
      setPdfUrl(pdfBase64);

      // 4. Reîncarcă lista de CV-uri pentru a reflecta modificarea
      fetchCvHistory();
    } catch (error: any) {
      console.error("Eroare la salvarea sau generarea CV-ului:", error);
      setErrorMessage(
        error.response?.data?.message || 
        'A apărut o eroare la salvarea sau generarea PDF-ului. Te rugăm să încerci din nou.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiEnhance = async () => {
    if (!cvData.jobName?.trim()) {
      setErrorMessage('Te rugăm să completezi funcția vizată (Job Name) înainte de optimizarea AI!');
      return;
    }

    setIsAiLoading(true);
    setErrorMessage(null);
    try {
      const sanitized = sanitizeCvData(cvData);
      const enhanced = await cvService.enhanceWithAi(sanitized);
      setCvData(enhanced);
    } catch (error: any) {
      console.error("Eroare la optimizarea AI:", error);
      setErrorMessage(
        error.response?.data?.message ||
        'Nu s-a putut optimiza CV-ul cu AI. Verifică dacă serviciul AI este disponibil.'
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSelectCv = (selected: CvModel) => {
    setCvData(selected);
    setPdfUrl(null);
    setErrorMessage(null);
    if (selected.id) {
      setSearchParams({ id: selected.id });
    }
  };

  const handleNewCv = () => {
    const currentEmail = cvData.personalDetails?.email || '';
    setCvData(createInitialCv(currentEmail));
    setPdfUrl(null);
    setErrorMessage(null);
    setSearchParams({});
  };

  const handleDeleteCv = async (id: string) => {
    try {
      await cvService.deleteCv(id);
      setCvList(prev => prev.filter(c => c.id !== id));
      if (cvData.id === id) {
        handleNewCv();
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Eroare la ștergerea CV-ului.');
    }
  };

  const handleTogglePastCvs = () => {
    setIsPastCvsOpen(prev => !prev);
    setIsFormOpen(false);
  };

  const handleToggleForm = () => {
    setIsFormOpen(prev => !prev);
    setIsPastCvsOpen(false);
  };

  const handleCloseSidebars = () => {
    setIsPastCvsOpen(false);
    setIsFormOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden relative">
      <Navbar />
      {errorMessage && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2.5 text-sm text-red-700 flex justify-between items-center z-50">
          <span className="font-medium">{errorMessage}</span>
          <button 
            type="button" 
            onClick={() => setErrorMessage(null)} 
            className="text-red-500 hover:text-red-700 font-bold ml-4 text-lg leading-none"
            aria-label="Închide eroarea"
          >
            ×
          </button>
        </div>
      )}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <MobileToolbar 
          onTogglePastCvs={handleTogglePastCvs}
          onToggleForm={handleToggleForm}
          isPastCvsOpen={isPastCvsOpen}
          isFormOpen={isFormOpen}
        />
        <PastCvsSidebar
          cvList={cvList}
          activeCvId={cvData.id}
          onSelectCv={handleSelectCv}
          onNewCv={handleNewCv}
          onDeleteCv={handleDeleteCv}
          isLoadingHistory={isLoadingHistory}
          isOpen={isPastCvsOpen}
          onClose={handleCloseSidebars}
        />
        <CvCanvas 
          pdfUrl={pdfUrl} 
          documentTitle={cvData.jobName || 'CV'} 
        />
        <FormSidebar 
          cvData={cvData} 
          setCvData={setCvData} 
          onGenerate={handleGeneratePdf}
          isLoading={isLoading}
          onAiEnhance={handleAiEnhance}
          isAiLoading={isAiLoading}
          isOpen={isFormOpen}
          onClose={handleCloseSidebars}
        />
      </div>
    </div>
  );
};

export default CvBuilder;