import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {CourseService} from '../all-course/courses.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router} from '@angular/router';
import { Classroom } from './../../classrooms/all-classrooms/classroom.model';
import { Branch } from '../../branches/all-branches/branch.model';


import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.sass'],
})
export class AddCourseComponent {
  courseForm: UntypedFormGroup;
  Branches: Branch[];
  Classrooms: Classroom[];
  selectedBranch = [];
  breadscrums = [
    {
      title: 'Add New Course',
      items: ['Course'],
      active: 'Add',
    },
  ];
  constructor(private fb: UntypedFormBuilder,private courseService: CourseService,private httpClient: HttpClient, private router: Router) {
    this.courseForm = this.fb.group({
      class_room_id: ['', Validators.required],
      branch_id: ['', Validators.required],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      timer: ['', [Validators.required]],
      detaily: ['']
    });
    this.courseService.getAllBranches();
    this.courseService.getAllClassrooms();
    setTimeout(() => {
      this.Branches = (this.courseService.allBranches.value);
      this.Classrooms = this.courseService.allClassrooms.value;
    }, 1000);
  }
  
  // select on change on press the classroom
  onChangeSelect($event) {
    var result = this.Branches.filter((e) => {
      return e['class_room_id'] == $event;
    });
    this.selectedBranch = result;
  }

  onSubmit() {
    this.courseService.addLesson(this.courseForm.getRawValue());
    setTimeout(() => {
      if (this.courseService.addStatus == true) {
        this.courseForm.reset();
        this.router.navigate(['/admin/courses/all-courses']);
      }
    }, 1000);
  }
}
