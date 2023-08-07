import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnnouncementService } from '../all-announcements/announcements.service';
import { AuthService } from 'src/app/core/service/auth.service';
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

  announcementForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Announcement',
      items: ['Announcement'],
      active: 'Add',
    },
  ];
  constructor(
    private fb: UntypedFormBuilder,
    private announcementService: AnnouncementService,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,) {

  }

  onSubmit() {
    this.announcementService.addAnnouncement(this.announcementForm.value);
    setTimeout(() => {
      if (this.announcementService.addStatus == true) {
        this.announcementForm.reset();
        this.router.navigate(['/admin/announcement/all-announcements']);
      }
    }, 1000);
  }
  ngOnInit() {
    this.announcementForm = this.fb.group({
      title : ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

}
