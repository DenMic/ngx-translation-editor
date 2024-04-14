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
  protected project = signal<Project | undefined>(undefined);
  protected selectedLang = signal<Language | undefined>(undefined);

  protected newLangForm: FormGroup = this.fb.group({
    global: [undefined, [Validators.required, noWhitespaceValidator()]],
    value: [undefined],
  });

  private idParentTranslation: number | undefined = undefined;

  ngOnInit(): void {
    const selectedPrj = this.selectProject();

    if (selectedPrj) {
      this.appSettingsService.setTitlePage(`Translation - ${selectedPrj.name}`);
    } else {
      // TODO: project not found
    }
  }

  addItemTraslate(): void {
    const prj = this.project();
    if (prj && this.newLangForm.valid) {
      const newTranslationForm = this.newLangForm.value;

      // Add All languages but set only the selected
      const itemsTranslation: ItemTranslation[] = [];
      for (let index = 0; index < prj.languages.length; index++) {
        const item = {
          lang: prj.languages[index].flagName,
        } as ItemTranslation;

        if (prj.languages[index].flagName == this.selectedLang()?.flagName) {
          item.value = newTranslationForm.value && newTranslationForm.value();
        } else {
          item.value = 'TODO';
        }

        itemsTranslation.push(item);
      }

      let newId = 1;
      if (prj.translations && prj.translations.length > 0) {
        newId = (Math.max(...prj.translations.map((x) => x.id)) ?? 0) + 1;
      }

      const newTranslation: Translation = {
        id: newId,
        global: newTranslationForm.global && newTranslationForm.global(),
        items: itemsTranslation,
      } as Translation;

      this.project.update((val) => {
        

        if(this.idParentTranslation){

          let parentTranslation = this.findCorrectTranslation(val!.translations);
          // for (let index = 0; index < val!.translations.length; index++) {
          //   const element = val!.translations[index];
          //   parentTranslation = ;
          //   if(parentTranslation) break;
          // }

          if(parentTranslation){
            const oldArray = parentTranslation.translation ?? [];
            parentTranslation.translation = [...oldArray, newTranslation];
            parentTranslation.items = undefined;
          }
        } else {
          const oldArray = val!.translations ?? [];
          val!.translations = [...oldArray, newTranslation];
        }

        return val;
      });

      this.projectService.updateTranslation(this.project());
      this.resetFormLang();
      this.closeAddTranslation();
    }
  }

  private findCorrectTranslation(translations: Translation[]): Translation | undefined {
    for (let index = 0; index < translations.length; index++) {
      const translation = translations[index];
      if(translation.id == this.idParentTranslation){
        return translation;
      }
  
      if(translation.translation == undefined){
        return undefined;
      }

      return this.findCorrectTranslation(translation.translation);
    }

    return undefined;
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

  translationValChange(newVal: string | undefined, translationId: number): void {
    let translations = this.project()?.translations;

    if (translations) {
      const translation = translations.find((x) => x.id == translationId);
      const itemLang = translation?.items?.find(
        (x) => x.lang == this.selectedLang()?.flagName
      );
      if (itemLang) {
        itemLang.value = newVal;

        this.project.update((prj) => {
          if (prj) {
            prj.translations = translations ?? [];
          }
          return prj;
        });

        this.projectService.updateTranslation(this.project());
      }
    }
  }

  protected addSubTranslation(idParTranslation: number): void {
    this.idParentTranslation = idParTranslation;
    this.edtAddTranslation()?.toggle();
  }

  protected closeAddTranslation(): void {
    this.idParentTranslation = undefined;
    this.edtAddTranslation()?.toggle()
  }

  protected selectLanguage(lang: Language): void {
    this.selectedLang.set(lang);
  }

  protected addLangClose(isUpdated: boolean): void {
    if(isUpdated){
      this.selectProject();
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
