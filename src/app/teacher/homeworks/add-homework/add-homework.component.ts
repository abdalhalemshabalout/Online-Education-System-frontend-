import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {HomeworkService} from '../all-homeworks/homeworks.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router} from '@angular/router';


import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-homework',
  templateUrl: './add-homework.component.html',
  styleUrls: ['./add-homework.component.sass'],
})
export class AddHomeworkComponent {

  homeworkForm: UntypedFormGroup;
  dlesson=[];

  breadscrums = [
    {
      title: 'Ödev Ekleme',
      items: ['Ödev'],
      active: 'Ekle',
    },
  ];
  constructor(private fb: UntypedFormBuilder,private homeworkService: HomeworkService,private httpClient: HttpClient, private router: Router) {
    this.homeworkForm = this.fb.group({
        lessonId: ['', [Validators.required]],
        name: ['', [Validators.required]],
        document: ['', [Validators.required]],
        description: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
    });
    this.getLesson();
  }
 // Get Lesson data
 public getLesson(){
  this.httpClient.get(`${environment.apiUrl}/academician/get-academician-lesson`).subscribe(data => {
    this.dlesson=(data['data']);
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
  }

  onSubmit() {
    const formData: FormData = new FormData();
    if (this.homeworkForm.value['document']) {
      formData.append('document', this.homeworkForm.value['document'],this.homeworkForm.value['document']['name']);
    }else{
      formData.append('document','');
    }
    for (const [key, value] of Object.entries(this.homeworkForm.value)) {
      if (`${key}`!=="document") {
        formData.append(`${key}`, `${value}`);
      }
    }
    this.homeworkService.addHomework(formData);
    setTimeout(() => {
      if (this.homeworkService.addStatus == true) {
        this.homeworkForm.reset();
        this.router.navigate(['/teacher/homeworks/all-homeworks']);
      }
    }, 1000);
  }
}
