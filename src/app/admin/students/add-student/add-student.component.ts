import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StudentsService } from '../all-students/students.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  studentForm: UntypedFormGroup;
  department = [];
  selectedDepartment = [];
  faculty: [];
  countrise: [];
  dclass = [];
  breadscrums = [
    {
      title: 'Add new student',
      items: ['Student'],
      active: 'Add',
    },
  ];

  constructor(private fb: UntypedFormBuilder, private studentsService: StudentsService, private httpClient: HttpClient, private router: Router) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      identity_number: ['', Validators.required],
      class_room_id: ['', Validators.required],
      gender: ['', Validators.required],
      birth_date: ['', Validators.required],
      phone_number: ['', Validators.required],
      branch_id: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
    });
    // this.getFaculty();
    // this.getDepartment();
    // this.getCountry();
    // this.getClass();
  }
  // get Department data
  public getDepartment() {
    this.httpClient.get(`${environment.apiUrl}/personal/get-department-name`).subscribe(data => {
      this.department = (data['data']);
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }

  // select on change on press the faculte
  onChangeSelect($event) {
    var result = this.department.filter((e) => {
      return e['faculty_id'] == $event;
    });
    this.selectedDepartment = result;
  }

  // get Faculty data
  public getFaculty() {
    this.httpClient.get(`${environment.apiUrl}/personal/get-faculty`).subscribe(data => {
      this.faculty = (data['data']);
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }

  // Get Country data
  public getCountry() {
    this.httpClient.get(`${environment.apiUrl}/personal/get-country`).subscribe(data => {
      this.countrise = (data['data']);
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  // Get Country data
  public getClass() {
    this.httpClient.get(`${environment.apiUrl}/personal/get-class`).subscribe(data => {
      this.dclass = (data['data']);
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }

  onSubmit() {
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
    // console.log('Form Value', this.studentForm.value);
    this.studentsService.addStudents(this.studentForm.getRawValue());
    setTimeout(() => {
      if (this.studentsService.addStatus == true) {
        this.studentForm.reset();
        this.router.navigate(['/admin/students/all-students']);
      }
    }, 1000);
  }
}
