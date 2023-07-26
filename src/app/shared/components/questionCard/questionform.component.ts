import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Router } from '@angular/router';

@Component({
  selector: 'app-dialogform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.sass']
})
export class questionformComponent {
  isLoad = false;
  constructor(
    public dialogRef: MatDialogRef<questionformComponent>,
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
