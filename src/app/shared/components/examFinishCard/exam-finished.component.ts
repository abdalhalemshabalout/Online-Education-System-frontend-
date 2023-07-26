import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router} from '@angular/router';

@Component({
  selector: 'app-dialogform',
  templateUrl: './exam-finished.component.html',
  styleUrls: ['./exam-finished.component.sass']
})
export class ExamfinishformComponent {
  isLoad = false;

  constructor(
    public dialogRef: MatDialogRef<ExamfinishformComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
  goToDashboard() {
    this.router.navigate(['student/dashboard']);
    this.dialogRef.close(1);
  }
}
