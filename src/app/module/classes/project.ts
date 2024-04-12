import { Language } from './language';
import { Translation } from './translation';

export interface Project {
  id: number;
  name: string;
  description: string;
  languages: Language[];
  translations: Translation[];
}
