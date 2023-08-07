import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CourseService } from '../../courses.service';
import { HttpClient } from '@angular/common/http';
import { Classroom } from './../../../../classrooms/all-classrooms/classroom.model';
import { Branch } from 'src/app/admin/branches/all-branches/branch.model';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Course } from '../../course.model';
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
    courseForm: UntypedFormGroup;
    course: Course;
  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public courseService:CourseService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.course.name;
      this.course = data.course;
      this.courseForm = this.createContactForm();
    } else {
        this.dialogTitle = 'Add new course';
        this.course = new Course({});
        this.courseForm = this.createContactForm();
      }
      this.courseService.getAllBranches();
      this.courseService.getAllClassrooms();
      setTimeout(() => {
        this.Branches = (this.courseService.allBranches.value);
        this.Classrooms = this.courseService.allClassrooms.value;
      }, 1000);
  }
  formControl = new UntypedFormControl('', [
    Validators.required
  ]);

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.course.id],
      class_room_id: [this.course.class_room_id],
      ClassName: [this.course.className],
      branch_id: [this.course.branch_id],
      BranchName: [this.course.branchName],
      name: [this.course.name || ''],
      code: [this.course.code],
      timer: [this.course.timer],
      detaily: [this.course.detaily]
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
      this.courseService.updateLesson(this.courseForm.getRawValue());
    } else {
      this.courseService.addLesson(this.courseForm.getRawValue());
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
