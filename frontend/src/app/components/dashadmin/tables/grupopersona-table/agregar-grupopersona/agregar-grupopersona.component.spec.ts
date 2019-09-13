import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGrupopersonaComponent } from './agregar-grupopersona.component';

describe('AgregarGrupopersonaComponent', () => {
  let component: AgregarGrupopersonaComponent;
  let fixture: ComponentFixture<AgregarGrupopersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarGrupopersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarGrupopersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
