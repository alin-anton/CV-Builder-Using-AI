import type { PersonalDetailsObject } from "./embedded/components/PersonalDetailsObject";
import type { EducationObject } from "./embedded/education/EducationObject";
import type { ExperienceObject } from "./embedded/ExperienceObject";
import type { OptionalObject } from "./embedded/OptionalObject";
import type { ProjectObject } from "./embedded/ProjectObject";

export interface CvModel {
    id: string;

    //personal details
    personalDetails: PersonalDetailsObject;

    jobName: string;

    //projects, skills, summary
    softSkills: string[];
    hardSkills: string[];
    projects: ProjectObject[];

    //education
    education: EducationObject[];

    //experience
    experience: ExperienceObject[];

    //optional sections 
    optionalInformation: OptionalObject[];

}