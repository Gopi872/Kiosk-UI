import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImageScanpcComponent } from './select-image-scanpc.component';

describe('SelectImageScanpcComponent', () => {
  let component: SelectImageScanpcComponent;
  let fixture: ComponentFixture<SelectImageScanpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImageScanpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImageScanpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
