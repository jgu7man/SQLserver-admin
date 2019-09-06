import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarDocumentoComponent } from './borrar-documento.component';

describe('BorrarDocumentoComponent', () => {
  let component: BorrarDocumentoComponent;
  let fixture: ComponentFixture<BorrarDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
