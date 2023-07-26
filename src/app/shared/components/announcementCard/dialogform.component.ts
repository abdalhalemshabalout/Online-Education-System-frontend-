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
  public announcement={'head':'','body':'','Date':''};
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
      announcementTitle: [this.announcement['head'] || ""],
      announcementBody: [this.announcement['body'] || ""],
      announcementDate: [this.announcement['Date'] || ""]
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
