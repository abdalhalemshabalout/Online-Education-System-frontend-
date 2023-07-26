import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExamformComponent } from './examform.component';
describe('DialogformComponent', () => {
  let component: ExamformComponent;
  let fixture: ComponentFixture<ExamformComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExamformComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ExamformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
