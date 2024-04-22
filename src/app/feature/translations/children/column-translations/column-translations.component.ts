import { Component, computed, inject, signal } from '@angular/core';
import { ComunicationService } from '../../service/comunication.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ddType } from '../../class/comunication-type';
import {
  filterTranslations,
  findTranslationById,
  sortTranslationsByGlobal,
} from '../../../../module/function/project-Helper';
import { copyObject } from '../../../../module/function/helper';
import { ProjectService } from '../../../../module/service/project.service';
import {
  ItemTranslation,
  Translation,
} from '../../../../module/classes/translation';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NestedTreeControl, CdkTreeModule } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';
import { EdtInputComponent } from '../../../../share/component/edt-input/edt-input.component';
import { flagsLang } from '../../../../module/constant/flags';
import { AppSettingsService } from '../../../../module/service/app-settings.service';
import { Language } from '../../../../module/classes/language';

@Component({
  selector: 'app-column-translations',
  standalone: true,
  imports: [
    FormsModule,
    CdkTreeModule,
    MatButtonModule,
    EdtInputComponent,
    TranslateModule,
  ],
  templateUrl: './column-translations.component.html',
  styleUrl: './column-translations.component.css',
})
export class ColumnTranslationsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  protected readonly comunicationService = inject(ComunicationService);
  protected readonly appSettingsService = inject(AppSettingsService);

  protected searchValue = '';
  protected selectedTranslation = signal<Translation | undefined>(undefined);

  protected treeControl = new NestedTreeControl<Translation>(
    (node) => node.translation
  );
  protected dataSource = computed(
    () =>
      new ArrayDataSource(
        this.comunicationService.project()?.translations ?? []
      )
  );

  constructor() {
    this.comunicationService.idPrj = this.activatedRoute.snapshot.params['id'];
    this.comunicationService.loadProjectFromStore(
      this.comunicationService.idPrj!
    );
  }

  protected showDropGeneral(targetElement: HTMLElement, type: ddType): void {
    this.comunicationService.setDropDownParam({
      comunicationType: type,
      target: targetElement,
    });
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

  protected searchValueChange(): void {
    if (this.searchValue) {
      // In this case I modify the project signal but not the projectFromStore
      const prj = this.comunicationService.project();

      if (this.comunicationService.prjFromStore && prj) {
        const copyTrans = copyObject<Translation[]>(
          this.comunicationService.prjFromStore.translations
        );
        prj.translations = filterTranslations(this.searchValue, copyTrans);

        this.comunicationService.project.set({ ...prj });
      }
    } else {
      this.comunicationService.project.set(
        copyObject(this.comunicationService.prjFromStore)
      );
    }
  }

  protected loadTranslation(node: Translation): void {
    this.selectedTranslation.set(node);
  }

  valChange(
    newVal: string | undefined,
    translationId: number,
    lang: string
  ): void {
    let translations = this.comunicationService.prjFromStore?.translations;

    if (translations) {
      const translation = findTranslationById(translations, translationId);
      const itemLang = translation?.items?.find((x) => x.lang == lang);
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

  protected getDescriptionLang(lang: string | undefined): string {
    let desc = '';

    if (lang) {
      desc = flagsLang.find((x) => x.flagName == lang)?.description ?? '';
    }

    return desc;
  }

  protected hasChild = (_: number, node: Translation) =>
    !!node.translation && node.translation.length > 0;
}
