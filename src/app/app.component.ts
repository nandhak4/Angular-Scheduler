import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from './calendar-session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private calendarSessionService: CalendarSessionService, private router: Router) {
  }

  ngOnInit() {
    this.calendarSessionService.ShowCurrentMonth();
    this.SubscribeToNavigation();
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
