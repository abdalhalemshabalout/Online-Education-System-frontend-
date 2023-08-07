import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LecturesService } from '../../../lectures/lectures.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteDialogComponentContent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponentContent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lecturesService: LecturesService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.lecturesService.deleteLectureContent(this.data.id);
  }
}
