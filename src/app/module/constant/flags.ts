import { Language } from '../classes/language';

export const flagsLang: Language[] = [
  {
    description: 'ITALY',
    flagName: 'it',
    fileName: 'it',
  },
  {
    description: 'ENGLAND',
    flagName: 'gb-eng',
    fileName: 'en',
  },
  {
    description: 'GERMANI',
    flagName: 'de',
    fileName: 'de',
  },
  {
    description: 'SPAIN',
    flagName: 'es',
    fileName: 'es',
  },
  {
    description: 'FRANCE',
    flagName: 'fr',
    fileName: 'fr',
  },
  {
    description: 'SLOVENIA',
    flagName: 'si',
    fileName: 'si',
  },
];

export const defaultLang: Language = {
  description: 'ENGLAND',
  flagName: 'gb-eng',
  fileName: 'en',
};
