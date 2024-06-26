import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppSettingsService } from './module/service/app-settings.service';
import { NgClass } from '@angular/common';
import { StorageService } from './module/service/storage.service';
import { Language } from './module/classes/language';
import { defaultLang } from './module/constant/flags';
import { LAYOUT_PAGE, PROJECT_LANG, THEME } from './module/constant/storage';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EdtDropdownComponent } from './share/component/edt-dropdown/edt-dropdown.component';
import { layoutType } from './module/types/custom-types';
import { headerFromMobile } from './module/function/helper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, EdtDropdownComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ngx-translation-editor';
  showMenu = false;

  private readonly storageService = inject(StorageService);
  private readonly translateService = inject(TranslateService);
  protected readonly appSettingsService = inject(AppSettingsService);
  protected readonly router = inject(Router);

  ngOnInit(): void {
    let layout: layoutType = this.storageService.retrieve(LAYOUT_PAGE);
    let lang = this.storageService.retrieveObj<Language>(PROJECT_LANG);
    let theme = this.storageService.retrieve(THEME);

    if (!lang) {
      lang = defaultLang;
      this.storageService.store(PROJECT_LANG, lang);
    }

    if (!theme) {
      theme = 'light';
      this.storageService.store(THEME, theme);
    }

    if (!layout) {
      layout = 'list';
      this.storageService.store(LAYOUT_PAGE, layout);
    }

    this.translateService.use(lang!.fileName);
    this.appSettingsService.setTheme(theme);
    this.appSettingsService.setLayoutPage(layout);
  }

  switchDarkTheme(): void {
    let theme: 'light' | 'dark' = this.appSettingsService.darkTheme()
      ? 'light'
      : 'dark';

    this.storageService.store(THEME, theme);
    this.appSettingsService.setTheme(theme);
  }
}
