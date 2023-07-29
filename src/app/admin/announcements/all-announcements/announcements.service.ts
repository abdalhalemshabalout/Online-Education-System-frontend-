import { Announcement} from './announcement.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/UnsubscribeOnDestroyAdapter';
import { AuthService } from '../../../core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class AnnouncementService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = '';
  isTblLoading = true;
  public addStatus:boolean;
  private authService: AuthService;
  // private snackBar: MatSnackBar;

  dataChange: BehaviorSubject<Announcement[]> = new BehaviorSubject<Announcement[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private snackBar: MatSnackBar) {
    super();
    this.addStatus = false;
  }
  get data(): Announcement[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllAnnouncements(): void {
    this.subs.sink = this.httpClient.get<Announcement[]>(`${environment.apiUrl}/personal/get-announcement`).subscribe(
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

  // add Announcement
  addAnnouncement(announcement: Announcement):void {
    this.dialogData = announcement;

      this.httpClient.post(`${environment.apiUrl}/personal/add-announcement`, announcement).subscribe(data => {
        this.dialogData = announcement;
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
  updateAnnouncement(announcement: Announcement): void {
    this.dialogData = announcement;
    this.httpClient.post(`${environment.apiUrl}/personal/update-announcement/`+ announcement.id, announcement).subscribe(data => {
      this.dialogData = announcement;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );
  }
  deleteAnnouncement(id: number): void {
    this.httpClient.delete(`${environment.apiUrl}/personal/delete-announcement/`+ id).subscribe(data => {
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