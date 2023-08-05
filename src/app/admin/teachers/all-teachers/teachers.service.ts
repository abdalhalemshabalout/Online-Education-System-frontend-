import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teachers } from './teachers.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Branch } from '../../branches/all-branches/branch.model';
import { Classroom } from '../../classrooms/all-classrooms/classroom.model';

@Injectable()
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  
  // Temporarily stores data from dialogs
  allTeachers = [];
  dialogData: any;
  allClassrooms: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>([]);
  allBranches: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.getAllClassrooms();
    this.getAllBranches();

  }
 
  get data(): Teachers[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllTeachers(): void {
    this.subs.sink = this.httpClient.get<Teachers[]>(`${environment.apiUrl}/teachers`).subscribe(
      (data) => {
        this.allTeachers = (data['data']);
        this.dataChange.next(data['data']);
        setTimeout(() => {
          this.setClassroomsAndBranchesNameToData();
          this.isTblLoading = false;
        }, 600);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
      }
    );
  }
  addTeachers(teachers: Teachers): void {
    this.addStatus = false;
    this.dialogData = teachers;
      this.httpClient.post(`${environment.apiUrl}/teachers`, teachers).subscribe(data => {
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
    this.httpClient.put(`${environment.apiUrl}/teachers/${teachers.id}`, teachers).subscribe(data => {
      this.dialogData = teachers;
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }
  deleteTeachers(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/teachers/`+ id).subscribe(data => {
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );
  }
  setClassroomsAndBranchesNameToData() {
    this.dataChange.value.forEach(async (e) => {
      e.className = await this.BuildClassName(e.class_room_id);
      e.branchName = await this.BuildBranchName(e.branch_id);
    });
  }

  async BuildClassName(classroomId: string): Promise<string> {
    var name = "";
    this.allClassrooms.value.forEach(e => {
      if (e.id.toString() == classroomId) {
        name = e.name;
      }
    });
    return name;
  }

  async BuildBranchName(branchId: string): Promise<string> {
    var name = "";
    this.allBranches.value.forEach(e => {
      if (e.id.toString() == branchId) {
        name = e.name;
      }
    });
    return name;
  }

  getAllBranches(): void {
    this.subs.sink = this.httpClient.get<Branch[]>(`${environment.apiUrl}/branches`).subscribe(
      (data) => {
        this.allBranches.next(data['data']);
      },
      (error: HttpErrorResponse) => {
        return null;
      }
    );
  }

  getAllClassrooms(): void {
    this.subs.sink = this.httpClient.get<Classroom[]>(`${environment.apiUrl}/class-rooms`).subscribe(
      (data) => {
        this.allClassrooms.next(data['data']);
      },
      (error: HttpErrorResponse) => {
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
