import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { EdtPopupComponent } from '../component/edt-popup/edt-popup.component';
import { EdtButtonComponent } from '../component/edt-button/edt-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { flagsLang } from '../../module/constant/flags';
import { StorageService } from '../../module/service/storage.service';
import { Language } from '../../module/classes/language';
import { LANGUAGE_LIST } from '../../module/constant/storage';
import { ProjectService } from '../../module/service/project.service';
import { TranslateModule } from '@ngx-translate/core';
import { addLanguageToTranslation } from '../../module/function/project-Helper';
import { AppSettingsService } from '../../module/service/app-settings.service';
import { EdtDropdownComponent } from '../component/edt-dropdown/edt-dropdown.component';

@Component({
  selector: 'add-language',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    EdtPopupComponent,
    EdtButtonComponent,
    EdtDropdownComponent,

    TranslateModule,
  ],
  providers: [ProjectService],
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.css',
})
export class AddLanguageComponent {
  edtAddLang = viewChild<EdtPopupComponent>('edtAddLang');

  private readonly storageService = inject(StorageService);
  private readonly projectService = inject(ProjectService);
  protected readonly appSettingsService = inject(AppSettingsService);

  prjId = input<number | undefined>(undefined);
  onShow = output();
  onClose = output<boolean>();

  protected selectedPopLang = signal<Language | undefined>(undefined);
  protected languageList = signal<Language[]>([]);
  protected selectableLang = computed(() => {
    const id = this.prjId();
    let enabledLanguage: Language[] = [];

    if (id) {
      enabledLanguage = this.projectService.getProjectById(id)?.languages ?? [];
    } else {
      enabledLanguage = this.languageList();
    }

    return flagsLang.filter(
      (x) => !enabledLanguage.find((y) => y.flagName == x.flagName)
    );
  });

  toggle(): void {
    this.edtAddLang()?.toggle();

    if (this.edtAddLang()?.show) {
      this.languageList.set(
        this.storageService.retrieveObj<Language[]>(LANGUAGE_LIST) ?? []
      );

      this.onShow.emit();
    } else {
      this.onClose.emit(false);
    }
  }

  addLang(): void {
    if (!this.selectedPopLang()) {
      alert('Selezionare una lingua!');
      return;
    }

    const id = this.prjId();
    const newLang = this.selectedPopLang();
    if (id) {
      const prj = this.projectService.getProjectById(id);
      if (prj && newLang) {
        prj?.languages.push(newLang);

        if (prj.translations) {
          addLanguageToTranslation(prj.translations, newLang);
        }

        this.projectService.updateTranslation(prj);
      }
    } else {
      this.languageList.update((val) => {
        if (newLang) val.push(newLang);
        return [...val];
      });

      this.storageService.store(LANGUAGE_LIST, this.languageList());
    }

    this.selectedPopLang.set(undefined);
    this.edtAddLang()?.toggle();

    this.onClose.emit(true);
  }
}
