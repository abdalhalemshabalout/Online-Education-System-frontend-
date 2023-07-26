import { delay } from 'rxjs/operators';
import { colorSets } from '@swimlane/ngx-charts';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DepartmentService } from '../../department.service';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
import { Department } from '../../department.model';
import { MAT_DATE_LOCALE } from '@angular/material/core';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  departmentForm: UntypedFormGroup;
  department: Department;
  deparmentAcademician = [];
  faculty = [];
  selectedAcademicain:any;
  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public departmentService: DepartmentService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.department.name;
      this.department = data.department;
      this.departmentForm = this.createContactForm();
      // this.departmentForm.get('hod').disabled;

    } else {
      this.getFaculty();
      this.dialogTitle = 'Yeni Bölüm Ekle Formu';
      this.department = new Department({});
      this.departmentForm = this.createContactForm();
    }
  }
  formControl = new UntypedFormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.department.id],
      facultyId: [this.department.facultyId, [Validators.required]],
      name: [this.department.name, [Validators.required]],
      code: [this.department.code, [Validators.required]],
      hod: [this.department.hod],
      telephone: [this.department.telephone],
      email: [
        this.department.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      startDate: [this.department.startDate, [Validators.required]],
      studentCapacity: [this.department.studentCapacity, [Validators.required]],
      details:[this.department.details]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    if (this.action === 'edit') {
      this.departmentService.updateDepartment(this.departmentForm.getRawValue());
    } else {
      this.departmentService.addDepartment(this.departmentForm.getRawValue());
    }
  }

  // get Academician By Deparment Id
  public getAcademicianByDepartmentId(departmentId) {
    this.httpClient.post(`${environment.apiUrl}/personal/get-academician-of-department`,departmentId).subscribe(data => {
      this.deparmentAcademician=data['data'];
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  //Get Faculty Data
  public getFaculty(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-faculty`).subscribe(data => {
      this.faculty = (data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }

}
