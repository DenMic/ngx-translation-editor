import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { EdtCardComponent } from '../edt-card/edt-card.component';

@Component({
  selector: 'edt-popup',
  standalone: true,
  imports: [EdtCardComponent],
  templateUrl: './edt-popup.component.html',
  styleUrl: './edt-popup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdtPopupComponent {
  show = signal<boolean>(false);
  outClickClose = input<boolean>(false);

  protected close() {
    if (this.outClickClose()) this.show.set(false);
  }

  toggle(): void {
    this.show.update((val) => !val);
  }
}
