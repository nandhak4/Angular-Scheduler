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

  private readonly monthsOfYear: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  private currentMonth;

  private get IsCurrentYear(): boolean {
    return this.calendarSessionService.IsCurrentYearDisplayed;
  }

  ngOnInit() {
    this.currentMonth = this.calendarSessionService.CurrentDate.getMonth();
  }

  NavigateToMonth(month: number) {
    this.calendarSessionService.PassedMonth = month;
    this.calendarSessionService.SetCurrentDisplay('M');
  }

  NavigateToNextYearMonth(month: number) {
    this.calendarSessionService.PassedYear += 1;
    this.NavigateToMonth(month);
  }

  public get GetYearGrid(): [][] {
    const year = [];
    for (let i = 0, j = 0, k = 0; i < 3; i++) {
      year.push([]);
      for (k = j; k < j + 4; k++) {
        year[i].push({
          display: this.monthsOfYear[k],
          index: k,
          isCurrentMonth: this.IsCurrentYear && k === this.currentMonth
        });
      }
      j = k;
    }
    return year;
  }
}
