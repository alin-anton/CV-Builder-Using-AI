import type { EducationObject } from "../education/EducationObject";
import type { CertificationObject } from "../education/CertificationObject";


export interface EducationDetailsObject {
    educationalInstutions: EducationObject[];
    certifications: CertificationObject[];
}