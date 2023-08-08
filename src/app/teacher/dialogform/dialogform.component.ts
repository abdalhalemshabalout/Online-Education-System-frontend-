import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LecturesService } from '../lectures/lectures.service';
import { LessonContent } from '../lectures/lecturePage/lessonModels/lessonContent.model';


@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.sass']
})
export class DialogformComponent implements OnInit {
  public Editor = ClassicEditor;
  public courseId;
  // public conetnt={'contentId':'','contentName':'','description':'','contentUrl':''};
  public action;
  dialogTitle: string;
  lessonContentForm: UntypedFormGroup;
  public LessonContent: LessonContent;
  constructor(private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DialogformComponent>,
    public lecturesService: LecturesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
    if (data.action === 'add') {
      this.dialogTitle = "Add New Content";
      this.courseId = data.lessonId;
      this.LessonContent = new LessonContent({});
      this.lessonContentForm = this.createContactForm();
    } else {
      this.dialogTitle = data.content.title;
      this.courseId = data.lessonId;
      this.LessonContent = data.content;
      this.lessonContentForm = this.createContactForm();
    }
  }
  createContactForm(): UntypedFormGroup {
    return this.lessonContentForm = this.fb.group({
      id: this.LessonContent.id || 0,
      lesson_id: this.courseId || 0,
      title: [this.LessonContent.title || "", [Validators.required]],
      text: [this.LessonContent.text || "", [Validators.required]],
      document: [this.LessonContent.document || ""]
    });
  }
  public ngOnInit(): void {

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  async onSubmitClick() {
    if (this.action === 'add') {
      var formData: FormData = new FormData();
      console.log(this.lessonContentForm.getRawValue());
      console.log(this.lessonContentForm.getRawValue()['document'] + '');
      if (this.lessonContentForm.getRawValue()['document']) {
        formData.append('document', this.lessonContentForm.getRawValue()['document'], this.lessonContentForm.getRawValue()['document']['name']);
      } else {
        formData.append('document', '');
      }
      for (const [key, value] of Object.entries(this.lessonContentForm.getRawValue())) {
        if (`${key}` !== "document") {
          formData.append(`${key}`, `${value}`);
        }
      }
      await this.lecturesService.addLessonContent(formData);
    } else {
      await this.lecturesService.updateLessonContent(this.lessonContentForm.getRawValue());
    }
  }
}
