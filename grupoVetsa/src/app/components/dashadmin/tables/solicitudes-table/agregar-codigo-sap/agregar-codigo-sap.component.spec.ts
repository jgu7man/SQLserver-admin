import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarCodigoSAPComponent } from './agregar-codigo-sap.component';

describe('AgregarCodigoSAPComponent', () => {
  let component: AgregarCodigoSAPComponent;
  let fixture: ComponentFixture<AgregarCodigoSAPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarCodigoSAPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCodigoSAPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
