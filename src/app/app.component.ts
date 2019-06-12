import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from './calendar-session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private calendarSessionService: CalendarSessionService, private router: Router) {
  }

  ngOnInit() {
    this.calendarSessionService.ShowCurrentMonth();
  }

  GetNext() {
    this.calendarSessionService.GetNextMonth(this.calendarSessionService.PassedMonth);
  }

  GetPrevious() {
    this.calendarSessionService.GetPreviousMonth(this.calendarSessionService.PassedMonth);
  }

}
