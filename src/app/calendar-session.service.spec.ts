import { TestBed } from '@angular/core/testing';

import { CalendarSessionService } from './calendar-session.service';

describe('CalendarSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarSessionService = TestBed.get(CalendarSessionService);
    expect(service).toBeTruthy();
  });
});
