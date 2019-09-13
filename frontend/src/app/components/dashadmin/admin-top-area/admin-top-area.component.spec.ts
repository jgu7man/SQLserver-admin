import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopAreaComponent } from './admin-top-area.component';

describe('AdminTopAreaComponent', () => {
  let component: AdminTopAreaComponent;
  let fixture: ComponentFixture<AdminTopAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTopAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTopAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
