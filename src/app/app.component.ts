import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from './calendar-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public get ShowYear(): boolean {
    return this.calendarSessionService.ShowYear;
  }

  public get ShowMonth(): boolean {
    return this.calendarSessionService.ShowMonth;
  }

  public get ShowDay(): boolean {
    return this.calendarSessionService.ShowDay;
  }

  public get Year(): number {
    return this.calendarSessionService.PassedYear;
  }

  public get Month(): number {
    return this.calendarSessionService.PassedMonth + 1;
  }

  public get Day(): number {
    return this.calendarSessionService.PassedDay;
  }

  constructor(private calendarSessionService: CalendarSessionService, private router: Router) {
  }

  ngOnInit() {
    this.calendarSessionService.ShowCurrentMonth();
    this.SubscribeToNavigation();
  }

  SetCurrentDisplay(input: string) {
    this.calendarSessionService.SetCurrentDisplay(input);
  }

  GetNext() {
    this.calendarSessionService.GetNext();
  }

  GetPrevious() {
    this.calendarSessionService.GetPrevious();
  }

  private SubscribeToNavigation() {
    this.calendarSessionService.navigationSource$.subscribe((routePath) => {
      this.router.navigate([routePath]);
    });
  }

}
