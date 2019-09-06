import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarTipoindsutriaComponent } from './borrar-tipoindsutria.component';

describe('BorrarTipoindsutriaComponent', () => {
  let component: BorrarTipoindsutriaComponent;
  let fixture: ComponentFixture<BorrarTipoindsutriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarTipoindsutriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarTipoindsutriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
