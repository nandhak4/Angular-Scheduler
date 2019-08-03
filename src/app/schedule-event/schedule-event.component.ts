import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { ValidateScheduleEventTime } from '../shared/validator/schedule-event/schedule-event.validator.fucntion';
import { MessageService } from '../shared/message.service';
import { Message } from '../shared/schedule.model';

@Component({
  selector: 'app-schedule-event',
  templateUrl: './schedule-event.component.html',
  styleUrls: ['./schedule-event.component.css']
})
export class ScheduleEventComponent implements OnInit {

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

  scheduleEvent: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.scheduleEvent = this.formBuilder.group({
      [this.appDateId]: '',
      [this.appTimeId]: ''
    }, {
        validators: [ValidateScheduleEventTime(this.appDateId, this.appTimeId, this.showMessage)]
      });
  }

  showMessage = (message: Message): void => this.messageService.showErrorMessage(message);

  update(data: string): void {
    const [key, value] = data.split(':::');
    this.scheduleEvent.controls[key].setValue(value);
  }

}
