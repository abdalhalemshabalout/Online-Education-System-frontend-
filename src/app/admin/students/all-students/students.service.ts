import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Students } from './students.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from 'src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Branch } from '../../branches/all-branches/branch.model';
import { Classroom } from '../../classrooms/all-classrooms/classroom.model';

@Injectable()
export class StudentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = 'assets/data/students.json';
  isTblLoading = true;
  public addStatus: boolean;
  private authService: AuthService
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);

  // Temporarily stores data from dialogs
  dialogData: any;
  allStudent = [];
  allClassrooms: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>([]);
  allBranches: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    super();
    this.getAllClassrooms();
    this.getAllBranches();
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
        this.allStudent = (data['data']);
        this.dataChange.next(data['data']);
        setTimeout(() => {
          this.setClassroomsAndBranchesNameToData();
          this.isTblLoading = false;
        }, 600);
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
      if (data['success'] === true) {
        this.addStatus = data['success'];
        this.showNotification(
          'snackbar-success',
          data['message'] + '...!!!',
          'bottom',
          'center'
        );
      } else {
        this.addStatus = data['success'];
        this.showNotification(
          'snackbar-danger',
          JSON.stringify(data['message']) + '...!!!',
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
    },
      (err: HttpErrorResponse) => {
        // error code here
      }
    );
  }

  deleteStudents(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/students/${id}`).subscribe(data => {
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
