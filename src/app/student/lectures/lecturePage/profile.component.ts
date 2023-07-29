import { Course } from './../../../admin/courses/all-course/course.model';
import { Lectures } from './../lectures.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/service/auth.service';
import { ExamformComponent } from '../../../shared/components/examCard/examform.component';
import { HomeworkformComponent } from '../../../shared/components/homeworkCard/homeworkform.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

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
  courseAnnouncement = [];
  courseContentes = [];
  courseStudents=[];
  courseHomeworks=[];
  questionBank = [];
  courseExams=[];
  studentId="";
  number = 1;

  url=environment.imgUrl;
  courseId:string;
  course: string;
  dialogConfig: MatDialogConfig;
  courseStatistics:any;
  step = -1;
  stepAnnouncement = -1;
  isHidden: boolean = false;
  contentID: Number;
  noteID: Number;
  userImg: string;
  isLoad = false;

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private httpClient: HttpClient,
    private dialogForm:MatDialog,
    private dialogModel: MatDialog,

    ) {
  }
  ngOnInit() {
    this.isLoad = false;
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role_id;
        this.studentId=this.authService.currentUserValue.role_id;
    }
     this.route
      .queryParamMap
       .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.courseId = params['params']['lectureId'];
       });
    setTimeout(() => {
      this.getCoursContent(this.courseId);
      this.getCoursAnnouncement(this.courseId);
      this.getCourseStudent(this.courseId);
      this.getCourseHomework(this.courseId);
      this.getCourseExam(this.courseId);
      this.getQuestionBank(this.courseId,this.number);
    }, 50);
    this.getCoursInfo(this.courseId);
    this.getCoursStatistics(this.courseId);
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

// Lesson Contents
getCoursContent(coursId) {
  this.httpClient.post(`${environment.apiUrl}/student/get-lesson-contents`,{'lessonId':coursId}).subscribe(data => {
    this.courseContentes = data['data'];
    this.isLoad = true;
    },
    (err: HttpErrorResponse) => {
    console.log(err.name + ' ' + err.message);
   // error code here
  });
}

// Lesson Announcements
getCoursAnnouncement(coursId) {
  this.httpClient.post(`${environment.apiUrl}/student/get-lesson-announcement`,{'lessonId':coursId}).subscribe(data => {
    this.courseAnnouncement = data['data'];
    // document.getElementById("preload").style.display = "none";
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
}
// Lesson Students
getCourseStudent(coursId) {
  this.httpClient.post(`${environment.apiUrl}/student/get-lesson-student`,{'lessonId':coursId}).subscribe(data => {
    this.courseStudents = data['data'];
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
}
// Lesson Homework
getCourseHomework(coursId) {
  this.httpClient.post(`${environment.apiUrl}/student/get-lesson-homeworks`,{'lessonId':coursId}).subscribe(data => {
    this.courseHomeworks = data['data'];
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
}
// Lesson Exams
getCourseExam(coursId) {
  this.httpClient.post(`${environment.apiUrl}/student/get-lesson-exams`,{'lessonId':coursId}).subscribe(data => {
    this.courseExams = data['data'];
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
}
getCoursStatistics(coursId) {
  this.httpClient.post(`${environment.apiUrl}/student/get-homework-lesson-content-student-total`,{'lessonId':coursId}).subscribe(data => {
    this.courseStatistics = data['data'];
    },
    (err: HttpErrorResponse) => {
    // console.log(err.name + ' ' + err.message);
   // error code here
  });
}
// Lesson Questions Bank
getQuestionBank(coursId,number) {
     this.httpClient.post(`${environment.apiUrl}/student/get-question`,{'lessonId':coursId,'questionNumber':number}).subscribe(data => {
      this.questionBank=data['data'];
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
}
getCoursInfo(coursId) {
  this.httpClient.get(`${environment.apiUrl}/student/get-lesson-detaily/`+coursId).subscribe(data => {
    this.course = data['data']['0'];
    this.breadscrums['active'] = data['data']['0']['lesson_name'];
    },
    (err: HttpErrorResponse) => {
    console.log(err.name + ' ' + err.message);
   // error code here
  });
}
openExamCardDialog(Exam): void {
  let tempDirection;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogReform = this.dialogForm.open(ExamformComponent, {
    width: '640px',
    disableClose: true,
    direction: tempDirection,
    data: {
    'exam':Exam,
  }
});
}

  openHomeworkCardDialog(Homework): void {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogReform = this.dialogForm.open(HomeworkformComponent, {
      width: '640px',
      disableClose: true,
      direction: tempDirection,
      data: {
      'homework':Homework,
    }
    });
  }

  goToQuestionBank(param){
    this.router.navigate(['student/lesson-questions'], { queryParams: { courseId: param} });
  }
}
