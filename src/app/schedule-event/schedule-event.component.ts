import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import {
  FormGroup, FormBuilder, ValidationErrors, Validator, NG_VALIDATORS, AbstractControl,
  ControlValueAccessor, NG_VALUE_ACCESSOR, Validators
} from '@angular/forms';
import { ValidateScheduleEventTime } from '../shared/validator/schedule/schedule-event.validator.fucntion';
import { MessageService } from '../shared/message.service';
import { Message, Data, CustomDate } from '../shared/schedule.model';
import { ConvertToDate } from '../shared/util/date.converter';
import { ConvertToTime } from '../shared/util/time.converter';

@Component({
  selector: 'app-schedule-event',
  templateUrl: './schedule-event.component.html',
  styleUrls: ['./schedule-event.component.css'],
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ScheduleEventComponent), multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ScheduleEventComponent), multi: true }
  ]
})
export class ScheduleEventComponent implements OnInit, ControlValueAccessor, Validator {

  @Input() scheduleEventId;

  // tslint:disable-next-line: no-input-rename
  @Input('scheduleEventLabel') headerLabel: string;

  // tslint:disable-next-line: no-input-rename
  @Input('scheduleEventDateLabel') dateLabel: string;

  // tslint:disable-next-line: no-input-rename
  @Input('scheduleEventTimeLabel') timeLabel: string;

  // tslint:disable-next-line: no-input-rename
  @Input('sheduleEventDatePlaceholder') datePlaceholder: string;

  // tslint:disable-next-line: no-input-rename
  @Input('scheduleEventTimePlaceholder') timePlaceholder: string;

  // tslint:disable-next-line: no-input-rename
  @Input('scheduleEventDateId') appDateId: string;

  // tslint:disable-next-line: no-input-rename
  @Input('scheduleEventTimeId') appTimeId: string;

  @Output() dataSource = new EventEmitter<Data>();

  scheduleEvent: FormGroup;
  dateSelected: string;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.scheduleEvent = this.formBuilder.group({
      [this.appDateId]: '',
      [this.appTimeId]: ''
    }, {
        validators: [ValidateScheduleEventTime(this.appDateId, this.appTimeId,
          (message: Message): void => this.messageService.showErrorMessage(message))]
      });
  }

  update(data: Data): void {
    this.scheduleEvent.controls[data.key].setValue(data.value);
    this.displayDate();
  }

  displayDate(): void {
    if (this.scheduleEvent.valid) {
      const date: string = this.scheduleEvent.get(this.appDateId).value;
      const time: string = this.scheduleEvent.get(this.appTimeId).value;
      if (date.length > 0 && time.length > 0) {
        this.dataSource.emit(this.getScheduleEventData(date, time));
        this.dateSelected = date + ' ' + time;
      }
    } else {
      this.dateSelected = '';
      this.dataSource.emit({ key: this.scheduleEventId, value: null});
    }
  }

  getScheduleEventData(date: string, time: string): Data {
    const dateValue: CustomDate = ConvertToDate(date, this.datePlaceholder);
    const timeValue: CustomDate = ConvertToTime(time, this.timePlaceholder);
    return {
      key: this.scheduleEventId,
      value: new Date(dateValue.year, dateValue.month, dateValue.day, timeValue.hour, timeValue.minutes)
    };
  }

  get isDisplayDateValid(): boolean {
    return this.dateSelected && this.dateSelected.length > 0;
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
    return this.scheduleEvent && this.scheduleEvent.errors;
  }

}
