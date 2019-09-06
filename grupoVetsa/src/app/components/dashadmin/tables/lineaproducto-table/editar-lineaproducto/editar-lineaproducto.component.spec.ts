import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLineaproductoComponent } from './editar-lineaproducto.component';

describe('EditarLineaproductoComponent', () => {
  let component: EditarLineaproductoComponent;
  let fixture: ComponentFixture<EditarLineaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLineaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLineaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
