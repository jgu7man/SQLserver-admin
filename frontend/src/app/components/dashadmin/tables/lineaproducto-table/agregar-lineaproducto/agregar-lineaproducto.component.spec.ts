import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLineaproductoComponent } from './agregar-lineaproducto.component';

describe('AgregarLineaproductoComponent', () => {
  let component: AgregarLineaproductoComponent;
  let fixture: ComponentFixture<AgregarLineaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarLineaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLineaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
