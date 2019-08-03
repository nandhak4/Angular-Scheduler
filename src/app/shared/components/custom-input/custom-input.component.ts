import { Component, OnInit, Input, forwardRef, ViewChild, Output, EventEmitter } from '@angular/core';
import {
  ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator,
  AbstractControl, ValidationErrors, FormControl, NgModel
} from '@angular/forms';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CustomInputComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CustomInputComponent), multi: true }
  ]
})
export class CustomInputComponent implements OnInit, ControlValueAccessor, Validator {

  // tslint:disable-next-line: no-input-rename
  @Input('appKey') keyId: string;

  // tslint:disable-next-line: no-input-rename
  @Input('appInputLabelName') labelName: string;

  // tslint:disable-next-line: no-input-rename
  @Input('appDatePlaceholder') dateFormat: string;

  // tslint:disable-next-line: no-input-rename
  @Input('appTimePlaceholder') timeFormat: string;

  @Output() dataSource = new EventEmitter<string>();

  @ViewChild('appInput', { static: false }) appInput: NgModel;

  public get placeHolder(): string {
    return this.dateFormat || this.timeFormat || '';
  }

  public get showSession(): boolean {
    return this.timeFormat !== null && this.timeFormat !== undefined;
  }

  public get formControl(): FormControl {
    return this.appInput && this.appInput.control;
  }

  private customInputValue: string;
  get CustomInputValue(): string {
    return this.customInputValue;
  }
  set CustomInputValue(value: string) {
    this.customInputValue = value;
    this.messageService.clearErrorMessage(this.keyId);
    this.dataSource.emit(this.keyId + ':::' + this.customInputValue);
  }

  updateOnBlur = { standalone: true, updateOn: 'blur' };

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  validate(control: AbstractControl): ValidationErrors {
    if (this.formControl && this.formControl.errors) {
      this.messageService.showErrorMessage({ key: this.keyId, value: this.formControl.errors.messages });
      return this.formControl.errors;
    }
  }

}
