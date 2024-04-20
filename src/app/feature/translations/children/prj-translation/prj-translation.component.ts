import {
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EdtCardComponent } from '../../../../share/component/edt-card/edt-card.component';
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
  private tmpImport = viewChild<TemplateRef<any>>('tmpImport');

  private activatedRoute = inject(ActivatedRoute);
  protected comunicationService = inject(ComunicationService);
  private projectService = inject(ProjectService);

  prjId = this.activatedRoute.snapshot.params['id'];

  // Popup settings
  popTemplate = signal<TemplateRef<any> | null>(null);

  protected searchValue = '';

  constructor() {
    this.comunicationService.loadProjectFromStore(this.prjId);
  }

  showDropGeneral(targetElement: HTMLElement, type: ddType): void {
    this.comunicationService.setDropDownParam({
      comunicationType: type,
      target: targetElement,
    });
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

  protected addTranslation(): void {
    this.comunicationService.idParentTranslation = undefined;
    this.comunicationService.setPopParam({
      comunicationType: 'language',
    });
  }

  protected addSubTranslation(idParTranslation: number): void {
    this.comunicationService.idParentTranslation = idParTranslation;
    this.comunicationService.setPopParam({
      comunicationType: 'language',
    });
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
}
