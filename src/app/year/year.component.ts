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
  private year;

  public get Year(): [][] {
    this.year = [];
    for (let i = 0, j = 0, k = 0; i < 3; i++) {
      this.year.push([]);
      for (k = j; k < j + 4; k++) {
        this.year[i].push({
          display: this.monthsOfYear[k],
          index: k,
          isCurrentMonth: this.IsCurrentYear && k === this.currentMonth
        });
      }
      j = k;
    }
    return this.year;
  }

  private get IsCurrentYear(): boolean {
    return this.calendarSessionService.IsCurrentYearDisplayed;
  }

  ngOnInit() {
    this.currentMonth = this.calendarSessionService.CurrentDate.getMonth();
  }

  navigateToMonth(month: number): void {
    this.calendarSessionService.PassedMonth = month;
    this.calendarSessionService.SetCurrentDisplay('M');
  }

  navigateToNextYearMonth(month: number): void {
    this.calendarSessionService.PassedYear += 1;
    this.navigateToMonth(month);
  }

}
