import { Component, inject, signal } from '@angular/core';
import { AppSettingsService } from '../../module/service/app-settings.service';
import { StorageService } from '../../module/service/storage.service';
import { Language } from '../../module/classes/language';
import { EdtCardComponent } from '../../share/component/edt-card/edt-card.component';
import { EdtPopupComponent } from '../../share/component/edt-popup/edt-popup.component';
import { EdtInputComponent } from '../../share/component/edt-input/edt-input.component';
import { EdtButtonComponent } from '../../share/component/edt-button/edt-button.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LANGUAGE_LIST } from '../../module/constant/storage';
import { AddLanguageComponent } from '../../share/add-language/add-language.component';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-languages',
  standalone: true,
  imports: [
    EdtCardComponent,
    EdtPopupComponent,
    EdtInputComponent,
    EdtButtonComponent,

    AddLanguageComponent,

    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule,
  ],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css',
})
export class LanguagesComponent {
  protected languageList = signal<Language[]>([]);

  appSettingsService = inject(AppSettingsService);
  storageService = inject(StorageService);

  private readonly titleSubsciber = this.appSettingsService
    .setTitleFromTranslation('LANGUAGE.TITLE_PAGE')
    .pipe(takeUntilDestroyed())
    .subscribe();

  ngOnInit(): void {
    this.languageList.set(
      this.storageService.retrieveObj<Language[]>(LANGUAGE_LIST) ?? []
    );
  }

  closeAddLang(isAdded: boolean): void {
    if (isAdded) {
      this.languageList.set(
        this.storageService.retrieveObj<Language[]>(LANGUAGE_LIST) ?? []
      );
    }
  }

  removeLang(lang: Language): void {
    this.languageList.update((val) => {
      return val.filter((x) => x.flagName != lang.flagName);
    });

    this.storageService.store(LANGUAGE_LIST, this.languageList());
  }
}
