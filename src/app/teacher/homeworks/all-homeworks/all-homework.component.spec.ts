import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllHomeworkComponent } from './all-homework.component';

describe('AllHomeworkComponent', () => {
  let component: AllHomeworkComponent;
  let fixture: ComponentFixture<AllHomeworkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllHomeworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
