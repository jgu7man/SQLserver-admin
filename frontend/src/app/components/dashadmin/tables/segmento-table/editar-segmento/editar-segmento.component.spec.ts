import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSegmentoComponent } from './editar-segmento.component';

describe('EditarSegmentoComponent', () => {
  let component: EditarSegmentoComponent;
  let fixture: ComponentFixture<EditarSegmentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSegmentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSegmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
