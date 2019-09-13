import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTipoindustriaComponent } from './agregar-tipoindustria.component';

describe('AgregarTipoindustriaComponent', () => {
  let component: AgregarTipoindustriaComponent;
  let fixture: ComponentFixture<AgregarTipoindustriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarTipoindustriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTipoindustriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
