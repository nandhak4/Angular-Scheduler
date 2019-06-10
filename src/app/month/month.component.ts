import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from '../calendar-session.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  private month: number;
  private year: number;

  daysOfMonth: string[][];

  constructor(private calendarSessionService: CalendarSessionService, private router: Router) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.year = this.calendarSessionService.PassedYear;
    this.calendarSessionService.passedMonth$.subscribe(
      (passedMonth) => {
        this.month = passedMonth;
        this.daysOfMonth = this.getDaysOfMonthGrid(this.getNumberOfDaysInMonth(this.month));
      }
    );
  }

  getNumberOfDaysInMonth(month: number): number {
    return new Date(this.year, month, 0).getDate();
  }

  getDaysOfMonthGrid(daysInMonth: number) {
    const daysOfMonth: string[][] = [];
    const firstDayOfMonth = this.getFirstDayOfMonth(this.year, this.month - 1);

    for (let i = 0, k = 1; i <= 5; i++) {
      daysOfMonth.push([]);
      for (let j = 1; j <= 7; j++, k++) {
        if (k > firstDayOfMonth && k <= firstDayOfMonth + daysInMonth) {
        daysOfMonth[i].push((k - firstDayOfMonth).toString());
        } else {
        daysOfMonth[i].push('');
        }
      }
    }
    return daysOfMonth;
  }

  getFirstDayOfMonth(year: number, month: number): number {
      return new Date(year, month, 1).getDay();
  }

}

