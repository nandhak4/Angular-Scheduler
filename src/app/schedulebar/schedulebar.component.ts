import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Data, Message } from '../shared/schedule.model';
import { ValidateNewSchedule } from '../shared/validator/schedule/new-schedule.validator.function';
import { MessageService } from '../shared/message.service';

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

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit() {
    this.scheduleInfo = this.formBuilder.group({
      [this.scheduleEventStartId]: '',
      [this.scheduleEventEndId]: ''
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

}
