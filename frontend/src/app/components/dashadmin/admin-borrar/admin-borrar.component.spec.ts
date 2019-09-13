import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBorrarComponent } from './admin-borrar.component';

describe('AdminBorrarComponent', () => {
  let component: AdminBorrarComponent;
  let fixture: ComponentFixture<AdminBorrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBorrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBorrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
