import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaproductoTableComponent } from './lineaproducto-table.component';

describe('LineaproductoTableComponent', () => {
  let component: LineaproductoTableComponent;
  let fixture: ComponentFixture<LineaproductoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaproductoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaproductoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
