import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LectuerPageComponent } from './profile.component';
describe('ProfileComponent', () => {
  let component: LectuerPageComponent;
  let fixture: ComponentFixture<LectuerPageComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LectuerPageComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LectuerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
