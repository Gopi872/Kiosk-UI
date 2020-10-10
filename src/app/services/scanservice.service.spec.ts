import { TestBed } from '@angular/core/testing';

import { ScanserviceService } from './scanservice.service';

describe('ScanserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScanserviceService = TestBed.get(ScanserviceService);
    expect(service).toBeTruthy();
  });
});
