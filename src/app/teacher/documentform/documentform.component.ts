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
  templateUrl: './documentform.component.html',
  styleUrls: ['./documentform.component.sass']
})
export class DocuementDialogComponent implements OnInit {
  public Editor = ClassicEditor;
  public documentId;
  public document={'contentId':'','document':''};
  public action;
  public addDocumentForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DocuementDialogComponent>,
    public lecturesService: LecturesService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;

  }
  public ngOnInit(): void {
    this.addDocumentForm = this.fb.group({
      contentId:this.documentId['contentId'],
      document: [this.documentId['document'] || "",[Validators.required]],
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
