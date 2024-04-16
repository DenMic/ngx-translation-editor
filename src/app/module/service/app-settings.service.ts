import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';

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

  setTitleFromTranslation(translation: string): void {
    this.translateService
      .get(translation)
      .pipe(take(1))
      .subscribe({
        next: (val) => {
          this.setTitlePage(val);
        },
      });
  }

  toggleDarkTheme(): void {
    this.sDarkTheme.update((val) => !val);
  }
}
