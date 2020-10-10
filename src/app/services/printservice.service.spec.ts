import { TestBed } from '@angular/core/testing';

import { PrintserviceService } from './printservice.service';

describe('PrintserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintserviceService = TestBed.get(PrintserviceService);
    expect(service).toBeTruthy();
  });
});
