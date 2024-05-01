import { Component, input, output, signal } from '@angular/core';
import { Translation } from '../../../../../module/classes/translation';
import { Language } from '../../../../../module/classes/language';
import { TranslationEvent } from '../class/translation-event';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'mobile-translation-row',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './mobile-translation-row.component.html',
  styleUrl: './mobile-translation-row.component.css',
})
export class MobileTranslationRowComponent {
  translation = input.required<Translation>();
  selectedLang = input<Language>();

  openSubMenu = signal<boolean>(false);

  onValueChange = output<TranslationEvent>();
  onAdd = output<number>();
  onEdit = output<number>();

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

  protected editTranslation(id: number): void {
    this.onEdit.emit(id);
  }
}
