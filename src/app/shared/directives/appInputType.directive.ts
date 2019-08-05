import { Directive, ElementRef } from '@angular/core';
import { AbstractControl, Validator, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { appInputValidatorFunction } from '../validator/custom-input/appInput.validator.function';


@Directive({
  selector: '[appInputType]',
  providers: [{ provide: NG_VALIDATORS, useExisting: AppInputTypeDirective, multi: true }]
})
export class AppInputTypeDirective implements Validator {

  private get inputElement(): HTMLInputElement {
    return this.appSource !== null && this.appSource !== undefined && (this.appSource.nativeElement as HTMLInputElement) != null ?
      (this.appSource.nativeElement as HTMLInputElement) : null;
  }

  isNotNullOrEmpty = (value: string): boolean => value !== null && value !== undefined && value.length > 0;

  constructor(private appSource: ElementRef) { }

  validate(control: AbstractControl): ValidationErrors {
    if (this.isNotNullOrEmpty(this.inputElement.placeholder) && this.isNotNullOrEmpty(control.value)) {
      return appInputValidatorFunction[this.inputElement.placeholder](control, this.inputElement.placeholder);
    }
  }

}
