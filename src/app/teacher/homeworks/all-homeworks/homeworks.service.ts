import { Homework } from './homework.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class HomeworkService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/department.json';
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Homework[]> = new BehaviorSubject<Homework[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Homework[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllHomeworks(): void {
    this.subs.sink = this.httpClient.get<Homework[]>(`${environment.apiUrl}/academician/get-homework`).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data['data']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
      }
    );
  }

  // add Homework
  addHomework(homework: FormData):void {
    this.dialogData = homework;
      this.httpClient.post(`${environment.apiUrl}/academician/add-homework`, homework).subscribe(data => {
        this.dialogData = homework;
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
  updateHomework(homework): void {
    this.dialogData = homework;
    this.httpClient.post(`${environment.apiUrl}/academician/update-homework/${homework['id']}`, homework).subscribe(data => {
      this.dialogData = homework;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteHomework(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/academician/delete-homework/`+ id).subscribe(data => {
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
