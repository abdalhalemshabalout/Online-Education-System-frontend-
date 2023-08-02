import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Staff } from './staff.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class StaffService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Staff[]> = new BehaviorSubject<Staff[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  staff = [];
  get data(): Staff[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllStaffs(): void {
    this.subs.sink = this.httpClient.get<Staff[]>(`${environment.apiUrl}/staffs`).subscribe(
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

    // add Staff
    addStaff(staff: Staff):void {
      this.dialogData = staff;
        this.httpClient.post(`${environment.apiUrl}/staffs`, staff).subscribe(data => {
          this.dialogData = staff;
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
    
    // update Staff
    updateStaff(staff: Staff): void {
      this.dialogData = staff;
      console.log(staff);
      this.httpClient.put(`${environment.apiUrl}/staffs/`+ staff.id, staff).subscribe(data => {
        this.dialogData = staff;
      },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
    }

    // delete Staff
    deleteStaff(id: number): void {
      this.httpClient.delete(`${environment.apiUrl}/staffs/` + id).subscribe(data => {
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
