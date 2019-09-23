import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data, Message, ScheduleInfo } from '../shared/schedule.model';
import { ValidateNewSchedule } from '../shared/validator/schedule/new-schedule.validator.function';
import { MessageService } from '../shared/message.service';
import { ScheduleService } from '../schedule.service';
import { CalendarSessionService } from '../calendar-session.service';

@Component({
  selector: 'app-schedulebar',
  templateUrl: './schedulebar.component.html',
  styleUrls: ['./schedulebar.component.css']
})
export class SchedulebarComponent implements OnInit {

  scheduleInfo: FormGroup;

  scheduleFromDateEventId = 'FromDate';

  scheduleToDateEventId = 'ToDate';

  scheduleFromTimeEventId = 'FromTime';

  scheduleToTimeEventId = 'ToTime';

  scheduleEventStartId = 'Start';

  scheduleEventEndId = 'End';

  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
              private scheduleService: ScheduleService, private calendarSessionService: CalendarSessionService) { }

  ngOnInit() {
    this.scheduleInfo = this.formBuilder.group({
      [this.scheduleEventStartId]: null,
      [this.scheduleEventEndId]: null
    }, {
        validators: [ValidateNewSchedule(this.scheduleEventStartId, this.scheduleEventEndId, this.scheduleToDateEventId,
          this.scheduleToTimeEventId, (message: Message) => this.ShowMessage(message))]
      });
  }

  ShowMessage(message: Message) {
    if (message && message.key) {
      this.messageService.showErrorMessage(message);
    } else {
      this.messageService.clearAllErrorMessages();
    }
  }

  update(data: Data): void {
    this.scheduleInfo.controls[data.key].setValue(data.value);
  }

  ScheduleUpdate() {
    alert('Schedule created');
    this.scheduleService.createSchedule({
      Id: null,
      begin: this.scheduleInfo.controls[this.scheduleEventStartId].value,
      end: this.scheduleInfo.controls[this.scheduleEventEndId].value,
      content: null,
      createdDate: new Date()
    } as ScheduleInfo);
    this.calendarSessionService.Refresh();
  }

}
