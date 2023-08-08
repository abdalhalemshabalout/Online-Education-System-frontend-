import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StaffService } from '../all-staff/staff.service';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.sass'],
})
export class AddStaffComponent {
staffForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Staff',
      items: ['Staff'],
      active: 'Add',
    },
  ];
  constructor(private fb: UntypedFormBuilder, private staffService: StaffService,
    private httpClient: HttpClient, private router: Router) {
    this.staffForm = this.fb.group({
      name: ['', [Validators.required,]],
      surname: ['', [Validators.required,]],
      phone_number: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required,]],
      c_password: ['', [Validators.required]],
      address: ['', [Validators.required,]],
    });

  }

  onSubmit() {
    console.log(this.staffForm.value);
    this.staffService.addStaff(this.staffForm.value);
    setTimeout(() => {
      if (this.staffService.addStatus == true) {
        this.staffForm.reset();
        this.router.navigate(['/admin/staff/all-staff']);
      }
    }, 1000);
  }

}
