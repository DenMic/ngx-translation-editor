import { ExportObj } from '../classes/exportObj';
import { Language } from '../classes/language';
import { Translation } from '../classes/translation';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

export function findTranslationByGlobal(
  translations: Translation[],
  global: string
): Translation | undefined {
  for (let index = 0; index < translations.length; index++) {
    const translation = translations[index];
    if (translation.global.toUpperCase() == global.toUpperCase()) {
      return translation;
    }

    if (translation.translation == undefined) {
      continue;
    }

    const subTranslation = findTranslationByGlobal(
      translation.translation,
      global
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

    if (
      translation.global.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    )
      filtered.push(translation);
  }

  return filtered;
}

export function updateTranslationsFromObj(
  oldTranslations: Translation[],
  obj: any,
  selectedLang: Language,
  languages: Language[],
  parentTranslations?: Translation[]
): Translation[] {
  const translations: Translation[] = [];
  let maxId = getMaxIdTranslations(oldTranslations) + 1;

  for (let prop in obj) {
    const propValue = obj[prop];
    const searchTranslation = parentTranslations ?? oldTranslations;
    let translation = findTranslationByGlobal(searchTranslation, prop);

    if (typeof propValue == 'object') {
      updateTranslationsFromObj(
        searchTranslation,
        propValue,
        selectedLang,
        languages,
        translation?.translation
      );

      const newMaxId = getMaxIdTranslations(searchTranslation);
      if (maxId != newMaxId) {
        maxId = newMaxId + 1;
      }
    }

    if (translation) {
      if (translation.translation && translation.translation.length > 0) {
        continue;
      }

      const items = translation.items?.find(
        (x) => x.lang == selectedLang.flagName
      );
      if (items) {
        items.value = propValue;
      } else {
        translation.items?.push({
          lang: selectedLang.flagName,
          value: propValue,
        });
      }
    } else {
      translation = { id: maxId, global: prop };

      CreateItemsForTranslation(
        translation,
        languages,
        selectedLang,
        propValue
      );

      searchTranslation.push(translation);
      maxId += 1;
    }
  }

  return translations;
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
      CreateItemsForTranslation(
        translation,
        languages,
        selectedLang,
        propValue
      );
    }

    translations.push(translation);
    id += 1;
  }

  return translations;
}

export function exportAllTranslations(
  translations: Translation[] | undefined,
  languages: Language[] | undefined
): ExportObj[] {
  const objs: ExportObj[] = [];

  if (languages) {
    for (let index = 0; index < languages.length; index++) {
      const lang = languages[index];
      const obj = exportTranslations(translations, lang);

      objs.push({
        obj: obj,
        lang: lang,
      });
    }
  }

  return objs;
}

export function exportTranslations(
  translations: Translation[] | undefined,
  lang: Language | undefined
): any {
  const obj: any = {};
  if (translations && lang) {
    for (let index = 0; index < translations.length; index++) {
      const element = translations[index];

      if (element.translation && element.translation.length > 0) {
        obj[element.global] = exportTranslations(element.translation, lang);
      } else {
        obj[element.global] = element.items?.find(
          (x) => x.lang == lang.flagName
        )?.value;
      }
    }
  } else {
    return undefined;
  }

  return obj;
}

export function zipAndDownloadTranslationJson(exportObj: ExportObj[]): void {
  const zip: JSZip = new (<any>JSZip).default();

  for (let index = 0; index < exportObj.length; index++) {
    const element = exportObj[index];
    const fileName = element.lang.fileName + '.json';
    const sJson = JSON.stringify(element.obj);

    zip.file(fileName, sJson);
  }
  zip.generateAsync({ type: 'blob' }).then(function (content: any) {
    saveAs(content, 'translation.zip');
  });
}

export function downloadTranslationJson(
  myJson: any,
  lang: Language | undefined
): void {
  if (myJson && lang) {
    const sJson = JSON.stringify(myJson);
    downloadFile(
      encodeURIComponent(sJson),
      `${lang.fileName}.json`,
      'text/json'
    );
  }
}

export function downloadFile(content: any, fileName: string, dataType: string) {
  const element = document.createElement('a');
  element.setAttribute('href', `data:${dataType};charset=UTF-8,` + content);
  element.setAttribute('download', fileName);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click(); // simulate click
  document.body.removeChild(element);
}

function CreateItemsForTranslation(
  translation: Translation,
  languages: Language[],
  selectedLang: Language,
  propValue: any
) {
  translation.items = [];

  //generate items
  for (let index = 0; index < languages.length; index++) {
    const element = languages[index];
    translation.items.push({
      lang: element.flagName,
      value: selectedLang.flagName == element.flagName ? propValue : undefined,
    });
  }
}

export function addLanguageToTranslation(
  translations: Translation[],
  newLang: Language
): void {
  for (let index = 0; index < translations.length; index++) {
    const element = translations[index];

    if (element.translation && element.translation.length > 0) {
      addLanguageToTranslation(element.translation, newLang);
    } else {
      element.items?.push({
        lang: newLang?.flagName,
        value: undefined,
      });
    }
  }
}
