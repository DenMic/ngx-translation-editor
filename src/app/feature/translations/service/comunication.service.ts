import { Injectable, inject, signal } from '@angular/core';
import { Comunication } from '../class/comunication';
import { Project } from '../../../module/classes/project';
import { AppSettingsService } from '../../../module/service/app-settings.service';
import { copyObject } from '../../../module/function/helper';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ProjectService } from '../../../module/service/project.service';
import { Language } from '../../../module/classes/language';

@Injectable()
export class ComunicationService {
  private appSettingsService = inject(AppSettingsService);
  private projectService = inject(ProjectService);

  // It must contain the entire clean project
  prjFromStore: Project | undefined;
  project = signal<Project | undefined>(undefined);
  selectedLang = signal<Language | undefined>(undefined);

  idParentTranslation: number | undefined = undefined;
  idPrj?: number;

  private dropDownParam = signal<Comunication | undefined>(undefined);
  $dropDownParam = toObservable(this.dropDownParam);

  private popParam = signal<Comunication | undefined>(undefined);
  $popParam = toObservable(this.popParam);

  loadProjectFromStore(id: number): void {
    this.prjFromStore = copyObject(this.selectProject(id));

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

  setDropDownParam(comunication: Comunication | undefined): void {
    this.dropDownParam.set(comunication);
  }

  setPopParam(comunication: Comunication | undefined): void {
    this.popParam.set(comunication);
  }

  selectProject(id: number): Project | undefined {
    const selectedPrj = this.projectService.getProjectById(id);

    if (selectedPrj) {
      this.project.set(selectedPrj);
      this.selectedLang.set(selectedPrj.languages[0]);
    }

    return selectedPrj;
  }
}
