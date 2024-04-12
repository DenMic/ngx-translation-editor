import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppSettingsService } from './module/service/app-settings.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ngx-translation-editor';

  appSettingsService = inject(AppSettingsService);
  router = inject(Router);

  goToLanguages(): void {}
}
