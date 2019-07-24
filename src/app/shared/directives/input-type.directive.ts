import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, Validator, ValidationErrors, FormControl, NG_VALIDATORS } from '@angular/forms';
import { customValidatorFunctions } from '../validator/validator.function';


@Directive({
  selector: '[appInputType]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputTypeDirective, multi: true }]
})
export class InputTypeDirective implements Validator {

  private get inputElement(): HTMLInputElement {
    return this.appSource !== null && this.appSource !== undefined ? (this.appSource.nativeElement as HTMLInputElement) : null;
  }

  constructor(private appSource: ElementRef) { }

  // private validateOnChange: () => void;

  // @HostListener('input', ['$event'])
  // input(event: any): void { this.validateOnChange(); }

  validate(control: AbstractControl): ValidationErrors {
    if (this.inputElement.placeholder != null && this.inputElement.placeholder.length > 0
      && control !== null && control !== undefined && control.value !== null && control.value !== undefined) {

      if ((control.value as string).length !== this.inputElement.placeholder.length) {
        return {
          invalidData:
          {
            value: true,
            message: 'Invalid data input. Data must match the format:' + this.inputElement.placeholder
          }
        };
      }

      return customValidatorFunctions[this.inputElement.placeholder](control as FormControl, this.inputElement.placeholder);
    }
  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   this.validateOnChange = fn;
  // }

}
