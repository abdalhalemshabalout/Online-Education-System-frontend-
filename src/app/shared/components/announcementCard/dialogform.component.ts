import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.sass']
})
export class DialogformComponent implements OnInit {
  public Editor = ClassicEditor;
  public announcement={'title':'','text':'','created_at':''};
  public action;
  public addCusForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DialogformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
      this.announcement = data['announcement'];

  }
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      announcementTitle: [this.announcement['title'] || ""],
      announcementBody: [this.announcement['text'] || ""],
      announcementDate: [this.announcement['created_at'] || ""]
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
