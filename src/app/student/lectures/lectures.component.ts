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
      title: 'Dersler',
      items: ['Öğrenci'],
      active: 'Dersler',
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
    this.isLoad = false;
    this.loadData();
    this.getLessonsAnnouncements();
    this.url=environment.imgUrl;
    this.userImg = this.authService.currentUserValue['data']['img']!==""?this.authService.currentUserValue['data']['img'] :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAPeq1xFfv9zuMj-od5i_ybvJUHoB5MFf-A&usqp=CAU";

  }

  goToLecturesPage(param) {
    this.router.navigate(['student/lecturePage'], { queryParams: { lectureId: param} });
 }

//get student Lessons Announcement
public getLessonsAnnouncements(){
  this.httpClient.get(`${environment.apiUrl}/student/lessons-announcement`).subscribe(data => {
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
  public loadData() {
    this.exampleDatabase = new LecturesService(this.httpClient,this.snackBar);
    this.exampleDatabase.getAllLecturess();
    setTimeout(() => {
      this.AllCourses = this.exampleDatabase.getDialogData();
      this.isLoad = true;
    }, 500);

  }
}

