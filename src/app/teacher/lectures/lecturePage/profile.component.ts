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
import { DialogformComponent } from '../../dialogform/dialogform.component';
import { DialogAnnouncementComponent } from '../../lesson-announcement/dialogform.component';
import { AlignCenter } from 'angular-feather/icons';
import { LecturesService } from '../lectures.service';
import { Lesson } from './lessonModels/lesson.model';
import { LessonAnnouncement } from './lessonModels/lessonAnnouncement';
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
  LessonInfo: Lesson;

  //#region  New Variable

  //#endregion New Variable
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private httpClient: HttpClient,
    private dialogModel: MatDialog,
    public lecturesService: LecturesService) {
  }
  ngOnInit() {
    this.route
      .queryParamMap
      .subscribe(async params => {
        // Defaults to 0 if no query param provided.
        this.courseId = params['params']['lectureId'];
        await this.lecturesService.getLessonInfo(this.courseId);
      });
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
        // this.courseContentes = this.courseContentes.filter((obj) => {
        //   return obj['contentId'] !== this.contentID;
        // });
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

    const te = dialogRef.afterClosed().subscribe(async (result) => {
      if (result == 1) {
        await this.lecturesService.getLessonAnnouncements(this.courseId);
      }
    });
  }
  //Update Lesson Announcement
  editAnnouncement(Announcement: LessonAnnouncement) {
    this.announcementID = Announcement.id;
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
        'lessonId': this.courseId,
        'announcement': Announcement,
      }
    });
    const te = dialogRef.afterClosed().subscribe(async (result) => {
      if (result == 1) {
        await this.lecturesService.getLessonAnnouncements(this.courseId);
      }
    });
  }
  //Delete Lesson Announcement
  deleteAnnouncement(announcement: LessonAnnouncement) {
    this.announcementID = announcement.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialogModel.open(DeleteAnnouncementComponent, {
      data: announcement,
      direction: tempDirection,
    });
    const te = dialogRef.afterClosed().subscribe(async (result) => {
      if (result === 1) {
        await this.lecturesService.getLessonAnnouncements(this.courseId);
      }
    });
  }
}
