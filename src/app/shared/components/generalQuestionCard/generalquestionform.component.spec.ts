import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { generalquestionformComponent } from './generalquestionform.component';
describe('generalquestionformComponent', () => {
  let component: generalquestionformComponent;
  let fixture: ComponentFixture<generalquestionformComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [generalquestionformComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(generalquestionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
