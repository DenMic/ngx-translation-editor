import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'edt-card',
  standalone: true,
  imports: [],
  templateUrl: './edt-card.component.html',
  styleUrl: './edt-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdtCardComponent {
  showTitle = input<boolean>(false);
  title = input<string>();
}
