import { Dteacher } from './dteacher.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class DteacherService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = '';
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Dteacher[]> = new BehaviorSubject<Dteacher[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Dteacher[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDteacher(): void {
    this.subs.sink = this.httpClient.get<Dteacher[]>(`${environment.apiUrl}/personal/get-academician-lessons`).subscribe(
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
  //Add Academician To Lesson
  addDteacher(dteacher: Dteacher):void {
    this.dialogData = dteacher;
      this.httpClient.post(`${environment.apiUrl}/personal/add-academician-to-lesson`, dteacher).subscribe(data => {
        this.dialogData = dteacher;
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
  //Update Lesson Academician
  updateDteacher(dteacher: Dteacher): void {
    this.dialogData = dteacher;
    this.httpClient.post(`${environment.apiUrl}/personal/update-lesson-academician/`+ dteacher.id, dteacher).subscribe(data => {
      this.dialogData = dteacher;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  //Delete Lesson Academician
  deleteDteacher(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/personal/delete-academician-from-lesson/`+ id).subscribe(data => {
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
