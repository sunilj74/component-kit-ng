import { TestBed } from '@angular/core/testing';

import { DataTreeKitService } from './data-tree-kit.service';

describe('DataTreeKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataTreeKitService = TestBed.get(DataTreeKitService);
    expect(service).toBeTruthy();
  });
});
