import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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
    return this.passedMonth < 0 ? this.currentDate.getMonth() + 1 : this.passedMonth;
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
        this.DisplayYear();
        break;
      }
    }

  }

  private DisplayDefault() {
    this.showYear = true;
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
      return;
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
    if (this.PassedMonth === 12) {
      this.PassedMonth = 1;
      this.GetNextYear();
    } else {
    this.PassedMonth += 1;
    }
  }

  GetPrevious() {
    if (this.ShowDay) {
      return;
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
    if (this.PassedMonth === 1) {
      this.PassedMonth = 12;
      this.GetPreviousYear();
    } else {
    this.PassedMonth -= 1;
    }
  }

}
