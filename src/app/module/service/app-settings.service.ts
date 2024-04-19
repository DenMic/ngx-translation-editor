import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, take } from 'rxjs';
import { layoutType } from '../types/custom-types';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private translateService = inject(TranslateService);

  private sLayoutPage = signal<layoutType>('list');
  private sTitlePage = signal<string>('');
  private sDarkTheme = signal<boolean>(false);

  layoutPage = this.sLayoutPage.asReadonly();
  titlePage = this.sTitlePage.asReadonly();
  darkTheme = this.sDarkTheme.asReadonly();

  setLayoutPage(layout: layoutType): void {
    this.sLayoutPage.set(layout);
  }

  setTitlePage(title: string): void {
    this.sTitlePage.set(title);
  }

  setTitleFromTranslation(
    translation: string,
    params: any = undefined
  ): Observable<void> {
    return this.translateService.stream(translation, params).pipe(
      map((val) => {
        this.setTitlePage(val);
      })
    );
  }

  toggleDarkTheme(): void {
    this.sDarkTheme.update((val) => !val);
  }
}
