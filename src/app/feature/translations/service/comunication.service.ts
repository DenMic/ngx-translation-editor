import { Injectable, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { Comunication } from '../class/comunication';
import { Project } from '../../../module/classes/project';
import { AppSettingsService } from '../../../module/service/app-settings.service';
import { copyObject } from '../../../module/function/helper';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  private dropDownParam = new Subject<Comunication | undefined>();
  $dropDownParam = this.dropDownParam.asObservable();

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
    this.dropDownParam.next(comunication);
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
