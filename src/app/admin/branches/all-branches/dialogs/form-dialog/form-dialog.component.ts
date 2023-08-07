import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Branch } from '../../branch.model';
import { BranchService } from '../../branch.service';
import { HttpClient } from '@angular/common/http';
import { ClassroomService } from '../../../../classrooms/all-classrooms/classroom.service';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Classroom } from 'src/app/admin/classrooms/all-classrooms/classroom.model';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  Classrooms: Classroom[];
  branchForm: UntypedFormGroup;
  branch: Branch;
  selectedAcademicain:any;
  constructor(
    private httpClient: HttpClient,
    private classroomServices:ClassroomService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public branchService: BranchService,
    private fb: UntypedFormBuilder
  ) {
    this.getClassRooms();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.branch.name;
      this.branch = data.branch;
      this.branchForm = this.createContactForm();

    } else {
      this.dialogTitle = 'Add New Branch';
      this.branch = new Branch({});
      this.branchForm = this.createContactForm();
    }
  }
  formControl = new UntypedFormControl('', [
    Validators.required
  ]);
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id:[this.branch.id],
      class_room_id: [this.branch.class_room_id,[Validators.required]],
      name: [this.branch.name, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.branchService.updateBranch(this.branchForm.getRawValue());
    } else {
      this.branchService.addBranch(this.branchForm.getRawValue());
    }
  }

  getClassRooms() {
    this.classroomServices.getAllClassrooms();
    setTimeout(() => {
      this.Classrooms = this.classroomServices.data;
    }, 800);
  }
}
