import { NgModule } from '@angular/core';
import { MonthComponent } from './month/month.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: MonthComponent}
];


@NgModule({
 exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
