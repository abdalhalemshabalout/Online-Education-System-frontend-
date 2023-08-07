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
  exampleDatabase: LecturesService;
  selection = new SelectionModel<Lectures>(true, []);
  userImg: string;
  breadscrums = [
    {
      title: 'Lessons',
      items: ['Teacher'],
      active: 'Lesson',
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
    this.loadData();

  }
  goToLecturesPage(param) {
    this.router.navigate(['teacher/lecturePage'], { queryParams: { lectureId: param} });
  }

  public loadData() {
    this.lecturesService.getAllLesson();
  }
}
