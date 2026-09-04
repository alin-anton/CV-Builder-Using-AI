import type { Dispatch, SetStateAction } from 'react';
import type { CvModel, EducationObject, ExperienceObject, ProjectObject } from '../../types';

interface FormSidebarProps {
  cvData: CvModel;
  setCvData: Dispatch<SetStateAction<CvModel>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const FormSidebar = ({ cvData, setCvData, onGenerate, isLoading }: FormSidebarProps) => {

  // --- Adăugare ---
  const addEducation = () => {
    setCvData(prev => ({
      ...prev,
      educationDetails: {
        ...prev.educationDetails,
        educationalInstutions: [
          ...prev.educationDetails.educationalInstutions, 
          { institutionName: '', educationLevel: '', startYear: '', finishYear: '' }
        ]
      }
    }));
  };

  const addExperience = () => {
    setCvData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { experienceTitle: '', location: '', descriptions: [], skillsAquired: [], startDate: '', finishDate: '' }]
    }));
  };

  const addProject = () => {
    setCvData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', descriptions: [], skillsUsed: [], startDate: '', finishDate: '' }]
    }));
  };

  // --- Actualizare ---
  const updateEducation = (index: number, field: keyof EducationObject, value: string) => {
    setCvData(prev => {
      const newEdu = [...prev.educationDetails.educationalInstutions];
      newEdu[index] = { ...newEdu[index], [field]: value };
      return { ...prev, educationDetails: { ...prev.educationDetails, educationalInstutions: newEdu } };
    });
  };

  const updateExperience = (index: number, field: keyof ExperienceObject, value: any) => {
    setCvData(prev => {
      const newExp = [...prev.experiences];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experiences: newExp };
    });
  };

  const updateProject = (index: number, field: keyof ProjectObject, value: any) => {
    setCvData(prev => {
      const newProj = [...prev.projects];
      newProj[index] = { ...newProj[index], [field]: value };
      return { ...prev, projects: newProj };
    });
  };

  // --- Ștergere ---
  const removeEducation = (index: number) => {
    setCvData(prev => {
      const newEdu = [...prev.educationDetails.educationalInstutions];
      newEdu.splice(index, 1);
      return { ...prev, educationDetails: { ...prev.educationDetails, educationalInstutions: newEdu } };
    });
  };

  const removeExperience = (index: number) => {
    setCvData(prev => {
      const newExp = [...prev.experiences];
      newExp.splice(index, 1);
      return { ...prev, experiences: newExp };
    });
  };

  const removeProject = (index: number) => {
    setCvData(prev => {
      const newProj = [...prev.projects];
      newProj.splice(index, 1);
      return { ...prev, projects: newProj };
    });
  };

  return (
    <div id="form-drawer" className="hs-overlay hs-overlay-open:translate-x-0 translate-x-full transition-transform duration-300 transform hidden fixed top-0 end-0 bottom-0 z-[100] w-80 lg:w-96 bg-white border-s border-slate-200 lg:block lg:translate-x-0 lg:static lg:z-0 lg:shrink-0 shadow-2xl lg:shadow-none">
      <div className="flex flex-col h-full">
        
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <button 
            type="button" onClick={onGenerate} disabled={isLoading}
            className="w-full py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isLoading ? 'Se procesează...' : 'Previzualizare PDF'}
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 space-y-4 pb-20">
          
          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden" open>
            <summary className="font-semibold text-slate-800 p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              Informații de Bază
            </summary>
            <div className="p-4 space-y-4 border-t border-slate-200">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Funcție vizată (Job Name)</label>
                <input 
                  type="text" value={cvData.jobName}
                  onChange={e => setCvData(prev => ({ ...prev, jobName: e.target.value }))}
                  className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Prenume</label>
                  <input 
                    type="text" value={cvData.personalDetails.firstName}
                    onChange={e => setCvData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, firstName: e.target.value } }))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Nume</label>
                  <input 
                    type="text" value={cvData.personalDetails.lastName}
                    onChange={e => setCvData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, lastName: e.target.value } }))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
              </div>
              <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                  <input 
                    type="email" value={cvData.personalDetails.email}
                    onChange={e => setCvData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, email: e.target.value } }))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Telefon</label>
                  <input 
                    type="text" value={cvData.personalDetails.phone}
                    onChange={e => setCvData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, phone: e.target.value } }))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Oraș</label>
                  <input 
                    type="text" value={cvData.personalDetails.city}
                    onChange={e => setCvData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, city: e.target.value } }))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                  />
                </div>
              </div>
            </div>
          </details>

          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="font-semibold text-slate-800 p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              Educație ({cvData.educationDetails.educationalInstutions.length})
            </summary>
            <div className="p-4 space-y-4 border-t border-slate-200 bg-slate-50/50">
              {cvData.educationDetails.educationalInstutions.map((edu, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Instituția #{idx + 1}</span>
                    <button type="button" onClick={() => removeEducation(idx)} className="text-slate-400 hover:text-red-500 transition-colors focus:outline-none" aria-label="Șterge">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <input 
                    type="text" placeholder="Instituție (ex: UPB)" value={edu.institutionName}
                    onChange={e => updateEducation(idx, 'institutionName', e.target.value)}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                  />
                  <input 
                    type="text" placeholder="Nivel (ex: Licență ETTI)" value={edu.educationLevel}
                    onChange={e => updateEducation(idx, 'educationLevel', e.target.value)}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" placeholder="An Start" value={edu.startYear}
                      onChange={e => updateEducation(idx, 'startYear', e.target.value)}
                      className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                    />
                    <input 
                      type="text" placeholder="An Final" value={edu.finishYear}
                      onChange={e => updateEducation(idx, 'finishYear', e.target.value)}
                      className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addEducation} className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-200 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                + Adaugă Educație
              </button>
            </div>
          </details>

          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="font-semibold text-slate-800 p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              Experiență ({cvData.experiences.length})
            </summary>
            <div className="p-4 space-y-4 border-t border-slate-200 bg-slate-50/50">
              {cvData.experiences.map((exp, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Experiența #{idx + 1}</span>
                    <button type="button" onClick={() => removeExperience(idx)} className="text-slate-400 hover:text-red-500 transition-colors focus:outline-none" aria-label="Șterge">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <input 
                    type="text" placeholder="Funcție / Titlu" value={exp.experienceTitle}
                    onChange={e => updateExperience(idx, 'experienceTitle', e.target.value)}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm font-medium focus:border-blue-500" 
                  />
                  <input 
                    type="text" placeholder="Locație / Companie" value={exp.location}
                    onChange={e => updateExperience(idx, 'location', e.target.value)}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" placeholder="Start (ex: Ian 2023)" value={exp.startDate}
                      onChange={e => updateExperience(idx, 'startDate', e.target.value)}
                      className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                    />
                    <input 
                      type="text" placeholder="Prezent" value={exp.finishDate}
                      onChange={e => updateExperience(idx, 'finishDate', e.target.value)}
                      className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                    />
                  </div>
                  <textarea 
                    placeholder="Descriere (separă ideile prin virgulă)" 
                    value={exp.descriptions.join(', ')}
                    onChange={e => updateExperience(idx, 'descriptions', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" rows={2}
                  />
                  <input 
                    type="text" placeholder="Skill-uri (ex: Java, Spring)" value={exp.skillsAquired.join(', ')}
                    onChange={e => updateExperience(idx, 'skillsAquired', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                  />
                </div>
              ))}
              <button type="button" onClick={addExperience} className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-200 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                + Adaugă Experiență
              </button>
            </div>
          </details>

          <details className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
            <summary className="font-semibold text-slate-800 p-4 cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              Proiecte ({cvData.projects.length})
            </summary>
            <div className="p-4 space-y-4 border-t border-slate-200 bg-slate-50/50">
              {cvData.projects.map((proj, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg space-y-3 relative shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Proiectul #{idx + 1}</span>
                    <button type="button" onClick={() => removeProject(idx)} className="text-slate-400 hover:text-red-500 transition-colors focus:outline-none" aria-label="Șterge">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <input 
                    type="text" placeholder="Nume Proiect" value={proj.title}
                    onChange={e => updateProject(idx, 'title', e.target.value)}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm font-medium focus:border-blue-500" 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" placeholder="Start" value={proj.startDate}
                      onChange={e => updateProject(idx, 'startDate', e.target.value)}
                      className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                    />
                    <input 
                      type="text" placeholder="Final" value={proj.finishDate}
                      onChange={e => updateProject(idx, 'finishDate', e.target.value)}
                      className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                    />
                  </div>
                  <textarea 
                    placeholder="Descriere (separă prin virgulă)" 
                    value={proj.descriptions.join(', ')}
                    onChange={e => updateProject(idx, 'descriptions', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" rows={2}
                  />
                  <input 
                    type="text" placeholder="Tehnologii (ex: React, Node)" value={proj.skillsUsed.join(', ')}
                    onChange={e => updateProject(idx, 'skillsUsed', e.target.value.split(',').map(s => s.trim()))}
                    className="w-full py-2 px-3 border border-slate-200 rounded-md text-sm focus:border-blue-500" 
                  />
                </div>
              ))}
              <button type="button" onClick={addProject} className="w-full py-2 text-sm font-medium text-blue-600 border border-blue-200 bg-white rounded-lg hover:bg-blue-50 transition-colors">
                + Adaugă Proiect
              </button>
            </div>
          </details>

        </div>
      </div>
    </div>
  );
};