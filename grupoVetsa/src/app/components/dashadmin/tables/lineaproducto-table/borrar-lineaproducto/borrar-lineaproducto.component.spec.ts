import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarLineaproductoComponent } from './borrar-lineaproducto.component';

describe('BorrarLineaproductoComponent', () => {
  let component: BorrarLineaproductoComponent;
  let fixture: ComponentFixture<BorrarLineaproductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarLineaproductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarLineaproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
