import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from '../calendar-session.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedulelist = [];
  schedules = [];
  hourWidthInPX: number;
  originalSchedule;

  constructor(private calendarSessionService: CalendarSessionService, private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.hourWidthInPX = this.calendarSessionService.HourWidthInPX;
    this.originalSchedule = this.scheduleService.getAllSchedules();
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
        if (!this.areDatesEqual(schedule.beginDate, schedule.endDate)) {
          if (this.isScheduleDateSameAsPassedDate(schedule.beginDate)) {
            end = 24;
          } else if (this.isScheduleDateSameAsPassedDate(schedule.endDate)) {
            begin = 0;
          } else if (this.isPassedDateWithinSchedule(schedule.beginDate, schedule.endDate)) {
            begin = 0; end = 24;
          }
        }
        this.schedules.push({ beginDate: schedule.beginDate, endDate: schedule.endDate, begin, end, content: schedule.created });
      }
    }

    this.schedules = this.schedules.sort((a, b) => a.begin - b.begin || a.content - b.content);
  }

  private checkScheduleBelongsToPassedDate(schedule): boolean {
    return this.isScheduleDateSameAsPassedDate(schedule.beginDate) || this.isScheduleDateSameAsPassedDate(schedule.endDate) ||
      this.isPassedDateWithinSchedule(schedule.beginDate, schedule.endDate);
  }

  private isScheduleDateSameAsPassedDate(scheduleDate: Date): boolean {
    return this.areDatesEqual(scheduleDate, this.calendarSessionService.PassedDate);
  }

  private isPassedDateWithinSchedule(begin: Date, end: Date): boolean {
    return begin < this.calendarSessionService.PassedDate && this.calendarSessionService.PassedDate < end;
  }

  private areDatesEqual(date1: Date, date2: Date): boolean {
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
