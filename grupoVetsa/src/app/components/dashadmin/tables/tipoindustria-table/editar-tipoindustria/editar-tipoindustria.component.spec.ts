import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoIndustriaComponent } from './editar-tipoindustria.component';

describe('EditarTipoIndustriaComponent', () => {
  let component: EditarTipoIndustriaComponent;
  let fixture: ComponentFixture<EditarTipoIndustriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTipoIndustriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTipoIndustriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
