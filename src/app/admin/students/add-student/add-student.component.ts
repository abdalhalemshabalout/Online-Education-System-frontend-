import { Classroom } from './../../classrooms/all-classrooms/classroom.model';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StudentsService } from '../all-students/students.service';
import { Router } from '@angular/router';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Branch } from '../../branches/all-branches/branch.model';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.sass'],
})
export class AddStudentComponent {
  studentForm: UntypedFormGroup;
  Classrooms: Classroom[];
  Branches: Branch[];
  selectedBranch = [];
  breadscrums = [
    {
      title: 'Add New Student',
      items: ['Student'],
      active: 'Add',
    },
  ];

  constructor(private fb: UntypedFormBuilder,
    private studentsService: StudentsService,
    private httpClient: HttpClient,
    private router: Router) {
    this.studentForm = this.fb.group({
      class_room_id: ['', Validators.required],
      branch_id: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
      gender: ['', Validators.required],
      identity_number: ['', Validators.required],
      birth_date: ['', Validators.required],
      address: ['', Validators.required],
    });

    this.studentsService.getAllBranches();
    this.studentsService.getAllClassrooms();
    setTimeout(() => {
      this.Branches = (this.studentsService.allBranches.value);
      this.Classrooms = this.studentsService.allClassrooms.value;
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
    this.studentsService.addStudents(this.studentForm.getRawValue());
    setTimeout(() => {
      if (this.studentsService.addStatus == true) {
        this.studentForm.reset();
        this.router.navigate(['/admin/students/all-students']);
      }
    }, 1000);
  }
}
