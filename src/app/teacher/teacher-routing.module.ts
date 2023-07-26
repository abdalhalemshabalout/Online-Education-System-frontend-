import { LecturesComponent } from './lectures/lectures.component';
import { Page404Component } from './../authentication/page404/page404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LectuerPageComponent} from './lectures/lecturePage/profile.component';


const routes: Routes = [
  {
    path: 'homeworks',
    loadChildren: () =>
      import('./homeworks/homeworks.module').then((m) => m.HomeworksModule),
  },
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
export class TeacherRoutingModule {}
