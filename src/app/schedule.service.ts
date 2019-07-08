import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }

  private originalSchedules = [
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
    }
  ];

  getAllSchedules() {
    return this.originalSchedules;
  }


}
