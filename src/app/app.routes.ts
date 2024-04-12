import { Routes } from '@angular/router';

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
    path: 'translation/:id',
    loadComponent: () =>
      import('./feature/prj-translation/prj-translation.component').then(
        (m) => m.PrjTranslationComponent
      ),
  },
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
