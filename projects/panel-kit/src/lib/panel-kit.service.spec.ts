import { TestBed } from '@angular/core/testing';

import { PanelKitService } from './panel-kit.service';

describe('PanelKitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PanelKitService = TestBed.get(PanelKitService);
    expect(service).toBeTruthy();
  });
});
