import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllDstudentComponent } from './all-dstudent.component';

describe('AllDstudentComponent', () => {
  let component: AllDstudentComponent;
  let fixture: ComponentFixture<AllDstudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDstudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
