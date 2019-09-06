import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarPaisComponent } from './borrar-pais.component';

describe('BorrarPaisComponent', () => {
  let component: BorrarPaisComponent;
  let fixture: ComponentFixture<BorrarPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
