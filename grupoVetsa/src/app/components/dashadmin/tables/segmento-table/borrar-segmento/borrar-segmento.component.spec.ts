import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarSegmentoComponent } from './borrar-segmento.component';

describe('BorrarSegmentoComponent', () => {
  let component: BorrarSegmentoComponent;
  let fixture: ComponentFixture<BorrarSegmentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarSegmentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarSegmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
