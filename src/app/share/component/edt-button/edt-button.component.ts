import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { buttonLevel } from '../../../module/types/custom-types';

@Component({
  selector: 'edt-button',
  standalone: true,
  imports: [],
  templateUrl: './edt-button.component.html',
  styleUrl: './edt-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdtButtonComponent {
  label = input<string>('');
  level = input<buttonLevel>('primary');
  disabled = input<boolean>(false);

  buttonCss = computed(() => {
    let css = '';
    switch (this.level()) {
      case 'primary':
        css =
          'bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded disabled:bg-neutral-400';
        break;

      case 'secondary':
        css =
          'bg-transparent hover:bg-green-700 text-green-800 dark:text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-700 dark:border-green-500 hover:border-transparent rounded disabled:bg-neutral-400';
        break;
    }

    return css;
  });

  onClick = output();

  clickEvent(): void {
    this.onClick.emit();
  }
}
