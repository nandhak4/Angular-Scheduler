import { NgModule } from '@angular/core';
import { MonthComponent } from './month/month.component';
import { RouterModule, Routes } from '@angular/router';
import { YearComponent } from './year/year.component';


const routes: Routes = [
  { path: '', component: YearComponent},
  { path: 'month', component: MonthComponent}
];


@NgModule({
 exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
