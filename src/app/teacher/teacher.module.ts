import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';

import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LecturesComponent } from './lectures/lectures.component';
import { LecturesService } from './lectures/lectures.service';






import { ComponentsModule } from '../shared/components/components.module';
import { LectuerPageComponent } from './lectures/lecturePage/profile.component';
import { SharedModule } from '../shared/shared.module';
import { DialogformComponent } from './dialogform/dialogform.component';
import { DeleteDialogComponentContent } from './lectures/lecturePage/delete/delete.component';
import { HomeworkService } from './homeworks/all-homeworks/homeworks.service';
import { DialogAnnouncementComponent } from './lesson-announcement/dialogform.component';
import { DeleteAnnouncementComponent } from './lectures/lecturePage/delete-announcement/delete.component';
import { DocuementDialogComponent } from './documentform/documentform.component';

@NgModule({
  declarations: [
    DashboardComponent,
    LecturesComponent,
    LectuerPageComponent,
    DialogformComponent,
    DeleteDialogComponentContent,
    DialogAnnouncementComponent,
    DeleteAnnouncementComponent,
    DocuementDialogComponent,
  ],
  imports: [
    CKEditorModule,
    CommonModule,
    TeacherRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [LecturesService,HomeworkService],
})
export class TeacherModule {}
