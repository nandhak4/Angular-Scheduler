import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MonthComponent } from './month/month.component';
import { AppRoutingModule } from './app-routing.module';
import { YearComponent } from './year/year.component';
import { DayComponent } from './day/day.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchedulebarComponent } from './schedulebar/schedulebar.component';
import { CustomInputComponent } from './shared/components/custom-input/custom-input.component';
import { AppInputTypeDirective } from './shared/directives/appInputType.directive';
import { ScheduleEventComponent } from './schedule-event/schedule-event.component';
import { DisplayMessageComponent } from './shared/components/display-message/display-message.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    YearComponent,
    DayComponent,
    ScheduleComponent,
    SchedulebarComponent,
    CustomInputComponent,
    AppInputTypeDirective,
    ScheduleEventComponent,
    DisplayMessageComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
