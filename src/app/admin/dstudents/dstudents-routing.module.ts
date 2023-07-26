import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDstudentComponent } from './all-dstudent/all-dstudent.component';
import { AddStudentComponent } from './add-dstudent/add-student.component';



const routes: Routes = [
  {
    path: 'all-dstudent',
    component: AllDstudentComponent
  },
  {
    path: 'add-dstudent',
    component: AddStudentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DstudentRoutingModule {}
