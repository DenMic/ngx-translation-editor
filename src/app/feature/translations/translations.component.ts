import {
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { EdtCardComponent } from '../../share/component/edt-card/edt-card.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EdtDropdownComponent } from '../../share/component/edt-dropdown/edt-dropdown.component';
import { ComunicationService } from './service/comunication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService } from '../../module/service/project.service';
import { NgTemplateOutlet } from '@angular/common';
import { EdtPopupComponent } from '../../share/component/edt-popup/edt-popup.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EdtInputComponent } from '../../share/component/edt-input/edt-input.component';
import { EdtButtonComponent } from '../../share/component/edt-button/edt-button.component';
import { noWhitespaceValidator } from '../../module/function/validation';
import { ItemTranslation, Translation } from '../../module/classes/translation';
import {
  createTranslationsFromObj,
  findTranslationById,
  getMaxIdTranslations,
  updateTranslationsFromObj,
} from '../../module/function/project-Helper';
import { copyObject } from '../../module/function/helper';
import { Language } from '../../module/classes/language';
import { AddLanguageComponent } from '../../share/add-language/add-language.component';

@Component({
  selector: 'app-translations',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,

    AddLanguageComponent,
    EdtCardComponent,
    EdtDropdownComponent,
    EdtPopupComponent,
    EdtInputComponent,
    EdtButtonComponent,

    TranslateModule,
  ],
  providers: [ComunicationService, ProjectService],
  templateUrl: './translations.component.html',
  styleUrl: './translations.component.css',
})
export class TranslationsComponent {
  private ddGeneral = viewChild<EdtDropdownComponent>('ddGeneral');
  private popGeneral = viewChild<EdtPopupComponent>('popGeneral');

  private tmpFlag = viewChild<TemplateRef<any>>('tmpFlag');
  private tmpExtra = viewChild<TemplateRef<any>>('tmpExtraButton');

  private tmpAddTranslation = viewChild<TemplateRef<any>>('tmpAddTranslation');
  private tmpImport = viewChild<TemplateRef<any>>('tmpImport');

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly projectService = inject(ProjectService);
  protected readonly comunicationService = inject(ComunicationService);

  // Template DropDown and Popup
  ddTemplate = signal<TemplateRef<any> | null>(null);
  popTemplate = signal<TemplateRef<any> | null>(null);

  protected files = signal<any[]>([]);

  protected newLangForm: FormGroup = this.fb.group({
    global: [undefined, [Validators.required, noWhitespaceValidator()]],
    value: [undefined],
  });

  prjId = this.activatedRoute.snapshot.params['id'];

  // Gestione del dropDown
  private $dropDownControl = this.comunicationService.$dropDownParam
    .pipe(takeUntilDestroyed())
    .subscribe((value) => {
      if (value) {
        switch (value.comunicationType) {
          case 'language':
            this.ddTemplate.set(this.tmpFlag()!);
            break;

          case 'extra':
            this.ddTemplate.set(this.tmpExtra()!);
            break;
        }

        this.ddGeneral()?.show(value.target!);
      } else {
        this.ddTemplate.set(null);
        this.ddGeneral()?.close();
      }
    });

  private $popControl = this.comunicationService.$popParam
    .pipe(takeUntilDestroyed())
    .subscribe((value) => {
      if (value) {
        switch (value.comunicationType) {
          case 'language':
            this.popTemplate.set(this.tmpAddTranslation()!);
            break;

          case 'import':
            this.popTemplate.set(this.tmpImport()!);
            break;
        }

        this.popGeneral()?.showPop();
      } else {
        this.ddTemplate.set(null);
        this.popGeneral()?.closePop();
      }
    });

  closeDropGeneral(): void {
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

      if (this.comunicationService.idParentTranslation) {
        let parentTranslation = findTranslationById(
          this.comunicationService.prjFromStore!.translations,
          this.comunicationService.idParentTranslation
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

  protected selectLanguage(lang: Language): void {
    this.comunicationService.selectedLang.set(lang);
    this.closeDropGeneral();
  }

  showImportPop(): void {
    this.popTemplate.set(this.tmpImport() ?? null);
    this.comunicationService.setPopParam({
      comunicationType: 'import',
    });
    this.comunicationService.setDropDownParam(undefined);
  }

  protected addLangClose(isUpdated: boolean): void {
    if (isUpdated) {
      this.comunicationService.prjFromStore =
        this.comunicationService.selectProject(this.prjId);
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

  protected closeAddTranslation(): void {
    this.comunicationService.idParentTranslation = undefined;
    this.popGeneral()?.toggle();
  }

  private resetFormLang() {
    this.newLangForm.setValue({ global: '', value: '' });
  }
}
