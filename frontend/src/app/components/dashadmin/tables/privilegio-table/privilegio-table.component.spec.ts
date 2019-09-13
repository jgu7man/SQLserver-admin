import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegioTableComponent } from './privilegio-table.component';

describe('PrivilegioTableComponent', () => {
  let component: PrivilegioTableComponent;
  let fixture: ComponentFixture<PrivilegioTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegioTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegioTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
