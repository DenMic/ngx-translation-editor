import { ddType, popType } from './comunication-type';

export interface Comunication {
  comunicationType: ddType | popType;
  target?: HTMLElement;
}
