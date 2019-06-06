import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  weeks: number[] = [1, 8, 15, 22, 29, 36];
  month = 6;
  year = 2019;

  daysOfMonth: string[][];

  constructor() { }

  ngOnInit() {
    this.year = 2020;
    this.month = 5;
    const daysInMonth = this.getNumberOfDaysInMonth(this.month);
    this.daysOfMonth = this.getDaysOfMonthGrid(daysInMonth);
  }

  getNumberOfDaysInMonth(month: number): number {
    return new Date(this.year, this.month, 0).getDate();
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

