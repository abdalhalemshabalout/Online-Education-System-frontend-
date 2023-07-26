import { Component, OnInit } from '@angular/core';
import { LecturesService } from './lectures.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Lectures } from './lectures.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LectuerPageComponent } from './lecturePage/profile.component'
import { AuthService } from 'src/app/core/service/auth.service';

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

  breadscrums = [
    {
      title: 'Dersler',
      items: ['Eğitmen'],
      active: 'Ders',
    },
  ];

  AllCourses= [];

  constructor(
    private authService: AuthService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public lecturesService: LecturesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.isLoad = false;
    this.loadData();
    this.userImg = this.authService.currentUserValue['data']['img']!==""?this.authService.currentUserValue['data']['img'] :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmAPeq1xFfv9zuMj-od5i_ybvJUHoB5MFf-A&usqp=CAU";

  }
  goToLecturesPage(param) {
    this.router.navigate(['teacher/lecturePage'], { queryParams: { lectureId: param} });
  }

  public loadData() {
    this.exampleDatabase = new LecturesService(this.httpClient,this.snackBar);
    this.exampleDatabase.getAllLecturess();
    setTimeout(() => {
      this.AllCourses = this.exampleDatabase.getDialogData();
      this.isLoad = true;
    }, 800);
  }
}
