import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { Project } from '../classes/project';
import { PROJECT_LIST } from '../constant/storage';

@Injectable()
export class ProjectService {
  private storageService = inject(StorageService);

  public getProjectById(id: number): Project | undefined {
    const prjList = this.getProjectListFromStorage();
    return prjList?.find((x) => x.id == id);
  }

  public updateTranslation(prj: Project | undefined): void {
    if (prj) {
      const prjList = this.getProjectListFromStorage();

      if (prjList) {
        for (let index = 0; index < prjList.length; index++) {
          if (prjList[index].id == prj.id) prjList[index] = prj;
        }

        this.setProjectListToStorage(prjList);
      }
    }
  }

  private getProjectListFromStorage(): Project[] | undefined {
    return this.storageService.retrieveObj<Project[]>(PROJECT_LIST);
  }

  private setProjectListToStorage(prjList: Project[]): void {
    return this.storageService.store(PROJECT_LIST, prjList);
  }
}
