import { Component, input, output, signal } from '@angular/core';
import { Translation } from '../../../../../module/classes/translation';
import { Language } from '../../../../../module/classes/language';
import { EdtInputComponent } from '../../../../../share/component/edt-input/edt-input.component';
import { TranslationEvent } from '../class/translation-event';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'translation-row',
  standalone: true,
  imports: [EdtInputComponent, TranslateModule],
  templateUrl: './translation-row.component.html',
  styleUrl: './translation-row.component.css',
})
export class TranslationRowComponent {
  translation = input.required<Translation>();
  selectedLang = input<Language>();

  openSubMenu = signal<boolean>(false);

  onValueChange = output<TranslationEvent>();
  onAdd = output<number>();
  onRemove = output<number>();

  protected getValueTranslation(translation: Translation): string {
    return (
      translation.items?.find((x) => x.lang == this.selectedLang()?.flagName)
        ?.value ?? ''
    );
  }

  protected valChange(newVal: string | undefined, translationId: number): void {
    this.onValueChange.emit({ newVal: newVal, translationId: translationId });
  }

  protected addSubTranslation(id: number): void {
    this.onAdd.emit(id);
  }

  protected removeTranslation(id: number): void {
    this.onRemove.emit(id);
  }
}
