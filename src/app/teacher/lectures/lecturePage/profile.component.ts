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

import { DialogAnnouncementComponent } from '../../lesson-announcement/dialogform.component';

import { AlignCenter } from 'angular-feather/icons';
import { LecturesService } from '../lectures.service';
import { Lesson } from './lessonModels/lesson.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class LectuerPageComponent implements OnInit {
  breadscrums = [
    {
      title: 'Teacher',
      items: ['Lessons'],
      active: '',
    },
  ];
  public Editor = ClassicEditor;
  courseAnnouncements = [];
  courseContentes = [];
  questionBank = [];
  courseStudents = [];
  courseExams = [];

  url = environment.imgUrl;
  courseId: string;
  contentId: string;
  announcementId: string;
  course: string;
  dialogConfig: MatDialogConfig;
  courseStatistics: any;
  step = -1;
  stepTest = -1;
  stepAnnouncement = -1;
  isHidden: boolean = false;
  contentID: Number;
  announcementID: Number;

  isLoad = false;

  //#region  New Variable

  LessonInfo: Lesson;


  //#endregion New Variable
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private httpClient: HttpClient,
    private dialogModel: MatDialog,
    public lecturesService: LecturesService) {
    this.courseContentes = [];
    this.courseAnnouncements = [];
  }
  ngOnInit() {
    this.isLoad = false;
    this.route
      .queryParamMap
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.courseId = params['params']['lectureId'];
        this.lecturesService.getLessonInfo(this.courseId);
        this.lecturesService.getLessonContents(this.courseId);
        this.lecturesService.getLessonAnnouncements(this.courseId);

      });
    setTimeout(() => {
      // console.log(this.LessonInfo);
      // this.breadscrums[1].active = this.LessonInfo.name;
      // this.getCoursContent(this.courseId);
      // this.getCoursAnnouncement(this.courseId);
      // this.getQuestionBank(this.courseId);
         this.getCourseStudents(this.courseId);
      // this.getCourseExam(this.courseId);

    }, 500);
    // this.getCoursInfo(this.courseId);
    // this.getCoursStatistics(this.courseId);
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
  // addDocument(): void {
  //   let tempDirection;
  //   if (localStorage.getItem('isRtl') === 'true') {
  //     tempDirection = 'rtl';
  //   } else {
  //     tempDirection = 'ltr';
  //   }
  //   const dialogReform = this.dialogModel.open(DocuementDialogComponent, {
  //     width: '600px',
  //     disableClose: true,
  //     direction: tempDirection,
  //     data: {
  //       action: 'add',
  //       'contentId': this.contentId
  //     }
  //   });
  //   dialogReform.afterClosed().subscribe((result) => {
  //     if (result === 1) {
  //       // this.getCoursContent(this.courseId);
  //       // this.getCoursStatistics(this.courseId);
  //     }
  //   });
  // }


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
        action: 'add',
        'lessonId': this.courseId
      }
    });
    dialogReform.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.lecturesService.getLessonContents(this.courseId);
        // this.getCoursStatistics(this.courseId);
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
        action: 'edit',
        'content': content,
        'lessonId': this.courseId
      }
    });
    const te = dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        this.lecturesService.getLessonContents(this.courseId);
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
        this.lecturesService.getLessonContents(this.courseId);
      }
    });
  }

  // Add Announcement To Lesson
  openAddAnnouncement(): void {
    const dialogRef = this.dialogModel.open(DialogAnnouncementComponent, {
      width: '640px',
      disableClose: true,
      data: {
        action: 'add',
        'lessonId': this.courseId,
      }
    });

    const te = dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        // this.getCoursAnnouncement(this.courseId);
        // this.getCoursStatistics(this.courseId);
      }
    });
  }
  //Update Lesson Announcement
  editAnnouncement(note) {
    this.announcementID = note['noteId'];
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
        action: 'edit',
        'note': note,
      }
    });
    const te = dialogRef.afterClosed().subscribe((result) => {
      if (result == 1) {
        // this.getCoursAnnouncement(this.courseId);
      }
    });
  }
  //Delete Lesson Announcement
  deleteAnnouncement(note) {
    this.announcementID = note['noteId'];
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
          return obj['noteId'] !== this.announcementID;
        });
        // this.getCoursStatistics(this.courseId);
      }
    });
  }

  // Lesson Students
  getCourseStudents(coursId) {
    this.httpClient.post(`${environment.apiUrl}/branch_students`,{'branchId':coursId}).subscribe(data => {
      this.courseStudents = data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
}
