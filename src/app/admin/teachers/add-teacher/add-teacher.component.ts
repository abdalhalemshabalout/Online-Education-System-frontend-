import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TeachersService } from '../all-teachers/teachers.service';
import { ActivatedRoute, Router} from '@angular/router';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.sass'],
})
export class AddTeacherComponent {
  department=[];
  selectedDepartment=[];
  faculty:[];
  countrise:[];
  proForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Eğitmen Ekleme',
      items: ['Eğitmen'],
      active: 'Eğitmen Ekle',
    },
  ];
  depart='test';

  constructor(private fb: UntypedFormBuilder,private teachersService: TeachersService,private httpClient: HttpClient, private router: Router) {
    this.proForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      identityNumber  : ['', [Validators.required]],
      countryId  : ['', [Validators.required]],
      placeOfBirth: ['', [Validators.required]],
      birthDate: [''],
      gender: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      departmentGraduated : ['', Validators.required,],
      password: ['', [Validators.required]],
      c_password: ['', [Validators.required]],
      departmentId : ['',Validators.required],
      facultyId : ['',Validators.required],
      address: ['',Validators.required],
      img: [''],

    });

    // call funcation on init
    this.getFaculty();
    this.getDepartment();
    this.getCountry();
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
  // get Department data
  public getDepartment(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-department-name`).subscribe(data => {
      this.department=(data['data']);
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
  onSubmit() {
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

    console.log('Form Value', this.proForm.value);
    this.teachersService.addTeachers(formData);
    setTimeout(() => {
      if (this.teachersService.addStatus == true) {
        this.proForm.reset();
        this.router.navigate(['/admin/teachers/all-teachers']);
      }
    }, 1000);
  }
}
