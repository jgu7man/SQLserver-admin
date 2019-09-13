import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoTableComponent } from './documento-table.component';

describe('DocumentoTableComponent', () => {
  let component: DocumentoTableComponent;
  let fixture: ComponentFixture<DocumentoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
