import { LessonContent } from './lecturePage/lessonModels/lessonContent.model';
import { Lesson } from './lecturePage/lessonModels/lesson.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lectures } from './lectures.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';
import { Branch } from 'src/app/admin/branches/all-branches/branch.model';
import { Classroom } from 'src/app/admin/classrooms/all-classrooms/classroom.model';

@Injectable()
export class LecturesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/lectures.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Lectures[]> = new BehaviorSubject<Lectures[]>([]);
  allClassrooms: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>([]);
  allBranches: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  lessonInfo: BehaviorSubject<Lesson> = new BehaviorSubject<Lesson>(null);
  lessonContents: BehaviorSubject<LessonContent[]> = new BehaviorSubject<LessonContent[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar,) {
    super();
    this.getAllClassrooms();
    this.getAllBranches();
  }
  get data(): Lectures[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dataChange.value;
  }
  get dataLessonInfo(): Lesson {
    return this.lessonInfo.value;
  }
  get dataLessonContents(): LessonContent[] {
    return this.lessonContents.value;
  }
  /** CRUD METHODS */
  getAllLesson(): void {
    this.subs.sink = this.httpClient.get<Lectures[]>(`${environment.apiUrl}/user-lessons`).subscribe(
      (data) => {
        this.dataChange.next(JSON.parse(JSON.stringify(data)));
        this.setClassroomsAndBranchesNameToData();
        this.isTblLoading = false;
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  //#region Set Class name and branch name
  setClassroomsAndBranchesNameToData() {
    this.dataChange.value.forEach(async (e) => {
      e.ClassName = await this.BuildClassName(e.class_room_id);
      e.BranchName = await this.BuildBranchName(e.branch_id);
    });
  }

  async BuildClassName(classroomId: string): Promise<string> {
    var name = "";
    this.allClassrooms.value.forEach(e => {
      if (e.id.toString() == classroomId) {
        name = e.name;
      }
    });
    return name;
  }

  async BuildBranchName(branchId: string): Promise<string> {
    var name = "";
    this.allBranches.value.forEach(e => {
      if (e.id.toString() == branchId) {
        name = e.name;
      }
    });
    return name;
  }

  getAllBranches(): void {
    this.subs.sink = this.httpClient.get<Branch[]>(`${environment.apiUrl}/branches`).subscribe(
      (data) => {
        this.allBranches.next(data['data']);
      },
      (error: HttpErrorResponse) => {
        return null;
      }
    );
  }

  getAllClassrooms(): void {
    this.subs.sink = this.httpClient.get<Classroom[]>(`${environment.apiUrl}/class-rooms`).subscribe(
      (data) => {
        this.allClassrooms.next(data['data']);
      },
      (error: HttpErrorResponse) => {
      }
    );
  }

  //#endregion


  getLessonInfo(lessonId): void {
    this.subs.sink = this.httpClient.get<Lesson>(`${environment.apiUrl}/lessons/${lessonId}`).subscribe(
      async (data) => {
        this.lessonInfo.next(JSON.parse(JSON.stringify(data)));
        this.lessonInfo.value.ClassName = await this.BuildClassName(this.lessonInfo.value.class_room_id);
        this.lessonInfo.value.BranchName = await this.BuildBranchName(this.lessonInfo.value.branch_id);
        console.log(this.lessonInfo.value);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
//#region  //!Lesson Contents

  getLessonContents(lessonId): void {
    this.subs.sink = this.httpClient.get<LessonContent>(`${environment.apiUrl}/lesson-content/${lessonId}`).subscribe(
      async (data) => {
        this.lessonContents.next(JSON.parse(JSON.stringify(data)));
        this.lessonContents.value.forEach((e) => {
          e.lessonName = this.lessonInfo.value.name;
        });
        this.isTblLoading = false;
        console.log(this.lessonContents.value);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  addLessonContent(content:FormData): void {
    console.log(content);
    this.httpClient.post(`${environment.apiUrl}/lesson-contents`, content).subscribe(data => {
      console.log(data);
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-success',
          'Ders İçeriği Başarıyla Ekledi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Ders İçeriği Eklenmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  updateLessonContent(content): void {
    this.httpClient.put(`${environment.apiUrl}/lesson-contents/${content['id']}`, content).subscribe(data => {
      if (data['data'] === 1) {
        this.showNotification(
          'snackbar-success',
          'Ders İçeriği Başarıyla Güncellendi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Ders İçeriği Güncellenmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  deleteLectureContent(conetntId): void {
    this.httpClient.delete(`${environment.apiUrl}/lesson-contents/${conetntId}`).subscribe(data => {
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-danger',
          'Ders İçeriği Silindi..!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-danger',
          'Ders İçeriği Silinmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.showNotification(
          'snackbar-danger',
          err,
          'bottom',
          'center'
        );
      });
  }

//#endregion //!Lesson Contents


  addTestQuestinBank(test): void {
    this.httpClient.post(`${environment.apiUrl}/academician/add-test-question-bank`, test).subscribe(data => {
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-success',
          'Soru Başarıyla Ekledi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Soru Eklenmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  updateTestQuestinBank(test): void {
    this.httpClient.post(`${environment.apiUrl}/academician/update-test-question-bank/${test['testId']}`, test).subscribe(data => {
      if (data['data'] === 1) {
        this.showNotification(
          'snackbar-success',
          'Soru Başarıyla Güncellendi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Soru Güncellenmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  //Delete Test Question
  deleteTestQuestion(test): void {
    this.httpClient.delete(`${environment.apiUrl}/academician/delete-test-question-bank/${test}`).subscribe(data => {
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-danger',
          'Soru silindi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-danger',
          'Soru silinmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.showNotification(
          'snackbar-danger',
          err,
          'bottom',
          'center'
        );
      });
  }
  // Add Announcement To lesson
  addLessonAnnouncement(note): void {
    this.httpClient.post(`${environment.apiUrl}/academician/add-lesson-announcement`, note).subscribe(data => {
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-success',
          'Ders Notu Başarıyla Eklendi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Ders Notu Eklenmedi...!!!',
          'bottom',
          'center',
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  //Update Announcement
  updateLessonAnnouncement(note): void {
    this.httpClient.post(`${environment.apiUrl}/academician/update-lesson-announcement/${note['noteId']}`, note).subscribe(data => {
      if (data['data'] === 1) {
        this.showNotification(
          'snackbar-success',
          'Ders Notu Başarıyla güncellendi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Ders Notu güncellenmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
      });
  }
  //Delete Announcement
  deleteLectureAnnouncement(note): void {
    this.httpClient.delete(`${environment.apiUrl}/academician/delete-lesson-announcement/${note}`).subscribe(data => {
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-danger',
          'Ders Notu Başarıyla silindi...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-danger',
          'Ders Notu silinmedi...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.showNotification(
          'snackbar-danger',
          err,
          'bottom',
          'center'
        );
      });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
