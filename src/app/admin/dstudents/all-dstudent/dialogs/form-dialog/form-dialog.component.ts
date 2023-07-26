import { delay } from 'rxjs/operators';
import { colorSets } from '@swimlane/ngx-charts';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DstudentService } from '../../dstudents.service';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Dstudent } from '../../dstudent.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  dstudentForm: UntypedFormGroup;
  dstudent: Dstudent;
  department=[];
  selectedDepartment=[];
  faculty:[];
  lesson=[];
  student=[];
  selectedLesson=[];
  selectedStudent=[];
  selectedAcademicain:any;
  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dstudentService: DstudentService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dstudent = data.dstudent;
      this.dstudentForm = this.createContactForm();
      // this.departmentForm.get('hod').disabled;

    } else {
      this.dialogTitle = 'Yeni Bölüm Ekle Formu';
      this.dstudent = new Dstudent({});
      this.dstudentForm = this.createContactForm();
    }
    this.getFaculty();
    this.getDepartment();
    this.getLesson();
    this.getStudent();
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
      id: [this.dstudent.id],
      facultyId: [this.dstudent.facultyId, [Validators.required]],
      departmentId: [this.dstudent.departmentId, [Validators.required]],
      lessonId: [this.dstudent.lessonId, [Validators.required]],
      studentId: [this.dstudent.studentId, [Validators.required]],


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
      this.dstudentService.updateDstudent(this.dstudentForm.getRawValue());
    } else {
      this.dstudentService.addDstudent(this.dstudentForm.getRawValue());
    }
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
  // select on change on press the faculte
  onChangeSelect($event){
    var result=this.department.filter((e)=>{
      return e['faculty_id']==$event;
    });
    this.selectedDepartment= result;
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
  onChangeSelectLesson($event){
    var result=this.lesson.filter((e)=>{
      return e['department_id']==$event;
    });
    this.selectedLesson= result;
  }
  // select on change on press the faculte
  onChangeSelectStudent($event){
    var result=this.student.filter((e)=>{
      return e['department_id']==$event;
    });
    this.selectedStudent= result;
  }
  // get Lesson data
  public getLesson(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-lesson-name`).subscribe(data => {
      this.lesson=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // Get Country data
  public getStudent(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-students-name`).subscribe(data => {
      this.student=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }


}
