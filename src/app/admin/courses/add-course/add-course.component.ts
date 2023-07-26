import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {CourseService} from '../all-course/courses.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router} from '@angular/router';


import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass'],
})
export class AddCourseComponent {
  department=[];
  selectedDepartment=[];
  faculty:[];
  dclass=[];

  courseForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Ders Ekleme',
      items: ['Ders'],
      active: 'Ekle',
    },
  ];
  constructor(private fb: UntypedFormBuilder,private courseService: CourseService,private httpClient: HttpClient, private router: Router) {
    this.courseForm = this.fb.group({
      facultyId : ['', [Validators.required]],
      departmentId : ['', [Validators.required]],
      classId: ['', [Validators.required]],
      lessonTime: ['', [Validators.required]],
      lessonCode: ['', [Validators.required]],
      lessonName: ['', [Validators.required]],
      kredi: [''],
      akts: [''],
      telephone: [''],
      studentCapacity: [''],
      detaily: ['']
      // uploadFile: [''],
    });
    this.getFaculty();
    this.getDepartment();
    this.getClass();

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
  onSubmit() {
    console.log('Form Value', this.courseForm.value);
    this.courseService.addLesson(this.courseForm.getRawValue());
    setTimeout(() => {
      if (this.courseService.addStatus == true) {
        this.courseForm.reset();
        this.router.navigate(['/admin/courses/all-courses']);
      }
    }, 1000);
  }
}
