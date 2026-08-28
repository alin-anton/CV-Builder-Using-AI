interface CvCanvasProps {
  pdfUrl?: string | null;
}

export const CvCanvas = ({ pdfUrl }: CvCanvasProps) => (
  <div className="flex-1 overflow-y-auto bg-slate-100/50 flex justify-center p-6 lg:p-10 relative">
    {/* Textură subtilă de fundal pentru zona de editare */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

    <div className="w-full max-w-[800px] h-[1050px] bg-white shadow-2xl ring-1 ring-slate-900/5 flex flex-col relative z-10 rounded-sm overflow-hidden transition-all duration-300">
      
      {pdfUrl ? (
        <iframe 
          src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
          className="w-full h-full border-0 bg-white"
          title="CV Preview"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-slate-50/50">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 mb-6">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p className="text-xl font-bold text-slate-700 tracking-tight">Previzualizare Document</p>
          <p className="text-sm text-slate-500 mt-2 max-w-sm text-center">Completează datele în panoul din dreapta și generează documentul pentru a vizualiza rezultatul final.</p>
        </div>
      )}

    </div>
  </div>
);