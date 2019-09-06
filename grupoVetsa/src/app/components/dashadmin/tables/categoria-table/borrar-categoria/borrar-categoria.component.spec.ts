import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarCategoriaComponent } from './borrar-categoria.component';

describe('BorrarCategoriaComponent', () => {
  let component: BorrarCategoriaComponent;
  let fixture: ComponentFixture<BorrarCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
