import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DocuementDialogComponent } from './documentform.component';
describe('DialogformComponent', () => {
  let component: DocuementDialogComponent;
  let fixture: ComponentFixture<DocuementDialogComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DocuementDialogComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DocuementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
