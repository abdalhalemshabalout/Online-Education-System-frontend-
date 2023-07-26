import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {DteacherService} from '../all-dteacher/dteacher.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router} from '@angular/router';


import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-academician.component.html',
  styleUrls: ['./add-academician.component.sass'],
})
export class AddTeacherComponent {
  department=[];
  selectedDepartment=[];
  faculty:[];
  lesson=[];
  academician=[];
  selectedLesson=[];
  selectedAcademician=[];
  dteacherForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Eğitmen Ekleme',
      items: ['Ders'],
      active: 'Ekle',
    },
  ];
  constructor(private fb: UntypedFormBuilder,private dteacherService: DteacherService,private httpClient: HttpClient, private router: Router) {
    this.dteacherForm = this.fb.group({
      facultyId : ['', [Validators.required]],
      departmentId : ['', [Validators.required]],
      lessonId: ['', [Validators.required]],
      academicianId: ['', [Validators.required]],

    });
    this.getFaculty();
    this.getDepartment();
    this.getLesson();
    this.getAcademician();
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
  onChangeSelectAcademician($event){
    var result=this.academician.filter((e)=>{
      return e['department_id']==$event;
    });
    this.selectedAcademician= result;
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
  public getAcademician(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-academician-name`).subscribe(data => {
      this.academician=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  
  onSubmit() {
    console.log('Form Value', this.dteacherForm.value);
    this.dteacherService.addDteacher(this.dteacherForm.getRawValue());
    setTimeout(() => {
      console.log(this.dteacherService.addStatus);
      if (this.dteacherService.addStatus == true) {
        this.dteacherForm.reset();
        this.router.navigate(['/admin/dteacher/all-dteacher']);
      }
    }, 1000);
  }
}
