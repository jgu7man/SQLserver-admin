import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipofiscalComponent } from './agregar-tipofiscal.component';

describe('AgregarTipofiscalComponent', () => {
  let component: AgregarTipofiscalComponent;
  let fixture: ComponentFixture<AgregarTipofiscalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipofiscalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipofiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
