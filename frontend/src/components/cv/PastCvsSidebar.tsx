import type { CvModel } from '../../types';

interface PastCvsSidebarProps {
  cvList: CvModel[];
  activeCvId?: string;
  onSelectCv: (cv: CvModel) => void;
  onNewCv: () => void;
  onDeleteCv: (id: string) => void;
  isLoadingHistory?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const PastCvsSidebar = ({
  cvList,
  activeCvId,
  onSelectCv,
  onNewCv,
  onDeleteCv,
  isLoadingHistory = false,
  isOpen = false,
  onClose
}: PastCvsSidebarProps) => {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm("Ești sigur că vrei să ștergi acest CV?")) {
      onDeleteCv(id);
    }
  };

  const handleSelect = (cv: CvModel) => {
    onSelectCv(cv);
    onClose?.();
  };

  const handleNew = () => {
    onNewCv();
    onClose?.();
  };

  return (
    <>
      {/* Backdrop pentru mobil */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <div
        id="past-cvs-drawer"
        className={`fixed top-0 start-0 bottom-0 z-[60] w-72 bg-slate-50 border-e border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 lg:shrink-0 flex flex-col ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center py-4 px-5 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">Istoric CV-uri</h3>
            <button
              type="button"
              onClick={onClose}
              className="size-8 inline-flex justify-center items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors lg:hidden"
              aria-label="Închide panoul de istoric"
            >
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          <div className="p-4 border-b border-slate-200 bg-white">
            <button
              type="button"
              onClick={handleNew}
              className="w-full py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
              + Creează CV Nou
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-full space-y-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Documentele Tale</p>
              <span className="text-xs text-slate-400 font-mono">{cvList.length}</span>
            </div>

          {isLoadingHistory ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              <span className="inline-block animate-spin size-4 border-2 border-current border-t-transparent rounded-full mb-2"></span>
              <p>Se încarcă istoricul...</p>
            </div>
          ) : cvList.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              <p className="font-medium">Nu ai niciun CV salvat.</p>
              <p className="mt-1">Completează formularul și generează primul document!</p>
            </div>
          ) : (
            cvList.map((cv) => {
              const isActive = cv.id === activeCvId;
              const title = cv.jobName?.trim() || 'CV fără funcție';
              const name = [cv.personalDetails?.firstName, cv.personalDetails?.lastName].filter(Boolean).join(' ');

              return (
                <div
                  key={cv.id}
                  onClick={() => handleSelect(cv)}
                  className={`group p-3.5 bg-white border rounded-xl shadow-sm cursor-pointer transition-all duration-200 relative overflow-hidden ${
                    isActive
                      ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/20'
                      : 'border-slate-200 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <div
                    className={`absolute top-0 left-0 w-1 h-full bg-blue-500 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  ></div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-slate-800 truncate" title={title}>
                        {title}
                      </h4>
                      {name && (
                        <p className="text-xs text-slate-600 truncate mt-0.5">
                          {name}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <span className={`size-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                        {isActive ? 'Editare activă' : 'Salvat'}
                      </p>
                    </div>

                    {cv.id && (
                      <button
                        type="button"
                        onClick={(e) => handleDelete(e, cv.id!)}
                        className="text-slate-300 hover:text-red-500 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Șterge CV"
                        aria-label="Șterge CV"
                      >
                        <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
    </>
  );
};