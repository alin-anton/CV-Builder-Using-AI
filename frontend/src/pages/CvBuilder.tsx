// src/pages/CvBuilder.tsx
import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { MobileToolbar } from '../components/cv/MobileToolbar';
import { PastCvsSidebar } from '../components/cv/PastCvsSidebar';
import { FormSidebar } from '../components/cv/FormSidebar';
import { CvCanvas } from '../components/cv/CvCanvas';

const CvBuilder = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleSimulatePdfGeneration = () => {
    setPdfUrl("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");
  };

  return (
    // Părintele ocupă tot ecranul (h-screen)
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      
      {/* Bara de navigație sus (nu se redimensionează) */}
      <Navbar />

      {/* Zona de lucru (ocupă restul spațiului cu flex-1) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <MobileToolbar />
        <PastCvsSidebar />
        <CvCanvas pdfUrl={pdfUrl} />
        <FormSidebar onGenerate={handleSimulatePdfGeneration} />
      </div>
      
    </div>
  );
};

export default CvBuilder;