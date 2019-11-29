import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appFormValidation]'
})
export class FormValidationDirective {

  constructor() { }

}

export function regExValidation(regexp: RegExp, ruleName: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = !regexp.test(control.value);
    return forbidden ? {ruleName: {value: control.value}} : null;
  }
}
