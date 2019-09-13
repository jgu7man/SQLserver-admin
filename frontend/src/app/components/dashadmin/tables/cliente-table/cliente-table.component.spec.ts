import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTableComponent } from './cliente-table.component';

describe('ClienteTableComponent', () => {
  let component: ClienteTableComponent;
  let fixture: ComponentFixture<ClienteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
