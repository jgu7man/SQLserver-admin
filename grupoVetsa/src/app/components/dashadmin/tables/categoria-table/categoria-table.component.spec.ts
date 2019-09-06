import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaTableComponent } from './categoria-table.component';

describe('CategoriaTableComponent', () => {
  let component: CategoriaTableComponent;
  let fixture: ComponentFixture<CategoriaTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
