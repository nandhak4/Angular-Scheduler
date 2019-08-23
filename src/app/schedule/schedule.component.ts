import { Component, OnInit } from '@angular/core';
import { CalendarSessionService } from '../calendar-session.service';
import { ScheduleService } from '../schedule.service';
import { Schedule } from '../shared/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  schedulelist = [];
  schedules: Schedule[];
  hourWidthInPX: number;
  originalSchedule: Schedule[];

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
        if (lastScheduleEnd > this.schedules[i].fromTime) {
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
        let fromTime = schedule.fromTime;
        let toTime = schedule.toTime;
        if (!this.areDatesEqual(schedule.fromDate, schedule.toDate)) {
          if (this.isScheduleDateSameAsPassedDate(schedule.fromDate)) {
            toTime = 24;
          } else if (this.isScheduleDateSameAsPassedDate(schedule.toDate)) {
            fromTime = 0;
          } else if (this.isPassedDateWithinSchedule(schedule.fromDate, schedule.toDate)) {
            fromTime = 0; toTime = 24;
          }
        }
        this.schedules.push({
          fromDate: schedule.fromDate, toDate: schedule.toDate, fromTime, toTime,
          createdDate: schedule.createdDate, content: schedule.content, scheduleId: schedule.scheduleId
        });
      }
    }

    this.schedules = this.schedules.sort((a, b) => a.fromTime - b.fromTime || (a.createdDate >= b.createdDate ? -1 : 1));
  }

  private checkScheduleBelongsToPassedDate(schedule: Schedule): boolean {
    return this.isScheduleDateSameAsPassedDate(schedule.fromDate) || this.isScheduleDateSameAsPassedDate(schedule.toDate) ||
      this.isPassedDateWithinSchedule(schedule.fromDate, schedule.toDate);
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

  private pushSchedule(schedule, oldScheduleEnd, newSchedule: Schedule): void {
    if (oldScheduleEnd !== newSchedule.fromTime) {
      schedule.push(this.createScheduleDisplayElement(false, oldScheduleEnd, newSchedule.fromTime, ''));
    }

    schedule.push(this.createScheduleDisplayElement(true, newSchedule.fromTime, newSchedule.toTime, newSchedule.content));
  }

}
