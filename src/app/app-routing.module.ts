import { NgModule } from '@angular/core';
import { MonthComponent } from './month/month.component';
import { RouterModule, Routes } from '@angular/router';
import { YearComponent } from './year/year.component';
import { DayComponent } from './day/day.component';


const routes: Routes = [
  { path: '', component: MonthComponent },
  { path: 'year', component: YearComponent },
  { path: 'month', component: MonthComponent },
  { path: 'day', component: DayComponent }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
