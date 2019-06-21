import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from '../calendar-session.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  private readonly hoursOfDay = ['12AM - 1AM', '1AM - 2AM', '2AM - 3AM', '3AM - 4AM', '4AM - 5AM', '5AM - 6AM',
    '6AM - 7AM', '7AM - 8AM', '8AM - 9AM', '9AM - 10AM', '10AM - 11AM', '11AM - 12PM',
    '12PM - 1PM', '1PM - 2PM', '2PM - 3PM', '3PM - 4PM', '4PM - 5PM', '5PM - 6PM',
    '6PM - 7PM', '7PM - 8PM', '8PM - 9PM', '9PM - 10PM', '10PM - 11PM', '11PM - 12AM'];

  private get DisplayHours() {
    const currentHour = this.calendarSessionSevice.CurrentDate.getHours();
    const isCurrentDisplayed = this.calendarSessionSevice.IsCurrentDayDisplayed;
    const hours = [];

    for (let i = 0; i < this.hoursOfDay.length; i++) {
      hours.push({
        period: this.hoursOfDay[i],
        isCurrentHour: isCurrentDisplayed && i === currentHour
      });
    }
    return hours;
  }

  constructor(private calendarSessionSevice: CalendarSessionService) {
  }

  ngOnInit() {
  }

}
