import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { CalendarSessionService } from '../calendar-session.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  constructor(private router: Router, private calendarSessionService: CalendarSessionService) { }

  ngOnInit() {
  }

  NavigateToMonth(month: number) {
    this.calendarSessionService.PassedMonth = month;
    this.calendarSessionService.SetCurrentDisplay('M');
  }

  NavigateToNextYearMonth(month: number) {
    this.calendarSessionService.PassedYear += 1;
    this.NavigateToMonth(month);
  }
}
