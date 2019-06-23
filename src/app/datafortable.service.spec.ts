import { TestBed } from '@angular/core/testing';

import { DataForTableService } from './datafortable.service';

describe('DatafortableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataForTableService = TestBed.get(DataForTableService);
    expect(service).toBeTruthy();
  });
});
