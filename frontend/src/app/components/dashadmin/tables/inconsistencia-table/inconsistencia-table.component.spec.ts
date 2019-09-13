import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InconsistenciaTableComponent } from './inconsistencia-table.component';

describe('InconsistenciaTableComponent', () => {
  let component: InconsistenciaTableComponent;
  let fixture: ComponentFixture<InconsistenciaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InconsistenciaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InconsistenciaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
