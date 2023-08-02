import { delay } from 'rxjs/operators';
import { colorSets } from '@swimlane/ngx-charts';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Staff } from '../../staff.model';
import { StaffService } from '../../staff.service';
import { environment } from 'src/environments/environment';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder
} from '@angular/forms';
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
  staffForm: UntypedFormGroup;
  staff: Staff;
  selectedAcademicain:any;
  constructor(
    private httpClient:HttpClient,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public staffService: StaffService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Staff Edit Form';
      this.staff = data.staff;
      this.staffForm = this.createContactForm();

    } else {
      this.dialogTitle = 'New Staff Add Form';
      this.staff = new Staff({});
      this.staffForm = this.createContactForm();
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
      id: [this.staff.id],
      name: [this.staff.name, [Validators.required]],
      surname: [this.staff.surname, [Validators.required]],
      phone_number: [this.staff.phone_number, [Validators.required]],
      email: [
        this.staff.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: [this.staff.password,this.action!='edit'?[Validators.required]:""],
      c_password: [this.staff.c_password,this.action!='edit'?[Validators.required]:""],
      address: [this.staff.address, [Validators.required]],
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
      this.staffService.updateStaff(this.staffForm.getRawValue());
    } else {
      this.staffService.addStaff(this.staffForm.getRawValue());
    }
  }
}
