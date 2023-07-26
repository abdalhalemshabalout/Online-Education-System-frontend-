import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddAcademicianComponent } from './add-academician.component';

describe('AddAcademicianComponent', () => {
  let component: AddAcademicianComponent;
  let fixture: ComponentFixture<AddAcademicianComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcademicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
