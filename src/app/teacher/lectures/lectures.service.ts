import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lectures } from './lectures.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { environment } from 'src/environments/environment';

@Injectable()
export class LecturesService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/lectures.json';
  isTblLoading = true;
  dataChange: BehaviorSubject<Lectures[]> = new BehaviorSubject<Lectures[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar,) {
    super();
  }
  get data(): Lectures[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dataChange.value;
  }
  /** CRUD METHODS */
  getAllLecturess(): void {
    this.subs.sink = this.httpClient.get<Lectures[]>(`${environment.apiUrl}/academician/get-academician-lesson`).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data['data']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  addLessonContent(content): void {
    this.httpClient.post(`${environment.apiUrl}/academician/add-lesson-content`, content).subscribe(data => {
      if (data['success']===true) {
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
     this.httpClient.post(`${environment.apiUrl}/academician/update-lesson-content/${content['contentId']}`, content).subscribe(data => {
       if (data['data']===1) {
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
  deleteLectureContent(conetnt): void {
    this.httpClient.delete(`${environment.apiUrl}/academician/delete-lesson-content/${conetnt}`).subscribe(data => {
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
  addTestQuestinBank(test): void {
    this.httpClient.post(`${environment.apiUrl}/academician/add-test-question-bank`, test).subscribe(data => {
      if (data['success']===true) {
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
      if (data['data']===1) {
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
      if (data['success']===true) {
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
      if (data['data']===1) {
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
