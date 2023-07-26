import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router} from '@angular/router';


@Component({
  selector: 'app-dialogform',
  templateUrl: './generalquestionform.component.html',
  styleUrls: ['./generalquestionform.component.sass']
})
export class generalquestionformComponent {
  isLoad = false;

  constructor(
    public dialogRef: MatDialogRef<generalquestionformComponent>,
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
