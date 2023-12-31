import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { LecturesService } from '../../../lectures/lectures.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
})
export class DeleteAnnouncementComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAnnouncementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lecturesService: LecturesService
  ) {
    console.log(data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  async confirmDelete(): Promise<void> {
    await this.lecturesService.deleteLectureAnnouncement(this.data.id);
  }
}
