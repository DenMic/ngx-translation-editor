import { Component, inject, model } from '@angular/core';
import { AppSettingsService } from '../../module/service/app-settings.service';
import { EdtInputComponent } from '../component/edt-input/edt-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { CdkTreeModule } from '@angular/cdk/tree';
import { GitModel } from '../../module/classes/gitModel';

@Component({
  selector: 'git-repo-search',
  standalone: true,
  imports: [CdkTreeModule, EdtInputComponent, TranslateModule],
  templateUrl: './git-repo-search.component.html',
  styleUrl: './git-repo-search.component.css',
})
export class GitRepoSearchComponent {
  protected readonly appSettingsService = inject(AppSettingsService);

  gitModel = model.required<GitModel>();
}
