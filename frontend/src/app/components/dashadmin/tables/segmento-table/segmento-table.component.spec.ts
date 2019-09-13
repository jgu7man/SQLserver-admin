import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentoTableComponent } from './segmento-table.component';

describe('SegmentoTableComponent', () => {
  let component: SegmentoTableComponent;
  let fixture: ComponentFixture<SegmentoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
