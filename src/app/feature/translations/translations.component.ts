import {
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { EdtCardComponent } from '../../share/component/edt-card/edt-card.component';
import { RouterOutlet } from '@angular/router';
import { EdtDropdownComponent } from '../../share/component/edt-dropdown/edt-dropdown.component';
import { ComunicationService } from './service/comunication.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectService } from '../../module/service/project.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-translations',
  standalone: true,
  imports: [
    RouterOutlet,
    NgTemplateOutlet,

    EdtCardComponent,
    EdtDropdownComponent,

    TranslateModule,
  ],
  providers: [ComunicationService, ProjectService],
  templateUrl: './translations.component.html',
  styleUrl: './translations.component.css',
})
export class TranslationsComponent {
  private ddGeneral = viewChild<EdtDropdownComponent>('ddGeneral');

  private tmpFlag = viewChild<TemplateRef<any>>('tmpFlag');
  private tmpExtra = viewChild<TemplateRef<any>>('tmpExtraButton');

  protected readonly comunicationService = inject(ComunicationService);

  // DropDown settings
  ddTemplate = signal<TemplateRef<any> | null>(null);

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

        this.ddGeneral()?.show(value.target);
      } else {
        this.ddTemplate.set(null);
        this.ddGeneral()?.close();
      }
    });

  closeDropGeneral(): void {
    this.comunicationService.setDropDownParam(undefined);
  }
}
