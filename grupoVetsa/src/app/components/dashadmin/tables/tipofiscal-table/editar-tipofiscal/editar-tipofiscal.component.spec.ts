import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipofiscalComponent } from './editar-tipofiscal.component';

describe('EditarTipofiscalComponent', () => {
  let component: EditarTipofiscalComponent;
  let fixture: ComponentFixture<EditarTipofiscalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarTipofiscalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTipofiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
