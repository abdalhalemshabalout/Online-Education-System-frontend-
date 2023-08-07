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

    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Announcement Form';
      this.announcement = data.announcement;
      this.announcementForm = this.createContactForm();
    } else {
        this.dialogTitle = 'New Announcemenr Add Form';
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
      title: [this.announcement.title, [Validators.required]],
      text: [this.announcement.text, [Validators.required]],
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
      this.announcementService.addAnnouncement(this.announcementForm.value);
    }
  }

}
