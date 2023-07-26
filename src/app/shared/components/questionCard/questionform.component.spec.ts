import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { questionformComponent } from './questionform.component';
describe('questionformComponent', () => {
  let component: questionformComponent;
  let fixture: ComponentFixture<questionformComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [questionformComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(questionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
