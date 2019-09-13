import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRolPrivilegioComponent } from './agregar-rol-privilegio.component';

describe('AgregarRolPrivilegioComponent', () => {
  let component: AgregarRolPrivilegioComponent;
  let fixture: ComponentFixture<AgregarRolPrivilegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarRolPrivilegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarRolPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
