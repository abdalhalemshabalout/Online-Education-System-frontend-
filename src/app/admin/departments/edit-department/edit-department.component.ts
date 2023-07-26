import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.sass'],
})
export class EditDepartmentComponent {
  departmentForm: UntypedFormGroup;
  formdata = {
    name: '',
    hod: '',
    telephone: '',
    email: '',
    startDate: '1987-02-17T14:22:18Z',
    studentCapacity: '',
    details: '',
  };
  breadscrums = [
    {
      title: 'Bölüm Bilgileri Güncelleme',
      items: ['Bölüm'],
      active: 'Güncelle',
    },
  ];
  constructor(private fb: UntypedFormBuilder) {
    this.departmentForm = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.departmentForm.value);
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      name: [this.formdata.name, [Validators.required]],
      hod: [this.formdata.hod],
      telephone: [this.formdata.telephone, [Validators.required]],
      email: [
        this.formdata.email,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      startDate: [this.formdata.startDate],
      studentCapacity: [this.formdata.studentCapacity],
      details: [this.formdata.details],
    });
  }
}
