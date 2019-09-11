import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPorPagoComponent } from './clientes-por-pago.component';

describe('ClientesPorPagoComponent', () => {
  let component: ClientesPorPagoComponent;
  let fixture: ComponentFixture<ClientesPorPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesPorPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesPorPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
