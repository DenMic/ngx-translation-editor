import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppSettingsService } from './module/service/app-settings.service';
import { NgClass } from '@angular/common';
import { StorageService } from './module/service/storage.service';
import { Language } from './module/classes/language';
import { flagsLang } from './module/constant/flags';
import { PROJECT_LANG } from './module/constant/storage';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EdtDropdownComponent } from './share/component/edt-dropdown/edt-dropdown.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass, EdtDropdownComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  dropFlags = viewChild(EdtDropdownComponent);
  title = 'ngx-translation-editor';

  applicationLanguage = signal<Language | undefined>(undefined);

  private readonly storageService = inject(StorageService);
  private readonly translateService = inject(TranslateService);
  protected readonly appSettingsService = inject(AppSettingsService);
  protected readonly router = inject(Router);

  protected readonly flagsLang = flagsLang;

  ngOnInit(): void {
    let lang = this.storageService.retrieveObj<Language>(PROJECT_LANG);

    if (!lang) {
      lang = flagsLang[0];
      this.storageService.store(PROJECT_LANG, lang);
    }

    this.applicationLanguage.set(lang);
    this.translateService.use(lang.fileName);
  }

  selectLanguage(lang: Language): void {
    this.storageService.store(PROJECT_LANG, lang);
    this.applicationLanguage.set(lang);
    this.translateService.use(lang.fileName);

    this.dropFlags()?.close();
  }
}
