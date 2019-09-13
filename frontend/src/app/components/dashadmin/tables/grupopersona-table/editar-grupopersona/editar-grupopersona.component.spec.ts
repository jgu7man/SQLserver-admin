import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGrupopersonaComponent } from './editar-grupopersona.component';

describe('EditarGrupopersonaComponent', () => {
  let component: EditarGrupopersonaComponent;
  let fixture: ComponentFixture<EditarGrupopersonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGrupopersonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGrupopersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
