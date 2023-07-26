import { delay } from 'rxjs/operators';
import { colorSets } from '@swimlane/ngx-charts';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DteacherService } from '../../dteacher.service';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Dteacher } from '../../dteacher.model';
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
  lesson=[];
  academician=[];
  selectedLesson=[];
  selectedAcademician=[];
  action: string;
  dialogTitle: string;
  dteacherForm: UntypedFormGroup;
  dteacher: Dteacher;
  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dteacherService: DteacherService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Derse Eğitmeni';
      this.dteacher = data.dteacher;
      this.dteacherForm = this.createContactForm();
    } else {
      this.dialogTitle = 'Derse Eğitmen Ekleme Formu';
      this.dteacher = new Dteacher({});
      this.dteacherForm = this.createContactForm();
    }
    this.getFaculty();
    this.getDepartment();
    this.getLesson();
    this.getAcademician();

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
      id: [this.dteacher.id],
      facultyId: [this.dteacher.facultyId],
      departmentId: [this.dteacher.departmentId],
      lessonId: [this.dteacher.lessonId],
      academicianId: [this.dteacher.academicianId],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
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
  //Get Department data
  public getDepartment(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-department-name`).subscribe(data => {
      this.department=(data['data']);
    },
    (err: HttpErrorResponse) => {
     // error code here
    });
  }
  //select lesson in department
  onChangeSelectLesson($event){
    var result=this.lesson.filter((e)=>{
      return e['department_id']==$event;
    });
    this.selectedLesson= result;
  }
  //select academician in department
  onChangeSelectAcademician($event){
    var result=this.academician.filter((e)=>{
      return e['department_id']==$event;
    });
    this.selectedAcademician= result;
  }
  //Get Lesson data
  public getLesson(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-lesson-name`).subscribe(data => {
      this.lesson=(data['data']);
    },
    (err: HttpErrorResponse) => {
      // error code here
    });
  }
  //Get Country data
  public getAcademician(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-academician-name`).subscribe(data => {
      this.academician=(data['data']);
    },
    (err: HttpErrorResponse) => {
      // error code here
    });
  }
  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.dteacherService.updateDteacher(this.dteacherForm.getRawValue());
    } else {
      this.dteacherService.addDteacher(this.dteacherForm.getRawValue());
    }
  }
}
