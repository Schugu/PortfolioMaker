// src/types/formTypes.ts

import { FieldError } from "react-hook-form";

export type FormData = {
  fullName: string;
  titles: string[];
  years: number;
  nacionality: string;
};

export interface TitleInputErrors {
  titles?: FieldError[]; 
}
