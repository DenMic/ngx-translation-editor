import { Component, computed, input, output, signal } from '@angular/core';
import { Translation } from '../../../../../module/classes/translation';
import { Language } from '../../../../../module/classes/language';
import { TranslationEvent } from '../class/translation-event';
import { TranslateModule } from '@ngx-translate/core';
import { flagsLang } from '../../../../../module/constant/flags';
import { EdtInputComponent } from '../../../../../share/component/edt-input/edt-input.component';

@Component({
  selector: 'mobile-translation-row',
  standalone: true,
  imports: [TranslateModule, EdtInputComponent],
  templateUrl: './mobile-translation-row.component.html',
  styleUrl: './mobile-translation-row.component.css',
})
export class MobileTranslationRowComponent {
  translation = input.required<Translation>();
  selectedLang = input<Language>();

  openSubMenu = signal<boolean>(false);
  openDetail = signal<boolean>(false);
  selectedTranslation = signal<Translation | undefined>(undefined);

  hasSubMenu = computed(
    () =>
      this.translation().translation &&
      this.translation().translation!.length > 0
  );

  onValueChange = output<TranslationEvent>();
  onAdd = output<number>();

  protected getValueTranslation(translation: Translation): string {
    return (
      translation.items?.find((x) => x.lang == this.selectedLang()?.flagName)
        ?.value ?? ''
    );
  }

  protected valChange(newVal: string | undefined, translationId: number): void {
    this.onValueChange.emit({ newVal: newVal, translationId: translationId });
  }

  protected valChangeByLang(
    newVal: string | undefined,
    translationId: number,
    lang: string
  ): void {
    this.onValueChange.emit({
      newVal: newVal,
      translationId: translationId,
      lang: lang,
    });
  }

  protected addSubTranslation(id: number): void {
    this.onAdd.emit(id);
  }

  protected editTranslation(translation: Translation): void {
    this.openDetail.set(!this.openDetail());
    this.selectedTranslation.set(translation);
  }

  protected getDescriptionLang(lang: string | undefined): string {
    let desc = '';

    if (lang) {
      desc = flagsLang.find((x) => x.flagName == lang)?.description ?? '';
    }

    return desc;
  }
}
