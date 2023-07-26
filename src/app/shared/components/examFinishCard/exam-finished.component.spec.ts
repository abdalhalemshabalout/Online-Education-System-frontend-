import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ExamfinishformComponent } from './exam-finished.component';
describe('DialogformComponent', () => {
  let component: ExamfinishformComponent;
  let fixture: ComponentFixture<ExamfinishformComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExamfinishformComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ExamfinishformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
