import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPrivilegioComponent } from './editar-privilegio.component';

describe('EditarPrivilegioComponent', () => {
  let component: EditarPrivilegioComponent;
  let fixture: ComponentFixture<EditarPrivilegioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarPrivilegioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPrivilegioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
