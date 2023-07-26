import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Students } from './students.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { Department } from '../../departments/all-departments/department.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/students.json';
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  allStudent=[];
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
  }
  get data(): Students[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStudentss(): void {
    this.subs.sink = this.httpClient.get<Students[]>(`${environment.apiUrl}/personal/get-student`).subscribe(
      (data) => {
        this.allStudent = (data['data']);
        this.isTblLoading = false;
        this.dataChange.next(data['data']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  addStudents(students: FormData): void {
    this.addStatus = false;
    this.dialogData = students;
    this.httpClient.post(`${environment.apiUrl}/personal/add-student`, students).subscribe(data => {
      this.dialogData = students;
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
        JSON.stringify(data['message'])+'...!!!',
        'bottom',
        'center'
      );
    }
    },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  updateStudents(students: Students): void {
    this.dialogData = students;

    /* this.httpClient.put(this.API_URL + students.id, students).subscribe(data => {
      this.dialogData = students;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteStudents(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/personal/delete-student/` + id).subscribe(data => {
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
