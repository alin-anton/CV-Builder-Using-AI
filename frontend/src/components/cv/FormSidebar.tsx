interface FormSidebarProps {
  onGenerate?: () => void;
}

export const FormSidebar = ({ onGenerate }: FormSidebarProps) => (
  <div
    id="form-drawer"
    className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full transition-transform duration-300 transform hidden fixed top-0 end-0 bottom-0 z-[60] w-80 bg-white border-s border-slate-200 lg:block lg:translate-x-0 lg:static lg:z-0 lg:shrink-0 shadow-2xl lg:shadow-none"
  >
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center py-4 px-5 border-b border-slate-200 lg:hidden">
        <h3 className="font-semibold text-slate-800">Editează Datele</h3>
        <button type="button" className="size-8 inline-flex justify-center items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors" data-hs-overlay="#form-drawer">
          <span className="sr-only">Close</span>
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      <div className="p-5 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-5 tracking-tight">Date Personale</h2>
        <form className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1.5 text-slate-700">Nume complet</label>
            <input type="text" id="firstName" className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400" placeholder="Ex: Popescu Ion" />
          </div>
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium mb-1.5 text-slate-700">Funcție vizată</label>
            <input type="text" id="jobTitle" className="py-2.5 px-4 block w-full border-slate-200 rounded-lg text-sm bg-slate-50 border focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400" placeholder="Ex: Software Engineer Intern" />
          </div>
          
          <div className="pt-2">
            <button 
              type="button" 
              onClick={onGenerate}
              className="w-full py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-blue-600/20 active:scale-[0.98] transition-all"
            >
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
              Generează PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);