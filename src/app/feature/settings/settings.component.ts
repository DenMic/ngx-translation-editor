import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { AppSettingsService } from '../../module/service/app-settings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EdtCardComponent } from '../../share/component/edt-card/edt-card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from '../../module/classes/language';
import { StorageService } from '../../module/service/storage.service';
import {
  LAYOUT_PAGE,
  PROJECT_LANG,
  THEME,
} from '../../module/constant/storage';
import { flagsLang } from '../../module/constant/flags';
import { EdtDropdownComponent } from '../../share/component/edt-dropdown/edt-dropdown.component';
import { NgClass } from '@angular/common';
import { layoutType } from '../../module/types/custom-types';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgClass, EdtCardComponent, EdtDropdownComponent, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  dropFlags = viewChild(EdtDropdownComponent);

  protected appSettingsService = inject(AppSettingsService);

  applicationLanguage = signal<Language | undefined>(undefined);
  private readonly storageService = inject(StorageService);
  private readonly translateService = inject(TranslateService);

  protected readonly flagsLang = flagsLang;

  private readonly titleSubsciber = this.appSettingsService
    .setTitleFromTranslation('SETTINGS.TITLE_PAGE')
    .pipe(takeUntilDestroyed())
    .subscribe();

  private readonly layoutEffect = effect(() => {
    this.storageService.store(
      LAYOUT_PAGE,
      this.appSettingsService.layoutPage()
    );
  });

  ngOnInit(): void {
    let layout: layoutType = this.storageService.retrieve(LAYOUT_PAGE);
    let theme = this.storageService.retrieve(THEME);
    let lang = this.storageService.retrieveObj<Language>(PROJECT_LANG);

    if (!layout) {
      layout = 'list';
      this.storageService.store(LAYOUT_PAGE, layout);
    }

    if (!lang) {
      lang = flagsLang[0];
      this.storageService.store(PROJECT_LANG, lang);
    }

    if (!theme) {
      theme = 'light';
      this.storageService.store(THEME, theme);
    }

    this.applicationLanguage.set(lang);
    this.translateService.use(lang.fileName);
    this.appSettingsService.setLayoutPage(layout);
    this.appSettingsService.setTheme(theme);
  }

  selectLanguage(lang: Language): void {
    this.storageService.store(PROJECT_LANG, lang);
    this.applicationLanguage.set(lang);
    this.translateService.use(lang.fileName);

    this.dropFlags()?.close();
  }

  switchDarkTheme(): void {
    let theme: 'light' | 'dark' = this.appSettingsService.darkTheme()
      ? 'light'
      : 'dark';

    this.storageService.store(THEME, theme);
    this.appSettingsService.setTheme(theme);
  }
}
