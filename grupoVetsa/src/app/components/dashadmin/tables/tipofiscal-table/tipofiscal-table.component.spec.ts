import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipofiscalTableComponent } from './tipofiscal-table.component';

describe('TipofiscalTableComponent', () => {
  let component: TipofiscalTableComponent;
  let fixture: ComponentFixture<TipofiscalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipofiscalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipofiscalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
