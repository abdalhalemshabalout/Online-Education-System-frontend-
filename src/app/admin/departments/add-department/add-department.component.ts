import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DepartmentService } from '../all-departments/department.service';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.sass'],
})
export class AddDepartmentComponent {
  faculty:[];
  departmentForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Bölüm Ekleme',
      items: ['Bölüm'],
      active: 'Ekle',
    },
  ];
  constructor(private fb: UntypedFormBuilder, private departmentService: DepartmentService,
    private httpClient: HttpClient, private router: Router) {
    this.departmentForm = this.fb.group({
      facultyId : [''],
      code : [''],
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      telephone: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      startDate: [''],
      studentCapacity: [''],
      details: [''],
    });
    this.getFaculty();

  }

  // get Faculty data
  public getFaculty(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-faculty`).subscribe(data => {
      this.faculty=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

  onSubmit() {
    console.log('Form Value', this.departmentForm.value);
    this.departmentService.addDepartment(this.departmentForm.value);
    setTimeout(() => {
      if (this.departmentService.addStatus == true) {
        this.departmentForm.reset();
        this.router.navigate(['/admin/departments/all-departments']);
      }
    }, 1000);
  }

}
