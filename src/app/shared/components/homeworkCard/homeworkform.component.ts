import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dialogform',
  templateUrl: './homeworkform.component.html',
  styleUrls: ['./homeworkform.component.sass']
})
export class HomeworkformComponent implements OnInit {
  url=environment.imgUrl;

  public Editor = ClassicEditor;
  public homework={'homeworkName':'','description':'','document':'','startdate':'','endDate':''};
  public action;
  public addCusForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<HomeworkformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
      this.homework = data['homework'];

  }
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      homeworkName: [this.homework['homeworkName'] || ""],
      homeworkDescrption: [this.homework['description'] || ""],
      homeworkDocument: [this.homework['document'] || ""],
      homeworkStartDate: [this.homework['startdate'] || ""],
      homeworkEndDate: [this.homework['endDate'] || ""]
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
