import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'classrooms',
    loadChildren: () =>
      import('./classrooms/classrooms.module').then((m) => m.ClassroomsModule),
  },
  {
    path: 'branches',
    loadChildren: () =>
      import('./branches/branches.module').then((m) => m.BranchesModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffsModule),
  },
  // {
  //   path: 'teachers',
  //   loadChildren: () =>
  //     import('./teachers/teachers.module').then((m) => m.TeachersModule),
  // },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'announcement',
    loadChildren: () =>
      import('./announcements/announcements.module').then(
        (m) => m.AnnouncementsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
