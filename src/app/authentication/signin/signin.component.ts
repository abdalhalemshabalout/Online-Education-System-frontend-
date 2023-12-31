import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['matteo@manager.com', Validators.required],
      password: ['123456', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get('username').setValue('matteo@manager.com');
    this.authForm.get('password').setValue('123456');
  }
  staffSet() {
    this.authForm.get('username').setValue('elias@staff.com');
    this.authForm.get('password').setValue('123456');
  }
  teacherSet() {
    this.authForm.get('username').setValue('emilia@teacher.com');
    this.authForm.get('password').setValue('123456');
  }
  studentSet() {
    this.authForm.get('username').setValue('finn@student.com');
    this.authForm.get('password').setValue('123456');
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Kullanıcı adı ve Şifre geçerli değil !';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f.username.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res) {
              setTimeout(() => {
                const role = this.authService.currentUserValue.role_id;
                if (role == Role.Admin) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role == Role.Staff) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role == Role.Teacher) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role == Role.Student) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
              }, 1000);
            } else {
              this.error = 'Geçersiz giriş';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }

}
