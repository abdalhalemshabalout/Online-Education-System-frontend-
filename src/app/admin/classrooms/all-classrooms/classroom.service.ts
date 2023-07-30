import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Classroom } from './classroom.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ClassroomService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Classroom[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllClassrooms(): void {
    this.subs.sink = this.httpClient.get<Classroom[]>(`${environment.apiUrl}/class-rooms`).subscribe(
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

    // add Classroom
    addClassroom(classroom: Classroom):void {
      this.dialogData = classroom;
  
        this.httpClient.post(`${environment.apiUrl}/class-rooms`, classroom).subscribe(data => {
          this.dialogData = classroom;
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
    
    // update Classroom
    updateClassroom(classroom: Classroom): void {
      this.dialogData = classroom;
      this.httpClient.put(`${environment.apiUrl}/class-rooms/`+ classroom.id, classroom).subscribe(data => {
        this.dialogData = classroom;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    }

    // delete Classroom
    deleteClassroom(id: number): void {
      this.httpClient.delete(`${environment.apiUrl}/class-rooms/` + id).subscribe(data => {
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
