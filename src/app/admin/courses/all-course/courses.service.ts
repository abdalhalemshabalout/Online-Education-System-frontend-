import { Course } from './course.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Branch } from '../../branches/all-branches/branch.model';
import { Classroom } from '../../classrooms/all-classrooms/classroom.model';

@Injectable()
export class CourseService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  public addStatus: boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  allCourse = [];
  allClassrooms: BehaviorSubject<Classroom[]> = new BehaviorSubject<Classroom[]>([]);
  allBranches: BehaviorSubject<Branch[]> = new BehaviorSubject<Branch[]>([]);
  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    super();
    this.isTblLoading = true;
    this.getAllClassrooms();
    this.getAllBranches();
  }
  get data(): Course[] {
    return this.dataChange.value;
  }
  get dataClassRoom(): Classroom[] {
    return this.allClassrooms.value;
  }
  get dataBranch(): Branch[] {
    return this.allBranches.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllCourses(): void {
    this.subs.sink = this.httpClient.get<Course[]>(`${environment.apiUrl}/lessons`).subscribe(
      async (data) => {
        setTimeout(() => {
          this.isTblLoading = true;
          this.allCourse = (data['data']);
          this.dataChange.next(data['data']);
          this.setClassroomsAndBranchesNameToData();
          this.isTblLoading = false;
          // setTimeout(async () => {
          // }, 2000);

        }, 1000);
      },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      }
    );
  }
  //add Lesson
  addLesson(course: Course): void {
    this.addStatus = false;
    this.dialogData = course;
    this.httpClient.post(`${environment.apiUrl}/lessons`, course).subscribe(data => {
      this.dialogData = course;
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
          data['message'] + '...!!!',
          'bottom',
          'center'
        );
      }
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      });
  }
  //Update Lesson Information
  updateLesson(course: Course): void {
    this.dialogData = course;
    this.httpClient.put(`${environment.apiUrl}/lessons/ ${course.id}`, course).subscribe(data => {
      this.dialogData = course;
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      }
    );
  }
  //Delete Lesson
  deleteLesson(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/lessons/ ${id}`).subscribe(data => {
    },
      (err: HttpErrorResponse) => {
        // error code here
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      }
    );
  }

  async setClassroomsAndBranchesNameToData(): Promise<void> {
    this.data.forEach(async (e) => {
      e.className = await this.BuildClassName(e.class_room_id);
      e.branchName = await this.BuildBranchName(e.branch_id);
    });
  }
  async BuildClassName(classroomId: string): Promise<string> {
    var name = "";
    this.dataClassRoom.forEach(e => {
      if (e.id.toString() == classroomId) {
        name = e.name;
      }
    });
    return name;
  }

  async BuildBranchName(branchId: string): Promise<string> {
    var name = "";
    this.dataBranch.forEach(e => {
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
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
      }
    );
  }

  getAllClassrooms(): void {
    this.subs.sink = this.httpClient.get<Classroom[]>(`${environment.apiUrl}/class-rooms`).subscribe(
      (data) => {
        this.allClassrooms.next(data['data']);
      },
      (err: HttpErrorResponse) => {
        this.isTblLoading = false;
        this.showNotification(
          'snackbar-danger',
          err.name + " || " + err.message,
          'bottom',
          'center'
        );
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
