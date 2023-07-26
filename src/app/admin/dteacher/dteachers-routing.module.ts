import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDteacherComponent } from './all-dteacher/all-dteacher.component';
import { AddTeacherComponent } from './add-dteacher/add-academician.component';



const routes: Routes = [
  {
    path: 'all-dteacher',
    component: AllDteacherComponent
  },
  {
    path: 'add-dteacher',
    component: AddTeacherComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DTeacherRoutingModule {}
