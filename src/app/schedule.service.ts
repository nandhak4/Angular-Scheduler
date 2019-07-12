import { Injectable } from '@angular/core';
import { Schedule } from './shared/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }

  private originalSchedules: Schedule[] = [
    {
      fromDate: new Date(2019, 6, 3),
      toDate: new Date(2019, 6, 5),
      fromTime: 0.6,
      toTime: 2,
      createdDate: new Date(2019, 6, 3),
      content: null
    },
    {
      fromDate: new Date(),
      toDate: new Date(),
      fromTime: 0,
      toTime: 3,
      createdDate: new Date(),
      content: null
    }
  ];

  getAllSchedules(): Schedule[] {
    return this.originalSchedules;
  }


}
