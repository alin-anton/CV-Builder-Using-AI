// src/pages/CvBuilder.tsx
import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { MobileToolbar } from '../components/cv/MobileToolbar';
import { PastCvsSidebar } from '../components/cv/PastCvsSidebar';
import { FormSidebar } from '../components/cv/FormSidebar';
import { CvCanvas } from '../components/cv/CvCanvas';
import { cvService } from '../services/cvService';
import type { CvModel } from '../types';

const CvBuilder = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Structura completă inițializată (pentru a evita erori de 'undefined')
  const [cvData, setCvData] = useState<CvModel>({
    jobName: '',
    summary: '',
    personalDetails: {
      firstName: '', lastName: '', phone: '', email: '', city: '',
      languages: [], links: []
    },
    educationDetails: {
      educationalInstutions: [],
      certifications: []
    },
    experiences: [],
    projects: [],
    optionals: []
  });

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    try {
      const url = await cvService.getPreviewUrl(cvData);
      setPdfUrl(url); 
    } catch (error) {
      console.error("Eroare Axios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <MobileToolbar />
        <PastCvsSidebar />
        <CvCanvas pdfUrl={pdfUrl} />
        
        {/* Pasăm cvData și setCvData direct */}
        <FormSidebar 
          cvData={cvData} 
          setCvData={setCvData} 
          onGenerate={handleGeneratePdf}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CvBuilder;