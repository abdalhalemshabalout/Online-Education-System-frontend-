import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HomeworkformComponent } from './homeworkform.component';
describe('DialogformComponent', () => {
  let component: HomeworkformComponent;
  let fixture: ComponentFixture<HomeworkformComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomeworkformComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
