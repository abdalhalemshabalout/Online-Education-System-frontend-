import { Component, OnInit } from '@angular/core';
import { LecturesService } from './lectures.service';
import { MatDialog } from '@angular/material/dialog';
import { Lectures } from './lectures.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LectuerPageComponent } from './lecturePage/profile.component'
import { AuthService } from 'src/app/core/service/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogformComponent } from '../../shared/components/announcementCard/dialogform.component';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.sass'],
})
export class LecturesComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{

  LecturePage: LectuerPageComponent;
  exampleDatabase: LecturesService | null;
  selection = new SelectionModel<Lectures>(true, []);
  id: number;
  userImg: string;
  lectures: Lectures | null;
  isLoad = false;
  url='';

  breadscrums = [
    {
      title: 'Courses',
      items: ['Student'],
      active: 'Courses',
    },
  ];

  AllCourses= [];
  lessonsAnnouncements = [];

  constructor(
    private authService: AuthService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public lecturesService: LecturesService,
    private snackBar: MatSnackBar,
    private dialogForm:MatDialog,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  goToLecturesPage(param) {
    this.router.navigate(['student/lecturePage'], { queryParams: { lectureId: param} });
  }
  public loadData() {
    this.lecturesService.getAllLesson();
  }

//get student Lessons Announcement
public getLessonsAnnouncements(){
  this.httpClient.get(`${environment.apiUrl}/lesson-announcements`).subscribe(data => {
    this.lessonsAnnouncements = (data['data']);
    },
    (err: HttpErrorResponse) => {
   // error code here
  });
}
openAnnouncementCardDialog(Announcement): void {
  let tempDirection;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogReform = this.dialogForm.open(DialogformComponent, {
    width: '640px',
    disableClose: true,
    direction: tempDirection,
    data: {
    'announcement':Announcement,
  }
});
}

}

