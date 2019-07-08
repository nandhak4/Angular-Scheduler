import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulebarComponent } from './schedulebar.component';

describe('SchedulebarComponent', () => {
  let component: SchedulebarComponent;
  let fixture: ComponentFixture<SchedulebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
