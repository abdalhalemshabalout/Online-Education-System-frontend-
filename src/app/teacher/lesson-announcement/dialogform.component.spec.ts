import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DialogAnnouncementComponent } from './dialogform.component';
describe('DialogformComponent', () => {
  let component: DialogAnnouncementComponent;
  let fixture: ComponentFixture<DialogAnnouncementComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAnnouncementComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
