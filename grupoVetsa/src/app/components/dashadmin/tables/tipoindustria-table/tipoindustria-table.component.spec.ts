import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoindustriaTableComponent } from './tipoindustria-table.component';

describe('TipoindustriaTableComponent', () => {
  let component: TipoindustriaTableComponent;
  let fixture: ComponentFixture<TipoindustriaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoindustriaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoindustriaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
