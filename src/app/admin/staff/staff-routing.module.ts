import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllStaffsComponent } from './all-staff/all-staff.components';
import { AddStaffComponent } from './add-staff/add-staff.component';


const routes: Routes = [
  {
    path: 'all-staff',
    component: AllStaffsComponent
  },
  {
    path: 'add-staff',
    component: AddStaffComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule {}
