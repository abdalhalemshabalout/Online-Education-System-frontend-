import { Dstudent } from './dstudent.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class DstudentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = '';
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Dstudent[]> = new BehaviorSubject<Dstudent[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Dstudent[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDstudent(): void {
    this.subs.sink = this.httpClient.get<Dstudent[]>(`${environment.apiUrl}/personal/get-student-lessons`).subscribe(
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
  // Add Student To Lesson
  addDstudent(dstudent: Dstudent):void {
    this.dialogData = dstudent;
      this.httpClient.post(`${environment.apiUrl}/personal/add-student-to-lesson`, dstudent).subscribe(data => {
        this.dialogData = dstudent;
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
  updateDstudent(dstudent: Dstudent): void {
//     this.dialogData = course;
//     console.log('from up');
//     this.httpClient.post(`${environment.apiUrl}/personal/update-lesson/`+ course.id, course).subscribe(data => {
//       this.dialogData = course;
//       console.log(data);
//     },
//     (err: HttpErrorResponse) => {
//       // error code here
//     }
//   );
  }
  deleteDstudent(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/personal/delete-student-from-lesson/`+ id).subscribe(data => {
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
