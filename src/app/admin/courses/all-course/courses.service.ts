import { Course } from './course.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class CourseService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Course[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCourses(): void {
    this.subs.sink = this.httpClient.get<Course[]>(`${environment.apiUrl}/personal/get-lesson`).subscribe(
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
  //add Lesson
  addLesson(course: Course):void {
    this.dialogData = course;
      this.httpClient.post(`${environment.apiUrl}/personal/add-lesson`, course).subscribe(data => {
        this.dialogData = course;
        if (data['success'] === true) {
          this.addStatus = data['success'];
          this.showNotification(
            'snackbar-success',
            data['message']+'...!!!',
            'bottom',
            'center'
          );
        } else {
          this.addStatus = data['success'];
          this.showNotification(
            'snackbar-danger',
            data['message']+'...!!!',
            'bottom',
            'center'
          );
        }
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  //Update Lesson Information
  updateLesson(course: Course): void {
    this.dialogData = course;
    this.httpClient.post(`${environment.apiUrl}/personal/update-lesson/`+ course.id, course).subscribe(data => {
      this.dialogData = course;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  //Delete Lesson
  deleteLesson(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/personal/delete-lesson/`+ id).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }


  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
