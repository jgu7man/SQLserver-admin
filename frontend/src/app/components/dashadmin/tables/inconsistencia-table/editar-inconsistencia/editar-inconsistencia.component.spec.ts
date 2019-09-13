import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInconsistenciaComponent } from './editar-inconsistencia.component';

describe('EditarInconsistenciaComponent', () => {
  let component: EditarInconsistenciaComponent;
  let fixture: ComponentFixture<EditarInconsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarInconsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarInconsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
