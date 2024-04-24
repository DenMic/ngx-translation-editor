import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnInit,
  forwardRef,
  inject,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { inputType } from '../../../module/types/custom-types';
import { NgClass } from '@angular/common';

@Component({
  selector: 'edt-input',
  standalone: true,
  imports: [FormsModule, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EdtInputComponent),
      multi: true,
    },
  ],
  templateUrl: './edt-input.component.html',
  styleUrl: './edt-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdtInputComponent implements OnInit, ControlValueAccessor {
  input = viewChild<HTMLInputElement>('input');
  area = viewChild<HTMLTextAreaElement>('area');

  inputType = input<inputType>('input');
  label = input<string>();
  value = model<string>();
  disabled = model<boolean>(false);

  onBlur = output<string | undefined>();

  onChange: any = (value: any) => {};
  onTouched: any = () => {};

  public _injector: Injector = inject(Injector);
  public control?: NgControl;

  // constructor(public control: NgControl) {
  //   this.control && (this.control.valueAccessor = this);
  // }

  ngOnInit(): void {
    try {
      this.control = this._injector.get(NgControl);
    } catch (e) {
      // if not in FormControl
    }
  }

  focusOnInput(): void {
    setTimeout(() => {
      const input: any = this.input();
      const area: any = this.area();

      if (input) {
        input.nativeElement.focus();
      }
      if (area) {
        area.nativeElement.focus();
      }
    }, 100);
  }

  // Gestione Form
  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  blur(value: string | undefined): void {
    this.onTouched();
    this.onBlur.emit(value);
  }
}
