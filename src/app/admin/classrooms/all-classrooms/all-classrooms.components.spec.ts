import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllClassroomsComponent } from './all-classrooms.components';

describe('AllDepartmentsComponent', () => {
  let component: AllClassroomsComponent;
  let fixture: ComponentFixture<AllClassroomsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClassroomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
