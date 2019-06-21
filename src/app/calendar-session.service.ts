import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarSessionService {

  private passedDateSource = new BehaviorSubject<Date>(undefined);

  passedDate$ = this.passedDateSource.asObservable();

  private navigationSource = new BehaviorSubject<string>('');

  navigationSource$ = this.navigationSource.asObservable();

  private readonly currentDate: Date = new Date();
  public get CurrentDate(): Date {
    return this.currentDate;
  }

  public get PassedDate(): Date {
    return new Date(this.PassedYear, this.PassedMonth, this.PassedDay);
  }

  private passedYear = -1;
  public get PassedYear(): number {
    return this.passedYear < 0 ? this.currentDate.getFullYear() : this.passedYear;
  }
  public set PassedYear(value: number) {
    this.passedYear = value;
    this.passedDateSource.next(this.PassedDate);
  }

  private passedMonth = -1;
  public get PassedMonth(): number {
    return this.passedMonth < 0 ? this.currentDate.getMonth() : this.passedMonth;
  }
  public set PassedMonth(value: number) {
    this.passedMonth = value;
    this.passedDateSource.next(this.PassedDate);
  }

  private passedDay = -1;
  public get PassedDay(): number {
    return this.passedDay < 0 ? this.currentDate.getDate() : this.passedDay;
  }
  public set PassedDay(value: number) {
    this.passedDay = value;
    this.passedDateSource.next(this.PassedDate);
  }

  private showYear = false;
  public get ShowYear(): boolean {
    return this.showYear;
  }

  private showMonth = false;
  public get ShowMonth(): boolean {
    return this.showMonth;
  }

  private showDay = false;
  public get ShowDay(): boolean {
    return this.showDay;
  }

  public get IsCurrentYearDisplayed(): boolean {
    return this.CurrentDate.getFullYear() === this.PassedDate.getFullYear();
  }

  public get IsCurrentMonthDisplayed(): boolean {
    return this.IsCurrentYearDisplayed ? this.CurrentDate.getMonth() === this.PassedDate.getMonth() : false;
  }

  public get IsCurrentDayDisplayed(): boolean {
    return this.IsCurrentMonthDisplayed ? this.CurrentDate.getDay() === this.PassedDate.getDay() : false;
  }

  constructor() {
    this.SetCurrentDisplay('');
  }

  SetCurrentDisplay(display: string) {
    this.Reset();
    switch (display) {
      case 'D': {
        this.DisplayDay();
        break;
      }
      case 'M': {
        this.DisplayMonth();
        break;
      }
      case 'Y': {
        this.DisplayYear();
        break;
      }
      default: {
        this.DisplayDefault();
        break;
      }
    }

  }

  private DisplayDefault() {
    this.showMonth = true;
    this.navigationSource.next('');
  }

  private DisplayYear() {
    this.showYear = true;
    this.navigationSource.next('year');
  }

  private DisplayMonth() {
    this.showMonth = true;
    this.navigationSource.next('month');
  }

  private DisplayDay() {
    this.showDay = true;
    this.navigationSource.next('day');
  }

  private Reset() {
    this.showYear = false;
    this.showMonth = false;
    this.showDay = false;
  }

  ShowCurrentMonth() {
    this.passedDateSource.next(this.PassedDate);
  }

  GetNext() {
    if (this.ShowDay) {
      return this.GetNextDay();
    } else if (this.ShowMonth) {
      this.GetNextMonth();
    } else if (this.ShowYear) {
      this.GetNextYear();
    }
  }

  private GetNextYear() {
    this.PassedYear += 1;
  }

  private GetNextMonth() {
    if (this.PassedMonth === 11) {
      this.GetNextYear();
      this.PassedMonth = 0;
    } else {
      this.PassedMonth += 1;
    }
  }

  private GetNextDay() {
    if (this.PassedDay === this.GetNumberOfDaysInMonth()) {
      this.GetNextMonth();
      this.PassedDay = 1;
    } else {
      this.PassedDay += 1;
    }
  }

  GetPrevious() {
    if (this.ShowDay) {
      return this.GetPreviousDay();
    } else if (this.ShowMonth) {
      this.GetPreviousMonth();
    } else if (this.ShowYear) {
      this.GetPreviousYear();
    }
  }

  private GetPreviousYear() {
    this.PassedYear -= 1;
  }

  private GetPreviousMonth() {
    if (this.PassedMonth === 0) {
      this.GetPreviousYear();
      this.PassedMonth = 11;
    } else {
      this.PassedMonth -= 1;
    }
  }

  private GetPreviousDay() {
    if (this.PassedDay === 1) {
      this.GetPreviousMonth();
      this.PassedDay = this.GetNumberOfDaysInMonth();
    } else {
      this.PassedDay -= 1;
    }
  }

  public GetNumberOfDaysInMonth(): number {
    return new Date(this.PassedYear, this.PassedMonth + 1, 0).getDate();
  }
}
