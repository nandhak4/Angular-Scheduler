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
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 0.6,
      end: 2,
      created: 1
    },
    {
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 2,
      end: 4,
      created: 3
    },
    {
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 2,
      end: 5,
      created: 2
    },
    {
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 2,
      end: 5,
      created: 4
    },
    {
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 2,
      end: 5,
      created: 5
    },
    {
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 2,
      end: 5,
      created: 6
    },
    {
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 2,
      end: 5,
      created: 7
    },
    {
      beginDate: new Date().getDate(),
      endDate: new Date().getDate(),
      begin: 2,
      end: 5,
      created: 8
    }
  ];

  schedulelist = [];
  schedules = [];

  constructor(private calendarSessionService: CalendarSessionService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.calendarSessionService.passedDate$.subscribe(
      (passedDate) => {
        this.resetSchedules();
        this.processOriginalSchedules(this.calendarSessionService.PassedDay);
        this.getSchedules();
      });
  }

  private resetSchedules(): void {
    this.schedules = [];
    this.schedulelist = [];
  }

  private getSchedules(): void {
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

  private processOriginalSchedules(selectedDate: number): void {
    for (const schedule of this.originalSchedule) {
      if (this.calendarSessionService.IsCurrentDayDisplayed) {
        let begin = schedule.begin;
        let end = schedule.end;
        if (schedule.beginDate !== schedule.endDate) {
          if (schedule.beginDate === selectedDate) {
            end = 24;
          } else {
            begin = 0;
          }
        }
        this.schedules.push({ beginDate: schedule.beginDate, endDate: schedule.endDate, begin, end, content: schedule.created });
      }
    }

    this.schedules = this.schedules.sort((a, b) => a.begin - b.begin || a.content - b.content);
  }

  private createScheduleDisplayElement(isSchedule: boolean, begin: number, end: number, content: any) {
    return {
      isSchedule,
      begin,
      end,
      content,
      width: (end - begin) * 100
    };
  }

  private pushSchedule(schedule, oldScheduleEnd, newSchedule): void {
    if (oldScheduleEnd !== newSchedule.begin) {
      schedule.push(this.createScheduleDisplayElement(false, oldScheduleEnd, newSchedule.begin, ''));
    }

    schedule.push(this.createScheduleDisplayElement(true, newSchedule.begin, newSchedule.end, newSchedule.content));
  }

}
