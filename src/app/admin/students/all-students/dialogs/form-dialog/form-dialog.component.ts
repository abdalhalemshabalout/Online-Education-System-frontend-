import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { StudentsService } from '../../students.service';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Students } from '../../students.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { formatDate } from '@angular/common';
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
  countrise:[];
  dclass=[];
  action: string;
  dialogTitle: string;
  studentForm: UntypedFormGroup;
  students: Students;
  imgUrl=environment.imgUrl;

  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.name+ ' ' +data.students.surname;
      this.imgUrl+=data.students.img;
      this.students = data.students;
      this.studentForm = this.createContactForm();
    } else {
      this.dialogTitle = 'Add new student';
      this.students = new Students({});
      this.studentForm = this.createContactForm();
    }
    // this.getFaculty();
    // this.getDepartment();
    // this.getCountry();
    // this.getClass();
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
      name: [this.students.name || ''],
      surname: [this.students.surname || ''],
      identity_number: [this.students.identity_number || ''],
      class_room_id: [this.students.class_room_id],
      gender: [this.students.gender],
      birth_date: [this.students.birth_date],
      phone_number: [this.students.phone_number || ''],
      branch_id: [this.students.branch_id],
      address: [this.students.address],
      email: [
        this.students.email || '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      password: [this.students.password || ''],
      c_password: [this.students.c_password || ''],
    });
  }
  submit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    // const formData: FormData = new FormData();
    // if (this.studentForm.value['img']) {
    //   formData.append('img', this.studentForm.value['img'],this.studentForm.value['img']['name']);
    // }else{
    //   formData.append('img','');
    // }
    // for (const [key, value] of Object.entries(this.studentForm.value)) {
    //   if (`${key}`!=="img") {
    //     formData.append(`${key}`, `${value}`);
    //   }
    // }
    // this.submit()
    if (this.action === 'edit') {
      this.studentsService.updateStudents(this.studentForm.getRawValue());
    } else {
      this.studentsService.addStudents(this.studentForm.getRawValue());
      // setTimeout(() => {
      //   if (this.studentsService.addStatus === true) {
      //     this.dialogRef.close(1);
      //   }
      // }, 1000);
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
  // Get Country data
  public getCountry(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-country`).subscribe(data => {
      this.countrise=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // Get Country data
  public getClass(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-class`).subscribe(data => {
      this.dclass=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

}
