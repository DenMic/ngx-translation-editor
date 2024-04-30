import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'edt-popup',
  standalone: true,
  imports: [],
  templateUrl: './edt-popup.component.html',
  styleUrl: './edt-popup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdtPopupComponent {
  show = signal<boolean>(false);
  outClickClose = input<boolean>(false);
  isMobile = input<boolean>(false);

  protected close() {
    if (this.outClickClose()) this.show.set(false);
  }

  toggle(): void {
    this.show.update((val) => !val);
  }

  showPop(): void {
    this.show.set(true);
  }

  closePop(): void {
    this.show.set(false);
  }
}
