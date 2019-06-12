import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MonthComponent } from './month/month.component';
import { AppRoutingModule } from './app-routing.module';
import { YearComponent } from './year/year.component';

@NgModule({
  declarations: [
    AppComponent,
    MonthComponent,
    YearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
