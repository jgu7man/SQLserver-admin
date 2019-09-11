import { TestBed } from '@angular/core/testing';

import { LlavesforaneasService } from './llavesforaneas.service';

describe('LlavesforaneasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LlavesforaneasService = TestBed.get(LlavesforaneasService);
    expect(service).toBeTruthy();
  });
});
