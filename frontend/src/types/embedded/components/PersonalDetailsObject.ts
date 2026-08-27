import type { LanguageObject } from "../personal/LanguageObject";
import type { LinkObject } from "../personal/LinkObject";

export interface PersonalDetailsObject {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    languages: LanguageObject[];
    links: LinkObject[];
}