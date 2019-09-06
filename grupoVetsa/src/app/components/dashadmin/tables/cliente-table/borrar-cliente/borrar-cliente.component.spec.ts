import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarClienteComponent } from './borrar-cliente.component';

describe('BorrarClienteComponent', () => {
  let component: BorrarClienteComponent;
  let fixture: ComponentFixture<BorrarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
