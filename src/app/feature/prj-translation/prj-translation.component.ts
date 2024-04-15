import { Component, inject, signal, viewChild } from '@angular/core';
import { AppSettingsService } from '../../module/service/app-settings.service';
import { ActivatedRoute } from '@angular/router';
import { EdtCardComponent } from '../../share/component/edt-card/edt-card.component';
import { Project } from '../../module/classes/project';
import { Language } from '../../module/classes/language';
import { EdtPopupComponent } from '../../share/component/edt-popup/edt-popup.component';
import { EdtButtonComponent } from '../../share/component/edt-button/edt-button.component';
import { EdtInputComponent } from '../../share/component/edt-input/edt-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noWhitespaceValidator } from '../../module/function/validation';
import { ItemTranslation, Translation } from '../../module/classes/translation';
import { ProjectService } from '../../module/service/project.service';
import { EdtDropdownComponent } from '../../share/component/edt-dropdown/edt-dropdown.component';
import { AddLanguageComponent } from '../../share/add-language/add-language.component';
import { TranslationRowComponent } from './translation-row/translation-row.component';
import {
  filterTranslations,
  findTranslationById,
  getMaxIdTranslations,
  sortTranslationsByGlobal,
} from '../../module/function/project-Helper';
import { copyObject } from '../../module/function/helper';

@Component({
  selector: 'app-prj-translation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    TranslationRowComponent,
    AddLanguageComponent,

    EdtCardComponent,
    EdtPopupComponent,
    EdtButtonComponent,
    EdtInputComponent,
    EdtDropdownComponent,
  ],
  providers: [ProjectService],
  templateUrl: './prj-translation.component.html',
  styleUrl: './prj-translation.component.css',
})
export class PrjTranslationComponent {
  private edtAddTranslation = viewChild<EdtPopupComponent>('edtAddTranslation');

  private activatedRoute = inject(ActivatedRoute);
  private appSettingsService = inject(AppSettingsService);
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);

  prjId = this.activatedRoute.snapshot.params['id'];

  // It must contain the entire clean project
  private prjFromStore: Project | undefined;

  // Contains part of the project based on what has been filtered
  protected project = signal<Project | undefined>(undefined);
  protected selectedLang = signal<Language | undefined>(undefined);

  protected searchValue = '';
  protected newLangForm: FormGroup = this.fb.group({
    global: [undefined, [Validators.required, noWhitespaceValidator()]],
    value: [undefined],
  });

  private idParentTranslation: number | undefined = undefined;

  ngOnInit(): void {
    this.prjFromStore = copyObject(this.selectProject());

    if (this.prjFromStore) {
      this.appSettingsService.setTitlePage(
        `Translation - ${this.prjFromStore.name}`
      );
    } else {
      // TODO: project not found
    }
  }

  addItemTraslate(): void {
    if (this.prjFromStore && this.newLangForm.valid) {
      const newTranslationForm = this.newLangForm.value;

      // Add All languages but set only the selected
      const itemsTranslation: ItemTranslation[] = [];
      for (let index = 0; index < this.prjFromStore.languages.length; index++) {
        const item = {
          lang: this.prjFromStore.languages[index].flagName,
        } as ItemTranslation;

        if (
          this.prjFromStore.languages[index].flagName ==
          this.selectedLang()?.flagName
        ) {
          item.value = newTranslationForm.value && newTranslationForm.value();
        } else {
          item.value = undefined;
        }

        itemsTranslation.push(item);
      }

      let newId = 1;
      if (
        this.prjFromStore.translations &&
        this.prjFromStore.translations.length > 0
      ) {
        newId = getMaxIdTranslations(this.prjFromStore.translations) + 1;
      }

      const newTranslation: Translation = {
        id: newId,
        global: newTranslationForm.global && newTranslationForm.global(),
        items: itemsTranslation,
      } as Translation;

      if (this.idParentTranslation) {
        let parentTranslation = findTranslationById(
          this.prjFromStore!.translations,
          this.idParentTranslation
        );
        if (parentTranslation) {
          const oldArray = parentTranslation.translation ?? [];
          parentTranslation.translation = [...oldArray, newTranslation];
          parentTranslation.items = undefined;
        }
      } else {
        const oldArray = this.prjFromStore!.translations ?? [];
        this.prjFromStore!.translations = [...oldArray, newTranslation];
      }

      this.project.set(copyObject(this.prjFromStore));
      this.projectService.updateTranslation(this.project());

      this.resetFormLang();
      this.closeAddTranslation();
    }
  }

  removeTranslation(translationId: number): void {
    let translations = this.project()?.translations;

    if (translations) {
      translations = translations.filter((x) => x.id != translationId);
      this.project.update((prj) => {
        if (prj) {
          prj.translations = translations ?? [];
        }
        return prj;
      });

      this.projectService.updateTranslation(this.project());
    }
  }

  translationValChange(
    newVal: string | undefined,
    translationId: number
  ): void {
    let translations = this.prjFromStore?.translations;

    if (translations) {
      const translation = findTranslationById(translations, translationId);
      const itemLang = translation?.items?.find(
        (x) => x.lang == this.selectedLang()?.flagName
      );
      if (itemLang) {
        itemLang.value = newVal;

        if (this.prjFromStore) {
          this.prjFromStore.translations = translations ?? [];
        }

        this.project.set(copyObject(this.prjFromStore));
        this.projectService.updateTranslation(this.project());
      }
    }
  }

  protected clickSortTranslation(): void {
    if (this.prjFromStore) {
      const sortTranslation = sortTranslationsByGlobal(
        this.prjFromStore.translations
      );

      this.prjFromStore.translations = sortTranslation ?? [];

      this.project.set(copyObject(this.prjFromStore));
      this.projectService.updateTranslation(this.project());
    }
  }

  protected addSubTranslation(idParTranslation: number): void {
    this.idParentTranslation = idParTranslation;
    this.edtAddTranslation()?.toggle();
  }

  protected closeAddTranslation(): void {
    this.idParentTranslation = undefined;
    this.edtAddTranslation()?.toggle();
  }

  protected selectLanguage(lang: Language): void {
    this.selectedLang.set(lang);
  }

  protected addLangClose(isUpdated: boolean): void {
    if (isUpdated) {
      this.prjFromStore = this.selectProject();
    }
  }

  protected searchValueChange(): void {
    if (this.searchValue) {
      // In this case I modify the project signal but not the projectFromStore
      const prj = this.project();

      if (this.prjFromStore && prj) {
        const copyTrans = copyObject<Translation[]>(
          this.prjFromStore.translations
        );
        prj.translations = filterTranslations(this.searchValue, copyTrans);

        this.project.set(prj);
      }
    } else {
      this.project.set(copyObject(this.prjFromStore));
    }
  }

  private resetFormLang() {
    this.newLangForm.setValue({ global: '', value: '' });
  }

  private selectProject(): Project | undefined {
    const selectedPrj = this.projectService.getProjectById(this.prjId);

    if (selectedPrj) {
      this.project.set(selectedPrj);
      this.selectedLang.set(selectedPrj.languages[0]);
    }

    return selectedPrj;
  }
}
