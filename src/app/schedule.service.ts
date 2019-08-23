import { Injectable } from '@angular/core';
import { Schedule, ScheduleInfo } from './shared/schedule.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) { }
  private currentDate = new Date();
  private schedules: ScheduleInfo[] = [
    {
      Id: '1',
      begin: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 0, 30).toString(),
      end: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 7, 36).toString(),
      createdDate: new Date(),
      content: null
    },
    {
      Id: '2',
      begin: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 1, 0, 30).toString(),
      end: new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 7, 36).toString(),
      createdDate: new Date(),
      content: null
    }
  ];

  getAllSchedules(): Schedule[] {
    return this.schedules.map(schedule => {
      const begin = new Date(schedule.begin);
      const end = new Date(schedule.end);

      return {
        scheduleId: schedule.Id,
        fromDate: new Date(begin.getFullYear(), begin.getMonth(), begin.getDate()),
        fromTime: +(begin.getHours() + +(begin.getMinutes() / 60)).toFixed(2),
        toDate: new Date(end.getFullYear(), end.getMonth(), end.getDate()),
        toTime: +(end.getHours() + +(end.getMinutes() / 60)).toFixed(2),
        createdDate: schedule.createdDate,
        content: schedule.content
      } as Schedule;
    });
  }

  getSchedule(id: string): Schedule {
    return new Schedule();
  }

  createSchedule(schedule: ScheduleInfo): boolean {
    this.schedules.push(schedule);
    return true;
  }

  updateSchedule(): boolean {
    return true;
  }

  removeSchedule(id: string): boolean {
    this.schedules = this.schedules.filter(schedule => schedule.Id !== id);
    return true;
  }

}
