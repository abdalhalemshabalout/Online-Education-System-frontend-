import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teachers } from './teachers.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { JSDocComment } from '@angular/compiler';
import { Department } from '../../departments/all-departments/department.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/teachers.json';
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;

  }
  teachers = [];
  get data(): Teachers[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTeachers(): void {
    this.subs.sink = this.httpClient.get<Teachers[]>(`${environment.apiUrl}/personal/get-academician`).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data['data']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
      }
    );
  }
  addTeachers(teachers: FormData): void {
    this.dialogData = teachers;
      this.httpClient.post(`${environment.apiUrl}/personal/add-academician`, teachers).subscribe(data => {
      this.dialogData = teachers;
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
  updateTeachers(teachers: Teachers): void {
    this.dialogData = teachers;
    /* this.httpClient.put(this.API_URL + teachers.id, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteTeachers(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/personal/delete-academician/`+ id).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  departData: any;
  getDepartData() :Department[] {
    return this.departData;
  }
  getDepartmentFormServer(){

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
