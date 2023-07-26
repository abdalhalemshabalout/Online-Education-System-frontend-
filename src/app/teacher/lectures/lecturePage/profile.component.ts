import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DeleteDialogComponentContent } from './delete/delete.component';
import { AuthService } from 'src/app/core/service/auth.service';

import { DeleteAnnouncementComponent } from './delete-announcement/delete.component';


import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

import { DocuementDialogComponent } from '../../documentform/documentform.component';
import { DialogformComponent } from '../../dialogform/dialogform.component';
import { FormDialogComponent } from '../../homeworks/all-homeworks/dialogs/form-dialog/form-dialog.component';

import {DialogAnnouncementComponent} from '../../lesson-announcement/dialogform.component';

import { AlignCenter } from 'angular-feather/icons';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class LectuerPageComponent implements OnInit {
  breadscrums = [
    {
      title: 'Dersler',
      items: ['Dersler'],
      active: 'Ders Adı',
    },
  ];
  public Editor = ClassicEditor;
  courseAnnouncements = [];
  courseContentes = [];
  questionBank = [];
  courseStudents=[];
  courseHomeworks=[];
  courseExams=[];

  url=environment.imgUrl;
  courseId:string;
  contentId:string;
  course: string;
  dialogConfig: MatDialogConfig;
  courseStatistics:any;
  step = -1;
  stepTest = -1;
  stepAnnouncement = -1;
  isHidden: boolean = false;
  contentID: Number;
  noteID: Number;
  testID: Number;

  userImg: string;
  isLoad= false;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private httpClient: HttpClient,
    private dialogModel: MatDialog,) {
      this.courseContentes = [];
      this.questionBank=[];
      this.courseAnnouncements = [];
  }
  ngOnInit() {
    this.isLoad = false;
     this.route
      .queryParamMap
       .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.courseId = params['params']['lectureId'];
       });
    setTimeout(() => {
      this.getCoursContent(this.courseId);
      this.getCoursAnnouncement(this.courseId);
      this.getQuestionBank(this.courseId);
      this.getCourseStudent(this.courseId);
      this.getCourseHomework(this.courseId);
      this.getCourseExam(this.courseId);

    }, 50);
    this.getCoursInfo(this.courseId);
    this.getCoursStatistics(this.courseId);
  }

  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  setStepTest(index: number) {
    this.stepTest = index;
  }
  nextStepTest() {
    this.stepTest++;
  }
  prevStepTest() {
    this.stepTest--;
  }
  setStepAnnouncement(index: number) {
    this.stepAnnouncement = index;
  }
  nextStepAnnouncement() {
    this.stepAnnouncement++;
  }
  prevStepAnnouncement() {
    this.stepAnnouncement--;
  }
  addDocument(): void {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogReform = this.dialogModel.open(DocuementDialogComponent, {
      width: '600px',
      disableClose: true,
      direction: tempDirection,
      data: {
      action:'add',
      'contentId':this.contentId
    }
  });
  dialogReform.afterClosed().subscribe((result) => {
    if (result === 1) {
        this.getCoursContent(this.courseId);
        this.getCoursStatistics(this.courseId);
      }
 });
  }
  // Add Homework To lesson
  addHomework() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialogModel.open(FormDialogComponent, {
        width: '640px',
        disableClose: true,
        data: {
          action:'addFromContent',
          'lessonId': this.courseId,
          'lessonName': this.course['lessonName'],
      },
      direction: tempDirection,
    });
    const end = dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 1) {
        setTimeout(() => {
          this.getCourseHomework(this.courseId);
          this.getCoursStatistics(this.courseId);
        }, 200);
      }
    })
  }
  // Lesson Contents
    getCoursContent(coursId) {
      this.courseContentes = [];
      this.httpClient.post(`${environment.apiUrl}/academician/get-lesson-contents`,{'lessonId':coursId}).subscribe(data => {
      this.courseContentes = data['data'];
      this.isLoad = true;
      },
      (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
     // error code here
    });
  }
  // Lesson Questions Bank
  getQuestionBank(coursId) {
      this.questionBank = [];
      this.httpClient.post(`${environment.apiUrl}/academician/get-question-bank`,{'lessonId':coursId}).subscribe(data => {
      this.questionBank = data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // Lesson Announcements
  getCoursAnnouncement(coursId) {
      this.httpClient.post(`${environment.apiUrl}/academician/get-lesson-announcement`,{'lessonId':coursId}).subscribe(data => {
      this.courseAnnouncements = data['data'];
      // document.getElementById("preload").style.display = "none";
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // Lesson Students
  getCourseStudent(coursId) {
    this.httpClient.post(`${environment.apiUrl}/academician/get-lesson-student`,{'lessonId':coursId}).subscribe(data => {
      this.courseStudents = data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // Lesson Homework
  getCourseHomework(coursId) {
    this.httpClient.post(`${environment.apiUrl}/academician/get-lesson-homeworks`,{'lessonId':coursId}).subscribe(data => {
      this.courseHomeworks = data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  // Lesson Exams
  getCourseExam(coursId) {
    this.httpClient.post(`${environment.apiUrl}/academician/get-lesson-exams`,{'lessonId':coursId}).subscribe(data => {
      this.courseExams = data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  //Lesson homeworks contents students total
  getCoursStatistics(coursId) {
    this.httpClient.post(`${environment.apiUrl}/academician/get-homework-lesson-content-student-total`,{'lessonId':coursId}).subscribe(data => {
      this.courseStatistics = data['data'];
      },
      (err: HttpErrorResponse) => {
      // console.log(err.name + ' ' + err.message);
     // error code here
    });
  }
  // Lesson Details
  getCoursInfo(coursId) {
    this.httpClient.get(`${environment.apiUrl}/academician/get-lesson-detaily/`+coursId).subscribe(data => {
      this.course = data['data']['0'];
      this.breadscrums['active'] = data['data']['0']['lesson_name'];
      },
      (err: HttpErrorResponse) => {
      console.log(err.name + ' ' + err.message);
     // error code here
    });
  }
  // Add Content To Lesson
  openDialog(): void {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogReform = this.dialogModel.open(DialogformComponent, {
      width: '640px',
      height: '480px',
      disableClose: true,
      direction: tempDirection,
      data: {
      action:'add',
      'lessonId':this.courseId
    }
  });
  dialogReform.afterClosed().subscribe((result) => {
    if (result === 1) {
        this.getCoursContent(this.courseId);
        this.getCoursStatistics(this.courseId);
      }
  });
  }
  // Update Content
  editCall(content) {
    this.contentID = content['contentId'];
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
      const dialogRef = this.dialogModel.open(DialogformComponent, {
      width: '640px',
      disableClose: true,
        data: {
          action:'edit',
          'content':content,
      }
    });
    const te = dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getCoursContent(this.courseId);
        }
       });
  }
  // Delete Content
  deleteItem(content) {
    this.contentID = content['contentId'];
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialogModel.open(DeleteDialogComponentContent, {
      width: '340px',
      data: content,
      direction: tempDirection,
    });
    const te = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // for delete we use splice in order to remove single object from DataService
        this.courseContentes = this.courseContentes.filter((obj) => {
          return obj['contentId'] !== this.contentID;
        });
        this.getCoursStatistics(this.courseId);
      }
    });
  }


  // Add Announcement To Lesson
  openAddAnnouncement(): void {
    const dialogRef = this.dialogModel.open(DialogAnnouncementComponent, {
    width: '640px',
      disableClose: true,
      data: {
      action:'add',
        'lessonId': this.courseId,
    }
  });

  const te = dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getCoursAnnouncement(this.courseId);
        this.getCoursStatistics(this.courseId);
      }
     });
  }
  //Update Lesson Announcement
  editAnnouncement(note) {
    this.noteID = note['noteId'];
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
      const dialogRef = this.dialogModel.open(DialogAnnouncementComponent, {
      width: '640px',
      disableClose: true,
        data: {
          action:'edit',
          'note':note,
      }
    });
    const te = dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.getCoursAnnouncement(this.courseId);
        }
       });
  }
  //Delete Lesson Announcement
  deleteAnnouncement(note) {
    this.noteID = note['noteId'];
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialogModel.open(DeleteAnnouncementComponent, {
      data: note,
      direction: tempDirection,
    });
    const te = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // for delete we use splice in order to remove single object from DataService
        this.courseAnnouncements = this.courseAnnouncements.filter((obj) => {
          return obj['noteId'] !== this.noteID;
        });
        this.getCoursStatistics(this.courseId);
      }
    });
  }
}
