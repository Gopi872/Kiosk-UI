import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPcComponent } from './print-pc.component';

describe('PrintPcComponent', () => {
  let component: PrintPcComponent;
  let fixture: ComponentFixture<PrintPcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
