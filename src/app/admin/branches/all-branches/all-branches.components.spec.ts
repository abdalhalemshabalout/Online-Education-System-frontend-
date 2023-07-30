import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllBranchesComponent } from './all-branches.components';

describe('AllBranchesComponent', () => {
  let component: AllBranchesComponent;
  let fixture: ComponentFixture<AllBranchesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
