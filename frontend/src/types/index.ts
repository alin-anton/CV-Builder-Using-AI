export interface LanguageObject {
    languageName: string;
    languageLevel: number;
}

export interface LinkObject {
    platform: string;
    link: string;
}

export interface PersonalDetailsObject {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    languages: LanguageObject[];
    links: LinkObject[];
}

export interface CertificationObject {
    certificationName: string;
    description: string;
    skillsAquired: string[];
}

export interface EducationObject {
    institutionName: string;
    educationLevel: string;
    startYear: string;
    finishYear: string;
}

export interface EducationDetailsObject {
    educationalInstutions: EducationObject[];
    certifications: CertificationObject[];
}

export interface ExperienceObject {
    experienceTitle: string;
    location: string;
    descriptions: string[];
    skillsAquired: string[];
    startDate: string;
    finishDate: string;
}

export interface ProjectObject {
    title: string;
    descriptions: string[];
    skillsUsed: string[];
    startDate: string;
    finishDate: string;
}

export interface OptionalObject {
    category: string;
    title: string;
    description: string;
    startDate: string;
    finishDate: string;
}

// Obiectul central care va fi trimis către Controller
export interface CvModel {
    jobName: string;
    summary?: string;
    personalDetails: PersonalDetailsObject;
    educationDetails: EducationDetailsObject;
    experiences: ExperienceObject[];
    projects: ProjectObject[];
    optionals: OptionalObject[];
}