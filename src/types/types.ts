export type FormData = {
  fullName: string;
  titles: string[];
  years: number;
  nacionality: string;
  linksSocialNetworks: Record<string, string>;
  skills: Record<string, string[]>;
  workExperience: Array<{
    title: string;
    company: string;
    date: string;
    modality: string;
    workplace: string;
    country: string;
    description: string[];
    tasks: string[];
    infoLink: string;
  }>;
  aboutMe: string[];
  hobbies: string[];
};
