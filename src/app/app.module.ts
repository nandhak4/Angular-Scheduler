import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MonthComponent } from './month/month.component';
import { AppRoutingModule } from './app-routing.module';
import { YearComponent } from './year/year.component';
import { DayComponent } from './day/day.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchedulebarComponent } from './schedulebar/schedulebar.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    YearComponent,
    DayComponent,
    ScheduleComponent,
    SchedulebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
