import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedule = [
    {
      begin: 0,
      end: 2
    },
    {
      begin: 2,
      end: 4
    },
    {
      begin: 4,
      end: 6
    },
    {
      begin: 1.5,
      end: 3.5
    },
    {
      begin: 4.5,
      end: 5.5
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
