import { delay } from 'rxjs/operators';
import { colorSets } from '@swimlane/ngx-charts';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { HomeworkService } from '../../homeworks.service';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Homework } from '../../homework.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
    action: string;
    dialogTitle: string;
    homeworkForm: UntypedFormGroup;
    homework: Homework;
    dlesson=[];
    coursId = 0;
    dataTransfer = new DataTransfer();
  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public homeworkService:HomeworkService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.action = 'edit';
      this.dialogTitle = 'Ders Güncelleme Formu'; //data.homework.name;
      this.coursId = data.homework['lessonId'];
      this.homework = data.homework;
    const myFile = new File([data.homework['document'] ],data.homework['document'].split('/')[2] , {
        type: 'application/pdf',
    });
      this.dataTransfer.items.add(myFile);
      this.homeworkForm = this.createContactForm();

    } else if (this.action ==='addFromContent') {
      this.dialogTitle = 'Yeni Ödev Ekle Formu';
      this.coursId = this.data['lessonId'];
      this.homework = new Homework({
          id:this.data['lessonId']
        });
        this.homeworkForm = this.createContactForm();
    }
    else {
        this.dialogTitle = 'Yeni Ödev Ekle Formu';
        this.homework = new Homework({});
        this.homeworkForm = this.createContactForm();
      }
      this.getLesson();
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
      id: [this.homework.id],
      lessonId: [this.homework.lessonId || '', [Validators.required]],
      lessonName: [this.homework.lessonName || ''],
      name: [this.homework.name || '', [Validators.required]],
      document: [this.dataTransfer.files[0] || '', [Validators.required]],
      description: [this.homework.description || '', [Validators.required]],
      startDate: [this.homework.startDate || '', [Validators.required]],
      endDate: [this.homework.endDate || '', [Validators.required]],

    });

  }
  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    console.log(this.homeworkForm.getRawValue());
    const formData: FormData = new FormData();
    if (this.homeworkForm.value['document']) {
      formData.append('document', this.homeworkForm.value['document'],this.homeworkForm.value['document']['name']);
    } else {
      formData.append('document','');
    }
    for (const [key, value] of Object.entries(this.homeworkForm.value)) {
      if (`${key}`!=="document") {
        formData.append(`${key}`, `${value}`);
      }
    }
    if (this.action === 'edit') {
      this.homeworkService.updateHomework(formData);
      this.dialogRef.close(1);
    } else {
      this.homeworkService.addHomework(formData);
      this.dialogRef.close(1);
    }
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

}
