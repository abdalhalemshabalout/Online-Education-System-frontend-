import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllAnnouncementComponent } from './all-announcements/all-announcement.component';
import { AddAnnouncementComponent } from './add-announcement/add-announcement.component';


const routes: Routes = [
  {
    path: 'all-announcements',
    component: AllAnnouncementComponent
  },
  {
    path: 'add-announcement',
    component: AddAnnouncementComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule {}
