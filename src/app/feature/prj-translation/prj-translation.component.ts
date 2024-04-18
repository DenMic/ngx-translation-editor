import {
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
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
  createTranslationsFromObj,
  filterTranslations,
  findTranslationById,
  getMaxIdTranslations,
  sortTranslationsByGlobal,
  updateTranslationsFromObj,
} from '../../module/function/project-Helper';
import { copyObject } from '../../module/function/helper';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DragDropDirective } from './directive/drag-drop.directive';
import { NgTemplateOutlet } from '@angular/common';

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

  // dropDown General
  private ddGeneral = viewChild<EdtDropdownComponent>('ddGeneral');

  private activatedRoute = inject(ActivatedRoute);
  private appSettingsService = inject(AppSettingsService);
  private projectService = inject(ProjectService);
  private fb = inject(FormBuilder);

  prjId = this.activatedRoute.snapshot.params['id'];

  // It must contain the entire clean project
  private prjFromStore: Project | undefined;

  // DropDown settings
  ddTemplate = signal<TemplateRef<any> | null>(null);

  // Popup settings
  popTemplate = signal<TemplateRef<any> | null>(null);

  // Contains part of the project based on what has been filtered
  protected project = signal<Project | undefined>(undefined);
  protected selectedLang = signal<Language | undefined>(undefined);

  protected files = signal<any[]>([]);

  protected searchValue = '';
  protected newLangForm: FormGroup = this.fb.group({
    global: [undefined, [Validators.required, noWhitespaceValidator()]],
    value: [undefined],
  });

  private idParentTranslation: number | undefined = undefined;

  constructor() {
    this.prjFromStore = copyObject(this.selectProject());

    if (this.prjFromStore) {
      this.appSettingsService
        .setTitleFromTranslation('TRANSLATION.TITLE_PAGE', {
          prjName: this.prjFromStore.name,
        })
        .pipe(takeUntilDestroyed())
        .subscribe();
    } else {
      // TODO: project not found
    }
  }

  showDropGeneral(
    targetElement: HTMLElement,
    template: TemplateRef<any>
  ): void {
    this.ddTemplate.set(template);
    this.ddGeneral()?.show(targetElement);
  }

  closeDropGeneral(): void {
    this.ddTemplate.set(null);
    this.ddGeneral()?.close();
  }

  showImportPop(): void {
    this.popTemplate.set(this.tmpImport() ?? null);
    this.popGeneral()?.toggle();
    this.closeDropGeneral();
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
    this.popGeneral()?.toggle();
  }

  protected closeAddTranslation(): void {
    this.idParentTranslation = undefined;
    this.popGeneral()?.toggle();
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

      if (this.prjFromStore!.translations) {
        newTranslation = this.prjFromStore!.translations;
        updateTranslationsFromObj(
          newTranslation,
          objFile,
          this.selectedLang()!,
          this.prjFromStore!.languages
        );
      } else {
        newTranslation = createTranslationsFromObj(
          objFile,
          this.selectedLang()!,
          this.prjFromStore!.languages
        );
      }

      this.prjFromStore!.translations = newTranslation;
      this.project.set(copyObject(this.prjFromStore));
      this.projectService.updateTranslation(this.project());
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
