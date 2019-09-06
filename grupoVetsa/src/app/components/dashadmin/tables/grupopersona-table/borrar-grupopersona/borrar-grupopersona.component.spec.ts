import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarGrupopersonaComponent } from './borrar-grupopersona.component';

describe('BorrarGrupopersonaComponent', () => {
  let component: BorrarGrupopersonaComponent;
  let fixture: ComponentFixture<BorrarGrupopersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarGrupopersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarGrupopersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
