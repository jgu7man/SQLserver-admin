import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarProveedorComponent } from './borrar-proveedor.component';

describe('BorrarProveedorComponent', () => {
  let component: BorrarProveedorComponent;
  let fixture: ComponentFixture<BorrarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
