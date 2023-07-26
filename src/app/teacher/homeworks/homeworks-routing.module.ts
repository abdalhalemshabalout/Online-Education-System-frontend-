import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllHomeworkComponent } from './all-homeworks/all-homework.component';
import { AddHomeworkComponent } from './add-homework/add-homework.component';

const routes: Routes = [
  {
    path: 'all-homeworks',
    component: AllHomeworkComponent
  },
  {
    path: 'add-homework',
    component: AddHomeworkComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeworksRoutingModule {}
