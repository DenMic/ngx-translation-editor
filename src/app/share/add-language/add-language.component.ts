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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { flagsLang } from '../../module/constant/flags';
import { StorageService } from '../../module/service/storage.service';
import { Language } from '../../module/classes/language';
import { LANGUAGE_LIST } from '../../module/constant/storage';
import { ProjectService } from '../../module/service/project.service';
import { TranslateModule } from '@ngx-translate/core';
import { Translation } from '../../module/classes/translation';
import { addLanguageToTranslation } from '../../module/function/project-Helper';

@Component({
  selector: 'add-language',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    EdtPopupComponent,
    EdtButtonComponent,
    MatFormFieldModule,
    MatSelectModule,

    TranslateModule,
  ],
  providers: [ProjectService],
  templateUrl: './add-language.component.html',
  styleUrl: './add-language.component.css',
})
export class AddLanguageComponent {
  edtAddLang = viewChild<EdtPopupComponent>('edtAddLang');

  storageService = inject(StorageService);
  projectService = inject(ProjectService);

  prjId = input<number | undefined>(undefined);

  onShow = output();
  onClose = output<boolean>();

  protected newLang?: Language;
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
    if (!this.newLang) {
      alert('Selezionare una lingua!');
      return;
    }

    const id = this.prjId();
    if (id) {
      const prj = this.projectService.getProjectById(id);
      if (prj) {
        prj?.languages.push(this.newLang);

        if (prj.translations) {
          addLanguageToTranslation(prj.translations, this.newLang);
        }

        this.projectService.updateTranslation(prj);
      }
    } else {
      this.languageList.update((val) => {
        if (this.newLang) val.push(this.newLang);
        return [...val];
      });

      this.storageService.store(LANGUAGE_LIST, this.languageList());
    }

    this.newLang = undefined;
    this.edtAddLang()?.toggle();

    this.onClose.emit(true);
  }
}
