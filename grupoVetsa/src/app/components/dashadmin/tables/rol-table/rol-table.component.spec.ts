import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolTableComponent } from './rol-table.component';

describe('RolTableComponent', () => {
  let component: RolTableComponent;
  let fixture: ComponentFixture<RolTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
