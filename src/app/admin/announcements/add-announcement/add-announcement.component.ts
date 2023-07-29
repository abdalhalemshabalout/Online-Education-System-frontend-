import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AnnouncementService } from '../all-announcements/announcements.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router} from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-announcement',
  templateUrl: './add-announcement.component.html',
  styleUrls: ['./add-announcement.component.sass'],
})
export class AddAnnouncementComponent implements OnInit {
    public Editor = ClassicEditor;

  personal=[];
  userFullName="admin";
  userId=0;
  announcementForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Duyuru Ekleme',
      items: ['Duyuru'],
      active: 'Ekle',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private announcementService: AnnouncementService,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,) {

    this.getPersonal();
  }

  // Get Personal data
  public getPersonal(){
    this.httpClient.get(`${environment.apiUrl}/personal/get-personal`).subscribe(data => {
      this.personal=(data['data']);
      },
      (err: HttpErrorResponse) => {
     // error code here
    });
  }
  onSubmit() {
    this.announcementForm.value['liderId']=this.userId;
    console.log('Form Value', this.announcementForm.value);
    this.announcementService.addAnnouncement(this.announcementForm.value);
    setTimeout(() => {
      console.log(this.announcementService.addStatus);
      if (this.announcementService.addStatus == true) {
        this.announcementForm.reset();
        this.router.navigate(['/admin/announcement/all-announcements']);
      }
    }, 1000);
  }
  ngOnInit() {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role_id;
      this.userFullName =
        this.authService.currentUserValue.email;
        this.userId=this.authService.currentUserValue.user_id;
    }
    this.announcementForm = this.fb.group({
      liderId : [this.userFullName, [Validators.required]],
      head : ['', [Validators.required]],
      body: ['', [Validators.required]],
    });
  }

}
