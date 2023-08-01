import { Classroom } from './../../classrooms/all-classrooms/classroom.model';
import { BranchesModule } from '../branches.module';
import { ClassroomService } from './../../classrooms/all-classrooms/classroom.service';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BranchService } from '../all-branches/branch.service';
import { ActivatedRoute, Router} from '@angular/router';
import { number } from 'echarts';


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.sass'],
})
export class AddBranchComponent {
  Classrooms: Classroom[];
  branchForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Branch',
      items: ['Branch'],
      active: 'Add',
    },
  ];
  constructor(private fb: UntypedFormBuilder, private branchServices: BranchService,
    private classroomService: ClassroomService,
    private httpClient: HttpClient, private router: Router,) {
    this.getClassRooms();
    this.branchForm = this.fb.group({
      name: ['', [Validators.required]],
      class_room_id:[number,[Validators.required]],
    });


  }

  getClassRooms() {
    this.classroomService.getAllClassrooms();
    setTimeout(() => {
      this.Classrooms = this.classroomService.data;
    }, 2000);
  }

  onSubmit() {
    this.branchServices.addBranch(this.branchForm.value);
    setTimeout(() => {
      if (this.branchServices.addStatus == true) {
        this.branchForm.reset();
        this.router.navigate(['/admin/branches/all-branches']);
      }
    }, 1000);
  }

}
