export const PastCvsSidebar = () => (
  <div
    id="past-cvs-drawer"
    className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-transform duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-72 bg-slate-50 border-e border-slate-200 lg:block lg:translate-x-0 lg:static lg:z-0 lg:shrink-0"
  >
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center py-4 px-5 border-b border-slate-200 lg:hidden">
        <h3 className="font-semibold text-slate-800">Istoric CV-uri</h3>
        <button type="button" className="size-8 inline-flex justify-center items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors" data-hs-overlay="#past-cvs-drawer">
          <span className="sr-only">Close</span>
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div className="p-5 overflow-y-auto h-full space-y-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Documente Recente</p>
        </div>
        
        <div className="group p-4 bg-white border border-slate-200 rounded-xl shadow-sm cursor-pointer hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h4 className="font-semibold text-slate-800 line-clamp-1">CV Practică Anul 3 ETTI</h4>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Editare activă
            </p>
        </div>
      </div>
    </div>
  </div>
);