import { delay } from 'rxjs/operators';
import { colorSets } from '@swimlane/ngx-charts';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { AnnouncementService } from '../../announcements.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/core/service/auth.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Announcement } from '../../announcement.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
  public Editor = ClassicEditor;
    readonly: boolean = false;
    personal = [];
    userId = 0;
    action: string;
    dialogTitle: string;
    announcementForm: UntypedFormGroup;
    announcement: Announcement;
  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public announcementService:AnnouncementService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
  ) {

     this.userId=this.authService.currentUserValue.user_id;
    // Set the defaults
    this.action = data.action;
    this.getPersonal();
    if (this.action === 'edit') {
      console.log(data.announcement);
      this.dialogTitle = data.announcement.head;
      this.announcement = data.announcement;
      this.announcementForm = this.createContactForm();
    } else {
        this.dialogTitle = 'Yeni Ders Ekle Formu';
        this.announcement = new Announcement({});
        this.announcementForm = this.createContactForm();
    }

  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.announcement.id],
      liderId: [this.announcement.liderId],
      head: [this.announcement.head, [Validators.required]],
      body: [this.announcement.body, [Validators.required]],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.announcementService.updateAnnouncement(this.announcementForm.getRawValue());
    } else {
       if (this.authService.currentUserValue) {
         this.announcementForm.value['liderId'] = this.userId;
         console.log(this.announcementForm.value);
        this.announcementService.addAnnouncement(this.announcementForm.value);
    }
    }
  }

  // Get Personal data
  public getPersonal(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-personal`).subscribe(data => {
      this.personal=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }


}
