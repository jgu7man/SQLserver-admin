import { TestBed } from '@angular/core/testing';

import { BorrarService } from './borrar.service';

describe('BorrarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BorrarService = TestBed.get(BorrarService);
    expect(service).toBeTruthy();
  });
});
