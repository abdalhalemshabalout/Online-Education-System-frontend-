import { Component, OnInit ,Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-dialogform',
  templateUrl: './examform.component.html',
  styleUrls: ['./examform.component.sass']
})
export class ExamformComponent implements OnInit {
  public Editor = ClassicEditor;
  public exam={'examId':'','examName':'','questionNumber':'','examTime':'','successGrade':'','startDate':'','endDate':''};
  public action;
  isLoad = false;
  public addCusForm: UntypedFormGroup;
  
  constructor(
    private fb: UntypedFormBuilder,
    public httpClient: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExamformComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.action;
      this.exam = data['exam'];
  }
  public ngOnInit(): void {
    this.addCusForm = this.fb.group({
      examId: [this.exam.examId],
      examName: [this.exam['examName'] || ""],
      examQuestionNumber: [this.exam['questionNumber'] || ""],
      examTime: [this.exam['examTime'] || ""],
      examSuccessGrade: [this.exam['successGrade'] || ""],
      examStartDate: [this.exam['startDate'] || ""],
      examEndDate: [this.exam['endDate'] || ""]
    });
    const now = new Date();
    const examStartTime = new Date(now.getTime()+ 2 * 60 * 60 * 1000);
    const remainingTime = examStartTime.getTime() - now.getTime();
    const hours = Math.floor(remainingTime / (60 * 60 * 1000));
    const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000); 
    const remainingTimeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    console.log(`Sınav saat : ${remainingTimeString} başlıyor`);
    console.log(now);
    console.log(examStartTime);
    console.log(remainingTime);

  } 
  
  closeDialog(): void {
    this.dialogRef.close();
  }
  goToexamQuestions(param) {
    this.router.navigate(['student/exam-questions'], { queryParams: { examId: param} });
    this.dialogRef.close(1);
  }

}
