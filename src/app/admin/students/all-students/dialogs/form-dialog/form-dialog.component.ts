import { Classroom } from './../../../../classrooms/all-classrooms/classroom.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../../students.service';
import { Branch } from 'src/app/admin/branches/all-branches/branch.model';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Students } from '../../students.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]

})
export class FormDialogComponent {
  selectedBranch = [];
  Branches: Branch[];
  Classrooms: Classroom[];
  action: string;
  dialogTitle: string;
  studentForm: UntypedFormGroup;
  students: Students;

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Student Edit Form';
      this.students = data.students;
      this.studentForm = this.createContactForm();
    } else {
      this.dialogTitle = 'Add New Student Form';
      this.students = new Students({});
      this.studentForm = this.createContactForm();
    }
    this.studentsService.getAllBranches();
    this.studentsService.getAllClassrooms();
    setTimeout(() => {
      this.Branches = (this.studentsService.allBranches.value);
      this.Classrooms = this.studentsService.allClassrooms.value;
    }, 1000);
  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.students.id],
      class_room_id: [this.students.class_room_id],
      ClassName: [this.students.className],
      branch_id: [this.students.branch_id],
      BranchName: [this.students.branchName],
      name: [this.students.name || ''],
      surname: [this.students.surname || ''],
      gender: [this.students.gender],
      identity_number: [this.students.identity_number || ''],
      birth_date: [this.students.birth_date],
      phone_number: [this.students.phone_number || ''],
      email: [
        this.students.email || '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: [this.students.password || ''],
      c_password: [this.students.c_password || ''],
      address: [this.students.address],
    });
  }
  submit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.studentsService.updateStudents(this.studentForm.getRawValue());
    } else {
      this.studentsService.addStudents(this.studentForm.getRawValue());
    }
  }

  // select on change on press the classroom
  onChangeSelect($event) {
    var result = this.Branches.filter((e) => {
      return e['class_room_id'] == $event;
    });
    this.selectedBranch = result;
  }
}
