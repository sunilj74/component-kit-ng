import { TestBed } from '@angular/core/testing';

import { DataTableKitService } from './data-table-kit.service';

describe('DataTableKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTableKitService = TestBed.get(DataTableKitService);
    expect(service).toBeTruthy();
  });
});
