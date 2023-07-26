import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {DstudentService} from '../all-dstudent/dstudents.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router} from '@angular/router';


import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass'],
})
export class AddStudentComponent {
  department=[];
  selectedDepartment=[];
  faculty:[];
  lesson=[];
  student=[];
  selectedLesson=[];
  selectedStudent=[];

  dstudentForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Öğrenci Ekleme',
      items: ['Ders'],
      active: 'Ekle',
    },
  ];
  constructor(private fb: UntypedFormBuilder,private dstudentService: DstudentService,private httpClient: HttpClient, private router: Router) {
    this.dstudentForm = this.fb.group({
      facultyId : ['', [Validators.required]],
      departmentId : ['', [Validators.required]],
      lessonId: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
    });
    this.getFaculty();
    this.getDepartment();
    this.getLesson();
    this.getStudent();

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
  onSubmit() {
    this.dstudentService.addDstudent(this.dstudentForm.getRawValue());
    setTimeout(() => {
      if (this.dstudentService.addStatus == true) {
        this.dstudentForm.reset();
        this.router.navigate(['/admin/dstudents/all-dstudent']);
      }
    }, 1000);
  }
}
