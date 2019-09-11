import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPrivilegioComponent } from './agregar-privilegio.component';

describe('AgregarPrivilegioComponent', () => {
  let component: AgregarPrivilegioComponent;
  let fixture: ComponentFixture<AgregarPrivilegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarPrivilegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
