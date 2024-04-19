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
  title = 'ngx-translation-editor';

  private readonly storageService = inject(StorageService);
  private readonly translateService = inject(TranslateService);
  protected readonly appSettingsService = inject(AppSettingsService);
  protected readonly router = inject(Router);

  ngOnInit(): void {
    let lang = this.storageService.retrieveObj<Language>(PROJECT_LANG);

    if (!lang) {
      lang = flagsLang[0];
      this.storageService.store(PROJECT_LANG, lang);
    }

    this.translateService.use(lang.fileName);
  }
}
