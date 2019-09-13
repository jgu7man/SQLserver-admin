import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarSegmentoComponent } from './agregar-segmento.component';

describe('AgregarSegmentoComponent', () => {
  let component: AgregarSegmentoComponent;
  let fixture: ComponentFixture<AgregarSegmentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarSegmentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarSegmentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
