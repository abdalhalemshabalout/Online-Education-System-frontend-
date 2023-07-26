import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LecturesComponent } from './lectures/lectures.component';
import { LectuerPageComponent} from './lectures/lecturePage/profile.component'



const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'lectures',
    component: LecturesComponent,
  },
  {
    path: 'lecturePage',
    component: LectuerPageComponent,
  },

  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
