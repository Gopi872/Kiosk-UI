import { TestBed } from '@angular/core/testing';

import { FaxserviceService } from './faxservice.service';

describe('FaxserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaxserviceService = TestBed.get(FaxserviceService);
    expect(service).toBeTruthy();
  });
});
