import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from '../calendar-session.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
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

  constructor(private calendarSessionService: CalendarSessionService) { }

  ngOnInit() {
  }

  SetCurrentDisplay(input: string) {
    this.calendarSessionService.SetCurrentDisplay(input);
  }

}
