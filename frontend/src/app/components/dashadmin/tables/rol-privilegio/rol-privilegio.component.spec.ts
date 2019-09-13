import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPrivilegioComponent } from './rol-privilegio.component';

describe('RolPrivilegioComponent', () => {
  let component: RolPrivilegioComponent;
  let fixture: ComponentFixture<RolPrivilegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolPrivilegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
