import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';


import { DstudentRoutingModule } from './dstudents-routing.module';
import {AddStudentComponent} from './add-dstudent/add-student.component';
import { AllDstudentComponent } from './all-dstudent/all-dstudent.component';
import { DeleteDialogComponent } from './all-dstudent/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-dstudent/dialogs/form-dialog/form-dialog.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from 'src/app/core/service/auth.service';
import { DstudentService } from './all-dstudent/dstudents.service';

@NgModule({
  declarations: [
    AddStudentComponent,
    AllDstudentComponent,
    DeleteDialogComponent,
    FormDialogComponent,
  ],
  imports: [
    MatSortModule,
    MatDialogModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatMenuModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    DstudentRoutingModule,
    ComponentsModule,
    SharedModule,
    MatPaginatorModule,

  ],
  providers: [DstudentService],
})
export class DstudentModule {}
