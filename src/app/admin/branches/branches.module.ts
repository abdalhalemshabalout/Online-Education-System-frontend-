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


import { BranchesRoutingModule } from './branches-routing.module';
import { AllBranchesComponent } from './all-branches/all-branches.components';
// import { AddBranchComponent } from './add-branch/add-branch.component';
// import { DeleteComponent } from './all-branches/dialogs/delete/delete.component';
import { SharedModule } from '../../../app/shared/shared.module';
import { BranchService } from './all-branches/branch.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComponentsModule } from './../../shared/components/components.module';

@NgModule({
  declarations: [
    AllBranchesComponent,
    // AddBranchComponent,
    // DeleteComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    BranchesRoutingModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
  ],
  providers: [BranchService],
})
export class BranchesModule {}
