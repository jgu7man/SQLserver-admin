import { TestBed } from '@angular/core/testing';

import { InconsistenciasService } from './inconsistencias.service';

describe('InconsistenciasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InconsistenciasService = TestBed.get(InconsistenciasService);
    expect(service).toBeTruthy();
  });
});
