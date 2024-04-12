export interface Translation {
  id: number;
  global: string;
  items?: ItemTranslation[];
}

export interface ItemTranslation {
  lang?: string;
  value?: string;
  translations?: Translation[];
}
