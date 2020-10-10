import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImageScanmailComponent } from './select-image-scanmail.component';

describe('SelectImageScanmailComponent', () => {
  let component: SelectImageScanmailComponent;
  let fixture: ComponentFixture<SelectImageScanmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImageScanmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImageScanmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
