import {
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { AppSettingsService } from '../../../../module/service/app-settings.service';
import { ActivatedRoute } from '@angular/router';
import { EdtCardComponent } from '../../../../share/component/edt-card/edt-card.component';
import { Project } from '../../../../module/classes/project';
import { Language } from '../../../../module/classes/language';
import { EdtPopupComponent } from '../../../../share/component/edt-popup/edt-popup.component';
import { EdtButtonComponent } from '../../../../share/component/edt-button/edt-button.component';
import { EdtInputComponent } from '../../../../share/component/edt-input/edt-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { noWhitespaceValidator } from '../../../../module/function/validation';
import {
  ItemTranslation,
  Translation,
} from '../../../../module/classes/translation';
import { ProjectService } from '../../../../module/service/project.service';
import { EdtDropdownComponent } from '../../../../share/component/edt-dropdown/edt-dropdown.component';
import { AddLanguageComponent } from '../../../../share/add-language/add-language.component';
import { TranslationRowComponent } from './translation-row/translation-row.component';
import {
  createTranslationsFromObj,
  filterTranslations,
  findTranslationById,
  getMaxIdTranslations,
  sortTranslationsByGlobal,
  updateTranslationsFromObj,
} from '../../../../module/function/project-Helper';
import { copyObject } from '../../../../module/function/helper';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DragDropDirective } from './directive/drag-drop.directive';
import { NgTemplateOutlet } from '@angular/common';
import { ComunicationService } from '../../service/comunication.service';
import { ddType } from '../../class/comunication-type';

@Component({
  selector: 'app-prj-translation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,

    TranslationRowComponent,
    AddLanguageComponent,

    EdtCardComponent,
    EdtPopupComponent,
    EdtButtonComponent,
    EdtInputComponent,
    EdtDropdownComponent,

    TranslateModule,
    DragDropDirective,
  ],
  providers: [ProjectService],
  templateUrl: './prj-translation.component.html',
  styleUrl: './prj-translation.component.css',
})
export class PrjTranslationComponent {
  private popGeneral = viewChild<EdtPopupComponent>('popGeneral');
  private tmpImport = viewChild<TemplateRef<any>>('tmpImport');

  private activatedRoute = inject(ActivatedRoute);
  protected comunicationService = inject(ComunicationService);
  private projectService = inject(ProjectService);

  private fb = inject(FormBuilder);

  prjId = this.activatedRoute.snapshot.params['id'];

  // Popup settings
  popTemplate = signal<TemplateRef<any> | null>(null);

  protected files = signal<any[]>([]);

  protected searchValue = '';
  protected newLangForm: FormGroup = this.fb.group({
    global: [undefined, [Validators.required, noWhitespaceValidator()]],
    value: [undefined],
  });

  private idParentTranslation: number | undefined = undefined;

  constructor() {
    this.comunicationService.loadProjectFromStore(this.prjId);
  }

  showDropGeneral(targetElement: HTMLElement, type: ddType): void {
    this.comunicationService.setDropDownParam({
      comunicationType: type,
      target: targetElement,
    });
  }

  showImportPop(): void {
    this.popTemplate.set(this.tmpImport() ?? null);
    this.popGeneral()?.toggle();
    this.comunicationService.setDropDownParam(undefined);
  }

  addItemTraslate(): void {
    if (this.comunicationService.prjFromStore && this.newLangForm.valid) {
      const newTranslationForm = this.newLangForm.value;

      // Add All languages but set only the selected
      const itemsTranslation: ItemTranslation[] = [];
      for (
        let index = 0;
        index < this.comunicationService.prjFromStore.languages.length;
        index++
      ) {
        const item = {
          lang: this.comunicationService.prjFromStore.languages[index].flagName,
        } as ItemTranslation;

        if (
          this.comunicationService.prjFromStore.languages[index].flagName ==
          this.comunicationService.selectedLang()?.flagName
        ) {
          item.value = newTranslationForm.value && newTranslationForm.value();
        } else {
          item.value = undefined;
        }

        itemsTranslation.push(item);
      }

      let newId = 1;
      if (
        this.comunicationService.prjFromStore.translations &&
        this.comunicationService.prjFromStore.translations.length > 0
      ) {
        newId =
          getMaxIdTranslations(
            this.comunicationService.prjFromStore.translations
          ) + 1;
      }

      const newTranslation: Translation = {
        id: newId,
        global: newTranslationForm.global && newTranslationForm.global(),
        items: itemsTranslation,
      } as Translation;

      if (this.idParentTranslation) {
        let parentTranslation = findTranslationById(
          this.comunicationService.prjFromStore!.translations,
          this.idParentTranslation
        );
        if (parentTranslation) {
          const oldArray = parentTranslation.translation ?? [];
          parentTranslation.translation = [...oldArray, newTranslation];
          parentTranslation.items = undefined;
        }
      } else {
        const oldArray =
          this.comunicationService.prjFromStore!.translations ?? [];
        this.comunicationService.prjFromStore!.translations = [
          ...oldArray,
          newTranslation,
        ];
      }

      this.comunicationService.project.set(
        copyObject(this.comunicationService.prjFromStore)
      );
      this.projectService.updateTranslation(this.comunicationService.project());

      this.resetFormLang();
      this.closeAddTranslation();
    }
  }

  removeTranslation(translationId: number): void {
    let translations = this.comunicationService.project()?.translations;

    if (translations) {
      translations = translations.filter((x) => x.id != translationId);
      this.comunicationService.project.update((prj) => {
        if (prj) {
          prj.translations = translations ?? [];
        }
        return prj;
      });

      this.projectService.updateTranslation(this.comunicationService.project());
    }
  }

  translationValChange(
    newVal: string | undefined,
    translationId: number
  ): void {
    let translations = this.comunicationService.prjFromStore?.translations;

    if (translations) {
      const translation = findTranslationById(translations, translationId);
      const itemLang = translation?.items?.find(
        (x) => x.lang == this.comunicationService.selectedLang()?.flagName
      );
      if (itemLang) {
        itemLang.value = newVal;

        if (this.comunicationService.prjFromStore) {
          this.comunicationService.prjFromStore.translations =
            translations ?? [];
        }

        this.comunicationService.project.set(
          copyObject(this.comunicationService.prjFromStore)
        );
        this.projectService.updateTranslation(
          this.comunicationService.project()
        );
      }
    }
  }

  protected clickSortTranslation(): void {
    if (this.comunicationService.prjFromStore) {
      const sortTranslation = sortTranslationsByGlobal(
        this.comunicationService.prjFromStore.translations
      );

      this.comunicationService.prjFromStore.translations =
        sortTranslation ?? [];

      this.comunicationService.project.set(
        copyObject(this.comunicationService.prjFromStore)
      );
      this.projectService.updateTranslation(this.comunicationService.project());
    }
  }

  protected addSubTranslation(idParTranslation: number): void {
    this.idParentTranslation = idParTranslation;
    this.popGeneral()?.toggle();
  }

  protected closeAddTranslation(): void {
    this.idParentTranslation = undefined;
    this.popGeneral()?.toggle();
  }

  protected selectLanguage(lang: Language): void {
    this.comunicationService.selectedLang.set(lang);
  }

  protected addLangClose(isUpdated: boolean): void {
    if (isUpdated) {
      this.comunicationService.prjFromStore =
        this.comunicationService.selectProject(this.prjId);
    }
  }

  protected searchValueChange(): void {
    if (this.searchValue) {
      // In this case I modify the project signal but not the projectFromStore
      const prj = this.comunicationService.project();

      if (this.comunicationService.prjFromStore && prj) {
        const copyTrans = copyObject<Translation[]>(
          this.comunicationService.prjFromStore.translations
        );
        prj.translations = filterTranslations(this.searchValue, copyTrans);

        this.comunicationService.project.set(prj);
      }
    } else {
      this.comunicationService.project.set(
        copyObject(this.comunicationService.prjFromStore)
      );
    }
  }

  protected onFileDropped(files: any): void {
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      if (!element.name.toLowerCase().endsWith('.json')) {
        return;
      }
    }

    this.files.update((e) => [...e, ...files]);
  }

  protected fileUploaded(event: any): void {
    const files: File[] = event.target.files;

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      if (!element.name.toLowerCase().endsWith('.json')) {
        return;
      }
    }

    this.files.update((e) => [...e, ...files]);
  }

  protected async processFile(): Promise<void> {
    const fileList = this.files();

    if (fileList && fileList.length > 0) {
      const textFile = await fileList[0].text();
      const objFile = JSON.parse(textFile);
      let newTranslation: Translation[] = [];

      if (this.comunicationService.prjFromStore!.translations) {
        newTranslation = this.comunicationService.prjFromStore!.translations;
        updateTranslationsFromObj(
          newTranslation,
          objFile,
          this.comunicationService.selectedLang()!,
          this.comunicationService.prjFromStore!.languages
        );
      } else {
        newTranslation = createTranslationsFromObj(
          objFile,
          this.comunicationService.selectedLang()!,
          this.comunicationService.prjFromStore!.languages
        );
      }

      this.comunicationService.prjFromStore!.translations = newTranslation;
      this.comunicationService.project.set(
        copyObject(this.comunicationService.prjFromStore)
      );
      this.projectService.updateTranslation(this.comunicationService.project());
    }
  }

  private resetFormLang() {
    this.newLangForm.setValue({ global: '', value: '' });
  }
}
