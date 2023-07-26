import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StudentsService } from '../all-students/students.service';
import { ActivatedRoute, Router} from '@angular/router';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass'],
})
export class AddStudentComponent {
  stdForm: UntypedFormGroup;
  department=[];
  selectedDepartment=[];
  faculty:[];
  countrise:[];
  dclass=[];
  breadscrums = [
    {
      title: 'Öğrenci Ekleme',
      items: ['Öğrenci'],
      active: 'Ekle',
    },
  ];

  constructor(private fb: UntypedFormBuilder, private studentsService: StudentsService, private httpClient: HttpClient, private router: Router) {
    this.stdForm = this.fb.group({
      name: ['', [Validators.required]],
      surname : ['' ,[Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      identityNumber  : ['', [Validators.required]],
      countryId  : ['', [Validators.required]],
      placeOfBirth: ['', [Validators.required]],
      birthDate: ['', ],
      gender: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      facultyId : [''],
      departmentId : [''],
      classId: ['', ],
      startDate: ['', ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: ['', [Validators.required]],
      c_password: ['', [Validators.required]],
      address: [''],
      img: [''],
    });
    this.getFaculty();
    this.getDepartment();
    this.getCountry();
    this.getClass();
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

  onSubmit() {
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
    console.log('Form Value', this.stdForm.value);
    this.studentsService.addStudents(formData);
    setTimeout(() => {
      if (this.studentsService.addStatus == true) {
        this.stdForm.reset();
        this.router.navigate(['/admin/students/all-students']);
      }
    }, 1000);
  }
}
