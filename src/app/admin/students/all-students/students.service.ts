import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Students } from './students.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { Department } from '../../departments/all-departments/department.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { colorSets } from '@swimlane/ngx-charts';

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
    this.subs.sink = this.httpClient.get<Students[]>(`${environment.apiUrl}/students`).subscribe(
      (data) => {
        console.log(data);
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
  addStudents(students: Students): void {
    this.addStatus = false;
    this.dialogData = students;
    this.httpClient.post(`${environment.apiUrl}/students`, students).subscribe(data => {
      this.dialogData = students;
      console.log(data);
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

    this.httpClient.put(`${environment.apiUrl}/students/${students.id}`, students).subscribe(data => {
      this.dialogData = students;
      console.log(data);
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteStudents(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/students/${id}`).subscribe(data => {
      console.log(data);
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
