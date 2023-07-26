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
export class DialogformComponent implements OnInit {
  public Editor = ClassicEditor;
  public courseId;
  public conetnt={'contentId':'','contentName':'','description':'','contentUrl':''};
  public action;
  public addCusForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DialogformComponent>,
    public lecturesService: LecturesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    if (data.action === 'add') {
      this.courseId = data['lessonId'];
    } else {
      this.courseId = data['lessonId'];
      this.conetnt = data['content'];
    }
  }
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      lessonId: this.courseId,
      contentId:this.conetnt['contentId'],
      contentName: [this.conetnt['contentName'] || "",[Validators.required]],
      description: [this.conetnt['description'] || "",[Validators.required]],
      contentUrl: [this.conetnt['contentUrl'] || "",[Validators.required]],
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmitClick() {
    if (this.action==='add') {
      this.lecturesService.addLessonContent(this.addCusForm.value);
      this.dialogRef.close(1);
    } else {
      this.lecturesService.updateLessonContent(this.addCusForm.value);
      this.dialogRef.close(1);
    }
  }
}
