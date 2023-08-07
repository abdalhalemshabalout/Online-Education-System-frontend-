import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeachersService } from '../../teachers.service';
import { Classroom } from './../../../../classrooms/all-classrooms/classroom.model';
import { Branch } from '../../../../branches/all-branches/branch.model';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Teachers } from '../../teachers.model';

import { formatDate } from '@angular/common';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
})
export class FormDialogComponent {
  selectedBranch = [];
  Branches: Branch[];
  Classrooms: Classroom[];
  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  teachers: Teachers;
  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public teachersService: TeachersService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults

    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.name+ ' ' +data.teachers.surname;
      this.teachers = data.teachers;
      this.proForm = this.createContactForm();

    }
     else {
       this.dialogTitle = 'Add New Teacher';
       this.teachers = new Teachers({});
       this.proForm = this.createContactForm();
      }
      this.teachersService.getAllBranches();
      this.teachersService.getAllClassrooms();
      setTimeout(() => {
        this.Branches = (this.teachersService.allBranches.value);
        this.Classrooms = this.teachersService.allClassrooms.value;
      }, 1000);

  }
  formControl = new UntypedFormControl('', [
    Validators.required,
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
      id: [this.teachers.id],
      class_room_id: [this.teachers.class_room_id],
      ClassName: [this.teachers.className],
      branch_id: [this.teachers.branch_id],
      BranchName: [this.teachers.branchName],
      name: [this.teachers.name],
      surname: [this.teachers.surname],
      gender: [this.teachers.gender],
      identity_number: [this.teachers.identity_number],
      birth_date: [this.teachers.birth_date],
      phone_number: [this.teachers.phone_number],
      email: [
        this.teachers.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: [this.teachers.password],
      c_password: [this.teachers.c_password],
      address: [this.teachers.address],
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
      this.teachersService.updateTeachers(this.proForm.getRawValue());
    } else {
      this.teachersService.addTeachers(this.proForm.getRawValue());
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
