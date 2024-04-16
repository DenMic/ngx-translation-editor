import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private translateService = inject(TranslateService);

  private sTitlePage = signal<string>('');
  private sDarkTheme = signal<boolean>(false);

  titlePage = this.sTitlePage.asReadonly();
  darkTheme = this.sDarkTheme.asReadonly();

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
