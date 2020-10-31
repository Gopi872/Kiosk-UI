import { TestBed } from '@angular/core/testing';

import { PrintCloudService } from './print-cloud.service';

describe('PrintCloudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintCloudService = TestBed.get(PrintCloudService);
    expect(service).toBeTruthy();
  });
});
