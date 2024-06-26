import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EdtCardComponent } from '../../share/component/edt-card/edt-card.component';
import { StorageService } from '../../module/service/storage.service';
import { Project } from '../../module/classes/project';
import { AppSettingsService } from '../../module/service/app-settings.service';
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
import { LANGUAGE_LIST, PROJECT_LIST } from '../../module/constant/storage';
import { Language } from '../../module/classes/language';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { defaultLang } from '../../module/constant/flags';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    EdtCardComponent,
    EdtPopupComponent,
    EdtButtonComponent,
    EdtInputComponent,

    TranslateModule,
  ],
  providers: [TranslateService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  edtAddPrj = viewChild<EdtPopupComponent>('edtAddPrj');
  edtRemovePrj = viewChild<EdtPopupComponent>('edtRemovePrj');

  private storageService = inject(StorageService);
  private fb = inject(FormBuilder);
  protected appSettingsService = inject(AppSettingsService);
  protected router = inject(Router);

  protected selectedPrj: Project | undefined = undefined;

  protected projectList = signal<Project[]>([]);
  protected newProjectForm: FormGroup = this.fb.group({
    name: [undefined, [Validators.required, noWhitespaceValidator()]],
    description: [undefined],
    languages: [[]],
  });

  private readonly titleSubsciber = this.appSettingsService
    .setTitleFromTranslation('PROJECT.TITLE_PAGE')
    .pipe(takeUntilDestroyed())
    .subscribe();

  ngOnInit(): void {
    this.projectList.set(
      this.storageService.retrieveObj<Project[]>(PROJECT_LIST) ?? []
    );
  }

  dblClickProject(id: number) {
    if (!this.appSettingsService.isMobile()) {
      this.goToTranslation(id);
    }
  }

  clickProject(id: number) {
    if (this.appSettingsService.isMobile()) {
      this.goToTranslation(id);
    }
  }

  goToTranslation(id: number): void {
    let layoutPage = this.appSettingsService.layoutPage();

    if (this.appSettingsService.isMobile()) {
      layoutPage = 'list';
    }

    this.router.navigate([`translations/${layoutPage}`, id]);
  }

  addProject(): void {
    if (this.newProjectForm.valid) {
      const newProjectForm = this.newProjectForm.value;
      let newId = 1;
      if (this.projectList().length > 0) {
        newId = (Math.max(...this.projectList().map((x) => x.id)) ?? 0) + 1;
      }

      const newProject = {
        id: newId,
        name: newProjectForm.name && newProjectForm.name(),
        description: newProjectForm.description && newProjectForm.description(),
      } as Project;

      newProject.languages = this.storageService.retrieveObj<Language[]>(
        LANGUAGE_LIST
      ) ?? [defaultLang];

      this.projectList.update((val) => {
        val.push(newProject);
        return val;
      });

      this.storageService.store(PROJECT_LIST, this.projectList());
      this.edtAddPrj()?.toggle();
    }
  }

  showDeletePop(prj: Project): void {
    this.selectedPrj = prj;
    this.edtRemovePrj()?.showPop();
  }

  removePrj(): void {
    this.projectList.update((val) => {
      return val.filter((x) => x.id != this.selectedPrj!.id);
    });

    this.storageService.store(PROJECT_LIST, this.projectList());
    this.selectedPrj = undefined;
    this.edtRemovePrj()?.closePop();
  }
}
