import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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

  scheduleEvent: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.scheduleEvent = this.formBuilder.group({
      [this.datePlaceholder]: '',
      [this.timePlaceholder]: ''
    });
  }

  update(data: string): void {
    const [key, value] = data.split(':::');
    this.scheduleEvent.controls[key].setValue(value);
  }

}
