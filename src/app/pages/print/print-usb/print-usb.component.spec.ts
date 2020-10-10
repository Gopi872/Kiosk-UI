import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintUsbComponent } from './print-usb.component';

describe('PrintUsbComponent', () => {
  let component: PrintUsbComponent;
  let fixture: ComponentFixture<PrintUsbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintUsbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintUsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
