interface CvCanvasProps {
  pdfUrl?: string | null;
  documentTitle?: string;
  onDownload?: () => void;
}

export const CvCanvas = ({ pdfUrl, documentTitle, onDownload }: CvCanvasProps) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
      return;
    }
    if (!pdfUrl) return;
    const cleanTitle = (documentTitle?.trim() || 'CV_Builder').replace(/[^a-zA-Z0-9_-]/g, '_');
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${cleanTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center p-4 lg:p-8 relative bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] bg-fixed z-0">
      
      {pdfUrl && (
        <div className="w-full max-w-[800px] mb-3 flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-700">Previzualizare Document Gata</span>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            className="py-1.5 px-3.5 inline-flex items-center gap-x-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 transition-all"
          >
            <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Descarcă PDF
          </button>
        </div>
      )}

      <div className="w-full max-w-[800px] h-[1050px] bg-white shadow-2xl ring-1 ring-slate-900/5 flex flex-col relative z-10 rounded-sm overflow-hidden transition-all duration-300">
        {pdfUrl ? (
          <iframe 
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
            className="w-full h-full border-0 bg-white"
            title="CV Preview"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-white p-6">
            <div className="p-6 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 mb-6">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-slate-700 tracking-tight">Previzualizare Document</p>
            <p className="text-sm text-slate-500 mt-2 max-w-sm text-center">
              Completează datele în panoul din dreapta, opțional folosește AI pentru a le îmbunătăți, și apasă pe Previzualizare PDF.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};