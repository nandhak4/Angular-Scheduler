import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from '../calendar-session.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  originalSchedule = [
    {
      beginDate: new Date(2019, 6, 3),
      endDate: new Date(2019, 6, 5),
      begin: 0.6,
      end: 2,
      created: 1
    },
    {
      beginDate: new Date(),
      endDate: new Date(),
      begin: 0,
      end: 3,
      created: 2
    },
    // {
    //   beginDate: new Date(),
    //   endDate: new Date(),
    //   begin: 2,
    //   end: 5,
    //   created: 2
    // },
    // {
    //   beginDate: new Date(),
    //   endDate: new Date(),
    //   begin: 2,
    //   end: 5,
    //   created: 4
    // },
    // {
    //   beginDate: new Date(),
    //   endDate: new Date(),
    //   begin: 2,
    //   end: 5,
    //   created: 5
    // },
    // {
    //   beginDate: new Date(),
    //   endDate: new Date(),
    //   begin: 2,
    //   end: 5,
    //   created: 6
    // },
    // {
    //   beginDate: new Date(),
    //   endDate: new Date(),
    //   begin: 2,
    //   end: 5,
    //   created: 7
    // },
    // {
    //   beginDate: new Date(),
    //   endDate: new Date(),
    //   begin: 2,
    //   end: 5,
    //   created: 8
    // }
  ];

  schedulelist = [];
  schedules = [];
  hourWidthInPX: number;

  constructor(private calendarSessionService: CalendarSessionService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.hourWidthInPX = this.calendarSessionService.HourWidthInPX;
    this.calendarSessionService.passedDate$.subscribe(
      (passedDate) => {
        this.processOriginalSchedules();
        this.displaySchedules();
      });
  }

  private resetSchedules(): void {
    this.schedules = [];
    this.schedulelist = [];
  }

  private displaySchedules(): void {
    for (let i = 0, j = 0; i < this.schedules.length; i++) {
      if (this.schedulelist[j] === null || this.schedulelist[j] === undefined) {
        this.schedulelist[j] = [];
        this.pushSchedule(this.schedulelist[j], 0, this.schedules[i]);
        j = 0;
      } else {
        const lastScheduleEnd = this.schedulelist[j][this.schedulelist[j].length - 1].end;
        if (lastScheduleEnd > this.schedules[i].begin) {
          j++; i--;
        } else {
          this.pushSchedule(this.schedulelist[j], lastScheduleEnd, this.schedules[i]);
          j = 0;
        }
      }
    }
  }

  private processOriginalSchedules(): void {
    this.resetSchedules();
    for (const schedule of this.originalSchedule) {
      if (this.checkScheduleBelongsToPassedDate(schedule)) {
        let begin = schedule.begin;
        let end = schedule.end;
        if (!this.AreDatesEqual(schedule.beginDate, schedule.endDate)) {
          if (this.IsScheduleDateSameAsPassedDate(schedule.beginDate)) {
            end = 24;
          } else if (this.IsScheduleDateSameAsPassedDate(schedule.endDate)) {
            begin = 0;
          } else if (this.IsPassedDateWithinSchedule(schedule.beginDate, schedule.endDate)) {
            begin = 0; end = 24;
          }
        }
        this.schedules.push({ beginDate: schedule.beginDate, endDate: schedule.endDate, begin, end, content: schedule.created });
      }
    }

    this.schedules = this.schedules.sort((a, b) => a.begin - b.begin || a.content - b.content);
  }

  private checkScheduleBelongsToPassedDate(schedule): boolean {
    return this.IsScheduleDateSameAsPassedDate(schedule.beginDate) || this.IsScheduleDateSameAsPassedDate(schedule.endDate) ||
      this.IsPassedDateWithinSchedule(schedule.beginDate, schedule.endDate);
  }

  private IsScheduleDateSameAsPassedDate(scheduleDate: Date): boolean {
    return this.AreDatesEqual(scheduleDate, this.calendarSessionService.PassedDate);
  }

  private IsPassedDateWithinSchedule(begin: Date, end: Date): boolean {
    return begin < this.calendarSessionService.PassedDate && this.calendarSessionService.PassedDate < end;
  }

  private AreDatesEqual(date1: Date, date2: Date) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }

  private createScheduleDisplayElement(isSchedule: boolean, begin: number, end: number, content: any) {
    return { isSchedule, begin, end, content, width: (end - begin) * this.hourWidthInPX };
  }

  private pushSchedule(schedule, oldScheduleEnd, newSchedule): void {
    if (oldScheduleEnd !== newSchedule.begin) {
      schedule.push(this.createScheduleDisplayElement(false, oldScheduleEnd, newSchedule.begin, ''));
    }

    schedule.push(this.createScheduleDisplayElement(true, newSchedule.begin, newSchedule.end, newSchedule.content));
  }

}
