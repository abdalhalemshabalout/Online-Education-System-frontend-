import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllDteacherComponent } from './all-dteacher.component';

describe('AllDteacherComponent', () => {
  let component: AllDteacherComponent;
  let fixture: ComponentFixture<AllDteacherComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
