import { Students } from './lecturePage/lessonModels/lessonStudent';
import { LessonContent } from './lecturePage/lessonModels/lessonContent.model';
import { LessonAnnouncement } from './lecturePage/lessonModels/lessonAnnouncement';
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
  lessonAnnouncements: BehaviorSubject<LessonAnnouncement[]> = new BehaviorSubject<LessonAnnouncement[]>([]);
  lessonStudents: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);

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
  get dataLessonAnnouncements(): LessonAnnouncement[] {
    return this.lessonAnnouncements.value;
  }
  get dataLessonStudents(): Students[] {
    return this.lessonStudents.value;
  }
  /** CRUD METHODS */
  getAllLesson(): void {
    this.subs.sink = this.httpClient.get<Lectures[]>(`${environment.apiUrl}/user-lessons`).subscribe(
      (data) => {
        this.dataChange.next(JSON.parse(JSON.stringify(data)));
        this.setClassroomsAndBranchesNameToData();
        this.isTblLoading = false;
      },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
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

  //#region  //!Lesson Contents

  // get lesson info
  async getLessonInfo(lessonId): Promise<void> {
    this.subs.sink = this.httpClient.get<Lesson>(`${environment.apiUrl}/lessons/${lessonId}`).subscribe(
      async (data) => {
        this.lessonInfo.next(JSON.parse(JSON.stringify(data)));
        this.lessonInfo.value.ClassName = await this.BuildClassName(this.lessonInfo.value.class_room_id);
        this.lessonInfo.value.BranchName = await this.BuildBranchName(this.lessonInfo.value.branch_id);
        await this.getLessonStudents(this.lessonInfo.value.branch_id);
        await this.getLessonContents(this.lessonInfo.value.id);
        this.isTblLoading = false;
      },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      }
    );
  }
  // get contents of lesson
  async getLessonContents(lessonId): Promise<void> {
    this.subs.sink = this.httpClient.get<LessonContent>(`${environment.apiUrl}/lesson-content/${lessonId}`).subscribe(
      async (data) => {
        this.lessonContents.next(JSON.parse(JSON.stringify(data)));
        this.lessonContents.value.forEach((e) => {
          e.lessonName = this.lessonInfo.value.name;
        });
        this.isTblLoading = false;
      },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      }
    );
  }
  // get Announcements of lesson
  async getLessonAnnouncements(lessonId): Promise<void> {
    this.subs.sink = this.httpClient.get<LessonAnnouncement>(`${environment.apiUrl}/lesson-announcements/${lessonId}`).subscribe(
      async (data) => {
        this.lessonAnnouncements.next(JSON.parse(JSON.stringify(data)));
        this.lessonAnnouncements.value.forEach((e) => {
          e.lessonName = this.lessonInfo.value.name;
        });
        this.isTblLoading = false;
      },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      }
    );
  }
  // add new lesson
  async addLessonContent(content: FormData): Promise<void> {
    this.httpClient.post(`${environment.apiUrl}/lesson-contents`, content).subscribe(data => {
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
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      });
  }
  // update inof of lesson
  async updateLessonContent(content): Promise<void> {
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
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      });
  }
  // delete lesson
  async deleteLectureContent(conetntId): Promise<void> {
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
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      });
  }
  // Add Announcement To lesson
  async addLessonAnnouncement(announcement: LessonAnnouncement): Promise<void> {
    this.httpClient.post(`${environment.apiUrl}/lesson-announcements`, announcement).subscribe(data => {
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-success',
          'Lesson announcement successfully added...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Lesson announcement not successfully added...!!!',
          'bottom',
          'center',
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      });
  }
  //Update Announcement
  async updateLessonAnnouncement(announcement: LessonAnnouncement): Promise<void> {
    this.httpClient.put(`${environment.apiUrl}/lesson-announcements/${announcement.id}`, announcement).subscribe(data => {
      if (data['data'] === 1) {
        this.showNotification(
          'snackbar-success',
          'Lesson announcement successfully updated...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-info',
          'Lesson announcement not successfully updated...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      });
  }
  //Delete Announcement
  async deleteLectureAnnouncement(note): Promise<void> {
    this.httpClient.delete(`${environment.apiUrl}/lesson-announcements/${note}`).subscribe(data => {
      if (data['success'] === true) {
        this.showNotification(
          'snackbar-danger',
          'Lesson announcement successfully deleted...!!!',
          'bottom',
          'center'
        );
      } else {
        this.showNotification(
          'snackbar-danger',
          'Lesson announcement not successfully deleted...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      });
  }
  // Lesson Students
  async getLessonStudents(branchId: string): Promise<void> {
    this.httpClient.post(`${environment.apiUrl}/branch_students`, { 'branchId': branchId }).subscribe(data => {
      this.lessonStudents.next(JSON.parse(JSON.stringify(data)));
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );

      });
  }
  //#endregion //!Lesson Contents

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
