import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedulebar',
  templateUrl: './schedulebar.component.html',
  styleUrls: ['./schedulebar.component.css']
})
export class SchedulebarComponent implements OnInit {

  createScheduleForm = new FormGroup({
    fromDate: new FormControl(''),
    fromHour: new FormControl(''),
    fromMinute: new FormControl(''),
    toDate: new FormControl(''),
    toHour: new FormControl(''),
    toMinute: new FormControl('')
  });

  constructor() { }

  ngOnInit() {
  }

  DisplayForm() {
    // console.log(this.createScheduleForm.value);
    const fromDate = new Date(this.createScheduleForm.value.fromDate);
    console.log(new Date(fromDate.getFullYear(),
      fromDate.getMonth(),
      fromDate.getDate(),
      this.createScheduleForm.value.fromHour,
      this.createScheduleForm.value.fromMinute));
  }

}
