import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TeachersService } from '../../teachers.service';
import { environment } from 'src/environments/environment';
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
  department=[];
  selectedDepartment=[];
  faculty:[];
  countrise:[];
  action: string;
  // facId=0;
  // depId=0;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  teachers: Teachers;
  imgUrl=environment.imgUrl;
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
      this.imgUrl+=data.teachers.img;
      // this.facId = data.homework['facultyId'];
      // this.depId = data.homework['departmentId'];
      this.teachers = data.teachers;
      this.proForm = this.createContactForm();

    }
     else {
       this.imgUrl+='images/profile/academicians/167000003.png';
       this.dialogTitle = 'Yeni Eğitmen Ekleme Formu';
       this.teachers = new Teachers({});
       this.proForm = this.createContactForm();
      }
      this.getFaculty();
      this.getDepartment();
      this.getCountry();
      this.proForm = this.createContactForm();

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
      img: [this.teachers.img],
      name: [this.teachers.name],
      surname: [this.teachers.surname],
      fatherName: [this.teachers.fatherName],
      motherName: [this.teachers.motherName],
      identityNumber: [this.teachers.identityNumber],
      countryId: [this.teachers.countryId],
      placeOfBirth: [this.teachers.placeOfBirth],
      birthDate: [this.teachers.birthDate],
      gender: [this.teachers.gender],
      telephone: [this.teachers.telephone],
      departmentId: [this.teachers.departmentId],
      facultyId: [this.teachers.facultyId],
      email: [
        this.teachers.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      // startDate: [
      //   formatDate(this.teachers.startDate, 'yyyy-MM-dd', 'en'),
      //   [Validators.required],
      // ],
      departmentGraduated: [this.teachers.departmentGraduated],
      address: [this.teachers.address],
      password: [this.teachers.password],
      c_password: [this.teachers.c_password],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    console.log(this.proForm.value['img']+'');
    const formData: FormData = new FormData();
    if (this.proForm.value['img']) {
      formData.append('img', this.proForm.value['img'],this.proForm.value['img']['name']);
    }else{
      formData.append('img','');
    }
    for (const [key, value] of Object.entries(this.proForm.value)) {
      if (`${key}`!=="img") {
        formData.append(`${key}`, `${value}`);
      }
    }
    if (this.action === 'edit') {
      this.teachersService.updateTeachers(this.proForm.getRawValue());
    } else {
      this.teachersService.addTeachers(formData);
    }
  }

  //Get Department Data
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
  //Get Faculty Data
  public getFaculty(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-faculty`).subscribe(data => {
      this.faculty=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  //Get Country Data
  public getCountry(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-country`).subscribe(data => {
      this.countrise=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
}
