import { TestBed } from '@angular/core/testing';

import { DataForTreeService } from './datafortree.service';

describe('DatafortreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataForTreeService = TestBed.get(DataForTreeService);
    expect(service).toBeTruthy();
  });
});
