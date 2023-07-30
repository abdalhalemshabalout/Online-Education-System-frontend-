import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Branch } from './branch.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class BranchService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Branch[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllBranches(): void {
    console.log('hello');
    this.subs.sink = this.httpClient.get<Branch[]>(`${environment.apiUrl}/branches`).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data['data']);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
      }
    );
  }

    // add Branch
    addBranch(branch: Branch):void {
      this.dialogData = branch;
  
        this.httpClient.post(`${environment.apiUrl}/branches`, branch).subscribe(data => {
          this.dialogData = branch;
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
    // updateClassroom(classroom: Classroom): void {
    //   this.dialogData = classroom;
    //   this.httpClient.put(`${environment.apiUrl}/class-rooms/`+ classroom.id, classroom).subscribe(data => {
    //     this.dialogData = classroom;
    //   },
    //   (err: HttpErrorResponse) => {
    //     // error code here
    //   }
    // );
    // }

    // delete Classroom
    // deleteClassroom(id: number): void {
    //   this.httpClient.delete(`${environment.apiUrl}/class-rooms/` + id).subscribe(data => {
    //     },
    //     (err: HttpErrorResponse) => {
    //        // error code here
    //     }
    //   );
    // }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

}
