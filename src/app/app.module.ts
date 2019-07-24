import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MonthComponent } from './month/month.component';
import { AppRoutingModule } from './app-routing.module';
import { YearComponent } from './year/year.component';
import { DayComponent } from './day/day.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchedulebarComponent } from './schedulebar/schedulebar.component';
import { CustomInputComponent } from './shared/components/custom-input/custom-input.component';
import { InputTypeDirective } from './shared/directives/input-type.directive';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    YearComponent,
    DayComponent,
    ScheduleComponent,
    SchedulebarComponent,
    CustomInputComponent,
    InputTypeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
