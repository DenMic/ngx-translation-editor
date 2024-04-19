import { Component, inject, signal, viewChild } from '@angular/core';
import { AppSettingsService } from '../../module/service/app-settings.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EdtCardComponent } from '../../share/component/edt-card/edt-card.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Language } from '../../module/classes/language';
import { StorageService } from '../../module/service/storage.service';
import { PROJECT_LANG } from '../../module/constant/storage';
import { flagsLang } from '../../module/constant/flags';
import { EdtDropdownComponent } from '../../share/component/edt-dropdown/edt-dropdown.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    EdtCardComponent,
    EdtDropdownComponent,

    TranslateModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
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
