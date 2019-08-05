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
  public get CustomInputValue(): string {
    return this.customInputValue;
  }
  public set CustomInputValue(value: string) {
    this.customInputValue = value;
    this.reset();
    this.dataSource.emit(this.Data);
  }

  private isSessionAM = false;
  public get IsSessionAM(): boolean {
    return this.isSessionAM;
  }
  public set IsSessionAM(value: boolean) {
    this.reset();
    this.isSessionAM = value;
  }

  public get Data(): string {
    return this.keyId + ':::' + this.CustomInputValue + (!this.showSession ? '' : this.isSessionAM ? ':00' : ':12');
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
      this.displayError(this.formControl.errors.messages);
      return this.formControl.errors;
    }
  }

  reset = () => this.messageService.clearErrorMessage(this.keyId);

  displayError = (errorMessages: string[]) => this.messageService.showErrorMessage({ key: this.keyId, value: errorMessages });

  setSession = (sessionType: number) => { this.IsSessionAM = sessionType > 0; this.dataSource.emit(this.Data); }
}
