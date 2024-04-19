import { Routes } from '@angular/router';

export const translationsRoutes: Routes = [
  {
    path: 'translations',
    loadComponent: () =>
      import('./translations.component').then((m) => m.TranslationsComponent),
    children: [
      {
        path: 'list/:id',
        loadComponent: () =>
          import('./children/prj-translation/prj-translation.component').then(
            (m) => m.PrjTranslationComponent
          ),
      },
      {
        path: 'column/:id',
        loadComponent: () =>
          import(
            './children/column-translations/column-translations.component'
          ).then((m) => m.ColumnTranslationsComponent),
      },
    ],
  },
];
