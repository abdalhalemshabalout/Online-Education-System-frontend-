import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllAnnouncementComponent } from './all-announcement.component';

describe('AllCourseComponent', () => {
  let component: AllAnnouncementComponent;
  let fixture: ComponentFixture<AllAnnouncementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
