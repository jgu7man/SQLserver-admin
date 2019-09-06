import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarInconsistenciaComponent } from './borrar-inconsistencia.component';

describe('BorrarInconsistenciaComponent', () => {
  let component: BorrarInconsistenciaComponent;
  let fixture: ComponentFixture<BorrarInconsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarInconsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarInconsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
