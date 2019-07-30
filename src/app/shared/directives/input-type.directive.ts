import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, Validator, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { appInputValidatorFunction } from '../validator/custom-input/appInput.validator.function';


@Directive({
  selector: '[appInputType]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputTypeDirective, multi: true }]
})
export class InputTypeDirective implements Validator {

  private get inputElement(): HTMLInputElement {
    return this.appSource !== null && this.appSource !== undefined && (this.appSource.nativeElement as HTMLInputElement) != null ?
      (this.appSource.nativeElement as HTMLInputElement) : null;
  }

  constructor(private appSource: ElementRef) { }

  validate(control: AbstractControl): ValidationErrors {
    if (this.inputElement.placeholder != null && this.inputElement.placeholder.length > 0 &&
      control.value !== null && control.value !== undefined) {
      return appInputValidatorFunction[this.inputElement.placeholder](control, this.inputElement.placeholder);
    }
  }

}
