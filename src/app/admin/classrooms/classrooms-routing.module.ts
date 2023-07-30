import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllClassroomsComponent } from './all-classrooms/all-classrooms.components';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';


const routes: Routes = [
  {
    path: 'all-classrooms',
    component: AllClassroomsComponent
  },
  {
    path: 'add-classroom',
    component: AddClassroomComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomsRoutingModule {}
