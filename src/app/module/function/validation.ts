import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return ((control.value && control.value()) || '').trim().length == 0
      ? { whitespace: true }
      : null;
  };
}
