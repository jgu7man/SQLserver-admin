import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInconsistenciaComponent } from './agregar-inconsistencia.component';

describe('AgregarInconsistenciaComponent', () => {
  let component: AgregarInconsistenciaComponent;
  let fixture: ComponentFixture<AgregarInconsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarInconsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInconsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
