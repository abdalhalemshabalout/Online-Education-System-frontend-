import { delay } from 'rxjs/operators';
import { colorSets } from '@swimlane/ngx-charts';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CourseService } from '../../courses.service';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

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
    department=[];
    selectedDepartment=[];
    faculty:[];
    dclass=[];
    claId = 0;
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
      this.dialogTitle = data.course.lessonName;
      // this.claId = data.course.classId;
      this.course = data.course;
      
      this.courseForm = this.createContactForm();
    } else {
        this.dialogTitle = 'Yeni Ders Ekle Formu';
        this.course = new Course({});
        this.courseForm = this.createContactForm();
        this.getFaculty();
        this.getDepartment(); 
      }
      this.getClass();
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
      id: [this.course.id],
      facultyId: [this.course.facultyId, [Validators.required]],
      departmentId: [this.course.departmentId, [Validators.required]],
      classId: [this.course.classId || '',[Validators.required]],
      lessonName: [this.course.lessonName, [Validators.required]],
      lessonTime: [this.course.lessonTime],
      lessonCode: [this.course.lessonCode],
      akts: [this.course.akts, [Validators.required]],
      kredi: [this.course.kredi, [Validators.required]],
      detaily: [this.course.detaily],
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


  public getDepartment(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-department-name`).subscribe(data => {
      this.department=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

  // select on change on press the faculte
   onChangeSelect($event){
    var result=this.department.filter((e)=>{
      return e['faculty_id']==$event;
    });
    this.selectedDepartment= result;
  }

  // get Faculty data
  public getFaculty(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-faculty`).subscribe(data => {
      this.faculty=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

  // Get Class data
  public getClass(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-class`).subscribe(data => {
      this.dclass=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }


}
