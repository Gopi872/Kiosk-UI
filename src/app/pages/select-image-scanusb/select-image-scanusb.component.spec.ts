import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImageScanusbComponent } from './select-image-scanusb.component';

describe('SelectImageScanusbComponent', () => {
  let component: SelectImageScanusbComponent;
  let fixture: ComponentFixture<SelectImageScanusbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImageScanusbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImageScanusbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
