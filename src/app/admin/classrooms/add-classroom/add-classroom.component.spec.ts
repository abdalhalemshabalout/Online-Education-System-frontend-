import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddClassroomComponent } from './add-classroom.component';

describe('AddClassroomComponent', () => {
  let component: AddClassroomComponent;
  let fixture: ComponentFixture<AddClassroomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClassroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
