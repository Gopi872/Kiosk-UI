import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImageScanfaxComponent } from './select-image-scanfax.component';

describe('SelectImageScanfaxComponent', () => {
  let component: SelectImageScanfaxComponent;
  let fixture: ComponentFixture<SelectImageScanfaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImageScanfaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImageScanfaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
