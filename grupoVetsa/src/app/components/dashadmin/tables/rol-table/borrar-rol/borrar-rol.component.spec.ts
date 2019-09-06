import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarRolComponent } from './borrar-rol.component';

describe('BorrarRolComponent', () => {
  let component: BorrarRolComponent;
  let fixture: ComponentFixture<BorrarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
