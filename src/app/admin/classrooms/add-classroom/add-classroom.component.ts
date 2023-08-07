import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ClassroomService } from '../all-classrooms/classroom.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-add-classroom',
  templateUrl: './add-classroom.component.html',
  styleUrls: ['./add-classroom.component.sass'],
})
export class AddClassroomComponent {
  classroomForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Classroom',
      items: ['Classroom'],
      active: 'Add',
    },
  ];
  constructor(private fb: UntypedFormBuilder, private classroomService: ClassroomService,
    private router: Router) {
    this.classroomForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
    });

  }

  onSubmit() {
    this.classroomService.addClassroom(this.classroomForm.value);
    setTimeout(() => {
      if (this.classroomService.addStatus == true) {
        this.classroomForm.reset();
        this.router.navigate(['/admin/classrooms/all-classrooms']);
      }
    }, 1000);
  }

}
