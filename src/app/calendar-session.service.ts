import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarSessionService {

  private readonly currentDate: Date = new Date();
  public get CurrentDate(): Date {
    return this.currentDate;
  }

  private passedDate: Date;
  public get PassedDate(): Date {
    return this.passedDate;
  }
  public set PassedDate(value: Date) {
    this.passedDate = value;
    this.passedYear = this.passedDate.getFullYear();
    this.passedMonth = this.passedDate.getMonth();
    this.passedDay = this.passedDate.getDate();
  }

  private passedYear = -1;
  public get PassedYear(): number {
    return this.passedYear < 0 ? this.currentDate.getFullYear() : this.passedYear;
  }
  public set PassedYear(value: number) {
    this.passedYear = value;
  }

  private passedMonth = -1;
  public get PassedMonth(): number {
    return this.passedMonth < 0 ? this.currentDate.getMonth() + 1 : this.passedMonth;
  }
  public set PassedMonth(value: number) {
    this.passedMonth = value;
    this.passedMonthSource.next(this.passedMonth);
  }

  private passedDay = -1;
  public get PasseDay(): number {
    return this.passedDay < 0 ? this.currentDate.getDate() : this.passedDay;
  }
  public set PassedDay(value: number) {
    this.passedDay = value;
  }

  constructor() {
  }

 passedMonthSource = new BehaviorSubject<number>(-1);

  passedMonth$ = this.passedMonthSource.asObservable();

  ShowCurrentMonth() {
    this.passedMonthSource.next(this.PassedMonth);
  }

  GetNextMonth(displayedMonth: number) {
    this.PassedMonth = displayedMonth + 1;
  }

  GetPreviousMonth(displayedMonth: number) {
    this.PassedMonth = displayedMonth - 1;
  }

}
