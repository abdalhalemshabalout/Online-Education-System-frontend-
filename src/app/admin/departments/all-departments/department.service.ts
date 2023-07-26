import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Department } from './department.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class DepartmentService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/department.json';
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Department[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllDepartments(): void {
    this.subs.sink = this.httpClient.get<Department[]>(`${environment.apiUrl}/personal/get-department-full`).subscribe(
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

  // add department
  addDepartment(department: Department):void {
    this.dialogData = department;

      this.httpClient.post(`${environment.apiUrl}/personal/add-department`, department).subscribe(data => {
        this.dialogData = department;
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
  updateDepartment(department: Department): void {
    this.dialogData = department;
    this.httpClient.post(`${environment.apiUrl}/personal/update-department/`+ department.id, department).subscribe(data => {
      this.dialogData = department;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteDepartment(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/personal/delete-department/` + id).subscribe(data => {
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
