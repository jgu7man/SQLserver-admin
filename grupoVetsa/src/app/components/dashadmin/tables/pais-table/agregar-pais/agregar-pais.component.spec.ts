import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPaisComponent } from './agregar-pais.component';

describe('AgregarPaisComponent', () => {
  let component: AgregarPaisComponent;
  let fixture: ComponentFixture<AgregarPaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
