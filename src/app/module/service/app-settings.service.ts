import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private sTitlePage = signal<string>('');
  private sDarkTheme = signal<boolean>(false);

  titlePage = this.sTitlePage.asReadonly();
  darkTheme = this.sDarkTheme.asReadonly();

  setTitlePage(title: string): void {
    this.sTitlePage.set(title);
  }

  toggleDarkTheme(): void {
    this.sDarkTheme.update((val) => !val);
  }
}
