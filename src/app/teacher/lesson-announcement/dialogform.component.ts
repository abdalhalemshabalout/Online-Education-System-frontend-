import { LessonAnnouncement } from './../../student/lectures/lecturePage/lessonModels/lessonAnnouncement';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LecturesService } from '../lectures/lectures.service';


@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.sass']
})
export class DialogAnnouncementComponent implements OnInit {
  public Editor = ClassicEditor;
  public courseId;
  public lessonAnnouncement: LessonAnnouncement
  public action;
  public annuncementForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<DialogAnnouncementComponent>,
    public dialog: MatDialog,
    public lecturesService: LecturesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    if (data.action === 'add') {
      this.courseId = data.lessonId;
      this.lessonAnnouncement = new LessonAnnouncement({});
      this.annuncementForm = this.createContactForm();
    } else {
      this.courseId = data.lessonId;
      this.lessonAnnouncement = data.content;
      this.annuncementForm = this.createContactForm();
    }
  }
  createContactForm(): UntypedFormGroup {
    return this.annuncementForm = this.fb.group({
      id: this.lessonAnnouncement.id || 0,
      lesson_id: this.courseId,
      title: [this.lessonAnnouncement.title || "", [Validators.required]],
      text: [this.lessonAnnouncement.text || "", [Validators.required]],
    });
  }


  public ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  async onSubmitClick() {
    if (this.action === 'add') {
      await this.lecturesService.addLessonAnnouncement(this.annuncementForm.getRawValue());
    } else {
      await this.lecturesService.updateLessonAnnouncement(this.annuncementForm.getRawValue());
    }
  }
}
