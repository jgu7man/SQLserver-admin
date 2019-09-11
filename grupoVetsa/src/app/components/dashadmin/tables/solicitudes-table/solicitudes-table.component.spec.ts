import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesTableComponent } from './solicitudes-table.component';

describe('SolicitudesTableComponent', () => {
  let component: SolicitudesTableComponent;
  let fixture: ComponentFixture<SolicitudesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
