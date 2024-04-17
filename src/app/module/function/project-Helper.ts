import { Language } from '../classes/language';
import { Translation } from '../classes/translation';

export function findTranslationById(
  translations: Translation[],
  translationId: number
): Translation | undefined {
  for (let index = 0; index < translations.length; index++) {
    const translation = translations[index];
    if (translation.id == translationId) {
      return translation;
    }

    if (translation.translation == undefined) {
      continue;
    }

    const subTranslation = findTranslationById(
      translation.translation,
      translationId
    );

    if (subTranslation) return subTranslation;
  }

  return undefined;
}

export function getMaxIdTranslations(translations: Translation[]): number {
  let maxId = 0;

  translations.forEach((x) => {
    if (x.id > maxId) maxId = x.id;

    if (x.translation && x.translation.length > 0) {
      const subMaxId = getMaxIdTranslations(x.translation);
      if (subMaxId > maxId) maxId = subMaxId;
    }
  });

  return maxId;
}

export function sortTranslationsByGlobal(
  translation: Translation[]
): Translation[] {
  const sortTranslations = translation.sort(function (a, b) {
    if (a.global < b.global) {
      return -1;
    }
    if (a.global > b.global) {
      return 1;
    }
    return 0;
  });

  for (let index = 0; index < sortTranslations.length; index++) {
    const element = sortTranslations[index];
    if (element.translation && element.translation.length > 0)
      element.translation = sortTranslationsByGlobal(element.translation);
  }

  return sortTranslations;
}

export function filterTranslations(
  searchValue: string,
  translations: Translation[]
): Translation[] {
  const filtered: Translation[] = [];

  for (let index = 0; index < translations.length; index++) {
    let parentCheck = false;
    const translation = translations[index];

    if (translation.translation) {
      parentCheck = true;
      translation.translation = filterTranslations(
        searchValue,
        translation.translation
      );
    }

    if (translation.translation && translation.translation.length > 0) {
      filtered.push(translation);
      continue;
    }

    if (parentCheck && translation.translation?.length == 0) {
      continue;
    }

    if (translation.global.indexOf(searchValue) > -1)
      filtered.push(translation);
  }

  return filtered;
}

export function createTranslationsFromObj(
  obj: any,
  selectedLang: Language,
  languages: Language[],
  id: number = 1
): Translation[] {
  const translations: Translation[] = [];

  for (let prop in obj) {
    let translation = {} as Translation;
    let subTranslations: Translation[] | undefined = undefined;
    const propValue = obj[prop];

    translation.id = id;
    translation.global = prop;

    if (typeof propValue == 'object') {
      id += 1;

      subTranslations = createTranslationsFromObj(
        propValue,
        selectedLang,
        languages,
        id
      );

      id = Math.max(...subTranslations.map((x) => x.id));
    }

    if (subTranslations) {
      translation.translation = subTranslations;
    } else {
      translation.items = [];

      //generate items
      for (let index = 0; index < languages.length; index++) {
        const element = languages[index];
        translation.items.push({
          lang: element.flagName,
          value:
            selectedLang.flagName == element.flagName ? propValue : undefined,
        });
      }
    }

    translations.push(translation);
    id += 1;
  }

  return translations;
}
