
// Definición del tipo FormData
export type FormData = {
  fullName: string;
  titles: string[];
  years: number;
  nacionality: string;
  linksSocialNetworks: Record<string, string>;
  skills: Record<string, string[]>; // Cambiar aquí para que sea un Record
};



