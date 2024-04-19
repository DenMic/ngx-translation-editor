import { Routes } from '@angular/router';
import { translationsRoutes } from './feature/translations/translations.routes';

export const routes: Routes = [
  {
    path: 'project',
    loadComponent: () =>
      import('./feature/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
  },
  {
    path: 'languages',
    loadComponent: () =>
      import('./feature/languages/languages.component').then(
        (m) => m.LanguagesComponent
      ),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./feature/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
  },

  ...translationsRoutes,
  // {
  //   path: 'translation/:id',
  //   loadComponent: () =>
  //     import('./feature/translations/children/prj-translation/prj-translation.component').then(
  //       (m) => m.PrjTranslationComponent
  //     ),
  // },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full',
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./feature/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
