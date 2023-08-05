import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { TeachersService } from '../all-teachers/teachers.service';
import { Router} from '@angular/router';
import { Classroom } from './../../classrooms/all-classrooms/classroom.model';
import { Branch } from '../../branches/all-branches/branch.model';

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.sass'],
})
export class AddTeacherComponent {
  Branches: Branch[];
  Classrooms: Classroom[];
  selectedBranch = [];

  proForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add New Teacher',
      items: ['Teacher'],
      active: 'Add',
    },
  ];

  constructor(private fb: UntypedFormBuilder,private teachersService: TeachersService,private httpClient: HttpClient, private router: Router) {
    this.proForm = this.fb.group({
      class_room_id: ['', [Validators.required]],
      branch_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      phone_number  : ['', [Validators.required]],
      email: ['',[Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required]],
      c_password: ['', [Validators.required]],
      identity_number : ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birth_date : ['', [Validators.required]],
      address: ['',Validators.required],

    });

    this.teachersService.getAllBranches();
    this.teachersService.getAllClassrooms();
    setTimeout(() => {
      this.Branches = (this.teachersService.allBranches.value);
      this.Classrooms = this.teachersService.allClassrooms.value;
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
    this.teachersService.addTeachers(this.proForm.value());
    setTimeout(() => {
      if (this.teachersService.addStatus == true) {
        this.proForm.reset();
        this.router.navigate(['/admin/teachers/all-teachers']);
      }
    }, 1000);
  }
}
