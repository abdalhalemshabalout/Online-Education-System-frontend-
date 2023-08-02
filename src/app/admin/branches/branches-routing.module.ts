import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBranchesComponent } from './all-branches/all-branches.components';
import { AddBranchComponent } from './add-branch/add-branch.component';


const routes: Routes = [
  {
    path: 'all-branches',
    component: AllBranchesComponent
  },
  {
    path: 'add-branch',
    component: AddBranchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule {}
