import { Component, OnInit ,Inject } from '@angular/core';
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
  public note={'noteId':'','title':'','text':''};
  public action;
  public addAnnuncementForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<DialogAnnouncementComponent>,
    public dialog: MatDialog,
    public lecturesService: LecturesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    if (data.action === 'add') {
      this.courseId = data['lessonId'];

    } else {
      this.courseId = data['lessonId'];
      this.note = data['note'];
    }
  }
  public ngOnInit(): void {
    this.addAnnuncementForm = this.fb.group({
      lessonId: this.courseId,
      noteId: this.note['noteId'],
      title: [this.note['title'] || "",[Validators.required]],
      text: [this.note['text'] || "", [Validators.required]]
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmitClick() {
    if (this.action==='add') {
      this.lecturesService.addLessonAnnouncement(this.addAnnuncementForm.value);
      this.dialogRef.close(1);
    } else {
      this.lecturesService.updateLessonAnnouncement(this.addAnnuncementForm.value);
      this.dialogRef.close(1);
    }
  }
}
