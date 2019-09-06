import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupopersonaTableComponent } from './grupopersona-table.component';

describe('GrupopersonaTableComponent', () => {
  let component: GrupopersonaTableComponent;
  let fixture: ComponentFixture<GrupopersonaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupopersonaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupopersonaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
