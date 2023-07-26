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
  stdForm: UntypedFormGroup;
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
      this.stdForm = this.createContactForm();
    } else {
      this.imgUrl+='images/profile/students/167000005.png';
      this.dialogTitle = 'Yeni Öğrenci Ekleme Formu';
      this.students = new Students({});
      this.stdForm = this.createContactForm();
    }
    this.getFaculty();
    this.getDepartment();
    this.getCountry();
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
      id: [this.students.id],
      img: [this.students.img || ''],
      name: [this.students.name || ''],
      surname: [this.students.surname || ''],
      fatherName: [this.students.fatherName || ''],
      motherName: [this.students.motherName || ''],
      identityNumber: [this.students.identityNumber || ''],
      countryId: [this.students.countryId || ''],
      placeOfBirth: [this.students.placeOfBirth || ''],
      birthDate: [this.students.birthDate],
      gender: [this.students.gender],
      telephone: [this.students.telephone || ''],
      departmentId: [this.students.departmentId],
      facultyId: [this.students.facultyId],
      classId: [this.students.classId],
      email: [
        this.students.email || '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      // startDate: [this.students.startDate],
      password: [this.students.password || ''],
      c_password: [this.students.c_password || ''],
      startDate: [
        formatDate(this.students.startDate, 'yyyy-MM-dd', 'en'),
        [Validators.required]
      ],
      address: [this.students.address || ''],
    });
  }
  submit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    const formData: FormData = new FormData();
    if (this.stdForm.value['img']) {
      formData.append('img', this.stdForm.value['img'],this.stdForm.value['img']['name']);
    }else{
      formData.append('img','');
    }
    for (const [key, value] of Object.entries(this.stdForm.value)) {
      if (`${key}`!=="img") {
        formData.append(`${key}`, `${value}`);
      }
    }
    this.submit()
    if (this.action === 'edit') {
      this.studentsService.updateStudents(this.stdForm.getRawValue());
    } else {
      this.studentsService.addStudents(formData);
      setTimeout(() => {
        if (this.studentsService.addStatus === true) {
          this.dialogRef.close(1);
        }
      }, 1000);
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
