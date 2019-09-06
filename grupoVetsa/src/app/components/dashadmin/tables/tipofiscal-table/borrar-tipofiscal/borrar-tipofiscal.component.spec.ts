import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarTipofiscalComponent } from './borrar-tipofiscal.component';

describe('BorrarTipofiscalComponent', () => {
  let component: BorrarTipofiscalComponent;
  let fixture: ComponentFixture<BorrarTipofiscalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarTipofiscalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarTipofiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
