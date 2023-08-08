import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/service/auth.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { LecturesService } from '../lectures.service';
import { LecturesService as teacherLecturesService } from '../../../teacher/lectures/lectures.service'

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
  studentId = "";
  number = 1;
  url = environment.imgUrl;
  courseId: string;
  step = -1;
  stepAnnouncement = -1;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private dialogForm: MatDialog,
    public studentLecturesService: LecturesService,
    public lecturesService: teacherLecturesService

  ) {
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role_id;
      this.studentId = this.authService.currentUserValue.role_id;
    }
    this.route
      .queryParamMap
      .subscribe(async params => {
        // Defaults to 0 if no query param provided.
        this.courseId = params['params']['lectureId'];
        await this.lecturesService.getLessonInfo(this.courseId);
      });
  }

  setNumber(index: number) {
    this.number = index;
  }
  nextNumber() {
    this.number++;
  }
  prevNumber() {
    this.number--;
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
  setStepAnnouncement(index: number) {
    this.stepAnnouncement = index;
  }
  nextStepAnnouncement() {
    this.stepAnnouncement++;
  }
  prevStepAnnouncement() {
    this.stepAnnouncement--;
  }
}
