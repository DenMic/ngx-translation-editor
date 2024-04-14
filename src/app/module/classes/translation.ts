export interface Translation {
  id: number;
  global: string;
  items?: ItemTranslation[];
  translation?: Translation[];
}

export interface ItemTranslation {
  lang?: string;
  value?: string;
}
