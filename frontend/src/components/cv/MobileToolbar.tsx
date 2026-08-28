export const MobileToolbar = () => (
  <div className="lg:hidden flex items-center justify-between bg-white p-3 border-b border-slate-200 shrink-0 shadow-sm z-10">
    <button
      type="button"
      className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
      data-hs-overlay="#past-cvs-drawer"
    >
      <svg className="shrink-0 size-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      Istoric
    </button>
    <button
      type="button"
      className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all"
      data-hs-overlay="#form-drawer"
    >
      Formular
      <svg className="shrink-0 size-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
);